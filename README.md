# Urdu Ustaadh — اردو استاد

Live at **[myurdu.org](https://myurdu.org)** · A web app for learning Urdu: speak it, hear it, read it. Themed after warm 90s PTV nostalgia — the era of *Alpha Bravo Charlie*: retro test-card bars, PTV teal, mustard, and terracotta.

## Features

- **Speak & Listen track** — 13 levels that build on each other (Greetings → Introductions → Numbers → Family → Food → Question Words → Essential Verbs → Time & Days → Colors & Likes → the chai-dhaba conversation → Places & Directions → Weather → Feelings & Small Talk), following CEFR A1 / frequency-research priorities:
  - 🔊 **Listen** / 🐢 **Slow** — unhurried audio for pronunciation. Plays a real recording from `audio/` when one exists; otherwise browser TTS (Urdu voice → Hindi voice reading transliteration → any voice).
  - 🎤 **Say it** — microphone pronunciation check (Web Speech API, Chrome/Edge), scored against the target phrase.
  - 6-question quiz per level; 70%+ unlocks the next.
- **Sound School (Awaazain)** — how to physically make the sounds English lacks: the tapped/rolled R, retroflex ٹ ڈ ڑ, dental ت د, aspiration (ھ), throat sounds (خ غ ق), and nasal ں — each with a REAL sagittal vocal-tract diagram (CC0 sagittal sections by phoneticians R. Wright & D. McCloy, University of Washington, via Wikimedia Commons — in `diagrams.js`, with animated articulation markers overlaid), tongue-placement instructions, tap-to-hear practice words, and links out to YouTube tutorials and Wikipedia phonetics pages with audio.
- **Learn to Read track** — 6 units: Nastaliq shape-families, positional forms, vowels, sounding out real words, Urdu numerals (۱۲۳), and real-world signboard reading.
- **Virsa (Heritage) track** — 3 units: Ghazal 101 (radif, qafiya, mushaira etiquette — with Ghalib), poems and rhymes every Urdu speaker knows (Iqbal's *Lab pe aati hai dua*, Ghalib, *Machhli jal ki rani*, a listening list — Dil Dil Pakistan, Nusrat, Coke Studio, Faiz) and classic proverbs (kahawatain). All quoted verse is public-domain.
- **Thora Break track** — "tired of Urdu?" six comprehensive free-roam modules on Pakistan itself: Geography (K2, Hunza, Deosai, the five rivers), Culture (truck art, PTV dramas, festivals, crafts), History (Indus cities → Gandhara → Sufis & Mughals → 1947 → today), Sports (1992, the squash dynasty, Shandur polo), Food (a full regional eating tour + mango season), and Nature & Wildlife (markhor, Indus dolphin, snow leopards) — each smuggling in Urdu words with audio.
- **Spaced review that initiates:** the home screen shows a "N words due for review" banner when Leitner boxes come due (rest intervals 0/1/2/4/8 days by box).
- **Proverb of the day** on the home screen, rotating daily through the kahawatain with audio.
- **Certificates (Sanad):** earn a title, tap 🎓 to render a downloadable truck-art-styled certificate.
- **PWA:** installable (manifest + service worker — network-first HTML so no staleness, cache-first for versioned assets and audio → offline play after first visit).
- **Daily Drills** — all daily games reset at midnight US Central time (America/Chicago), so the whole world plays the same puzzle on the same day:
  - *Desi Roots*: a date-seeded daily round of English words borrowed from Urdu (khaki, pyjamas, shampoo…), with etymology stories. Maintains a 🔥 streak.
  - *Naqsha Challenge*: a real-geometry SVG map of Pakistan (Natural Earth 10m admin boundaries, public domain; cities/K2/Indus placed by true coordinates — regenerate via `tools/gen_map.py`) lights up a province, city, river, or peak — name it. Date-seeded daily five.
  - Both daily games end with a Wordle-style 📤 share card (emoji squares + streak) via the native share sheet or clipboard.
  - *Suno! Challenge*: pure ear training — hear a native clip, pick the meaning. Date-seeded daily five.
  - *Callback Round*: Leitner-style spaced retrieval — every word has a box (0–4); misses reset to box 0 and resurface first, hits climb boxes and rest. Research-backed spacing, no scheduling UI needed.
- **Zero-friction start:** first visit lands directly on the full home screen as guest learner "Mehmaan" — nothing asked. Accounts are optional, offered via a "💾 Save your progress" button (top left) with an explicit promise: email used only for login, no marketing, ever.
- **Learners & titles** — multiple named profiles on one device, each with its own progress, streak, and title (Talib-e-Ilm → Shagird → … → Ustaadh-e-Azam) earned by completing levels/units.

## Audio: real neural Urdu clips (included)

`audio/` ships with one MP3 per phrase, word, verse line, and letter name — generated with Microsoft's `ur-PK-UzmaNeural` neural voice via the free [edge-tts](https://pypi.org/project/edge-tts/) tool (no account needed). The app plays these natively and only falls back to browser TTS for anything missing.

**Regenerate after editing the curriculum** (only missing clips are created):

```bash
python3 -m venv .ttsenv && .ttsenv/bin/pip install edge-tts
.ttsenv/bin/python tools/gen_audio.py
```

File naming = `Speech.slug()` in [speech.js](speech.js): lowercase transliteration, retroflex letters doubled first (ṭ→tt, ḍ→dd, ṛ→rr), then diacritics simplified (ā→aa, ī→ee, ū→oo, ṉ→n), non-alphanumerics → `-`. E.g. *ṭhīk hūṉ* → `ttheek-hoon.mp3`. The generator in [tools/gen_audio.py](tools/gen_audio.py) mirrors this exactly and maps letter names to their spoken Urdu forms (ṭe → ٹے).

## Accounts / cross-device sync (PocketBase on Railway)

The app ships with a complete sync layer ([sync.js](sync.js)) targeting a [PocketBase](https://pocketbase.io) backend. localStorage remains the source of truth (instant, offline-safe); signing in backs up every learner on the device and merges progress across devices — completions union, best scores/streaks win, Leitner review state takes the most recent.

**Enable it:**

1. On Railway: New Project → Deploy a Template → search **PocketBase** → Deploy. Under the service's Settings → Networking, **Generate Domain**. (Attach a volume if the template didn't add one, so data survives redeploys.)
2. Visit `https://<your-domain>/_/` and create the PocketBase admin account (yours only — not an app login).
3. In the admin UI: **Collections → New collection** named `progress` (type Base) with two fields:
   - `user` — Relation → users, single, required. In the field's index options, mark it **unique**.
   - `data` — JSON.
   Then open the collection's **API Rules** and set List, View, Create, and Update to: `user = @request.auth.id` (leave Delete locked/admin-only).
4. Put the service URL in [config.js](config.js): `window.MYURDU_API = "https://<your-domain>";` and deploy.

With `MYURDU_API` empty the cloud UI is hidden and the app runs fully local, exactly as before. Cost: Railway Hobby $5/mo covers this comfortably; the static site stays free on GitHub Pages.

## Enabling extras

- **Analytics:** Cloudflare dashboard → Analytics & Logs → Web Analytics → enable for myurdu.org with automatic setup (zero code; CSP already allows the beacon). Cookieless and private.
- **Password-reset emails:** PocketBase admin → Settings → Mail settings → add SMTP credentials (Brevo/Resend free tiers work), and set the Application URL. The app's "Forgot password?" link is already wired.

## Security posture

- **Frontend:** Content-Security-Policy meta (blocks foreign scripts/connections; API allowlisted), strict referrer policy, all user-controlled strings HTML-escaped, profile actions use index-based handlers (no string interpolation into JS), HTTPS via Cloudflare.
- **Backend (PocketBase):** bcrypt-hashed passwords and token auth out of the box; owner-only API rules (`user = @request.auth.id`) — verified by probe: users cannot list other users, read others' progress, or even confirm records exist; emails hidden (`emailVisibility: false`); progress payload capped at 200 KB by migration (tested: 500 KB rejected, normal saves fine); built-in rate limiting in PocketBase 0.39.
- **Worth doing in the PocketBase admin:** enable automatic backups (Settings → Backups), and consider OTP for the superuser account.

## Stack

Plain HTML/CSS/JS — no build step, no dependencies. Fonts: Noto Nastaliq Urdu + Baloo 2 (Google Fonts). Deployable as-is to GitHub Pages.

- `index.html` — shell
- `styles.css` — 90s PTV nostalgia theme
- `data.js` — curriculum: levels, sound school, reading units, culture units, loanwords, learner titles
- `speech.js` — clip player, TTS voice selection, speech-recognition scoring
- `app.js` — profiles, navigation, lessons, quizzes, daily games
- `diagrams.js` — animated articulation diagrams for Sound School
- `tools/gen_audio.py` — audio clip generator (edge-tts)
- `tools/gen_map.py` — map generator (Natural Earth → SVG)
- `audio/` — 103 neural-Urdu MP3 clips

## Run locally

```bash
python3 -m http.server 8642 --directory .
```

Then open http://localhost:8642.

Note for Claude Code preview: the sandboxed preview server can't read `~/Desktop` (macOS privacy protection), so the preview serves an rsync'd mirror in the session scratchpad — re-run the rsync after edits.

## Roadmap

- Levels 11+: places & directions · weather · past/future tense · feelings & opinions.
- Virsa 3+: childhood rhymes deep-dive · Dil Dil Pakistan & pop history (commentary, licensed audio only) · the ghazal, properly.
- Reading 6+: reading full sentences, signboard practice.
- Cloud accounts via Supabase for cross-device sync.
