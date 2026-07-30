// ─────────────────────────────────────────────────────────────
// Stylized map of Pakistan for the Naqsha Challenge daily game.
// Deliberately label-free (labels would give answers away) and
// simplified — a game board, not a survey document.
// Feature data (names/blurbs) lives in data.js as GEO_FEATURES;
// ids here must match those entries.
// ─────────────────────────────────────────────────────────────

const PAK_MAP_SVG = `
<svg id="pakmap" viewBox="0 0 400 440" role="img" aria-label="Stylized map of Pakistan">
  <!-- Arabian Sea -->
  <path id="sea" class="geo-sea" d="M0,440 L0,370 C60,352 140,358 220,382 C260,394 290,412 315,440 Z"/>

  <!-- provinces & territories -->
  <path id="balochistan" class="geo-prov" d="M22,352 L18,238 L60,218 L118,206 L150,216 L168,250
    L205,256 L214,300 L233,345 L252,392 C180,366 90,352 22,352 Z"/>
  <path id="sindh" class="geo-prov" d="M252,392 L233,345 L214,300 L205,256 L242,251 L286,257
    L306,302 L310,352 L286,414 C276,406 264,398 252,392 Z"/>
  <path id="punjab" class="geo-prov" d="M196,152 L232,142 L278,158 L332,182 L352,228 L306,258
    L286,257 L242,251 L205,256 L168,250 L176,204 L186,176 Z"/>
  <path id="kp" class="geo-prov" d="M118,206 L150,216 L168,250 L176,204 L186,176 L196,152
    L206,96 L186,88 L158,92 L138,132 L124,172 Z"/>
  <path id="gb" class="geo-prov" d="M186,88 L202,60 L228,36 L272,26 L322,42 L340,78 L308,96
    L268,92 L228,88 L202,92 Z"/>
  <path id="ajk" class="geo-prov" d="M268,92 L308,96 L324,122 L298,142 L262,126 L252,106 Z"/>

  <!-- Thar desert (inside Sindh) -->
  <ellipse id="thar" class="geo-thar" cx="286" cy="330" rx="26" ry="34"/>

  <!-- Indus river -->
  <path id="indus" class="geo-river" d="M256,62 C246,92 236,112 226,142 C214,174 204,202 210,240
    C216,272 226,302 236,332 C243,356 248,376 252,392"/>

  <!-- K2 -->
  <polygon id="k2" class="geo-peak" points="298,32 310,54 286,54"/>

  <!-- cities -->
  <circle id="islamabad" class="geo-city" cx="226" cy="152" r="6"/>
  <circle id="peshawar" class="geo-city" cx="170" cy="122" r="6"/>
  <circle id="lahore" class="geo-city" cx="330" cy="196" r="6"/>
  <circle id="multan" class="geo-city" cx="254" cy="232" r="6"/>
  <circle id="quetta" class="geo-city" cx="120" cy="262" r="6"/>
  <circle id="karachi" class="geo-city" cx="252" cy="390" r="6"/>
  <circle id="gwadar" class="geo-city" cx="56" cy="344" r="6"/>
</svg>`;
