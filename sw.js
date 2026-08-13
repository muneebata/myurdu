// Urdu Ustaadh service worker — offline support without staleness.
// Strategy: network-first for HTML (never serve stale pages when
// online), cache-first for version-stamped assets and audio clips
// (immutable per URL). Never touches the API or other origins,
// except Google Fonts (cache-first).
const CACHE = "myurdu-v202608122133"; // stamped by tools/deploy.sh

self.addEventListener("install", () => self.skipWaiting());

self.addEventListener("activate", (e) => {
  e.waitUntil(
    caches.keys()
      .then((keys) => Promise.all(keys.filter((k) => k !== CACHE).map((k) => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener("fetch", (e) => {
  const req = e.request;
  if (req.method !== "GET") return;
  const url = new URL(req.url);

  if (url.origin !== location.origin) {
    // Google Fonts: cache-first; anything else (the API!): untouched.
    if (url.hostname.endsWith("gstatic.com") || url.hostname.endsWith("googleapis.com")) {
      e.respondWith(cacheFirst(req));
    }
    return;
  }

  if (req.mode === "navigate" || url.pathname === "/" || url.pathname.endsWith(".html")) {
    e.respondWith(networkFirst(req));
    return;
  }

  e.respondWith(cacheFirst(req));
});

async function cacheFirst(req) {
  const cache = await caches.open(CACHE);
  const hit = await cache.match(req);
  if (hit) return hit;
  const res = await fetch(req);
  if (res.ok) cache.put(req, res.clone());
  return res;
}

async function networkFirst(req) {
  const cache = await caches.open(CACHE);
  try {
    const res = await fetch(req);
    if (res.ok) cache.put(req, res.clone());
    return res;
  } catch {
    const hit = await cache.match(req);
    if (hit) return hit;
    throw new Error("offline and uncached");
  }
}
