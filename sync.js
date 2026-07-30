// ─────────────────────────────────────────────────────────────
// Cloud sync — PocketBase backend (hosted on Railway).
//
// Design: localStorage stays the source of truth for instant,
// offline-safe play. Signing in backs up this device's learners
// and merges progress across devices: on login we pull the cloud
// copy, merge it with local (never losing progress on either
// side), then push. Every later save schedules a debounced push.
// If window.MYURDU_API is empty, all of this is dormant.
// ─────────────────────────────────────────────────────────────

const Cloud = {
  url: (window.MYURDU_API || "").replace(/\/+$/, ""),
  SESSION_KEY: "urdu-ustaadh-cloud-v1",
  token: null,
  user: null, // { id, email }
  recId: null, // the user's progress record id in PocketBase
  status: "off", // off | out | in
  pushTimer: null,
  onChange: null, // UI hook, set by app.js

  enabled() {
    return !!this.url;
  },

  // ── session persistence ────────────────────────────────────
  saveSession() {
    localStorage.setItem(
      this.SESSION_KEY,
      JSON.stringify({ token: this.token, user: this.user, recId: this.recId })
    );
  },

  clearSession() {
    localStorage.removeItem(this.SESSION_KEY);
  },

  async init() {
    if (!this.enabled()) return;
    this.status = "out";
    try {
      const s = JSON.parse(localStorage.getItem(this.SESSION_KEY));
      if (s?.token) {
        this.token = s.token;
        this.user = s.user;
        this.recId = s.recId;
        const r = await this.api("POST", "/api/collections/users/auth-refresh");
        this.token = r.token;
        this.user = { id: r.record.id, email: r.record.email };
        this.status = "in";
        this.saveSession();
        await this.pullMergePush();
      }
    } catch {
      this.signOut(false); // stale/invalid session — quiet fresh start
    }
    this.onChange?.();
  },

  // ── PocketBase REST helper ─────────────────────────────────
  async api(method, path, body) {
    const headers = { "Content-Type": "application/json" };
    if (this.token) headers.Authorization = this.token;
    const res = await fetch(this.url + path, {
      method,
      headers,
      body: body ? JSON.stringify(body) : undefined,
    });
    const data = await res.json().catch(() => ({}));
    if (!res.ok) {
      const detail = Object.values(data?.data || {})[0]?.message;
      throw new Error(detail || data?.message || `Request failed (${res.status})`);
    }
    return data;
  },

  // ── auth ───────────────────────────────────────────────────
  async signUp(email, password) {
    await this.api("POST", "/api/collections/users/records", {
      email,
      password,
      passwordConfirm: password,
    });
    return this.signIn(email, password);
  },

  async signIn(email, password) {
    const r = await this.api("POST", "/api/collections/users/auth-with-password", {
      identity: email,
      password,
    });
    this.token = r.token;
    this.user = { id: r.record.id, email: r.record.email };
    this.status = "in";
    this.recId = null;
    this.saveSession();
    await this.pullMergePush();
    this.onChange?.();
  },

  signOut(notify = true) {
    this.token = null;
    this.user = null;
    this.recId = null;
    this.status = this.enabled() ? "out" : "off";
    clearTimeout(this.pushTimer);
    this.clearSession();
    if (notify) this.onChange?.();
  },

  // ── progress sync ──────────────────────────────────────────
  async fetchRecord() {
    const filter = encodeURIComponent(`user='${this.user.id}'`);
    const r = await this.api(
      "GET",
      `/api/collections/progress/records?perPage=1&filter=${filter}`
    );
    return r.items?.[0] || null;
  },

  async pullMergePush() {
    const rec = await this.fetchRecord();
    if (rec) {
      this.recId = rec.id;
      root = mergeRoots(root, rec.data || {});
      Store.save(root);
    }
    this.saveSession();
    await this.pushNow();
  },

  schedulePush() {
    if (this.status !== "in") return;
    clearTimeout(this.pushTimer);
    this.pushTimer = setTimeout(() => this.pushNow().catch(() => {}), 2000);
  },

  async pushNow() {
    if (this.status !== "in") return;
    const payload = { user: this.user.id, data: root };
    if (this.recId) {
      await this.api("PATCH", `/api/collections/progress/records/${this.recId}`, payload);
    } else {
      const r = await this.api("POST", "/api/collections/progress/records", payload);
      this.recId = r.id;
      this.saveSession();
    }
  },
};

// Merge two progress roots without losing anything on either side:
// completions union, best scores/streaks win, Leitner takes the
// most recently reviewed state per word.
function mergeRoots(local, remote) {
  const out = { active: local.active || remote.active || null, profiles: {} };
  const names = new Set([
    ...Object.keys(local.profiles || {}),
    ...Object.keys(remote.profiles || {}),
  ]);
  for (const name of names) {
    const a = (local.profiles || {})[name];
    const b = (remote.profiles || {})[name];
    if (!a || !b) {
      out.profiles[name] = a || b;
      continue;
    }
    const p = {
      completed: { ...b.completed, ...a.completed },
      scores: {},
      streak: Math.max(a.streak || 0, b.streak || 0),
      lastDaily: [a.lastDaily, b.lastDaily].filter(Boolean).sort().pop() || null,
      dailyBest: {},
      leitner: {},
    };
    for (const k of new Set([...Object.keys(a.scores || {}), ...Object.keys(b.scores || {})]))
      p.scores[k] = Math.max(a.scores?.[k] || 0, b.scores?.[k] || 0);
    for (const k of new Set([...Object.keys(a.dailyBest || {}), ...Object.keys(b.dailyBest || {})]))
      p.dailyBest[k] = Math.max(a.dailyBest?.[k] || 0, b.dailyBest?.[k] || 0);
    for (const k of new Set([...Object.keys(a.leitner || {}), ...Object.keys(b.leitner || {})])) {
      const la = a.leitner?.[k], lb = b.leitner?.[k];
      p.leitner[k] = !la ? lb : !lb ? la : la.t >= lb.t ? la : lb;
    }
    out.profiles[name] = p;
  }
  return out;
}
