// ─────────────────────────────────────────────────────────────
// Sound School diagrams — friendly cutaway illustrations drawn
// for Urdu Ustaadh (they replaced grey anatomical sections that
// read as scary). One warm cartoon head, six tongue positions.
// Articulation placements follow standard phonetics:
//   ر = alveolar tap · ٹڈڑ = retroflex (tip curled back)
//   تد = dental · ھ-series = aspiration · خغق = back-of-tongue
//   ں = nasalization (velum lowered). Head faces RIGHT.
// ─────────────────────────────────────────────────────────────

const DIA = (() => {
  const INK = "#3b2e1f", TEAL = "#12808b", GOLD = "#d9a413";
  const FACE = "#f6e7c8", CAVITY = "#f9dfc0", TONGUE = "#cf7347", TONGUE_EDGE = "#a04f26";

  const head = `
    <path d="M 130,16 C 92,16 58,42 46,80 C 38,108 44,142 62,166 C 70,176 78,184 88,190 L 88,214 L 170,214
             C 170,202 168,194 164,188 C 180,182 194,174 200,164 C 206,160 208,154 206,150
             C 202,148 198,147 195,147 C 197,143 197,139 196,136
             C 199,134 201,131 200,128 C 209,124 216,117 214,111 C 224,106 227,97 220,91
             C 214,86 210,82 208,76 C 204,64 196,52 184,42 C 170,26 152,16 130,16 Z"
          fill="${FACE}" stroke="${INK}" stroke-width="3" stroke-linejoin="round"/>
    <path d="M 130,16 C 92,16 58,42 46,80 C 62,56 90,40 118,40 C 142,38 158,30 167,23 C 155,17 143,15 130,16 Z"
          fill="#6b4a2f"/>
    <path d="M 200,133 C 172,120 148,116 134,122 C 127,140 130,154 142,161 C 164,168 186,160 198,148 C 201,143 201,137 200,133 Z"
          fill="${CAVITY}" stroke="#c8a878" stroke-width="1.5"/>
    <path d="M 198,131 C 180,123 158,119 138,122" fill="none" stroke="#9b6b3f" stroke-width="2" stroke-linecap="round"/>
    <path d="M 190,127 c -2,-3 -6,-3 -8,0" fill="none" stroke="#9b6b3f" stroke-width="2" stroke-linecap="round"/>
    <path d="M 138,114 C 160,106 190,102 212,104" fill="none" stroke="#d8c092" stroke-width="2.5" stroke-dasharray="3 5" stroke-linecap="round"/>
    <path d="M 128,132 C 124,160 128,190 136,212" fill="none" stroke="#c8a878" stroke-width="2"/>
    <path d="M 140,164 C 142,182 148,200 152,212" fill="none" stroke="#c8a878" stroke-width="2"/>
    <rect x="137" y="192" width="10" height="12" rx="4" fill="${FACE}" stroke="#c8a878" stroke-width="2"/>
    <rect x="190" y="128" width="9" height="11" rx="2.5" fill="#fffdf3" stroke="${INK}" stroke-width="2"/>
    <rect x="184" y="150" width="9" height="9" rx="2.5" fill="#fffdf3" stroke="${INK}" stroke-width="2"/>
    <path d="M 174,80 C 180,74 190,74 196,80" fill="none" stroke="${INK}" stroke-width="3" stroke-linecap="round"/>
    <path d="M 172,67 C 180,62 192,62 199,67" fill="none" stroke="${INK}" stroke-width="2.5" stroke-linecap="round"/>
    <path d="M 116,104 C 108,100 104,108 108,116 C 111,122 118,122 120,117" fill="${FACE}" stroke="${INK}" stroke-width="2.5" stroke-linecap="round"/>
    <circle cx="178" cy="114" r="7" fill="#e8a28f" opacity="0.45"/>`;

  const uvula = (lowered) => lowered
    ? `<path d="M 134,120 C 133,126 131,130 129,132" fill="none" stroke="${INK}" stroke-width="2.5" stroke-linecap="round"/>
       <circle cx="129" cy="133" r="2.5" fill="${INK}"/>`
    : `<path d="M 134,121 C 134,125 133,127 132,128" fill="none" stroke="#9b6b3f" stroke-width="2.5" stroke-linecap="round"/>
       <circle cx="132" cy="129" r="2.2" fill="#9b6b3f"/>`;

  const hl = (x, y) => `<circle class="dia-hl" cx="${x}" cy="${y}" r="7" fill="${GOLD}"/>`;
  const tongue = (d) => `<path d="${d}" fill="${TONGUE}" stroke="${TONGUE_EDGE}" stroke-width="2.5" stroke-linejoin="round"/>`;
  const note = (x, y, t) => `<text x="${x}" y="${y}" font-size="13" font-weight="700" fill="${TEAL}">${t}</text>`;

  const wrap = (key, inner) => `<svg class="mouth-real" viewBox="0 0 260 220" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Friendly mouth diagram">
    <defs><marker id="arr-${key}" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
      <path d="M 0,0 L 10,5 L 0,10 Z" fill="${TEAL}"/></marker></defs>
    ${head}${inner}</svg>`;

  return { INK, TEAL, GOLD, uvula, hl, tongue, note, wrap };
})();

const SOUND_DIAGRAMS = {
  "tap-r": {
    caption: "The tongue-tip taps once on the bumpy ridge just behind the upper teeth — Urdu's ر is that single tap. A rolled R is the same tap repeated, fast.",
    svg: DIA.wrap("tapr", `
      ${DIA.uvula(false)}
      ${DIA.tongue("M 138,160 C 133,148 135,134 146,130 C 160,126 178,124 187,124 C 191,124 192,127 190,130 C 184,140 170,152 152,160 Z")}
      <path d="M 178,138 C 183,134 188,134 192,137" fill="none" stroke="${DIA.TEAL}" stroke-width="2.5" stroke-linecap="round" opacity="0.85"/>
      <path d="M 174,145 C 181,140 189,140 194,144" fill="none" stroke="${DIA.TEAL}" stroke-width="2.5" stroke-linecap="round" opacity="0.55"/>
      ${DIA.hl(189, 125)}
      ${DIA.note(204, 178, "tap!")}`),
  },
  retroflex: {
    caption: "For ٹ ڈ ڑ the tongue-tip curls up and back, so its underside touches the roof of the mouth — that curl is what makes the sound feel 'heavy'.",
    svg: DIA.wrap("retro", `
      ${DIA.uvula(false)}
      ${DIA.tongue("M 138,160 C 132,148 136,139 150,141 C 162,143 171,143 178,140 C 186,137 189,129 183,125 C 178,122 172,125 173,130 C 174,134 179,134 180,130 L 183,133 C 182,139 174,145 162,149 C 154,152 146,156 143,160 Z")}
      <path d="M 168,116 C 175,110 183,110 189,115" fill="none" stroke="${DIA.TEAL}" stroke-width="2.5" stroke-linecap="round" marker-end="url(#arr-retro)"/>
      ${DIA.hl(182, 124)}
      ${DIA.note(196, 108, "curl back!")}`),
  },
  dental: {
    caption: "For Urdu's soft ت and د the tongue-tip presses flat against the back of the upper teeth — further forward than English t and d.",
    svg: DIA.wrap("dental", `
      ${DIA.uvula(false)}
      ${DIA.tongue("M 138,160 C 133,148 136,134 150,132 C 166,130 182,130 190,131 C 193,132 193,136 190,139 C 181,149 164,156 150,160 Z")}
      ${DIA.hl(192, 133)}
      <path d="M 208,192 C 206,172 202,154 197,142" fill="none" stroke="${DIA.TEAL}" stroke-width="2.5" stroke-linecap="round" marker-end="url(#arr-dental)"/>
      ${DIA.note(128, 204, "right on the teeth")}`),
  },
  aspiration: {
    caption: "Aspirated sounds (بھ پھ تھ …) ride out on a strong puff of breath — strong enough to flutter a feather held at your lips.",
    svg: DIA.wrap("asp", `
      ${DIA.uvula(false)}
      ${DIA.tongue("M 138,160 C 134,150 140,142 154,144 C 168,146 180,150 186,154 C 188,157 186,160 182,160 Z")}
      <path d="M 212,128 C 220,126 227,128 232,132" fill="none" stroke="${DIA.TEAL}" stroke-width="2.5" stroke-linecap="round" opacity="0.9"/>
      <path d="M 214,138 C 224,138 231,140 236,144" fill="none" stroke="${DIA.TEAL}" stroke-width="2.5" stroke-linecap="round" marker-end="url(#arr-asp)"/>
      <path d="M 212,148 C 220,150 226,152 229,156" fill="none" stroke="${DIA.TEAL}" stroke-width="2.5" stroke-linecap="round" opacity="0.9"/>
      <path d="M 241,122 C 236,114 240,104 247,99 C 249,108 247,118 241,122 Z" fill="#fbeec7" stroke="#b9925d" stroke-width="1.5"/>
      <path d="M 242,120 C 243,113 245,106 246,102" fill="none" stroke="#b9925d" stroke-width="1.2"/>
      ${DIA.note(206, 188, "puff!")}`),
  },
  throat: {
    caption: "For خ غ ق the very back of the tongue rises toward the soft, deep part of the roof — much further back than English k or g.",
    svg: DIA.wrap("throat", `
      ${DIA.uvula(false)}
      ${DIA.tongue("M 136,158 C 128,146 128,128 137,119 C 142,114 149,116 151,122 C 154,134 164,148 178,154 C 182,157 180,160 174,160 Z")}
      ${DIA.hl(140, 117)}
      <path d="M 96,150 C 108,142 120,132 130,124" fill="none" stroke="${DIA.TEAL}" stroke-width="2.5" stroke-linecap="round" marker-end="url(#arr-throat)"/>
      ${DIA.note(46, 166, "deep at the back")}`),
  },
  nasal: {
    caption: "For ں the little curtain at the back (the velum) lowers, and the sound floats out through the nose — the mouth stays open, nothing touches.",
    svg: DIA.wrap("nasal", `
      ${DIA.uvula(true)}
      ${DIA.tongue("M 138,160 C 134,150 140,142 154,144 C 168,146 180,150 186,154 C 188,157 186,160 182,160 Z")}
      <path d="M 141,184 C 134,160 133,136 139,117 C 162,107 190,103 208,105 C 212,105 216,107 218,110"
            fill="none" stroke="${DIA.TEAL}" stroke-width="3" stroke-dasharray="6 6" stroke-linecap="round" marker-end="url(#arr-nasal)"/>
      <path d="M 228,96 l 1.4,3.4 3.4,1.4 -3.4,1.4 -1.4,3.4 -1.4,-3.4 -3.4,-1.4 3.4,-1.4 Z" fill="${DIA.GOLD}"/>
      <path d="M 236,84 l 1.1,2.7 2.7,1.1 -2.7,1.1 -1.1,2.7 -1.1,-2.7 -2.7,-1.1 2.7,-1.1 Z" fill="${DIA.GOLD}"/>
      ${DIA.note(214, 134, "nose!")}`),
  },
};
