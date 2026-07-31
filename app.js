// ─────────────────────────────────────────────────────────────
// Urdu Ustaadh — app shell, profiles, lessons, quizzes, drills
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
  return { completed: {}, scores: {}, streak: 0, lastDaily: null, dailyBest: {}, leitner: {} };
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
      <p class="lesson-intro">Each learner gets their own progress, title, and streak — stored on this device.</p>
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
      <p class="hint">Progress is saved on this device — and to your free account if you sign in (💾 top left of the home screen).</p>
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
      <p>Playing works fine without an account — everything is saved on this device. Sign in to back it up and continue on any other device.</p>
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
      <p class="no-spam">🔒 Your email is used only for logging in. No newsletters, no marketing, no spam — ever. Urdu Ustaadh is completely free.</p>`;
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
    out.innerHTML = `<div class="pr warn">⚠️ Couldn't send just now — email sending may not be configured yet. (${esc(e.message)})</div>`;
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

// The whole curriculum is open — no sequential locks. Levels still
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

// Daily games flip at midnight US Central time (America/Chicago), so
// the whole world gets the same puzzle on the same "day".
function todayKey() {
  return new Intl.DateTimeFormat("en-CA", {
    timeZone: "America/Chicago", year: "numeric", month: "2-digit", day: "2-digit",
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

function azadiWindow() {
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

// The retro waving flag — a loving tribute to every 90s homepage.
// Ripple via animated turbulence displacement (the old GIF-flag look).
const AZADI_FLAG_SVG = `
<svg class="azadi-flag" viewBox="0 0 150 130" aria-label="Waving flag of Pakistan">
  <defs>
    <filter id="flagwave" x="-15%" y="-15%" width="130%" height="130%">
      <feTurbulence type="fractalNoise" baseFrequency="0.012 0.06" numOctaves="2" seed="7" result="w">
        <animate attributeName="baseFrequency" dur="4s" values="0.012 0.06;0.016 0.09;0.012 0.06" repeatCount="indefinite"/>
      </feTurbulence>
      <feDisplacementMap in="SourceGraphic" in2="w" scale="7" xChannelSelector="R" yChannelSelector="G"/>
    </filter>
  </defs>
  <circle cx="14" cy="8" r="5" fill="#d9a413" stroke="#8a6d1c" stroke-width="1.5"/>
  <rect x="11.5" y="12" width="5" height="118" rx="2" fill="#8a5a2b"/>
  <rect x="12.6" y="12" width="1.6" height="118" fill="#b07f45"/>
  <g filter="url(#flagwave)">
    <g transform="translate(17,16)">
      <rect width="126" height="76" fill="#01411C"/>
      <rect width="31.5" height="76" fill="#f7f2e6"/>
      <circle cx="86" cy="38" r="21" fill="#f7f2e6"/>
      <circle cx="92.5" cy="32.5" r="17.5" fill="#01411C"/>
      <path d="M97 21 l3.05 6.7 7.3 0.85 -5.4 5 1.45 7.2 -6.4-3.6 -6.4 3.6 1.45-7.2 -5.4-5 7.3-0.85 Z" fill="#f7f2e6" transform="rotate(20 97 28)"/>
    </g>
  </g>
</svg>`;

// ── Home ─────────────────────────────────────────────────────

function renderHome() {
  if (!root.active) {
    // First visit: start instantly as "Mehmaan" (guest) — no questions
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
    const c2 = CULTURE_UNITS.find((u) => u.id === "C2");
    const verse = c2?.sections.find((sec) => sec.verse)?.verse || [];
    return verse.length ? verse[daySeed() % verse.length] : null;
  })();
  app().innerHTML = `
    <header class="hero">
      <div class="hero-strap"></div>
      <button class="about-btn" onclick="showAbout()" title="About Urdu Ustaadh">ℹ️ About</button>
      <button class="save-btn" onclick="showAccount()" title="Back up your progress">${Cloud.status === "in" ? "☁️ Progress saved" : "💾 Save your progress"}</button>
      ${azadiWindow() ? AZADI_FLAG_SVG : ""}
      <img class="hero-logo" src="icon-192.png" alt="Urdu Ustaadh — اردو" />
      <h1 class="retro">Urdu Ustaadh</h1>
      <p class="tagline">Speak it, hear it, read it — thora thora, har roz.</p>
      <div class="id-row">
        <button class="tag profile-tag" onclick="renderProfiles()" title="Switch learner">👤 ${esc(root.active)} ▾</button>
        <span class="tag rank-tag">★ ${rank.name} · <span class="ur-inline">${rank.ur}</span></span>
        <span class="tag streak-tag">🔥 ${p.streak}-day streak</span>
        ${completedCount() >= RANKS[1].need ? `<button class="tag cert-tag" onclick="showCertificate()" title="Your certificate">🎓 Sanad</button>` : ""}
      </div>
      <div class="progress-wrap" title="${pct}% complete">
        <div class="progress-bar"><div class="progress-fill" style="width:${pct}%"></div></div>
        <span class="progress-label">${pct}% complete</span>
      </div>
      <div class="notice" id="voice-notice" ${notice ? "" : "hidden"}>🔈 ${esc(notice || "")}</div>
      ${azadiWindow() ? azadiBanner() : ""}
      ${due > 0 ? `<button class="review-banner" onclick="startCallback()">📚 ${due} word${due === 1 ? "" : "s"} due for review — two minutes, let's go →</button>` : ""}
    </header>

    <section>
      <h2 class="track-title retro">🎲 Roz ka Khel · Daily Games <span class="track-sub">short, every day — that's how words stick</span></h2>
      ${kahawat ? `
      <button class="proverb-card" onclick='Speech.speak(${JSON.stringify(kahawat.ur)}, ${JSON.stringify(kahawat.tr)}, {slow:true})'>
        <span class="proverb-tag">🗣️ Aaj ki Kahawat · Proverb of the day — tap to hear</span>
        <span class="proverb-ur ur">${esc(kahawat.ur)}</span>
        <span class="proverb-en">${esc(kahawat.en)}</span>
        ${kahawat.ctx ? `<span class="proverb-ctx">${esc(kahawat.ctx)}</span>` : ""}
      </button>` : ""}
      <div class="tickets2">
        <button class="ticket2" style="--tk:var(--mustard)" onclick="startDaily5()">
          <span class="tstub"><span>AAJ KA PAANCH</span></span>
          <div class="card-num gold">Aaj Ka Paanch · Today's Five</div>
          <div class="card-title">The Daily Quiz <span class="tu ur">آج کا پانچ</span></div>
          <div class="card-sub">Five fresh questions — sounds, word roots, and the map — new every midnight</div>
          <div class="card-status">${p.dailyBest[todayKey() + "#d5"] != null ? `✅ Done today · best ${p.dailyBest[todayKey() + "#d5"]}/5 · replay?` : "▶ Play today's five"}</div>
        </button>
        <button class="ticket2" style="--tk:var(--terracotta)" onclick="startCallback()">
          <span class="tstub"><span>YAADDASHT</span></span>
          <div class="card-num" style="color:var(--terracotta)">Yaaddasht · Memory</div>
          <div class="card-title">Callback Round <span class="tu ur">یادداشت</span></div>
          <div class="card-sub">Rapid-fire review pulled from everything you've passed</div>
          <div class="card-status">${due > 0 ? `📚 ${due} due — review now` : "▶ Six quick callbacks"}</div>
        </button>
      </div>
      <p class="arcade-row">🎮 Practice anytime — endless rounds drawn from the same question banks as Aaj Ka Paanch:
        <button class="linklike" onclick="startDaily()">🌱 Desi Roots</button> ·
        <button class="linklike" onclick="startGeo()">🗺️ Naqsha</button> ·
        <button class="linklike" onclick="startSuno()">🎧 Suno!</button>
      </p>
    </section>

    <section>
      <h2 class="track-title retro">🧭 Seekhne ke Raste · The Tracks <span class="track-sub">pick a lane — everything is open, nothing is locked</span></h2>
      <div class="trackgrid">${TRACK_DEFS.map(trackCard).join("")}</div>
      ${p.placedAt == null && completedCount() < 2 ? `<p class="placement-line"><button class="linklike" onclick="startPlacement()">🧭 Already know some Urdu? Take the 3-minute placement quiz</button></p>` : ""}
    </section>


    <footer class="foot">Progress is saved per learner on this device. · <button class="linklike" onclick="renderProfiles()">Switch learner</button> · <a class="linklike" href="learn/">Browse lessons as pages</a></footer>
  `;
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
    ${backBar(`Level ${i + 1} · ${esc(lv.title)}`)}
    <p class="lesson-intro">${esc(lv.intro)}</p>
    ${micCompatNote()}
    <div class="phrase-list">${body}</div>
    <div class="lesson-actions">
      <button class="btn primary big" onclick="startQuiz(${i})">Take the Level ${i + 1} quiz →</button>
      <p class="hint">Score ${QUIZ_PASS_PERCENT}%+ to mark this level passed.</p>
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
        <button class="btn mic" title="Say it and get checked" onclick="practiceItem('${id}',${levelIdx},${itemIdx})">🎤 Say it</button>
      </div>
      <div class="practice-result" id="${id}-result"></div>
    </div>`;
}

function playItem(levelIdx, itemIdx, slow) {
  const item = LEVELS[levelIdx].items[itemIdx];
  Speech.speak(item.ur, item.tr, { slow });
}

// Urdu speech recognition needs an engine that actually speaks Urdu.
// Safari's (Siri) doesn't — and every iOS browser must use Safari's
// engine — so warn those users up front instead of letting the mic fail.
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
  if (c.ok) return "";
  const why = {
    ios: "iPhones and iPads can't do Urdu speech recognition yet — every iOS browser has to use Safari's engine, and it doesn't speak Urdu",
    safari: "Safari can't do Urdu speech recognition yet",
    none: "this browser doesn't support speech recognition",
  }[c.reason];
  return `<div class="mic-note">🎤 <b>Heads up:</b> ${why}, so the live mic check won't work here. <b>Chrome or Edge</b> (on a computer or Android) hears you perfectly. Everything else works fine — and you can always practice by repeating after the audio.</div>`;
}

const MIC_ERRORS = {
  "not-allowed": "Microphone access was blocked — allow the mic in your browser's site settings and try again.",
  "no-speech": "Didn't catch anything — try again, a bit louder and closer to the mic.",
  "audio-capture": "No working microphone found on this device.",
  "language-not-supported": "This browser can't recognize Urdu speech yet (Safari can't — Chrome and Edge can).",
  "service-not-allowed": "This browser blocked its speech service — Chrome or Edge handles the mic check best.",
  network: "The speech service couldn't be reached — check your connection.",
  timeout: "The mic stayed silent — check the right microphone is selected, then try again.",
  aborted: "Listening got interrupted — try again.",
};

let micFailStreak = 0;

function selfCheckNote() {
  return `<div class="pr warn">🎧 Plan B — self-check: tap 🔊 Listen, say it aloud, and match your voice to the clip. For live mic checking, Chrome or Edge (computer or Android) works best.</div>`;
}

async function practiceItem(cardId, levelIdx, itemIdx) {
  const item = LEVELS[levelIdx].items[itemIdx];
  const out = $(`#${cardId}-result`);
  if (!Speech.recognitionSupported() || !micCompat().ok) {
    out.innerHTML = selfCheckNote();
    return;
  }
  out.innerHTML = `<div class="pr listening">🎙️ Listening… say: <em>${esc(item.tr)}</em></div>`;
  try {
    const alts = await Speech.listen();
    micFailStreak = 0;
    const score = Speech.score(alts, item.ur);
    let verdict, cls;
    if (score >= 80) { verdict = "🌟 Shābāsh! (Bravo!) Nailed it."; cls = "good"; }
    else if (score >= 55) { verdict = "👍 Close! Hit 🐢 Slow and mind the tricky sounds."; cls = "ok"; }
    else { verdict = "🔁 Not quite — tap 🐢 Slow and echo it piece by piece."; cls = "bad"; }
    out.innerHTML = `
      <div class="pr ${cls}">
        <strong>${verdict}</strong> <span class="score">match: ${score}%</span><br>
        <span class="heard">Heard: <span class="ur-inline">${esc(alts[0] || "—")}</span></span>
      </div>`;
  } catch (e) {
    if (!["no-speech", "not-allowed"].includes(e.message)) micFailStreak++;
    const msg = MIC_ERRORS[e.message] || "Couldn't listen just now — try again.";
    const dead = Speech.fatalMicError(e.message) || micFailStreak >= 2;
    out.innerHTML = `<div class="pr warn">⚠️ ${esc(msg)}</div>` + (dead ? selfCheckNote() : "");
  }
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
      <div id="quiz-feedback"></div>
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
      ${chosen.correct ? "✅ Sahī! (Correct!)" : "❌ Not this one — the answer is highlighted."}
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
    ${backBar(`Quiz results · ${esc(lv.title)}`)}
    <div class="result-card ${passed ? "pass" : "fail"}">
      <div class="result-emoji">${passed ? "🎖️" : "💪"}</div>
      <h2 class="retro">${passed ? "Shābāsh! Level passed!" : "So close — one more go!"}</h2>
      <p class="result-score">${quiz.correct} / ${quiz.questions.length} correct — ${pct}%</p>
      ${passed ? rankUpNote() : ""}
      <p>${
        passed
          ? nextIdx < LEVELS.length
            ? `Next up: <strong>Level ${nextIdx + 1}: ${esc(LEVELS[nextIdx].title)}</strong>.`
            : "Speaking track: complete! 🏆"
          : `You need ${QUIZ_PASS_PERCENT}% to pass. Review the phrases and go again — repetition is the whole game.`
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
      <p>${pct >= 70 ? "Old words, still sharp. Words you aced move to a higher box and rest; anything missed comes straight back next round — that spacing is what locks them in." : "No shame — forgetting is part of learning. Revisit the missions these came from and drill again."}</p>
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

// distractors must differ in meaning AND word — several loanwords
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
        <div class="q-tr">${esc(q.word.tr)} <button class="btn speak small" onclick='Speech.speak(${JSON.stringify(q.word.ur)}, ${JSON.stringify(q.word.tr)})'>🔊</button></div>
        <p>What does it literally mean?</p>
      </div>
      <div class="quiz-options">
        ${q.options.map((o, i) => `<button class="btn option" id="opt-${i}" onclick="answerDaily(${i})">${esc(o.label)}</button>`).join("")}
      </div>
      <div id="quiz-feedback"></div>
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
      <p>Practice is endless — a fresh five every round. The daily streak lives in 🎯 Aaj Ka Paanch.</p>
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
      <div class="quiz-options">
        ${q.options.map((o, i) => `<button class="btn option" id="opt-${i}" onclick="answerGeo(${i})">${esc(o.label)}</button>`).join("")}
      </div>
      <div id="quiz-feedback"></div>
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
      <em>${esc(q.feature.blurb)}</em>
      <button class="btn speak small" onclick='Speech.speak(${JSON.stringify(q.feature.ur)}, ${JSON.stringify(q.feature.tr)})'>🔊 ${esc(q.feature.tr)}</button>
    </div>
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
      <h2 class="retro">${geo.correct === geo.questions.length ? "Perfect — a true naqsha-nawis!" : "Map explored"}</h2>
      <p class="result-score">${geo.correct} / ${geo.questions.length}</p>
      <p class="share-squares">${geo.results.map((r) => (r ? "🟩" : "🟥")).join("")}</p>
      <p>Practice is endless — a fresh map every round. The daily streak lives in 🎯 Aaj Ka Paanch.</p>
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
        <p>🎧 Listen closely — what does it mean?</p>
        <button class="btn primary big" onclick='Speech.speak(${JSON.stringify(q.item.ur)}, ${JSON.stringify(q.item.tr)})'>▶ Play the sound</button>
        <button class="btn speak" onclick='Speech.speak(${JSON.stringify(q.item.ur)}, ${JSON.stringify(q.item.tr)}, {slow:true})'>🐢 Slow</button>
      </div>
      <div class="quiz-options">
        ${q.options.map((o, i) => `<button class="btn option" id="opt-${i}" onclick="answerSuno(${i})">${esc(o.label)}</button>`).join("")}
      </div>
      <div id="quiz-feedback"></div>
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
      It was: <span class="ur-inline">${esc(q.item.ur)}</span> <strong>${esc(q.item.tr)}</strong> — ${esc(q.item.en)}
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
      <p>Practice is endless — five fresh sounds every round. The daily streak lives in 🎯 Aaj Ka Paanch.</p>
      <div class="result-actions">
        <button class="btn primary big" onclick="startSuno()">Another five →</button>
        <button class="btn" onclick="renderHome()">Home</button>
      </div>
    </div>
  `;
}

// ── Aaj Ka Paanch: THE daily quiz — one streak, every bank ───
// 2 listening + 2 word roots + 1 map, drawn from per-bank no-repeat
// cycles (repeat horizons: ~66 / ~32 / ~45 days).

let d5 = null;

function startDaily5() {
  const rng = mulberry32(daySeed() + 5);
  const sunoPool = LEVELS.flatMap((lv) => lv.items);
  let sunoPicks, fullPool = sunoPool;
  if (azadiWindow()) {
    // Azadi week: the two listening slots celebrate azadi words
    sunoPicks = seededPick(AZADI_ITEMS, 2, mulberry32(daySeed() + 47));
    fullPool = [...sunoPool, ...AZADI_ITEMS];
  } else {
    sunoPicks = cycleDraw(sunoPool, 2, 13001);
  }
  const questions = seededPick([
    ...sunoPicks.map((it) => sunoQuestion(it, fullPool, rng)),
    ...cycleDraw(LOANWORDS, 2, 1).map((w) => rootsQuestion(w, rng)),
    ...cycleDraw(GEO_FEATURES, 1, 7001).map((f) => geoQuestion(f, rng)),
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
        <div class="q-tr">${esc(q.word.tr)} <button class="btn speak small" onclick='Speech.speak(${JSON.stringify(q.word.ur)}, ${JSON.stringify(q.word.tr)})'>🔊</button></div>
        <p>What does it literally mean?</p>
      </div>`;
  } else if (q.kind === "geo") {
    body = `
      <div class="map-wrap">${PAK_MAP_SVG}</div>
      <p class="geo-q">${geoPrompt(q.feature.type)}</p>`;
  } else {
    body = `
      <div class="quiz-prompt suno-prompt">
        <p>🎧 Listen closely — what does it mean?</p>
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
      <div id="quiz-feedback"></div>
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
      ? `${chosen.correct ? "" : `It's ${esc(q.feature.name)}. `}<em>${esc(q.feature.blurb)}</em>
         <button class="btn speak small" onclick='Speech.speak(${JSON.stringify(q.feature.ur)}, ${JSON.stringify(q.feature.tr)})'>🔊 ${esc(q.feature.tr)}</button>`
      : `It was: <span class="ur-inline">${esc(q.item.ur)}</span> <strong>${esc(q.item.tr)}</strong> — ${esc(q.item.en)}`;
  $("#quiz-feedback").innerHTML = `
    <div class="pr ${chosen.correct ? "good" : "bad"}">${chosen.correct ? "✅ Sahī!" : "❌ Not this one."} ${detail}</div>
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
      <p class="result-score">${d5.correct} / ${d5.questions.length} — streak: ${p.streak} day${p.streak === 1 ? "" : "s"}</p>
      <p class="share-squares">${d5.results.map((r) => (r ? "🟩" : "🟥")).join("")}</p>
      <p>${firstRunToday ? "Streak updated. Five fresh questions at midnight — sounds, roots, and the map." : "Already counted today — replays sharpen, streaks stay honest."}</p>
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
        <figcaption>Pakistan's provinces, the Indus, and K2 — the same map as the Naqsha Challenge.<span class="photo-credit">Map data: Natural Earth (public domain)</span></figcaption>
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
    if (sec.words) {
      body += `<div class="word-list">${sec.words
        .map(
          (w) => `
        <button class="word" onclick='Speech.speak(${JSON.stringify(w.ur)}, ${JSON.stringify(w.tr)})'>
          <span class="word-ur ur">${w.ur}</span>
          <span class="word-meta"><strong>${esc(w.tr)}</strong> · ${esc(w.en)}<br><span class="word-spell">${esc(w.spell)}</span></span>
          <span class="word-play">🔊</span>
        </button>`
        )
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

  app().innerHTML = `
    ${backBar(`${esc(u.title)}`)}
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
  const line = isAzadiDay()
    ? "🇵🇰 Jashn-e-Azadi Mubarak! Happy 14th of August!"
    : daysLeft && daysLeft > 0
      ? `🇵🇰 Jashn-e-Azadi week — ${daysLeft} din to the 14th. Suno! is serving azadi words all week.`
      : "🇵🇰 Jashn-e-Azadi week — Suno! is serving azadi words all week.";
  return `
    <div class="azadi-banner">
      <span>${line}</span>
      <button class="btn small azadi-share-btn" onclick="showAzadiCard()">📤 Share your Azadi card</button>
    </div>`;
}

function launchConfetti() {
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
  ctx.fillText("I'm learning Urdu at myurdu.org — a free Urdu-learning resource", 620, 640);
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
    desc: "18 levels, salaam to shaadi season — plus live role-play scenes with your mic",
    prog: () => [LEVELS.filter((lv) => isCompleted(lv.id)).length, LEVELS.length] },
  { id: "sounds", emoji: "👄", title: "Sound School", ur: "آوازیں", cls: "sounds",
    desc: "Train the sounds English doesn't have — rolled Rs, curled Ts, real anatomy",
    prog: () => [SOUND_UNITS.filter((u) => isCompleted(u.id)).length, SOUND_UNITS.length] },
  { id: "reading", emoji: "📖", title: "Learn to Read", ur: "پڑھیں", cls: "reading",
    desc: "The Nastaliq script from zero — letters, vowels, numerals, street signboards",
    prog: () => [READING_UNITS.filter((u) => isCompleted(u.id)).length, READING_UNITS.length] },
  { id: "virsa", emoji: "🎵", title: "Virsa · Heritage", ur: "ورثہ", cls: "culture",
    desc: "Iqbal, Ghalib, proverbs, and how a ghazal actually works",
    prog: () => [CULTURE_UNITS.filter((u) => isCompleted(u.id)).length, CULTURE_UNITS.length] },
  { id: "pakistan", emoji: "🇵🇰", title: "Thora Break", ur: "تھوڑا وقفہ", cls: "pakistan",
    desc: "Tired of Urdu? Postcards from Pakistan — geography, food, history, wildlife",
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
    speak: () => micCompatNote() + rolePlayCards() + placementLine() + trackSpeakHTML(),
    sounds: trackSoundsHTML,
    reading: () => tracingCard() + trackReadingHTML(),
    virsa: trackVirsaHTML,
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
      <h2 class="track-title retro">🗣️ Speak &amp; Listen <span class="track-sub">in order is best — they build on each other — but roam freely</span></h2>
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
      <h2 class="track-title retro">🇵🇰 Thora Break <span class="track-sub">tired of Urdu? Dive into Pakistan itself instead — open in any order</span></h2>
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

function rolePlayCards() {
  const p = profile();
  return `
    <div class="rp-cards">
      ${ROLEPLAYS.map((sc, i) => `
      <button class="rp-card" onclick="startRolePlay(${i})">
        <span class="rp-tag">🎭 Live role-play</span>
        <span class="rp-title">${esc(sc.title)} <span class="ur">${esc(sc.urName)}</span></span>
        <span class="rp-desc">${esc(sc.desc)}</span>
        <span class="rp-best">${p.roleplay?.[sc.id] != null ? `Best: ${p.roleplay[sc.id]}% · play again` : "▶ Play the scene"}</span>
      </button>`).join("")}
    </div>`;
}

let rp = null;

function startRolePlay(i) {
  const scene = ROLEPLAYS[i];
  rp = { scene, idx: 0, passed: 0, tried: 0, history: [], micFails: 0, selfChecked: false };
  renderRP();
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
  if (turn.who === "them") {
    controls = `
      <div class="rp-now them-turn">
        <p class="rp-who">${esc(sc.themRole)} says:</p>
        <p class="rp-ur ur">${esc(turn.ur)}</p>
        <p class="rp-tr">${esc(turn.tr)} — <em>${esc(turn.en)}</em></p>
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
        <p class="rp-tr">${esc(turn.tr)} — <em>${esc(turn.en)}</em></p>
        <div class="rp-btns">
          <button class="btn speak" onclick='Speech.speak(${JSON.stringify(turn.ur)}, ${JSON.stringify(turn.tr)}, {slow:true})'>🐢 Hear it first</button>
          ${micOK
            ? `<button class="btn primary" onclick="rpSay()">🎤 Say your line</button>`
            : `<button class="btn primary" onclick="rpAdvance('said aloud')">Said it aloud →</button>`}
          <button class="btn small" onclick="rpAdvance()">Skip</button>
        </div>
        ${micOK ? "" : `<p class="hint">${micCompat().reason === "none" ? "No mic support in this browser" : "Mic checking isn't available in this browser (Safari's engine doesn't speak Urdu — Chrome and Edge do)"} — say the line out loud, then continue.</p>`}
        <div id="rp-feedback"></div>
      </div>`;
  }
  app().innerHTML = `
    ${backBar(`🎭 ${esc(sc.title)}`, "renderTrack('speak')")}
    <p class="lesson-intro">You are ${esc(sc.youRole)}; the app is ${esc(sc.themRole)}. Line ${rp.idx + 1} of ${sc.turns.length}.</p>
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
  rp.idx++;
  renderRP();
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
      rp.idx++;
      renderRP();
    } else {
      out.innerHTML = `
        <div class="pr bad">🔁 Not quite — heard: <span class="ur-inline">${esc(alts[0] || "—")}</span>. Tap 🐢, then try again (or Skip).</div>`;
    }
  } catch (e) {
    if (!["no-speech", "not-allowed"].includes(e.message)) rp.micFails++;
    const msg = MIC_ERRORS[e.message] || "Couldn't listen just now — try again.";
    const dead = Speech.fatalMicError(e.message) || rp.micFails >= 2;
    out.innerHTML = `<div class="pr warn">⚠️ ${esc(msg)}</div>` + (dead
      ? `<div class="pr warn">No mic, no problem — 🐢 hear the line, say it out loud, then:</div>
         <button class="btn primary" onclick="rpAdvance('said aloud')">I said it aloud →</button>`
      : "");
  }
}

function finishRP() {
  const sc = rp.scene;
  const yourLines = sc.turns.filter((t) => t.who === "you").length;
  const pct = Math.round((rp.passed / yourLines) * 100);
  const self = rp.selfChecked || !Speech.recognitionSupported();
  const p = profile();
  p.roleplay = p.roleplay || {};
  if (!self) p.roleplay[sc.id] = Math.max(p.roleplay[sc.id] || 0, pct);
  saveRoot();
  app().innerHTML = `
    ${backBar(`🎭 ${esc(sc.title)} · scene complete`, "renderTrack('speak')")}
    <div class="result-card ${pct >= 60 ? "pass" : ""}">
      <div class="result-emoji">${pct >= 90 ? "🏆" : pct >= 60 ? "🎉" : "💪"}</div>
      <h2 class="retro">${pct >= 60 ? "You just held a conversation in Urdu!" : "Scene finished — keep practicing!"}</h2>
      <p class="result-score">${rp.passed} of ${yourLines} lines ${self ? "said aloud (self-checked)" : `landed — ${pct}%`}</p>
      <p>${pct >= 60 ? "That was a real exchange, start to finish. Say it again tomorrow and it'll come out faster." : "Every run makes the lines more automatic. Tap 🐢 on the hard ones and go again."}</p>
      <div class="result-actions">
        <button class="btn primary big" onclick="startRolePlay(${ROLEPLAYS.indexOf(sc)})">Play again</button>
        <button class="btn" onclick="renderTrack('speak')">Speak & Listen</button>
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
      <div id="quiz-feedback"></div>
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
        ? "The very beginning is exactly the right place — everyone's salaam starts somewhere."
        : topped
          ? "Straight to the A2 arc: past tense, future, and the wedding capstone await."
          : `Earlier levels are marked "placed past" — dip back anytime; they don't count as passed until you take their quizzes.`}</p>
      <div class="result-actions">
        <button class="btn primary big" onclick="openLevel(${topped ? idx : idx})">Start Level ${idx + 1} →</button>
        <button class="btn" onclick="renderTrack('speak')">See all levels</button>
        <button class="btn" onclick="renderHome()">Home</button>
      </div>
    </div>
  `;
  window.scrollTo(0, 0);
}

// ── Likhna: letter tracing ──────────────────────────────────
// Qaida stroke order: the letter body first, in one flowing
// right-to-left stroke, then dots and marks. Scoring = start at
// the right place + cover the guide + no wild scribbling.

const TRACE_BOX = 200;
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
        <span class="rp-desc">Draw the letters yourself — body first, dots after, the way the qaida teaches. ${TRACE_LETTERS.length} letters, finger or mouse.</span>
        <span class="rp-best">${done ? `${done}/${TRACE_LETTERS.length} letters mastered · keep going` : "▶ Start tracing"}</span>
      </button>
    </div>`;
}

function renderTracing() {
  const p = profile();
  const t = p.tracing || {};
  app().innerHTML = `
    ${backBar("✍️ Likhna · Letter Tracing", "renderTrack('reading')")}
    <p class="lesson-intro">Write each letter the way the qaida teaches: the body first, in one flowing stroke — Urdu moves <b>right to left</b> — then its dots and marks. Trace with a finger or a mouse.</p>
    <div class="tw-grid">
      ${TRACE_LETTERS.map((L, i) => `
        <button class="tw-pick" onclick="startTracing(${i})">
          <span class="ur">${L.ch}</span>
          <b>${esc(L.name)}</b>
          <span class="tw-best">${t[L.name] != null ? `${t[L.name] >= TRACE_PASS ? "✅ " : ""}${t[L.name]}%` : "trace it"}</span>
        </button>`).join("")}
    </div>`;
  window.scrollTo(0, 0);
}

let tw = null;

function startTracing(i) {
  const L = TRACE_LETTERS[i];
  tw = { i, letter: L, step: 0, pts: [], scores: [], msg: "", finalPct: null };
  renderTraceLetter();
  Speech.speak(L.ch, L.name);
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
  return `<svg viewBox="0 0 ${TRACE_BOX} ${TRACE_BOX}" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <line x1="14" y1="145" x2="186" y2="145" stroke="#eee1c2" stroke-width="1.5" stroke-dasharray="4 5"/>
    ${parts.join("")}</svg>`;
}

function renderTraceLetter() {
  const L = tw.letter;
  const total = L.strokes.length;
  const doneAll = tw.step >= total;
  const cur = L.strokes[tw.step];
  app().innerHTML = `
    ${backBar(`✍️ Likhna · ${esc(L.name)}`, "renderTracing()")}
    <div class="tw-head">
      <span class="tw-glyph ur">${L.ch}</span>
      <div>
        <b>${esc(L.name)}</b>
        <p class="hint">${esc(L.hint)}</p>
        <button class="btn small speak" onclick='Speech.speak(${JSON.stringify(L.ch)}, ${JSON.stringify(L.name)})'>🔊 Hear its name</button>
      </div>
    </div>
    ${doneAll ? twResultHTML() : `
    <p class="tw-status">${cur.p ? "Start at the green dot ● and follow the dashes" : "Now draw the dot at the green target ●"} · step ${tw.step + 1} of ${total}</p>
    <div class="tw-board"><div class="tw-svg">${twGuideSVG()}</div><canvas id="tw-canvas" width="480" height="480"></canvas></div>
    <div id="tw-feedback">${tw.msg}</div>
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
    return [((e.clientX - r.left) / r.width) * TRACE_BOX, ((e.clientY - r.top) / r.height) * TRACE_BOX];
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
  const k = cv.width / TRACE_BOX;
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
      tw.msg = `<div class="pr good">✅ Dot — nuqta done!</div>`;
    } else {
      tw.msg = `<div class="pr bad">Draw the dot right on the green target ●.</div>`;
    }
  } else {
    const r = traceScore(st.p, tw.pts);
    if (!r.startOK) {
      tw.msg = `<div class="pr warn">Start at the green dot ● — Urdu strokes flow right to left.</div>`;
    } else if (!r.tidy) {
      tw.msg = `<div class="pr warn">Trace just the dashed stroke — one smooth pass, no scribbling.</div>`;
    } else if (r.pct >= TRACE_PASS) {
      tw.scores.push(r.pct);
      tw.step++;
      tw.msg = `<div class="pr good">✅ ${r.pct}% — shābāsh!</div>`;
    } else {
      tw.msg = `<div class="pr bad">${r.pct}% traced — follow the dashed line all the way to its end.</div>`;
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
      <p>${pct >= 90 ? "Beautiful hand — a true qaida student." : "Every pass makes the hand surer. Trace it again and watch the score climb."}</p>
      <div class="result-actions">
        ${next != null ? `<button class="btn primary big" onclick="startTracing(${next})">Next letter: ${esc(TRACE_LETTERS[next].name)} →</button>` : ""}
        <button class="btn" onclick="startTracing(${tw.i})">Trace it again</button>
        <button class="btn" onclick="renderTracing()">All letters</button>
      </div>
    </div>`;
}

// ── Shared bits ──────────────────────────────────────────────

function backBar(title, backFn = "renderHome()") {
  return `
    <div class="topbar">
      ${backFn ? `<button class="btn back" onclick="${backFn}">← Back</button>` : ""}
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

Cloud.init();
renderHome();
if (isAzadiDay()) launchConfetti();
