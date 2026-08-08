#!/usr/bin/env python3
"""Generate neural-Urdu audio clips for every speakable item in data.js.

Mirrors Speech.slug() in speech.js exactly: filenames must match what the
app requests at runtime.
"""
import asyncio, re, sys
from pathlib import Path

import edge_tts

VOICE = "ur-PK-UzmaNeural"
RATE = "-10%"
PROJECT = Path("/Users/muneebata/Desktop/urdu-ustaadh")
OUT = PROJECT / "audio"

# Per-slug overrides for clips the Urdu voice cannot pronounce.
# jeem: ur voices read جیم as the English loanword "gym" → "jim"; the Hindi
# voice reading Devanagari जीम forces the long ee (user ear-verified 2026-08-08).
# All letter names use the Hindi voice reading Devanagari — vowel length is
# orthographically explicit there, so /ɑː/ vs /ə/ and /eː/ vs /iː/ cannot be
# misread. Names follow the canonical table (Wikipedia "Urdu alphabet" IPA):
# alif = /ʔɑːlɪf/ (AA-lif), tē = /teː/ (tay), s̱ē = /seː/ (say), etc.
V = "hi-IN-SwaraNeural"
CLIP_OVERRIDES = {
    "alif": (V, "आलिफ़"), "be": (V, "बे"), "pe": (V, "पे"), "te": (V, "ते"),
    "tte": (V, "टे"), "se": (V, "से"), "jeem": (V, "जीम"), "che": (V, "चे"),
    "barree-he": (V, "बड़ी हे"), "khe": (V, "ख़े"),
    "daal": (V, "दाल"), "ddaal": (V, "डाल"), "zaal": (V, "ज़ाल"),
    "re": (V, "रे"), "rre": (V, "ड़े"), "ze": (V, "ज़े"), "zhe": (V, "झ़े"),
    "seen": (V, "सीन"), "sheen": (V, "शीन"),
    "swaad": (V, "स्वाद"), "zwaad": (V, "ज़्वाद"),
    "toe": (V, "तोए"), "zoe": (V, "ज़ोए"),
    "ain": (V, "ऐन"), "ghain": (V, "ग़ैन"),
    "fe": (V, "फ़े"), "qaaf": (V, "क़ाफ़"), "kaaf": (V, "काफ़"), "gaaf": (V, "गाफ़"),
    "laam": (V, "लाम"), "meem": (V, "मीम"), "noon": (V, "नून"),
    "noon-ghunna": (V, "नून ग़ुन्ना"), "waao": (V, "वाओ"),
    "gol-he": (V, "गोल हे"), "do-chashmee-he": (V, "दो चश्मी हे"),
    "hamza": (V, "हमज़ा"), "chottee-ye": (V, "छोटी ये"), "barree-ye": (V, "बड़ी ये"),
    # Sound School words the ur voice blurred (user ear-flagged 2026-08-08)
    "chaar": (V, "चार"), "aatth": (V, "आठ"), "teen": (V, "तीन"),
    # Numbers: same vowel-length risk class as tīn/chār — canonical Devanagari
    "ek": (V, "एक"), "do": (V, "दो"), "paanch": (V, "पाँच"), "chhe": (V, "छे"),
    "saat": (V, "सात"), "nau": (V, "नौ"), "das": (V, "दस"),
    "gyaarah": (V, "ग्यारह"), "baarah": (V, "बारह"), "pandrah": (V, "पंद्रह"),
    "bees": (V, "बीस"), "tees": (V, "तीस"), "chaalees": (V, "चालीस"),
    "pachaas": (V, "पचास"), "sau": (V, "सौ"),
    "dderrh": (V, "डेढ़"), "saarrhe": (V, "साढ़े"),
}

# Diacritized so the neural voice reads the letter NAMES cleanly
# (bare "جیم" was getting mangled; جِیم forces jīm, etc.)
LETTER_NAMES_UR = {
    "alif": "اَلِف", "be": "بے", "pe": "پے", "te": "تے", "ṭe": "ٹے", "se": "ثے",
    "jīm": "جِیم", "che": "چے", "baṛī he": "بَڑی حے", "khe": "خے",
    "wā'o": "واؤ", "choṭī ye": "چھوٹی یے", "baṛī ye": "بَڑی یے",
    "nūn ghunna": "نُونِ غُنَّہ", "do-chashmī he": "دو چَشمی ہے", "hamza": "ہَمزَہ",
    "dāl": "دال", "ḍāl": "ڈال", "zāl": "ذال", "re": "رے", "ṛe": "ڑے",
    "ze": "زے", "zhe": "ژے", "sīn": "سِین", "shīn": "شِین",
    "swād": "صواد", "zwād": "ضواد", "to'e": "طوئے", "zo'e": "ظوئے",
    "ain": "عَین", "ghain": "غَین", "fe": "فے", "qāf": "قاف",
    "kāf": "کاف", "gāf": "گاف", "lām": "لام", "mīm": "مِیم",
    "nūn": "نُون", "gol he": "گول ہے",
}

def slug(s: str) -> str:
    s = s.lower().replace("ṭ", "tt").replace("ḍ", "dd").replace("ṛ", "rr")
    s = (s.replace("ṉ", "n").replace("ā", "aa").replace("ī", "ee")
          .replace("ū", "oo"))
    s = re.sub(r"[?!.,·'’]", "", s)
    s = re.sub(r"[^a-z0-9]+", "-", s)
    return s.strip("-")

def collect():
    src = (PROJECT / "data.js").read_text()
    jobs = {}  # slug -> urdu text to synthesize
    # phrases, words, verse lines, loanwords: { ur: "...", tr: "..." }
    for ur, tr in re.findall(r'ur:\s*"([^"]+)",\s*tr:\s*"([^"]+)"', src):
        jobs.setdefault(slug(tr), ur)
    # letters: { ch: "...", name: "..." } — app speaks slug(name)
    for ch, name in re.findall(r'ch:\s*"([^"]+)",\s*name:\s*"([^"]+)"', src):
        text = LETTER_NAMES_UR.get(name)
        if text is None:
            print(f"  !! no Urdu name mapping for letter {name!r}", file=sys.stderr)
            continue
        jobs.setdefault(slug(name), text)
    return jobs

async def synth(sem, key, text):
    dest = OUT / f"{key}.mp3"
    if dest.exists() and dest.stat().st_size > 800:
        return "skip"
    async with sem:
        for attempt in range(3):
            try:
                o_voice, o_text = CLIP_OVERRIDES.get(key, (VOICE, text))
                await edge_tts.Communicate(o_text, o_voice, rate=RATE).save(str(dest))
                if dest.stat().st_size > 800:
                    return "ok"
            except Exception as e:
                if attempt == 2:
                    print(f"  FAIL {key}: {e}", file=sys.stderr)
                    return "fail"
                await asyncio.sleep(1.5 * (attempt + 1))
    return "fail"

async def main():
    OUT.mkdir(exist_ok=True)
    jobs = collect()
    print(f"{len(jobs)} unique clips to generate")
    sem = asyncio.Semaphore(4)
    results = await asyncio.gather(*(synth(sem, k, t) for k, t in jobs.items()))
    print("ok:", results.count("ok"), "skipped:", results.count("skip"), "failed:", results.count("fail"))

asyncio.run(main())
