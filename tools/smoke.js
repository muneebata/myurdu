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
  LOANWORDS, GEO_FEATURES, AZADI_ITEMS, ROLEPLAYS, TRACE_LETTERS, RANKS, KAHAWATEIN, JUMMAH_KAHAWATEIN, RISHTAY, D5_FACTS,
  KUTUB,
} = vm.runInContext(
  "({ LEVELS, READING_UNITS, CULTURE_UNITS, SOUND_UNITS, PAKISTAN_UNITS, LOANWORDS, GEO_FEATURES, AZADI_ITEMS, ROLEPLAYS, TRACE_LETTERS, RANKS, KUTUB, KAHAWATEIN, JUMMAH_KAHAWATEIN, RISHTAY, D5_FACTS })",
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
const want = (tr) => { if (tr) { const k = slug(tr); if (k && !wanted.has(k)) wanted.set(k, tr); } };
for (const g of RISHTAY) for (const p of g.people) want(p.tr);
for (const u of SOUND_UNITS) for (const s of u.sections) for (const p of s.pairs || []) { want(p.a.tr); want(p.b.tr); }
LEVELS.forEach((lv) => lv.items.forEach((it) => want(it.tr)));
AZADI_ITEMS.forEach((it) => want(it.tr));
GEO_FEATURES.forEach((f) => want(f.tr));
KAHAWATEIN.forEach((k) => want(k.tr));
JUMMAH_KAHAWATEIN.forEach((k) => want(k.tr));
LOANWORDS.forEach((w) => want(w.tr));
(KUTUB || []).forEach((w) => w.lines.forEach((l) => want(l.tr)));
ROLEPLAYS.forEach((sc) => sc.turns.forEach((t) => {
  if (t.tr) want(t.tr);
  (t.choice || []).forEach((o) => want(o.tr));
}));
for (const arr of [READING_UNITS, CULTURE_UNITS, SOUND_UNITS, PAKISTAN_UNITS]) {
  arr.forEach((u) => u.sections.forEach((sec) => {
    (sec.words || []).forEach((w) => want(w.tr));
    (sec.joiner || []).forEach((w) => want(w.tr));
    (sec.verse || []).forEach((w) => want(w.tr));
  }));
}
let missingAudio = 0;
for (const [k, tr] of wanted) {
  if (!audio.has(k)) { missingAudio++; if (missingAudio <= 5) fail.push(`missing audio: ${k}.mp3 (for "${tr}") — run tools/gen_audio.py`); }
}
if (missingAudio > 5) fail.push(`…and ${missingAudio - 5} more missing clips`);

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

// ── verdict ──
if (fail.length) {
  console.error(`SMOKE FAIL (${fail.length}):`);
  fail.forEach((m) => console.error("  ✗ " + m));
  process.exit(1);
}
console.log(`smoke OK — ${completables} completables, ${wanted.size} clips required & present, ${ROLEPLAYS.length} scenes, ${GEO_FEATURES.length} map features`);
