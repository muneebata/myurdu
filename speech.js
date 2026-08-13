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
    const rev = (typeof AUDIO_REFRESH !== "undefined" && AUDIO_REFRESH[key]) ? `?r=${AUDIO_REFRESH[key]}` : "";
    const audio = new Audio(`audio/${key}.mp3${rev}`);
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
      return "No Urdu voice on this device, so audio uses a Hindi voice (same sound system) reading the transliteration. Recorded clips, when added, always play natively.";
    return "No Urdu or Hindi voice found, so audio uses a default voice reading the transliteration. On a Mac, add voices in System Settings → Accessibility → Spoken Content.";
  },

  // ── Pronunciation practice ────────────────────────────────
  recognitionSupported() {
    return "webkitSpeechRecognition" in window || "SpeechRecognition" in window;
  },

  // ── Goonj: record the learner, play it back ───────────────
  // Works everywhere speech recognition doesn't (iOS, Safari):
  // MediaRecorder is universal. Audio lives in memory only —
  // nothing is uploaded, nothing is saved.
  recordingSupported() {
    return !!(navigator.mediaDevices?.getUserMedia && window.MediaRecorder);
  },

  // Which app's browser this really is. In-app browsers (opening a
  // link from inside LinkedIn, Instagram, Facebook) are WKWebViews on
  // iOS, and most of them are not built to hand a page the microphone,
  // so getUserMedia fails there whatever the site does. The only fix
  // is "Open in Safari", so the message has to say that by name.
  inAppBrowser() {
    const ua = navigator.userAgent || "";
    const hit = [
      [/LinkedIn/i, "LinkedIn"],
      [/Instagram/i, "Instagram"],
      [/FBAN|FBAV|FB_IAB/i, "Facebook"],
      [/Messenger/i, "Messenger"],
      [/Twitter/i, "X"],
      [/Snapchat/i, "Snapchat"],
      [/BytedanceWebview|musical_ly|TikTok/i, "TikTok"],
      [/WhatsApp/i, "WhatsApp"],
      [/\bLine\//i, "LINE"],
      [/GSA\//i, "the Google app"],
    ].find(([re]) => re.test(ua));
    return hit ? hit[1] : null;
  },

  // Everything that decides whether the mic can work here, in one
  // object, so a bug report is one tap instead of twenty questions.
  micDiag() {
    return {
      ua: navigator.userAgent,
      inApp: this.inAppBrowser() || "no",
      standalone: !!(window.navigator.standalone || matchMedia("(display-mode: standalone)").matches),
      secure: window.isSecureContext,
      mediaDevices: !!navigator.mediaDevices?.getUserMedia,
      mediaRecorder: !!window.MediaRecorder,
      recognition: this.recognitionSupported(),
      audioSession: !!navigator.audioSession,
    };
  },

  _rec: null,

  async recordStart() {
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    // Safari records mp4/aac; Chromium records webm/opus.
    const mime = ["audio/mp4", "audio/webm;codecs=opus", "audio/webm"].find((t) => MediaRecorder.isTypeSupported(t)) || "";
    const mr = new MediaRecorder(stream, mime ? { mimeType: mime } : undefined);
    const chunks = [];
    mr.ondataavailable = (e) => { if (e.data.size) chunks.push(e.data); };
    const done = new Promise((resolve) => {
      mr.onstop = () => {
        stream.getTracks().forEach((t) => t.stop());
        resolve(new Blob(chunks, mime ? { type: mime } : undefined));
      };
    });
    mr.start();
    this._rec = { mr, done };
  },

  recordStop() {
    const r = this._rec;
    this._rec = null;
    if (!r) return Promise.resolve(null);
    if (r.mr.state !== "inactive") r.mr.stop();
    return r.done;
  },

  _actx: null,

  // Playing back a recording is where iPhones bite: iOS Chrome refuses
  // to play a just-recorded blob through an <audio> element at all
  // (NotAllowedError, confirmed on a real device), so Web Audio has to
  // go first with the element as fallback.
  //
  // The catch is that iOS mutes Web Audio when the ring/silent switch
  // is on, because the audio session defaults to "ambient". Declaring
  // the session as "playback" tells iOS this is media and should be
  // heard regardless. Only Safari implements this API, hence the
  // feature check. (Plain <audio> is unaffected by the switch, which
  // is why the lesson clips never needed any of this.)
  async playRecording(url) {
    try {
      if (navigator.audioSession && navigator.audioSession.type !== "playback") {
        navigator.audioSession.type = "playback";
      }
    } catch (_) {}
    const Ctx = window.AudioContext || window.webkitAudioContext;
    if (Ctx) {
      try {
        this._actx = this._actx || new Ctx();
        if (this._actx.state === "suspended") await this._actx.resume();
        const bytes = await (await fetch(url)).arrayBuffer();
        const decoded = await this._actx.decodeAudioData(bytes);
        const node = this._actx.createBufferSource();
        node.buffer = decoded;
        node.connect(this._actx.destination);
        node.start();
        return "webaudio";
      } catch (_) {
        // fall through to the element
      }
    }
    const el = new Audio(url);
    el.setAttribute("playsinline", "");
    await el.play();
    return "element";
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
      const finish = (fn, arg) => {
        if (settled) return;
        settled = true;
        clearTimeout(guard);
        fn(arg);
      };
      // Some engines never fire result/error/end — don't leave the UI
      // on "Listening…" forever.
      const guard = setTimeout(() => {
        try { rec.abort(); } catch (_) {}
        finish(reject, new Error("timeout"));
      }, 12000);
      rec.onresult = (e) => {
        const alts = [...e.results[0]].map((r) => r.transcript);
        const texts = alts.filter((t) => t && t.trim());
        if (!texts.length) return finish(reject, new Error("no-speech"));
        // An engine that answers only in Latin script ignored ur-PK —
        // Safari's recognizer has no Urdu. Surface that honestly instead
        // of scoring garbage against the Urdu target.
        if (texts.every((t) => !/[\u0600-\u06FF]/.test(t)))
          return finish(reject, new Error("language-not-supported"));
        finish(resolve, alts);
      };
      rec.onnomatch = () => finish(reject, new Error("no-speech"));
      rec.onerror = (e) => finish(reject, new Error(e.error || "error"));
      rec.onend = () => finish(reject, new Error("no-speech"));
      rec.start();
    });
  },

  // Errors that mean "this setup won't ever hear Urdu" (vs. try again)
  fatalMicError(code) {
    return ["language-not-supported", "service-not-allowed", "unsupported", "audio-capture"].includes(code);
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
