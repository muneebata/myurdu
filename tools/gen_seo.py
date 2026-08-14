#!/usr/bin/env python3
"""Generate static, indexable lesson pages under learn/ plus sitemap.xml.

Parses data.js (machine-generated, regular format) and emits one SEO page
per level/unit with real audio buttons, cross-links, and a hub page.
Run by tools/deploy.sh on every deploy.
"""
import os, re, html, json, unicodedata

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
    # NFD strips diacritics to base letters (ā→a, ṛ→r); lockstep with
    # slugifyTitle() in app.js.
    t = "".join(c for c in unicodedata.normalize("NFD", title) if not unicodedata.combining(c))
    s = re.sub(r"[^a-z0-9]+", "-", t.lower())
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
    for m in re.finditer(r'\{ ur: "((?:[^"\\]|\\.)*)", tr: "((?:[^"\\]|\\.)*)"(?:, pic: "[^"]*")?(?:, quiz: false)?, en: "((?:[^"\\]|\\.)*)"(?:, (?:note|spell): "((?:[^"\\]|\\.)*)")?', block):
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

_ar = re.search(r"const AUDIO_REFRESH = \{ ([^}]*) \}", DATA)
AUDIO_REFRESH_JSON = "{" + (_ar.group(1) if _ar else "") + "}"

CSS = """html[data-theme=dark] body{background:url("../jali/chishti-dark.svg?v=3"), #0f2429;background-size:72px 124.7px;color:#f0e6cf}
html[data-theme=dark] .phrase,html[data-theme=dark] .gl-row{background:#17333a;border-color:#2c4d55}
html[data-theme=dark] .phrase .u,html[data-theme=dark] h1,html[data-theme=dark] ul.hub a{color:#7fd4dc}
html[data-theme=dark] .fact{background:#1d3a41;border-color:#3a5f66}
html[data-theme=dark] .play,html[data-theme=dark] .printbtn,html[data-theme=dark] .gl-search{background:#17333a;border-color:#2c4d55;color:#f0e6cf}
html[data-theme=dark] .sub,html[data-theme=dark] .crumbs,html[data-theme=dark] .foot,html[data-theme=dark] .nextprev{color:#b8a888}
body{margin:0;background:url("../jali/jahangir-light.svg?v=3") ,#faf3e1;background-size:26px 45px;color:#3b2e1f;font-family:-apple-system,'Segoe UI',Roboto,sans-serif;line-height:1.6}
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
.printbtn{float:right;font:inherit;font-size:.85rem;border:1.5px solid #ecdcbb;background:#fffdf3;border-radius:10px;padding:6px 12px;cursor:pointer}
@page{margin:10mm}
@media print{
 .strap,.cta,.crumbs,.nextprev,.foot,.play,.printbtn,.intro{display:none!important}
 body{background:#fff;color:#000;line-height:1.35}
 .wrap{max-width:100%;padding:0}
 h1{font-size:1.15rem;margin:0}
 .sub{font-size:.8rem;margin:0 0 4px}
 h2{font-size:.85rem;margin:6px 0 2px;border-bottom:1px solid #999;column-span:all}
 .sheet{column-count:2;column-gap:7mm}
 .sheet.dense{column-count:3}
 .phrase{border:none;border-bottom:1px dotted #bbb;border-radius:0;background:#fff;padding:2px 0 3px;margin:0 0 2px;break-inside:avoid}
 .phrase .u{font-size:.98rem;line-height:1.7;color:#000}
 .phrase b{font-size:.8rem}
 .phrase .n{font-size:.66rem;line-height:1.3;color:#444}
 .fact{border:none;background:#fff;border-left:2px solid #999;border-radius:0;padding:2px 6px;margin:2px 0;font-size:.7rem;line-height:1.35;break-inside:avoid}
 .sheet.dense .phrase .u{font-size:.9rem}
}
ul.hub{list-style:none;padding:0}ul.hub li{margin:7px 0}ul.hub a{color:#0c5f66;font-weight:600;text-decoration:none}ul.hub a:hover{text-decoration:underline}ul.hub span{color:#8a7458;font-weight:400;font-size:.85rem}"""

HEAD = """<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>{title}</title>
<script>(function(){{var h=new Date().getHours();document.documentElement.dataset.theme=(h>=19||h<6)?"dark":"light";}})()</script>
<meta name="description" content="{desc}">
<link rel="canonical" href="{canon}">
<meta property="og:title" content="{title}"><meta property="og:description" content="{desc}">
<meta property="og:image" content="https://myurdu.org/social-card.png"><meta property="og:type" content="article">
<link rel="icon" type="image/png" sizes="32x32" href="../favicon-32.png">
<link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Noto+Nastaliq+Urdu:wght@400;700&display=swap" rel="stylesheet">
<style>{css}</style></head><body><div class="strap"></div><div class="wrap">"""

FOOT_T = """<div class="foot">Urdu Ustaadh is a free Urdu-learning resource: native audio, daily games, the Nastaliq script, and Pakistani culture. A project of Muneeb Ata Enterprises. <a href="https://myurdu.org/">Start learning free →</a></div>
<script>var AR=__AUDIO_REFRESH__;function play(s){new Audio('../audio/'+s+'.mp3'+(AR[s]?('?r='+AR[s]):'')).play()}</script>
</div></body></html>"""
FOOT = FOOT_T.replace("__AUDIO_REFRESH__", AUDIO_REFRESH_JSON)


e = html.escape
for idx, l in enumerate(lessons):
    prev_l = lessons[idx - 1] if idx > 0 else None
    next_l = lessons[idx + 1] if idx + 1 < len(lessons) else None
    canon = f"{SITE}/learn/{l['slug']}.html"
    page_title = f"{l['title']} · free Urdu lesson | Urdu Ustaadh"
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
    body.append(f'<button class="printbtn" onclick="window.print()">🖨 Print cheat sheet</button>')
    body.append(f'<h1>{e(l["title"])}</h1><p class="sub">{e(l["subtitle"])}</p>')
    body.append(f'<p class="intro">{e(l["intro"])}</p>')
    body.append(f'<a class="cta" href="https://myurdu.org/">Practice this lesson free, with audio, quizzes & games →</a>')
    dense = " dense" if len(l["items"]) >= 20 else ""
    body.append(f'<div class="sheet{dense}">')
    if l["items"]:
        body.append("<h2>The phrases</h2>")
        for it in l["items"]:
            slug = audio_slug(it["tr"])
            body.append(
                f'<div class="phrase"><button class="play" onclick="play(\'{slug}\')">🔊 Listen</button>'
                f'<span class="u ur">{e(it["ur"])}</span><b>{e(it["tr"])}</b>: {e(it["en"])}'
                + (f'<span class="n">{e(it["note"])}</span>' if it["note"] else "") + "</div>")
    if l["facts"]:
        body.append("<h2>Good to know</h2>")
        for f in l["facts"][:6]:
            body.append(f'<div class="fact">✨ {f}</div>')  # facts carry trusted <em>/<strong> markup
    body.append("</div>")
    nav = []
    if prev_l: nav.append(f'← <a href="{prev_l["slug"]}.html">{e(prev_l["title"])}</a>')
    if next_l: nav.append(f'<a href="{next_l["slug"]}.html">{e(next_l["title"])}</a> →')
    body.append(f'<p class="nextprev">{" &nbsp;·&nbsp; ".join(nav)}</p>')
    body.append(FOOT)
    open(os.path.join(OUT, l["slug"] + ".html"), "w", encoding="utf-8").write("\n".join(body))

# glossary page, every word, with audio and a tiny client-side filter
gl_rows = []
gl_seen = set()
for l in lessons:
    if not l["kind"].startswith("Level"):
        continue
    for it in l["items"]:
        k = it["tr"].lower()
        if k in gl_seen:
            continue
        gl_seen.add(k)
        gl_rows.append((it["tr"], it["en"], it["ur"], l["slug"], l["kind"]))
gl_rows.sort(key=lambda r: r[0].lower())
gp = [HEAD.format(title="Urdu glossary · every word with audio | Urdu Ustaadh",
                  desc=f"A free searchable Urdu glossary: {len(gl_rows)} words and phrases with Nastaliq script, transliteration, meaning, and native audio.",
                  canon=f"{SITE}/learn/lughat.html", css=CSS + """
.gl-row{display:flex;align-items:center;gap:10px;padding:7px 4px;border-bottom:1px solid #ecdcbb;font-size:.95rem}
.gl-row b{white-space:nowrap}.gl-ur{margin-left:auto;font-size:1.2rem;white-space:nowrap}
.gl-search{width:100%;font:inherit;font-size:1.05rem;padding:11px 15px;border:2px solid #ecdcbb;border-radius:14px;margin:8px 0 14px}""")]
gp.append('<p class="crumbs"><a href="index.html">All lessons</a> › Glossary</p>')
gp.append(f"<h1>Lughat · Urdu Glossary</h1><p class='sub'>{len(gl_rows)} words and phrases. Tap 🔊 to hear native audio.</p>")
gp.append('<a class="cta" href="https://myurdu.org/">Practice them all free in the app →</a>')
gp.append('<input class="gl-search" type="search" placeholder="Filter… (e.g. water, pani)" oninput="flt(this.value)">')
gp.append('<div id="gl">')
for tr, en, ur, slug, kind in gl_rows:
    aslug = audio_slug(tr)
    gp.append(f'<div class="gl-row"><button class="play" onclick="play(\'{aslug}\')">🔊</button>'
              f'<span><b>{e(tr)}</b>: {e(en)} <a href="{slug}.html" style="font-size:.8rem">({e(kind)})</a></span>'
              f'<span class="gl-ur ur">{e(ur)}</span></div>')
gp.append("</div>")
gp.append("""<script>function flt(q){q=q.toLowerCase();for(const r of document.querySelectorAll('.gl-row'))r.style.display=r.textContent.toLowerCase().includes(q)?'':'none'}</script>""")
gp.append(FOOT)
open(os.path.join(OUT, "lughat.html"), "w", encoding="utf-8").write("\n".join(gp))

# hub page
hub = [HEAD.format(title="Learn Urdu free, all lessons | Urdu Ustaadh",
                   desc="Every free Urdu lesson on Urdu Ustaadh: 18 speaking levels with native audio, the Nastaliq script from zero, poetry, proverbs, and Pakistan itself.",
                   canon=f"{SITE}/learn/", css=CSS)]
hub.append("<h1>Learn Urdu, free, every lesson</h1>")
hub.append('<p class="sub">Native audio on every phrase. No signup, no ads, free forever.</p>')
hub.append('<a class="cta" href="https://myurdu.org/">Open the full app →</a>')
hub.append('<p><a href="lughat.html"><b>📖 Lughat, the full glossary, every word with audio</b></a></p>')
hub.append("<ul class='hub'>")
for l in lessons:
    hub.append(f'<li><a href="{l["slug"]}.html">{e(l["title"])}</a> <span>· {e(l["kind"])}, {e(l["subtitle"])}</span></li>')
hub.append("</ul>")
hub.append(FOOT.replace("../audio/", "audio/"))
open(os.path.join(OUT, "index.html"), "w", encoding="utf-8").write("\n".join(hub))

# sitemap + robots
urls = [f"{SITE}/", f"{SITE}/learn/", f"{SITE}/learn/lughat.html"] + [f"{SITE}/learn/{l['slug']}.html" for l in lessons]
sm = ['<?xml version="1.0" encoding="UTF-8"?>', '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">']
sm += [f"  <url><loc>{u}</loc></url>" for u in urls]
sm.append("</urlset>")
open(os.path.join(ROOT, "sitemap.xml"), "w").write("\n".join(sm))
open(os.path.join(ROOT, "robots.txt"), "w").write(f"User-agent: *\nAllow: /\nSitemap: {SITE}/sitemap.xml\n")

print(f"SEO: {len(lessons)} lesson pages + hub + sitemap ({len(urls)} URLs)")
