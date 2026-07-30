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

LETTER_NAMES_UR = {
    "alif": "الف", "be": "بے", "pe": "پے", "te": "تے", "ṭe": "ٹے", "se": "ثے",
    "jīm": "جیم", "che": "چے", "baṛī he": "بڑی حے", "khe": "خے",
    "wā'o": "واؤ", "choṭī ye": "چھوٹی یے", "baṛī ye": "بڑی یے",
    "nūn ghunna": "نون غنہ", "do-chashmī he": "دو چشمی ہے", "hamza": "ہمزہ",
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
                await edge_tts.Communicate(text, VOICE, rate=RATE).save(str(dest))
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
