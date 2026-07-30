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
  {
    id: "L6",
    title: "Sawalat · Question Words",
    subtitle: "Ask anything — the seven little keys",
    intro:
      "Question words are the highest-value words in any language: seven of them unlock every conversation. Urdu's all start with k — and with 'kahāṉ hai?' you can find anything on Earth.",
    items: [
      { ur: "کیا", tr: "kyā", en: "what", note: "Also turns any sentence into a yes/no question — see the fun fact." },
      { ur: "کون", tr: "kaun", en: "who", note: "" },
      { ur: "کہاں", tr: "kahāṉ", en: "where", note: "The single most useful question word for a traveller." },
      { ur: "کب", tr: "kab", en: "when", note: "" },
      { ur: "کیوں", tr: "kyūṉ", en: "why", note: "Every Urdu-speaking toddler's favourite word." },
      { ur: "کیسے", tr: "kaise", en: "how", note: "'Kaise haiṉ āp?' — another way to ask how someone is." },
      { ur: "کتنا", tr: "kitnā", en: "how much", note: "You met its plural 'kitne' at the bazaar in Level 5." },
      { ur: "یہاں", tr: "yahāṉ", en: "here", note: "" },
      { ur: "وہاں", tr: "wahāṉ", en: "there", note: "kahāṉ–yahāṉ–wahāṉ: where–here–there. A rhyming set." },
      { ur: "باتھ روم کہاں ہے؟", tr: "bāthrūm kahāṉ hai?", en: "Where is the bathroom?", note: "Pattern: ___ kahāṉ hai? = where is ___? Works for everything." },
    ],
    funFacts: [
      "Start any statement with <em>kyā</em> and it becomes a yes/no question: “āp ṭhīk haiṉ” (you're fine) → “kyā āp ṭhīk haiṉ?” (are you fine?). One word, instant question — no rearranging like English.",
      "English question words cluster on <strong>wh-</strong> (who, what, where); Urdu's cluster on <strong>k-</strong> (kaun, kyā, kahāṉ). Same convergent evolution, different letter.",
      "The rhyme trio <em>kahāṉ / yahāṉ / wahāṉ</em> (where / here / there) is your free gift: learn one, get three.",
    ],
  },
  {
    id: "L7",
    title: "Kaam · Essential Verbs",
    subtitle: "Eat, drink, go, come — the engines of every sentence",
    intro:
      "Corpus research says a handful of verbs power most daily speech. Here are Urdu's core eight, plus the sentence pattern that runs them. Remember the golden rule from Level 2: the verb always parks at the END.",
    items: [
      { ur: "کھانا", tr: "khānā", en: "to eat", note: "Yes — the same word as 'food' from Level 5. Context decides." },
      { ur: "پینا", tr: "pīnā", en: "to drink", note: "" },
      { ur: "جانا", tr: "jānā", en: "to go", note: "" },
      { ur: "آنا", tr: "ānā", en: "to come", note: "" },
      { ur: "دیکھنا", tr: "dekhnā", en: "to see / watch", note: "'Dekho!' — look! You'll hear it constantly." },
      { ur: "کرنا", tr: "karnā", en: "to do", note: "The workhorse: pairs with nouns to make new verbs — kām karnā (to work)." },
      { ur: "بولنا", tr: "bolnā", en: "to speak", note: "From Level 2's 'āhista boliye' — now you own the verb itself." },
      { ur: "سمجھنا", tr: "samajhnā", en: "to understand", note: "" },
      { ur: "میں بازار جا رہا ہوں", tr: "maiṉ bāzār jā rahā hūṉ", en: "I am going to the bazaar", note: "SOV in action: 'I bazaar going am.' Verb last, always." },
      { ur: "مجھے سمجھ نہیں آیا", tr: "mujhe samajh nahīṉ āyā", en: "I didn't understand", note: "The honest learner's best sentence. Deploy freely." },
    ],
    funFacts: [
      "Every Urdu infinitive ends in <strong>-nā</strong>: khānā, pīnā, jānā, ānā. Spot a -nā, you've spotted a verb. English wishes it were this organised.",
      "<em>Karnā</em> (to do) is Urdu's LEGO brick: <em>kām karnā</em> (work-do = to work), <em>fon karnā</em> (phone-do = to call), <em>maaf karnā</em> (forgive-do = to forgive). Learn one verb, unlock dozens.",
      "Urdu word order is basically Yoda's: “maiṉ chāy pī rahā hūṉ” = “I tea drinking am.” Embrace the inner Yoda and the grammar clicks.",
    ],
  },
  {
    id: "L8",
    title: "Waqt · Time & Days",
    subtitle: "Today, tomorrow, and the word that means both",
    intro:
      "Time words let you make plans — and Urdu's are famously efficient: one word covers both yesterday AND tomorrow, and context does the rest. Combine these with Level 7 verbs: 'maiṉ kal ā rahā hūṉ' — I'm coming tomorrow.",
    items: [
      { ur: "آج", tr: "āj", en: "today", note: "" },
      { ur: "کل", tr: "kal", en: "yesterday AND tomorrow", note: "One word, both directions — the verb tense tells you which. See the fun fact." },
      { ur: "پرسوں", tr: "parsoṉ", en: "two days away (either direction)", note: "Same trick as kal, one day further out." },
      { ur: "صبح", tr: "subah", en: "morning", note: "'Subah bakhair' — good morning." },
      { ur: "دوپہر", tr: "dopahar", en: "afternoon", note: "Literally 'two watches' — old-school timekeeping." },
      { ur: "شام", tr: "shām", en: "evening", note: "" },
      { ur: "رات", tr: "rāt", en: "night", note: "'Shab bakhair' — good night (shab is the poetic word for rāt)." },
      { ur: "ابھی", tr: "abhī", en: "right now", note: "'Abhī abhī' doubled = just this second." },
      { ur: "بعد میں", tr: "baad meṉ", en: "later", note: "The polite way to dodge anything." },
      { ur: "ہفتہ", tr: "hafta", en: "week (also Saturday)", note: "From Persian haft, seven — a week of seven days." },
      { ur: "جمعہ", tr: "jumma", en: "Friday", note: "The week's big day — 'Jumma Mubarak!' greetings fly every Friday." },
    ],
    funFacts: [
      "<em>Kal</em> means yesterday OR tomorrow — the verb disambiguates: “kal maiṉ gayā” (yesterday I went) vs “kal maiṉ jāūṉgā” (tomorrow I'll go). Urdu treats time as distance from today, not direction. <em>Parsoṉ</em> does the same at two days.",
      "<em>Dopahar</em> (afternoon) literally means 'two <em>pahars</em>' — a pahar is an ancient three-hour watch of the day. The old eight-watch clock still hides inside everyday words.",
      "Many Urdu day-names count in Persian: <em>do-shamba</em>, <em>se-shamba</em>… but Friday is <em>jumma</em> (from Arabic 'gathering') — the day everyone meets.",
    ],
  },
  {
    id: "L9",
    title: "Rang aur Pasand · Colors & Likes",
    subtitle: "Say what you love — in full color",
    intro:
      "Research on vocabulary retention is clear: words stick when they're about YOU. This level gives you colors plus the 'pasand hai' pattern — from here on, you can state a preference about anything you've learned.",
    items: [
      { ur: "لال", tr: "lāl", en: "red", note: "Also means 'ruby' and 'darling' — a very affectionate color." },
      { ur: "نیلا", tr: "nīlā", en: "blue", note: "" },
      { ur: "ہرا", tr: "harā", en: "green", note: "The color of Pakistan's flag — 'sabz' is its Persian twin." },
      { ur: "پیلا", tr: "pīlā", en: "yellow", note: "" },
      { ur: "کالا", tr: "kālā", en: "black", note: "" },
      { ur: "سفید", tr: "safed", en: "white", note: "" },
      { ur: "گلابی", tr: "gulābī", en: "pink", note: "Literally 'rose-colored' — from gulāb, rose." },
      { ur: "رنگ", tr: "rang", en: "color", note: "As in Holi's 'rang' — and 'rangīn', colorful." },
      { ur: "مجھے نیلا رنگ پسند ہے", tr: "mujhe nīlā rang pasand hai", en: "I like (the color) blue", note: "Pattern: mujhe ___ pasand hai = I like ___." },
      { ur: "مجھے چائے پسند ہے", tr: "mujhe chāy pasand hai", en: "I like tea", note: "Levels 5 + 9, one sentence. It's all one language now." },
      { ur: "آپ کو کیا پسند ہے؟", tr: "āp ko kyā pasand hai?", en: "What do you like?", note: "Level 6's kyā earning its keep. Ask everyone." },
    ],
    funFacts: [
      "“Mujhe chāy pasand hai” is literally “to-me tea pleasing is” — likes work like Spanish <em>gustar</em>: the thing you love does the verb, you just receive the feeling. Very romantic grammar.",
      "<em>Gulābī</em> (pink) comes from <em>gulāb</em> (rose), which is Persian for 'rose water' — gul (flower) + āb (water). Inside the word for pink there's a whole garden.",
      "<em>Mehndi</em> green, <em>gulābī</em> pink, <em>surkh</em> deep red — wedding season owns half the Urdu color vocabulary.",
    ],
  },
  {
    id: "L10",
    title: "Guftagu · At the Chai Dhaba",
    subtitle: "The capstone: a real conversation, start to finish",
    intro:
      "Graduation scene: a roadside chai dhaba. Every line below uses what you've already built — greetings (L1), questions (L6), numbers (L3), food (L5), time (L8). Play both sides out loud: order the chai, then be the chai-wala. When this flows, you're conversational.",
    items: [
      { ur: "یہاں چائے اچھی ہے؟", tr: "yahāṉ chāy achhī hai?", en: "Is the tea good here?", note: "You, sitting down. L6's yahāṉ + L5's chāy." },
      { ur: "جی ہاں، بہت مزیدار!", tr: "jī hāṉ, bahut mazedār!", en: "Oh yes — very delicious!", note: "Chai-wala, with justified confidence." },
      { ur: "دو چائے دیجیے", tr: "do chāy dījiye", en: "Two teas, please", note: "Dījiye = 'please give' — the polite request ending. L3's do." },
      { ur: "کتنے روپے؟", tr: "kitne rupaye?", en: "How many rupees?", note: "Rupaye — the currency. L5's kitne, now with money." },
      { ur: "سو روپے", tr: "sau rupaye", en: "One hundred rupees", note: "Sau = 100. Your first big number." },
      { ur: "یہ لیجیے", tr: "yeh lījiye", en: "Here you go", note: "Lījiye = 'please take' — dījiye's twin. Hand over the cash." },
      { ur: "بہت شکریہ", tr: "bahut shukriya", en: "Thank you very much", note: "L1 + L5's bahut. Gratitude, upgraded." },
      { ur: "کوئی بات نہیں", tr: "koī bāt nahīṉ", en: "Don't mention it / no problem", note: "Literally 'no matter at all' — the universal de-escalator." },
      { ur: "پھر ملیں گے", tr: "phir mileṉge", en: "We'll meet again", note: "The warm goodbye between people who mean it." },
      { ur: "اللہ حافظ", tr: "Allāh hāfiz", en: "Goodbye (God protect you)", note: "Level 1's fun fact, now in your own mouth. Full circle." },
    ],
    funFacts: [
      "<em>Dījiye</em> (please give) and <em>lījiye</em> (please take) are the -iye ending doing its magic: it turns any verb stem into a gracious request. Boliye (please speak), baiṭhiye (please sit), khāiye (please eat) — instant courtesy.",
      "<em>Koī bāt nahīṉ</em> is the load-bearing phrase of desi politeness: it answers apologies, thanks, and minor disasters alike. Master it and you can absorb almost any social situation.",
      "A <em>dhaba</em> is a roadside eatery — truck-driver canteens that became beloved institutions. The chai is strong, the charpais are creaky, and the conversation is exactly the one you just learned.",
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
  {
    id: "R5",
    title: "Ginti · Urdu Numerals",
    subtitle: "Read prices, plates, and clock faces",
    intro:
      "Urdu has its own digits — you'll meet them on banknotes, truck art, wedding invitations, and old clock faces. Ten shapes and you can read any number in the bazaar. Bonus twist: even inside right-to-left text, numbers run left-to-right.",
    sections: [
      {
        heading: "The ten digits",
        note: "Tap each to hear the number. You already know all the words from Level 3 — these are just their costumes.",
        letters: [
          { ch: "۱", name: "ek", sound: "1" },
          { ch: "۲", name: "do", sound: "2" },
          { ch: "۳", name: "tīn", sound: "3" },
          { ch: "۴", name: "chār", sound: "4" },
          { ch: "۵", name: "pāṉch", sound: "5" },
          { ch: "۶", name: "chhe", sound: "6" },
          { ch: "۷", name: "sāt", sound: "7" },
          { ch: "۸", name: "āṭh", sound: "8" },
          { ch: "۹", name: "nau", sound: "9" },
          { ch: "۱۰", name: "das", sound: "10" },
        ],
      },
      {
        heading: "Read a price tag",
        note: "Real bazaar practice. Numbers read left-to-right even though the words around them read right-to-left.",
        words: [
          { ur: "۵ روپے", tr: "pāṉch rupaye", en: "5 rupees", spell: "digit ۵ + rupaye" },
          { ur: "۱۰ روپے", tr: "das rupaye", en: "10 rupees", spell: "۱ and ۰ — reading left to right" },
          { ur: "۱۰۰ روپے", tr: "sau rupaye", en: "100 rupees", spell: "the chai bill from Level 10" },
        ],
      },
      {
        heading: "Where you'll see them",
        facts: [
          "<strong>Banknotes</strong> — every Pakistani rupee note carries both numeral systems. Pull up a picture of a 100-rupee note and read the ۱۰۰.",
          "<strong>Truck art</strong> — route numbers and phone numbers, painted in loving flourish.",
          "<strong>Dates</strong> — Urdu newspapers print dates in these digits; wedding invitations always do.",
        ],
      },
    ],
    funFacts: [
      "These are the 'Eastern Arabic' numerals — and here's the loop: Europe's 1-2-3 are called 'Arabic numerals' because they arrived via the Arab world from INDIA. The subcontinent invented the system, exported it both ways, and kept its own handwriting.",
      "Inside right-to-left Urdu text, numbers still run left-to-right — your eyes learn to switch direction mid-line without noticing. Readers do it thousands of times a day.",
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
  {
    id: "C2",
    title: "Kahawatain · Proverbs",
    subtitle: "The one-liners every aunty has locked and loaded",
    intro:
      "Proverbs (kahāwateṉ) are Urdu's compressed wisdom — vivid little scenes starring camels, monkeys, and buffaloes that get deployed daily in every household. Drop one at the right moment and you'll earn more respect than a hundred grammatically perfect sentences. Tap each to hear it.",
    sections: [
      {
        heading: "Five proverbs to know",
        note: "Each is a tiny movie. Learn the image and the meaning follows.",
        verse: [
          { ur: "نیکی کر دریا میں ڈال", tr: "nekī kar, daryā meṉ ḍāl", en: "Do a good deed and throw it in the river — do good expecting nothing back" },
          { ur: "ڈوبتے کو تنکے کا سہارا", tr: "ḍūbte ko tinke kā sahārā", en: "To the drowning, even a straw is support — any hope helps in desperation" },
          { ur: "بندر کیا جانے ادرک کا سواد", tr: "bandar kyā jāne adrak kā swād", en: "What does a monkey know of ginger's taste — pearls before swine" },
          { ur: "جس کی لاٹھی اس کی بھینس", tr: "jis kī lāṭhī, us kī bhaiṉs", en: "Whoever holds the stick owns the buffalo — might makes right" },
          { ur: "اونٹ کے منہ میں زیرہ", tr: "ūṉṭ ke muṉh meṉ zīrā", en: "Cumin in a camel's mouth — a laughably small portion" },
        ],
        credit: "— traditional kahāwateṉ, polished by centuries of aunties",
      },
      {
        heading: "How to deploy a proverb",
        facts: [
          "Timing is everything: a proverb lands after the situation is obvious to everyone. Cousin got a tiny slice of cake? <em>“Ūṉṭ ke muṉh meṉ zīrā.”</em> Room nods sagely.",
          "Notice L6's <em>kyā</em> inside the monkey proverb — 'bandar KYĀ jāne' (what would a monkey know). Your question words moonlight in rhetorical flourishes.",
          "Proverbs are also pronunciation gyms: <em>ḍūbte</em> opens with a retroflex ḍ, <em>bhaiṉs</em> ends on a nasal — Sound School's greatest hits in the wild.",
        ],
      },
    ],
    funFacts: [
      "Urdu proverb-dropping is a competitive sport at family gatherings: the elder who lands the most apt kahāwat wins the room. There is no trophy; the trophy is the sage nodding.",
      "Many kahāwateṉ exist nearly word-for-word across Urdu, Hindi, and Punjabi — proof that the subcontinent's grandmothers have been running a shared wisdom network for centuries.",
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
  { need: 3, name: "Shagird · Apprentice", ur: "شاگرد" },
  { need: 6, name: "Parhaku · Bookworm", ur: "پڑھاکو" },
  { need: 9, name: "Hoshiyar · Whiz", ur: "ہوشیار" },
  { need: 13, name: "Ustaadh · Master", ur: "استاد" },
  { need: 18, name: "Ustaadh-e-Azam · Grand Master", ur: "استاد اعظم" },
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
