// ─────────────────────────────────────────────────────────────
// Urdu Seekho — curriculum data
// Speaking track: 5 levels, each builds on the last.
// Reading track: 4 units teaching the Nastaliq script from zero.
// ─────────────────────────────────────────────────────────────

const LEVELS = [
  {
    id: "L1",
    title: "Salaam! · Greetings",
    subtitle: "Your first words — greet anyone, anywhere",
    intro:
      "Urdu speakers greet warmly and often. Master these and you can open (and close) any conversation. Listen first, repeat out loud — Urdu is best learned ear-first.",
    items: [
      { ur: "السلام علیکم", tr: "assalām-o-alaikum", en: "Hello (peace be upon you)", note: "The universal greeting. Works any time of day." },
      { ur: "وعلیکم السلام", tr: "wa-alaikum-us-salām", en: "Hello to you too (reply)", note: "The standard reply — 'and peace upon you too'." },
      { ur: "کیا حال ہے؟", tr: "kyā hāl hai?", en: "How are you?", note: "Literally 'what is (your) condition?'" },
      { ur: "ٹھیک ہوں", tr: "ṭhīk hūṉ", en: "I'm fine", note: "Add 'shukriya' after it to be extra polite." },
      { ur: "شکریہ", tr: "shukriya", en: "Thank you", note: "From the Arabic root sh-k-r, 'gratitude'." },
      { ur: "جی ہاں", tr: "jī hāṉ", en: "Yes (polite)", note: "'Jī' is a respect particle — sprinkle it generously." },
      { ur: "جی نہیں", tr: "jī nahīṉ", en: "No (polite)", note: "Softer than a bare 'nahīṉ'." },
      { ur: "معاف کیجیے", tr: "muāf kījiye", en: "Excuse me / sorry", note: "Your all-purpose politeness tool." },
      { ur: "خدا حافظ", tr: "khudā hāfiz", en: "Goodbye", note: "'May God be your protector' — Persian origin." },
    ],
    funFacts: [
      "The word “Urdu” comes from the Turkic word <em>ordu</em>, meaning “army camp” — the language grew in the multilingual military camps of Mughal-era Delhi. English got the word “horde” from the same root!",
      "“Jī” is a magic respect particle. Say “jī hāṉ” instead of “hāṉ”, or add it to names — “Ammī jī”, “Khan jī” — and you instantly sound more courteous.",
      "“Khudā hāfiz” literally means “May God be your guardian.” You'll also hear “Allāh hāfiz” — same meaning, newer fashion.",
    ],
  },
  {
    id: "L2",
    title: "Mulaqat · Introductions",
    subtitle: "Say who you are, ask who they are",
    intro:
      "Now that you can greet (Level 1), let's exchange names and origins. You'll also meet Urdu's famous three levels of 'you' — politeness is built right into the grammar.",
    items: [
      { ur: "میرا نام مونیب ہے", tr: "merā nām Muneeb hai", en: "My name is Muneeb", note: "Swap in your own name. 'Merā' = my, 'hai' = is." },
      { ur: "آپ کا نام کیا ہے؟", tr: "āp kā nām kyā hai?", en: "What is your name?", note: "'Āp' is the respectful 'you' — your default with strangers." },
      { ur: "آپ سے مل کر خوشی ہوئی", tr: "āp se mil kar khushī huī", en: "Pleased to meet you", note: "Literally 'meeting you, happiness happened'." },
      { ur: "میں امریکہ سے ہوں", tr: "maiṉ Amrīkā se hūṉ", en: "I am from America", note: "Pattern: maiṉ ___ se hūṉ = I'm from ___." },
      { ur: "آپ کہاں سے ہیں؟", tr: "āp kahāṉ se haiṉ?", en: "Where are you from?", note: "'Kahāṉ' = where. Notice the nasal ṉ — it's everywhere in Urdu." },
      { ur: "میں اردو سیکھ رہا ہوں", tr: "maiṉ urdū sīkh rahā hūṉ", en: "I am learning Urdu (male speaker)", note: "Verbs agree with the speaker's gender: rahā (m)." },
      { ur: "میں اردو سیکھ رہی ہوں", tr: "maiṉ urdū sīkh rahī hūṉ", en: "I am learning Urdu (female speaker)", note: "…and rahī (f). Same sentence, different ending." },
      { ur: "آہستہ بولیے", tr: "āhista boliye", en: "Please speak slowly", note: "The learner's best friend. Use it without shame." },
    ],
    funFacts: [
      "Urdu has <strong>three</strong> words for “you”: <em>tū</em> (intimate/blunt), <em>tum</em> (casual, friends), and <em>āp</em> (respectful). Getting them wrong can be as awkward as calling your boss “dude” — when in doubt, use āp.",
      "Urdu sentences run Subject–Object–Verb: “maiṉ urdū sīkh rahā hūṉ” is literally “I Urdu learning am.” The verb always parks at the end.",
      "Spoken Urdu and spoken Hindi are largely mutually intelligible — learn one and you can chat with well over half a billion people.",
    ],
  },
  {
    id: "L3",
    title: "Ginti · Numbers",
    subtitle: "Count to ten, ask 'how many?'",
    intro:
      "Numbers unlock shopping, time, and small talk. Combine them with your Level 2 patterns: 'mere do bhāī haiṉ' — but that's Level 4's preview. First, one to ten.",
    items: [
      { ur: "ایک", tr: "ek", en: "one", note: "" },
      { ur: "دو", tr: "do", en: "two", note: "" },
      { ur: "تین", tr: "tīn", en: "three", note: "" },
      { ur: "چار", tr: "chār", en: "four", note: "" },
      { ur: "پانچ", tr: "pāṉch", en: "five", note: "" },
      { ur: "چھ", tr: "chhe", en: "six", note: "The 'chh' is aspirated — a puff of air after 'ch'." },
      { ur: "سات", tr: "sāt", en: "seven", note: "" },
      { ur: "آٹھ", tr: "āṭh", en: "eight", note: "ṭ is retroflex — tongue curled back. Very Urdu." },
      { ur: "نو", tr: "nau", en: "nine", note: "" },
      { ur: "دس", tr: "das", en: "ten", note: "" },
      { ur: "کتنے؟", tr: "kitne?", en: "How many?", note: "Also 'kitnā' (how much) — endlessly useful at bazaars." },
    ],
    funFacts: [
      "Urdu numbers 1–100 are famously irregular — nearly every one is its own word (unlike English's tidy “twenty-one, twenty-two…”). Even native speakers joke that nobody knows what 87 (satāsī) is without thinking.",
      "Urdu has its own numerals too: ۱ ۲ ۳ ۴ ۵ ۶ ۷ ۸ ۹ ۰ — you'll see them on truck art, currency, and old clock faces.",
      "Retroflex sounds like ṭ (ٹ) and ḍ (ڈ) don't exist in Arabic or Persian — Urdu added special letters for them by putting a tiny ط on top. They're a South Asian signature.",
    ],
  },
  {
    id: "L4",
    title: "Khandan · Family & People",
    subtitle: "Talk about the people in your life",
    intro:
      "Family is the heart of Urdu conversation. Combine these with Level 3 numbers ('mere do bhāī haiṉ' — I have two brothers) and Level 2 patterns to introduce your whole family.",
    items: [
      { ur: "خاندان", tr: "khāndān", en: "family", note: "" },
      { ur: "امی", tr: "ammī", en: "mom", note: "Formal word: wālida. But everyone says ammī." },
      { ur: "ابو", tr: "abbū", en: "dad", note: "Formal word: wālid." },
      { ur: "بھائی", tr: "bhāī", en: "brother", note: "Also used for any friendly male — 'bhāī, listen!'" },
      { ur: "بہن", tr: "behen", en: "sister", note: "" },
      { ur: "بیٹا", tr: "beṭā", en: "son", note: "Elders call any young person 'beṭā' affectionately." },
      { ur: "بیٹی", tr: "beṭī", en: "daughter", note: "" },
      { ur: "دادی", tr: "dādī", en: "grandma (dad's side)", note: "Urdu splits the family tree by side!" },
      { ur: "نانی", tr: "nānī", en: "grandma (mom's side)", note: "Different word, different grandma." },
      { ur: "دوست", tr: "dost", en: "friend", note: "A Persian loan — as in 'dostī', friendship." },
      { ur: "میرے دو بھائی ہیں", tr: "mere do bhāī haiṉ", en: "I have two brothers", note: "Level 3 numbers + Level 4 words. It's all connecting." },
    ],
    funFacts: [
      "Urdu maps the family tree with surgical precision: your father's brother is <em>chāchā</em>, your mother's brother is <em>māmūṉ</em>, your father's sister's husband is <em>phūphā</em>… English's one word “uncle” covers at least six distinct Urdu relatives.",
      "“Bhāī” (brother) doubles as friendly street address for any man — shopkeepers, taxi drivers, strangers. “Bhāī jān” is warmer still.",
      "Urdu is Pakistan's national language, yet it's the mother tongue of well under 10% of Pakistanis — most grow up with Punjabi, Sindhi, Pashto, or others, and learn Urdu as the shared bridge language.",
    ],
  },
  {
    id: "L5",
    title: "Khana · Food & Requests",
    subtitle: "Order food, ask prices, praise the cook",
    intro:
      "The victory lap: everything comes together. Greetings (L1), polite requests (L2's āp), numbers for prices (L3) — now use them where it matters most: food.",
    items: [
      { ur: "پانی", tr: "pānī", en: "water", note: "" },
      { ur: "چائے", tr: "chāy", en: "tea", note: "The national obsession. Milky, sweet, constant." },
      { ur: "کھانا", tr: "khānā", en: "food / a meal", note: "Also the verb 'to eat'. Context tells you which." },
      { ur: "روٹی", tr: "roṭī", en: "flatbread", note: "So essential it can just mean 'a meal'." },
      { ur: "مجھے پانی چاہیے", tr: "mujhe pānī chāhiye", en: "I need water", note: "Pattern: mujhe ___ chāhiye = I need/want ___." },
      { ur: "یہ کیا ہے؟", tr: "yeh kyā hai?", en: "What is this?", note: "Point politely and learn every dish's name." },
      { ur: "کتنے کا ہے؟", tr: "kitne kā hai?", en: "How much is it?", note: "Your Level 3 'kitne' earning its keep." },
      { ur: "بہت مزیدار", tr: "bahut mazedār", en: "Very delicious", note: "The highest compliment to any cook." },
      { ur: "بہت اچھا", tr: "bahut achhā", en: "Very good", note: "'Bahut' = very. Upgrade anything with it." },
      { ur: "بس، شکریہ", tr: "bas, shukriya", en: "That's enough, thank you", note: "'Bas' = enough/that's it. You'll need it — hospitality is relentless." },
    ],
    funFacts: [
      "Saying “chai tea” is saying “tea tea” — <em>chāy</em> IS the word for tea. It travelled from Chinese <em>chá</em> along the overland trade routes; languages that got tea by sea (like English) say “tea” instead.",
      "“Bas” (enough) may be the most load-bearing word in desi hospitality. Hosts will refill your plate until you deploy it — and often twice more after that.",
      "Urdu is a champion borrower: <em>pānī</em> is Sanskrit-derived, <em>chāy</em> came via Persian from Chinese, <em>mazedār</em> is Persian, <em>shukriya</em> is Arabic. One sentence can span four civilizations.",
    ],
  },
];

// ─────────────────────────────────────────────────────────────
// Reading track — learn the script
// ─────────────────────────────────────────────────────────────

const READING_UNITS = [
  {
    id: "R1",
    title: "The Script · Meet Nastaliq",
    subtitle: "Right to left, flowing like calligraphy",
    intro:
      "Urdu is written right-to-left in the Nastaliq style — a hanging, diagonal calligraphic script. The alphabet has about 38 letters, and many share a base shape, distinguished only by dots (nuqte). Learn letters in shape-families and the alphabet shrinks dramatically.",
    sections: [
      {
        heading: "Three big ideas",
        facts: [
          "<strong>Right to left.</strong> Lines start on the right. Books open 'backwards' to English eyes.",
          "<strong>Letters connect.</strong> Like cursive, most letters join to their neighbours and change shape when they do.",
          "<strong>Dots do the work.</strong> Many letters share one skeleton — the dots above or below tell them apart. Change a dot, change the letter.",
        ],
      },
      {
        heading: "The be-family — one shape, five letters",
        note: "Tap a letter to hear its name. Notice: identical base, only the dots differ.",
        letters: [
          { ch: "ب", name: "be", sound: "b" },
          { ch: "پ", name: "pe", sound: "p" },
          { ch: "ت", name: "te", sound: "t (soft, dental)" },
          { ch: "ٹ", name: "ṭe", sound: "t (retroflex, tongue curled)" },
          { ch: "ث", name: "se", sound: "s" },
        ],
      },
      {
        heading: "The jim-family",
        note: "Same swoop, different dots.",
        letters: [
          { ch: "ج", name: "jīm", sound: "j" },
          { ch: "چ", name: "che", sound: "ch" },
          { ch: "ح", name: "baṛī he", sound: "h" },
          { ch: "خ", name: "khe", sound: "kh (as in 'Khan')" },
        ],
      },
    ],
    funFacts: [
      "Nastaliq is so calligraphically complex that Urdu newspapers were handwritten by master scribes (kātibs) until the 1980s — computers simply couldn't typeset it. Digital Nastaliq fonts only became good in the 2000s.",
      "Arabic is usually printed in the more upright Naskh style; Urdu insists on flowing Nastaliq. Urdu readers can spot the difference instantly — Naskh Urdu 'feels foreign'.",
    ],
  },
  {
    id: "R2",
    title: "Shape-shifters · Letter Forms",
    subtitle: "How letters change when they join",
    intro:
      "Each letter has up to four forms: standing alone, starting a word, in the middle, or at the end. It sounds like 4× the work — but the forms are systematic: the core shape stays, the tails get trimmed where the letter connects.",
    sections: [
      {
        heading: "The four forms of ب (be)",
        forms: [
          { label: "Alone", ur: "ب" },
          { label: "Start", ur: "بـ" },
          { label: "Middle", ur: "ـبـ" },
          { label: "End", ur: "ـب" },
        ],
        note: "Start and middle forms lose the tail so the next letter can attach.",
      },
      {
        heading: "Watch letters combine",
        note: "Tap each word to hear it. Read right to left!",
        words: [
          { ur: "اب", tr: "ab", en: "now", spell: "alif + be" },
          { ur: "باب", tr: "bāb", en: "chapter", spell: "be + alif + be" },
          { ur: "بابا", tr: "bābā", en: "father / old man", spell: "be + alif + be + alif" },
        ],
      },
      {
        heading: "The stubborn seven",
        facts: [
          "Seven letters refuse to connect forward: <span class='ur-inline'>ا د ڈ ذ ر ڑ ز</span> (and ژ و). After any of them, the next letter starts fresh — which is why words have visible 'breaks' inside them.",
        ],
      },
    ],
    funFacts: [
      "Because of the stubborn non-connectors, you can often see word-internal gaps: <em>urdū</em> (اردو) has a break after the alif and after the re — four letters, three pieces.",
      "Nastaliq words cascade diagonally: each word starts high and steps down to the baseline, like a tiny staircase. It's why Urdu print looks like it's dancing.",
    ],
  },
  {
    id: "R3",
    title: "Vowels · The Invisible Ink",
    subtitle: "Long vowels you see, short vowels you guess",
    intro:
      "Urdu writes long vowels with real letters (ا و ی ے) but marks short vowels with tiny optional symbols — which everyday writing simply leaves out. Readers infer them from context, like how you can read 'txt msgs wtht vwls'.",
    sections: [
      {
        heading: "The long-vowel crew",
        letters: [
          { ch: "ا", name: "alif", sound: "ā (as in 'father')" },
          { ch: "و", name: "wā'o", sound: "o / ū / au" },
          { ch: "ی", name: "choṭī ye", sound: "ī (as in 'see')" },
          { ch: "ے", name: "baṛī ye", sound: "e (as in 'day')" },
        ],
        note: "Wā'o and ye moonlight as consonants too (w/v and y).",
      },
      {
        heading: "The three short-vowel marks",
        forms: [
          { label: "zabar → 'a'", ur: "بَ" },
          { label: "zer → 'i'", ur: "بِ" },
          { label: "pesh → 'u'", ur: "بُ" },
        ],
        note: "A dash above, a dash below, a curl above. Textbooks print them; newspapers don't.",
      },
      {
        heading: "Special agents",
        letters: [
          { ch: "ں", name: "nūn ghunna", sound: "nasal ṉ (no dot!)" },
          { ch: "ھ", name: "do-chashmī he", sound: "adds a puff: bh, ph, th…" },
          { ch: "ء", name: "hamza", sound: "vowel separator" },
        ],
        note: "Do-chashmī he ('two-eyed he') turns ب b into بھ bh — Urdu's aspirated sounds.",
      },
    ],
    funFacts: [
      "The dotless ں (nūn ghunna) is the nasal hum at the end of <em>hāṉ</em>, <em>nahīṉ</em>, <em>maiṉ</em>. It only appears at word-ends — inside words, regular nūn goes nasal undercover.",
      "Aspiration changes meaning: <em>pal</em> (moment) vs <em>phal</em> (fruit). That little ھ is doing real work — English speakers aspirate automatically in 'pin' but not 'spin', so you already make both sounds!",
    ],
  },
  {
    id: "R4",
    title: "First Words · Read for Real",
    subtitle: "Sound out words you already know",
    intro:
      "Time to cash in. Every word below is one you learned in the speaking levels — now decode it letter by letter. Read right to left, find the shapes, let the dots guide you.",
    sections: [
      {
        heading: "Sound these out",
        note: "Tap to hear. Cover the transliteration and try first!",
        words: [
          { ur: "نام", tr: "nām", en: "name", spell: "nūn + alif + mīm" },
          { ur: "پانی", tr: "pānī", en: "water", spell: "pe + alif + nūn + ye" },
          { ur: "دوست", tr: "dost", en: "friend", spell: "dāl + wā'o + sīn + te" },
          { ur: "چائے", tr: "chāy", en: "tea", spell: "che + alif + hamza + baṛī ye" },
          { ur: "دس", tr: "das", en: "ten", spell: "dāl + sīn" },
          { ur: "بہن", tr: "behen", en: "sister", spell: "be + choṭī he + nūn" },
          { ur: "اردو", tr: "urdū", en: "Urdu", spell: "alif + re + dāl + wā'o" },
          { ur: "شکریہ", tr: "shukriya", en: "thank you", spell: "shīn + kāf + re + ye + choṭī he" },
        ],
      },
    ],
    funFacts: [
      "You just read اردو — the language's own name — in its own script. The alif–re break and the dāl–wā'o break mean this four-letter word sits in three separate pieces.",
      "Urdu spelling is far more regular than English: once you know the letters, most words read exactly as written. No 'though/tough/through' nonsense.",
    ],
  },
];

const QUIZ_PASS_PERCENT = 70;

// ─────────────────────────────────────────────────────────────
// Culture track — Virsa (heritage): poems, rhymes, famous works
// ─────────────────────────────────────────────────────────────

const CULTURE_UNITS = [
  {
    id: "C1",
    title: "Virsa · Poems & Rhymes",
    subtitle: "The verses every Urdu speaker grew up on",
    intro:
      "Language lives in its poetry. These are the lines Pakistani kids sing at school assembly, the rhymes their parents taught them, and a taste of the ghazal tradition. Tap any line to hear it — poems are the best pronunciation coaches.",
    sections: [
      {
        heading: "Lab pe aati hai dua — the school-assembly prayer",
        note: "Allama Iqbal wrote this children's prayer-poem in 1902. To this day, millions of schoolchildren across Pakistan recite it every single morning at assembly. Ask any Urdu speaker — they know it by heart.",
        verse: [
          { ur: "لب پہ آتی ہے دعا بن کے تمنا میری", tr: "lab pe ātī hai duā ban ke tamannā merī", en: "My longing comes to my lips, transformed into a prayer" },
          { ur: "زندگی شمع کی صورت ہو خدایا میری", tr: "zindagī shamma kī sūrat ho khudāyā merī", en: "O God, may my life be like a candle (giving light to others)" },
        ],
        credit: "— Allama Iqbal (1877–1938), Pakistan's national poet",
      },
      {
        heading: "Machhli jal ki rani hai — the fish rhyme",
        note: "A traditional nursery rhyme every child learns. Spot your Level 5 word pānī!",
        verse: [
          { ur: "مچھلی جل کی رانی ہے", tr: "machhlī jal kī rānī hai", en: "The fish is the queen of the water" },
          { ur: "جیون اس کا پانی ہے", tr: "jīwan us kā pānī hai", en: "Water is her life" },
        ],
        credit: "— traditional nursery rhyme",
      },
      {
        heading: "A taste of Ghalib — the ghazal master",
        note: "Mirza Ghalib (1797–1869) is Urdu's most quoted poet. This couplet uses hazār (thousand) — Level 3 numbers, poet-grade. Urdu speakers drop his couplets into conversation the way English speakers quote Shakespeare.",
        verse: [
          { ur: "ہزاروں خواہشیں ایسی کہ ہر خواہش پہ دم نکلے", tr: "hazāroṉ khwāhisheṉ aisī ke har khwāhish pe dam nikle", en: "Thousands of desires, each worth dying for…" },
          { ur: "بہت نکلے مرے ارمان لیکن پھر بھی کم نکلے", tr: "bahut nikle mere armān lekin phir bhī kam nikle", en: "…many of mine were fulfilled, yet somehow too few" },
        ],
        credit: "— Mirza Ghalib",
      },
      {
        heading: "Your listening list — famous works to explore",
        facts: [
          "<strong>Dil Dil Pakistan</strong> (Vital Signs, 1987) — often called Pakistan's 'second national anthem'. A pop song so beloved it's practically a state institution.",
          "<strong>Nusrat Fateh Ali Khan</strong> — the qawwali legend. Start with 'Allah Hoo' or 'Tumhein Dillagi'; you'll hear Urdu and Persian devotional poetry at full power.",
          "<strong>Coke Studio Pakistan</strong> — the modern gateway drug to Urdu music. 'Pasoori' (2022) became a global hit — Punjabi-Urdu blend with subtitles everywhere.",
          "<strong>Faiz Ahmed Faiz</strong> — the 20th century's revolutionary romantic. His 'Hum Dekhenge' is recited at protests across South Asia to this day.",
        ],
      },
    ],
    funFacts: [
      "The ghazal — Urdu's signature poetic form — is a chain of self-contained couplets, each ending on the same refrain. At a mushā'ira (poetry gathering), the audience shouts 'wāh wāh!' when a couplet lands. Audience participation is mandatory.",
      "Iqbal's 'Lab pe aati hai dua' and Ghalib's couplets are public-domain treasures — Urdu's canon is older than copyright, free for every learner.",
    ],
  },
];

// ─────────────────────────────────────────────────────────────
// Daily game — English words that marched out of Urdu/Hindustani
// ─────────────────────────────────────────────────────────────

const LOANWORDS = [
  { en: "khaki", ur: "خاکی", tr: "khākī", meaning: "dust-coloured", story: "From khāk (dust). British-Indian regiments dyed their whites dust-colour to blend in — the word marched into English uniform-first." },
  { en: "pyjamas", ur: "پاجامہ", tr: "pājāma", meaning: "leg garment", story: "pā (leg) + jāma (garment). Loose subcontinental trousers that Europeans adopted as sleepwear." },
  { en: "shampoo", ur: "چانپو", tr: "chāmpo", meaning: "massage!", story: "From chāmpnā, to press or knead. 18th-century travellers loved Indian head massages so much they took the word home." },
  { en: "jungle", ur: "جنگل", tr: "jangal", meaning: "forest / wild land", story: "Straight from Hindustani jangal — no translation needed, the word simply moved in." },
  { en: "loot", ur: "لوٹ", tr: "lūṭ", meaning: "plunder", story: "From lūṭnā, to rob. Entered English as soldiers' slang in the 1780s." },
  { en: "thug", ur: "ٹھگ", tr: "ṭhag", meaning: "swindler, bandit", story: "The ṭhag brotherhoods robbed travellers on Indian highways; the word now describes any ruffian." },
  { en: "bungalow", ur: "بنگلہ", tr: "banglā", meaning: "Bengal-style house", story: "A one-storey house 'in the Bengal style' — banglā — became every suburb's bungalow." },
  { en: "chutney", ur: "چٹنی", tr: "chaṭnī", meaning: "something you lick up", story: "From chāṭnā, to lick. Food so good the name is literally the act of licking it up." },
  { en: "cushy", ur: "خوشی", tr: "khushī", meaning: "happiness, pleasure", story: "British Indian Army slang: a khushī posting was an easy, pleasant one. A cushy job still is." },
  { en: "cummerbund", ur: "کمر بند", tr: "kamar-band", meaning: "waist-band", story: "kamar (waist) + band (band/tie). Formalwear's fanciest word is just Urdu for belt." },
  { en: "verandah", ur: "برآمدہ", tr: "barāmda", meaning: "covered porch", story: "The shaded gallery of subcontinental homes, via Hindustani (with a Portuguese assist)." },
  { en: "cheetah", ur: "چیتا", tr: "chītā", meaning: "the spotted one", story: "From Sanskrit chitra (marked, painted) via Hindustani chītā." },
  { en: "punch (the drink)", ur: "پانچ", tr: "pāṉch", meaning: "five", story: "The original drink had five ingredients — pāṉch. Your Level 3 number, hiding in a punch bowl." },
  { en: "shawl", ur: "شال", tr: "shāl", meaning: "woven wrap", story: "Kashmiri shāls became such a European craze that the word wrapped itself around English." },
  { en: "typhoon", ur: "طوفان", tr: "tūfān", meaning: "storm", story: "Tūfān is still the everyday Urdu word for storm — English borrowed it for the biggest ones." },
  { en: "pukka", ur: "پکا", tr: "pakkā", meaning: "ripe, solid, genuine", story: "pakkā = cooked, ripe, proper. 'Pukka' survives as British slang for 'excellent'." },
  { en: "cot", ur: "کھاٹ", tr: "khāṭ", meaning: "rope bed", story: "The humble khāṭ (charpai) — four legs, woven rope — became the English cot." },
  { en: "dinghy", ur: "ڈینگی", tr: "ḍīngī", meaning: "small river boat", story: "The little boats of Bengal's rivers now hang off yachts everywhere." },
  { en: "bandana", ur: "باندھنا", tr: "bāndhnā", meaning: "to tie", story: "From bāndhnū tie-dyeing — cloth tied and dyed. The knot is in the name." },
  { en: "kedgeree", ur: "کھچڑی", tr: "khichṛī", meaning: "rice-and-lentil comfort food", story: "The subcontinent's sick-day khichṛī came back from Britain as a smoked-fish breakfast." },
];

const DAILY_QUESTIONS = 5;

// ─────────────────────────────────────────────────────────────
// Titles — the learner's journey, from student to Ustaadh
// ─────────────────────────────────────────────────────────────

const RANKS = [
  { need: 0, name: "Talib-e-Ilm · Student", ur: "طالب علم" },
  { need: 2, name: "Shagird · Apprentice", ur: "شاگرد" },
  { need: 4, name: "Parhaku · Bookworm", ur: "پڑھاکو" },
  { need: 6, name: "Hoshiyar · Whiz", ur: "ہوشیار" },
  { need: 8, name: "Ustaadh · Master", ur: "استاد" },
  { need: 10, name: "Ustaadh-e-Azam · Grand Master", ur: "استاد اعظم" },
];

// ─────────────────────────────────────────────────────────────
// Sound School — the sounds English doesn't have
// ─────────────────────────────────────────────────────────────

const SOUND_UNITS = [
  {
    id: "S1",
    title: "Awaazain · The Urdu Mouth",
    subtitle: "Rolled Rs, curled Ts, puffs of air — train the tricky sounds",
    intro:
      "Ten minutes here pays off everywhere else. Urdu has a handful of sounds English simply doesn't use — but your mouth already knows most of them from other words. Each section shows you where the sound is made, tells you exactly what to do with your tongue, then gives you words to tap, hear, and echo.",
    sections: [
      {
        heading: "The tapped R — ر",
        diagram: "tap-r",
        facts: [
          "Urdu's <strong>r</strong> is not the English growl. It's a single quick <em>tap</em> of the tongue-tip against the ridge behind your top teeth.",
          "<strong>You already make this sound!</strong> Say “butter” or “water” fast, American-style — that flappy 'tt' in the middle IS the Urdu ر. Now put it where an r goes.",
          "<strong>Want a full rolling trill?</strong> Relax the tongue-tip, hold it loosely at the ridge, and push air steadily so it flutters — like a cat's purr. Practice with 'tr' words: say “butter-up” faster and faster until the tap buzzes.",
        ],
        words: [
          { ur: "میرا", tr: "merā", en: "my", spell: "one light tap — meh-(tap)-aa" },
          { ur: "چار", tr: "chār", en: "four", spell: "tap the r at the very end" },
          { ur: "اردو", tr: "urdū", en: "Urdu", spell: "ur-(tap)-doo — say the language's name right!" },
        ],
        links: [
          { label: "▶ YouTube: how to roll your R (tutorials)", url: "https://www.youtube.com/results?search_query=how+to+roll+your+r+tutorial+alveolar+tap+trill" },
          { label: "📖 Wikipedia: flap consonants (with audio)", url: "https://en.wikipedia.org/wiki/Flap_consonant" },
        ],
      },
      {
        heading: "The retroflex curl — ٹ ڈ ڑ",
        diagram: "retroflex",
        facts: [
          "These are the sounds that make Urdu <em>sound</em> like Urdu. Curl your tongue-tip up and back to the roof of your mouth, then flick it forward as you release.",
          "English t/d are halfway there already — just exaggerate the curl. Urdu ears hear English 't' as ٹ, which is why 'Tom' gets written ٹام.",
          "<strong>ڑ (ṛe)</strong> is the boss level: a retroflex <em>flap</em> — curl back, then tap while uncurling. It never starts a word, so you always have a running start.",
        ],
        words: [
          { ur: "بیٹا", tr: "beṭā", en: "son", spell: "curl on the ṭ: bay-(curl)-aa" },
          { ur: "آٹھ", tr: "āṭh", en: "eight", spell: "curl + a puff of air" },
          { ur: "روٹی", tr: "roṭī", en: "flatbread", spell: "tapped r, then curled ṭ — both drills in one word" },
          { ur: "لڑکا", tr: "laṛkā", en: "boy", spell: "the ڑ flap: luh-(curl-tap)-kaa" },
        ],
        links: [
          { label: "▶ YouTube: retroflex T & D in Urdu/Hindi", url: "https://www.youtube.com/results?search_query=retroflex+consonants+hindi+urdu+pronunciation" },
          { label: "📖 Wikipedia: retroflex consonants (with audio)", url: "https://en.wikipedia.org/wiki/Retroflex_consonant" },
        ],
      },
      {
        heading: "The dental touch — ت د",
        diagram: "dental",
        facts: [
          "Urdu has a <em>second</em> t and d — the dental pair. Touch the tongue-tip to the <strong>back of your top teeth</strong> (where 'th' in 'the' lives), but make a clean stop, not a hiss.",
          "So: ت = tongue on teeth (soft), ٹ = tongue curled back (hard). Two different letters, two different meanings — Urdu ears hear them as clearly as you hear 'pat' vs 'bat'.",
        ],
        words: [
          { ur: "تین", tr: "tīn", en: "three", spell: "tongue on the teeth: teen" },
          { ur: "دس", tr: "das", en: "ten", spell: "dental d — touch the teeth" },
          { ur: "دوست", tr: "dost", en: "friend", spell: "both dentals: d…st" },
        ],
        links: [
          { label: "▶ YouTube: dental vs retroflex t/d", url: "https://www.youtube.com/results?search_query=dental+vs+retroflex+t+d+hindi+urdu+pronunciation" },
          { label: "📖 Wikipedia: dental consonants (with audio)", url: "https://en.wikipedia.org/wiki/Dental_consonant" },
        ],
      },
      {
        heading: "The puff of air — ھ (aspiration)",
        diagram: "aspiration",
        facts: [
          "Hold your palm in front of your mouth. Say “pin” — feel the puff? Now “spin” — no puff. English does both automatically; <strong>Urdu makes them separate sounds</strong>, written with ھ.",
          "The pair matters: <span class='ur-inline'>پل</span> <em>pal</em> (a moment) vs <span class='ur-inline'>پھل</span> <em>phal</em> (fruit). Same word, one puff apart.",
          "Drill: alternate 'spin-pin, spin-pin' with your palm up, then transfer that puff onto k → kh, t → th, ch → chh.",
        ],
        words: [
          { ur: "پھل", tr: "phal", en: "fruit", spell: "p + puff — NOT an English 'f'!" },
          { ur: "کھانا", tr: "khānā", en: "food", spell: "k + puff" },
          { ur: "ٹھیک", tr: "ṭhīk", en: "fine / okay", spell: "curl AND puff — the full combo" },
        ],
        links: [
          { label: "▶ YouTube: aspirated consonants (kha, gha, tha…)", url: "https://www.youtube.com/results?search_query=aspirated+consonants+hindi+urdu+kha+gha+pronunciation" },
          { label: "📖 Wikipedia: aspirated consonants (with audio)", url: "https://en.wikipedia.org/wiki/Aspirated_consonant" },
        ],
      },
      {
        heading: "From the throat — خ غ ق",
        diagram: "throat",
        facts: [
          "<strong>خ (khe)</strong> — the rasp in Scottish “lo<em>ch</em>” or German “Ba<em>ch</em>”. Push air through a nearly-closed throat. You've been saying it in <em>khudā hāfiz</em> all along.",
          "<strong>غ (ghain)</strong> — the same rasp, but voiced: a gentle gargle, like the French r in “Paris”. It starts the word <em>ghazal</em>.",
          "<strong>ق (qāf)</strong> — a k made deeper in the throat, at the uvula. Feel your tongue's back touch further down. In relaxed speech many speakers soften it toward k — so close is fine.",
        ],
        words: [
          { ur: "خدا حافظ", tr: "khudā hāfiz", en: "goodbye", spell: "loch-rasp at the start" },
          { ur: "غزل", tr: "ghazal", en: "ghazal (love poem)", spell: "gargled g — gh-uh-zul" },
          { ur: "قلم", tr: "qalam", en: "pen", spell: "deep-throat k: q-uh-lum" },
        ],
        links: [
          { label: "▶ YouTube: pronouncing خ غ ق (kh, gh, q)", url: "https://www.youtube.com/results?search_query=how+to+pronounce+kh+gh+q+urdu+arabic" },
          { label: "📖 Wikipedia: the خ sound (with audio)", url: "https://en.wikipedia.org/wiki/Voiceless_velar_fricative" },
        ],
      },
      {
        heading: "The nasal hum — ں",
        diagram: "nasal",
        facts: [
          "The dotless nūn (ں) means: <strong>send the vowel through your nose</strong> and never let the tongue touch. Like the French “bon” — there's no real 'n' at the end, just a hum.",
          "It's everywhere in the words you already know: <em>hāṉ</em> (yes), <em>nahīṉ</em> (no), <em>maiṉ</em> (I). Say “huh” while humming through your nose — that's hāṉ.",
        ],
        words: [
          { ur: "جی ہاں", tr: "jī hāṉ", en: "yes (polite)", spell: "nose-hum, tongue never touches" },
          { ur: "نہیں", tr: "nahīṉ", en: "no", spell: "nuh-hee + nasal hum" },
          { ur: "میں", tr: "maiṉ", en: "I / me", spell: "'meh' through the nose" },
        ],
        links: [
          { label: "▶ YouTube: nasal vowels in Urdu/Hindi", url: "https://www.youtube.com/results?search_query=nasal+vowels+hindi+urdu+pronunciation" },
          { label: "📖 Wikipedia: nasal vowels (with audio)", url: "https://en.wikipedia.org/wiki/Nasal_vowel" },
        ],
      },
    ],
    funFacts: [
      "English speakers make the Urdu tapped r thousands of times a day without knowing it — every fast “butter”, “water”, and “ladder” contains it. The sound isn't new; only its address is.",
      "The retroflex ٹ ڈ ڑ don't exist in Arabic or Persian — the subcontinent added them, marking the letters with a tiny ط on top. When you nail them, you sound South Asian, not Middle Eastern.",
      "Aspiration is why 'Pakistan' said by a native speaker sounds different from the English version: the P is unaspirated — no puff — while English blasts it.",
    ],
  },
];
