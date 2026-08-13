# The romanisation scheme (`tr` fields)

The `tr` line is the primary reading layer for learners who cannot read
the script yet, so one word must be spelled ONE way everywhere on the
site. Before writing a new `tr`, grep data.js for the word — if it
exists, reuse its spelling exactly. The character set below is frozen
and enforced by tools/smoke.js; a character not listed here fails the
deploy. That is deliberate: a new mark must be a scheme decision made in
this file first, not drift.

## Vowels
- Long: **ā ī ū** (کا، بی، سو). Short a/i/u are unmarked.
- **e** and **o** are plain (no macron): mez, roṭī → o in roṭī? no — roṭī
  is ṭ+ī; "o" as in do, ho, roz.
- Nasalisation: **ṉ** (ں): haiṉ, māṉ, sāṉs. It is part of the vowel,
  never a consonant.

## Consonants
- Retroflex: **ṭ ḍ ṛ** (ٹ ڈ ڑ).
- Aspirates are digraphs: kh gh th ph bh jh dh ṭh ḍh ṛh chh.
- **ch** = چ, **sh** = ش, **zh** = ژ, **q** = ق, **gh** = غ, **kh** = خ.

## Deliberately collapsed classes
The display scheme collapses letters that sound identical in Urdu.
This is fine to READ but ambiguous to SYNTHESISE — the audio pipeline
must disambiguate via CLIP_OVERRIDES when a collapsed spelling misleads
the voice (the خ/کھ "kh" class caused the Shikwa transliteration to be
abandoned; see gen_audio.py):
- **kh** = خ AND کھ · **z** = ز ذ ض ظ · **s** = س ص ث · **t** = ت ط · **h** = ہ ح
- **ṣ** appears only where the ص itself is the point (Miṣr, the Arabic
  name of Egypt). It is still pronounced s; the mark preserves the
  source letter, not a different sound.

## Special marks
- **ʿ** = ع, used only when a lexical clash needs it (sheʿr the couplet
  vs sher the lion). Otherwise ain is unmarked.
- **ʼ** = hamza break (taʼalluq, qāʼim). One legacy **'** exists
  (mas'alah) and is accepted; do not add new ones.
- **ġ** = غ in classical transliteration only (dāġhdār); everyday words
  use gh.

## Structure
- Izāfat: **-e-** attached on both sides — kishwar-e-hasīn, nishān-e-azm.
- Conjunction: **-o-** — sitāra-o-hilāl.
- Compound futures split: **mileṉ ge**, jāeṉ ge (not mileṉge).
- Postpositions split: ke pās, se pehle.
- Capitals: proper nouns and Allāh only.

## The audio filename rule
Clip filenames are `slug(tr)`, and slug() folds ṉ→n, ā→aa etc. Two
DIFFERENT words whose trs slug identically would share one clip — smoke
fails the deploy on this (the شیر/شعر lesson). If a new word collides,
disambiguate its tr (that is why sheʿr carries the ʿ).
