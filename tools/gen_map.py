#!/usr/bin/env python3
"""Generate pakmap.js from Natural Earth 10m admin-1 boundaries (public domain).

Real geometry, lightly simplified for a game board. Cities, K2, the Indus
waypoints, and the Thar are placed from real coordinates via the same
projection.
"""
import json, math

SRC = "/private/tmp/claude-501/-Users-muneebata-Desktop/54d4d988-c913-4d31-a511-36dc06161133/scratchpad/ne_admin1_10m.geojson"
OUT = "/Users/muneebata/Desktop/urdu-ustaadh/pakmap.js"

NAME_TO_ID = {
    "Northern Areas": "gb",
    "K.P.": "kp",
    "F.A.T.A.": "kp",       # merged into KP in 2018
    "Baluchistan": "balochistan",
    "Punjab": "punjab",
    "F.C.T.": "punjab",     # Islamabad Capital Territory — a speck; folded in visually
    "Sind": "sindh",
    "Azad Kashmir": "ajk",
}

d = json.load(open(SRC))
pak = [f for f in d["features"] if f["properties"].get("adm0_a3") == "PAK"]

# ── projection: equirectangular with mid-latitude correction ──
all_pts = []
for f in pak:
    g = f["geometry"]
    polys = g["coordinates"] if g["type"] == "MultiPolygon" else [g["coordinates"]]
    for poly in polys:
        all_pts.extend(poly[0])
lons = [p[0] for p in all_pts]; lats = [p[1] for p in all_pts]
lon0, lon1 = min(lons), max(lons)
lat0, lat1 = min(lats), max(lats)
latm = math.radians((lat0 + lat1) / 2)
W = 430.0
k = W / ((lon1 - lon0) * math.cos(latm))
H = (lat1 - lat0) * k
PAD = 10.0

def proj(lon, lat):
    x = (lon - lon0) * math.cos(latm) * k + PAD
    y = (lat1 - lat) * k + PAD
    return x, y

def simplify(ring, tol=1.6):
    out = []
    for lon, lat in ring:
        x, y = proj(lon, lat)
        if not out or (x - out[-1][0]) ** 2 + (y - out[-1][1]) ** 2 >= tol ** 2:
            out.append((x, y))
    return out

def ring_to_d(ring):
    pts = simplify(ring)
    if len(pts) < 8:
        return ""
    cmds = [f"M{pts[0][0]:.1f},{pts[0][1]:.1f}"]
    cmds += [f"L{x:.1f},{y:.1f}" for x, y in pts[1:]]
    return "".join(cmds) + "Z"

# ── build province paths (merge multi-name units into one id) ──
paths = {}
for f in pak:
    pid = NAME_TO_ID.get(f["properties"].get("name"))
    if not pid:
        continue
    g = f["geometry"]
    polys = g["coordinates"] if g["type"] == "MultiPolygon" else [g["coordinates"]]
    for poly in polys:
        dstr = ring_to_d(poly[0])  # outer ring only
        if dstr:
            paths.setdefault(pid, []).append(dstr)

province_svg = "\n".join(
    f'  <path id="{pid}" class="geo-prov" d="{"".join(ds)}"/>'
    for pid, ds in [
        ("balochistan", paths["balochistan"]),
        ("sindh", paths["sindh"]),
        ("punjab", paths["punjab"]),
        ("kp", paths["kp"]),
        ("gb", paths["gb"]),
        ("ajk", paths["ajk"]),
    ]
)

# ── overlays from real coordinates ──
CITIES = {
    "islamabad": (73.06, 33.69), "peshawar": (71.58, 34.01),
    "lahore": (74.34, 31.55), "multan": (71.47, 30.20),
    "quetta": (66.98, 30.18), "karachi": (67.01, 24.86),
    "gwadar": (62.33, 25.13), "faisalabad": (73.08, 31.42),
    "hyderabad": (68.37, 25.40), "sialkot": (74.53, 32.50),
    "skardu": (75.63, 35.30), "sukkur": (68.87, 27.70),
    "bahawalpur": (71.68, 29.40), "chitral": (71.79, 35.85),
    "gilgit": (74.31, 35.92), "muzaffarabad": (73.47, 34.37),
    "abbottabad": (73.22, 34.15),
}

# historic sites: diamond markers, visually distinct from city dots
SITES = {
    "harappa": (72.87, 30.63), "taxila": (72.80, 33.74),
    "khyberpass": (71.07, 34.08), "rohtas": (73.57, 32.97),
    "derawar": (71.33, 28.77), "khewra": (73.01, 32.65),
    "khunjerab": (75.42, 36.85), "tarbela": (72.70, 34.09),
    "hingol": (65.30, 25.55), "mehrgarh": (67.62, 29.39),
    "makli": (67.90, 24.77), "kartarpur": (74.93, 32.09),
    "takhtibahi": (71.95, 34.32),
    "mohenjodaro": (68.14, 27.32), "shalimar": (74.38, 31.59),
    "faisalmosque": (73.04, 33.73), "katasraj": (72.95, 32.72),
    "ranikot": (67.90, 25.90), "shandur": (72.52, 36.08),
    "ziarat": (67.73, 30.38), "deosai": (75.40, 34.97),
    "hunza": (74.66, 36.32), "swat": (72.36, 34.77),
    "kalash": (71.69, 35.70),
}

LAKES = {
    "saifulmalook": (73.70, 34.88), "attabad": (74.87, 36.31),
}

# neighboring countries (Natural Earth 50m admin-0), drawn pale and
# clipped to the frame so Naqsha can ask about borders
NEIGHBORS_SRC = "/private/tmp/claude-501/-Users-muneebata-Desktop/54d4d988-c913-4d31-a511-36dc06161133/scratchpad/ne_admin0_50m.geojson"
NEIGHBOR_IDS = {"IND": "india", "CHN": "china", "AFG": "afghanistan", "IRN": "iran"}
city_svg = "\n".join(
    f'  <circle id="{cid}" class="geo-city" cx="{proj(*ll)[0]:.1f}" cy="{proj(*ll)[1]:.1f}" r="6"/>'
    for cid, ll in CITIES.items()
)

INDUS_WPTS = [(75.6, 35.3), (74.6, 35.5), (73.6, 35.2), (72.9, 34.9), (72.2, 33.9),
              (71.5, 32.6), (70.9, 31.8), (70.5, 30.5), (70.8, 29.4), (69.7, 28.4),
              (68.9, 27.7), (68.4, 25.4), (68.3, 24.8), (67.9, 24.4), (67.4, 24.0)]
ipts = [proj(*p) for p in INDUS_WPTS]
indus_d = f"M{ipts[0][0]:.1f},{ipts[0][1]:.1f}" + "".join(f"L{x:.1f},{y:.1f}" for x, y in ipts[1:])

lake_svg = "\n".join(
    f'  <circle id="{lid}" class="geo-lake" cx="{proj(*ll)[0]:.1f}" cy="{proj(*ll)[1]:.1f}" r="5"/>'
    for lid, ll in LAKES.items()
)

nd = json.load(open(NEIGHBORS_SRC))
neighbor_paths = []
for f in nd["features"]:
    cid = NEIGHBOR_IDS.get(f["properties"].get("ADM0_A3"))
    if not cid:
        continue
    g = f["geometry"]
    polys = g["coordinates"] if g["type"] == "MultiPolygon" else [g["coordinates"]]
    ds = []
    for poly in polys:
        pts = [proj(lon, lat) for lon, lat in poly[0]]
        xs = [pt[0] for pt in pts]; ys = [pt[1] for pt in pts]
        # skip rings nowhere near the frame
        if max(xs) < -80 or min(xs) > 530 or max(ys) < -80 or min(ys) > 520:
            continue
        kept = []
        for x, y in pts:
            if not kept or (x - kept[-1][0]) ** 2 + (y - kept[-1][1]) ** 2 >= 2.5 ** 2:
                kept.append((x, y))
        if len(kept) < 8:
            continue
        ds.append("M" + "L".join(f"{x:.0f},{y:.0f}" for x, y in kept) + "Z")
    if ds:
        neighbor_paths.append(f'    <path id="{cid}" class="geo-country" d="{"".join(ds)}"/>')
neighbor_svg = "\n".join(neighbor_paths)

site_svg = "\n".join(
    f'  <rect id="{sid}" class="geo-site" x="{proj(*ll)[0]-5:.1f}" y="{proj(*ll)[1]-5:.1f}" width="10" height="10" transform="rotate(45 {proj(*ll)[0]:.1f} {proj(*ll)[1]:.1f})"/>'
    for sid, ll in SITES.items()
)

k2x, k2y = proj(76.51, 35.88)
rkx, rky = proj(74.49, 36.14)
npx, npy = proj(74.59, 35.24)
tmx, tmy = proj(71.84, 36.26)
tx, ty = proj(69.9, 25.6)  # Thar center (Pakistani Tharparkar)

COAST = [(61.7, 25.05), (64.6, 25.0), (66.5, 24.7), (66.98, 24.7), (67.3, 24.55), (67.4, 23.9), (68.2, 23.7), (68.8, 23.9)]
cpts = [proj(lon, lat - 0.12) for lon, lat in COAST]  # nudge just offshore
VH = H + 2 * PAD
sea_d = (f"M{cpts[0][0]:.1f},{VH:.0f} " +
         "".join(f"L{x:.1f},{y:.1f}" for x, y in cpts) +
         f"L{cpts[-1][0]:.1f},{VH:.0f} Z")

svg = f'''// ─────────────────────────────────────────────────────────────
// Map of Pakistan for the Naqsha Challenge daily game.
// Province boundaries: Natural Earth 10m admin-1 (public domain,
// naturalearthdata.com), lightly simplified; cities, K2, Indus
// waypoints, and the Thar placed from real coordinates.
// Regenerate with tools/gen_map.py. Label-free on purpose —
// labels would give the game away. Ids match GEO_FEATURES in
// data.js. F.A.T.A. is drawn as part of KP (merged 2018).
// ─────────────────────────────────────────────────────────────

const PAK_MAP_SVG = `
<svg id="pakmap" viewBox="0 0 {W + 2 * PAD:.0f} {VH:.0f}" role="img" aria-label="Map of Pakistan and its neighbors">
  <defs><clipPath id="pakframe"><rect x="0" y="0" width="{W + 2 * PAD:.0f}" height="{VH:.0f}"/></clipPath></defs>
  <g clip-path="url(#pakframe)">
{neighbor_svg}
  </g>
  <path id="sea" class="geo-sea" d="{sea_d}"/>
{province_svg}
  <ellipse id="thar" class="geo-thar" cx="{tx:.1f}" cy="{ty:.1f}" rx="24" ry="32"/>
  <path id="indus" class="geo-river" d="{indus_d}"/>
  <polygon id="k2" class="geo-peak" points="{k2x:.1f},{k2y - 9:.1f} {k2x + 7:.1f},{k2y + 5:.1f} {k2x - 7:.1f},{k2y + 5:.1f}"/>
  <polygon id="nangaparbat" class="geo-peak" points="{npx:.1f},{npy - 9:.1f} {npx + 7:.1f},{npy + 5:.1f} {npx - 7:.1f},{npy + 5:.1f}"/>
  <polygon id="tirichmir" class="geo-peak" points="{tmx:.1f},{tmy - 9:.1f} {tmx + 7:.1f},{tmy + 5:.1f} {tmx - 7:.1f},{tmy + 5:.1f}"/>
  <polygon id="rakaposhi" class="geo-peak" points="{rkx:.1f},{rky - 9:.1f} {rkx + 7:.1f},{rky + 5:.1f} {rkx - 7:.1f},{rky + 5:.1f}"/>
{site_svg}
{city_svg}
{lake_svg}
</svg>`;
'''
open(OUT, "w").write(svg)
size = len(svg)
print(f"pakmap.js written: {size/1024:.0f} KB, viewBox 0 0 {W+2*PAD:.0f} {VH:.0f}")
for pid, ds in paths.items():
    print(" ", pid, "subpaths:", len(ds), "chars:", sum(len(x) for x in ds))
