// ─────────────────────────────────────────────────────────────
// Urdu Ustaadh — app shell, profiles, lessons, quizzes, drills
// ─────────────────────────────────────────────────────────────

const TRACKS = { READING_UNITS: READING_UNITS, CULTURE_UNITS: CULTURE_UNITS, SOUND_UNITS: SOUND_UNITS };

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
}

function addProfile(name) {
  name = name.trim().slice(0, 24);
  if (!name) return;
  if (!root.profiles[name]) root.profiles[name] = blankProfile();
  root.active = name;
  saveRoot();
  renderHome();
}

function switchProfile(name) {
  root.active = name;
  saveRoot();
  renderHome();
}

function deleteProfile(name) {
  if (!confirm(`Remove learner "${name}" and their progress?`)) return;
  delete root.profiles[name];
  if (root.active === name) root.active = Object.keys(root.profiles)[0] || null;
  saveRoot();
  renderProfiles();
}

function renderProfiles() {
  const names = Object.keys(root.profiles);
  app().innerHTML = `
    ${backBar("Learners · Kaun seekh raha hai?", root.active ? "renderHome()" : "renderProfiles()")}
    <div class="roster">
      <h2 class="retro">Who's learning today?</h2>
      <p class="lesson-intro">Each learner gets their own progress, title, and streak — stored on this device.</p>
      ${
        names.length
          ? `<div class="roster-list">${names
              .map(
                (n) => `
        <div class="roster-row ${n === root.active ? "active" : ""}">
          <button class="btn roster-name" onclick="switchProfile('${esc(n).replace(/'/g, "\\'")}')">
            👤 ${esc(n)} <span class="roster-rank">${rankFor(root.profiles[n]).name}</span>
          </button>
          <button class="btn danger small" onclick="deleteProfile('${esc(n).replace(/'/g, "\\'")}')">✕</button>
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
      <p class="hint">Progress lives in this browser. Cross-device accounts need a small (free) backend — see the README for the wiring plan.</p>
    </div>
  `;
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

function levelUnlocked(i) {
  return i === 0 || isCompleted(LEVELS[i - 1].id);
}

function unitUnlocked(units, i) {
  return i === 0 || isCompleted(units[i - 1].id);
}

function overallPercent() {
  const total = LEVELS.length + READING_UNITS.length + CULTURE_UNITS.length + SOUND_UNITS.length;
  return Math.round((completedCount() / total) * 100);
}

// ── Daily-game helpers (date-seeded so everyone gets the same drill) ──

function todayKey() {
  const d = new Date();
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
}

function daySeed() {
  const d = new Date();
  return d.getFullYear() * 10000 + (d.getMonth() + 1) * 100 + d.getDate();
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

// ── Home ─────────────────────────────────────────────────────

function renderHome() {
  if (!root.active) return renderProfiles();
  const p = profile();
  const pct = overallPercent();
  const rank = rankFor(p);
  const notice = Speech.voiceNotice();
  const playedToday = p.lastDaily === todayKey();
  app().innerHTML = `
    <header class="hero">
      <div class="hero-strap"></div>
      <div class="hero-urdu ur">اردو استاد</div>
      <h1 class="retro">Urdu Ustaadh</h1>
      <p class="tagline">Speak it, hear it, read it — thora thora, har roz.</p>
      <div class="id-row">
        <button class="tag profile-tag" onclick="renderProfiles()" title="Switch learner">👤 ${esc(root.active)} ▾</button>
        <span class="tag rank-tag">★ ${rank.name} · <span class="ur-inline">${rank.ur}</span></span>
        <span class="tag streak-tag">🔥 ${p.streak}-day streak</span>
      </div>
      <div class="progress-wrap" title="${pct}% complete">
        <div class="progress-bar"><div class="progress-fill" style="width:${pct}%"></div></div>
        <span class="progress-label">${pct}% complete</span>
      </div>
      <div class="notice" id="voice-notice" ${notice ? "" : "hidden"}>🔈 ${esc(notice || "")}</div>
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
        <button class="card drill" onclick="startCallback()">
          <div class="card-num gold">Yaaddasht · Memory</div>
          <div class="card-title">Callback Round</div>
          <div class="card-sub">Rapid-fire review pulled from everything you've already passed</div>
          <div class="card-status">▶ Six quick callbacks</div>
        </button>
      </div>
    </section>

    <section>
      <h2 class="track-title retro">👄 Awaazain · Sound School <span class="track-sub">train your mouth for the sounds English doesn't have</span></h2>
      <div class="cards">
        ${SOUND_UNITS.map((u, i) => unitCard(u, i, "SOUND_UNITS", "sounds", "Sounds")).join("")}
      </div>
    </section>

    <section>
      <h2 class="track-title retro">🗣️ Speak &amp; Listen <span class="track-sub">levels build on each other — pass one to unlock the next</span></h2>
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
        done ? `✅ Passed${score != null ? ` · ${score}%` : ""}` : unlocked ? "▶ Start" : "🔒 Finish the previous level"
      }</div>
    </button>`;
}

function unitCard(u, i, unitsName, cls, label) {
  const units = TRACKS[unitsName];
  const unlocked = unitUnlocked(units, i);
  const done = isCompleted(u.id);
  return `
    <button class="card ${cls} ${unlocked ? "" : "locked"} ${done ? "done" : ""}"
            ${unlocked ? `onclick="openUnit('${unitsName}',${i})"` : "disabled"}>
      <div class="card-num">${label} ${String(i + 1).padStart(2, "0")}</div>
      <div class="card-title">${esc(u.title)}</div>
      <div class="card-sub">${esc(u.subtitle)}</div>
      <div class="card-status">${done ? "✅ Done" : unlocked ? "▶ Start" : "🔒 Finish the previous unit"}</div>
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
      <p class="hint">Score ${QUIZ_PASS_PERCENT}%+ to unlock the next level.</p>
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
  if (quiz.kind === "callback" && q.item) {
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
            ? `You've unlocked <strong>Level ${nextIdx + 1}: ${esc(LEVELS[nextIdx].title)}</strong>.`
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
  daily = { questions, current: 0, correct: 0 };
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

function finishDaily() {
  const p = profile();
  const today = todayKey();
  const firstRunToday = p.lastDaily !== today;
  if (firstRunToday) {
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    const yKey = `${yesterday.getFullYear()}-${String(yesterday.getMonth() + 1).padStart(2, "0")}-${String(yesterday.getDate()).padStart(2, "0")}`;
    p.streak = p.lastDaily === yKey ? p.streak + 1 : 1;
    p.lastDaily = today;
  }
  p.dailyBest[today] = Math.max(p.dailyBest[today] || 0, daily.correct);
  saveRoot();
  app().innerHTML = `
    ${backBar("Aaj ka Khel · results")}
    <div class="result-card pass">
      <div class="result-emoji">🔥</div>
      <h2 class="retro">${daily.correct === daily.questions.length ? "Perfect round!" : "Round complete"}</h2>
      <p class="result-score">${daily.correct} / ${daily.questions.length} — streak: ${p.streak} day${p.streak === 1 ? "" : "s"}</p>
      <p>${firstRunToday ? "Streak updated. Same time tomorrow — a new five will be waiting." : "Already counted today — replays sharpen, streaks stay honest."}</p>
      <div class="result-actions">
        <button class="btn primary big" onclick="startCallback()">Now try a Callback Round →</button>
        <button class="btn" onclick="renderHome()">Home</button>
      </div>
    </div>
  `;
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

// ── Shared bits ──────────────────────────────────────────────

function backBar(title, backFn = "renderHome()") {
  return `
    <div class="topbar">
      <button class="btn back" onclick="${backFn}">← Back</button>
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

Speech.init();
Speech.onVoiceChange = () => {
  const el = document.getElementById("voice-notice");
  if (!el) return;
  const notice = Speech.voiceNotice();
  el.hidden = !notice;
  el.innerHTML = notice ? `🔈 ${esc(notice)}` : "";
};
renderHome();
