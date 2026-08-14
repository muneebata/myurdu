#!/usr/bin/env node
// Pre-deploy smoke tests: static invariants over data.js, audio coverage,
// role-play graph integrity, and GEO/pakmap id parity. deploy.sh aborts
// if any check fails. Run directly: node tools/smoke.js
"use strict";
const fs = require("fs");
const path = require("path");
const vm = require("vm");

const ROOT = path.join(__dirname, "..");
const fail = [];
const check = (ok, msg) => { if (!ok) fail.push(msg); };

// ── load data.js in a bare sandbox ──
const sandbox = { window: {}, console };
vm.createContext(sandbox);
vm.runInContext(fs.readFileSync(path.join(ROOT, "data.js"), "utf8"), sandbox);
// top-level const bindings stay lexical — read them out with a second script
const {
  LEVELS, READING_UNITS, CULTURE_UNITS, SOUND_UNITS, PAKISTAN_UNITS,
  LOANWORDS, GEO_FEATURES, AZADI_ITEMS, ROLEPLAYS, TRACE_LETTERS, TRACE_WORDS, RANKS, KAHAWATEIN, JUMMAH_KAHAWATEIN, RISHTAY, D5_FACTS,
  KUTUB, QAWAID, AUR_SEEKHIYE, MUHAVARE,
} = vm.runInContext(
  "({ LEVELS, READING_UNITS, CULTURE_UNITS, SOUND_UNITS, PAKISTAN_UNITS, LOANWORDS, GEO_FEATURES, AZADI_ITEMS, ROLEPLAYS, TRACE_LETTERS, TRACE_WORDS, RANKS, KUTUB, KAHAWATEIN, JUMMAH_KAHAWATEIN, RISHTAY, D5_FACTS, QAWAID, AUR_SEEKHIYE, MUHAVARE })",
  sandbox
);

// ── Speech.slug twin — MUST stay in lockstep with speech.js + gen_audio.py ──
function slug(s) {
  s = s.toLowerCase()
    .replace(/ṭ/g, "tt").replace(/ḍ/g, "dd").replace(/ṛ/g, "rr")
    .replace(/ṉ/g, "n").replace(/ā/g, "aa").replace(/ī/g, "ee").replace(/ū/g, "oo")
    .replace(/[?!.,·'’]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
  return s;
}

// ── 1. curriculum shape ──
check(LEVELS.length >= 24, `LEVELS shrank to ${LEVELS.length}`);
for (const lv of LEVELS) {
  check(lv.id && lv.title && lv.intro, `level missing basics: ${lv.id || "?"}`);
  check(Array.isArray(lv.items) && lv.items.length >= 5, `${lv.id}: too few items`);
  for (const it of lv.items) check(it.ur && it.tr && it.en, `${lv.id}: item missing ur/tr/en (${it.tr || it.en || "?"})`);
  check(Array.isArray(lv.funFacts), `${lv.id}: funFacts missing`);
}
for (const [name, arr] of [["READING_UNITS", READING_UNITS], ["CULTURE_UNITS", CULTURE_UNITS], ["SOUND_UNITS", SOUND_UNITS], ["PAKISTAN_UNITS", PAKISTAN_UNITS]]) {
  for (const u of arr) check(u.id && u.title && Array.isArray(u.sections), `${name}: bad unit ${u.id || "?"}`);
}

// ── 2. ranks match completable count ──
const completables = LEVELS.length + READING_UNITS.length + CULTURE_UNITS.length + SOUND_UNITS.length + PAKISTAN_UNITS.length;
check(RANKS[0].need === 0, "first rank must need 0");
check(RANKS[RANKS.length - 1].need <= completables, `top rank needs ${RANKS[RANKS.length - 1].need} > ${completables} completables`);
check(RANKS[RANKS.length - 1].need >= completables - 4, `top rank ${RANKS[RANKS.length - 1].need} lags far behind ${completables} completables — rescale RANKS`);

// Minimal pairs: both halves must be complete and speakable
for (const u of SOUND_UNITS) for (const sec of u.sections) {
  for (const p of sec.pairs || []) {
    for (const w of [p.a, p.b]) check(w && w.ur && w.tr && w.en, `${u.id} pair half incomplete`);
    check(p.note, `${u.id} pair missing its explanation`);
    check(p.a.tr !== p.b.tr, `${u.id} pair has the same word twice`);
  }
}

// Rishtay tree: every family member is tappable
for (const g of RISHTAY) for (const p of g.people) {
  check(p.ur && p.tr && p.en && p.pic, `rishta entry incomplete: ${p.tr || "?"}`);
  check(["t", "m", "g"].includes(p.side), `rishta side invalid: ${p.tr}`);
}

// Aaj Ka Paanch fact bank: answerable, and never two identical options
for (const f of D5_FACTS) {
  check(f.q && f.a && f.src, `D5 fact incomplete: ${f.q || "?"}`);
  check(Array.isArray(f.wrong) && f.wrong.length === 3, `D5 fact needs 3 distractors: ${f.q}`);
  check(new Set([f.a, ...f.wrong]).size === 4, `D5 fact has a repeated option: ${f.q}`);
  check(f.a.length <= 60, `D5 fact answer too long for a button: ${f.q}`);
}
// Desi Roots: the quiz pool excludes entries whose meaning restates
// the word, and must stay big enough to keep the cycle fresh.
const quizWords = LOANWORDS.filter((w) => w.quiz !== false);
check(quizWords.length >= 60, `Desi Roots quiz pool shrank to ${quizWords.length}`);
for (const w of quizWords) {
  check(w.meaning && !w.meaning.toLowerCase().includes(w.en.toLowerCase()),
    `loanword "${w.en}" gives its own answer away: "${w.meaning}"`);
}

// No two loanwords in one question may share a meaning, or a player
// could rule both out for free.
const meaningCounts = {};
for (const w of quizWords) meaningCounts[w.meaning] = (meaningCounts[w.meaning] || 0) + 1;
const twinned = Object.entries(meaningCounts).filter(([, n]) => n > 1).length;
check(twinned <= 12, `${twinned} meanings are shared by several loanwords; the distractor picker must dedupe`);

// picture pools the daily five draws from
const zoo = (READING_UNITS.find((u) => u.id === "R11") || { sections: [] }).sections.flatMap((s) => s.words || []).filter((w) => w.pic);
const mulk = (READING_UNITS.find((u) => u.id === "R12") || { sections: [] }).sections.flatMap((s) => s.words || []);
check(zoo.length >= 20, `zoo picture pool shrank to ${zoo.length}`);
check(mulk.length >= 20, `country picture pool shrank to ${mulk.length}`);

// ── 3. audio coverage: every speakable tr has a clip ──
const audio = new Set(fs.readdirSync(path.join(ROOT, "audio")).map((f) => f.replace(/\.mp3$/, "")));
const wanted = new Map(); // slug -> example tr
// One slug = one clip file. Two DIFFERENT Urdu words that romanise to the
// same slug would silently share a clip (شیر lion / شعر couplet both slugged
// "sher" once, and the couplet played the lion). want() takes the Urdu too
// and fails the deploy on any cross-word collision.
const urOf = new Map();
const rawTrs = new Set();
const normUr = (s) => String(s)
  .replace(/[\u064B-\u0655\u0670\u0610-\u0615\u200B-\u200F]/g, "")
  .replace(/[يى]/g, "ی").replace(/ك/g, "ک").replace(/ه/g, "ہ").replace(/ة/g, "ہ")
  .replace(/[۔،؛:!?.,\-–—'"“”‘’()\[\]]/g, " ").replace(/\s+/g, " ").trim();
const want = (tr, ur) => {
  if (!tr) return;
  const k = slug(tr);
  if (!k) return;
  if (!wanted.has(k)) wanted.set(k, tr);
  rawTrs.add(tr);
  if (!ur) return;
  const n = normUr(ur);
  // Same utterance deliberately written two ways (numeral-reading practice
  // shows ۱۰۰ روپے; the speech is identical) — clip sharing is correct there.
  const SAME_UTTERANCE_OK = new Set(["sau-rupaye"]);
  if (!SAME_UTTERANCE_OK.has(k) && urOf.has(k) && urOf.get(k) !== n) check(false, `audio slug "${k}" serves two different words: ${urOf.get(k)} ≠ ${n}`);
  else urOf.set(k, n);
};
for (const g of RISHTAY) for (const p of g.people) want(p.tr, p.ur);
for (const u of SOUND_UNITS) for (const s of u.sections) for (const p of s.pairs || []) { want(p.a.tr, p.a.ur); want(p.b.tr, p.b.ur); }
LEVELS.forEach((lv) => lv.items.forEach((it) => want(it.tr, it.ur)));
AZADI_ITEMS.forEach((it) => want(it.tr, it.ur));
GEO_FEATURES.forEach((f) => want(f.tr, f.ur));
KAHAWATEIN.forEach((k) => want(k.tr, k.ur));
JUMMAH_KAHAWATEIN.forEach((k) => want(k.tr, k.ur));
LOANWORDS.forEach((w) => want(w.tr, w.ur));
// `speak: false` entries are heard on a linked human recording instead of
// through the app, so their lines need no clip. Keep this in step with
// listen_only_blocks() in tools/gen_audio.py.
(KUTUB || []).filter((w) => w.speak !== false).forEach((w) => w.lines.forEach((l) => want(l.tr, l.ur)));
ROLEPLAYS.forEach((sc) => sc.turns.forEach((t) => {
  if (t.tr) want(t.tr, t.ur);
  (t.choice || []).forEach((o) => want(o.tr, o.ur));
}));
for (const arr of [READING_UNITS, CULTURE_UNITS, SOUND_UNITS, PAKISTAN_UNITS]) {
  arr.forEach((u) => u.sections.forEach((sec) => {
    (sec.words || []).forEach((w) => want(w.tr, w.ur));
    (sec.joiner || []).forEach((w) => want(w.tr, w.ur));
    (sec.verse || []).forEach((w) => want(w.tr, w.ur));
  }));
}
// Letter names and word boards speak too. These were absent from the
// required set — deleting jeem.mp3 used to pass smoke. No longer.
MUHAVARE.forEach((m) => want(m.tr, m.ur));
TRACE_LETTERS.forEach((L) => want(L.name));
(TRACE_WORDS || []).forEach((w) => want(w.tr, w.ur));
let missingAudio = 0;
for (const [k, tr] of wanted) {
  if (!audio.has(k)) { missingAudio++; if (missingAudio <= 5) fail.push(`missing audio: ${k}.mp3 (for "${tr}") — run tools/gen_audio.py`); }
}
if (missingAudio > 5) fail.push(`…and ${missingAudio - 5} more missing clips`);
// informational: clips on disk that no speakable needs
const orphanClips = [...audio].filter((f) => !wanted.has(f));
if (orphanClips.length) console.log(`note: ${orphanClips.length} unused audio file(s): ${orphanClips.slice(0, 5).join(", ")}${orphanClips.length > 5 ? ", …" : ""}`);

// ── 3c. Qawāid: reference examples must BE curriculum lines ──
// The grammar page resolves examples by exact tr at runtime; a typo'd
// example would silently render as nothing. Exact membership, not slug.
for (const q of QAWAID || []) {
  check(q.id && q.title && q.urName && Array.isArray(q.points) && q.points.length >= 2, `QAWAID ${q.id || "?"}: incomplete card`);
  for (const tr of q.ex) check(rawTrs.has(tr), `QAWAID ${q.id}: example is not a taught line: "${tr}"`);
  for (const dd of q.drills) check(LEVELS.some((lv) => lv.id === dd), `QAWAID ${q.id}: unknown drill ${dd}`);
}

// Muhāvare: quizzed literal-vs-real, so options must never collide
check((MUHAVARE || []).length >= 10, `muhavara bank shrank to ${(MUHAVARE || []).length}`);
for (const m of MUHAVARE || []) check(m.ur && m.tr && m.lit && m.en && m.note, `muhavara incomplete: ${m.tr || "?"}`);
check(new Set(MUHAVARE.map((m) => m.en)).size === MUHAVARE.length, "two muhavare share a real-meaning string — distractors would collide");

// Aur Seekhiye: every outbound door must be complete and https
for (const g of AUR_SEEKHIYE || []) for (const it of g.items) {
  check(it.name && it.note && /^https:\/\//.test(it.url), `Aur Seekhiye entry incomplete or non-https: ${it.name || it.url}`);
}

// ── 4. role-play graph integrity ──
for (const sc of ROLEPLAYS) {
  const n = sc.turns.length;
  // Jumps name a turn's `at` label; raw indices still work for any scene
  // that hasn't been converted. An unresolved label is the whole reason
  // this check exists, so it stays fatal.
  const labels = new Map(sc.turns.map((t, i) => [t.at, i]).filter(([a]) => a));
  const resolve = (nx) => (typeof nx === "string" && nx !== "end" ? labels.get(nx) : nx);
  const validNext = (nx, where) =>
    check(nx === undefined || nx === "end" || Number.isInteger(resolve(nx)) && resolve(nx) >= 0 && resolve(nx) < n,
      `${sc.id}: bad next ${nx} at ${where}`);
  check(labels.size === 0 || labels.size === sc.turns.length, `${sc.id}: some turns have no at label`);
  sc.turns.forEach((t, i) => {
    validNext(t.next, `turn ${i}`);
    check(!!t.choice || (t.ur && t.tr && t.en), `${sc.id}: turn ${i} missing line`);
    (t.choice || []).forEach((o, k) => {
      validNext(o.next, `turn ${i} choice ${k}`);
      check(o.ur && o.tr && o.en && o.fx, `${sc.id}: choice ${i}/${k} missing fields`);
    });
  });
  // every path from 0 must terminate
  const walk = (idx, depth) => {
    if (depth > 100) return false;
    if (idx === "end" || idx === undefined && false) return true;
    const t = sc.turns[idx];
    if (!t) return idx >= n; // ran off the end = finish
    const nexts = t.choice ? t.choice.map((o) => o.next) : [t.next === undefined ? idx + 1 : t.next];
    return nexts.every((nx) => walk(nx === "end" ? n : resolve(nx), depth + 1));
  };
  check(walk(0, 0), `${sc.id}: a dialogue path fails to terminate`);
}

// ── 5. GEO ids exist in pakmap.js ──
const pakmap = fs.readFileSync(path.join(ROOT, "pakmap.js"), "utf8");
for (const f of GEO_FEATURES) check(pakmap.includes(`id="${f.id}"`), `GEO id "${f.id}" missing from pakmap.js`);
for (const f of GEO_FEATURES) check(typeof f.blurb === "string" && f.blurb.length > 20, `GEO "${f.id}" missing blurb`);
for (const f of GEO_FEATURES) check(typeof f.clue === "string" && f.clue.length > 20, `GEO "${f.id}" missing clue (question-side fact)`);

// ── 6. tracing letters well-formed ──
check(TRACE_LETTERS.length === 39, `TRACE_LETTERS = ${TRACE_LETTERS.length}, expected 39`);
for (const L of TRACE_LETTERS) {
  check(L.ch && L.name && Array.isArray(L.strokes) && L.strokes.length >= 1, `tracing: bad ${L.name || "?"}`);
  for (const st of L.strokes) check(!!st.p || (Array.isArray(st.d) && st.d.length === 2), `tracing ${L.name}: bad stroke`);
}

// ── 7. loanword bank sanity ──
const meanings = LOANWORDS.map((w) => w.meaning);
for (const w of LOANWORDS) check(w.en && w.ur && w.tr && w.meaning && w.story, `loanword ${w.en || "?"}: missing fields`);
// root-sharing pairs (pyjamas/pijama, chai/char…) intentionally share a
// meaning string so the distractor filter excludes them — allow those,
// but the pool of distinct meanings must stay deep enough for options.
check(new Set(meanings).size >= 40 && new Set(meanings).size >= LOANWORDS.length - 16,
  "too many duplicate meanings in LOANWORDS — distractors will starve");

// ── 8. the CSP must allow a recording to be played back ──
// Goonj hands the learner a blob: URL. media-src governs the <audio>
// fallback and connect-src governs the fetch() the Web Audio path
// makes, and 'self' does NOT cover blob:. Dropping either one breaks
// "hear your take" silently, on every device, which is exactly how it
// shipped once. mic-check.html carries the same policy on purpose, so
// the diagnostic cannot pass while the app fails.
for (const page of ["index.html", "mic-check.html"]) {
  const html = fs.readFileSync(path.join(ROOT, page), "utf8");
  const csp = (html.match(/http-equiv="Content-Security-Policy" content="([^"]+)"/) || [])[1];
  check(!!csp, `${page}: no CSP meta found`);
  if (!csp) continue;
  for (const dir of ["media-src", "connect-src"]) {
    const rule = (csp.match(new RegExp(dir + "[^;]*")) || [""])[0];
    check(/\bblob:/.test(rule), `${page}: ${dir} must include blob: or recorded playback breaks (${rule || "missing"})`);
  }
}

// ── 9. script + romanisation hygiene ──
// Arabic-preferred letterforms (ي ك ة ى ه) render wrongly in Nastaliq —
// the classic paste-from-Arabic defect. The one place they are CORRECT is
// K16's Quranic quotation, which is allowlisted by its unique phrase.
const rawSrc = fs.readFileSync(path.join(ROOT, "data.js"), "utf8");
for (const m of rawSrc.matchAll(/ur:\s*"([^"]+)"/g)) {
  const u = m[1];
  if (u.includes("رَفَعْنَا")) continue; // Quranic — Arabic forms are the correct ones
  const bad = u.match(/[يكةىه]/);
  check(!bad, `Arabic letterform "${bad && bad[0]}" (use its Urdu twin) in: ${u.slice(0, 40)}`);
}
// The romanisation charset is FROZEN (inventory 2026-08-13); the scheme is
// docs/romanization.md. A character outside this set is drift, not style —
// add it to the doc first if it is a conscious scheme decision.
const TR_CHARSET = /^[A-Za-z0-9 āĀīĪūṉṭṬḍṛġṣʿʼ'\-?,!:.]+$/;
for (const m of rawSrc.matchAll(/tr:\s*"([^"]+)"/g)) {
  check(TR_CHARSET.test(m[1]), `tr outside the romanisation charset (see docs/romanization.md): "${m[1]}"`);
}

// ── verdict ──
if (fail.length) {
  console.error(`SMOKE FAIL (${fail.length}):`);
  fail.forEach((m) => console.error("  ✗ " + m));
  process.exit(1);
}
console.log(`smoke OK — ${completables} completables, ${wanted.size} clips required & present, ${ROLEPLAYS.length} scenes, ${GEO_FEATURES.length} map features`);
