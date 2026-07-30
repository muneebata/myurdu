// ─────────────────────────────────────────────────────────────
// Sound School diagrams — schematic side-view mouth (facing left)
// showing where each sound is made. Shared base + per-sound
// tongue shape and a pulsing marker at the point of contact.
// ─────────────────────────────────────────────────────────────

function mouthSVG(inner) {
  return `
  <svg class="mouth" viewBox="0 0 280 235" role="img" aria-label="Side view of the mouth showing where the sound is made">
    <!-- head profile -->
    <path class="m-head" d="M150,16 C108,18 80,34 68,56 C60,70 54,82 50,92 L31,105
      C28,111 34,116 42,116 L40,124 C33,128 33,133 40,137 L38,145
      C44,153 49,159 46,167 C51,181 63,193 83,201 C101,209 119,215 131,225
      L216,225 C239,201 251,166 251,126 C251,70 216,22 150,16 Z"/>
    <!-- palate: hard palate arcing back to the soft palate + uvula -->
    <path class="m-palate" d="M62,118 C92,100 132,94 156,100 C165,103 168,110 163,118"/>
    <!-- throat back wall -->
    <path class="m-throat" d="M172,102 C180,128 182,158 178,190"/>
    <!-- teeth -->
    <path class="m-teeth" d="M45,120 L60,120 L60,133 L45,131 Z"/>
    <path class="m-teeth" d="M47,148 L62,150 L62,160 L47,160 Z"/>
    ${inner}
  </svg>`;
}

const TONGUE_NEUTRAL = `<path class="m-tongue" d="M56,160 C78,144 118,140 148,148
  C162,154 168,164 170,176 C170,180 166,182 160,182
  C124,180 88,176 60,170 C54,168 54,164 56,160 Z"/>`;

function poa(cx, cy) {
  return `<circle class="m-poa" cx="${cx}" cy="${cy}" r="4"/>
          <circle class="m-pulse" cx="${cx}" cy="${cy}" r="10"/>`;
}

const SOUND_DIAGRAMS = {
  "tap-r": {
    caption: "Tongue-tip flicks the ridge just behind the top teeth — one quick tap, like the 'tt' in a fast “butter”.",
    svg: mouthSVG(`
      <path class="m-tongue" d="M56,162 C58,146 60,134 66,127 C69,124 74,127 77,136
        C82,146 92,148 110,146 C130,146 150,150 160,156 C168,162 170,170 170,177
        C170,181 166,183 160,183 C124,181 88,177 60,171 C54,169 54,166 56,162 Z"/>
      ${poa(63, 120)}`),
  },
  retroflex: {
    caption: "Tip curls up and backwards — the underside flicks the roof of the mouth, further back than English t/d.",
    svg: mouthSVG(`
      <path class="m-tongue" d="M56,164 C68,152 82,138 92,124 C98,114 104,106 112,105
        C116,105 117,110 113,115 C108,122 106,130 112,138 C126,146 146,150 156,155
        C166,161 170,170 170,178 C170,182 166,184 160,184
        C124,182 88,178 60,172 C54,170 54,167 56,164 Z"/>
      ${poa(110, 101)}`),
  },
  dental: {
    caption: "Tip presses the back of the top teeth — where English puts 'th', Urdu puts its soft t and d.",
    svg: mouthSVG(`
      <path class="m-tongue" d="M56,162 C56,148 54,138 58,131 C60,127 66,130 70,140
        C76,148 90,150 110,148 C130,148 150,152 160,158 C168,164 170,172 170,178
        C170,182 166,184 160,184 C124,182 88,178 60,172 C54,170 54,166 56,162 Z"/>
      ${poa(55, 126)}`),
  },
  aspiration: {
    caption: "Same tongue position as the plain sound — the difference is the burst of air escaping the lips. Feel it on your palm.",
    svg: mouthSVG(`
      ${TONGUE_NEUTRAL}
      <path class="m-puff" style="animation-delay:0s"  d="M30,128 Q20,126 14,130"/>
      <path class="m-puff" style="animation-delay:.4s" d="M30,136 Q18,138 12,134"/>
      <path class="m-puff" style="animation-delay:.8s" d="M28,120 Q20,114 12,118"/>
      ${poa(36, 130)}`),
  },
  throat: {
    caption: "The action moves deep: the back of the tongue rises toward the soft palate and uvula while the tip stays down.",
    svg: mouthSVG(`
      <path class="m-tongue" d="M56,162 C86,152 116,142 136,126 C144,119 152,112 157,108
        C162,112 166,122 168,134 C170,150 170,166 170,178 C170,182 166,184 160,184
        C124,182 88,176 60,170 C54,168 54,166 56,162 Z"/>
      <path class="m-buzz" d="M168,140 q6,6 0,12 q-6,6 0,12"/>
      ${poa(157, 103)}`),
  },
  nasal: {
    caption: "The gate to the nose opens and the vowel hums out through it — the tongue never touches anything.",
    svg: mouthSVG(`
      ${TONGUE_NEUTRAL}
      <path class="m-flow" d="M158,114 C146,86 116,64 88,68 C64,72 46,86 36,100"/>
      <polygon class="m-arrow" points="38,104 28,102 36,94"/>
      ${poa(160, 108)}`),
  },
};
