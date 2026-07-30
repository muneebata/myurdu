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
  Cloud.onChange = () => {
  if (document.querySelector(".roster")) renderProfiles();
  else if (document.querySelector(".hero")) renderHome();
};
Cloud.init();
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
      ${cloudCard()}
    </div>
  `;
}

function cloudCard() {
  if (!Cloud.enabled())
    return `<p class="hint">Progress lives in this browser.</p>`;
  if (Cloud.status === "in")
    return `
      <div class="cloud-card">
        <p class="cloud-line">☁️ Syncing as <strong>${esc(Cloud.user.email)}</strong> — every learner on this device is backed up.</p>
        <button class="btn small" onclick="cloudSignOut()">Sign out</button>
      </div>`;
  return `
    <div class="cloud-card">
      <p class="cloud-line"><strong>☁️ Cloud sync</strong> — back up this device's learners and continue on any other device.</p>
      <div class="cloud-form">
        <input id="cloud-email" class="input" type="email" placeholder="Email" autocomplete="email" />
        <input id="cloud-pass" class="input" type="password" placeholder="Password (8+ characters)" autocomplete="current-password"
               onkeydown="if(event.key==='Enter')cloudAuth(false)" />
      </div>
      <div class="cloud-actions">
        <button class="btn primary" onclick="cloudAuth(false)">Sign in</button>
        <button class="btn" onclick="cloudAuth(true)">Create account</button>
      </div>
      <p class="hint"><button class="linklike" onclick="cloudForgot()">Forgot password?</button></p>
      <div id="cloud-status"></div>
    </div>`;
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
    renderProfiles();
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

function cloudSignOut() {
  Cloud.signOut();
  renderProfiles();
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

// ── Home ─────────────────────────────────────────────────────

function renderHome() {
  if (!root.active) return renderProfiles();
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
      ${due > 0 ? `<button class="review-banner" onclick="startCallback()">📚 ${due} word${due === 1 ? "" : "s"} due for review — two minutes, let's go →</button>` : ""}
    </header>

    <section>
      <h2 class="track-title retro">🎲 Roz ka Khel · Daily Games <span class="track-sub">short, every day — that's how words stick</span></h2>
      <div class="cards">
        <button class="card drill" onclick="startDaily()">
          <div class="card-num gold">Aaj ka Khel · Today's Game</div>
          <div class="card-title">Desi Roots</div>
          <div class="card-sub">English words that came from Urdu — today's five, same for everyone</div>
          <div class="card-status">${playedToday ? `✅ Done today · best ${p.dailyBest[todayKey()] ?? 0}/${DAILY_QUESTIONS} · replay?` : "▶ Play today's round"}</div>
        </button>
        <button class="card drill" onclick="startGeo()">
          <div class="card-num gold">Naqsha · Map Game</div>
          <div class="card-title">Naqsha Challenge</div>
          <div class="card-sub">A feature lights up on the map of Pakistan — name it. Today's five, same for everyone</div>
          <div class="card-status">${p.dailyBest[todayKey() + "#geo"] != null ? `✅ Done today · best ${p.dailyBest[todayKey() + "#geo"]}/${GEO_QUESTIONS} · replay?` : "▶ Play today's map"}</div>
        </button>
        <button class="card drill" onclick="startSuno()">
          <div class="card-num gold">Suno! · Listen</div>
          <div class="card-title">Suno! Challenge</div>
          <div class="card-sub">Pure ear training: hear the Urdu, pick the meaning — today's five, same for everyone</div>
          <div class="card-status">${p.dailyBest[todayKey() + "#suno"] != null ? `✅ Done today · best ${p.dailyBest[todayKey() + "#suno"]}/${DAILY_QUESTIONS} · replay?` : "▶ Play today's round"}</div>
        </button>
        <button class="card drill" onclick="startCallback()">
          <div class="card-num gold">Yaaddasht · Memory</div>
          <div class="card-title">Callback Round</div>
          <div class="card-sub">Rapid-fire review pulled from everything you've already passed</div>
          <div class="card-status">${due > 0 ? `📚 ${due} due — review now` : "▶ Six quick callbacks"}</div>
        </button>
      </div>
      ${kahawat ? `
      <button class="proverb-card" onclick='Speech.speak(${JSON.stringify(kahawat.ur)}, ${JSON.stringify(kahawat.tr)}, {slow:true})'>
        <span class="proverb-tag">🗣️ Aaj ki Kahawat · Proverb of the day — tap to hear</span>
        <span class="proverb-ur ur">${esc(kahawat.ur)}</span>
        <span class="proverb-en">${esc(kahawat.en)}</span>
      </button>` : ""}
      <div class="cards" hidden>
      </div>
    </section>

    <section>
      <h2 class="track-title retro">👄 Awaazain · Sound School <span class="track-sub">train your mouth for the sounds English doesn't have</span></h2>
      <div class="cards">
        ${SOUND_UNITS.map((u, i) => unitCard(u, i, "SOUND_UNITS", "sounds", "Sounds")).join("")}
      </div>
    </section>

    <section>
      <h2 class="track-title retro">🗣️ Speak &amp; Listen <span class="track-sub">in order is best — they build on each other — but roam freely; quizzes earn your titles</span></h2>
      <div class="cards">
        ${LEVELS.map((lv, i) => levelCard(lv, i)).join("")}
      </div>
    </section>

    <section>
      <h2 class="track-title retro">📖 Learn to Read <span class="track-sub">the Nastaliq script, from zero</span></h2>
      <div class="cards">
        ${READING_UNITS.map((u, i) => unitCard(u, i, "READING_UNITS", "reading", "Unit")).join("")}
      </div>
    </section>

    <section>
      <h2 class="track-title retro">🎵 Virsa · Heritage <span class="track-sub">poems, rhymes, and the songs everyone knows</span></h2>
      <div class="cards">
        ${CULTURE_UNITS.map((u, i) => unitCard(u, i, "CULTURE_UNITS", "culture", "Virsa")).join("")}
      </div>
    </section>

    <section>
      <h2 class="track-title retro">🇵🇰 Thora Break <span class="track-sub">tired of Urdu? Dive into Pakistan itself instead — no vocabulary required, open in any order</span></h2>
      <div class="cards">
        ${PAKISTAN_UNITS.map((u, i) => unitCard(u, i, "PAKISTAN_UNITS", "pakistan", "Break", true)).join("")}
      </div>
    </section>

    <footer class="foot">Progress is saved per learner on this device. · <button class="linklike" onclick="renderProfiles()">Switch learner</button></footer>
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

async function practiceItem(cardId, levelIdx, itemIdx) {
  const item = LEVELS[levelIdx].items[itemIdx];
  const out = $(`#${cardId}-result`);
  if (!Speech.recognitionSupported()) {
    out.innerHTML = `<div class="pr warn">🎤 Speech recognition isn't available in this browser. Self-check instead: hit 🔊 Listen, say it aloud, and compare. (Chrome and Edge support the mic check.)</div>`;
    return;
  }
  out.innerHTML = `<div class="pr listening">🎙️ Listening… say: <em>${esc(item.tr)}</em></div>`;
  try {
    const alts = await Speech.listen();
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
    const msg = {
      "not-allowed": "Microphone access was blocked — allow the mic and try again.",
      "no-speech": "Didn't catch anything — try again, a bit louder.",
      "audio-capture": "No microphone found on this device.",
      network: "Speech service unreachable — check your connection.",
    }[e.message] || "Couldn't listen just now — try again.";
    out.innerHTML = `<div class="pr warn">⚠️ ${esc(msg)}</div>`;
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

function startDaily() {
  const rng = mulberry32(daySeed());
  const words = seededPick(LOANWORDS, DAILY_QUESTIONS, rng);
  const questions = words.map((w) => {
    const distractors = seededPick(LOANWORDS.filter((x) => x !== w), 3, rng);
    return {
      word: w,
      options: seededPick([w, ...distractors], 4, rng).map((x) => ({ label: x.meaning, correct: x === w })),
    };
  });
  daily = { questions, current: 0, correct: 0, results: [] };
  renderDailyQuestion();
}

function renderDailyQuestion() {
  const q = daily.questions[daily.current];
  app().innerHTML = `
    ${backBar("Aaj ka Khel · Desi Roots")}
    <div class="quiz-progress">Word ${daily.current + 1} of ${daily.questions.length} · ${todayKey()}</div>
    <div class="quiz-card">
      <div class="quiz-prompt">
        <p class="daily-lead">English borrowed <strong class="daily-word">“${esc(q.word.en)}”</strong> from Urdu:</p>
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
  const g = game === "geo" ? geo : game === "suno" ? suno : daily;
  if (!g) return;
  const name = game === "geo" ? "Naqsha Challenge 🗺️" : game === "suno" ? "Suno! Challenge 🎧" : "Desi Roots 🌱";
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
  const p = profile();
  const today = todayKey();
  const firstRunToday = updateDailyStreak();
  p.dailyBest[today] = Math.max(p.dailyBest[today] || 0, daily.correct);
  saveRoot();
  app().innerHTML = `
    ${backBar("Aaj ka Khel · results")}
    <div class="result-card pass">
      <div class="result-emoji">🔥</div>
      <h2 class="retro">${daily.correct === daily.questions.length ? "Perfect round!" : "Round complete"}</h2>
      <p class="result-score">${daily.correct} / ${daily.questions.length} — streak: ${p.streak} day${p.streak === 1 ? "" : "s"}</p>
      <p class="share-squares">${daily.results.map((r) => (r ? "🟩" : "🟥")).join("")}</p>
      <p>${firstRunToday ? "Streak updated. Same time tomorrow — a new five will be waiting." : "Already counted today — replays sharpen, streaks stay honest."}</p>
      <div class="result-actions">
        <button class="btn primary big" onclick="shareDaily('roots', this)">📤 Share score</button>
        <button class="btn" onclick="startGeo()">Play the map game →</button>
        <button class="btn" onclick="renderHome()">Home</button>
      </div>
    </div>
  `;
}

// ── Daily game: Naqsha Challenge (map) ───────────────────────

let geo = null;

function startGeo() {
  const rng = mulberry32(daySeed() + 7);
  const picks = seededPick(GEO_FEATURES, GEO_QUESTIONS, rng);
  const questions = picks.map((f) => {
    const sameType = GEO_FEATURES.filter((x) => x.type === f.type && x !== f);
    const distractors = seededPick(sameType, 3, rng);
    return {
      feature: f,
      options: seededPick([f, ...distractors], 4, rng).map((x) => ({ label: x.name, correct: x === f })),
    };
  });
  geo = { questions, current: 0, correct: 0, results: [] };
  renderGeoQuestion();
}

function geoPrompt(type) {
  return { province: "Which province or territory is highlighted?", city: "Which city is the glowing dot?", feature: "Which natural feature is highlighted?" }[type];
}

function renderGeoQuestion() {
  const q = geo.questions[geo.current];
  app().innerHTML = `
    ${backBar("Naqsha Challenge · Map Game")}
    <div class="quiz-progress">Round ${geo.current + 1} of ${geo.questions.length} · ${todayKey()}</div>
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
  const p = profile();
  const key = todayKey() + "#geo";
  const firstRunToday = updateDailyStreak();
  p.dailyBest[key] = Math.max(p.dailyBest[key] || 0, geo.correct);
  saveRoot();
  app().innerHTML = `
    ${backBar("Naqsha Challenge · results")}
    <div class="result-card pass">
      <div class="result-emoji">🗺️</div>
      <h2 class="retro">${geo.correct === geo.questions.length ? "Perfect — a true naqsha-nawis!" : "Map explored"}</h2>
      <p class="result-score">${geo.correct} / ${geo.questions.length} — streak: ${p.streak} day${p.streak === 1 ? "" : "s"}</p>
      <p class="share-squares">${geo.results.map((r) => (r ? "🟩" : "🟥")).join("")}</p>
      <p>${firstRunToday ? "Streak updated. A new map lights up tomorrow." : "Replays welcome — the streak already counted today."}</p>
      <div class="result-actions">
        <button class="btn primary big" onclick="shareDaily('geo', this)">📤 Share score</button>
        <button class="btn" onclick="renderHome()">Home</button>
      </div>
    </div>
  `;
}

// ── Daily game: Suno! (listening) ────────────────────────────

let suno = null;

function startSuno() {
  const rng = mulberry32(daySeed() + 13);
  const pool = LEVELS.flatMap((lv) => lv.items);
  const picks = seededPick(pool, DAILY_QUESTIONS, rng);
  const questions = picks.map((item) => {
    const distractors = seededPick(pool.filter((x) => x.tr !== item.tr && x.en !== item.en), 3, rng);
    return {
      item,
      options: seededPick([item, ...distractors], 4, rng).map((x) => ({ label: x.en, correct: x === item })),
    };
  });
  suno = { questions, current: 0, correct: 0, results: [] };
  renderSunoQuestion();
}

function renderSunoQuestion() {
  const q = suno.questions[suno.current];
  app().innerHTML = `
    ${backBar("Suno! Challenge · Listen")}
    <div class="quiz-progress">Sound ${suno.current + 1} of ${suno.questions.length} · ${todayKey()}</div>
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
  const p = profile();
  const key = todayKey() + "#suno";
  const firstRunToday = updateDailyStreak();
  p.dailyBest[key] = Math.max(p.dailyBest[key] || 0, suno.correct);
  saveRoot();
  app().innerHTML = `
    ${backBar("Suno! Challenge · results")}
    <div class="result-card pass">
      <div class="result-emoji">🎧</div>
      <h2 class="retro">${suno.correct === suno.questions.length ? "Golden ears!" : "Good listening"}</h2>
      <p class="result-score">${suno.correct} / ${suno.questions.length} — streak: ${p.streak} day${p.streak === 1 ? "" : "s"}</p>
      <p class="share-squares">${suno.results.map((r) => (r ? "🟩" : "🟥")).join("")}</p>
      <p>${firstRunToday ? "Streak updated — five new sounds tomorrow." : "Replays sharpen the ear; the streak already counted today."}</p>
      <div class="result-actions">
        <button class="btn primary big" onclick="shareDaily('suno', this)">📤 Share score</button>
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
  ctx.fillText(todayKey() + "  ·  myurdu.org  ·  free Urdu education", 500, 610);
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
renderHome();
