# Urdu Ustaadh — اردو استاد

Live at **[myurdu.org](https://myurdu.org)** · A web app for learning Urdu: speak it, hear it, read it. Themed after warm 90s PTV nostalgia — the era of *Alpha Bravo Charlie*: retro test-card bars, PTV teal, mustard, and terracotta.

## Features

- **Speak & Listen track** — 5 levels (Greetings → Introductions → Numbers → Family → Food) that build on each other:
  - 🔊 **Listen** / 🐢 **Slow** — unhurried audio for pronunciation. Plays a real recording from `audio/` when one exists; otherwise browser TTS (Urdu voice → Hindi voice reading transliteration → any voice).
  - 🎤 **Say it** — microphone pronunciation check (Web Speech API, Chrome/Edge), scored against the target phrase.
  - 6-question quiz per level; 70%+ unlocks the next.
- **Sound School (Awaazain)** — how to physically make the sounds English lacks: the tapped/rolled R, retroflex ٹ ڈ ڑ, dental ت د, aspiration (ھ), throat sounds (خ غ ق), and nasal ں — each with an animated mouth diagram (side-view SVG showing tongue placement, in `diagrams.js`), tongue-placement instructions, tap-to-hear practice words, and links out to YouTube tutorials and Wikipedia phonetics pages with audio.
- **Learn to Read track** — 4 units on the Nastaliq script: shape-families, positional forms, vowels, then sounding out real words.
- **Virsa (Heritage) track** — poems and rhymes every Urdu speaker knows: Iqbal's *Lab pe aati hai dua*, Ghalib, *Machhli jal ki rani*, plus a listening list (Dil Dil Pakistan, Nusrat, Coke Studio, Faiz). All quoted verse is public-domain.
- **Daily Drills** —
  - *Desi Roots*: a date-seeded daily round of English words borrowed from Urdu (khaki, pyjamas, shampoo…), with etymology stories. Maintains a 🔥 streak.
  - *Callback Round*: retention quiz sampled from everything already passed.
- **Learners & titles** — multiple named profiles on one device, each with its own progress, streak, and title (Talib-e-Ilm → Shagird → … → Ustaadh-e-Azam) earned by completing levels/units.

## Audio: real neural Urdu clips (included)

`audio/` ships with one MP3 per phrase, word, verse line, and letter name — generated with Microsoft's `ur-PK-UzmaNeural` neural voice via the free [edge-tts](https://pypi.org/project/edge-tts/) tool (no account needed). The app plays these natively and only falls back to browser TTS for anything missing.

**Regenerate after editing the curriculum** (only missing clips are created):

```bash
python3 -m venv .ttsenv && .ttsenv/bin/pip install edge-tts
.ttsenv/bin/python tools/gen_audio.py
```

File naming = `Speech.slug()` in [speech.js](speech.js): lowercase transliteration, retroflex letters doubled first (ṭ→tt, ḍ→dd, ṛ→rr), then diacritics simplified (ā→aa, ī→ee, ū→oo, ṉ→n), non-alphanumerics → `-`. E.g. *ṭhīk hūṉ* → `ttheek-hoon.mp3`. The generator in [tools/gen_audio.py](tools/gen_audio.py) mirrors this exactly and maps letter names to their spoken Urdu forms (ṭe → ٹے).

## Accounts / cross-device sync

Profiles are currently per-device (localStorage) — fine for a shared family iPad, no passwords to leak. For real accounts across devices, wire in a free-tier backend (Supabase or Firebase): email login + one `progress` table/document per user, and replace `Store.load/save` with fetch/persist calls. Free tiers cover tens of thousands of users; no server to run.

## Stack

Plain HTML/CSS/JS — no build step, no dependencies. Fonts: Noto Nastaliq Urdu + Baloo 2 (Google Fonts). Deployable as-is to GitHub Pages.

- `index.html` — shell
- `styles.css` — 90s PTV nostalgia theme
- `data.js` — curriculum: levels, sound school, reading units, culture units, loanwords, learner titles
- `speech.js` — clip player, TTS voice selection, speech-recognition scoring
- `app.js` — profiles, navigation, lessons, quizzes, daily games
- `diagrams.js` — animated articulation diagrams for Sound School
- `tools/gen_audio.py` — audio clip generator (edge-tts)
- `audio/` — 103 neural-Urdu MP3 clips

## Run locally

```bash
python3 -m http.server 8642 --directory .
```

Then open http://localhost:8642.

Note for Claude Code preview: the sandboxed preview server can't read `~/Desktop` (macOS privacy protection), so the preview serves an rsync'd mirror in the session scratchpad — re-run the rsync after edits.

## Roadmap

- Levels 6–10: daily routine & verbs · places & directions · time, days, weather · feelings & small talk · a capstone full conversation.
- Virsa 2–4: childhood rhymes deep-dive · Dil Dil Pakistan & pop history (commentary, licensed audio only) · the ghazal, properly.
- Reading 5+: reading full sentences, Urdu numerals (۱۲۳), signboard practice.
- Spaced-repetition scheduling for the Callback Round; cloud accounts via Supabase.
