// ─────────────────────────────────────────────────────────────
// Speech: audio clips + TTS playback + pronunciation checking
//
// Audio priority: 1) a real recording at audio/<slug>.mp3 (perfect
// pronunciation — drop clips in and they're used automatically),
// 2) an Urdu system voice, 3) a Hindi voice reading transliteration,
// 4) any voice reading transliteration. Everything plays deliberately
// slowly; the 🐢 button slows it further.
// ─────────────────────────────────────────────────────────────

const Speech = {
  voice: null,
  voiceQuality: null, // 'ur' | 'hi' | 'none'
  onVoiceChange: null,
  clipCache: {}, // slug -> true (exists) | false (missing)

  init() {
    const pick = () => {
      const voices = speechSynthesis.getVoices();
      if (!voices.length) return;
      const ur = voices.find((v) => v.lang.toLowerCase().startsWith("ur"));
      const hi = voices.find((v) => v.lang.toLowerCase().startsWith("hi"));
      if (ur) {
        this.voice = ur;
        this.voiceQuality = "ur";
      } else if (hi) {
        // Hindi voices share Hindustani's sound system — we feed them
        // transliteration, which they pronounce far better than script.
        this.voice = hi;
        this.voiceQuality = "hi";
      } else {
        this.voice = null;
        this.voiceQuality = "none";
      }
      this.onVoiceChange?.();
    };
    pick();
    speechSynthesis.onvoiceschanged = pick;
  },

  // Filename slug for audio clips. Doubles retroflex letters (ṭ→tt)
  // BEFORE simplifying so ṭe/te, ḍāl/dāl get distinct files.
  slug(s) {
    return this.simplifyTranslit(
      s.toLowerCase().replaceAll("ṭ", "tt").replaceAll("ḍ", "dd").replaceAll("ṛ", "rr")
    )
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "");
  },

  // Speak an item: recorded clip if available, else TTS.
  speak(urduText, translit, opts = {}) {
    const slow = !!opts.slow;
    const key = this.slug(translit || urduText);
    if (this.clipCache[key] === false) return this.tts(urduText, translit, slow);
    const audio = new Audio(`audio/${key}.mp3`);
    audio.playbackRate = slow ? 0.65 : 0.9;
    speechSynthesis.cancel();
    audio.play().then(
      () => (this.clipCache[key] = true),
      () => {
        this.clipCache[key] = false;
        this.tts(urduText, translit, slow);
      }
    );
  },

  tts(urduText, translit, slow) {
    speechSynthesis.cancel();
    const u = new SpeechSynthesisUtterance();
    if (this.voiceQuality === "ur") {
      u.text = urduText;
      u.lang = "ur-PK";
    } else {
      u.text = this.simplifyTranslit(translit || urduText);
      u.lang = this.voice ? this.voice.lang : "en-US";
    }
    if (this.voice) u.voice = this.voice;
    u.rate = slow ? 0.5 : 0.72; // deliberately unhurried — learners first
    speechSynthesis.speak(u);
  },

  // Strip diacritics from scholarly transliteration so generic TTS
  // voices read it sanely: "ṭhīk hūṉ" → "theek hoon"
  simplifyTranslit(s) {
    return s
      .toLowerCase()
      .replaceAll("ṉ", "n")
      .replaceAll("ā", "aa")
      .replaceAll("ī", "ee")
      .replaceAll("ū", "oo")
      .replaceAll("ṭ", "t")
      .replaceAll("ḍ", "d")
      .replaceAll("ṛ", "r")
      .replace(/[?!.,·'’]/g, "");
  },

  voiceNotice() {
    if (this.voiceQuality === "ur") return null;
    if (this.voiceQuality === "hi")
      return "No Urdu voice on this device — using a Hindi voice (same sound system) reading the transliteration. Recorded clips, when added, always play natively.";
    return "No Urdu or Hindi voice found — audio uses a default voice reading the transliteration. On a Mac, add voices in System Settings → Accessibility → Spoken Content.";
  },

  // ── Pronunciation practice ────────────────────────────────
  recognitionSupported() {
    return "webkitSpeechRecognition" in window || "SpeechRecognition" in window;
  },

  listen() {
    return new Promise((resolve, reject) => {
      const SR = window.SpeechRecognition || window.webkitSpeechRecognition;
      if (!SR) return reject(new Error("unsupported"));
      const rec = new SR();
      rec.lang = "ur-PK";
      rec.interimResults = false;
      rec.maxAlternatives = 5;
      let settled = false;
      rec.onresult = (e) => {
        settled = true;
        const alts = [...e.results[0]].map((r) => r.transcript);
        resolve(alts);
      };
      rec.onerror = (e) => {
        if (!settled) reject(new Error(e.error));
      };
      rec.onend = () => {
        if (!settled) reject(new Error("no-speech"));
      };
      rec.start();
    });
  },

  normalizeUrdu(s) {
    return s
      .replace(/[ً-ٰٟ]/g, "")
      .replace(/[؟?!.,،٬'"]/g, "")
      .replaceAll("ك", "ک")
      .replaceAll("ي", "ی")
      .replaceAll("ى", "ی")
      .replaceAll("ه", "ہ")
      .replaceAll("ة", "ہ")
      .replace(/\s+/g, " ")
      .trim();
  },

  levenshtein(a, b) {
    const m = a.length, n = b.length;
    if (!m) return n;
    if (!n) return m;
    let prev = Array.from({ length: n + 1 }, (_, j) => j);
    for (let i = 1; i <= m; i++) {
      const cur = [i];
      for (let j = 1; j <= n; j++) {
        cur[j] = Math.min(
          prev[j] + 1,
          cur[j - 1] + 1,
          prev[j - 1] + (a[i - 1] === b[j - 1] ? 0 : 1)
        );
      }
      prev = cur;
    }
    return prev[n];
  },

  score(alternatives, targetUrdu) {
    const target = this.normalizeUrdu(targetUrdu);
    let best = 0;
    for (const alt of alternatives) {
      const heard = this.normalizeUrdu(alt);
      const dist = this.levenshtein(heard, target);
      const sim = 1 - dist / Math.max(target.length, heard.length, 1);
      best = Math.max(best, sim);
    }
    return Math.round(best * 100);
  },
};
