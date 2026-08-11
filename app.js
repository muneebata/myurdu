// ─────────────────────────────────────────────────────────────
// Urdu Ustaadh, app shell, profiles, lessons, quizzes, drills
// ─────────────────────────────────────────────────────────────

const TRACKS = { READING_UNITS: READING_UNITS, CULTURE_UNITS: CULTURE_UNITS, SOUND_UNITS: SOUND_UNITS, PAKISTAN_UNITS: PAKISTAN_UNITS };

const Store = {
  KEY: "urdu-ustaadh-v1",
  load() {
    try {
      const d = JSON.parse(localStorage.getItem(this.KEY));
      if (d && d.profiles) return d;
    } catch {}
    return { active: null, profiles: {} };
  },
  save(root) {
    localStorage.setItem(this.KEY, JSON.stringify(root));
  },
};

let root = Store.load();
const $ = (sel) => document.querySelector(sel);
const app = () => $("#app");

function esc(s) {
  const d = document.createElement("div");
  d.textContent = s;
  return d.innerHTML;
}

// ── Profiles ─────────────────────────────────────────────────

function blankProfile() {
  return { completed: {}, scores: {}, streak: 0, lastDaily: null, dailyBest: {}, leitner: {}, nishaan: {} };
}

function profile() {
  return root.active ? root.profiles[root.active] : null;
}

function saveRoot() {
  Store.save(root);
  Cloud.schedulePush();
}

function addProfile(name) {
  name = name.trim().slice(0, 24);
  if (!name) return;
  if (!root.profiles[name]) root.profiles[name] = blankProfile();
  root.active = name;
  saveRoot();
  renderHome();
}

function switchProfileAt(i) {
  const name = Object.keys(root.profiles)[i];
  if (name == null) return;
  root.active = name;
  saveRoot();
  renderHome();
}

function deleteProfileAt(i) {
  const name = Object.keys(root.profiles)[i];
  if (name == null) return;
  if (!confirm(`Remove learner "${name}" and their progress?`)) return;
  delete root.profiles[name];
  if (root.active === name) root.active = Object.keys(root.profiles)[0] || null;
  saveRoot();
  renderProfiles();
}

function renderProfiles() {
  const names = Object.keys(root.profiles);
  app().innerHTML = `
    ${backBar("Learners · Kaun seekh raha hai?", root.active ? "renderHome()" : null)}
    <button class="about-btn" onclick="showAbout()" title="About Urdu Ustaadh">ℹ️ About</button>
    <div class="roster">
      <h2 class="retro">Who's learning today?</h2>
      <p class="lesson-intro">Each learner gets their own progress, title, and streak, stored on this device.</p>
      ${
        names.length
          ? `<div class="roster-list">${names
              .map(
                (n, i) => `
        <div class="roster-row ${n === root.active ? "active" : ""}">
          <button class="btn roster-name" onclick="switchProfileAt(${i})">
            👤 ${esc(n)} <span class="roster-rank">${rankFor(root.profiles[n]).name}</span>
          </button>
          <button class="btn danger small" onclick="deleteProfileAt(${i})">✕</button>
        </div>`
              )
              .join("")}</div>`
          : ""
      }
      <div class="roster-add">
        <input id="new-profile" class="input" placeholder="New learner's name" maxlength="24"
               onkeydown="if(event.key==='Enter')addProfile(this.value)" />
        <button class="btn primary" onclick="addProfile(document.getElementById('new-profile').value)">Join in →</button>
      </div>
      <p class="hint">Progress is saved on this device, and to your free account if you sign in (💾 top left of the home screen).</p>
    </div>
  `;
}

function showAccount() {
  const overlay = document.createElement("div");
  overlay.className = "modal-overlay";
  overlay.onclick = (e) => { if (e.target === overlay) overlay.remove(); };
  const inner = Cloud.status === "in"
    ? `
      <h2 class="retro">☁️ Progress saved</h2>
      <p>Signed in as <strong>${esc(Cloud.user.email)}</strong>. Every learner on this device is backed up automatically and follows you to any device you sign in on.</p>
      <div class="result-actions">
        <button class="btn" onclick="Cloud.signOut(); this.closest('.modal-overlay').remove(); renderHome();">Sign out</button>
        <button class="btn primary" onclick="this.closest('.modal-overlay').remove()">Done</button>
      </div>`
    : `
      <h2 class="retro">💾 Save your progress</h2>
      <p>Playing works fine without an account, everything is saved on this device. Sign in to back it up and continue on any other device.</p>
      <div class="cloud-form">
        <input id="cloud-email" class="input" type="email" placeholder="Email" autocomplete="email" />
        <input id="cloud-pass" class="input" type="password" placeholder="Password (8+ characters)" autocomplete="current-password"
               onkeydown="if(event.key==='Enter')cloudAuth(false)" />
      </div>
      <div class="cloud-actions">
        <button class="btn primary" onclick="cloudAuth(false)">Log in</button>
        <button class="btn" onclick="cloudAuth(true)">Create free account</button>
      </div>
      <p class="hint"><button class="linklike" onclick="cloudForgot()">Forgot password?</button></p>
      <div id="cloud-status"></div>
      <p class="no-spam">🔒 Your email is used only for logging in. No newsletters, no marketing, no spam, ever. Urdu Ustaadh is completely free.</p>`;
  overlay.innerHTML = `<div class="modal-card">${inner}</div>`;
  document.body.appendChild(overlay);
}

async function cloudAuth(create) {
  const email = document.getElementById("cloud-email")?.value.trim();
  const pass = document.getElementById("cloud-pass")?.value;
  const out = document.getElementById("cloud-status");
  if (!email || !pass) {
    out.innerHTML = `<div class="pr warn">Enter an email and password.</div>`;
    return;
  }
  out.innerHTML = `<div class="pr listening">☁️ ${create ? "Creating account" : "Signing in"}…</div>`;
  try {
    await (create ? Cloud.signUp(email, pass) : Cloud.signIn(email, pass));
    document.querySelector(".modal-overlay")?.remove();
    renderHome();
  } catch (e) {
    out.innerHTML = `<div class="pr bad">⚠️ ${esc(e.message)}</div>`;
  }
}

async function cloudForgot() {
  const email = document.getElementById("cloud-email")?.value.trim();
  const out = document.getElementById("cloud-status");
  if (!email) {
    out.innerHTML = `<div class="pr warn">Type your email above first, then tap Forgot password.</div>`;
    return;
  }
  out.innerHTML = `<div class="pr listening">☁️ Requesting reset link…</div>`;
  try {
    await Cloud.requestReset(email);
    out.innerHTML = `<div class="pr good">📬 If that account exists, a reset link is on its way. Check your inbox (and spam).</div>`;
  } catch (e) {
    out.innerHTML = `<div class="pr warn">⚠️ Couldn't send just now, email sending may not be configured yet. (${esc(e.message)})</div>`;
  }
}

// ── Progress & ranks ─────────────────────────────────────────

function isCompleted(id) {
  return !!profile()?.completed[id];
}

function markCompleted(id, score) {
  const p = profile();
  p.completed[id] = true;
  if (score != null) p.scores[id] = Math.max(p.scores[id] || 0, score);
  saveRoot();
}

function completedCount() {
  const p = profile();
  return p ? Object.keys(p.completed).length : 0;
}

function rankFor(p) {
  const n = Object.keys(p.completed).length;
  let r = RANKS[0];
  for (const rank of RANKS) if (n >= rank.need) r = rank;
  return r;
}

// The whole curriculum is open, no sequential locks. Levels still
// suggest an order (they reference each other), and quizzes still
// mark things passed for titles/progress, but learners roam free.
function levelUnlocked() {
  return true;
}

function unitUnlocked() {
  return true;
}

function overallPercent() {
  const total = LEVELS.length + READING_UNITS.length + CULTURE_UNITS.length + SOUND_UNITS.length + PAKISTAN_UNITS.length;
  return Math.round((completedCount() / total) * 100);
}

// ── Daily-game helpers (date-seeded so everyone gets the same drill) ──

// Daily games flip at each learner's OWN local midnight (like Wordle).
// The calendar date drives every seed, so the whole world still gets
// the same puzzle on the same date, the day just begins when yours does.
function todayKey() {
  return new Intl.DateTimeFormat("en-CA", {
    year: "numeric", month: "2-digit", day: "2-digit",
  }).format(new Date());
}

function shiftKey(key, days) {
  const [y, m, d] = key.split("-").map(Number);
  const dt = new Date(Date.UTC(y, m - 1, d + days));
  return `${dt.getUTCFullYear()}-${String(dt.getUTCMonth() + 1).padStart(2, "0")}-${String(dt.getUTCDate()).padStart(2, "0")}`;
}

function daySeed() {
  return Number(todayKey().replaceAll("-", ""));
}

function mulberry32(a) {
  return function () {
    a |= 0; a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

// No-repeat rotation: shuffle the whole pool once per cycle (seeded,
// so identical worldwide), then deal `count` per day off the deck.
// Nothing repeats until the deck runs out; then a fresh shuffle.
function cycleDraw(pool, count, seedBase) {
  const [y, m, d] = todayKey().split("-").map(Number);
  const dayIndex = Math.floor(Date.UTC(y, m - 1, d) / 86400000);
  const daysPerCycle = Math.max(1, Math.floor(pool.length / count));
  const cycle = Math.floor(dayIndex / daysPerCycle);
  const pos = dayIndex % daysPerCycle;
  const deck = cycleDeck(pool, count, seedBase, cycle, daysPerCycle);
  return deck.slice(pos * count, pos * count + count);
}

// Deck for a cycle, with a hard freshness guarantee: the first half
// of each new cycle is repaired (deterministic swaps) so it contains
// nothing dealt in the previous cycle's last half. Every item is
// therefore at least ~half a cycle away from its last appearance
// (roots ≥16 days, map ≥23, listening ≥33; typically a full cycle).
// Purely seeded, so every device deals the identical deck.
function cycleDeck(pool, count, seedBase, cycle, daysPerCycle) {
  const make = (c) => seededPick(pool, pool.length, mulberry32(seedBase + c * 7919));
  const guardDays = Math.floor((daysPerCycle - 1) / 2);
  if (guardDays < 1) return make(cycle);
  const R = guardDays * count;
  const dealtEnd = daysPerCycle * count;
  let deck = make(0);
  for (let c = 1; c <= cycle; c++) {
    const rng = mulberry32(seedBase + c * 7919 + 999983);
    const recent = new Set(deck.slice(dealtEnd - R, dealtEnd));
    const next = make(c);
    for (let i = 0; i < R; i++) {
      if (!recent.has(next[i])) continue;
      let j = R + Math.floor(rng() * (next.length - R));
      for (let scan = 0; recent.has(next[j]) && scan < next.length; scan++)
        j = R + ((j - R + 1) % (next.length - R));
      [next[i], next[j]] = [next[j], next[i]];
    }
    deck = next;
  }
  return deck;
}

function seededPick(arr, count, rng) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(rng() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a.slice(0, count);
}

// Words due for review: seen in quizzes before, and past their box's
// rest interval (box 0 = due now, then 1/2/4/8 days).
const BOX_REST_DAYS = [0, 1, 2, 4, 8];

function dueReviewCount() {
  const p = profile();
  if (!p || !p.leitner) return 0;
  const pool = LEVELS.filter((lv) => isCompleted(lv.id)).flatMap((lv) => lv.items);
  const now = Date.now();
  let due = 0;
  for (const item of pool) {
    const e = p.leitner[Speech.slug(item.tr)];
    if (!e) continue;
    if (now - e.t >= BOX_REST_DAYS[Math.min(e.b, 4)] * 86400000) due++;
  }
  return due;
}

// ── Nishaan (🔖): learner-flagged words + Anki-style flashcards ──
// Bookmarking stores the item itself (works across lessons, lughat,
// kutub) and seeds it into the Leitner ladder at box 0.

function nishaanHas(tr) {
  return !!profile()?.nishaan?.[Speech.slug(tr)];
}

function nishaanToggle(btn, ur, tr, en, src) {
  const p = profile();
  const nn = (p.nishaan ||= {});
  const key = Speech.slug(tr);
  if (nn[key]) {
    delete nn[key];
  } else {
    nn[key] = { ur, tr, en, src, t: Date.now() };
    const lt = (p.leitner ||= {});
    if (!lt[key]) lt[key] = { b: 0, t: 0 };
  }
  saveRoot();
  if (btn) {
    btn.classList.toggle("on", !!nn[key]);
    btn.textContent = nn[key] ? "🔖 Saved" : "🔖 Save";
    btn.setAttribute("aria-pressed", nn[key] ? "true" : "false");
  }
}

function nishaanBtn(ur, tr, en, src, small) {
  const on = nishaanHas(tr);
  return `<button class="btn nishaan-btn${small ? " small" : ""}${on ? " on" : ""}" aria-pressed="${on}"
    title="Flag this as one to work on"
    onclick='nishaanToggle(this, ${JSON.stringify(ur)}, ${JSON.stringify(tr)}, ${JSON.stringify(en)}, ${JSON.stringify(src)})'>🔖 ${on ? "Saved" : "Save"}</button>`;
}

function flashDeck() {
  const p = profile();
  const lt = p.leitner || {};
  const now = Date.now();
  const seen = new Set();
  const cards = [];
  for (const [k, v] of Object.entries(p.nishaan || {})) {
    cards.push({ key: k, ur: v.ur, tr: v.tr, en: v.en, src: v.src || "Saved with 🔖", saved: true });
    seen.add(k);
  }
  for (const lv of LEVELS.filter((l) => isCompleted(l.id)))
    for (const item of lv.items) {
      const k = Speech.slug(item.tr);
      if (seen.has(k)) continue;
      const e = lt[k];
      if (e && now - e.t >= BOX_REST_DAYS[Math.min(e.b, 4)] * 86400000) {
        cards.push({ key: k, ur: item.ur, tr: item.tr, en: item.en, src: lv.title, saved: false });
        seen.add(k);
      }
    }
  const rank = (c) => { const e = lt[c.key]; return e ? e.b * 1e13 + e.t : -1; };
  cards.sort((a, b) => (b.saved ? 1 : 0) - (a.saved ? 1 : 0) || rank(a) - rank(b));
  return cards.slice(0, 15);
}

let fc = null;

function startFlashcards() {
  const deck = flashDeck();
  if (!deck.length) {
    app().innerHTML = `
      ${backBar("🃏 Flashcards")}
      <div class="fc-empty">
        <p class="fc-empty-art">🔖</p>
        <p><b>Your deck is empty, for now.</b></p>
        <p class="hint">Tap <b>🔖 Save</b> on any phrase in a lesson, any word in the Lughat, or any couplet
        in the Kutub Khana to flag it as one you want to work on. Words you miss in quizzes also
        land here automatically once their review day comes around.</p>
        <div class="result-actions">
          <button class="btn primary" onclick="renderLughat()">Browse the Lughat →</button>
          <button class="btn" onclick="renderHome()">Home</button>
        </div>
      </div>`;
    window.scrollTo(0, 0);
    return;
  }
  fc = { deck, i: 0, again: 0, good: 0, easy: 0 };
  renderFlashcard(false);
}

function renderFlashcard(revealed) {
  const c = fc.deck[fc.i];
  app().innerHTML = `
    ${backBar("🃏 Flashcards", "renderHome()")}
    <div class="quiz-progress">Card ${fc.i + 1} of ${fc.deck.length}${c.saved ? " · 🔖 saved by you" : ""}</div>
    <div class="fc-card">
      <div class="fc-src">${esc(c.src)}</div>
      <div class="fc-prompt">How do you say…</div>
      <div class="fc-en">${esc(c.en)}</div>
      ${revealed ? `
        <div class="fc-answer">
          <div class="fc-ur ur">${esc(c.ur)}</div>
          <div class="fc-tr">${esc(c.tr)}</div>
          <div class="fc-audio">
            <button class="btn speak" onclick='Speech.speak(${JSON.stringify(c.ur)}, ${JSON.stringify(c.tr)})'>🔊 Listen</button>
            <button class="btn speak" onclick='Speech.speak(${JSON.stringify(c.ur)}, ${JSON.stringify(c.tr)}, {slow:true})'>🐢 Slow</button>
            ${goonjBtn("fc-goonj-out", c.ur, c.tr)}
          </div>
          <div id="fc-goonj-out"></div>
        </div>
        <p class="fc-ask">Say it out loud first, then be honest:</p>
        <div class="fc-grades">
          <button class="btn fc-again" onclick="fcGrade(0)">❌ Phir se<span>again soon</span></button>
          <button class="btn fc-good" onclick="fcGrade(1)">🙂 Thīk hai<span>got it</span></button>
          <button class="btn fc-easy" onclick="fcGrade(2)">⚡ Āsān<span>too easy</span></button>
        </div>`
      : `<button class="btn primary big fc-flip" onclick="fcReveal()">Show answer →</button>`}
    </div>
  `;
  window.scrollTo(0, 0);
}

function fcReveal() {
  const c = fc.deck[fc.i];
  renderFlashcard(true);
  Speech.speak(c.ur, c.tr);
}

function fcGrade(g) {
  const c = fc.deck[fc.i];
  const lt = (profile().leitner ||= {});
  const cur = lt[c.key] || { b: 0, t: 0 };
  lt[c.key] = { b: g === 0 ? 0 : Math.min(cur.b + g, 4), t: Date.now() };
  saveRoot();
  fc[["again", "good", "easy"][g]]++;
  fc.i++;
  if (fc.i < fc.deck.length) renderFlashcard(false);
  else finishFlashcards();
}

function finishFlashcards() {
  const more = flashDeck().length;
  app().innerHTML = `
    ${backBar("🃏 Flashcards")}
    <div class="fc-card fc-done">
      <p class="fc-empty-art">${fc.again === 0 ? "🌟" : "📚"}</p>
      <p><b>${fc.deck.length} card${fc.deck.length === 1 ? "" : "s"} flipped.</b></p>
      <div class="fc-tally">
        <span>❌ Phir se · ${fc.again}</span>
        <span>🙂 Thīk hai · ${fc.good}</span>
        <span>⚡ Āsān · ${fc.easy}</span>
      </div>
      <p class="hint">${fc.again > 0
        ? "The ❌ ones dropped to box 1, they'll keep coming back until they stick. That's the whole trick."
        : "Everything climbed a box, these words rest longer before their next visit."}</p>
      <div class="result-actions">
        ${more ? `<button class="btn primary" onclick="startFlashcards()">Another round (${more} waiting) →</button>` : ""}
        <button class="btn" onclick="renderHome()">Home</button>
      </div>
    </div>`;
  window.scrollTo(0, 0);
}


const URDU_DIGITS = { "0": "۰", "1": "۱", "2": "۲", "3": "۳", "4": "۴", "5": "۵", "6": "۶", "7": "۷", "8": "۸", "9": "۹" };
function urduNum(n) {
  return String(n).split("").map((d) => URDU_DIGITS[d] || d).join("");
}

function ledgerRow(onclick, num, title, urName, sub, statusHtml) {
  return `
    <button class="lrow" onclick="${onclick}">
      <div class="lnum ur">${num}</div>
      <div class="lt">${esc(title)}${urName ? `<span class="lu ur">${esc(urName)}</span>` : ""}<span class="ls">${esc(sub)}</span></div>
      <div class="lst-wrap">${statusHtml}</div>
    </button>`;
}

// ── Jashn-e-Azadi week (Aug 7–14, Chicago time) ─────────────

// Azadi is tiered: the whole of August is celebration month (flags,
// banner, share card); Aug 7–14 is the peak week (fireworks, confetti,
// and the Suno azadi-words swap, kept short so the pool stays fresh).
function azadiMonth() {
  const t = new URLSearchParams(location.search).get("azadi");
  if (t === "1" || t === "14") return true;
  const [, m] = todayKey().split("-").map(Number);
  return m === 8;
}

function azadiPeak() {
  const t = new URLSearchParams(location.search).get("azadi");
  if (t === "1" || t === "14") return true;
  const [, m, d] = todayKey().split("-").map(Number);
  return m === 8 && d >= 7 && d <= 14;
}

function isAzadiDay() {
  if (new URLSearchParams(location.search).get("azadi") === "14") return true;
  const [, m, d] = todayKey().split("-").map(Number);
  return m === 8 && d === 14;
}

// The retro waving flag, a loving tribute to every 90s homepage.
// Ripple via animated turbulence displacement (the old GIF-flag look).
// Firework bursts flanking the hero during Azadi week. SMIL pops in the
// flag-and-PTV palette, hidden for reduced-motion users via CSS.
const AZADI_FIREWORKS_L = `<svg class="azadi-fireworks azadi-fw-left" viewBox="0 0 160 140" aria-hidden="true">
  <g transform="translate(48,54)">
      <circle r="2" fill="#c98f1a" opacity="0">
      <animateMotion path="M0,64 L0,0" keyPoints="0;1;1" keyTimes="0;0.15;1" dur="3.8s" begin="0s" repeatCount="indefinite" calcMode="linear"/>
      <animate attributeName="opacity" values="0;0.95;0.95;0;0" keyTimes="0;0.03;0.12;0.16;1" dur="3.8s" begin="0s" repeatCount="indefinite"/>
    </circle>
      <circle r="1" fill="#d9a413" opacity="0">
      <animate attributeName="r" values="1;14;1" keyTimes="0;0.21;0.3" dur="3.8s" begin="0s" repeatCount="indefinite"/>
      <animate attributeName="opacity" values="0;0;0.8;0;0" keyTimes="0;0.155;0.18;0.28;1" dur="3.8s" begin="0s" repeatCount="indefinite"/>
    </circle>
      <circle r="3" fill="#b05464" opacity="0">
      <animateMotion path="M0,0 Q20.9,0.4 33.7,16.9" keyPoints="0;0;1;1" keyTimes="0;0.16;0.72;1" calcMode="spline" keySplines="0 0 1 1;0.15 0.75 0.35 0.98;0 0 1 1" dur="3.8s" begin="0s" repeatCount="indefinite"/>
      <animate attributeName="r" values="3;3;2;0.7" keyTimes="0;0.16;0.5;1" dur="3.8s" begin="0s" repeatCount="indefinite"/>
      <animate attributeName="opacity" values="0;0;1;0.55;1;0.4;0.75;0;0" keyTimes="0;0.16;0.2;0.38;0.5;0.62;0.7;0.82;1" dur="3.8s" begin="0s" repeatCount="indefinite"/>
    </circle>
      <circle r="3" fill="#d9a413" opacity="0">
      <animateMotion path="M0,0 Q17.6,8.3 28.5,29.7" keyPoints="0;0;1;1" keyTimes="0;0.16;0.72;1" calcMode="spline" keySplines="0 0 1 1;0.15 0.75 0.35 0.98;0 0 1 1" dur="3.8s" begin="0s" repeatCount="indefinite"/>
      <animate attributeName="r" values="3;3;2;0.7" keyTimes="0;0.16;0.5;1" dur="3.8s" begin="0s" repeatCount="indefinite"/>
      <animate attributeName="opacity" values="0;0;1;0.55;1;0.4;0.75;0;0" keyTimes="0;0.16;0.2;0.38;0.5;0.62;0.7;0.82;1" dur="3.8s" begin="0s" repeatCount="indefinite"/>
    </circle>
      <circle r="3" fill="#b05464" opacity="0">
      <animateMotion path="M0,0 Q10.9,14.2 17.6,39.1" keyPoints="0;0;1;1" keyTimes="0;0.16;0.72;1" calcMode="spline" keySplines="0 0 1 1;0.15 0.75 0.35 0.98;0 0 1 1" dur="3.8s" begin="0s" repeatCount="indefinite"/>
      <animate attributeName="r" values="3;3;2;0.7" keyTimes="0;0.16;0.5;1" dur="3.8s" begin="0s" repeatCount="indefinite"/>
      <animate attributeName="opacity" values="0;0;1;0.55;1;0.4;0.75;0;0" keyTimes="0;0.16;0.2;0.38;0.5;0.62;0.7;0.82;1" dur="3.8s" begin="0s" repeatCount="indefinite"/>
    </circle>
      <circle r="3" fill="#d9a413" opacity="0">
      <animateMotion path="M0,0 Q2.0,16.8 3.2,43.4" keyPoints="0;0;1;1" keyTimes="0;0.16;0.72;1" calcMode="spline" keySplines="0 0 1 1;0.15 0.75 0.35 0.98;0 0 1 1" dur="3.8s" begin="0s" repeatCount="indefinite"/>
      <animate attributeName="r" values="3;3;2;0.7" keyTimes="0;0.16;0.5;1" dur="3.8s" begin="0s" repeatCount="indefinite"/>
      <animate attributeName="opacity" values="0;0;1;0.55;1;0.4;0.75;0;0" keyTimes="0;0.16;0.2;0.38;0.5;0.62;0.7;0.82;1" dur="3.8s" begin="0s" repeatCount="indefinite"/>
    </circle>
      <circle r="3" fill="#b05464" opacity="0">
      <animateMotion path="M0,0 Q-7.3,15.8 -11.8,41.6" keyPoints="0;0;1;1" keyTimes="0;0.16;0.72;1" calcMode="spline" keySplines="0 0 1 1;0.15 0.75 0.35 0.98;0 0 1 1" dur="3.8s" begin="0s" repeatCount="indefinite"/>
      <animate attributeName="r" values="3;3;2;0.7" keyTimes="0;0.16;0.5;1" dur="3.8s" begin="0s" repeatCount="indefinite"/>
      <animate attributeName="opacity" values="0;0;1;0.55;1;0.4;0.75;0;0" keyTimes="0;0.16;0.2;0.38;0.5;0.62;0.7;0.82;1" dur="3.8s" begin="0s" repeatCount="indefinite"/>
    </circle>
      <circle r="3" fill="#d9a413" opacity="0">
      <animateMotion path="M0,0 Q-15.2,11.1 -24.5,34.2" keyPoints="0;0;1;1" keyTimes="0;0.16;0.72;1" calcMode="spline" keySplines="0 0 1 1;0.15 0.75 0.35 0.98;0 0 1 1" dur="3.8s" begin="0s" repeatCount="indefinite"/>
      <animate attributeName="r" values="3;3;2;0.7" keyTimes="0;0.16;0.5;1" dur="3.8s" begin="0s" repeatCount="indefinite"/>
      <animate attributeName="opacity" values="0;0;1;0.55;1;0.4;0.75;0;0" keyTimes="0;0.16;0.2;0.38;0.5;0.62;0.7;0.82;1" dur="3.8s" begin="0s" repeatCount="indefinite"/>
    </circle>
      <circle r="3" fill="#b05464" opacity="0">
      <animateMotion path="M0,0 Q-20.0,3.9 -32.3,22.5" keyPoints="0;0;1;1" keyTimes="0;0.16;0.72;1" calcMode="spline" keySplines="0 0 1 1;0.15 0.75 0.35 0.98;0 0 1 1" dur="3.8s" begin="0s" repeatCount="indefinite"/>
      <animate attributeName="r" values="3;3;2;0.7" keyTimes="0;0.16;0.5;1" dur="3.8s" begin="0s" repeatCount="indefinite"/>
      <animate attributeName="opacity" values="0;0;1;0.55;1;0.4;0.75;0;0" keyTimes="0;0.16;0.2;0.38;0.5;0.62;0.7;0.82;1" dur="3.8s" begin="0s" repeatCount="indefinite"/>
    </circle>
      <circle r="3" fill="#d9a413" opacity="0">
      <animateMotion path="M0,0 Q-20.9,-4.5 -33.7,9.0" keyPoints="0;0;1;1" keyTimes="0;0.16;0.72;1" calcMode="spline" keySplines="0 0 1 1;0.15 0.75 0.35 0.98;0 0 1 1" dur="3.8s" begin="0s" repeatCount="indefinite"/>
      <animate attributeName="r" values="3;3;2;0.7" keyTimes="0;0.16;0.5;1" dur="3.8s" begin="0s" repeatCount="indefinite"/>
      <animate attributeName="opacity" values="0;0;1;0.55;1;0.4;0.75;0;0" keyTimes="0;0.16;0.2;0.38;0.5;0.62;0.7;0.82;1" dur="3.8s" begin="0s" repeatCount="indefinite"/>
    </circle>
      <circle r="3" fill="#b05464" opacity="0">
      <animateMotion path="M0,0 Q-17.6,-12.4 -28.5,-3.8" keyPoints="0;0;1;1" keyTimes="0;0.16;0.72;1" calcMode="spline" keySplines="0 0 1 1;0.15 0.75 0.35 0.98;0 0 1 1" dur="3.8s" begin="0s" repeatCount="indefinite"/>
      <animate attributeName="r" values="3;3;2;0.7" keyTimes="0;0.16;0.5;1" dur="3.8s" begin="0s" repeatCount="indefinite"/>
      <animate attributeName="opacity" values="0;0;1;0.55;1;0.4;0.75;0;0" keyTimes="0;0.16;0.2;0.38;0.5;0.62;0.7;0.82;1" dur="3.8s" begin="0s" repeatCount="indefinite"/>
    </circle>
      <circle r="3" fill="#d9a413" opacity="0">
      <animateMotion path="M0,0 Q-10.9,-18.3 -17.6,-13.3" keyPoints="0;0;1;1" keyTimes="0;0.16;0.72;1" calcMode="spline" keySplines="0 0 1 1;0.15 0.75 0.35 0.98;0 0 1 1" dur="3.8s" begin="0s" repeatCount="indefinite"/>
      <animate attributeName="r" values="3;3;2;0.7" keyTimes="0;0.16;0.5;1" dur="3.8s" begin="0s" repeatCount="indefinite"/>
      <animate attributeName="opacity" values="0;0;1;0.55;1;0.4;0.75;0;0" keyTimes="0;0.16;0.2;0.38;0.5;0.62;0.7;0.82;1" dur="3.8s" begin="0s" repeatCount="indefinite"/>
    </circle>
      <circle r="3" fill="#b05464" opacity="0">
      <animateMotion path="M0,0 Q-2.0,-20.9 -3.2,-17.5" keyPoints="0;0;1;1" keyTimes="0;0.16;0.72;1" calcMode="spline" keySplines="0 0 1 1;0.15 0.75 0.35 0.98;0 0 1 1" dur="3.8s" begin="0s" repeatCount="indefinite"/>
      <animate attributeName="r" values="3;3;2;0.7" keyTimes="0;0.16;0.5;1" dur="3.8s" begin="0s" repeatCount="indefinite"/>
      <animate attributeName="opacity" values="0;0;1;0.55;1;0.4;0.75;0;0" keyTimes="0;0.16;0.2;0.38;0.5;0.62;0.7;0.82;1" dur="3.8s" begin="0s" repeatCount="indefinite"/>
    </circle>
      <circle r="3" fill="#d9a413" opacity="0">
      <animateMotion path="M0,0 Q7.3,-19.8 11.8,-15.8" keyPoints="0;0;1;1" keyTimes="0;0.16;0.72;1" calcMode="spline" keySplines="0 0 1 1;0.15 0.75 0.35 0.98;0 0 1 1" dur="3.8s" begin="0s" repeatCount="indefinite"/>
      <animate attributeName="r" values="3;3;2;0.7" keyTimes="0;0.16;0.5;1" dur="3.8s" begin="0s" repeatCount="indefinite"/>
      <animate attributeName="opacity" values="0;0;1;0.55;1;0.4;0.75;0;0" keyTimes="0;0.16;0.2;0.38;0.5;0.62;0.7;0.82;1" dur="3.8s" begin="0s" repeatCount="indefinite"/>
    </circle>
      <circle r="3" fill="#b05464" opacity="0">
      <animateMotion path="M0,0 Q15.2,-15.2 24.5,-8.3" keyPoints="0;0;1;1" keyTimes="0;0.16;0.72;1" calcMode="spline" keySplines="0 0 1 1;0.15 0.75 0.35 0.98;0 0 1 1" dur="3.8s" begin="0s" repeatCount="indefinite"/>
      <animate attributeName="r" values="3;3;2;0.7" keyTimes="0;0.16;0.5;1" dur="3.8s" begin="0s" repeatCount="indefinite"/>
      <animate attributeName="opacity" values="0;0;1;0.55;1;0.4;0.75;0;0" keyTimes="0;0.16;0.2;0.38;0.5;0.62;0.7;0.82;1" dur="3.8s" begin="0s" repeatCount="indefinite"/>
    </circle>
      <circle r="3" fill="#d9a413" opacity="0">
      <animateMotion path="M0,0 Q20.0,-8.0 32.3,3.3" keyPoints="0;0;1;1" keyTimes="0;0.16;0.72;1" calcMode="spline" keySplines="0 0 1 1;0.15 0.75 0.35 0.98;0 0 1 1" dur="3.8s" begin="0s" repeatCount="indefinite"/>
      <animate attributeName="r" values="3;3;2;0.7" keyTimes="0;0.16;0.5;1" dur="3.8s" begin="0s" repeatCount="indefinite"/>
      <animate attributeName="opacity" values="0;0;1;0.55;1;0.4;0.75;0;0" keyTimes="0;0.16;0.2;0.38;0.5;0.62;0.7;0.82;1" dur="3.8s" begin="0s" repeatCount="indefinite"/>
    </circle>
    </g>
  <g transform="translate(118,36)">
      <circle r="2" fill="#c98f1a" opacity="0">
      <animateMotion path="M0,56 L0,0" keyPoints="0;1;1" keyTimes="0;0.15;1" dur="4.4s" begin="-1.9s" repeatCount="indefinite" calcMode="linear"/>
      <animate attributeName="opacity" values="0;0.95;0.95;0;0" keyTimes="0;0.03;0.12;0.16;1" dur="4.4s" begin="-1.9s" repeatCount="indefinite"/>
    </circle>
      <circle r="1" fill="#d9a413" opacity="0">
      <animate attributeName="r" values="1;10;1" keyTimes="0;0.21;0.3" dur="4.4s" begin="-1.9s" repeatCount="indefinite"/>
      <animate attributeName="opacity" values="0;0;0.8;0;0" keyTimes="0;0.155;0.18;0.28;1" dur="4.4s" begin="-1.9s" repeatCount="indefinite"/>
    </circle>
      <circle r="3" fill="#12808b" opacity="0">
      <animateMotion path="M0,0 Q16.0,0.3 25.8,12.9" keyPoints="0;0;1;1" keyTimes="0;0.16;0.72;1" calcMode="spline" keySplines="0 0 1 1;0.15 0.75 0.35 0.98;0 0 1 1" dur="4.4s" begin="-1.9s" repeatCount="indefinite"/>
      <animate attributeName="r" values="3;3;2;0.7" keyTimes="0;0.16;0.5;1" dur="4.4s" begin="-1.9s" repeatCount="indefinite"/>
      <animate attributeName="opacity" values="0;0;1;0.55;1;0.4;0.75;0;0" keyTimes="0;0.16;0.2;0.38;0.5;0.62;0.7;0.82;1" dur="4.4s" begin="-1.9s" repeatCount="indefinite"/>
    </circle>
      <circle r="3" fill="#b05464" opacity="0">
      <animateMotion path="M0,0 Q13.5,6.4 21.8,22.7" keyPoints="0;0;1;1" keyTimes="0;0.16;0.72;1" calcMode="spline" keySplines="0 0 1 1;0.15 0.75 0.35 0.98;0 0 1 1" dur="4.4s" begin="-1.9s" repeatCount="indefinite"/>
      <animate attributeName="r" values="3;3;2;0.7" keyTimes="0;0.16;0.5;1" dur="4.4s" begin="-1.9s" repeatCount="indefinite"/>
      <animate attributeName="opacity" values="0;0;1;0.55;1;0.4;0.75;0;0" keyTimes="0;0.16;0.2;0.38;0.5;0.62;0.7;0.82;1" dur="4.4s" begin="-1.9s" repeatCount="indefinite"/>
    </circle>
      <circle r="3" fill="#12808b" opacity="0">
      <animateMotion path="M0,0 Q8.3,10.9 13.4,29.9" keyPoints="0;0;1;1" keyTimes="0;0.16;0.72;1" calcMode="spline" keySplines="0 0 1 1;0.15 0.75 0.35 0.98;0 0 1 1" dur="4.4s" begin="-1.9s" repeatCount="indefinite"/>
      <animate attributeName="r" values="3;3;2;0.7" keyTimes="0;0.16;0.5;1" dur="4.4s" begin="-1.9s" repeatCount="indefinite"/>
      <animate attributeName="opacity" values="0;0;1;0.55;1;0.4;0.75;0;0" keyTimes="0;0.16;0.2;0.38;0.5;0.62;0.7;0.82;1" dur="4.4s" begin="-1.9s" repeatCount="indefinite"/>
    </circle>
      <circle r="3" fill="#b05464" opacity="0">
      <animateMotion path="M0,0 Q1.5,12.9 2.5,33.2" keyPoints="0;0;1;1" keyTimes="0;0.16;0.72;1" calcMode="spline" keySplines="0 0 1 1;0.15 0.75 0.35 0.98;0 0 1 1" dur="4.4s" begin="-1.9s" repeatCount="indefinite"/>
      <animate attributeName="r" values="3;3;2;0.7" keyTimes="0;0.16;0.5;1" dur="4.4s" begin="-1.9s" repeatCount="indefinite"/>
      <animate attributeName="opacity" values="0;0;1;0.55;1;0.4;0.75;0;0" keyTimes="0;0.16;0.2;0.38;0.5;0.62;0.7;0.82;1" dur="4.4s" begin="-1.9s" repeatCount="indefinite"/>
    </circle>
      <circle r="3" fill="#12808b" opacity="0">
      <animateMotion path="M0,0 Q-5.6,12.0 -9.0,31.8" keyPoints="0;0;1;1" keyTimes="0;0.16;0.72;1" calcMode="spline" keySplines="0 0 1 1;0.15 0.75 0.35 0.98;0 0 1 1" dur="4.4s" begin="-1.9s" repeatCount="indefinite"/>
      <animate attributeName="r" values="3;3;2;0.7" keyTimes="0;0.16;0.5;1" dur="4.4s" begin="-1.9s" repeatCount="indefinite"/>
      <animate attributeName="opacity" values="0;0;1;0.55;1;0.4;0.75;0;0" keyTimes="0;0.16;0.2;0.38;0.5;0.62;0.7;0.82;1" dur="4.4s" begin="-1.9s" repeatCount="indefinite"/>
    </circle>
      <circle r="3" fill="#b05464" opacity="0">
      <animateMotion path="M0,0 Q-11.6,8.5 -18.7,26.1" keyPoints="0;0;1;1" keyTimes="0;0.16;0.72;1" calcMode="spline" keySplines="0 0 1 1;0.15 0.75 0.35 0.98;0 0 1 1" dur="4.4s" begin="-1.9s" repeatCount="indefinite"/>
      <animate attributeName="r" values="3;3;2;0.7" keyTimes="0;0.16;0.5;1" dur="4.4s" begin="-1.9s" repeatCount="indefinite"/>
      <animate attributeName="opacity" values="0;0;1;0.55;1;0.4;0.75;0;0" keyTimes="0;0.16;0.2;0.38;0.5;0.62;0.7;0.82;1" dur="4.4s" begin="-1.9s" repeatCount="indefinite"/>
    </circle>
      <circle r="3" fill="#12808b" opacity="0">
      <animateMotion path="M0,0 Q-15.3,3.0 -24.7,17.2" keyPoints="0;0;1;1" keyTimes="0;0.16;0.72;1" calcMode="spline" keySplines="0 0 1 1;0.15 0.75 0.35 0.98;0 0 1 1" dur="4.4s" begin="-1.9s" repeatCount="indefinite"/>
      <animate attributeName="r" values="3;3;2;0.7" keyTimes="0;0.16;0.5;1" dur="4.4s" begin="-1.9s" repeatCount="indefinite"/>
      <animate attributeName="opacity" values="0;0;1;0.55;1;0.4;0.75;0;0" keyTimes="0;0.16;0.2;0.38;0.5;0.62;0.7;0.82;1" dur="4.4s" begin="-1.9s" repeatCount="indefinite"/>
    </circle>
      <circle r="3" fill="#b05464" opacity="0">
      <animateMotion path="M0,0 Q-16.0,-3.4 -25.8,6.8" keyPoints="0;0;1;1" keyTimes="0;0.16;0.72;1" calcMode="spline" keySplines="0 0 1 1;0.15 0.75 0.35 0.98;0 0 1 1" dur="4.4s" begin="-1.9s" repeatCount="indefinite"/>
      <animate attributeName="r" values="3;3;2;0.7" keyTimes="0;0.16;0.5;1" dur="4.4s" begin="-1.9s" repeatCount="indefinite"/>
      <animate attributeName="opacity" values="0;0;1;0.55;1;0.4;0.75;0;0" keyTimes="0;0.16;0.2;0.38;0.5;0.62;0.7;0.82;1" dur="4.4s" begin="-1.9s" repeatCount="indefinite"/>
    </circle>
      <circle r="3" fill="#12808b" opacity="0">
      <animateMotion path="M0,0 Q-13.5,-9.5 -21.8,-2.9" keyPoints="0;0;1;1" keyTimes="0;0.16;0.72;1" calcMode="spline" keySplines="0 0 1 1;0.15 0.75 0.35 0.98;0 0 1 1" dur="4.4s" begin="-1.9s" repeatCount="indefinite"/>
      <animate attributeName="r" values="3;3;2;0.7" keyTimes="0;0.16;0.5;1" dur="4.4s" begin="-1.9s" repeatCount="indefinite"/>
      <animate attributeName="opacity" values="0;0;1;0.55;1;0.4;0.75;0;0" keyTimes="0;0.16;0.2;0.38;0.5;0.62;0.7;0.82;1" dur="4.4s" begin="-1.9s" repeatCount="indefinite"/>
    </circle>
      <circle r="3" fill="#b05464" opacity="0">
      <animateMotion path="M0,0 Q-8.3,-14.0 -13.4,-10.2" keyPoints="0;0;1;1" keyTimes="0;0.16;0.72;1" calcMode="spline" keySplines="0 0 1 1;0.15 0.75 0.35 0.98;0 0 1 1" dur="4.4s" begin="-1.9s" repeatCount="indefinite"/>
      <animate attributeName="r" values="3;3;2;0.7" keyTimes="0;0.16;0.5;1" dur="4.4s" begin="-1.9s" repeatCount="indefinite"/>
      <animate attributeName="opacity" values="0;0;1;0.55;1;0.4;0.75;0;0" keyTimes="0;0.16;0.2;0.38;0.5;0.62;0.7;0.82;1" dur="4.4s" begin="-1.9s" repeatCount="indefinite"/>
    </circle>
      <circle r="3" fill="#12808b" opacity="0">
      <animateMotion path="M0,0 Q-1.5,-16.0 -2.5,-13.4" keyPoints="0;0;1;1" keyTimes="0;0.16;0.72;1" calcMode="spline" keySplines="0 0 1 1;0.15 0.75 0.35 0.98;0 0 1 1" dur="4.4s" begin="-1.9s" repeatCount="indefinite"/>
      <animate attributeName="r" values="3;3;2;0.7" keyTimes="0;0.16;0.5;1" dur="4.4s" begin="-1.9s" repeatCount="indefinite"/>
      <animate attributeName="opacity" values="0;0;1;0.55;1;0.4;0.75;0;0" keyTimes="0;0.16;0.2;0.38;0.5;0.62;0.7;0.82;1" dur="4.4s" begin="-1.9s" repeatCount="indefinite"/>
    </circle>
      <circle r="3" fill="#b05464" opacity="0">
      <animateMotion path="M0,0 Q5.6,-15.2 9.0,-12.1" keyPoints="0;0;1;1" keyTimes="0;0.16;0.72;1" calcMode="spline" keySplines="0 0 1 1;0.15 0.75 0.35 0.98;0 0 1 1" dur="4.4s" begin="-1.9s" repeatCount="indefinite"/>
      <animate attributeName="r" values="3;3;2;0.7" keyTimes="0;0.16;0.5;1" dur="4.4s" begin="-1.9s" repeatCount="indefinite"/>
      <animate attributeName="opacity" values="0;0;1;0.55;1;0.4;0.75;0;0" keyTimes="0;0.16;0.2;0.38;0.5;0.62;0.7;0.82;1" dur="4.4s" begin="-1.9s" repeatCount="indefinite"/>
    </circle>
      <circle r="3" fill="#12808b" opacity="0">
      <animateMotion path="M0,0 Q11.6,-11.6 18.7,-6.4" keyPoints="0;0;1;1" keyTimes="0;0.16;0.72;1" calcMode="spline" keySplines="0 0 1 1;0.15 0.75 0.35 0.98;0 0 1 1" dur="4.4s" begin="-1.9s" repeatCount="indefinite"/>
      <animate attributeName="r" values="3;3;2;0.7" keyTimes="0;0.16;0.5;1" dur="4.4s" begin="-1.9s" repeatCount="indefinite"/>
      <animate attributeName="opacity" values="0;0;1;0.55;1;0.4;0.75;0;0" keyTimes="0;0.16;0.2;0.38;0.5;0.62;0.7;0.82;1" dur="4.4s" begin="-1.9s" repeatCount="indefinite"/>
    </circle>
      <circle r="3" fill="#b05464" opacity="0">
      <animateMotion path="M0,0 Q15.3,-6.1 24.7,2.5" keyPoints="0;0;1;1" keyTimes="0;0.16;0.72;1" calcMode="spline" keySplines="0 0 1 1;0.15 0.75 0.35 0.98;0 0 1 1" dur="4.4s" begin="-1.9s" repeatCount="indefinite"/>
      <animate attributeName="r" values="3;3;2;0.7" keyTimes="0;0.16;0.5;1" dur="4.4s" begin="-1.9s" repeatCount="indefinite"/>
      <animate attributeName="opacity" values="0;0;1;0.55;1;0.4;0.75;0;0" keyTimes="0;0.16;0.2;0.38;0.5;0.62;0.7;0.82;1" dur="4.4s" begin="-1.9s" repeatCount="indefinite"/>
    </circle>
    </g>
  <g transform="translate(96,92)">
      <circle r="2" fill="#c98f1a" opacity="0">
      <animateMotion path="M0,50 L0,0" keyPoints="0;1;1" keyTimes="0;0.15;1" dur="3.4s" begin="-1.1s" repeatCount="indefinite" calcMode="linear"/>
      <animate attributeName="opacity" values="0;0.95;0.95;0;0" keyTimes="0;0.03;0.12;0.16;1" dur="3.4s" begin="-1.1s" repeatCount="indefinite"/>
    </circle>
      <circle r="1" fill="#d9a413" opacity="0">
      <animate attributeName="r" values="1;8;1" keyTimes="0;0.21;0.3" dur="3.4s" begin="-1.1s" repeatCount="indefinite"/>
      <animate attributeName="opacity" values="0;0;0.8;0;0" keyTimes="0;0.155;0.18;0.28;1" dur="3.4s" begin="-1.1s" repeatCount="indefinite"/>
    </circle>
      <circle r="3" fill="#c26a3a" opacity="0">
      <animateMotion path="M0,0 Q12.3,0.2 19.8,9.9" keyPoints="0;0;1;1" keyTimes="0;0.16;0.72;1" calcMode="spline" keySplines="0 0 1 1;0.15 0.75 0.35 0.98;0 0 1 1" dur="3.4s" begin="-1.1s" repeatCount="indefinite"/>
      <animate attributeName="r" values="3;3;2;0.7" keyTimes="0;0.16;0.5;1" dur="3.4s" begin="-1.1s" repeatCount="indefinite"/>
      <animate attributeName="opacity" values="0;0;1;0.55;1;0.4;0.75;0;0" keyTimes="0;0.16;0.2;0.38;0.5;0.62;0.7;0.82;1" dur="3.4s" begin="-1.1s" repeatCount="indefinite"/>
    </circle>
      <circle r="3" fill="#12808b" opacity="0">
      <animateMotion path="M0,0 Q10.4,4.9 16.7,17.4" keyPoints="0;0;1;1" keyTimes="0;0.16;0.72;1" calcMode="spline" keySplines="0 0 1 1;0.15 0.75 0.35 0.98;0 0 1 1" dur="3.4s" begin="-1.1s" repeatCount="indefinite"/>
      <animate attributeName="r" values="3;3;2;0.7" keyTimes="0;0.16;0.5;1" dur="3.4s" begin="-1.1s" repeatCount="indefinite"/>
      <animate attributeName="opacity" values="0;0;1;0.55;1;0.4;0.75;0;0" keyTimes="0;0.16;0.2;0.38;0.5;0.62;0.7;0.82;1" dur="3.4s" begin="-1.1s" repeatCount="indefinite"/>
    </circle>
      <circle r="3" fill="#c26a3a" opacity="0">
      <animateMotion path="M0,0 Q6.4,8.4 10.3,23.0" keyPoints="0;0;1;1" keyTimes="0;0.16;0.72;1" calcMode="spline" keySplines="0 0 1 1;0.15 0.75 0.35 0.98;0 0 1 1" dur="3.4s" begin="-1.1s" repeatCount="indefinite"/>
      <animate attributeName="r" values="3;3;2;0.7" keyTimes="0;0.16;0.5;1" dur="3.4s" begin="-1.1s" repeatCount="indefinite"/>
      <animate attributeName="opacity" values="0;0;1;0.55;1;0.4;0.75;0;0" keyTimes="0;0.16;0.2;0.38;0.5;0.62;0.7;0.82;1" dur="3.4s" begin="-1.1s" repeatCount="indefinite"/>
    </circle>
      <circle r="3" fill="#12808b" opacity="0">
      <animateMotion path="M0,0 Q1.2,9.9 1.9,25.5" keyPoints="0;0;1;1" keyTimes="0;0.16;0.72;1" calcMode="spline" keySplines="0 0 1 1;0.15 0.75 0.35 0.98;0 0 1 1" dur="3.4s" begin="-1.1s" repeatCount="indefinite"/>
      <animate attributeName="r" values="3;3;2;0.7" keyTimes="0;0.16;0.5;1" dur="3.4s" begin="-1.1s" repeatCount="indefinite"/>
      <animate attributeName="opacity" values="0;0;1;0.55;1;0.4;0.75;0;0" keyTimes="0;0.16;0.2;0.38;0.5;0.62;0.7;0.82;1" dur="3.4s" begin="-1.1s" repeatCount="indefinite"/>
    </circle>
      <circle r="3" fill="#c26a3a" opacity="0">
      <animateMotion path="M0,0 Q-4.3,9.3 -6.9,24.5" keyPoints="0;0;1;1" keyTimes="0;0.16;0.72;1" calcMode="spline" keySplines="0 0 1 1;0.15 0.75 0.35 0.98;0 0 1 1" dur="3.4s" begin="-1.1s" repeatCount="indefinite"/>
      <animate attributeName="r" values="3;3;2;0.7" keyTimes="0;0.16;0.5;1" dur="3.4s" begin="-1.1s" repeatCount="indefinite"/>
      <animate attributeName="opacity" values="0;0;1;0.55;1;0.4;0.75;0;0" keyTimes="0;0.16;0.2;0.38;0.5;0.62;0.7;0.82;1" dur="3.4s" begin="-1.1s" repeatCount="indefinite"/>
    </circle>
      <circle r="3" fill="#12808b" opacity="0">
      <animateMotion path="M0,0 Q-8.9,6.5 -14.4,20.1" keyPoints="0;0;1;1" keyTimes="0;0.16;0.72;1" calcMode="spline" keySplines="0 0 1 1;0.15 0.75 0.35 0.98;0 0 1 1" dur="3.4s" begin="-1.1s" repeatCount="indefinite"/>
      <animate attributeName="r" values="3;3;2;0.7" keyTimes="0;0.16;0.5;1" dur="3.4s" begin="-1.1s" repeatCount="indefinite"/>
      <animate attributeName="opacity" values="0;0;1;0.55;1;0.4;0.75;0;0" keyTimes="0;0.16;0.2;0.38;0.5;0.62;0.7;0.82;1" dur="3.4s" begin="-1.1s" repeatCount="indefinite"/>
    </circle>
      <circle r="3" fill="#c26a3a" opacity="0">
      <animateMotion path="M0,0 Q-11.8,2.3 -19.0,13.2" keyPoints="0;0;1;1" keyTimes="0;0.16;0.72;1" calcMode="spline" keySplines="0 0 1 1;0.15 0.75 0.35 0.98;0 0 1 1" dur="3.4s" begin="-1.1s" repeatCount="indefinite"/>
      <animate attributeName="r" values="3;3;2;0.7" keyTimes="0;0.16;0.5;1" dur="3.4s" begin="-1.1s" repeatCount="indefinite"/>
      <animate attributeName="opacity" values="0;0;1;0.55;1;0.4;0.75;0;0" keyTimes="0;0.16;0.2;0.38;0.5;0.62;0.7;0.82;1" dur="3.4s" begin="-1.1s" repeatCount="indefinite"/>
    </circle>
      <circle r="3" fill="#12808b" opacity="0">
      <animateMotion path="M0,0 Q-12.3,-2.6 -19.8,5.3" keyPoints="0;0;1;1" keyTimes="0;0.16;0.72;1" calcMode="spline" keySplines="0 0 1 1;0.15 0.75 0.35 0.98;0 0 1 1" dur="3.4s" begin="-1.1s" repeatCount="indefinite"/>
      <animate attributeName="r" values="3;3;2;0.7" keyTimes="0;0.16;0.5;1" dur="3.4s" begin="-1.1s" repeatCount="indefinite"/>
      <animate attributeName="opacity" values="0;0;1;0.55;1;0.4;0.75;0;0" keyTimes="0;0.16;0.2;0.38;0.5;0.62;0.7;0.82;1" dur="3.4s" begin="-1.1s" repeatCount="indefinite"/>
    </circle>
      <circle r="3" fill="#c26a3a" opacity="0">
      <animateMotion path="M0,0 Q-10.4,-7.3 -16.7,-2.2" keyPoints="0;0;1;1" keyTimes="0;0.16;0.72;1" calcMode="spline" keySplines="0 0 1 1;0.15 0.75 0.35 0.98;0 0 1 1" dur="3.4s" begin="-1.1s" repeatCount="indefinite"/>
      <animate attributeName="r" values="3;3;2;0.7" keyTimes="0;0.16;0.5;1" dur="3.4s" begin="-1.1s" repeatCount="indefinite"/>
      <animate attributeName="opacity" values="0;0;1;0.55;1;0.4;0.75;0;0" keyTimes="0;0.16;0.2;0.38;0.5;0.62;0.7;0.82;1" dur="3.4s" begin="-1.1s" repeatCount="indefinite"/>
    </circle>
      <circle r="3" fill="#12808b" opacity="0">
      <animateMotion path="M0,0 Q-6.4,-10.8 -10.3,-7.8" keyPoints="0;0;1;1" keyTimes="0;0.16;0.72;1" calcMode="spline" keySplines="0 0 1 1;0.15 0.75 0.35 0.98;0 0 1 1" dur="3.4s" begin="-1.1s" repeatCount="indefinite"/>
      <animate attributeName="r" values="3;3;2;0.7" keyTimes="0;0.16;0.5;1" dur="3.4s" begin="-1.1s" repeatCount="indefinite"/>
      <animate attributeName="opacity" values="0;0;1;0.55;1;0.4;0.75;0;0" keyTimes="0;0.16;0.2;0.38;0.5;0.62;0.7;0.82;1" dur="3.4s" begin="-1.1s" repeatCount="indefinite"/>
    </circle>
      <circle r="3" fill="#c26a3a" opacity="0">
      <animateMotion path="M0,0 Q-1.2,-12.3 -1.9,-10.3" keyPoints="0;0;1;1" keyTimes="0;0.16;0.72;1" calcMode="spline" keySplines="0 0 1 1;0.15 0.75 0.35 0.98;0 0 1 1" dur="3.4s" begin="-1.1s" repeatCount="indefinite"/>
      <animate attributeName="r" values="3;3;2;0.7" keyTimes="0;0.16;0.5;1" dur="3.4s" begin="-1.1s" repeatCount="indefinite"/>
      <animate attributeName="opacity" values="0;0;1;0.55;1;0.4;0.75;0;0" keyTimes="0;0.16;0.2;0.38;0.5;0.62;0.7;0.82;1" dur="3.4s" begin="-1.1s" repeatCount="indefinite"/>
    </circle>
      <circle r="3" fill="#12808b" opacity="0">
      <animateMotion path="M0,0 Q4.3,-11.7 6.9,-9.3" keyPoints="0;0;1;1" keyTimes="0;0.16;0.72;1" calcMode="spline" keySplines="0 0 1 1;0.15 0.75 0.35 0.98;0 0 1 1" dur="3.4s" begin="-1.1s" repeatCount="indefinite"/>
      <animate attributeName="r" values="3;3;2;0.7" keyTimes="0;0.16;0.5;1" dur="3.4s" begin="-1.1s" repeatCount="indefinite"/>
      <animate attributeName="opacity" values="0;0;1;0.55;1;0.4;0.75;0;0" keyTimes="0;0.16;0.2;0.38;0.5;0.62;0.7;0.82;1" dur="3.4s" begin="-1.1s" repeatCount="indefinite"/>
    </circle>
      <circle r="3" fill="#c26a3a" opacity="0">
      <animateMotion path="M0,0 Q8.9,-8.9 14.4,-4.9" keyPoints="0;0;1;1" keyTimes="0;0.16;0.72;1" calcMode="spline" keySplines="0 0 1 1;0.15 0.75 0.35 0.98;0 0 1 1" dur="3.4s" begin="-1.1s" repeatCount="indefinite"/>
      <animate attributeName="r" values="3;3;2;0.7" keyTimes="0;0.16;0.5;1" dur="3.4s" begin="-1.1s" repeatCount="indefinite"/>
      <animate attributeName="opacity" values="0;0;1;0.55;1;0.4;0.75;0;0" keyTimes="0;0.16;0.2;0.38;0.5;0.62;0.7;0.82;1" dur="3.4s" begin="-1.1s" repeatCount="indefinite"/>
    </circle>
      <circle r="3" fill="#12808b" opacity="0">
      <animateMotion path="M0,0 Q11.8,-4.7 19.0,2.0" keyPoints="0;0;1;1" keyTimes="0;0.16;0.72;1" calcMode="spline" keySplines="0 0 1 1;0.15 0.75 0.35 0.98;0 0 1 1" dur="3.4s" begin="-1.1s" repeatCount="indefinite"/>
      <animate attributeName="r" values="3;3;2;0.7" keyTimes="0;0.16;0.5;1" dur="3.4s" begin="-1.1s" repeatCount="indefinite"/>
      <animate attributeName="opacity" values="0;0;1;0.55;1;0.4;0.75;0;0" keyTimes="0;0.16;0.2;0.38;0.5;0.62;0.7;0.82;1" dur="3.4s" begin="-1.1s" repeatCount="indefinite"/>
    </circle>
    </g>
</svg>`;
const AZADI_FIREWORKS_R = `<svg class="azadi-fireworks azadi-fw-right" viewBox="0 0 160 140" aria-hidden="true">
  <g transform="translate(48,54)">
      <circle r="2" fill="#c98f1a" opacity="0">
      <animateMotion path="M0,64 L0,0" keyPoints="0;1;1" keyTimes="0;0.15;1" dur="4.1s" begin="-0.7s" repeatCount="indefinite" calcMode="linear"/>
      <animate attributeName="opacity" values="0;0.95;0.95;0;0" keyTimes="0;0.03;0.12;0.16;1" dur="4.1s" begin="-0.7s" repeatCount="indefinite"/>
    </circle>
      <circle r="1" fill="#d9a413" opacity="0">
      <animate attributeName="r" values="1;14;1" keyTimes="0;0.21;0.3" dur="4.1s" begin="-0.7s" repeatCount="indefinite"/>
      <animate attributeName="opacity" values="0;0;0.8;0;0" keyTimes="0;0.155;0.18;0.28;1" dur="4.1s" begin="-0.7s" repeatCount="indefinite"/>
    </circle>
      <circle r="3" fill="#d9a413" opacity="0">
      <animateMotion path="M0,0 Q20.9,0.4 33.7,16.9" keyPoints="0;0;1;1" keyTimes="0;0.16;0.72;1" calcMode="spline" keySplines="0 0 1 1;0.15 0.75 0.35 0.98;0 0 1 1" dur="4.1s" begin="-0.7s" repeatCount="indefinite"/>
      <animate attributeName="r" values="3;3;2;0.7" keyTimes="0;0.16;0.5;1" dur="4.1s" begin="-0.7s" repeatCount="indefinite"/>
      <animate attributeName="opacity" values="0;0;1;0.55;1;0.4;0.75;0;0" keyTimes="0;0.16;0.2;0.38;0.5;0.62;0.7;0.82;1" dur="4.1s" begin="-0.7s" repeatCount="indefinite"/>
    </circle>
      <circle r="3" fill="#12808b" opacity="0">
      <animateMotion path="M0,0 Q17.6,8.3 28.5,29.7" keyPoints="0;0;1;1" keyTimes="0;0.16;0.72;1" calcMode="spline" keySplines="0 0 1 1;0.15 0.75 0.35 0.98;0 0 1 1" dur="4.1s" begin="-0.7s" repeatCount="indefinite"/>
      <animate attributeName="r" values="3;3;2;0.7" keyTimes="0;0.16;0.5;1" dur="4.1s" begin="-0.7s" repeatCount="indefinite"/>
      <animate attributeName="opacity" values="0;0;1;0.55;1;0.4;0.75;0;0" keyTimes="0;0.16;0.2;0.38;0.5;0.62;0.7;0.82;1" dur="4.1s" begin="-0.7s" repeatCount="indefinite"/>
    </circle>
      <circle r="3" fill="#d9a413" opacity="0">
      <animateMotion path="M0,0 Q10.9,14.2 17.6,39.1" keyPoints="0;0;1;1" keyTimes="0;0.16;0.72;1" calcMode="spline" keySplines="0 0 1 1;0.15 0.75 0.35 0.98;0 0 1 1" dur="4.1s" begin="-0.7s" repeatCount="indefinite"/>
      <animate attributeName="r" values="3;3;2;0.7" keyTimes="0;0.16;0.5;1" dur="4.1s" begin="-0.7s" repeatCount="indefinite"/>
      <animate attributeName="opacity" values="0;0;1;0.55;1;0.4;0.75;0;0" keyTimes="0;0.16;0.2;0.38;0.5;0.62;0.7;0.82;1" dur="4.1s" begin="-0.7s" repeatCount="indefinite"/>
    </circle>
      <circle r="3" fill="#12808b" opacity="0">
      <animateMotion path="M0,0 Q2.0,16.8 3.2,43.4" keyPoints="0;0;1;1" keyTimes="0;0.16;0.72;1" calcMode="spline" keySplines="0 0 1 1;0.15 0.75 0.35 0.98;0 0 1 1" dur="4.1s" begin="-0.7s" repeatCount="indefinite"/>
      <animate attributeName="r" values="3;3;2;0.7" keyTimes="0;0.16;0.5;1" dur="4.1s" begin="-0.7s" repeatCount="indefinite"/>
      <animate attributeName="opacity" values="0;0;1;0.55;1;0.4;0.75;0;0" keyTimes="0;0.16;0.2;0.38;0.5;0.62;0.7;0.82;1" dur="4.1s" begin="-0.7s" repeatCount="indefinite"/>
    </circle>
      <circle r="3" fill="#d9a413" opacity="0">
      <animateMotion path="M0,0 Q-7.3,15.8 -11.8,41.6" keyPoints="0;0;1;1" keyTimes="0;0.16;0.72;1" calcMode="spline" keySplines="0 0 1 1;0.15 0.75 0.35 0.98;0 0 1 1" dur="4.1s" begin="-0.7s" repeatCount="indefinite"/>
      <animate attributeName="r" values="3;3;2;0.7" keyTimes="0;0.16;0.5;1" dur="4.1s" begin="-0.7s" repeatCount="indefinite"/>
      <animate attributeName="opacity" values="0;0;1;0.55;1;0.4;0.75;0;0" keyTimes="0;0.16;0.2;0.38;0.5;0.62;0.7;0.82;1" dur="4.1s" begin="-0.7s" repeatCount="indefinite"/>
    </circle>
      <circle r="3" fill="#12808b" opacity="0">
      <animateMotion path="M0,0 Q-15.2,11.1 -24.5,34.2" keyPoints="0;0;1;1" keyTimes="0;0.16;0.72;1" calcMode="spline" keySplines="0 0 1 1;0.15 0.75 0.35 0.98;0 0 1 1" dur="4.1s" begin="-0.7s" repeatCount="indefinite"/>
      <animate attributeName="r" values="3;3;2;0.7" keyTimes="0;0.16;0.5;1" dur="4.1s" begin="-0.7s" repeatCount="indefinite"/>
      <animate attributeName="opacity" values="0;0;1;0.55;1;0.4;0.75;0;0" keyTimes="0;0.16;0.2;0.38;0.5;0.62;0.7;0.82;1" dur="4.1s" begin="-0.7s" repeatCount="indefinite"/>
    </circle>
      <circle r="3" fill="#d9a413" opacity="0">
      <animateMotion path="M0,0 Q-20.0,3.9 -32.3,22.5" keyPoints="0;0;1;1" keyTimes="0;0.16;0.72;1" calcMode="spline" keySplines="0 0 1 1;0.15 0.75 0.35 0.98;0 0 1 1" dur="4.1s" begin="-0.7s" repeatCount="indefinite"/>
      <animate attributeName="r" values="3;3;2;0.7" keyTimes="0;0.16;0.5;1" dur="4.1s" begin="-0.7s" repeatCount="indefinite"/>
      <animate attributeName="opacity" values="0;0;1;0.55;1;0.4;0.75;0;0" keyTimes="0;0.16;0.2;0.38;0.5;0.62;0.7;0.82;1" dur="4.1s" begin="-0.7s" repeatCount="indefinite"/>
    </circle>
      <circle r="3" fill="#12808b" opacity="0">
      <animateMotion path="M0,0 Q-20.9,-4.5 -33.7,9.0" keyPoints="0;0;1;1" keyTimes="0;0.16;0.72;1" calcMode="spline" keySplines="0 0 1 1;0.15 0.75 0.35 0.98;0 0 1 1" dur="4.1s" begin="-0.7s" repeatCount="indefinite"/>
      <animate attributeName="r" values="3;3;2;0.7" keyTimes="0;0.16;0.5;1" dur="4.1s" begin="-0.7s" repeatCount="indefinite"/>
      <animate attributeName="opacity" values="0;0;1;0.55;1;0.4;0.75;0;0" keyTimes="0;0.16;0.2;0.38;0.5;0.62;0.7;0.82;1" dur="4.1s" begin="-0.7s" repeatCount="indefinite"/>
    </circle>
      <circle r="3" fill="#d9a413" opacity="0">
      <animateMotion path="M0,0 Q-17.6,-12.4 -28.5,-3.8" keyPoints="0;0;1;1" keyTimes="0;0.16;0.72;1" calcMode="spline" keySplines="0 0 1 1;0.15 0.75 0.35 0.98;0 0 1 1" dur="4.1s" begin="-0.7s" repeatCount="indefinite"/>
      <animate attributeName="r" values="3;3;2;0.7" keyTimes="0;0.16;0.5;1" dur="4.1s" begin="-0.7s" repeatCount="indefinite"/>
      <animate attributeName="opacity" values="0;0;1;0.55;1;0.4;0.75;0;0" keyTimes="0;0.16;0.2;0.38;0.5;0.62;0.7;0.82;1" dur="4.1s" begin="-0.7s" repeatCount="indefinite"/>
    </circle>
      <circle r="3" fill="#12808b" opacity="0">
      <animateMotion path="M0,0 Q-10.9,-18.3 -17.6,-13.3" keyPoints="0;0;1;1" keyTimes="0;0.16;0.72;1" calcMode="spline" keySplines="0 0 1 1;0.15 0.75 0.35 0.98;0 0 1 1" dur="4.1s" begin="-0.7s" repeatCount="indefinite"/>
      <animate attributeName="r" values="3;3;2;0.7" keyTimes="0;0.16;0.5;1" dur="4.1s" begin="-0.7s" repeatCount="indefinite"/>
      <animate attributeName="opacity" values="0;0;1;0.55;1;0.4;0.75;0;0" keyTimes="0;0.16;0.2;0.38;0.5;0.62;0.7;0.82;1" dur="4.1s" begin="-0.7s" repeatCount="indefinite"/>
    </circle>
      <circle r="3" fill="#d9a413" opacity="0">
      <animateMotion path="M0,0 Q-2.0,-20.9 -3.2,-17.5" keyPoints="0;0;1;1" keyTimes="0;0.16;0.72;1" calcMode="spline" keySplines="0 0 1 1;0.15 0.75 0.35 0.98;0 0 1 1" dur="4.1s" begin="-0.7s" repeatCount="indefinite"/>
      <animate attributeName="r" values="3;3;2;0.7" keyTimes="0;0.16;0.5;1" dur="4.1s" begin="-0.7s" repeatCount="indefinite"/>
      <animate attributeName="opacity" values="0;0;1;0.55;1;0.4;0.75;0;0" keyTimes="0;0.16;0.2;0.38;0.5;0.62;0.7;0.82;1" dur="4.1s" begin="-0.7s" repeatCount="indefinite"/>
    </circle>
      <circle r="3" fill="#12808b" opacity="0">
      <animateMotion path="M0,0 Q7.3,-19.8 11.8,-15.8" keyPoints="0;0;1;1" keyTimes="0;0.16;0.72;1" calcMode="spline" keySplines="0 0 1 1;0.15 0.75 0.35 0.98;0 0 1 1" dur="4.1s" begin="-0.7s" repeatCount="indefinite"/>
      <animate attributeName="r" values="3;3;2;0.7" keyTimes="0;0.16;0.5;1" dur="4.1s" begin="-0.7s" repeatCount="indefinite"/>
      <animate attributeName="opacity" values="0;0;1;0.55;1;0.4;0.75;0;0" keyTimes="0;0.16;0.2;0.38;0.5;0.62;0.7;0.82;1" dur="4.1s" begin="-0.7s" repeatCount="indefinite"/>
    </circle>
      <circle r="3" fill="#d9a413" opacity="0">
      <animateMotion path="M0,0 Q15.2,-15.2 24.5,-8.3" keyPoints="0;0;1;1" keyTimes="0;0.16;0.72;1" calcMode="spline" keySplines="0 0 1 1;0.15 0.75 0.35 0.98;0 0 1 1" dur="4.1s" begin="-0.7s" repeatCount="indefinite"/>
      <animate attributeName="r" values="3;3;2;0.7" keyTimes="0;0.16;0.5;1" dur="4.1s" begin="-0.7s" repeatCount="indefinite"/>
      <animate attributeName="opacity" values="0;0;1;0.55;1;0.4;0.75;0;0" keyTimes="0;0.16;0.2;0.38;0.5;0.62;0.7;0.82;1" dur="4.1s" begin="-0.7s" repeatCount="indefinite"/>
    </circle>
      <circle r="3" fill="#12808b" opacity="0">
      <animateMotion path="M0,0 Q20.0,-8.0 32.3,3.3" keyPoints="0;0;1;1" keyTimes="0;0.16;0.72;1" calcMode="spline" keySplines="0 0 1 1;0.15 0.75 0.35 0.98;0 0 1 1" dur="4.1s" begin="-0.7s" repeatCount="indefinite"/>
      <animate attributeName="r" values="3;3;2;0.7" keyTimes="0;0.16;0.5;1" dur="4.1s" begin="-0.7s" repeatCount="indefinite"/>
      <animate attributeName="opacity" values="0;0;1;0.55;1;0.4;0.75;0;0" keyTimes="0;0.16;0.2;0.38;0.5;0.62;0.7;0.82;1" dur="4.1s" begin="-0.7s" repeatCount="indefinite"/>
    </circle>
    </g>
  <g transform="translate(118,36)">
      <circle r="2" fill="#c98f1a" opacity="0">
      <animateMotion path="M0,56 L0,0" keyPoints="0;1;1" keyTimes="0;0.15;1" dur="3.5s" begin="-2.4s" repeatCount="indefinite" calcMode="linear"/>
      <animate attributeName="opacity" values="0;0.95;0.95;0;0" keyTimes="0;0.03;0.12;0.16;1" dur="3.5s" begin="-2.4s" repeatCount="indefinite"/>
    </circle>
      <circle r="1" fill="#d9a413" opacity="0">
      <animate attributeName="r" values="1;10;1" keyTimes="0;0.21;0.3" dur="3.5s" begin="-2.4s" repeatCount="indefinite"/>
      <animate attributeName="opacity" values="0;0;0.8;0;0" keyTimes="0;0.155;0.18;0.28;1" dur="3.5s" begin="-2.4s" repeatCount="indefinite"/>
    </circle>
      <circle r="3" fill="#b05464" opacity="0">
      <animateMotion path="M0,0 Q16.0,0.3 25.8,12.9" keyPoints="0;0;1;1" keyTimes="0;0.16;0.72;1" calcMode="spline" keySplines="0 0 1 1;0.15 0.75 0.35 0.98;0 0 1 1" dur="3.5s" begin="-2.4s" repeatCount="indefinite"/>
      <animate attributeName="r" values="3;3;2;0.7" keyTimes="0;0.16;0.5;1" dur="3.5s" begin="-2.4s" repeatCount="indefinite"/>
      <animate attributeName="opacity" values="0;0;1;0.55;1;0.4;0.75;0;0" keyTimes="0;0.16;0.2;0.38;0.5;0.62;0.7;0.82;1" dur="3.5s" begin="-2.4s" repeatCount="indefinite"/>
    </circle>
      <circle r="3" fill="#d9a413" opacity="0">
      <animateMotion path="M0,0 Q13.5,6.4 21.8,22.7" keyPoints="0;0;1;1" keyTimes="0;0.16;0.72;1" calcMode="spline" keySplines="0 0 1 1;0.15 0.75 0.35 0.98;0 0 1 1" dur="3.5s" begin="-2.4s" repeatCount="indefinite"/>
      <animate attributeName="r" values="3;3;2;0.7" keyTimes="0;0.16;0.5;1" dur="3.5s" begin="-2.4s" repeatCount="indefinite"/>
      <animate attributeName="opacity" values="0;0;1;0.55;1;0.4;0.75;0;0" keyTimes="0;0.16;0.2;0.38;0.5;0.62;0.7;0.82;1" dur="3.5s" begin="-2.4s" repeatCount="indefinite"/>
    </circle>
      <circle r="3" fill="#b05464" opacity="0">
      <animateMotion path="M0,0 Q8.3,10.9 13.4,29.9" keyPoints="0;0;1;1" keyTimes="0;0.16;0.72;1" calcMode="spline" keySplines="0 0 1 1;0.15 0.75 0.35 0.98;0 0 1 1" dur="3.5s" begin="-2.4s" repeatCount="indefinite"/>
      <animate attributeName="r" values="3;3;2;0.7" keyTimes="0;0.16;0.5;1" dur="3.5s" begin="-2.4s" repeatCount="indefinite"/>
      <animate attributeName="opacity" values="0;0;1;0.55;1;0.4;0.75;0;0" keyTimes="0;0.16;0.2;0.38;0.5;0.62;0.7;0.82;1" dur="3.5s" begin="-2.4s" repeatCount="indefinite"/>
    </circle>
      <circle r="3" fill="#d9a413" opacity="0">
      <animateMotion path="M0,0 Q1.5,12.9 2.5,33.2" keyPoints="0;0;1;1" keyTimes="0;0.16;0.72;1" calcMode="spline" keySplines="0 0 1 1;0.15 0.75 0.35 0.98;0 0 1 1" dur="3.5s" begin="-2.4s" repeatCount="indefinite"/>
      <animate attributeName="r" values="3;3;2;0.7" keyTimes="0;0.16;0.5;1" dur="3.5s" begin="-2.4s" repeatCount="indefinite"/>
      <animate attributeName="opacity" values="0;0;1;0.55;1;0.4;0.75;0;0" keyTimes="0;0.16;0.2;0.38;0.5;0.62;0.7;0.82;1" dur="3.5s" begin="-2.4s" repeatCount="indefinite"/>
    </circle>
      <circle r="3" fill="#b05464" opacity="0">
      <animateMotion path="M0,0 Q-5.6,12.0 -9.0,31.8" keyPoints="0;0;1;1" keyTimes="0;0.16;0.72;1" calcMode="spline" keySplines="0 0 1 1;0.15 0.75 0.35 0.98;0 0 1 1" dur="3.5s" begin="-2.4s" repeatCount="indefinite"/>
      <animate attributeName="r" values="3;3;2;0.7" keyTimes="0;0.16;0.5;1" dur="3.5s" begin="-2.4s" repeatCount="indefinite"/>
      <animate attributeName="opacity" values="0;0;1;0.55;1;0.4;0.75;0;0" keyTimes="0;0.16;0.2;0.38;0.5;0.62;0.7;0.82;1" dur="3.5s" begin="-2.4s" repeatCount="indefinite"/>
    </circle>
      <circle r="3" fill="#d9a413" opacity="0">
      <animateMotion path="M0,0 Q-11.6,8.5 -18.7,26.1" keyPoints="0;0;1;1" keyTimes="0;0.16;0.72;1" calcMode="spline" keySplines="0 0 1 1;0.15 0.75 0.35 0.98;0 0 1 1" dur="3.5s" begin="-2.4s" repeatCount="indefinite"/>
      <animate attributeName="r" values="3;3;2;0.7" keyTimes="0;0.16;0.5;1" dur="3.5s" begin="-2.4s" repeatCount="indefinite"/>
      <animate attributeName="opacity" values="0;0;1;0.55;1;0.4;0.75;0;0" keyTimes="0;0.16;0.2;0.38;0.5;0.62;0.7;0.82;1" dur="3.5s" begin="-2.4s" repeatCount="indefinite"/>
    </circle>
      <circle r="3" fill="#b05464" opacity="0">
      <animateMotion path="M0,0 Q-15.3,3.0 -24.7,17.2" keyPoints="0;0;1;1" keyTimes="0;0.16;0.72;1" calcMode="spline" keySplines="0 0 1 1;0.15 0.75 0.35 0.98;0 0 1 1" dur="3.5s" begin="-2.4s" repeatCount="indefinite"/>
      <animate attributeName="r" values="3;3;2;0.7" keyTimes="0;0.16;0.5;1" dur="3.5s" begin="-2.4s" repeatCount="indefinite"/>
      <animate attributeName="opacity" values="0;0;1;0.55;1;0.4;0.75;0;0" keyTimes="0;0.16;0.2;0.38;0.5;0.62;0.7;0.82;1" dur="3.5s" begin="-2.4s" repeatCount="indefinite"/>
    </circle>
      <circle r="3" fill="#d9a413" opacity="0">
      <animateMotion path="M0,0 Q-16.0,-3.4 -25.8,6.8" keyPoints="0;0;1;1" keyTimes="0;0.16;0.72;1" calcMode="spline" keySplines="0 0 1 1;0.15 0.75 0.35 0.98;0 0 1 1" dur="3.5s" begin="-2.4s" repeatCount="indefinite"/>
      <animate attributeName="r" values="3;3;2;0.7" keyTimes="0;0.16;0.5;1" dur="3.5s" begin="-2.4s" repeatCount="indefinite"/>
      <animate attributeName="opacity" values="0;0;1;0.55;1;0.4;0.75;0;0" keyTimes="0;0.16;0.2;0.38;0.5;0.62;0.7;0.82;1" dur="3.5s" begin="-2.4s" repeatCount="indefinite"/>
    </circle>
      <circle r="3" fill="#b05464" opacity="0">
      <animateMotion path="M0,0 Q-13.5,-9.5 -21.8,-2.9" keyPoints="0;0;1;1" keyTimes="0;0.16;0.72;1" calcMode="spline" keySplines="0 0 1 1;0.15 0.75 0.35 0.98;0 0 1 1" dur="3.5s" begin="-2.4s" repeatCount="indefinite"/>
      <animate attributeName="r" values="3;3;2;0.7" keyTimes="0;0.16;0.5;1" dur="3.5s" begin="-2.4s" repeatCount="indefinite"/>
      <animate attributeName="opacity" values="0;0;1;0.55;1;0.4;0.75;0;0" keyTimes="0;0.16;0.2;0.38;0.5;0.62;0.7;0.82;1" dur="3.5s" begin="-2.4s" repeatCount="indefinite"/>
    </circle>
      <circle r="3" fill="#d9a413" opacity="0">
      <animateMotion path="M0,0 Q-8.3,-14.0 -13.4,-10.2" keyPoints="0;0;1;1" keyTimes="0;0.16;0.72;1" calcMode="spline" keySplines="0 0 1 1;0.15 0.75 0.35 0.98;0 0 1 1" dur="3.5s" begin="-2.4s" repeatCount="indefinite"/>
      <animate attributeName="r" values="3;3;2;0.7" keyTimes="0;0.16;0.5;1" dur="3.5s" begin="-2.4s" repeatCount="indefinite"/>
      <animate attributeName="opacity" values="0;0;1;0.55;1;0.4;0.75;0;0" keyTimes="0;0.16;0.2;0.38;0.5;0.62;0.7;0.82;1" dur="3.5s" begin="-2.4s" repeatCount="indefinite"/>
    </circle>
      <circle r="3" fill="#b05464" opacity="0">
      <animateMotion path="M0,0 Q-1.5,-16.0 -2.5,-13.4" keyPoints="0;0;1;1" keyTimes="0;0.16;0.72;1" calcMode="spline" keySplines="0 0 1 1;0.15 0.75 0.35 0.98;0 0 1 1" dur="3.5s" begin="-2.4s" repeatCount="indefinite"/>
      <animate attributeName="r" values="3;3;2;0.7" keyTimes="0;0.16;0.5;1" dur="3.5s" begin="-2.4s" repeatCount="indefinite"/>
      <animate attributeName="opacity" values="0;0;1;0.55;1;0.4;0.75;0;0" keyTimes="0;0.16;0.2;0.38;0.5;0.62;0.7;0.82;1" dur="3.5s" begin="-2.4s" repeatCount="indefinite"/>
    </circle>
      <circle r="3" fill="#d9a413" opacity="0">
      <animateMotion path="M0,0 Q5.6,-15.2 9.0,-12.1" keyPoints="0;0;1;1" keyTimes="0;0.16;0.72;1" calcMode="spline" keySplines="0 0 1 1;0.15 0.75 0.35 0.98;0 0 1 1" dur="3.5s" begin="-2.4s" repeatCount="indefinite"/>
      <animate attributeName="r" values="3;3;2;0.7" keyTimes="0;0.16;0.5;1" dur="3.5s" begin="-2.4s" repeatCount="indefinite"/>
      <animate attributeName="opacity" values="0;0;1;0.55;1;0.4;0.75;0;0" keyTimes="0;0.16;0.2;0.38;0.5;0.62;0.7;0.82;1" dur="3.5s" begin="-2.4s" repeatCount="indefinite"/>
    </circle>
      <circle r="3" fill="#b05464" opacity="0">
      <animateMotion path="M0,0 Q11.6,-11.6 18.7,-6.4" keyPoints="0;0;1;1" keyTimes="0;0.16;0.72;1" calcMode="spline" keySplines="0 0 1 1;0.15 0.75 0.35 0.98;0 0 1 1" dur="3.5s" begin="-2.4s" repeatCount="indefinite"/>
      <animate attributeName="r" values="3;3;2;0.7" keyTimes="0;0.16;0.5;1" dur="3.5s" begin="-2.4s" repeatCount="indefinite"/>
      <animate attributeName="opacity" values="0;0;1;0.55;1;0.4;0.75;0;0" keyTimes="0;0.16;0.2;0.38;0.5;0.62;0.7;0.82;1" dur="3.5s" begin="-2.4s" repeatCount="indefinite"/>
    </circle>
      <circle r="3" fill="#d9a413" opacity="0">
      <animateMotion path="M0,0 Q15.3,-6.1 24.7,2.5" keyPoints="0;0;1;1" keyTimes="0;0.16;0.72;1" calcMode="spline" keySplines="0 0 1 1;0.15 0.75 0.35 0.98;0 0 1 1" dur="3.5s" begin="-2.4s" repeatCount="indefinite"/>
      <animate attributeName="r" values="3;3;2;0.7" keyTimes="0;0.16;0.5;1" dur="3.5s" begin="-2.4s" repeatCount="indefinite"/>
      <animate attributeName="opacity" values="0;0;1;0.55;1;0.4;0.75;0;0" keyTimes="0;0.16;0.2;0.38;0.5;0.62;0.7;0.82;1" dur="3.5s" begin="-2.4s" repeatCount="indefinite"/>
    </circle>
    </g>
  <g transform="translate(96,92)">
      <circle r="2" fill="#c98f1a" opacity="0">
      <animateMotion path="M0,50 L0,0" keyPoints="0;1;1" keyTimes="0;0.15;1" dur="4.6s" begin="-1.5s" repeatCount="indefinite" calcMode="linear"/>
      <animate attributeName="opacity" values="0;0.95;0.95;0;0" keyTimes="0;0.03;0.12;0.16;1" dur="4.6s" begin="-1.5s" repeatCount="indefinite"/>
    </circle>
      <circle r="1" fill="#d9a413" opacity="0">
      <animate attributeName="r" values="1;8;1" keyTimes="0;0.21;0.3" dur="4.6s" begin="-1.5s" repeatCount="indefinite"/>
      <animate attributeName="opacity" values="0;0;0.8;0;0" keyTimes="0;0.155;0.18;0.28;1" dur="4.6s" begin="-1.5s" repeatCount="indefinite"/>
    </circle>
      <circle r="3" fill="#12808b" opacity="0">
      <animateMotion path="M0,0 Q12.3,0.2 19.8,9.9" keyPoints="0;0;1;1" keyTimes="0;0.16;0.72;1" calcMode="spline" keySplines="0 0 1 1;0.15 0.75 0.35 0.98;0 0 1 1" dur="4.6s" begin="-1.5s" repeatCount="indefinite"/>
      <animate attributeName="r" values="3;3;2;0.7" keyTimes="0;0.16;0.5;1" dur="4.6s" begin="-1.5s" repeatCount="indefinite"/>
      <animate attributeName="opacity" values="0;0;1;0.55;1;0.4;0.75;0;0" keyTimes="0;0.16;0.2;0.38;0.5;0.62;0.7;0.82;1" dur="4.6s" begin="-1.5s" repeatCount="indefinite"/>
    </circle>
      <circle r="3" fill="#c26a3a" opacity="0">
      <animateMotion path="M0,0 Q10.4,4.9 16.7,17.4" keyPoints="0;0;1;1" keyTimes="0;0.16;0.72;1" calcMode="spline" keySplines="0 0 1 1;0.15 0.75 0.35 0.98;0 0 1 1" dur="4.6s" begin="-1.5s" repeatCount="indefinite"/>
      <animate attributeName="r" values="3;3;2;0.7" keyTimes="0;0.16;0.5;1" dur="4.6s" begin="-1.5s" repeatCount="indefinite"/>
      <animate attributeName="opacity" values="0;0;1;0.55;1;0.4;0.75;0;0" keyTimes="0;0.16;0.2;0.38;0.5;0.62;0.7;0.82;1" dur="4.6s" begin="-1.5s" repeatCount="indefinite"/>
    </circle>
      <circle r="3" fill="#12808b" opacity="0">
      <animateMotion path="M0,0 Q6.4,8.4 10.3,23.0" keyPoints="0;0;1;1" keyTimes="0;0.16;0.72;1" calcMode="spline" keySplines="0 0 1 1;0.15 0.75 0.35 0.98;0 0 1 1" dur="4.6s" begin="-1.5s" repeatCount="indefinite"/>
      <animate attributeName="r" values="3;3;2;0.7" keyTimes="0;0.16;0.5;1" dur="4.6s" begin="-1.5s" repeatCount="indefinite"/>
      <animate attributeName="opacity" values="0;0;1;0.55;1;0.4;0.75;0;0" keyTimes="0;0.16;0.2;0.38;0.5;0.62;0.7;0.82;1" dur="4.6s" begin="-1.5s" repeatCount="indefinite"/>
    </circle>
      <circle r="3" fill="#c26a3a" opacity="0">
      <animateMotion path="M0,0 Q1.2,9.9 1.9,25.5" keyPoints="0;0;1;1" keyTimes="0;0.16;0.72;1" calcMode="spline" keySplines="0 0 1 1;0.15 0.75 0.35 0.98;0 0 1 1" dur="4.6s" begin="-1.5s" repeatCount="indefinite"/>
      <animate attributeName="r" values="3;3;2;0.7" keyTimes="0;0.16;0.5;1" dur="4.6s" begin="-1.5s" repeatCount="indefinite"/>
      <animate attributeName="opacity" values="0;0;1;0.55;1;0.4;0.75;0;0" keyTimes="0;0.16;0.2;0.38;0.5;0.62;0.7;0.82;1" dur="4.6s" begin="-1.5s" repeatCount="indefinite"/>
    </circle>
      <circle r="3" fill="#12808b" opacity="0">
      <animateMotion path="M0,0 Q-4.3,9.3 -6.9,24.5" keyPoints="0;0;1;1" keyTimes="0;0.16;0.72;1" calcMode="spline" keySplines="0 0 1 1;0.15 0.75 0.35 0.98;0 0 1 1" dur="4.6s" begin="-1.5s" repeatCount="indefinite"/>
      <animate attributeName="r" values="3;3;2;0.7" keyTimes="0;0.16;0.5;1" dur="4.6s" begin="-1.5s" repeatCount="indefinite"/>
      <animate attributeName="opacity" values="0;0;1;0.55;1;0.4;0.75;0;0" keyTimes="0;0.16;0.2;0.38;0.5;0.62;0.7;0.82;1" dur="4.6s" begin="-1.5s" repeatCount="indefinite"/>
    </circle>
      <circle r="3" fill="#c26a3a" opacity="0">
      <animateMotion path="M0,0 Q-8.9,6.5 -14.4,20.1" keyPoints="0;0;1;1" keyTimes="0;0.16;0.72;1" calcMode="spline" keySplines="0 0 1 1;0.15 0.75 0.35 0.98;0 0 1 1" dur="4.6s" begin="-1.5s" repeatCount="indefinite"/>
      <animate attributeName="r" values="3;3;2;0.7" keyTimes="0;0.16;0.5;1" dur="4.6s" begin="-1.5s" repeatCount="indefinite"/>
      <animate attributeName="opacity" values="0;0;1;0.55;1;0.4;0.75;0;0" keyTimes="0;0.16;0.2;0.38;0.5;0.62;0.7;0.82;1" dur="4.6s" begin="-1.5s" repeatCount="indefinite"/>
    </circle>
      <circle r="3" fill="#12808b" opacity="0">
      <animateMotion path="M0,0 Q-11.8,2.3 -19.0,13.2" keyPoints="0;0;1;1" keyTimes="0;0.16;0.72;1" calcMode="spline" keySplines="0 0 1 1;0.15 0.75 0.35 0.98;0 0 1 1" dur="4.6s" begin="-1.5s" repeatCount="indefinite"/>
      <animate attributeName="r" values="3;3;2;0.7" keyTimes="0;0.16;0.5;1" dur="4.6s" begin="-1.5s" repeatCount="indefinite"/>
      <animate attributeName="opacity" values="0;0;1;0.55;1;0.4;0.75;0;0" keyTimes="0;0.16;0.2;0.38;0.5;0.62;0.7;0.82;1" dur="4.6s" begin="-1.5s" repeatCount="indefinite"/>
    </circle>
      <circle r="3" fill="#c26a3a" opacity="0">
      <animateMotion path="M0,0 Q-12.3,-2.6 -19.8,5.3" keyPoints="0;0;1;1" keyTimes="0;0.16;0.72;1" calcMode="spline" keySplines="0 0 1 1;0.15 0.75 0.35 0.98;0 0 1 1" dur="4.6s" begin="-1.5s" repeatCount="indefinite"/>
      <animate attributeName="r" values="3;3;2;0.7" keyTimes="0;0.16;0.5;1" dur="4.6s" begin="-1.5s" repeatCount="indefinite"/>
      <animate attributeName="opacity" values="0;0;1;0.55;1;0.4;0.75;0;0" keyTimes="0;0.16;0.2;0.38;0.5;0.62;0.7;0.82;1" dur="4.6s" begin="-1.5s" repeatCount="indefinite"/>
    </circle>
      <circle r="3" fill="#12808b" opacity="0">
      <animateMotion path="M0,0 Q-10.4,-7.3 -16.7,-2.2" keyPoints="0;0;1;1" keyTimes="0;0.16;0.72;1" calcMode="spline" keySplines="0 0 1 1;0.15 0.75 0.35 0.98;0 0 1 1" dur="4.6s" begin="-1.5s" repeatCount="indefinite"/>
      <animate attributeName="r" values="3;3;2;0.7" keyTimes="0;0.16;0.5;1" dur="4.6s" begin="-1.5s" repeatCount="indefinite"/>
      <animate attributeName="opacity" values="0;0;1;0.55;1;0.4;0.75;0;0" keyTimes="0;0.16;0.2;0.38;0.5;0.62;0.7;0.82;1" dur="4.6s" begin="-1.5s" repeatCount="indefinite"/>
    </circle>
      <circle r="3" fill="#c26a3a" opacity="0">
      <animateMotion path="M0,0 Q-6.4,-10.8 -10.3,-7.8" keyPoints="0;0;1;1" keyTimes="0;0.16;0.72;1" calcMode="spline" keySplines="0 0 1 1;0.15 0.75 0.35 0.98;0 0 1 1" dur="4.6s" begin="-1.5s" repeatCount="indefinite"/>
      <animate attributeName="r" values="3;3;2;0.7" keyTimes="0;0.16;0.5;1" dur="4.6s" begin="-1.5s" repeatCount="indefinite"/>
      <animate attributeName="opacity" values="0;0;1;0.55;1;0.4;0.75;0;0" keyTimes="0;0.16;0.2;0.38;0.5;0.62;0.7;0.82;1" dur="4.6s" begin="-1.5s" repeatCount="indefinite"/>
    </circle>
      <circle r="3" fill="#12808b" opacity="0">
      <animateMotion path="M0,0 Q-1.2,-12.3 -1.9,-10.3" keyPoints="0;0;1;1" keyTimes="0;0.16;0.72;1" calcMode="spline" keySplines="0 0 1 1;0.15 0.75 0.35 0.98;0 0 1 1" dur="4.6s" begin="-1.5s" repeatCount="indefinite"/>
      <animate attributeName="r" values="3;3;2;0.7" keyTimes="0;0.16;0.5;1" dur="4.6s" begin="-1.5s" repeatCount="indefinite"/>
      <animate attributeName="opacity" values="0;0;1;0.55;1;0.4;0.75;0;0" keyTimes="0;0.16;0.2;0.38;0.5;0.62;0.7;0.82;1" dur="4.6s" begin="-1.5s" repeatCount="indefinite"/>
    </circle>
      <circle r="3" fill="#c26a3a" opacity="0">
      <animateMotion path="M0,0 Q4.3,-11.7 6.9,-9.3" keyPoints="0;0;1;1" keyTimes="0;0.16;0.72;1" calcMode="spline" keySplines="0 0 1 1;0.15 0.75 0.35 0.98;0 0 1 1" dur="4.6s" begin="-1.5s" repeatCount="indefinite"/>
      <animate attributeName="r" values="3;3;2;0.7" keyTimes="0;0.16;0.5;1" dur="4.6s" begin="-1.5s" repeatCount="indefinite"/>
      <animate attributeName="opacity" values="0;0;1;0.55;1;0.4;0.75;0;0" keyTimes="0;0.16;0.2;0.38;0.5;0.62;0.7;0.82;1" dur="4.6s" begin="-1.5s" repeatCount="indefinite"/>
    </circle>
      <circle r="3" fill="#12808b" opacity="0">
      <animateMotion path="M0,0 Q8.9,-8.9 14.4,-4.9" keyPoints="0;0;1;1" keyTimes="0;0.16;0.72;1" calcMode="spline" keySplines="0 0 1 1;0.15 0.75 0.35 0.98;0 0 1 1" dur="4.6s" begin="-1.5s" repeatCount="indefinite"/>
      <animate attributeName="r" values="3;3;2;0.7" keyTimes="0;0.16;0.5;1" dur="4.6s" begin="-1.5s" repeatCount="indefinite"/>
      <animate attributeName="opacity" values="0;0;1;0.55;1;0.4;0.75;0;0" keyTimes="0;0.16;0.2;0.38;0.5;0.62;0.7;0.82;1" dur="4.6s" begin="-1.5s" repeatCount="indefinite"/>
    </circle>
      <circle r="3" fill="#c26a3a" opacity="0">
      <animateMotion path="M0,0 Q11.8,-4.7 19.0,2.0" keyPoints="0;0;1;1" keyTimes="0;0.16;0.72;1" calcMode="spline" keySplines="0 0 1 1;0.15 0.75 0.35 0.98;0 0 1 1" dur="4.6s" begin="-1.5s" repeatCount="indefinite"/>
      <animate attributeName="r" values="3;3;2;0.7" keyTimes="0;0.16;0.5;1" dur="4.6s" begin="-1.5s" repeatCount="indefinite"/>
      <animate attributeName="opacity" values="0;0;1;0.55;1;0.4;0.75;0;0" keyTimes="0;0.16;0.2;0.38;0.5;0.62;0.7;0.82;1" dur="4.6s" begin="-1.5s" repeatCount="indefinite"/>
    </circle>
    </g>
</svg>`;

const AZADI_FLAG_SVG = `
<svg class="azadi-flag" viewBox="0 0 184 158" aria-label="Waving flag of Pakistan with confetti">
  <defs>
    <filter id="flagwave" x="-20%" y="-20%" width="145%" height="140%">
      <feTurbulence type="fractalNoise" baseFrequency="0.014 0.07" numOctaves="2" seed="7" result="w">
        <animate attributeName="baseFrequency" dur="4.6s" values="0.014 0.07;0.018 0.095;0.014 0.07" repeatCount="indefinite"/>
      </feTurbulence>
      <feDisplacementMap in="SourceGraphic" in2="w" scale="9" xChannelSelector="R" yChannelSelector="G"/>
    </filter>
    <linearGradient id="poleGold" x1="0" y1="0" x2="1" y2="0">
      <stop offset="0" stop-color="#8a6d1c"/><stop offset="0.35" stop-color="#f3cf5e"/>
      <stop offset="0.6" stop-color="#d9a413"/><stop offset="1" stop-color="#a37b10"/>
    </linearGradient>
  </defs>
  <g transform="rotate(-13 22 152)">
    <circle cx="20" cy="10" r="7" fill="url(#poleGold)" stroke="#8a6d1c" stroke-width="1.5"/>
    <circle cx="17.5" cy="7.5" r="2" fill="#fff3c4" opacity="0.9"/>
    <rect x="16" y="16" width="8" height="136" rx="3" fill="url(#poleGold)"/>
    <rect x="18.3" y="16" width="2" height="136" fill="#ffe9a8" opacity="0.85"/>
    <g stroke="#12808b" stroke-width="2.2" fill="none" stroke-linecap="round" opacity="0.55">
      <path d="M154,44 q11,-5 24,1" stroke-dasharray="7 9">
        <animate attributeName="stroke-dashoffset" from="0" to="-32" dur="1.15s" repeatCount="indefinite"/>
      </path>
      <path d="M150,74 q13,-3 27,3" stroke-dasharray="6 8">
        <animate attributeName="stroke-dashoffset" from="0" to="-28" dur="0.95s" repeatCount="indefinite"/>
      </path>
      <path d="M152,102 q11,4 23,-1" stroke-dasharray="7 9">
        <animate attributeName="stroke-dashoffset" from="0" to="-32" dur="1.3s" repeatCount="indefinite"/>
      </path>
    </g>
    <g filter="url(#flagwave)">
      <g transform="translate(24,20)">
        <rect width="126" height="84" fill="#01411C"/>
        <rect width="31.5" height="84" fill="#f7f2e6"/>
        <circle cx="86" cy="42" r="21" fill="#f7f2e6"/>
        <circle cx="92.5" cy="36.5" r="17.5" fill="#01411C"/>
        <path d="M97 25 l3.05 6.7 7.3 0.85 -5.4 5 1.45 7.2 -6.4-3.6 -6.4 3.6 1.45-7.2 -5.4-5 7.3-0.85 Z" fill="#f7f2e6" transform="rotate(20 97 32)"/>
      </g>
    </g>
  </g>
    <g transform="translate(23,0)"><g>
      <animateTransform attributeName="transform" type="translate" values="0 -12; 14 162" dur="2.6s" begin="-0.0s" repeatCount="indefinite"/>
      <g><circle r="3.2" fill="#d9a413"/><animateTransform attributeName="transform" type="rotate" from="0" to="360" dur="1.1s" repeatCount="indefinite"/></g>
    </g></g>
    <g transform="translate(40,0)"><g>
      <animateTransform attributeName="transform" type="translate" values="0 -12; 6 162" dur="3.0500000000000003s" begin="-0.53s" repeatCount="indefinite"/>
      <g><rect x="-2.5" y="-4.5" width="5" height="9" rx="1.5" fill="#c26a3a"/><animateTransform attributeName="transform" type="rotate" from="0" to="-360" dur="1.27s" repeatCount="indefinite"/></g>
    </g></g>
    <g transform="translate(51,0)"><g>
      <animateTransform attributeName="transform" type="translate" values="0 -12; 10 162" dur="3.5s" begin="-1.06s" repeatCount="indefinite"/>
      <g><rect x="-2.5" y="-4.5" width="5" height="9" rx="1.5" fill="#b05464"/><animateTransform attributeName="transform" type="rotate" from="0" to="-360" dur="1.44s" repeatCount="indefinite"/></g>
    </g></g>
    <g transform="translate(71,0)"><g>
      <animateTransform attributeName="transform" type="translate" values="0 -12; 10 162" dur="3.95s" begin="-1.59s" repeatCount="indefinite"/>
      <g><circle r="3.2" fill="#12808b"/><animateTransform attributeName="transform" type="rotate" from="0" to="-360" dur="1.61s" repeatCount="indefinite"/></g>
    </g></g>
    <g transform="translate(79,0)"><g>
      <animateTransform attributeName="transform" type="translate" values="0 -12; 6 162" dur="4.4s" begin="-2.12s" repeatCount="indefinite"/>
      <g><rect x="-2.5" y="-4.5" width="5" height="9" rx="1.5" fill="#6f8f4e"/><animateTransform attributeName="transform" type="rotate" from="0" to="360" dur="1.78s" repeatCount="indefinite"/></g>
    </g></g>
    <g transform="translate(97,0)"><g>
      <animateTransform attributeName="transform" type="translate" values="0 -12; 6 162" dur="2.6s" begin="-2.65s" repeatCount="indefinite"/>
      <g><rect x="-2.5" y="-4.5" width="5" height="9" rx="1.5" fill="#f7f2e6"/><animateTransform attributeName="transform" type="rotate" from="0" to="-360" dur="1.95s" repeatCount="indefinite"/></g>
    </g></g>
    <g transform="translate(111,0)"><g>
      <animateTransform attributeName="transform" type="translate" values="0 -12; 14 162" dur="3.0500000000000003s" begin="-3.18s" repeatCount="indefinite"/>
      <g><circle r="3.2" fill="#d9a413"/><animateTransform attributeName="transform" type="rotate" from="0" to="360" dur="2.12s" repeatCount="indefinite"/></g>
    </g></g>
    <g transform="translate(122,0)"><g>
      <animateTransform attributeName="transform" type="translate" values="0 -12; 14 162" dur="3.5s" begin="-3.71s" repeatCount="indefinite"/>
      <g><rect x="-2.5" y="-4.5" width="5" height="9" rx="1.5" fill="#b05464"/><animateTransform attributeName="transform" type="rotate" from="0" to="-360" dur="2.29s" repeatCount="indefinite"/></g>
    </g></g>
    <g transform="translate(136,0)"><g>
      <animateTransform attributeName="transform" type="translate" values="0 -12; -10 162" dur="3.95s" begin="-4.24s" repeatCount="indefinite"/>
      <g><rect x="-2.5" y="-4.5" width="5" height="9" rx="1.5" fill="#12808b"/><animateTransform attributeName="transform" type="rotate" from="0" to="360" dur="2.46s" repeatCount="indefinite"/></g>
    </g></g>
    <g transform="translate(149,0)"><g>
      <animateTransform attributeName="transform" type="translate" values="0 -12; 14 162" dur="4.4s" begin="-4.77s" repeatCount="indefinite"/>
      <g><circle r="3.2" fill="#c26a3a"/><animateTransform attributeName="transform" type="rotate" from="0" to="-360" dur="2.63s" repeatCount="indefinite"/></g>
    </g></g>
</svg>`;

// Gentle page-wide confetti rain for Jashn-e-Azadi week, home page only:
// renderHome() turns it on, backBar() (built by every other view) turns it
// off. Sparse, click-through, and hidden for reduced-motion users (CSS).
function ensureAzadiRain() {
  if (!azadiPeak() || document.querySelector(".confetti-rain")) return;
  const colors = ["#01411C", "#f7f2e6", "#d9a413", "#12808b", "#c26a3a", "#b05464"];
  const box = document.createElement("div");
  box.className = "confetti-rain";
  box.setAttribute("aria-hidden", "true");
  let bits = "";
  for (let i = 0; i < 16; i++) {
    const left = (i * 6.4 + (i % 3) * 2.2) % 100;
    const dur = 7 + (i % 5) * 1.6;
    const delay = -(i * 0.9);
    const size = 6 + (i % 3) * 3;
    bits += `<i style="left:${left}%; width:${size}px; height:${size * 1.5}px; background:${colors[i % colors.length]}; animation-duration:${dur}s; animation-delay:${delay}s"></i>`;
  }
  box.innerHTML = bits;
  document.body.appendChild(box);
  // confine the rain to the hero: stop right where Roz ka Khel begins
  const firstSection = document.querySelector(".track-title");
  if (firstSection) {
    const h = Math.max(200, firstSection.getBoundingClientRect().top + window.scrollY - 30);
    box.style.height = h + "px";
    box.style.setProperty("--rain-h", h + "px");
  }
}

function removeAzadiRain() {
  document.querySelector(".confetti-rain")?.remove();
}

// ── Home ─────────────────────────────────────────────────────

function renderHome() {
  if (!root.active) {
    // First visit: start instantly as "Mehmaan" (guest), no questions
    // asked. Learners can rename/add profiles or sign in whenever.
    if (!root.profiles["Guest - Mehmaan"]) root.profiles["Guest - Mehmaan"] = blankProfile();
    root.active = "Guest - Mehmaan";
    saveRoot();
  }
  const p = profile();
  const pct = overallPercent();
  const rank = rankFor(p);
  const notice = Speech.voiceNotice();
  const playedToday = p.lastDaily === todayKey();
  const due = dueReviewCount();
  const kahawat = (() => {
    // Fridays get the Jummah pool + a mubarak chip; other days draw from
    // the big bank via the games' no-repeat cycle (min gap ~half a cycle).
    const [ky, km, kd] = todayKey().split("-").map(Number);
    const jummah = new Date(ky, km - 1, kd).getDay() === 5 ||
      new URLSearchParams(location.search).get("jummah") === "1";
    const pool = jummah ? JUMMAH_KAHAWATEIN : KAHAWATEIN;
    const pick = cycleDraw(pool, 1, jummah ? 4241 : 3137)[0];
    return pick ? { ...pick, jummah } : null;
  })();
  app().innerHTML = `
    <header class="hero">
      <div class="hero-strap"></div>
      <button class="about-btn" onclick="showAbout()" title="About Urdu Ustaadh">ℹ️ About</button>
      <button class="save-btn" onclick="showAccount()" title="Back up your progress">${Cloud.status === "in" ? "☁️ Progress saved" : "💾 Save your progress"}</button>
      ${azadiPeak() ? AZADI_FIREWORKS_L + AZADI_FIREWORKS_R : ""}${azadiMonth() ? AZADI_FLAG_SVG + AZADI_FLAG_SVG.replace('rotate(-13 22 152)', 'rotate(13 22 152)').replace('class="azadi-flag"', 'class="azadi-flag azadi-flag-right"') : ""}
      <img class="hero-logo" src="icon-192.png" alt="Urdu Ustaadh, اردو" />
      <h1 class="retro">Urdu Ustaadh</h1>
      <p class="tagline">Speak it, hear it, read it. Thora thora, har roz.</p>
      <div class="id-row">
        <button class="tag profile-tag" onclick="renderProfiles()" title="Switch learner">👤 ${esc(root.active)} ▾</button>
        <span class="tag rank-tag">★ ${rank.name} · <span class="ur-inline">${rank.ur}</span></span>
        <button class="tag streak-tag" onclick="renderReport()" title="Report card">🔥 ${p.streak}-day streak · 📊</button>
        ${completedCount() >= RANKS[1].need ? `<button class="tag cert-tag" onclick="showCertificate()" title="Your certificate">🎓 Sanad</button>` : ""}
      </div>
      <div class="progress-wrap" title="${pct}% complete">
        <div class="progress-bar"><div class="progress-fill" style="width:${pct}%"></div></div>
        <span class="progress-label">${pct}% complete</span>
      </div>
      <div class="notice" id="voice-notice" ${notice ? "" : "hidden"}>🔈 ${esc(notice || "")}</div>
      ${azadiMonth() ? azadiBanner() : ""}
      ${due > 0 ? `<button class="review-banner" onclick="startFlashcards()">🃏 ${due} word${due === 1 ? "" : "s"} due, flip through your flashcards →</button>` : ""}
    </header>

    <section>
      <h2 class="track-title retro">🎲 Roz ka Khel · Daily Games <span class="track-sub">short, every day, that's how words stick</span></h2>
      ${kahawat ? `
      <button class="proverb-card" onclick='Speech.speak(${JSON.stringify(kahawat.ur)}, ${JSON.stringify(kahawat.tr)}, {slow:true})'>
        <span class="proverb-tag">🗣️ Aaj ki Kahawat · Proverb of the day, tap to hear</span>
        ${kahawat.jummah ? `<span class="jummah-chip">🕌 جمعہ مبارک · Jummah Mubārak!</span>` : ""}
        <span class="proverb-ur ur">${esc(kahawat.ur)}</span>
        <span class="proverb-en">${esc(kahawat.en)}</span>
        ${kahawat.ctx ? `<span class="proverb-ctx">${esc(kahawat.ctx)}</span>` : ""}
      </button>` : ""}
      <div class="tickets2">
        <button class="ticket2" style="--tk:var(--mustard)" onclick="startDaily5()">
          <span class="tstub"><span>AAJ KA PAANCH</span></span>
          <div class="card-num gold">Aaj Ka Paanch · Today's Five</div>
          <div class="card-title">The Daily Quiz <span class="tu ur">آج کا پانچ</span></div>
          <div class="card-sub">Five fresh questions, sounds, word roots, and the map, new every midnight</div>
          <div class="card-status">${p.dailyBest[todayKey() + "#d5"] != null ? `✅ Done today · best ${p.dailyBest[todayKey() + "#d5"]}/5 · replay?` : "▶ Play today's five"}</div>
        </button>
        <button class="ticket2" style="--tk:var(--terracotta)" onclick="startCallback()">
          <span class="tstub"><span>YAADDASHT</span></span>
          <div class="card-num" style="color:var(--terracotta)">Yaaddasht · Memory</div>
          <div class="card-title">Callback Round <span class="tu ur">یادداشت</span></div>
          <div class="card-sub">Rapid-fire review pulled from everything you've passed</div>
          <div class="card-status">${due > 0 ? `📚 ${due} due, review now` : "▶ Six quick callbacks"}</div>
        </button>
      </div>
      <p class="arcade-row">🎮 Practice anytime, endless rounds drawn from the same question banks as Aaj Ka Paanch:
        <button class="linklike" onclick="startDaily()">🌱 Desi Roots</button> ·
        <button class="linklike" onclick="startGeo()">🗺️ Naqsha</button> ·
        <button class="linklike" onclick="startSuno()">🎧 Suno!</button> ·
        <button class="linklike" onclick="startImla()">✍️ Imlā!</button>
      </p>
      <p class="arcade-row">🔖 See a word you want to keep? Save it anywhere it appears, then drill your own deck: <button class="linklike" onclick="startFlashcards()">🃏 Flashcards</button></p>
    </section>

    <section>
      <h2 class="track-title retro">🧭 Seekhne ke Raste · The Tracks <span class="track-sub">pick a lane, everything is open, nothing is locked</span></h2>
      <div class="trackgrid">${TRACK_DEFS.filter((t) => t.id !== "pakistan").map(trackCard).join("")}</div>
      <p class="placement-line"><button class="linklike" onclick="renderLughat()">📖 Lughat, look up any word the app teaches</button></p>
      ${p.placedAt == null && completedCount() < 2 ? `<p class="placement-line"><button class="linklike" onclick="startPlacement()">🧭 Already know some Urdu? Take the 3-minute placement quiz</button></p>` : ""}
    </section>

    <section>
      <h2 class="track-title retro">📚 Kutub Khana · <span class="ur">کتب خانہ</span> <span class="track-sub">the Urdu library, open to all</span></h2>
      <button class="library-card" onclick="renderKutub()">
        <span class="library-spines" aria-hidden="true">${KUTUB_EMBLEM}</span>
        <span class="library-main">
          <span class="library-title">The legendary works of Urdu literature</span>
          <span class="library-desc">${KUTUB.length} shelves, from Khusrau to the Qaumī Tarānah, every line in Urdu with transliteration, English translation, annotation, and audio.</span>
        </span>
        <span class="library-count">${Object.keys(profile().kutub || {}).length ? `${Object.keys(profile().kutub || {}).length}/${KUTUB.length}<br><span>read</span>` : `${KUTUB.length}<br><span>shelves</span>`}</span>
      </button>
    </section>

    <section>
      <h2 class="track-title retro">🚶 Sair · <span class="ur">سیر</span> <span class="track-sub">take a walk, have a conversation</span></h2>
      <button class="sair-card" onclick="renderSair()">
        <span class="sair-route" aria-hidden="true">${ROLEPLAYS.map((sc) => `<span>${SAIR_STOPS[sc.id] || "🎭"}</span>`).join("")}</span>
        <span class="sair-main">
          <span class="sair-title">Eight stops through town, live, with your mic</span>
          <span class="sair-desc">Order chai, haggle for mangoes, fix a rickshaw fare, see the doctor, the app talks back, and your choices change every ending.</span>
        </span>
        <span class="sair-prog">${Object.keys(p.roleplay || {}).length}/${ROLEPLAYS.length}<br><span>scenes</span></span>
      </button>
    </section>

    <section>
      <h2 class="track-title retro">🏖️ Thora Break · <span class="ur">تھوڑا وقفہ</span> <span class="track-sub">not a lesson, a little holiday</span></h2>
      <button class="break-card" onclick="renderTrack('pakistan')">
        <span class="break-stamp ur">پاکستان</span>
        <span class="break-main">
          <span class="break-title">Tired of Urdu? Take a break in Pakistan.</span>
          <span class="break-desc">Postcards from home, mountains and mangoes, history and markhors. No quizzes ambushing you here.</span>
        </span>
        <span class="break-prog">${PAKISTAN_UNITS.filter((u) => isCompleted(u.id)).length}/${PAKISTAN_UNITS.length}<br><span>postcards</span></span>
      </button>
    </section>


    <footer class="foot">Progress is saved per learner on this device. · <button class="linklike" onclick="renderProfiles()">Switch learner</button> · <button class="linklike" onclick="renderLughat()">📖 Lughat · Glossary</button> · <a class="linklike" href="learn/">Browse lessons as pages</a></footer>
  `;
  ensureAzadiRain();
}

function levelCard(lv, i) {
  const unlocked = levelUnlocked(i);
  const done = isCompleted(lv.id);
  const score = profile().scores[lv.id];
  return `
    <button class="card ${unlocked ? "" : "locked"} ${done ? "done" : ""}"
            ${unlocked ? `onclick="openLevel(${i})"` : "disabled"}>
      <div class="card-num">Level ${String(i + 1).padStart(2, "0")}</div>
      <div class="card-title">${esc(lv.title)}</div>
      <div class="card-sub">${esc(lv.subtitle)}</div>
      <div class="card-status">${
        done ? `✅ Passed${score != null ? ` · ${score}%` : ""}` : unlocked ? "▶ Start" : "▶ Start"
      }</div>
    </button>`;
}

function unitCard(u, i, unitsName, cls, label, alwaysOpen = false) {
  const units = TRACKS[unitsName];
  const unlocked = alwaysOpen || unitUnlocked(units, i);
  const done = isCompleted(u.id);
  return `
    <button class="card ${cls} ${unlocked ? "" : "locked"} ${done ? "done" : ""}"
            ${unlocked ? `onclick="openUnit('${unitsName}',${i})"` : "disabled"}>
      <div class="card-num">${label} ${String(i + 1).padStart(2, "0")}</div>
      <div class="card-title">${esc(u.title)}</div>
      <div class="card-sub">${esc(u.subtitle)}</div>
      <div class="card-status">${done ? "✅ Done" : unlocked ? "▶ Start" : "▶ Start"}</div>
    </button>`;
}

// ── Speaking lessons ─────────────────────────────────────────

function openLevel(i) {
  const lv = LEVELS[i];
  const facts = [...lv.funFacts];
  const factEvery = Math.ceil(lv.items.length / (facts.length + 1));
  let factIdx = 0;

  let body = "";
  lv.items.forEach((item, j) => {
    body += phraseCard(i, j, item);
    if ((j + 1) % factEvery === 0 && factIdx < facts.length) {
      body += funFact(facts[factIdx++]);
    }
  });
  while (factIdx < facts.length) body += funFact(facts[factIdx++]);

  app().innerHTML = `
    ${backBar(`Level ${i + 1} · ${esc(lv.title)}`, "renderTrack('speak')")}
    <p class="lesson-intro">${esc(lv.intro)}</p>
    ${lv.img ? `<figure class="photo kutub-photo"><img src="${lv.img.src}" alt="${esc(lv.img.alt)}" loading="lazy"><figcaption>${esc(lv.img.caption)}<span class="photo-credit">${esc(lv.img.credit)}</span></figcaption></figure>` : ""}
    ${micCompatNote()}
    <div class="phrase-list">${body}</div>
    <div class="lesson-actions">
      <button class="btn primary big" onclick="startQuiz(${i})">Take the Level ${i + 1} quiz →</button>
      <p class="hint">Score ${QUIZ_PASS_PERCENT}%+ to mark this level passed.</p>
      <p class="hint"><a class="linklike" href="learn/${slugifyTitle(lv.title)}.html" target="_blank" rel="noopener">🖨 Printable cheat sheet</a></p>
    </div>
  `;
  window.scrollTo(0, 0);
}

function funFact(html) {
  return `<aside class="funfact"><span class="ff-tag">✨ Fun fact</span><p>${html}</p></aside>`;
}

function phraseCard(levelIdx, itemIdx, item) {
  const id = `p-${levelIdx}-${itemIdx}`;
  return `
    <div class="phrase" id="${id}">
      <div class="phrase-main">
        <div class="phrase-ur ur">${esc(item.ur)}</div>
        <div class="phrase-tr">${esc(item.tr)}</div>
        <div class="phrase-en">${esc(item.en)}</div>
        ${item.note ? `<div class="phrase-note">${esc(item.note)}</div>` : ""}
      </div>
      <div class="phrase-btns">
        <button class="btn speak" title="Hear it" onclick="playItem(${levelIdx},${itemIdx},false)">🔊 Listen</button>
        <button class="btn speak" title="Hear it extra slowly" onclick="playItem(${levelIdx},${itemIdx},true)">🐢 Slow</button>
        <button class="btn mic" title="Say it: get checked and hear your take next to the native clip" onclick="practiceItem('${id}',${levelIdx},${itemIdx})">🎤 Say it</button>
        ${nishaanBtn(item.ur, item.tr, item.en, `Level ${levelIdx + 1}`, false)}
      </div>
      <div class="practice-result" id="${id}-result"></div>
    </div>`;
}

function playItem(levelIdx, itemIdx, slow) {
  const item = LEVELS[levelIdx].items[itemIdx];
  Speech.speak(item.ur, item.tr, { slow });
}

// Urdu speech recognition needs an engine that actually speaks Urdu.
// Safari's (Siri) doesn't, and every iOS browser must use Safari's
// engine, so warn those users up front instead of letting the mic fail.
function micCompat() {
  const force = new URLSearchParams(location.search).get("mic");
  if (force) return force === "ok" ? { ok: true } : { ok: false, reason: force };
  if (!Speech.recognitionSupported()) return { ok: false, reason: "none" };
  const ua = navigator.userAgent;
  const iOS = /iPhone|iPad|iPod/.test(ua) || (navigator.platform === "MacIntel" && navigator.maxTouchPoints > 1);
  if (iOS) return { ok: false, reason: "ios" };
  const safari = /Safari/.test(ua) && !/Chrome|Chromium|CriOS|Edg|Android/.test(ua);
  if (safari) return { ok: false, reason: "safari" };
  return { ok: true };
}

function micCompatNote() {
  const c = micCompat();
  if (c.ok) return `<div class="mic-note subtle">🎤 Say it checks your pronunciation live and records your take, so you can also hear yourself next to the native clip. Works best in <b>Chrome or Edge</b> (computer or Android).</div>`;
  const why = {
    ios: "iPhones and iPads can't do Urdu speech recognition yet, every iOS browser has to use Safari's engine, and it doesn't speak Urdu",
    safari: "Safari can't do Urdu speech recognition yet",
    none: "this browser doesn't support speech recognition",
  }[c.reason];
  const goonjTip = Speech.recordingSupported()
    ? " Here, <b>🎤 Say it</b> records you instead: listen to your take next to the native clip and let your ear do the checking."
    : "";
  return `<div class="mic-note">🎤 <b>Heads up:</b> ${why}, so live pronunciation scoring won't work here. <b>Chrome or Edge</b> (on a computer or Android) hears you perfectly.${goonjTip}</div>`;
}

const MIC_ERRORS = {
  "not-allowed": "Microphone access was blocked, allow the mic in your browser's site settings and try again.",
  "no-speech": "Didn't catch anything, try again, a bit louder and closer to the mic.",
  "audio-capture": "No working microphone found on this device.",
  "language-not-supported": "This browser can't recognize Urdu speech yet (Safari can't. Chrome and Edge can).",
  "service-not-allowed": "This browser blocked its speech service. Chrome or Edge handles the mic check best.",
  network: "The speech service couldn't be reached, check your connection.",
  timeout: "The mic stayed silent, check the right microphone is selected, then try again.",
  aborted: "Listening got interrupted, try again.",
};

let micFailStreak = 0;

function selfCheckNote() {
  const goonjTip = Speech.recordingSupported() ? " Or tap 🪞 Goonj, record yourself and hear your take next to the native clip." : "";
  return `<div class="pr warn">🎧 Plan B, self-check: tap 🔊 Listen, say it aloud, and match your voice to the clip.${goonjTip} For live mic checking, Chrome or Edge (computer or Android) works best.</div>`;
}

// One mic button, two feedback loops: the recognizer scores you WHILE
// MediaRecorder captures your take, so every attempt ends with a score
// (where recognition works) plus a listen-back row. Where recognition
// can't hear Urdu (iOS/Safari), the same button becomes pure
// record-and-compare via Goonj.
function echoRow(outId, ur, tr, retry) {
  return `
      <span class="goonj-btns">
        <button class="btn speak" onclick='goonjPlay(${JSON.stringify(outId)})'>▶️ Your take</button>
        <button class="btn speak" onclick='Speech.speak(${JSON.stringify(ur)}, ${JSON.stringify(tr)})'>🔊 Native</button>
        <button class="btn speak" onclick='Speech.speak(${JSON.stringify(ur)}, ${JSON.stringify(tr)}, {slow:true})'>🐢</button>
        <button class="btn" onclick="${retry}">🔁 Again</button>
      </span>
      <span class="goonj-hint">Compare by ear too: match the long vowels and the tricky sounds. Your recording stays on this device.</span>`;
}

async function practiceItem(cardId, levelIdx, itemIdx) {
  const item = LEVELS[levelIdx].items[itemIdx];
  const out = $(`#${cardId}-result`);
  const outId = `${cardId}-result`;
  const retry = `practiceItem('${cardId}',${levelIdx},${itemIdx})`;
  if (!Speech.recognitionSupported() || !micCompat().ok) {
    // No Urdu recognition here (iOS/Safari): record and compare by ear.
    if (Speech.recordingSupported()) return goonjStart(outId, item.ur, item.tr);
    out.innerHTML = selfCheckNote();
    return;
  }
  out.innerHTML = `<div class="pr listening">🎙️ Listening… say: <em>${esc(item.tr)}</em></div>`;
  let recording = false;
  if (Speech.recordingSupported()) {
    try { await Speech.recordStart(); recording = true; } catch (_) {}
  }
  const keepTake = async () => {
    if (!recording) return null;
    const blob = await Speech.recordStop().catch(() => null);
    if (!blob || !blob.size) return null;
    if (goonjUrls[outId]) URL.revokeObjectURL(goonjUrls[outId]);
    return (goonjUrls[outId] = URL.createObjectURL(blob));
  };
  try {
    const alts = await Speech.listen();
    const take = await keepTake();
    micFailStreak = 0;
    const score = Speech.score(alts, item.ur);
    let verdict, cls;
    if (score >= 80) { verdict = "🌟 Shābāsh! (Bravo!) Nailed it."; cls = "good"; }
    else if (score >= 55) { verdict = "👍 Close! Hit 🐢 Slow and mind the tricky sounds."; cls = "ok"; }
    else { verdict = "🔁 Not quite, tap 🐢 Slow and echo it piece by piece."; cls = "bad"; }
    out.innerHTML = `
      <div class="pr ${cls}">
        <strong>${verdict}</strong> <span class="score">match: ${score}%</span><br>
        <span class="heard">Heard: <span class="ur-inline">${esc(alts[0] || "—")}</span></span>
        ${take ? echoRow(outId, item.ur, item.tr, retry) : ""}
      </div>`;
  } catch (e) {
    const take = await keepTake();
    if (!["no-speech", "not-allowed"].includes(e.message)) micFailStreak++;
    const msg = MIC_ERRORS[e.message] || "Couldn't listen just now, try again.";
    const dead = Speech.fatalMicError(e.message) || micFailStreak >= 2;
    out.innerHTML = `<div class="pr warn">⚠️ ${esc(msg)}</div>`
      + (take ? `<div class="pr goonj"><b>Your take still got recorded:</b>${echoRow(outId, item.ur, item.tr, retry)}</div>` : "")
      + (dead && !take ? selfCheckNote() : "");
  }
}

// ── Goonj: record yourself, hear your take next to the native
// clip. No scoring, your own ear is the judge. The recording
// lives in memory only; nothing is uploaded or saved. ─────────

const GOONJ_MAX_MS = 8000;
const goonjUrls = {}; // outId -> blob URL of the learner's latest take
let goonjTimer = null;

function goonjBtn(outId, ur, tr) {
  if (!Speech.recordingSupported()) return "";
  return `<button class="btn mic" title="Record yourself, then hear your take next to the native clip"
    onclick='goonjStart(${JSON.stringify(outId)}, ${JSON.stringify(ur)}, ${JSON.stringify(tr)})'>🪞 Goonj</button>`;
}

async function goonjStart(outId, ur, tr) {
  const out = document.getElementById(outId);
  if (!out) return;
  speechSynthesis.cancel();
  try {
    await Speech.recordStart();
  } catch (e) {
    out.innerHTML = `<div class="pr warn">⚠️ ${e?.name === "NotAllowedError"
      ? "Microphone access was blocked, allow the mic in your browser's site settings and try again."
      : "Couldn't reach the microphone just now, try again."}</div>`;
    return;
  }
  out.innerHTML = `<div class="pr listening">🔴 Recording… say: <em>${esc(tr)}</em>
    <button class="btn small" onclick='goonjFinish(${JSON.stringify(outId)}, ${JSON.stringify(ur)}, ${JSON.stringify(tr)})'>■ Done</button></div>`;
  clearTimeout(goonjTimer);
  goonjTimer = setTimeout(() => goonjFinish(outId, ur, tr), GOONJ_MAX_MS);
}

async function goonjFinish(outId, ur, tr) {
  clearTimeout(goonjTimer);
  const blob = await Speech.recordStop();
  const out = document.getElementById(outId);
  if (!out) return;
  if (!blob || !blob.size) {
    out.innerHTML = `<div class="pr warn">⚠️ Nothing got recorded, try again, and check the right mic is selected.</div>`;
    return;
  }
  if (goonjUrls[outId]) URL.revokeObjectURL(goonjUrls[outId]);
  const url = (goonjUrls[outId] = URL.createObjectURL(blob));
  out.innerHTML = `
    <div class="pr goonj">
      <b>🪞 Goonj, compare by ear:</b>
      <span class="goonj-btns">
        <button class="btn speak" onclick='goonjPlay(${JSON.stringify(outId)})'>▶️ Your take</button>
        <button class="btn speak" onclick='Speech.speak(${JSON.stringify(ur)}, ${JSON.stringify(tr)})'>🔊 Native</button>
        <button class="btn speak" onclick='Speech.speak(${JSON.stringify(ur)}, ${JSON.stringify(tr)}, {slow:true})'>🐢</button>
        <button class="btn" onclick='goonjStart(${JSON.stringify(outId)}, ${JSON.stringify(ur)}, ${JSON.stringify(tr)})'>🔁 Again</button>
      </span>
      <span class="goonj-hint">Listen for the long vowels and the tricky sounds. Your recording stays on this device, nothing is uploaded.</span>
    </div>`;
}

function goonjPlay(outId) {
  if (!goonjUrls[outId]) return;
  speechSynthesis.cancel();
  new Audio(goonjUrls[outId]).play();
}

// ── Quizzes (level quizzes + callback drill share this engine) ──

let quiz = null;

function buildQuestions(items, pool, count) {
  const chosen = shuffle(items).slice(0, Math.min(count, items.length));
  return chosen.map((item) => Object.assign(makeQuestion(item, pool), { item }));
}

function makeQuestion(item, pool) {
  {
    const mode = Math.random();
    const distractors = shuffle(pool.filter((x) => x.tr !== item.tr)).slice(0, 3);
    if (mode < 0.34) {
      return {
        prompt: `<div class="q-ur ur">${esc(item.ur)}</div><div class="q-tr">${esc(item.tr)}</div><p>What does this mean?</p>`,
        options: shuffle([item, ...distractors]).map((x) => ({ label: x.en, correct: x === item })),
      };
    } else if (mode < 0.67) {
      return {
        prompt: `<p>How do you say <strong>“${esc(item.en)}”</strong>?</p>`,
        options: shuffle([item, ...distractors]).map((x) => ({ label: x.tr, sub: x.ur, correct: x === item })),
      };
    } else {
      return {
        prompt: `<p>🔊 Listen, then pick the meaning:</p><button class="btn speak" onclick='Speech.speak(${JSON.stringify(item.ur)}, ${JSON.stringify(item.tr)})'>🔊 Play</button> <button class="btn speak" onclick='Speech.speak(${JSON.stringify(item.ur)}, ${JSON.stringify(item.tr)}, {slow:true})'>🐢</button>`,
        options: shuffle([item, ...distractors]).map((x) => ({ label: x.en, correct: x === item })),
        audio: item,
        autoplay: true,
      };
    }
  }
}

function startQuiz(levelIdx) {
  const lv = LEVELS[levelIdx];
  quiz = {
    kind: "level",
    levelIdx,
    title: `Quiz · ${lv.title}`,
    backFn: `openLevel(${levelIdx})`,
    questions: buildQuestions(lv.items, lv.items, 6),
    current: 0,
    correct: 0,
  };
  renderQuizQuestion();
}

function startCallback() {
  const doneLevels = LEVELS.filter((lv) => isCompleted(lv.id));
  const source = doneLevels.length ? doneLevels : [LEVELS[0]];
  const items = source.flatMap((lv) => lv.items);
  // Leitner-style spaced retrieval: pull the weakest, least-recently-seen
  // words first (box 0 = shaky, box 4 = solid), with a little shuffle so
  // rounds don't repeat verbatim.
  const lt = (profile().leitner ||= {});
  const ranked = [...items].sort((a, b) => {
    const ra = lt[Speech.slug(a.tr)] || { b: 0, t: 0 };
    const rb = lt[Speech.slug(b.tr)] || { b: 0, t: 0 };
    return ra.b - rb.b || ra.t - rb.t;
  });
  const pool = shuffle(ranked.slice(0, Math.min(10, ranked.length)));
  quiz = {
    kind: "callback",
    title: "Callback Round",
    backFn: "renderHome()",
    questions: buildQuestions(pool, items, 6),
    current: 0,
    correct: 0,
  };
  renderQuizQuestion();
}

function renderQuizQuestion() {
  const q = quiz.questions[quiz.current];
  app().innerHTML = `
    ${backBar(esc(quiz.title), quiz.backFn)}
    <div class="quiz-progress">Question ${quiz.current + 1} of ${quiz.questions.length}</div>
    <div class="quiz-card">
      <div class="quiz-prompt">${q.prompt}</div>
      <div class="quiz-options">
        ${q.options
          .map(
            (o, i) => `
          <button class="btn option" id="opt-${i}" onclick="answerQuiz(${i})">
            ${esc(o.label)}${o.sub ? `<span class="opt-ur ur">${esc(o.sub)}</span>` : ""}
          </button>`
          )
          .join("")}
      </div>
      <div id="quiz-feedback" aria-live="polite"></div>
    </div>
  `;
  if (q.autoplay && q.audio) Speech.speak(q.audio.ur, q.audio.tr);
  window.scrollTo(0, 0);
}

function answerQuiz(i) {
  const q = quiz.questions[quiz.current];
  const chosen = q.options[i];
  q.options.forEach((o, j) => {
    const el = $(`#opt-${j}`);
    el.disabled = true;
    if (o.correct) el.classList.add("correct");
    else if (j === i) el.classList.add("wrong");
  });
  if (chosen.correct) quiz.correct++;
  if (q.item) {
    const lt = (profile().leitner ||= {});
    const key = Speech.slug(q.item.tr);
    const cur = lt[key] || { b: 0, t: 0 };
    lt[key] = { b: chosen.correct ? Math.min(cur.b + 1, 4) : 0, t: Date.now() };
    saveRoot();
  }
  $("#quiz-feedback").innerHTML = `
    <div class="pr ${chosen.correct ? "good" : "bad"}">
      ${chosen.correct ? "✅ Sahī! (Correct!)" : "❌ Not this one, the answer is highlighted."}
    </div>
    <button class="btn primary" onclick="nextQuiz()">${quiz.current + 1 < quiz.questions.length ? "Next →" : "See results →"}</button>`;
}

function nextQuiz() {
  quiz.current++;
  if (quiz.current < quiz.questions.length) renderQuizQuestion();
  else if (quiz.kind === "level") finishLevelQuiz();
  else finishCallback();
}

function finishLevelQuiz() {
  const lv = LEVELS[quiz.levelIdx];
  const pct = Math.round((quiz.correct / quiz.questions.length) * 100);
  const passed = pct >= QUIZ_PASS_PERCENT;
  if (passed) markCompleted(lv.id, pct);
  const nextIdx = quiz.levelIdx + 1;
  app().innerHTML = `
    ${backBar(`Quiz results · ${esc(lv.title)}`, "renderTrack('speak')")}
    <div class="result-card ${passed ? "pass" : "fail"}">
      <div class="result-emoji">${passed ? "🎖️" : "💪"}</div>
      <h2 class="retro">${passed ? "Shābāsh! Level passed!" : "So close, one more go!"}</h2>
      <p class="result-score">${quiz.correct} / ${quiz.questions.length} correct, ${pct}%</p>
      ${passed ? rankUpNote() : ""}
      <p>${
        passed
          ? nextIdx < LEVELS.length
            ? `Next up: <strong>Level ${nextIdx + 1}: ${esc(LEVELS[nextIdx].title)}</strong>.`
            : "Speaking track: complete! 🏆"
          : `You need ${QUIZ_PASS_PERCENT}% to pass. Review the phrases and go again, repetition is the whole game.`
      }</p>
      <div class="result-actions">
        ${passed && nextIdx < LEVELS.length ? `<button class="btn primary big" onclick="openLevel(${nextIdx})">Start Level ${nextIdx + 1} →</button>` : ""}
        ${!passed ? `<button class="btn primary big" onclick="openLevel(${quiz.levelIdx})">Review Level ${quiz.levelIdx + 1}</button>` : ""}
        <button class="btn" onclick="renderHome()">Home</button>
      </div>
    </div>
  `;
}

function finishCallback() {
  const pct = Math.round((quiz.correct / quiz.questions.length) * 100);
  app().innerHTML = `
    ${backBar("Callback Round · results")}
    <div class="result-card ${pct >= 70 ? "pass" : "fail"}">
      <div class="result-emoji">${pct >= 70 ? "🧠" : "🔁"}</div>
      <h2 class="retro">${pct >= 70 ? "Memory holding strong" : "Time for a refresher"}</h2>
      <p class="result-score">${quiz.correct} / ${quiz.questions.length} recalled</p>
      <p>${pct >= 70 ? "Old words, still sharp. Words you aced move to a higher box and rest; anything missed comes straight back next round, that spacing is what locks them in." : "No shame, forgetting is part of learning. Revisit the missions these came from and drill again."}</p>
      <div class="result-actions">
        <button class="btn primary big" onclick="startCallback()">Run it again →</button>
        <button class="btn" onclick="renderHome()">Home</button>
      </div>
    </div>
  `;
}

function rankUpNote() {
  const rank = rankFor(profile());
  return `<p class="rankup">★ Your title: <strong>${rank.name}</strong> · <span class="ur-inline">${rank.ur}</span></p>`;
}

// ── Daily game: Desi Roots ───────────────────────────────────

let daily = null;

// distractors must differ in meaning AND word, several loanwords
// share a root (pijama/pyjamas, champú/shampoo)
function rootsQuestion(w, rng) {
  const candidates = LOANWORDS.filter((x) => x.meaning !== w.meaning && x.en !== w.en);
  const distractors = seededPick(candidates, 3, rng);
  return {
    kind: "roots",
    word: w,
    options: seededPick([w, ...distractors], 4, rng).map((x) => ({ label: x.meaning, correct: x === w })),
  };
}

function startDaily() {
  pingPlay("roots");
  // practice mode: endless random rounds; the streak lives in Aaj Ka Paanch
  const rng = mulberry32(Math.floor(Math.random() * 1e9));
  const words = seededPick(LOANWORDS, DAILY_QUESTIONS, rng);
  daily = { questions: words.map((w) => rootsQuestion(w, rng)), current: 0, correct: 0, results: [] };
  renderDailyQuestion();
}

function renderDailyQuestion() {
  const q = daily.questions[daily.current];
  app().innerHTML = `
    ${backBar("🌱 Desi Roots · Practice")}
    <div class="quiz-progress">Word ${daily.current + 1} of ${daily.questions.length}</div>
    <div class="quiz-card">
      <div class="quiz-prompt">
        <p class="daily-lead">${esc(q.word.borrower || "English")} borrowed <strong class="daily-word">“${esc(q.word.en)}”</strong> from Urdu:</p>
        <div class="q-ur ur">${esc(q.word.ur)}</div>
        <div class="q-tr">${esc(q.word.tr)} <button class="btn speak small" onclick='Speech.speak(${JSON.stringify(q.word.ur)}, ${JSON.stringify(q.word.tr)})' aria-label="Play audio">🔊</button></div>
        <p>What does it literally mean?</p>
      </div>
      <div class="quiz-options">
        ${q.options.map((o, i) => `<button class="btn option" id="opt-${i}" onclick="answerDaily(${i})">${esc(o.label)}</button>`).join("")}
      </div>
      <div id="quiz-feedback" aria-live="polite"></div>
    </div>
  `;
  window.scrollTo(0, 0);
}

function answerDaily(i) {
  const q = daily.questions[daily.current];
  const chosen = q.options[i];
  q.options.forEach((o, j) => {
    const el = $(`#opt-${j}`);
    el.disabled = true;
    if (o.correct) el.classList.add("correct");
    else if (j === i) el.classList.add("wrong");
  });
  if (chosen.correct) daily.correct++;
  daily.results.push(chosen.correct);
  $("#quiz-feedback").innerHTML = `
    <div class="pr ${chosen.correct ? "good" : "bad"}">
      ${chosen.correct ? "✅ Sahī!" : "❌ Not quite."} <em>${esc(q.word.story)}</em>
    </div>
    <button class="btn primary" onclick="nextDaily()">${daily.current + 1 < daily.questions.length ? "Next word →" : "Finish →"}</button>`;
}

function nextDaily() {
  daily.current++;
  if (daily.current < daily.questions.length) renderDailyQuestion();
  else finishDaily();
}

function updateDailyStreak() {
  const p = profile();
  const today = todayKey();
  const firstRunToday = p.lastDaily !== today;
  if (firstRunToday) {
    p.streak = p.lastDaily === shiftKey(today, -1) ? p.streak + 1 : 1;
    p.lastDaily = today;
  }
  return firstRunToday;
}

// Wordle-style shareable result. `game` is "roots" or "geo".
function shareDaily(game, btn) {
  const g = { geo, suno, roots: daily, d5 }[game];
  if (!g) return;
  const name = { geo: "Naqsha Challenge 🗺️", suno: "Suno! Challenge 🎧", roots: "Desi Roots 🌱", d5: "Aaj Ka Paanch 🎯" }[game];
  const squares = g.results.map((r) => (r ? "🟩" : "🟥")).join("");
  const text = `Urdu Ustaadh · ${name}\n${todayKey()}  ${squares}  ${g.correct}/${g.questions.length}\n🔥 ${profile().streak}-day streak\nhttps://myurdu.org`;
  const done = () => { if (btn) btn.textContent = "Copied! ✅"; };
  if (navigator.share) {
    navigator.share({ text }).then(done).catch(() => navigator.clipboard?.writeText(text).then(done));
  } else if (navigator.clipboard?.writeText) {
    navigator.clipboard.writeText(text).then(done);
  } else {
    prompt("Copy your result:", text);
  }
}

function finishDaily() {
  app().innerHTML = `
    ${backBar("🌱 Desi Roots · practice")}
    <div class="result-card pass">
      <div class="result-emoji">🌱</div>
      <h2 class="retro">${daily.correct === daily.questions.length ? "Perfect round!" : "Round complete"}</h2>
      <p class="result-score">${daily.correct} / ${daily.questions.length}</p>
      <p class="share-squares">${daily.results.map((r) => (r ? "🟩" : "🟥")).join("")}</p>
      <p>Practice is endless, a fresh five every round. The daily streak lives in 🎯 Aaj Ka Paanch.</p>
      <div class="result-actions">
        <button class="btn primary big" onclick="startDaily()">Another five →</button>
        <button class="btn" onclick="renderHome()">Home</button>
      </div>
    </div>
  `;
}

// ── Daily game: Naqsha Challenge (map) ───────────────────────

let geo = null;

function geoQuestion(f, rng) {
  const sameType = GEO_FEATURES.filter((x) => x.type === f.type && x !== f);
  const distractors = seededPick(sameType, 3, rng);
  return {
    kind: "geo",
    feature: f,
    options: seededPick([f, ...distractors], 4, rng).map((x) => ({ label: x.name, correct: x === f })),
  };
}

function startGeo() {
  pingPlay("naqsha");
  const rng = mulberry32(Math.floor(Math.random() * 1e9));
  const picks = seededPick(GEO_FEATURES, GEO_QUESTIONS, rng);
  geo = { questions: picks.map((f) => geoQuestion(f, rng)), current: 0, correct: 0, results: [] };
  renderGeoQuestion();
}

function geoPrompt(type) {
  return {
    province: "Which province or territory is highlighted?",
    city: "Which city is the glowing dot?",
    feature: "Which natural feature is highlighted?",
    site: "Which landmark is marked (the glowing diamond)?",
    country: "Which neighboring country is highlighted?",
  }[type];
}

function renderGeoQuestion() {
  const q = geo.questions[geo.current];
  app().innerHTML = `
    ${backBar("🗺️ Naqsha · Practice")}
    <div class="quiz-progress">Round ${geo.current + 1} of ${geo.questions.length}</div>
    <div class="quiz-card">
      <div class="map-wrap">${PAK_MAP_SVG}</div>
      <p class="geo-q">${geoPrompt(q.feature.type)}</p>
      <aside class="funfact geo-clue"><span class="ff-tag">🔎 Surāgh · Clue</span><p>${esc(q.feature.clue)}</p></aside>
      <div class="quiz-options">
        ${q.options.map((o, i) => `<button class="btn option" id="opt-${i}" onclick="answerGeo(${i})">${esc(o.label)}</button>`).join("")}
      </div>
      <div id="quiz-feedback" aria-live="polite"></div>
    </div>
  `;
  document.querySelector(`#pakmap #${q.feature.id}`)?.classList.add("geo-hi");
  window.scrollTo(0, 0);
}

function answerGeo(i) {
  const q = geo.questions[geo.current];
  const chosen = q.options[i];
  q.options.forEach((o, j) => {
    const el = $(`#opt-${j}`);
    el.disabled = true;
    if (o.correct) el.classList.add("correct");
    else if (j === i) el.classList.add("wrong");
  });
  if (chosen.correct) geo.correct++;
  geo.results.push(chosen.correct);
  $("#quiz-feedback").innerHTML = `
    <div class="pr ${chosen.correct ? "good" : "bad"}">
      ${chosen.correct ? "✅ Sahī!" : `❌ It's ${esc(q.feature.name)}.`}
      <button class="btn speak small" onclick='Speech.speak(${JSON.stringify(q.feature.ur)}, ${JSON.stringify(q.feature.tr)})'>🔊 ${esc(q.feature.tr)}</button>
    </div>
    <aside class="funfact geo-fact"><span class="ff-tag">✨ Fun fact · ${esc(q.feature.name)}</span><p>${esc(q.feature.blurb)}</p></aside>
    <button class="btn primary" onclick="nextGeo()">${geo.current + 1 < geo.questions.length ? "Next →" : "Finish →"}</button>`;
}

function nextGeo() {
  geo.current++;
  if (geo.current < geo.questions.length) renderGeoQuestion();
  else finishGeo();
}

function finishGeo() {
  app().innerHTML = `
    ${backBar("🗺️ Naqsha · practice")}
    <div class="result-card pass">
      <div class="result-emoji">🗺️</div>
      <h2 class="retro">${geo.correct === geo.questions.length ? "Perfect, a true naqsha-nawis!" : "Map explored"}</h2>
      <p class="result-score">${geo.correct} / ${geo.questions.length}</p>
      <p class="share-squares">${geo.results.map((r) => (r ? "🟩" : "🟥")).join("")}</p>
      <p>Practice is endless, a fresh map every round. The daily streak lives in 🎯 Aaj Ka Paanch.</p>
      <div class="result-actions">
        <button class="btn primary big" onclick="startGeo()">Another map →</button>
        <button class="btn" onclick="renderHome()">Home</button>
      </div>
    </div>
  `;
}

// ── Daily game: Suno! (listening) ────────────────────────────

let suno = null;

function sunoQuestion(item, pool, rng) {
  const distractors = seededPick(pool.filter((x) => x.tr !== item.tr && x.en !== item.en), 3, rng);
  return {
    kind: "suno",
    item,
    options: seededPick([item, ...distractors], 4, rng).map((x) => ({ label: x.en, correct: x === item })),
  };
}

function startSuno() {
  pingPlay("suno");
  const rng = mulberry32(Math.floor(Math.random() * 1e9));
  const pool = LEVELS.flatMap((lv) => lv.items);
  const picks = seededPick(pool, DAILY_QUESTIONS, rng);
  suno = { questions: picks.map((it) => sunoQuestion(it, pool, rng)), current: 0, correct: 0, results: [] };
  renderSunoQuestion();
}

function renderSunoQuestion() {
  const q = suno.questions[suno.current];
  app().innerHTML = `
    ${backBar("🎧 Suno! · Practice")}
    <div class="quiz-progress">Sound ${suno.current + 1} of ${suno.questions.length}</div>
    <div class="quiz-card">
      <div class="quiz-prompt suno-prompt">
        <p>🎧 Listen closely, what does it mean?</p>
        <button class="btn primary big" onclick='Speech.speak(${JSON.stringify(q.item.ur)}, ${JSON.stringify(q.item.tr)})'>▶ Play the sound</button>
        <button class="btn speak" onclick='Speech.speak(${JSON.stringify(q.item.ur)}, ${JSON.stringify(q.item.tr)}, {slow:true})'>🐢 Slow</button>
      </div>
      <div class="quiz-options">
        ${q.options.map((o, i) => `<button class="btn option" id="opt-${i}" onclick="answerSuno(${i})">${esc(o.label)}</button>`).join("")}
      </div>
      <div id="quiz-feedback" aria-live="polite"></div>
    </div>
  `;
  Speech.speak(q.item.ur, q.item.tr);
  window.scrollTo(0, 0);
}

function answerSuno(i) {
  const q = suno.questions[suno.current];
  const chosen = q.options[i];
  q.options.forEach((o, j) => {
    const el = $(`#opt-${j}`);
    el.disabled = true;
    if (o.correct) el.classList.add("correct");
    else if (j === i) el.classList.add("wrong");
  });
  if (chosen.correct) suno.correct++;
  suno.results.push(chosen.correct);
  $("#quiz-feedback").innerHTML = `
    <div class="pr ${chosen.correct ? "good" : "bad"}">
      ${chosen.correct ? "✅ Sahī!" : "❌ Not this one."}
      It was: <span class="ur-inline">${esc(q.item.ur)}</span> <strong>${esc(q.item.tr)}</strong>: ${esc(q.item.en)}
    </div>
    <button class="btn primary" onclick="nextSuno()">${suno.current + 1 < suno.questions.length ? "Next sound →" : "Finish →"}</button>`;
}

function nextSuno() {
  suno.current++;
  if (suno.current < suno.questions.length) renderSunoQuestion();
  else finishSuno();
}

function finishSuno() {
  app().innerHTML = `
    ${backBar("🎧 Suno! · practice")}
    <div class="result-card pass">
      <div class="result-emoji">🎧</div>
      <h2 class="retro">${suno.correct === suno.questions.length ? "Golden ears!" : "Good listening"}</h2>
      <p class="result-score">${suno.correct} / ${suno.questions.length}</p>
      <p class="share-squares">${suno.results.map((r) => (r ? "🟩" : "🟥")).join("")}</p>
      <p>Practice is endless, five fresh sounds every round. The daily streak lives in 🎯 Aaj Ka Paanch.</p>
      <div class="result-actions">
        <button class="btn primary big" onclick="startSuno()">Another five →</button>
        <button class="btn" onclick="renderHome()">Home</button>
      </div>
    </div>
  `;
}

// ── Aaj Ka Paanch: THE daily quiz, one streak, every bank ───
// 2 listening + 2 word roots + 1 map, drawn from per-bank no-repeat
// cycles (repeat horizons: ~66 / ~32 / ~45 days).

let d5 = null;

function startDaily5() {
  pingPlay("d5");
  const rng = mulberry32(daySeed() + 5);
  const p = profile();
  const today = todayKey();
  const sunoPool = LEVELS.flatMap((lv) => lv.items);
  let fullPool = azadiPeak() ? [...sunoPool, ...AZADI_ITEMS] : sunoPool;

  // The seeded deal is deterministic, but growing a question bank
  // reshuffles the cycles, which once changed a user's five mid-day
  // after a content deploy. So: pin the first deal of each day in
  // the profile; replays that day always use the pinned five.
  let sunoPicks, rootsPicks, geoPicks;
  const pin = p.d5Deal && p.d5Deal.date === today ? p.d5Deal : null;
  if (pin) {
    sunoPicks = pin.suno.map((tr) => fullPool.find((x) => x.tr === tr)).filter(Boolean);
    rootsPicks = pin.roots.map((en) => LOANWORDS.find((x) => x.en === en)).filter(Boolean);
    geoPicks = pin.geo.map((id) => GEO_FEATURES.find((x) => x.id === id)).filter(Boolean);
  }
  if (!pin || sunoPicks.length !== 2 || rootsPicks.length !== 2 || geoPicks.length !== 1) {
    sunoPicks = azadiPeak()
      ? seededPick(AZADI_ITEMS, 2, mulberry32(daySeed() + 47))
      : cycleDraw(sunoPool, 2, 13001);
    rootsPicks = cycleDraw(LOANWORDS, 2, 1);
    geoPicks = cycleDraw(GEO_FEATURES, 1, 7001);
    p.d5Deal = { date: today, suno: sunoPicks.map((x) => x.tr), roots: rootsPicks.map((x) => x.en), geo: geoPicks.map((x) => x.id) };
    saveRoot();
  }
  const questions = seededPick([
    ...sunoPicks.map((it) => sunoQuestion(it, fullPool, rng)),
    ...rootsPicks.map((w) => rootsQuestion(w, rng)),
    ...geoPicks.map((f) => geoQuestion(f, rng)),
  ], 5, rng);
  d5 = { questions, current: 0, correct: 0, results: [] };
  renderD5();
}

function renderD5() {
  const q = d5.questions[d5.current];
  const kindTag = { suno: "🎧 Suno · listen", roots: "🌱 Desi Roots", geo: "🗺️ Naqsha" }[q.kind];
  let body;
  if (q.kind === "roots") {
    body = `
      <div class="quiz-prompt">
        <p class="daily-lead">${esc(q.word.borrower || "English")} borrowed <strong class="daily-word">“${esc(q.word.en)}”</strong> from Urdu:</p>
        <div class="q-ur ur">${esc(q.word.ur)}</div>
        <div class="q-tr">${esc(q.word.tr)} <button class="btn speak small" onclick='Speech.speak(${JSON.stringify(q.word.ur)}, ${JSON.stringify(q.word.tr)})' aria-label="Play audio">🔊</button></div>
        <p>What does it literally mean?</p>
      </div>`;
  } else if (q.kind === "geo") {
    body = `
      <div class="map-wrap">${PAK_MAP_SVG}</div>
      <p class="geo-q">${geoPrompt(q.feature.type)}</p>
      <aside class="funfact geo-clue"><span class="ff-tag">🔎 Surāgh · Clue</span><p>${esc(q.feature.clue)}</p></aside>`;
  } else {
    body = `
      <div class="quiz-prompt suno-prompt">
        <p>🎧 Listen closely, what does it mean?</p>
        <button class="btn primary big" onclick='Speech.speak(${JSON.stringify(q.item.ur)}, ${JSON.stringify(q.item.tr)})'>▶ Play the sound</button>
        <button class="btn speak" onclick='Speech.speak(${JSON.stringify(q.item.ur)}, ${JSON.stringify(q.item.tr)}, {slow:true})'>🐢 Slow</button>
      </div>`;
  }
  app().innerHTML = `
    ${backBar("🎯 Aaj Ka Paanch · Today's Five")}
    <div class="quiz-progress">Question ${d5.current + 1} of ${d5.questions.length} · ${kindTag} · ${todayKey()}</div>
    <div class="quiz-card">
      ${body}
      <div class="quiz-options">
        ${q.options.map((o, i) => `<button class="btn option" id="opt-${i}" onclick="answerD5(${i})">${esc(o.label)}</button>`).join("")}
      </div>
      <div id="quiz-feedback" aria-live="polite"></div>
    </div>
  `;
  if (q.kind === "geo") document.querySelector(`#pakmap #${q.feature.id}`)?.classList.add("geo-hi");
  if (q.kind === "suno") Speech.speak(q.item.ur, q.item.tr);
  window.scrollTo(0, 0);
}

function answerD5(i) {
  const q = d5.questions[d5.current];
  const chosen = q.options[i];
  q.options.forEach((o, j) => {
    const el = $(`#opt-${j}`);
    el.disabled = true;
    if (o.correct) el.classList.add("correct");
    else if (j === i) el.classList.add("wrong");
  });
  if (chosen.correct) d5.correct++;
  d5.results.push(chosen.correct);
  const detail = q.kind === "roots"
    ? `<em>${esc(q.word.story)}</em>`
    : q.kind === "geo"
      ? `${chosen.correct ? "" : `It's ${esc(q.feature.name)}. `}
         <button class="btn speak small" onclick='Speech.speak(${JSON.stringify(q.feature.ur)}, ${JSON.stringify(q.feature.tr)})'>🔊 ${esc(q.feature.tr)}</button>`
      : `It was: <span class="ur-inline">${esc(q.item.ur)}</span> <strong>${esc(q.item.tr)}</strong>: ${esc(q.item.en)}`;
  $("#quiz-feedback").innerHTML = `
    <div class="pr ${chosen.correct ? "good" : "bad"}">${chosen.correct ? "✅ Sahī!" : "❌ Not this one."} ${detail}</div>
    ${q.kind === "geo" ? `<aside class="funfact geo-fact"><span class="ff-tag">✨ Fun fact · ${esc(q.feature.name)}</span><p>${esc(q.feature.blurb)}</p></aside>` : ""}
    <button class="btn primary" onclick="nextD5()">${d5.current + 1 < d5.questions.length ? "Next →" : "Finish →"}</button>`;
}

function nextD5() {
  d5.current++;
  if (d5.current < d5.questions.length) renderD5();
  else finishD5();
}

function finishD5() {
  const p = profile();
  const firstRunToday = updateDailyStreak();
  const key = todayKey() + "#d5";
  p.dailyBest[key] = Math.max(p.dailyBest[key] || 0, d5.correct);
  saveRoot();
  app().innerHTML = `
    ${backBar("🎯 Aaj Ka Paanch · results")}
    <div class="result-card pass">
      <div class="result-emoji">${d5.correct === d5.questions.length ? "🏆" : "🎯"}</div>
      <h2 class="retro">${d5.correct === d5.questions.length ? "Paanch out of paanch!" : "Round complete"}</h2>
      <p class="result-score">${d5.correct} / ${d5.questions.length}, streak: ${p.streak} day${p.streak === 1 ? "" : "s"}</p>
      <p class="share-squares">${d5.results.map((r) => (r ? "🟩" : "🟥")).join("")}</p>
      <p>${firstRunToday ? "Streak updated. Five fresh questions at midnight, sounds, roots, and the map." : "Already counted today, replays sharpen, streaks stay honest."}</p>
      <div class="result-actions">
        <button class="btn primary big" onclick="shareDaily('d5', this)">📤 Share score</button>
        <button class="btn" onclick="renderHome()">Home</button>
      </div>
    </div>
  `;
}

// ── Certificate (Sanad) ──────────────────────────────────────

async function showCertificate() {
  const p = profile();
  const rank = rankFor(p);
  const name = root.active;
  const overlay = document.createElement("div");
  overlay.className = "modal-overlay";
  overlay.onclick = (e) => { if (e.target === overlay) overlay.remove(); };
  overlay.innerHTML = `
    <div class="modal-card cert-modal">
      <canvas id="cert-canvas" width="1000" height="700"></canvas>
      <div class="result-actions">
        <a class="btn primary" id="cert-dl" download="urdu-ustaadh-sanad.png">⬇️ Download</a>
        <button class="btn" onclick="this.closest('.modal-overlay').remove()">Close</button>
      </div>
    </div>`;
  document.body.appendChild(overlay);

  try { await document.fonts.load("700 60px 'Baloo 2'"); } catch {}
  const cv = document.getElementById("cert-canvas");
  const ctx = cv.getContext("2d");
  // parchment + border
  ctx.fillStyle = "#faf3e1"; ctx.fillRect(0, 0, 1000, 700);
  ctx.strokeStyle = "#12808b"; ctx.lineWidth = 14; ctx.strokeRect(18, 18, 964, 664);
  ctx.strokeStyle = "#d9a413"; ctx.lineWidth = 3; ctx.setLineDash([12, 8]);
  ctx.strokeRect(38, 38, 924, 624); ctx.setLineDash([]);
  // test-card bars
  const bars = ["#12808b", "#d9a413", "#c26a3a", "#b05464", "#6f8f4e", "#7a5ba6", "#c9b98a"];
  bars.forEach((c, i) => { ctx.fillStyle = c; ctx.fillRect(60 + i * 126, 58, 126, 16); });
  // logo
  const logo = new Image();
  logo.src = "icon-192.png";
  await new Promise((res) => { logo.onload = res; logo.onerror = res; });
  ctx.drawImage(logo, 440, 95, 120, 120);
  // text
  ctx.textAlign = "center"; ctx.fillStyle = "#0c5f66";
  ctx.font = "700 44px 'Baloo 2', sans-serif";
  ctx.fillText("Urdu Ustaadh · Sanad", 500, 270);
  ctx.fillStyle = "#8a7458"; ctx.font = "24px 'Baloo 2', sans-serif";
  ctx.fillText("Certificate of Achievement", 500, 305);
  ctx.fillStyle = "#3b2e1f"; ctx.font = "28px 'Baloo 2', sans-serif";
  ctx.fillText("This certifies that", 500, 370);
  ctx.fillStyle = "#0c5f66"; ctx.font = "700 56px 'Baloo 2', sans-serif";
  ctx.fillText(name, 500, 435);
  ctx.fillStyle = "#3b2e1f"; ctx.font = "28px 'Baloo 2', sans-serif";
  ctx.fillText("has earned the title of", 500, 485);
  ctx.fillStyle = "#9b7508"; ctx.font = "700 42px 'Baloo 2', sans-serif";
  ctx.fillText("★ " + rank.name + " ★", 500, 540);
  ctx.fillStyle = "#8a7458"; ctx.font = "22px 'Baloo 2', sans-serif";
  ctx.fillText(todayKey() + "  ·  myurdu.org  ·  a free Urdu-learning resource", 500, 610);
  document.getElementById("cert-dl").href = cv.toDataURL("image/png");
}

// ── Reading & culture units ──────────────────────────────────

function openUnit(unitsName, i) {
  const units = TRACKS[unitsName];
  const u = units[i];
  let body = "";
  let wordSeq = 0; // unique goonj-out ids across a unit's word lists
  for (const sec of u.sections) {
    body += `<div class="read-section"><h3>${sec.heading}</h3>`;
    if (sec.note) body += `<p class="read-note">${sec.note}</p>`;
    if (sec.img) {
      for (const im of [sec.img].flat()) {
        body += `
      <figure class="photo">
        <img src="${im.src}" alt="${esc(im.alt || "")}" loading="lazy" />
        <figcaption>${esc(im.caption || "")}<span class="photo-credit">${esc(im.credit || "")}</span></figcaption>
      </figure>`;
      }
    }
    if (sec.mapEmbed && typeof PAK_MAP_SVG !== "undefined") {
      body += `
      <figure class="photo map-embed">${PAK_MAP_SVG}
        <figcaption>Pakistan's provinces, the Indus, and K2, the same map as the Naqsha Challenge.<span class="photo-credit">Map data: Natural Earth (public domain)</span></figcaption>
      </figure>`;
    }
    const dia = sec.diagram && typeof SOUND_DIAGRAMS !== "undefined" ? SOUND_DIAGRAMS[sec.diagram] : null;
    if (dia) body += `<figure class="diagram">${dia.svg}<figcaption>${esc(dia.caption)}</figcaption></figure>`;
    if (sec.facts) body += sec.facts.map((f) => `<p class="read-fact">${f}</p>`).join("");
    if (sec.letters) {
      body += `<div class="letter-grid">${sec.letters
        .map(
          (l) => `
        <button class="letter" onclick='Speech.speak(${JSON.stringify(l.ch)}, ${JSON.stringify(l.name)})'>
          <span class="letter-ch ur">${l.ch}</span>
          <span class="letter-name">${esc(l.name)}</span>
          <span class="letter-sound">${esc(l.sound)}</span>
        </button>`
        )
        .join("")}</div>`;
    }
    if (sec.forms) {
      body += `<div class="forms-row">${sec.forms
        .map((f) => `<div class="form-cell"><span class="form-ur ur">${f.ur}</span><span class="form-label">${esc(f.label)}</span></div>`)
        .join("")}</div>`;
    }
    if (sec.joiner) {
      body += `<div class="joiner-list">${sec.joiner
        .map(
          (jw) => `
        <div class="joiner-row">
          <span class="joiner-parts ur">${jw.letters.join(" + ")}</span>
          <span class="joiner-eq">=</span>
          <button class="joiner-word" onclick='Speech.speak(${JSON.stringify(jw.ur)}, ${JSON.stringify(jw.tr)})'>
            <span class="ur">${jw.ur}</span> 🔊
          </button>
          <span class="joiner-meta"><b>${esc(jw.tr)}</b> · ${esc(jw.en)}<br><span class="joiner-note">${esc(jw.note)}</span></span>
        </div>`
        )
        .join("")}</div>`;
    }
    if (sec.words) {
      const goonjHere = unitsName === "SOUND_UNITS" && Speech.recordingSupported();
      body += `<div class="word-list">${sec.words
        .map((w) => {
          const row = `
        <button class="word" onclick='Speech.speak(${JSON.stringify(w.ur)}, ${JSON.stringify(w.tr)})'>
          ${w.pic ? `<img class="word-pic" src="${w.pic}" alt="${esc(w.en)}" loading="lazy">` : ""}
          <span class="word-ur ur">${w.ur}</span>
          <span class="word-meta"><strong>${esc(w.tr)}</strong> · ${esc(w.en)}<br><span class="word-spell">${esc(w.spell)}</span></span>
          <span class="word-play">🔊</span>
        </button>`;
          if (!goonjHere) return row;
          const oid = `wg-${u.id}-${wordSeq++}`;
          return `<div class="word-wrap">${row}
        ${goonjBtn(oid, w.ur, w.tr)}
        <div class="goonj-out" id="${oid}"></div></div>`;
        })
        .join("")}</div>`;
    }
    if (sec.verse) {
      body += `<div class="verse">${sec.verse
        .map(
          (line) => `
        <button class="verse-line" onclick='Speech.speak(${JSON.stringify(line.ur)}, ${JSON.stringify(line.tr)}, {slow:true})'>
          <span class="verse-ur ur">${esc(line.ur)}</span>
          <span class="verse-tr">${esc(line.tr)}</span>
          <span class="verse-en">${esc(line.en)}</span>
        </button>`
        )
        .join("")}${sec.credit ? `<div class="verse-credit">${esc(sec.credit)}</div>` : ""}</div>`;
    }
    if (sec.links) {
      body += `<div class="link-row">${sec.links
        .map((l) => `<a class="btn link" href="${l.url}" target="_blank" rel="noopener">${esc(l.label)}</a>`)
        .join("")}</div>`;
    }
    body += `</div>`;
  }
  body += u.funFacts.map(funFact).join("");
  if (unitsName === "SOUND_UNITS" && typeof SOUND_DIAGRAMS_CREDIT !== "undefined") {
    body += `<p class="credit">${esc(SOUND_DIAGRAMS_CREDIT)}</p>`;
  }

  const UNIT_TRACK = { READING_UNITS: "reading", SOUND_UNITS: "sounds", CULTURE_UNITS: "virsa", PAKISTAN_UNITS: "pakistan" };
  app().innerHTML = `
    ${backBar(`${esc(u.title)}`, `renderTrack('${UNIT_TRACK[unitsName] || "speak"}')`)}
    <p class="lesson-intro">${esc(u.intro)}</p>
    ${body}
    <div class="lesson-actions">
      <button class="btn primary big" onclick="completeUnit('${unitsName}',${i})">Mark unit complete ✓</button>
    </div>
  `;
  window.scrollTo(0, 0);
}

function completeUnit(unitsName, i) {
  const units = TRACKS[unitsName];
  markCompleted(units[i].id);
  if (i + 1 < units.length) openUnit(unitsName, i + 1);
  else renderHome();
}

// ── Jashn-e-Azadi UI ─────────────────────────────────────────

function azadiBanner() {
  const [y, m, d] = todayKey().split("-").map(Number);
  const daysLeft = m === 8 ? 14 - d : null;
  const years = y - 1947;
  const line = isAzadiDay()
    ? `🇵🇰 Jashn-e-Azadi Mubarak! ${years} years of azadi. Happy 14th of August!`
    : azadiPeak()
      ? `🇵🇰 Jashn-e-Azadi week, ${daysLeft} din to the 14th. Suno! is serving azadi words all week.`
      : daysLeft && daysLeft > 0
        ? `🇵🇰 Azadi month is here, the big day lands on the 14th (${daysLeft} din). Jashn shurū!`
        : `🇵🇰 ${years} saal of azadi, celebrating all month. Azadi Mubarak!`;
  return `
    <div class="azadi-banner">
      <span>${line}</span>
      <button class="btn small azadi-share-btn" onclick="showAzadiCard()">📤 Share your Azadi card</button>
    </div>`;
}

function launchConfetti() {
  if (matchMedia("(prefers-reduced-motion: reduce)").matches) return;
  if (sessionStorage.getItem("azadi-confetti")) return;
  sessionStorage.setItem("azadi-confetti", "1");
  const box = document.createElement("div");
  box.className = "confetti-box";
  const colors = ["#01411C", "#f7f2e6", "#1a7a3c", "#d9a413"];
  for (let i = 0; i < 44; i++) {
    const c = document.createElement("i");
    c.style.left = Math.random() * 100 + "vw";
    c.style.background = colors[i % colors.length];
    c.style.animationDelay = Math.random() * 2.5 + "s";
    c.style.animationDuration = 2.8 + Math.random() * 2 + "s";
    c.style.transform = `rotate(${Math.random() * 360}deg)`;
    box.appendChild(c);
  }
  document.body.appendChild(box);
  setTimeout(() => box.remove(), 8000);
}

async function showAzadiCard() {
  const overlay = document.createElement("div");
  overlay.className = "modal-overlay";
  overlay.onclick = (e) => { if (e.target === overlay) overlay.remove(); };
  overlay.innerHTML = `
    <div class="modal-card cert-modal">
      <canvas id="azadi-canvas" width="1000" height="700"></canvas>
      <div class="result-actions">
        <a class="btn primary" id="azadi-dl" download="jashn-e-azadi.png">⬇️ Download</a>
        <button class="btn" onclick="this.closest('.modal-overlay').remove()">Close</button>
      </div>
    </div>`;
  document.body.appendChild(overlay);
  try { await document.fonts.load("700 60px 'Baloo 2'"); await document.fonts.load("700 60px 'Noto Nastaliq Urdu'"); } catch {}
  const cv = document.getElementById("azadi-canvas");
  const ctx = cv.getContext("2d");
  ctx.fillStyle = "#01411C"; ctx.fillRect(0, 0, 1000, 700);
  ctx.fillStyle = "#f7f2e6"; ctx.fillRect(0, 0, 250, 700);
  // crescent + star on the green field
  ctx.beginPath(); ctx.arc(660, 300, 150, 0, Math.PI * 2); ctx.fillStyle = "#f7f2e6"; ctx.fill();
  ctx.beginPath(); ctx.arc(705, 262, 128, 0, Math.PI * 2); ctx.fillStyle = "#01411C"; ctx.fill();
  ctx.save(); ctx.translate(740, 230); ctx.rotate(0.35); ctx.fillStyle = "#f7f2e6";
  ctx.beginPath();
  for (let i = 0; i < 5; i++) {
    const a = (i * 4 * Math.PI) / 5 - Math.PI / 2;
    ctx[i ? "lineTo" : "moveTo"](Math.cos(a) * 55, Math.sin(a) * 55);
  }
  ctx.closePath(); ctx.fill(); ctx.restore();
  ctx.textAlign = "center";
  ctx.fillStyle = "#f7f2e6"; ctx.font = "700 64px 'Noto Nastaliq Urdu', serif";
  ctx.fillText("جشن آزادی مبارک", 620, 520);
  ctx.font = "700 36px 'Baloo 2', sans-serif";
  ctx.fillText("Jashn-e-Azadi Mubarak · 14 August", 620, 580);
  ctx.font = "24px 'Baloo 2', sans-serif"; ctx.fillStyle = "#d9a413";
  ctx.fillText("I'm learning Urdu at myurdu.org, a free Urdu-learning resource", 620, 640);
  document.getElementById("azadi-dl").href = cv.toDataURL("image/png");
}

// ── About ────────────────────────────────────────────────────

function showAbout() {
  const overlay = document.createElement("div");
  overlay.className = "modal-overlay";
  overlay.onclick = (e) => { if (e.target === overlay) overlay.remove(); };
  overlay.innerHTML = `
    <div class="modal-card">
      <img src="icon-192.png" alt="" class="modal-logo" />
      <h2 class="retro">Urdu Ustaadh</h2>
      <p>Urdu Ustaadh is made with love for people who want to learn Urdu and immerse themselves in Pakistani culture, history, and traditions.</p>
      <p><strong>It is free, and is intended to be free forever.</strong></p>
      <p>Urdu Ustaadh is a project of <strong>Muneeb Ata Enterprises</strong>. Learn more at <a href="https://muneebata.com" target="_blank" rel="noopener">muneebata.com</a></p>
      <button class="btn primary" onclick="this.closest('.modal-overlay').remove()">Chalo, back to learning</button>
    </div>`;
  document.body.appendChild(overlay);
}

// ── Tracks: home shows buttons; each opens a full track page ──

const TRACK_DEFS = [
  { id: "speak", emoji: "🗣️", title: "Speak & Listen", ur: "بولیں", cls: "",
    desc: "24 levels, salaam to the B1 train journey, plus live role-play scenes with your mic",
    prog: () => [LEVELS.filter((lv) => isCompleted(lv.id)).length, LEVELS.length] },
  { id: "sounds", emoji: "👄", title: "Sound School", ur: "آوازیں", cls: "sounds",
    desc: "Train the sounds English doesn't have, rolled Rs, curled Ts, real anatomy",
    prog: () => [SOUND_UNITS.filter((u) => isCompleted(u.id)).length, SOUND_UNITS.length] },
  { id: "reading", emoji: "📖", title: "Learn to Read", ur: "پڑھیں", cls: "reading",
    desc: "The Nastaliq script from zero, letters, vowels, numerals, street signboards",
    prog: () => [READING_UNITS.filter((u) => isCompleted(u.id)).length, READING_UNITS.length] },
  { id: "virsa", emoji: "🎵", title: "Virsa · Heritage", ur: "ورثہ", cls: "culture",
    desc: "Iqbal, Ghalib, proverbs, and how a ghazal actually works",
    prog: () => [CULTURE_UNITS.filter((u) => isCompleted(u.id)).length, CULTURE_UNITS.length] },
  { id: "pakistan", emoji: "🇵🇰", title: "Thora Break", ur: "تھوڑا وقفہ", cls: "pakistan",
    desc: "Tired of Urdu? Postcards from Pakistan, geography, food, history, wildlife",
    prog: () => [PAKISTAN_UNITS.filter((u) => isCompleted(u.id)).length, PAKISTAN_UNITS.length] },
];

function trackCard(t) {
  const [done, total] = t.prog();
  return `
    <button class="track-btn ${t.cls}" onclick="renderTrack('${t.id}')">
      <span class="tb-emoji">${t.emoji}</span>
      <span class="tb-main">
        <span class="tb-title">${esc(t.title)} <span class="tb-ur ur">${esc(t.ur)}</span></span>
        <span class="tb-desc">${esc(t.desc)}</span>
      </span>
      <span class="tb-prog">${done}/${total}<br><span>done</span></span>
    </button>`;
}

function renderTrack(id) {
  const t = TRACK_DEFS.find((x) => x.id === id);
  const p = profile();
  const bodies = {
    speak: () => micCompatNote() + `<p class="placement-line"><button class="linklike" onclick="renderSair()">🚶 Ready to talk? Take a Sair, eight live conversation walks</button></p>` + placementLine() + trackSpeakHTML(),
    sounds: trackSoundsHTML,
    reading: () => tracingCard() + typingCard() + trackReadingHTML(),
    virsa: () => kutubCard() + trackVirsaHTML(),
    pakistan: trackPakistanHTML,
  };
  app().innerHTML = `
    ${backBar(`${t.emoji} ${esc(t.title)} · <span class="ur">${esc(t.ur)}</span>`)}
    ${bodies[id]()}
  `;
  window.scrollTo(0, 0);
}

function trackSpeakHTML() {
  const p = profile();
  return `
    <section>
      <h2 class="track-title retro">🗣️ Speak &amp; Listen <span class="track-sub">in order is best, they build on each other, but roam freely</span></h2>
      <div class="ledger2">
        ${LEVELS.map((lv, i) => {
          const done = isCompleted(lv.id);
          const score = p.scores[lv.id];
          const placed = !done && p.placedAt != null && i < p.placedAt;
          const st = done
            ? `<span class="lst done">✅ Passed${score != null ? ` · ${score}%` : ""}</span>`
            : placed
              ? `<span class="lst placed">⏭ Placed past</span>`
              : `<span class="lst">▶ Start</span>`;
          return ledgerRow(`openLevel(${i})`, urduNum(i + 1), lv.title, lv.urName, lv.subtitle, st);
        }).join("")}
      </div>
    </section>`;
}

function trackSoundsHTML() {
  const p = profile();
  return `
    <section>
      <h2 class="track-title retro">👄 Awaazain · Sound School <span class="track-sub">train your mouth for the sounds English doesn't have</span></h2>
      <div class="ledger2">
        ${SOUND_UNITS.map((u, i) => {
          const st = isCompleted(u.id) ? `<span class="lst done">✅ Done</span>` : `<span class="lst">▶ Start</span>`;
          return ledgerRow(`openUnit('SOUND_UNITS',${i})`, u.glyph, u.title, null, u.subtitle, st);
        }).join("")}
      </div>
    </section>`;
}

function trackReadingHTML() {
  const p = profile();
  return `
    <section>
      <h2 class="track-title retro">📖 Learn to Read <span class="track-sub">the Nastaliq script, from zero</span></h2>
      <div class="ledger2">
        ${READING_UNITS.map((u, i) => {
          const st = isCompleted(u.id) ? `<span class="lst done">✅ Done</span>` : `<span class="lst">▶ Start</span>`;
          return ledgerRow(`openUnit('READING_UNITS',${i})`, urduNum(i + 1), u.title, null, u.subtitle, st);
        }).join("")}
      </div>
    </section>`;
}

function trackVirsaHTML() {
  const p = profile();
  return `
    <section>
      <h2 class="track-title retro">🎵 Virsa · Heritage <span class="track-sub">poems, rhymes, and the songs everyone knows</span></h2>
      <div class="pages2">
        ${CULTURE_UNITS.map((u, i) => `
        <button class="page2" onclick="openUnit('CULTURE_UNITS',${i})">
          <div class="card-num">Virsa ${String(i + 1).padStart(2, "0")}${isCompleted(u.id) ? " · ✅" : ""}</div>
          ${u.cover ? `<span class="pu ur">${esc(u.cover)}</span>` : ""}
          <div class="card-sub">${esc(u.subtitle)}</div>
        </button>`).join("")}
      </div>
    </section>`;
}

function trackPakistanHTML() {
  const p = profile();
  return `
    <section>
      <h2 class="track-title retro">🇵🇰 Thora Break <span class="track-sub">tired of Urdu? Dive into Pakistan itself instead, open in any order</span></h2>
      <div class="postcards2">
        ${PAKISTAN_UNITS.map((u, i) => `
        <button class="postcard2" onclick="openUnit('PAKISTAN_UNITS',${i})">
          <span class="pstamp ur">پاکستان</span>
          <div class="card-num">Break ${String(i + 1).padStart(2, "0")}</div>
          <div class="card-title">${esc(u.title)}</div>
          <div class="card-sub">${esc(u.subtitle)}</div>
          <span class="paddr"><span>${esc(u.postfrom || "")}</span><span>${isCompleted(u.id) ? "✅ Done" : "▶ Start"}</span></span>
        </button>`).join("")}
      </div>
    </section>`;
}

// ── Role-play: live conversations with the mic ──────────────

const SAIR_STOPS = { RP1: "☕", RP2: "🤝", RP3: "🍋", RP4: "🧭", RP5: "🩺", RP6: "🛺", RP7: "📞", RP8: "🧵" };

function renderSair() {
  app().innerHTML = `
    ${backBar("🚶 Sair · سیر. Take a Walk")}
    <p class="lesson-intro">A stroll through town, entirely in Urdu. Eight stops, the dhaba, a new friend, the bazaar, the way to the station, the clinic, a rickshaw, a phone call home, and the darzi's shop. At every stop the app talks back, your mic answers, and your choices steer the scene.</p>
    ${micCompatNote()}
    ${rolePlayCards()}
  `;
  window.scrollTo(0, 0);
}

function rolePlayCards() {
  const p = profile();
  return `
    <div class="rp-cards">
      ${ROLEPLAYS.map((sc, i) => `
      <button class="rp-card ${sc.img ? "has-thumb" : ""}" onclick="startRolePlay(${i})">
        ${sc.img ? `<span class="rp-thumb"><img src="${sc.img.src}" alt="${esc(sc.img.alt)}" loading="lazy"><span class="rp-thumb-credit">${esc(sc.img.credit)}</span></span>` : ""}
        <span class="rp-tag">${SAIR_STOPS[sc.id] || "🎭"} Stop ${i + 1} · Live role-play</span>
        <span class="rp-title">${esc(sc.title)} <span class="ur">${esc(sc.urName)}</span></span>
        <span class="rp-desc">${esc(sc.desc)}</span>
        <span class="rp-best">${p.roleplay?.[sc.id] != null ? `Best: ${p.roleplay[sc.id]}% · play again` : "▶ Play the scene"}</span>
      </button>`).join("")}
    </div>`;
}

let rp = null;

function startRolePlay(i) {
  const scene = ROLEPLAYS[i];
  rp = { scene, idx: 0, passed: 0, tried: 0, history: [], micFails: 0, selfChecked: false, choices: [], forceTap: false };
  renderRP();
}

function rpGoto(next) {
  rp.idx = next === "end" ? rp.scene.turns.length : next != null ? next : rp.idx + 1;
  renderRP();
}

function rpChoiceTurn() {
  return rp.scene.turns[rp.idx];
}

function rpHearOption(k) {
  const o = rpChoiceTurn().choice[k];
  Speech.speak(o.ur, o.tr, { slow: true });
}

function rpPickChoice(k, mark) {
  const turn = rpChoiceTurn();
  const o = turn.choice[k];
  rp.tried++;
  if (mark === "mic") rp.passed++;
  if (mark === "said aloud") {
    rp.passed++;
    rp.selfChecked = true;
  }
  rp.choices.push({ options: turn.choice, chosen: k });
  rp.history.push({ who: "you", ur: o.ur, tr: o.tr, mark: mark ? "✓" : "(skipped)" });
  rpGoto(o.next);
}

async function rpSayChoice() {
  const turn = rpChoiceTurn();
  const out = document.getElementById("rp-feedback");
  out.innerHTML = `<div class="pr listening">🎙️ Listening… say the line of the road you choose</div>`;
  try {
    const alts = await Speech.listen();
    rp.micFails = 0;
    const scores = turn.choice.map((o) => Speech.score(alts, o.ur));
    const best = scores.indexOf(Math.max(...scores));
    if (scores[best] >= 55) return rpPickChoice(best, "mic");
    out.innerHTML = `<div class="pr bad">🔁 Not quite, heard: <span class="ur-inline">${esc(alts[0] || "—")}</span>. Tap 🔊 on a card to hear it, then try again.</div>`;
  } catch (e) {
    if (!["no-speech", "not-allowed"].includes(e.message)) rp.micFails++;
    const msg = MIC_ERRORS[e.message] || "Couldn't listen just now, try again.";
    if (Speech.fatalMicError(e.message) || rp.micFails >= 2) {
      rp.forceTap = true;
      renderRP();
      return;
    }
    out.innerHTML = `<div class="pr warn">⚠️ ${esc(msg)}</div>`;
  }
}

function rpBubbles() {
  return rp.history.map((h) => `
    <div class="rp-bubble ${h.who}">
      <span class="rp-ur ur">${esc(h.ur)}</span>
      <span class="rp-tr">${esc(h.tr)}${h.mark ? ` <b class="rp-mark">${h.mark}</b>` : ""}</span>
    </div>`).join("");
}

function renderRP() {
  const sc = rp.scene;
  const turn = sc.turns[rp.idx];
  let controls;
  if (!turn) return finishRP();
  if (turn.choice) {
    const micOK = Speech.recognitionSupported() && micCompat().ok && !rp.forceTap;
    controls = `
      <div class="rp-now you-turn">
        <p class="rp-who">A fork in the conversation, choose your road:</p>
        ${turn.choice.map((o, k) => `
          <button class="rp-opt" onclick="${micOK ? `rpHearOption(${k})` : `rpPickChoice(${k}, 'said aloud')`}">
            <span class="rp-ur ur">${esc(o.ur)}</span>
            <span class="rp-tr">${esc(o.tr)}, <em>${esc(o.en)}</em></span>
            <span class="rp-opt-hint">${micOK ? "🔊 tap to hear" : "say it aloud, then tap to choose"}</span>
          </button>`).join("")}
        <div class="rp-btns">
          ${micOK ? `<button class="btn primary" onclick="rpSayChoice()">🎤 Say the line you choose</button>` : ""}
          <button class="btn small" onclick="rpPickChoice(0)">Skip</button>
        </div>
        ${micOK ? "" : `<p class="hint">Say your pick out loud, then tap its card, the scene follows your choice.</p>`}
        <div id="rp-feedback" aria-live="polite"></div>
      </div>`;
  } else if (turn.who === "them") {
    controls = `
      <div class="rp-now them-turn">
        <p class="rp-who">${esc(sc.themRole)} says:</p>
        <p class="rp-ur ur">${esc(turn.ur)}</p>
        <p class="rp-tr">${esc(turn.tr)}, <em>${esc(turn.en)}</em></p>
        <div class="rp-btns">
          <button class="btn speak" onclick='Speech.speak(${JSON.stringify(turn.ur)}, ${JSON.stringify(turn.tr)})'>🔊 Hear again</button>
          <button class="btn primary" onclick="rpAdvance()">Continue →</button>
        </div>
      </div>`;
  } else {
    const micOK = Speech.recognitionSupported() && micCompat().ok;
    controls = `
      <div class="rp-now you-turn">
        <p class="rp-who">Your line:</p>
        <p class="rp-ur ur">${esc(turn.ur)}</p>
        <p class="rp-tr">${esc(turn.tr)}, <em>${esc(turn.en)}</em></p>
        <div class="rp-btns">
          <button class="btn speak" onclick='Speech.speak(${JSON.stringify(turn.ur)}, ${JSON.stringify(turn.tr)}, {slow:true})'>🐢 Hear it first</button>
          ${micOK
            ? `<button class="btn primary" onclick="rpSay()">🎤 Say your line</button>`
            : `<button class="btn primary" onclick="rpAdvance('said aloud')">Said it aloud →</button>`}
          <button class="btn small" onclick="rpAdvance()">Skip</button>
        </div>
        ${micOK ? "" : `<p class="hint">${micCompat().reason === "none" ? "No mic support in this browser" : "Mic checking isn't available in this browser (Safari's engine doesn't speak Urdu. Chrome and Edge do)"}, say the line out loud, then continue.</p>`}
        <div id="rp-feedback" aria-live="polite"></div>
      </div>`;
  }
  app().innerHTML = `
    ${backBar(`${SAIR_STOPS[sc.id] || "🎭"} ${esc(sc.title)}`, "renderSair()")}
    <p class="lesson-intro">You are ${esc(sc.youRole)}; the app is ${esc(sc.themRole)}. ${sc.turns.some((t) => t.choice) ? `Line ${rp.history.length + 1}, your choices steer the scene.` : `Line ${rp.idx + 1} of ${sc.turns.length}.`}</p>
    <div class="rp-chat">${rpBubbles()}</div>
    ${controls}
  `;
  if (turn.who === "them") Speech.speak(turn.ur, turn.tr);
  window.scrollTo(0, document.body.scrollHeight);
}

function rpAdvance(mark) {
  const turn = rp.scene.turns[rp.idx];
  if (turn.who === "you") rp.tried++;
  if (turn.who === "you" && mark === "said aloud") {
    rp.passed++;
    rp.selfChecked = true;
  }
  rp.history.push({ ...turn, mark: mark === undefined ? (turn.who === "you" ? "(skipped)" : "") : "✓" });
  rpGoto(turn.next);
}

async function rpSay() {
  const turn = rp.scene.turns[rp.idx];
  const out = document.getElementById("rp-feedback");
  out.innerHTML = `<div class="pr listening">🎙️ Listening… say: <em>${esc(turn.tr)}</em></div>`;
  try {
    const alts = await Speech.listen();
    rp.micFails = 0;
    const score = Speech.score(alts, turn.ur);
    if (score >= 55) {
      rp.passed++;
      rp.tried++;
      rp.history.push({ ...turn, mark: "✓" });
      rpGoto(turn.next);
    } else {
      out.innerHTML = `
        <div class="pr bad">🔁 Not quite, heard: <span class="ur-inline">${esc(alts[0] || "—")}</span>. Tap 🐢, then try again (or Skip).</div>`;
    }
  } catch (e) {
    if (!["no-speech", "not-allowed"].includes(e.message)) rp.micFails++;
    const msg = MIC_ERRORS[e.message] || "Couldn't listen just now, try again.";
    const dead = Speech.fatalMicError(e.message) || rp.micFails >= 2;
    out.innerHTML = `<div class="pr warn">⚠️ ${esc(msg)}</div>` + (dead
      ? `<div class="pr warn">No mic, no problem, 🐢 hear the line, say it out loud, then:</div>
         <button class="btn primary" onclick="rpAdvance('said aloud')">I said it aloud →</button>`
      : "");
  }
}

function finishRP() {
  const sc = rp.scene;
  const yourLines = Math.max(rp.tried, 1);
  const pct = Math.round((rp.passed / yourLines) * 100);
  const self = rp.selfChecked || !Speech.recognitionSupported();
  const p = profile();
  p.roleplay = p.roleplay || {};
  if (!self) p.roleplay[sc.id] = Math.max(p.roleplay[sc.id] || 0, pct);
  saveRoot();
  app().innerHTML = `
    ${backBar(`${SAIR_STOPS[sc.id] || "🎭"} ${esc(sc.title)} · scene complete`, "renderSair()")}
    <div class="result-card ${pct >= 60 ? "pass" : ""}">
      <div class="result-emoji">${pct >= 90 ? "🏆" : pct >= 60 ? "🎉" : "💪"}</div>
      <h2 class="retro">${pct >= 60 ? "You just held a conversation in Urdu!" : "Scene finished, keep practicing!"}</h2>
      <p class="result-score">${rp.passed} of ${yourLines} lines ${self ? "said aloud (self-checked)" : `landed, ${pct}%`}</p>
      ${rp.choices.length ? `
      <div class="rp-reveal">
        <p class="rp-reveal-title">🛤️ Your road through the scene</p>
        ${rp.choices.map((c) => {
          const ch = c.options[c.chosen];
          const alt = c.options[(c.chosen + 1) % c.options.length];
          return `<div class="rp-fx">✓ <b>“${esc(ch.en)}”</b>: ${esc(ch.fx)}
            <span class="rp-alt">↪ the road not taken: “${esc(alt.en)}”, ${esc(alt.fx)}</span></div>`;
        }).join("")}
      </div>` : ""}
      <p>${pct >= 60 ? "That was a real exchange, start to finish. Say it again tomorrow and it'll come out faster." : "Every run makes the lines more automatic. Tap 🐢 on the hard ones and go again."}</p>
      <div class="result-actions">
        <button class="btn primary big" onclick="startRolePlay(${ROLEPLAYS.indexOf(sc)})">Play again</button>
        <button class="btn" onclick="renderSair()">Back to the Sair</button>
        <button class="btn" onclick="renderHome()">Home</button>
      </div>
    </div>
  `;
  window.scrollTo(0, 0);
}

// ── Placement quiz: find your starting line ─────────────────

const PLACEMENT_BANDS = [
  { label: "the basics", levels: [0, 1], startLevel: 0 },
  { label: "everyday words", levels: [2, 3, 4], startLevel: 2 },
  { label: "building sentences", levels: [5, 6, 7, 8], startLevel: 5 },
  { label: "real conversation", levels: [9, 10, 11, 12], startLevel: 9 },
  { label: "past & future tenses", levels: [13, 14, 15, 16, 17], startLevel: 13 },
];

function placementLine() {
  const p = profile();
  return `<p class="placement-line">${p.placedAt != null
    ? `<span class="hint">🧭 Placed at Level ${p.placedAt + 1} · <button class="linklike" onclick="startPlacement()">retake the placement quiz</button></span>`
    : `<button class="linklike" onclick="startPlacement()">🧭 Already know some Urdu? Take the 3-minute placement quiz</button>`}</p>`;
}

let plc = null;

function startPlacement() {
  plc = { band: 0, qInBand: 0, bandCorrect: 0, asked: 0, placedIndex: null };
  nextPlacementQuestion();
}

function nextPlacementQuestion() {
  const band = PLACEMENT_BANDS[plc.band];
  const pool = band.levels.flatMap((i) => LEVELS[i].items);
  const item = shuffle(pool)[0];
  plc.q = Object.assign(makeQuestion(item, pool), { item });
  plc.asked++;
  const q = plc.q;
  app().innerHTML = `
    ${backBar("🧭 Placement · Find your starting line", "renderHome()")}
    <div class="quiz-progress">Question ${plc.asked} · testing: ${esc(band.label)}</div>
    <div class="quiz-card">
      <div class="quiz-prompt">${q.prompt}</div>
      <div class="quiz-options">
        ${q.options.map((o, i) => `
          <button class="btn option" id="opt-${i}" onclick="answerPlacement(${i})">
            ${esc(o.label)}${o.sub ? `<span class="opt-ur ur">${esc(o.sub)}</span>` : ""}
          </button>`).join("")}
      </div>
      <div id="quiz-feedback" aria-live="polite"></div>
    </div>
  `;
  if (q.autoplay && q.audio) Speech.speak(q.audio.ur, q.audio.tr);
  window.scrollTo(0, 0);
}

function answerPlacement(i) {
  const q = plc.q;
  const chosen = q.options[i];
  q.options.forEach((o, j) => {
    const el = $(`#opt-${j}`);
    el.disabled = true;
    if (o.correct) el.classList.add("correct");
    else if (j === i) el.classList.add("wrong");
  });
  if (chosen.correct) plc.bandCorrect++;
  plc.qInBand++;
  $("#quiz-feedback").innerHTML = `
    <div class="pr ${chosen.correct ? "good" : "bad"}">${chosen.correct ? "✅ Sahī!" : "❌ Not this one."}</div>
    <button class="btn primary" onclick="stepPlacement()">Next →</button>`;
}

function stepPlacement() {
  if (plc.qInBand < 3) return nextPlacementQuestion();
  const passed = plc.bandCorrect >= 2;
  if (!passed || plc.band === PLACEMENT_BANDS.length - 1) {
    plc.placedIndex = passed ? 13 : PLACEMENT_BANDS[plc.band].startLevel; // cleared ladder -> start of the A2 arc (L14)
    return finishPlacement();
  }
  plc.band++;
  plc.qInBand = 0;
  plc.bandCorrect = 0;
  nextPlacementQuestion();
}

function finishPlacement() {
  const idx = plc.placedIndex;
  const p = profile();
  p.placedAt = idx;
  saveRoot();
  const lv = LEVELS[idx];
  const fresh = idx === 0;
  const topped = idx === 13 && plc.placedIndex === 13;
  app().innerHTML = `
    ${backBar("🧭 Placement · result")}
    <div class="result-card pass">
      <div class="result-emoji">${topped ? "🏆" : "🧭"}</div>
      <h2 class="retro">${topped ? "You cleared the whole ladder!" : `Your starting line: Level ${idx + 1}`}</h2>
      <p class="result-score">${esc(lv.title)}</p>
      <p>${fresh
        ? "The very beginning is exactly the right place, everyone's salaam starts somewhere."
        : topped
          ? "Straight to the A2 arc: past tense, future, and the wedding capstone await."
          : `Earlier levels are marked "placed past", dip back anytime; they don't count as passed until you take their quizzes.`}</p>
      <div class="result-actions">
        <button class="btn primary big" onclick="openLevel(${topped ? idx : idx})">Start Level ${idx + 1} →</button>
        <button class="btn" onclick="renderTrack('speak')">See all levels</button>
        <button class="btn" onclick="renderHome()">Home</button>
      </div>
    </div>
  `;
  window.scrollTo(0, 0);
}

// ── Ṭāip: Urdu typing, set up the keyboard, text your family ──
// Not a rank completable (like tracing): a practical tool. Drill words
// are typed with the learner's own system Urdu keyboard.

const TYPE_DRILLS = [
  { ur: "اب", tr: "ab", en: "now" },
  { ur: "دل", tr: "dil", en: "heart" },
  { ur: "سب", tr: "sab", en: "all" },
  { ur: "پانی", tr: "pānī", en: "water" },
  { ur: "چائے", tr: "chāy", en: "chai" },
  { ur: "شکریہ", tr: "shukriya", en: "thank you" },
  { ur: "سلام", tr: "salām", en: "salaam" },
  { ur: "کل ملیں گے", tr: "kal mileṉ ge", en: "see you tomorrow" },
];

const TYPE_SETUP = [
  { os: "📱 iPhone / iPad", steps: ["Settings → General → Keyboard → Keyboards", "Add New Keyboard…", "Choose <b>Urdu</b>", "While typing, hold the 🌐 globe key to switch"] },
  { os: "🤖 Android (Gboard)", steps: ["Open Gboard settings (long-press the comma, or Settings → System → Keyboard)", "Languages → Add keyboard", "Search <b>Urdu (اردو)</b> and add it", "Swipe the space bar to switch languages"] },
  { os: "💻 Mac", steps: ["System Settings → Keyboard → Text Input → Input Sources → Edit", "Press + and choose <b>Urdu</b>", "Switch with the input menu (or 🌐/fn key)"] },
  { os: "🖥 Windows", steps: ["Settings → Time &amp; Language → Language &amp; region", "Add a language → <b>اردو (Urdu)</b>", "Switch with Win + Space"] },
];

function typingCard() {
  const done = Object.keys(profile().typing || {}).length;
  return `
    <div class="rp-cards">
      <button class="rp-card" onclick="renderTyping()">
        <span class="rp-tag">⌨️ Ṭāip · Typing</span>
        <span class="rp-title">Type in Urdu <span class="ur">ٹائپ</span></span>
        <span class="rp-desc">Set up the Urdu keyboard on your own phone or computer, then type your first words and text your family in real Urdu script.</span>
        <span class="rp-best">${done ? `${done}/${TYPE_DRILLS.length} words typed · keep going` : "▶ Set up & start typing"}</span>
      </button>
    </div>`;
}

function renderTyping() {
  const t = profile().typing || {};
  app().innerHTML = `
    ${backBar("⌨️ Ṭāip · Type in Urdu", "renderTrack('reading')")}
    <p class="lesson-intro">The fastest way to make Urdu part of your day: put the keyboard on the phone already in your pocket, and text somebody a real سلام. Pick your device, follow the steps once, then drill below, with your own keyboard, not ours.</p>
    <div class="type-setups">
      ${TYPE_SETUP.map((g) => `
        <details class="type-setup">
          <summary>${g.os}</summary>
          <ol>${g.steps.map((st) => `<li>${st}</li>`).join("")}</ol>
        </details>`).join("")}
    </div>
    <p class="hint">Menu names can shift a little between versions, look for “Keyboard” and “Urdu” and you'll land there. No Urdu keyboard yet? The <button class="linklike" onclick="startImla()">Imlā tiles</button> are your training wheels.</p>
    <h3 class="track-title" style="font-size:1.1rem">🖊 Your first words <span class="track-sub">listen, then type what you hear, dots and all</span></h3>
    <div class="type-list">
      ${TYPE_DRILLS.map((d, i) => `
        <div class="type-row${t[Speech.slug(d.tr)] ? " done" : ""}" id="type-row-${i}">
          <div class="type-target">
            <button class="btn speak small" onclick='Speech.speak(${JSON.stringify(d.ur)}, ${JSON.stringify(d.tr)})' aria-label="Play audio">🔊</button>
            <span><b>${esc(d.tr)}</b> · ${esc(d.en)}</span>
            <span class="type-check">${t[Speech.slug(d.tr)] ? "✅" : ""}</span>
          </div>
          <div class="type-input-row">
            <input class="input type-input ur" dir="rtl" lang="ur" placeholder="یہاں لکھیے" autocomplete="off" autocapitalize="off"
              onkeydown="if(event.key==='Enter')typeCheck(${i}, this)">
            <button class="btn small primary" onclick="typeCheck(${i}, this.previousElementSibling)">Check</button>
          </div>
          <div class="type-feedback" aria-live="polite"></div>
        </div>`).join("")}
    </div>`;
  window.scrollTo(0, 0);
}

function typeNorm(s) {
  return (s || "")
    .normalize("NFC")
    .replace(/[\u064B-\u0652\u0670\u200c-\u200f]/g, "")
    .replace(/\s+/g, " ")
    .replace(/ھ/g, "ه").replace(/ہ/g, "ه").replace(/ة/g, "ه")
    .replace(/ي/g, "ی").replace(/ك/g, "ک")
    .trim();
}

function typeCheck(i, input) {
  const d = TYPE_DRILLS[i];
  const row = document.getElementById(`type-row-${i}`);
  const fb = row.querySelector(".type-feedback");
  const got = typeNorm(input.value);
  const want = typeNorm(d.ur);
  if (!got) { fb.innerHTML = `<div class="pr warn">Type it first, switch to your Urdu keyboard (🌐) and listen again.</div>`; return; }
  if (got === want) {
    const t = (profile().typing ||= {});
    t[Speech.slug(d.tr)] = true;
    saveRoot();
    row.classList.add("done");
    row.querySelector(".type-check").textContent = "✅";
    fb.innerHTML = `<div class="pr good">✅ ${esc(d.ur)}, typed by YOU. Shābāsh!</div>`;
    Speech.speak(d.ur, d.tr);
  } else {
    let k = 0;
    while (k < Math.min(got.length, want.length) && got[k] === want[k]) k++;
    const hintCh = want[k] || "";
    fb.innerHTML = `<div class="pr bad">Not quite, compare: <span class="ur-inline">${esc(input.value)}</span> vs <span class="ur-inline">${esc(d.ur)}</span>${hintCh ? ` · check the letter <span class="ur-inline">${esc(hintCh)}</span>` : ""}</div>`;
  }
}

// ── Likhna: letter tracing ──────────────────────────────────
// Qaida stroke order: the letter body first, in one flowing
// right-to-left stroke, then dots and marks. Scoring = start at
// the right place + cover the guide + no wild scribbling.

const TRACE_BOX = 200;
const TRACE_ALL = [...TRACE_LETTERS, ...TRACE_WORDS];
function twDims(L) { return [L.w || TRACE_BOX, L.h || TRACE_BOX]; }
const TRACE_PASS = 70;

function tracingCard() {
  const p = profile();
  const t = p.tracing || {};
  const done = TRACE_LETTERS.filter((L) => (t[L.name] || 0) >= TRACE_PASS).length;
  return `
    <div class="rp-cards">
      <button class="rp-card" onclick="renderTracing()">
        <span class="rp-tag">✍️ Likhna · Writing</span>
        <span class="rp-title">Letter Tracing <span class="ur">لکھنا</span></span>
        <span class="rp-desc">Draw the letters yourself, body first, dots after, the way the qaida teaches. ${TRACE_LETTERS.length} letters, finger or mouse.</span>
        <span class="rp-best">${done ? `${done}/${TRACE_LETTERS.length} letters mastered · keep going` : "▶ Start tracing"}</span>
      </button>
    </div>`;
}

function renderTracing() {
  const p = profile();
  const t = p.tracing || {};
  app().innerHTML = `
    ${backBar("✍️ Likhna · Letter Tracing", "renderTrack('reading')")}
    <p class="lesson-intro">Write each letter the way the qaida teaches: the body first, in one flowing stroke. Urdu moves <b>right to left</b>: then its dots and marks. Trace with a finger or a mouse.</p>
    <div class="tw-grid">
      ${TRACE_LETTERS.map((L, i) => `
        <button class="tw-pick" onclick="startTracing(${i})">
          <span class="ur-naskh">${L.ch}</span>
          <b>${esc(L.name)}</b>
          <span class="tw-best">${t[L.name] != null ? `${t[L.name] >= TRACE_PASS ? "✅ " : ""}${t[L.name]}%` : "trace it"}</span>
        </button>`).join("")}
    </div>
    <h3 class="track-title" style="font-size:1.1rem">🔗 Whole words <span class="track-sub">letters holding hands, the bridge to Imlā</span></h3>
    <div class="tw-grid">
      ${TRACE_WORDS.map((L, i) => `
        <button class="tw-pick" onclick="startTracing(${TRACE_LETTERS.length + i})">
          <span class="ur-naskh">${L.ch}</span>
          <b>${esc(L.tr)} · ${esc(L.en)}</b>
          <span class="tw-best">${t[L.name] != null ? `${t[L.name] >= TRACE_PASS ? "✅ " : ""}${t[L.name]}%` : "trace it"}</span>
        </button>`).join("")}
    </div>`;
  window.scrollTo(0, 0);
}

let tw = null;

function startTracing(i) {
  const L = TRACE_ALL[i];
  tw = { i, letter: L, step: 0, pts: [], scores: [], msg: "", finalPct: null };
  renderTraceLetter();
  Speech.speak(L.ch, L.tr || L.name);
}

function samplePath(d, n = 26) {
  let svg = document.getElementById("trace-measure");
  if (!svg) {
    svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    svg.id = "trace-measure";
    svg.style.cssText = "position:absolute;width:0;height:0;overflow:hidden";
    document.body.appendChild(svg);
  }
  const el = document.createElementNS("http://www.w3.org/2000/svg", "path");
  el.setAttribute("d", d);
  svg.appendChild(el);
  const len = el.getTotalLength();
  const pts = [];
  for (let i = 0; i <= n; i++) {
    const pt = el.getPointAtLength((len * i) / n);
    pts.push([pt.x, pt.y]);
  }
  el.remove();
  return { pts, len };
}

function traceScore(d, userPts) {
  const { pts: guide, len } = samplePath(d);
  const TOL = 18;
  const covered = guide.filter((g) => userPts.some((u) => Math.hypot(u[0] - g[0], u[1] - g[1]) <= TOL)).length / guide.length;
  const startOK = userPts.length > 0 && Math.hypot(userPts[0][0] - guide[0][0], userPts[0][1] - guide[0][1]) <= 28;
  let drawn = 0;
  for (let i = 1; i < userPts.length; i++) drawn += Math.hypot(userPts[i][0] - userPts[i - 1][0], userPts[i][1] - userPts[i - 1][1]);
  return { pct: Math.round(covered * 100), startOK, tidy: drawn <= len * 2.5 + 40 };
}

function twGuideSVG() {
  const L = tw.letter;
  const cur = tw.step;
  const parts = [];
  L.strokes.forEach((st, i) => {
    if (i === cur) return;
    const doneS = i < cur;
    if (st.p) {
      parts.push(`<path d="${st.p}" fill="none" stroke="${doneS ? "#12808b" : "#e3d5b3"}" stroke-width="${doneS ? 9 : 8}" stroke-linecap="round" ${doneS ? "" : 'stroke-dasharray="1.5 7"'}/>`);
    } else {
      parts.push(`<circle cx="${st.d[0]}" cy="${st.d[1]}" r="7" fill="${doneS ? "#12808b" : "none"}" stroke="${doneS ? "#12808b" : "#e3d5b3"}" stroke-width="2.5"/>`);
    }
  });
  const st = L.strokes[cur];
  if (st && st.p) {
    const g = samplePath(st.p, 12).pts;
    const [sx, sy] = g[0];
    const a = Math.atan2(g[1][1] - sy, g[1][0] - sx);
    parts.push(`<path d="${st.p}" fill="none" stroke="#b8a276" stroke-width="8" stroke-linecap="round" stroke-dasharray="1.5 7"/>`);
    const ax = sx + Math.cos(a) * 17, ay = sy + Math.sin(a) * 17;
    const wx = Math.cos(a + Math.PI / 2) * 5.5, wy = Math.sin(a + Math.PI / 2) * 5.5;
    parts.push(`<circle cx="${sx}" cy="${sy}" r="7.5" fill="#6f8f4e"/>`);
    parts.push(`<path d="M${sx + wx},${sy + wy} L${ax},${ay} L${sx - wx},${sy - wy} Z" fill="#6f8f4e"/>`);
  } else if (st) {
    parts.push(`<circle cx="${st.d[0]}" cy="${st.d[1]}" r="10" fill="none" stroke="#6f8f4e" stroke-width="3"/><circle cx="${st.d[0]}" cy="${st.d[1]}" r="3.5" fill="#6f8f4e"/>`);
  }
  const [bw, bh] = twDims(tw.letter);
  return `<svg viewBox="0 0 ${bw} ${bh}" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <line x1="14" y1="145" x2="${bw - 14}" y2="145" stroke="#eee1c2" stroke-width="1.5" stroke-dasharray="4 5"/>
    ${parts.join("")}</svg>`;
}

function renderTraceLetter() {
  const L = tw.letter;
  const total = L.strokes.length;
  const doneAll = tw.step >= total;
  const cur = L.strokes[tw.step];
  app().innerHTML = `
    ${backBar(`✍️ Likhna · ${esc(L.tr || L.name)}`, "renderTracing()")}
    <div class="tw-head">
      <span class="tw-glyph ur-naskh">${L.ch}</span>
      <div>
        <b>${esc(L.tr ? `${L.tr} · ${L.en}` : L.name)}</b>
        <p class="hint">${esc(L.hint)}</p>
        <button class="btn small speak" onclick='Speech.speak(${JSON.stringify(L.ch)}, ${JSON.stringify(L.name)})'>🔊 Hear its name</button>
      </div>
    </div>
    ${doneAll ? twResultHTML() : `
    <p class="tw-status">${cur.p ? "Start at the green dot ● and follow the dashes" : "Now draw the dot at the green target ●"} · step ${tw.step + 1} of ${total}</p>
    <div class="tw-board" style="aspect-ratio:${twDims(L)[0]}/${twDims(L)[1]};${L.w ? "width:min(560px,94vw);" : ""}"><div class="tw-svg">${twGuideSVG()}</div><canvas id="tw-canvas" width="${twDims(L)[0] * 2.4}" height="${twDims(L)[1] * 2.4}"></canvas></div>
    <div id="tw-feedback" aria-live="polite">${tw.msg}</div>
    <div class="rp-btns tw-btns">
      <button class="btn small" onclick="startTracing(${tw.i})">↺ Start letter over</button>
      <button class="btn small" onclick="renderTracing()">All letters</button>
    </div>`}
  `;
  if (!doneAll) twBind();
  window.scrollTo(0, 0);
}

function twBind() {
  const cv = document.getElementById("tw-canvas");
  const toBox = (e) => {
    const r = cv.getBoundingClientRect();
    const [bw, bh] = twDims(tw.letter);
    return [((e.clientX - r.left) / r.width) * bw, ((e.clientY - r.top) / r.height) * bh];
  };
  let drawing = false;
  cv.onpointerdown = (e) => {
    e.preventDefault();
    try { cv.setPointerCapture(e.pointerId); } catch (_) {}
    drawing = true;
    tw.pts = [toBox(e)];
    twDrawInk(cv);
  };
  cv.onpointermove = (e) => {
    if (!drawing) return;
    tw.pts.push(toBox(e));
    twDrawInk(cv);
  };
  cv.onpointerup = () => {
    if (!drawing) return;
    drawing = false;
    twEvaluate();
  };
}

function twDrawInk(cv) {
  const ctx = cv.getContext("2d");
  ctx.clearRect(0, 0, cv.width, cv.height);
  const k = cv.width / twDims(tw.letter)[0];
  if (tw.pts.length < 2) {
    if (tw.pts.length === 1) {
      ctx.fillStyle = "rgba(194,106,58,.8)";
      ctx.beginPath();
      ctx.arc(tw.pts[0][0] * k, tw.pts[0][1] * k, 11, 0, Math.PI * 2);
      ctx.fill();
    }
    return;
  }
  ctx.lineWidth = 20;
  ctx.lineCap = "round";
  ctx.lineJoin = "round";
  ctx.strokeStyle = "rgba(194,106,58,.8)";
  ctx.beginPath();
  ctx.moveTo(tw.pts[0][0] * k, tw.pts[0][1] * k);
  for (const p of tw.pts.slice(1)) ctx.lineTo(p[0] * k, p[1] * k);
  ctx.stroke();
}

function twEvaluate() {
  const st = tw.letter.strokes[tw.step];
  if (st.d) {
    const hit = tw.pts.some((u) => Math.hypot(u[0] - st.d[0], u[1] - st.d[1]) <= 24);
    if (hit) {
      tw.scores.push(100);
      tw.step++;
      tw.msg = `<div class="pr good">✅ Dot, nuqta done!</div>`;
    } else {
      tw.msg = `<div class="pr bad">Draw the dot right on the green target ●.</div>`;
    }
  } else {
    const r = traceScore(st.p, tw.pts);
    if (!r.startOK) {
      tw.msg = `<div class="pr warn">Start at the green dot ●. Urdu strokes flow right to left.</div>`;
    } else if (!r.tidy) {
      tw.msg = `<div class="pr warn">Trace just the dashed stroke, one smooth pass, no scribbling.</div>`;
    } else if (r.pct >= TRACE_PASS) {
      tw.scores.push(r.pct);
      tw.step++;
      tw.msg = `<div class="pr good">✅ ${r.pct}%, shābāsh!</div>`;
    } else {
      tw.msg = `<div class="pr bad">${r.pct}% traced, follow the dashed line all the way to its end.</div>`;
    }
  }
  tw.pts = [];
  if (tw.step >= tw.letter.strokes.length) return twFinish();
  renderTraceLetter();
}

function twFinish() {
  const pct = Math.round(tw.scores.reduce((a, b) => a + b, 0) / tw.scores.length);
  const p = profile();
  p.tracing = p.tracing || {};
  p.tracing[tw.letter.name] = Math.max(p.tracing[tw.letter.name] || 0, pct);
  saveRoot();
  tw.finalPct = pct;
  renderTraceLetter();
}

function twResultHTML() {
  const pct = tw.finalPct;
  const next = tw.i + 1 < TRACE_LETTERS.length ? tw.i + 1 : null;
  return `
    <div class="result-card pass">
      <div class="result-emoji">${pct >= 90 ? "🏆" : "✍️"}</div>
      <h2 class="retro">You wrote ${esc(tw.letter.name)}!</h2>
      <p class="result-score">${pct}% · <span class="ur tw-glyph">${tw.letter.ch}</span></p>
      <p>${pct >= 90 ? "Beautiful hand, a true qaida student." : "Every pass makes the hand surer. Trace it again and watch the score climb."}</p>
      <div class="result-actions">
        ${next != null ? `<button class="btn primary big" onclick="startTracing(${next})">Next letter: ${esc(TRACE_LETTERS[next].name)} →</button>` : ""}
        <button class="btn" onclick="startTracing(${tw.i})">Trace it again</button>
        <button class="btn" onclick="renderTracing()">All letters</button>
      </div>
    </div>`;
}

// ── Lughat: the glossary, every word the app teaches ────────

let lughatEntries = null;

function lughatBuild() {
  if (lughatEntries) return lughatEntries;
  const seen = new Set();
  const out = [];
  const add = (ur, tr, en, src, onclick) => {
    const k = tr.toLowerCase();
    if (seen.has(k)) return;
    seen.add(k);
    out.push({ ur, tr, en, src, onclick });
  };
  LEVELS.forEach((lv, i) => lv.items.forEach((it) =>
    add(it.ur, it.tr, it.en, `Level ${i + 1}`, `openLevel(${i})`)));
  AZADI_ITEMS.forEach((it) => add(it.ur, it.tr, it.en, "Azadi special", "renderHome()"));
  LOANWORDS.forEach((w) =>
    add(w.ur, w.tr, `${w.meaning} → ${w.borrower || "English"} “${w.en}”`, "🌱 Desi Roots", "startDaily()"));
  out.sort((x, y) => x.tr.localeCompare(y.tr));
  lughatEntries = out;
  return out;
}

function renderLughat() {
  const entries = lughatBuild();
  app().innerHTML = `
    ${backBar("📖 Lughat · Glossary")}
    <p class="lesson-intro">Every word and phrase on Urdu Ustaadh, ${entries.length} entries, each with native audio and the lesson it lives in. Type to search in English, transliteration, or Urdu.</p>
    <input id="lughat-q" class="lughat-search" type="search" placeholder="Search… (e.g. water, pānī, پانی)" oninput="lughatFilter(this.value)" autocomplete="off">
    <div id="lughat-list">${lughatRows(entries)}</div>
  `;
  window.scrollTo(0, 0);
  document.getElementById("lughat-q").focus();
}

function lughatRows(entries) {
  if (!entries.length) return `<p class="hint" style="text-align:center">Nothing matches, try fewer letters.</p>`;
  return entries.slice(0, 400).map((e, i) => `
    <div class="lughat-row">
      <button class="btn speak small" onclick='Speech.speak(${JSON.stringify(e.ur)}, ${JSON.stringify(e.tr)})' aria-label="Play audio">🔊</button>
      <span class="lughat-main"><b>${esc(e.tr)}</b>: ${esc(e.en)}</span>
      <span class="lughat-ur ur">${esc(e.ur)}</span>
      <button class="linklike lughat-src" onclick="${e.onclick}">${esc(e.src)}</button>
      ${nishaanBtn(e.ur, e.tr, e.en, e.src, true)}
    </div>`).join("");
}

function lughatFilter(q) {
  const needle = q.trim().toLowerCase();
  const norm = (s) => s.toLowerCase().normalize("NFC");
  const strip = (s) => s.replace(/[āáà]/g, "a").replace(/[īí]/g, "i").replace(/[ūú]/g, "u").replace(/[ṉñ]/g, "n").replace(/[ṭ]/g, "t").replace(/[ḍ]/g, "d").replace(/[ṛ]/g, "r");
  const hits = !needle ? lughatBuild() : lughatBuild().filter((e) =>
    strip(norm(e.tr)).includes(strip(needle)) || norm(e.en).includes(needle) || norm(e.ur).includes(norm(q.trim())));
  document.getElementById("lughat-list").innerHTML = lughatRows(hits);
}

// ── Taraqqi: the report card ─────────────────────────────────

function renderReport() {
  const p = profile();
  const rank = rankFor(p);
  const nextRank = RANKS.find((r) => r.need > Object.keys(p.completed).length);
  const done = Object.keys(p.completed).length;

  const tracks = [
    ["🗣️ Speak & Listen", LEVELS.filter((l) => p.completed[l.id]).length, LEVELS.length],
    ["👄 Sound School", SOUND_UNITS.filter((u) => p.completed[u.id]).length, SOUND_UNITS.length],
    ["📖 Learn to Read", READING_UNITS.filter((u) => p.completed[u.id]).length, READING_UNITS.length],
    ["🎵 Virsa", CULTURE_UNITS.filter((u) => p.completed[u.id]).length, CULTURE_UNITS.length],
    ["🇵🇰 Thora Break", PAKISTAN_UNITS.filter((u) => p.completed[u.id]).length, PAKISTAN_UNITS.length],
  ];

  // 90-day heatmap from dailyBest keys (any key that starts with a date)
  const playedDays = new Set(Object.keys(p.dailyBest || {}).map((k) => k.slice(0, 10)));
  const today = todayKey();
  let cells = "";
  for (let d = 89; d >= 0; d--) {
    const key = shiftKey(today, -d);
    const on = playedDays.has(key);
    cells += `<span class="hm-cell${on ? " on" : ""}" title="${key}${on ? " · played" : ""}"></span>`;
  }

  const boxes = [0, 0, 0, 0, 0];
  for (const st of Object.values(p.leitner || {})) boxes[Math.min(st.b || 0, 4)]++;
  const learned = Object.keys(p.leitner || {}).length;
  const boxMax = Math.max(...boxes, 1);

  const traced = TRACE_LETTERS.filter((L) => (p.tracing?.[L.name] || 0) >= TRACE_PASS).length;
  const rpRows = ROLEPLAYS.map((sc) =>
    `<div class="rc-line"><span>🎭 ${esc(sc.title)}</span><b>${p.roleplay?.[sc.id] != null ? p.roleplay[sc.id] + "%" : "—"}</b></div>`).join("");

  app().innerHTML = `
    ${backBar("📊 Taraqqi · Report Card")}
    <div class="rc-head">
      <p class="rc-rank">★ ${esc(rank.name)} <span class="ur">${esc(rank.ur)}</span></p>
      <p class="hint">${nextRank
        ? `${nextRank.need - done} more completion${nextRank.need - done === 1 ? "" : "s"} to ${esc(nextRank.name)}`
        : "Top of the ladder. Ustaadh-e-Azam!"}</p>
    </div>

    <div class="rc-card">
      <h3>🧭 Lessons passed, ${done} of ${LEVELS.length + SOUND_UNITS.length + READING_UNITS.length + CULTURE_UNITS.length + PAKISTAN_UNITS.length}</h3>
      ${tracks.map(([label, n, total]) => `
        <div class="rc-line"><span>${label}</span><b>${n}/${total}</b></div>
        <div class="rc-bar"><span style="width:${Math.round((n / total) * 100)}%"></span></div>`).join("")}
    </div>

    <div class="rc-card">
      <h3>🔥 Daily games, ${p.streak}-day streak</h3>
      <div class="rc-heatmap">${cells}</div>
      <p class="hint">Last 90 days · ${playedDays.size} day${playedDays.size === 1 ? "" : "s"} played</p>
    </div>

    <div class="rc-card">
      <h3>🧠 Word memory, ${learned} words in review</h3>
      <div class="rc-boxes">
        ${boxes.map((n, i) => `
          <div class="rc-box"><div class="rc-box-bar"><span style="height:${Math.round((n / boxMax) * 100)}%"></span></div>
          <span class="rc-box-label">${["new", "1d", "2d", "4d", "8d"][i]}</span><b>${n}</b></div>`).join("")}
      </div>
      <p class="hint">Words climb boxes as you get them right, box 5 words rest 8 days between reviews.</p>
      <div class="rc-line"><span>🔖 Saved with nishaan</span><b>${Object.keys(p.nishaan || {}).length}</b></div>
      <button class="btn small" onclick="startFlashcards()">🃏 Flip the flashcards</button>
    </div>

    <div class="rc-card">
      <h3>✍️ Skills</h3>
      <div class="rc-line"><span>Letters traced (70%+)</span><b>${traced}/${TRACE_LETTERS.length}</b></div>
      <div class="rc-line"><span>📚 Library shelves read</span><b>${Object.keys(p.kutub || {}).length}/${KUTUB.length}</b></div>
      ${rpRows}
      ${p.placedAt != null ? `<div class="rc-line"><span>🧭 Placement</span><b>Level ${p.placedAt + 1}</b></div>` : ""}
    </div>

    <div class="result-actions">
      <button class="btn primary" onclick="showCertificate()">🎓 View my Sanad</button>
      <button class="btn" onclick="renderHome()">Home</button>
    </div>
  `;
  window.scrollTo(0, 0);
}

function slugifyTitle(t) {
  // NFD strips diacritics to base letters (ā→a, ṛ→r) so titles like
  // "Chiṛiyā Ghar" slug to chiriya-ghar, not chi-iy-ghar. Must stay
  // in lockstep with slugify() in tools/gen_seo.py.
  return t.normalize("NFD").replace(/[̀-ͯ]/g, "")
    .toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/-+/g, "-").replace(/^-|-$/g, "");
}

// ── PTV night mode ───────────────────────────────────────────
// Fully automatic: day look 6:00–18:59, night look 19:00–5:59,
// by the visitor's local clock, like a broadcast day. No toggle.
function themeByClock() {
  const h = new Date().getHours();
  return h >= 19 || h < 6 ? "dark" : "light";
}

function initTheme() {
  const apply = () => (document.documentElement.dataset.theme = themeByClock());
  apply();
  setInterval(apply, 60000);
}

// ── Imla: dictation, hear it, spell it from tiles ──────────

let imla = null;

function imlaPool() {
  const all = [...LEVELS.flatMap((lv) => lv.items), ...AZADI_ITEMS];
  const seen = new Set();
  return all.filter((it) => {
    const w = it.ur;
    if (w.includes(" ") || w.includes("!") || w.includes("؟")) return false;
    const n = [...w].length;
    if (n < 2 || n > 6) return false;
    if (seen.has(w)) return false;
    seen.add(w);
    return true;
  });
}

const IMLA_EXTRA = [..."بتنکملسدرہوجی"];

function startImla() {
  pingPlay("imla");
  const pool = imlaPool();
  const rng = mulberry32(Math.floor(Math.random() * 1e9));
  const picks = seededPick(pool, Math.min(5, pool.length), rng);
  imla = { rounds: picks, current: 0, correct: 0, results: [], built: [], bank: [] };
  imlaDeal();
}

function imlaDeal() {
  const item = imla.rounds[imla.current];
  const letters = [...item.ur];
  const extras = seededPick(IMLA_EXTRA.filter((x) => !letters.includes(x)), 3, mulberry32(Math.floor(Math.random() * 1e9)));
  imla.bank = shuffle([...letters, ...extras]).map((ch, i) => ({ ch, i, used: false }));
  imla.built = [];
  renderImla();
  Speech.speak(item.ur, item.tr);
}

function renderImla() {
  const item = imla.rounds[imla.current];
  app().innerHTML = `
    ${backBar("✍️ Imlā! · Spell It")}
    <div class="quiz-progress">Word ${imla.current + 1} of ${imla.rounds.length}</div>
    <div class="quiz-card">
      <div class="quiz-prompt suno-prompt">
        <p>🎧 Listen, then build the word, <b>${esc(item.en)}</b></p>
        <button class="btn primary" onclick='Speech.speak(${JSON.stringify(item.ur)}, ${JSON.stringify(item.tr)})' aria-label="Play the word">▶ Hear it again</button>
        <button class="btn speak" onclick='Speech.speak(${JSON.stringify(item.ur)}, ${JSON.stringify(item.tr)}, {slow:true})' aria-label="Play slowly">🐢 Slow</button>
      </div>
      <div class="imla-built ur" aria-live="polite">${imla.built.map((b) => b.ch).join("") || "&nbsp;"}</div>
      <div class="imla-bank">
        ${imla.bank.map((t, k) => `
          <button class="imla-tile ur" id="tile-${k}" ${t.used ? "disabled" : ""} onclick="imlaTap(${k})">${t.ch}</button>`).join("")}
      </div>
      <div class="rp-btns imla-btns">
        <button class="btn small" onclick="imlaBack()" aria-label="Remove last letter">⌫ Undo</button>
        <button class="btn primary" onclick="imlaCheck()">Check ✓</button>
      </div>
      <div id="quiz-feedback" aria-live="polite"></div>
    </div>
  `;
  window.scrollTo(0, 0);
}

function imlaTap(k) {
  const t = imla.bank[k];
  if (t.used) return;
  t.used = true;
  imla.built.push(t);
  imlaPaint();
}

function imlaBack() {
  const t = imla.built.pop();
  if (t) t.used = false;
  imlaPaint();
}

function imlaPaint() {
  document.querySelector(".imla-built").innerHTML = imla.built.map((b) => b.ch).join("") || "&nbsp;";
  imla.bank.forEach((t, k) => {
    const el = document.getElementById("tile-" + k);
    if (el) el.disabled = t.used;
  });
}

function imlaCheck() {
  const item = imla.rounds[imla.current];
  const guess = imla.built.map((b) => b.ch).join("");
  const right = guess === item.ur;
  if (right) imla.correct++;
  imla.results.push(right);
  $("#quiz-feedback").innerHTML = `
    <div class="pr ${right ? "good" : "bad"}">
      ${right ? "✅ Sahī! Perfect imlā." : `❌ It's spelled: <span class="ur-inline">${esc(item.ur)}</span>`}
      <strong>${esc(item.tr)}</strong>: ${esc(item.en)}
      <button class="btn speak small" onclick='Speech.speak(${JSON.stringify(item.ur)}, ${JSON.stringify(item.tr)})' aria-label="Hear the word">🔊</button>
    </div>
    <button class="btn primary" onclick="imlaNext()">${imla.current + 1 < imla.rounds.length ? "Next word →" : "Finish →"}</button>`;
}

function imlaNext() {
  imla.current++;
  if (imla.current < imla.rounds.length) imlaDeal();
  else {
    app().innerHTML = `
      ${backBar("✍️ Imlā! · results")}
      <div class="result-card pass">
        <div class="result-emoji">✍️</div>
        <h2 class="retro">${imla.correct === imla.rounds.length ? "Flawless imlā!" : "Dictation done"}</h2>
        <p class="result-score">${imla.correct} / ${imla.rounds.length}</p>
        <p class="share-squares">${imla.results.map((r) => (r ? "🟩" : "🟥")).join("")}</p>
        <p>Practice is endless, five fresh words every round, spelled letter by letter.</p>
        <div class="result-actions">
          <button class="btn primary big" onclick="startImla()">Another five →</button>
          <button class="btn" onclick="renderHome()">Home</button>
        </div>
      </div>
    `;
  }
}

// ── Kutub Khana: the public-domain library ───────────────────

// ── Kutub Khana emblem: a taaq (arched alcove) of books with a
// hanging diya, drawn in the site palette, truck-art dotted frame.
const KUTUB_EMBLEM = `<svg class="kutub-emblem" viewBox="0 0 120 132" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
  <rect x="4" y="4" width="112" height="124" rx="14" fill="#fffdf3" stroke="#3b2e1f" stroke-width="3"/>
  <rect x="11" y="11" width="98" height="110" rx="10" fill="none" stroke="#d9a413" stroke-width="2.5" stroke-dasharray="0.5 7" stroke-linecap="round"/>
  <path d="M25,106 L25,56 Q25,33 45,25 Q57,20 60,10 Q63,20 75,25 Q95,33 95,56 L95,106 Z" fill="#f6ecd4" stroke="#0c5f66" stroke-width="3" stroke-linejoin="round"/>
  <line x1="60" y1="16" x2="60" y2="27" stroke="#3b2e1f" stroke-width="1.8"/>
  <path d="M54,33 Q54,28 60,28 Q66,28 66,33 Q66,38 60,38 Q54,38 54,33 Z" fill="#c26a3a" stroke="#3b2e1f" stroke-width="1.6"/>
  <path d="M60,20 Q63,24 60,27 Q57,24 60,20 Z" fill="#d9a413"/>
  <rect x="30" y="68" width="10" height="38" rx="2" fill="#b05464" stroke="#3b2e1f" stroke-width="1.8"/>
  <rect x="41" y="62" width="9" height="44" rx="2" fill="#12808b" stroke="#3b2e1f" stroke-width="1.8"/>
  <rect x="51" y="66" width="11" height="40" rx="2" fill="#d9a413" stroke="#3b2e1f" stroke-width="1.8"/>
  <rect x="63" y="60" width="9" height="46" rx="2" fill="#c26a3a" stroke="#3b2e1f" stroke-width="1.8"/>
  <g transform="rotate(9 87 106)"><rect x="74" y="70" width="10" height="36" rx="2" fill="#6f8f4e" stroke="#3b2e1f" stroke-width="1.8"/></g>
  <line x1="30" y1="76" x2="40" y2="76" stroke="#f6ecd4" stroke-width="1.6"/>
  <line x1="41" y1="70" x2="50" y2="70" stroke="#f6ecd4" stroke-width="1.6"/>
  <line x1="51" y1="74" x2="62" y2="74" stroke="#f6ecd4" stroke-width="1.6"/>
  <line x1="63" y1="68" x2="72" y2="68" stroke="#f6ecd4" stroke-width="1.6"/>
  <line x1="18" y1="106" x2="102" y2="106" stroke="#3b2e1f" stroke-width="3" stroke-linecap="round"/>
  <line x1="24" y1="113" x2="96" y2="113" stroke="#c9b98a" stroke-width="2" stroke-linecap="round"/>
</svg>`;

// Chronological wings for the library shelf
const KUTUB_WINGS = [
  { title: "The Founding Voices", ur: "ابتدا", sub: "1300–1810, where the language found its music", ids: ["K4", "K2"] },
  { title: "The Delhi Court", ur: "دلی", sub: "the 1800s, the last emperors and their poets", ids: ["K1", "K7", "K5"] },
  { title: "The People's Poets", ur: "عوام", sub: "bazaar, schoolroom, and satire", ids: ["K12", "K13", "K14"] },
  { title: "Iqbal", ur: "اقبال", sub: "1877–1938, the poet of the awakening", ids: ["K3", "K6", "K15", "K16"] },
  { title: "The Nation", ur: "قوم", sub: "1947–1954, the words of the founding", ids: ["K8", "K11", "K10", "K9"] },
];

function kutubCard() {
  return `
    <div class="rp-cards">
      <button class="rp-card" onclick="renderKutub()">
        <span class="rp-tag">📚 Kutub Khana · Library</span>
        <span class="rp-title">The Poetry Shelf <span class="ur">کتب خانہ</span></span>
        <span class="rp-desc">Ghalib, Mir, Iqbal, Khusrau, line by line, translated and annotated, with audio. Public domain, browsed freely.</span>
        <span class="rp-best">▶ Open the shelf</span>
      </button>
    </div>`;
}

function renderKutub() {
  app().innerHTML = `
    ${backBar("📚 Kutub Khana · کتب خانہ", "renderHome()")}
    <div class="kutub-hero">${KUTUB_EMBLEM}</div>
    <p class="lesson-intro">${KUTUB.length} shelves, seven hundred years. Everything here is out of copyright and belongs to everyone, read it aloud, tap any line to hear it, and take your time. No quizzes in the library.</p>
    ${KUTUB_WINGS.map((wing) => `
      <h3 class="kutub-wing">${esc(wing.title)} <span class="ur">${esc(wing.ur)}</span> <span class="kutub-wing-sub">${esc(wing.sub)}</span></h3>
      <div class="kutub-shelf">
        ${wing.ids.map((id) => {
          const i = KUTUB.findIndex((x) => x.id === id);
          const w = KUTUB[i];
          return `
          <button class="kutub-book" onclick="renderKutubWork(${i})">
            ${profile().kutub?.[w.id] ? `<span class="kutub-readmark">✓ read</span>` : ""}
            <span class="kutub-ur ur">${esc(w.urName)}</span>
            <span class="kutub-author">${esc(w.author)}</span>
            <span class="kutub-title">${esc(w.title)}</span>
            <span class="kutub-dates">${esc(w.dates)}</span>
            <span class="kutub-scope ${w.scope || "curated"}">${{ complete: "✓ complete text", excerpt: "excerpt", traditional: "oral tradition", curated: "curated selection" }[w.scope || "curated"]}</span>
          </button>`;
        }).join("")}
      </div>`).join("")}`;
  window.scrollTo(0, 0);
}

function kutubToggleRead(id, i) {
  const p = profile();
  p.kutub = p.kutub || {};
  if (p.kutub[id]) delete p.kutub[id];
  else p.kutub[id] = true;
  saveRoot();
  renderKutubWork(i);
}

function renderKutubWork(i) {
  const w = KUTUB[i];
  app().innerHTML = `
    ${backBar(`📖 ${esc(w.author)}`, "renderKutub()")}
    <div class="kutub-head">
      <h2 class="retro">${esc(w.title)}</h2>
      <p class="hint">${esc(w.form)} · ${esc(w.dates)}</p>
    </div>
    ${w.flagArt ? `<div class="kutub-flag">${AZADI_FLAG_SVG}</div>` : ""}
    ${w.img ? `<figure class="photo kutub-photo"><img src="${w.img.src}" alt="${esc(w.img.alt)}" loading="lazy"><figcaption>${esc(w.img.caption)}<span class="photo-credit">${esc(w.img.credit)}</span></figcaption></figure>` : ""}
    <p class="lesson-intro">${esc(w.intro)}</p>
    <div class="kutub-lines">
      ${w.lines.map((l, li) => `
        ${l.band ? `<p class="kutub-band">· بند ${l.band} ·</p>` : ""}
        <div class="kutub-entry">
          <button class="verse-line" onclick='Speech.speak(${JSON.stringify(l.ur)}, ${JSON.stringify(l.tr)}, {slow:true})'>
            <span class="verse-ur ur">${esc(l.ur)}</span>
            <span class="verse-tr">${esc(l.tr)}</span>
            <span class="verse-en">${esc(l.en)}</span>
          </button>
          ${l.note ? `<p class="kutub-note">✎ ${esc(l.note)}</p>` : ""}
          <div class="kutub-nishaan">${nishaanBtn(l.ur, l.tr, l.en, w.author, true)}</div>
        </div>`).join("")}
    </div>
    ${w.links ? `<div class="link-row kutub-links">${w.links.map((l) => `<a class="btn link" href="${l.url}" target="_blank" rel="noopener">${esc(l.label)}</a>`).join("")}</div>` : ""}
    <p class="credit">${esc(w.source)}</p>
    <div class="result-actions">
      <button class="btn ${profile().kutub?.[w.id] ? "" : "primary"}" onclick="kutubToggleRead('${w.id}', ${i})">${profile().kutub?.[w.id] ? "✓ Read, tap to unmark" : "Mark as read ✓"}</button>
      ${i + 1 < KUTUB.length ? `<button class="btn primary" onclick="renderKutubWork(${i + 1})">Next shelf: ${esc(KUTUB[i + 1].author)} →</button>` : ""}
      <button class="btn" onclick="renderKutub()">The shelf</button>
    </div>
  `;
  window.scrollTo(0, 0);
}

// ── Shared bits ──────────────────────────────────────────────

function backBar(title, backFn = "renderHome()") {
  removeAzadiRain(); // confetti is a home-page greeting only
  // History-tracked pages pop real history so the browser and the button
  // agree; transient pages (quizzes, game rounds) run their fallback
  // directly, their parent is still the current history entry.
  const useHist = navStableRender;
  navStableRender = false;
  const click = useHist ? `navBack() || ${backFn}` : backFn;
  return `
    <div class="topbar">
      ${backFn ? `<button class="btn back" onclick="${click}">← Back</button>` : ""}
      <span class="topbar-title">${title}</span>
    </div>`;
}

function shuffle(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

// ── Boot ─────────────────────────────────────────────────────

if ("serviceWorker" in navigator) {
  navigator.serviceWorker.register("sw.js").catch(() => {});
}

Speech.init();
Speech.onVoiceChange = () => {
  const el = document.getElementById("voice-notice");
  if (!el) return;
  const notice = Speech.voiceNotice();
  el.hidden = !notice;
  el.innerHTML = notice ? `🔈 ${esc(notice)}` : "";
};
Cloud.onChange = () => {
  if (document.querySelector(".roster")) renderProfiles();
  else if (document.querySelector(".hero")) renderHome();
};
// Sound School was one unit (S1) before 2026-07-31; its completion
// covered all six sounds, so carry that credit into the split modules.
for (const prof of Object.values(root.profiles || {})) {
  if (!prof.soundSplit) {
    if (prof.completed?.S1) for (const id of ["S1", "S2", "S3", "S4", "S5", "S6"]) prof.completed[id] = true;
    prof.soundSplit = true;
  }
}
saveRoot();

// ── Browser history: make the back button behave like a website ──
// Stable pages push a history entry; popstate re-renders without
// pushing. Transient flows (quizzes, game rounds, placement) stay
// untracked, browser-back from those lands on the last stable page.
const NAV_PAGES = [
  "renderHome", "renderTrack", "openLevel", "openUnit", "renderSair",
  "startRolePlay", "renderKutub", "renderKutubWork", "renderLughat",
  "renderReport", "renderTracing", "startTracing", "renderTyping",
  "startFlashcards",
];
let navPopping = false;
let navStableRender = false;
for (const fname of NAV_PAGES) {
  const orig = window[fname];
  if (typeof orig !== "function") continue;
  window[fname] = function (...args) {
    navStableRender = true; // this render's backBar may use real history
    if (!navPopping) {
      const entry = {
        n: fname,
        a: args.filter((x) => typeof x === "string" || typeof x === "number"),
        d: (history.state?.d ?? 0) + 1,
      };
      const same = history.state?.n === fname && JSON.stringify(history.state.a) === JSON.stringify(entry.a);
      if (same) { /* re-render of the same page, no duplicate entry */ }
      else if (history.state?.n) history.pushState(entry, "");
      else history.replaceState({ ...entry, d: 0 }, "");
    }
    return orig.apply(this, args);
  };
}
window.addEventListener("popstate", (e) => {
  const s = e.state;
  navPopping = true;
  try {
    if (s?.n && typeof window[s.n] === "function") window[s.n](...(s.a || []));
    else renderHome();
  } finally {
    navPopping = false;
  }
});

// In-app ← Back prefers real history (so browser and button agree);
// backBar's fallback expression runs only when there's nothing to pop.
function navBack() {
  if (history.state && history.state.d > 0) {
    history.back();
    return true;
  }
  return false;
}

initTheme();
Cloud.init();
renderHome();

// Anonymous game tick: one tiny { day, game } record per device per
// day per game, sent when a round is started. Nothing about the
// player or their score goes with it, just "somebody played this
// today", so the games can be counted without tracking anyone.
function pingPlay(game) {
  try {
    const k = `urdu-ustaadh-play-${game}`;
    const today = todayKey();
    if (localStorage.getItem(k) === today || !window.MYURDU_API) return;
    localStorage.setItem(k, today); // set first: one ping a day even if the request fails
    fetch(window.MYURDU_API.replace(/\/+$/, "") + "/api/collections/plays/records", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ day: today, game }),
    }).catch(() => {});
  } catch (_) {}
}

// Anonymous visitor tick: one tiny { day } record per device per day.
// Nothing personal is sent or stored, see admin.html for the tally.
(() => {
  try {
    const k = "urdu-ustaadh-visit";
    const today = todayKey();
    if (localStorage.getItem(k) === today || !window.MYURDU_API) return;
    fetch(window.MYURDU_API.replace(/\/+$/, "") + "/api/collections/visits/records", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ day: today }),
    }).then((r) => { if (r.ok) localStorage.setItem(k, today); }).catch(() => {});
  } catch (_) {}
})();
if (isAzadiDay()) launchConfetti();
