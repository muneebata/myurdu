#!/usr/bin/env python3
"""Generate static, indexable lesson pages under learn/ plus sitemap.xml.

Parses data.js (machine-generated, regular format) and emits one SEO page
per level/unit with real audio buttons, cross-links, and a hub page.
Run by tools/deploy.sh on every deploy.
"""
import os, re, html, json

ROOT = os.path.join(os.path.dirname(__file__), "..")
DATA = open(os.path.join(ROOT, "data.js"), encoding="utf-8").read()
OUT = os.path.join(ROOT, "learn")
os.makedirs(OUT, exist_ok=True)
SITE = "https://myurdu.org"

def unesc(s):
    s = re.sub(r"\\u([0-9a-fA-F]{4})", lambda m: chr(int(m.group(1), 16)), s)
    return s.replace('\\"', '"').replace("\\'", "'")

def grab(block, key):
    m = re.search(key + r':\s*\n?\s*"((?:[^"\\]|\\.)*)"', block)
    return unesc(m.group(1)) if m else ""

def slugify(title):
    s = re.sub(r"[^a-z0-9]+", "-", title.lower())
    return re.sub(r"-+", "-", s).strip("-")

def audio_slug(tr):
    s = tr.lower().replace("ṭ", "tt").replace("ḍ", "dd").replace("ṛ", "rr")
    s = s.replace("ṉ", "n").replace("ā", "aa").replace("ī", "ee").replace("ū", "oo")
    s = re.sub(r"[?!.,·'’]", "", s)
    return re.sub(r"[^a-z0-9]+", "-", s).strip("-")

def extract_array(name):
    i = DATA.index(f"const {name} = [")
    j = DATA.index("\n];", i)
    return DATA[i:j]

def split_entries(arr_text, id_prefix):
    parts = re.split(r"\n  \{\n(?=    id: \"" + id_prefix + r")", arr_text)
    return parts[1:]

def parse_items(block):
    items = []
    for m in re.finditer(r'\{ ur: "((?:[^"\\]|\\.)*)", tr: "((?:[^"\\]|\\.)*)", en: "((?:[^"\\]|\\.)*)"(?:, (?:note|spell): "((?:[^"\\]|\\.)*)")?', block):
        items.append({"ur": unesc(m.group(1)), "tr": unesc(m.group(2)),
                      "en": unesc(m.group(3)), "note": unesc(m.group(4) or "")})
    return items

def parse_facts(block):
    facts = []
    for fm in re.finditer(r"facts: \[(.*?)\n\s*\]", block, re.S):
        facts += [unesc(x) for x in re.findall(r'"((?:[^"\\]|\\.)*)"', fm.group(1))]
    for fm in re.finditer(r"funFacts: \[(.*?)\n\s*\]", block, re.S):
        facts += [unesc(x) for x in re.findall(r'"((?:[^"\\]|\\.)*)"', fm.group(1))]
    return facts

# ── collect lessons ──
lessons = []
for blk in split_entries(extract_array("LEVELS"), "L"):
    n = int(re.search(r'id: "L(\d+)"', blk).group(1))
    lessons.append({
        "kind": f"Level {n}", "order": n,
        "title": grab(blk, "title"), "subtitle": grab(blk, "subtitle"),
        "intro": grab(blk, "intro"), "items": parse_items(blk), "facts": parse_facts(blk),
    })
UNIT_TRACKS = [("READING_UNITS", "R", "Reading unit", 100), ("CULTURE_UNITS", "C", "Heritage unit", 200),
               ("SOUND_UNITS", "S", "Sound School", 300), ("PAKISTAN_UNITS", "P", "Pakistan break", 400)]
for arr, pfx, kindname, base in UNIT_TRACKS:
    for blk in split_entries(extract_array(arr), pfx):
        n = int(re.search(r'id: "' + pfx + r'(\d+)"', blk).group(1))
        lessons.append({
            "kind": f"{kindname} {n}", "order": base + n,
            "title": grab(blk, "title"), "subtitle": grab(blk, "subtitle"),
            "intro": grab(blk, "intro"), "items": parse_items(blk), "facts": parse_facts(blk),
        })
lessons.sort(key=lambda x: x["order"])
for l in lessons:
    l["slug"] = slugify(l["title"])

CSS = """body{margin:0;background:#faf3e1;color:#3b2e1f;font-family:-apple-system,'Segoe UI',Roboto,sans-serif;line-height:1.6}
.wrap{max-width:760px;margin:0 auto;padding:24px 20px 70px}
.strap{height:12px;margin:0 -20px 20px;background:linear-gradient(90deg,#12808b 0 14.3%,#d9a413 14.3% 28.6%,#c26a3a 28.6% 42.9%,#b05464 42.9% 57.2%,#6f8f4e 57.2% 71.5%,#7a5ba6 71.5% 85.8%,#c9b98a 85.8% 100%);border-bottom:2px solid #3b2e1f}
h1{color:#0c5f66;margin:6px 0 2px}.sub{color:#8a7458;margin:0 0 14px}
.ur{font-family:'Noto Nastaliq Urdu',serif;direction:rtl}
.cta{display:inline-block;background:#12808b;color:#fffdf3;font-weight:700;padding:10px 18px;border-radius:12px;text-decoration:none;margin:10px 0}
.phrase{background:#fffdf3;border:1.5px solid #ecdcbb;border-radius:14px;padding:12px 16px;margin:10px 0}
.phrase .u{font-size:1.5rem;line-height:2;color:#0c5f66;display:block}
.phrase b{font-size:1rem}.phrase .n{color:#8a7458;font-size:.85rem;display:block}
.play{float:right;font:inherit;border:1.5px solid #ecdcbb;background:#fffdf3;border-radius:10px;padding:5px 10px;cursor:pointer}
.fact{background:linear-gradient(120deg,#fdf6dd,#fbeec7);border:1.5px solid #ecd28c;border-radius:14px;padding:10px 16px;margin:10px 0;font-size:.95rem}
.crumbs,.nextprev{font-size:.9rem;color:#8a7458}.crumbs a,.nextprev a,.foot a{color:#12808b}
.foot{margin-top:36px;border-top:1.5px solid #ecdcbb;padding-top:14px;font-size:.85rem;color:#8a7458}
ul.hub{list-style:none;padding:0}ul.hub li{margin:7px 0}ul.hub a{color:#0c5f66;font-weight:600;text-decoration:none}ul.hub a:hover{text-decoration:underline}ul.hub span{color:#8a7458;font-weight:400;font-size:.85rem}"""

HEAD = """<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>{title}</title>
<meta name="description" content="{desc}">
<link rel="canonical" href="{canon}">
<meta property="og:title" content="{title}"><meta property="og:description" content="{desc}">
<meta property="og:image" content="https://myurdu.org/social-card.png"><meta property="og:type" content="article">
<link rel="icon" type="image/png" sizes="32x32" href="../favicon-32.png">
<link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Noto+Nastaliq+Urdu:wght@400;700&display=swap" rel="stylesheet">
<style>{css}</style></head><body><div class="strap"></div><div class="wrap">"""

FOOT = """<div class="foot">Urdu Ustaadh is a free Urdu-learning resource — native audio, daily games, the Nastaliq script, and Pakistani culture. A project of Muneeb Ata Enterprises. <a href="https://myurdu.org/">Start learning free →</a></div>
<script>function play(s){new Audio('../audio/'+s+'.mp3').play()}</script>
</div></body></html>"""

e = html.escape
for idx, l in enumerate(lessons):
    prev_l = lessons[idx - 1] if idx > 0 else None
    next_l = lessons[idx + 1] if idx + 1 < len(lessons) else None
    canon = f"{SITE}/learn/{l['slug']}.html"
    page_title = f"{l['title']} — free Urdu lesson | Urdu Ustaadh"
    desc = (l["subtitle"] + ". " + l["intro"])[:158]
    body = [HEAD.format(title=e(page_title), desc=e(desc), canon=canon, css=CSS)]
    ld = {
        "@context": "https://schema.org", "@type": "LearningResource",
        "name": l["title"], "description": desc, "url": canon,
        "inLanguage": "en", "teaches": "Urdu language", "learningResourceType": "Lesson",
        "isAccessibleForFree": True,
        "provider": {"@type": "Organization", "name": "Urdu Ustaadh", "url": "https://myurdu.org"},
    }
    crumbs = {
        "@context": "https://schema.org", "@type": "BreadcrumbList",
        "itemListElement": [
            {"@type": "ListItem", "position": 1, "name": "All lessons", "item": f"{SITE}/learn/"},
            {"@type": "ListItem", "position": 2, "name": l["title"], "item": canon},
        ],
    }
    body.append(f'<script type="application/ld+json">{json.dumps(ld, ensure_ascii=False)}</script>')
    body.append(f'<script type="application/ld+json">{json.dumps(crumbs, ensure_ascii=False)}</script>')
    body.append(f'<p class="crumbs"><a href="index.html">All lessons</a> › {e(l["kind"])}</p>')
    body.append(f'<h1>{e(l["title"])}</h1><p class="sub">{e(l["subtitle"])}</p>')
    body.append(f'<p>{e(l["intro"])}</p>')
    body.append(f'<a class="cta" href="https://myurdu.org/">Practice this lesson free — with audio, quizzes & games →</a>')
    if l["items"]:
        body.append("<h2>The phrases</h2>")
        for it in l["items"]:
            slug = audio_slug(it["tr"])
            body.append(
                f'<div class="phrase"><button class="play" onclick="play(\'{slug}\')">🔊 Listen</button>'
                f'<span class="u ur">{e(it["ur"])}</span><b>{e(it["tr"])}</b> — {e(it["en"])}'
                + (f'<span class="n">{e(it["note"])}</span>' if it["note"] else "") + "</div>")
    if l["facts"]:
        body.append("<h2>Good to know</h2>")
        for f in l["facts"][:6]:
            body.append(f'<div class="fact">✨ {f}</div>')  # facts carry trusted <em>/<strong> markup
    nav = []
    if prev_l: nav.append(f'← <a href="{prev_l["slug"]}.html">{e(prev_l["title"])}</a>')
    if next_l: nav.append(f'<a href="{next_l["slug"]}.html">{e(next_l["title"])}</a> →')
    body.append(f'<p class="nextprev">{" &nbsp;·&nbsp; ".join(nav)}</p>')
    body.append(FOOT)
    open(os.path.join(OUT, l["slug"] + ".html"), "w", encoding="utf-8").write("\n".join(body))

# hub page
hub = [HEAD.format(title="Learn Urdu free — all lessons | Urdu Ustaadh",
                   desc="Every free Urdu lesson on Urdu Ustaadh: 18 speaking levels with native audio, the Nastaliq script from zero, poetry, proverbs, and Pakistan itself.",
                   canon=f"{SITE}/learn/", css=CSS)]
hub.append("<h1>Learn Urdu, free — every lesson</h1>")
hub.append('<p class="sub">Native audio on every phrase. No signup, no ads, free forever.</p>')
hub.append('<a class="cta" href="https://myurdu.org/">Open the full app →</a>')
hub.append("<ul class='hub'>")
for l in lessons:
    hub.append(f'<li><a href="{l["slug"]}.html">{e(l["title"])}</a> <span>· {e(l["kind"])} — {e(l["subtitle"])}</span></li>')
hub.append("</ul>")
hub.append(FOOT.replace("../audio/", "audio/"))
open(os.path.join(OUT, "index.html"), "w", encoding="utf-8").write("\n".join(hub))

# sitemap + robots
urls = [f"{SITE}/", f"{SITE}/learn/"] + [f"{SITE}/learn/{l['slug']}.html" for l in lessons]
sm = ['<?xml version="1.0" encoding="UTF-8"?>', '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">']
sm += [f"  <url><loc>{u}</loc></url>" for u in urls]
sm.append("</urlset>")
open(os.path.join(ROOT, "sitemap.xml"), "w").write("\n".join(sm))
open(os.path.join(ROOT, "robots.txt"), "w").write(f"User-agent: *\nAllow: /\nSitemap: {SITE}/sitemap.xml\n")

print(f"SEO: {len(lessons)} lesson pages + hub + sitemap ({len(urls)} URLs)")
