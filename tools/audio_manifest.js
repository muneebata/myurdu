#!/usr/bin/env node
// Builds audio-manifest.json: every clip the app can play, with a short
// content hash of the file. The admin listen queue diffs these hashes
// against a locally-stored "heard" baseline, so every NEW or REGENERATED
// clip surfaces for a human ear instead of shipping unheard.
//
// The walk MUST stay in step with tools/smoke.js section 3 (same sets,
// same speak:false exclusion). Runs on every deploy via deploy.sh.
"use strict";
const fs = require("fs");
const path = require("path");
const vm = require("vm");
const crypto = require("crypto");

const ROOT = path.join(__dirname, "..");
const sandbox = { window: {}, console };
vm.createContext(sandbox);
vm.runInContext(fs.readFileSync(path.join(ROOT, "data.js"), "utf8"), sandbox);
const T = vm.runInContext(
  "({ LEVELS, READING_UNITS, CULTURE_UNITS, SOUND_UNITS, PAKISTAN_UNITS, LOANWORDS, GEO_FEATURES, AZADI_ITEMS, ROLEPLAYS, TRACE_LETTERS, TRACE_WORDS, KUTUB, KAHAWATEIN, JUMMAH_KAHAWATEIN, RISHTAY, AUDIO_REFRESH })",
  sandbox
);

// Speech.slug twin — MUST stay in lockstep with speech.js / smoke.js / gen_audio.py
function slug(s) {
  s = s.toLowerCase()
    .replace(/ṭ/g, "tt").replace(/ḍ/g, "dd").replace(/ṛ/g, "rr")
    .replace(/ṉ/g, "n").replace(/ā/g, "aa").replace(/ī/g, "ee").replace(/ū/g, "oo")
    .replace(/[?!.,·'’]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
  return s;
}

const clips = {};
const want = (tr, ur) => {
  if (!tr) return;
  const k = slug(tr);
  if (k && !clips[k]) clips[k] = { tr, ur: ur || "" };
};
for (const g of T.RISHTAY) for (const p of g.people) want(p.tr, p.ur);
for (const u of T.SOUND_UNITS) for (const s of u.sections) for (const p of s.pairs || []) { want(p.a.tr, p.a.ur); want(p.b.tr, p.b.ur); }
T.LEVELS.forEach((lv) => lv.items.forEach((it) => want(it.tr, it.ur)));
T.AZADI_ITEMS.forEach((it) => want(it.tr, it.ur));
T.GEO_FEATURES.forEach((f) => want(f.tr, f.ur));
T.KAHAWATEIN.forEach((k) => want(k.tr, k.ur));
T.JUMMAH_KAHAWATEIN.forEach((k) => want(k.tr, k.ur));
T.LOANWORDS.forEach((w) => want(w.tr, w.ur));
(T.KUTUB || []).filter((w) => w.speak !== false).forEach((w) => w.lines.forEach((l) => want(l.tr, l.ur)));
T.ROLEPLAYS.forEach((sc) => sc.turns.forEach((t) => {
  if (t.tr) want(t.tr, t.ur);
  (t.choice || []).forEach((o) => want(o.tr, o.ur));
}));
for (const arr of [T.READING_UNITS, T.CULTURE_UNITS, T.SOUND_UNITS, T.PAKISTAN_UNITS]) {
  arr.forEach((u) => u.sections.forEach((sec) => {
    (sec.words || []).forEach((w) => want(w.tr, w.ur));
    (sec.joiner || []).forEach((w) => want(w.tr, w.ur));
    (sec.verse || []).forEach((w) => want(w.tr, w.ur));
  }));
}
T.TRACE_LETTERS.forEach((L) => want(L.name, L.ch));
(T.TRACE_WORDS || []).forEach((w) => want(w.tr, w.ur));

let missing = 0;
const out = {};
for (const k of Object.keys(clips).sort()) {
  const f = path.join(ROOT, "audio", k + ".mp3");
  if (!fs.existsSync(f)) { missing++; continue; } // smoke gates this properly
  out[k] = {
    h: crypto.createHash("md5").update(fs.readFileSync(f)).digest("hex").slice(0, 8),
    tr: clips[k].tr,
    ur: clips[k].ur,
  };
  const r = (T.AUDIO_REFRESH || {})[k];
  if (r) out[k].r = r;
}
fs.writeFileSync(path.join(ROOT, "audio-manifest.json"), JSON.stringify({ clips: out }));
console.log(`audio-manifest.json: ${Object.keys(out).length} clips${missing ? ` (${missing} missing files skipped)` : ""}`);
