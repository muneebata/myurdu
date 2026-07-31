// ─────────────────────────────────────────────────────────────
// Urdu Seekho — curriculum data
// Speaking track: 5 levels, each builds on the last.
// Reading track: 4 units teaching the Nastaliq script from zero.
// ─────────────────────────────────────────────────────────────

const LEVELS = [
  {
    id: "L1",
    title: "Salaam! · Greetings",
    urName: "سلام",
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
    urName: "ملاقات",
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
    urName: "گنتی",
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
    urName: "خاندان",
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
    urName: "کھانا",
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
    urName: "سوالات",
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
    urName: "کام",
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
    urName: "وقت",
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
    urName: "رنگ",
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
    urName: "گفتگو",
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
  {
    id: "L11",
    title: "Raste · Places & Directions",
    urName: "راستے",
    subtitle: "Get anywhere: left, right, straight, and 'where is…?'",
    intro:
      "Level 6 gave you 'kahāṉ hai?' — now you can understand the answer. Directions plus the places you'll actually ask about. Practice pointing while you say them; your hands learn Urdu too.",
    items: [
      { ur: "دائیں", tr: "dāeṉ", en: "right", note: "" },
      { ur: "بائیں", tr: "bāeṉ", en: "left", note: "Rhymes with dāeṉ — and both end in Sound School's nasal hum." },
      { ur: "سیدھا", tr: "sīdhā", en: "straight ahead", note: "'Sīdhā jāeṉ' — go straight. The answer to most direction questions." },
      { ur: "قریب", tr: "qarīb", en: "near", note: "Starts with Sound School's deep ق." },
      { ur: "دور", tr: "dūr", en: "far", note: "" },
      { ur: "بازار", tr: "bāzār", en: "market / bazaar", note: "English borrowed this one too — via Persian." },
      { ur: "ہسپتال", tr: "haspatāl", en: "hospital", note: "English 'hospital' in an Urdu outfit — you already know it." },
      { ur: "اسٹیشن", tr: "isṭeshan", en: "station", note: "Same trick: listen and you'll hear 'station'." },
      { ur: "مسجد", tr: "masjid", en: "mosque", note: "" },
      { ur: "اسٹیشن کہاں ہے؟", tr: "isṭeshan kahāṉ hai?", en: "Where is the station?", note: "L6's pattern with L11's places. Ask with confidence." },
      { ur: "دائیں مڑیں", tr: "dāeṉ muṛeṉ", en: "turn right", note: "Muṛeṉ = please turn — with the retroflex flap ڑ you trained for." },
    ],
    funFacts: [
      "Urdu absorbed English infrastructure words wholesale — <em>isṭeshan</em>, <em>haspatāl</em>, <em>bas asṭāp</em>. Colonial railways left their vocabulary parked all over the language. If you're lost, half the words you need are English wearing a shalwar kameez.",
      "Notice loanwords grow a leading <em>i-</em>: station → <em>isṭeshan</em>, school → <em>iskūl</em>. Urdu phonology dislikes starting words with 'st' or 'sk', so it politely adds a vowel ramp.",
      "Directions come with a bonus workout: <em>muṛeṉ</em> (turn) uses the retroflex flap ڑ, and <em>dāeṉ/bāeṉ</em> end in nasal hums. Asking for directions IS Sound School revision.",
    ],
  },
  {
    id: "L12",
    title: "Mausam · Weather",
    urName: "موسم",
    subtitle: "The world's most reliable small talk",
    intro:
      "Weather talk opens conversations in every language — and in Urdu it comes with real drama: loo winds, monsoons, and winters people wait all year for. Pattern of the level: 'āj ___ hai' (today it's ___).",
    items: [
      { ur: "موسم", tr: "mausam", en: "weather / season", note: "Also gave English the word 'monsoon', via Arabic mawsim." },
      { ur: "گرمی", tr: "garmī", en: "heat / summer", note: "" },
      { ur: "سردی", tr: "sardī", en: "cold / winter", note: "Garmī–sardī: the two poles of desi life." },
      { ur: "بارش", tr: "bārish", en: "rain", note: "" },
      { ur: "دھوپ", tr: "dhūp", en: "sunshine", note: "Aspirated dh — palm up, feel the puff." },
      { ur: "ہوا", tr: "havā", en: "wind / air", note: "" },
      { ur: "بادل", tr: "bādal", en: "clouds", note: "" },
      { ur: "آج گرمی ہے", tr: "āj garmī hai", en: "It's hot today", note: "L8's āj + L12's garmī. The pattern for all weather." },
      { ur: "بارش ہو رہی ہے", tr: "bārish ho rahī hai", en: "It's raining", note: "Literally 'rain is happening' — weather 'happens' in Urdu." },
      { ur: "کیا خوبصورت موسم ہے!", tr: "kyā khūbsūrat mausam hai!", en: "What beautiful weather!", note: "Kyā as an exclamation — 'what a…!' Bonus use of your L6 word." },
    ],
    funFacts: [
      "English took <em>monsoon</em> from the same root as <em>mausam</em> — Arabic <em>mawsim</em>, 'season'. In South Asia the monsoon isn't background weather; it's a season-long event with its own songs, foods (pakoras are mandatory), and poetry.",
      "The first monsoon rain after months of garmī has its own vocabulary: the smell of rain on dry earth even has a borrowed name in English — 'petrichor' — but desi kids just call the whole ritual 'barish!' and run outside.",
      "<em>Kyā</em> moonlights again: at the front of an exclamation it means 'what a…!' — <em>kyā bāt hai!</em> (literally 'what a thing!') is the everyday phrase for 'wonderful!' or 'well said!'",
    ],
  },
  {
    id: "L13",
    title: "Dil ki Batain · Feelings & Small Talk",
    urName: "دل کی باتیں",
    subtitle: "Say how you are — and bless like a local",
    intro:
      "The words that make you sound human instead of textbook: feelings, hunger, and the blessing-words (mashāAllah, inshāAllah) that pepper every real Urdu conversation. This is the level that makes aunties adopt you.",
    items: [
      { ur: "خوش", tr: "khush", en: "happy", note: "As in khushī (happiness) — the root of English 'cushy'!" },
      { ur: "اداس", tr: "udās", en: "sad", note: "The mood of every great ghazal." },
      { ur: "تھکا ہوا", tr: "thakā huā", en: "tired (male speaker)", note: "Women say 'thakī huī' — gender agreement again." },
      { ur: "مجھے بھوک لگی ہے", tr: "mujhe bhūk lagī hai", en: "I'm hungry", note: "Literally 'hunger has attached to me' — very vivid." },
      { ur: "مجھے پیاس لگی ہے", tr: "mujhe pyās lagī hai", en: "I'm thirsty", note: "Same pattern: thirst attaches." },
      { ur: "سب ٹھیک ہے؟", tr: "sab ṭhīk hai?", en: "Is everything okay?", note: "Sab = everything/everyone. The caring check-in." },
      { ur: "ماشاءاللہ", tr: "mashāAllah", en: "wonderful! (lit. 'as God willed')", note: "Said when praising — babies, grades, biryani. Protects from the evil eye." },
      { ur: "ان شاءاللہ", tr: "inshāAllah", en: "God willing / hopefully", note: "Attaches to any future plan. Also the world's politest 'maybe'." },
      { ur: "شاباش", tr: "shābāsh", en: "well done! bravo!", note: "The app has been saying it to you since Level 1." },
      { ur: "کوئی بات نہیں، سب ٹھیک ہے", tr: "koī bāt nahīṉ, sab ṭhīk hai", en: "No worries, everything's fine", note: "L10's comfort phrase + L13's sab ṭhīk. Instant reassurance." },
    ],
    funFacts: [
      "<em>InshāAllah</em> officially means 'God willing' — but every desi child knows that 'inshāAllah, we'll see' from a parent means the theme-park trip is never happening. Learn the word AND its diplomatic uses.",
      "<em>MashāAllah</em> does double duty: praise plus protection. Complimenting a baby without it can earn you a sharp look — the word shields the praised from nazar (the evil eye).",
      "Hunger and thirst 'attach' to you in Urdu (<em>bhūk lagī hai</em>), the same grammar as liking things (<em>pasand hai</em>, L9). Feelings in Urdu are things that happen TO you — grammatically, you're never to blame.",
    ],
  },
  {
    id: "L14",
    title: "Mazi · Yesterday's Stories",
    urName: "ماضی",
    subtitle: "The past tense — kal finally picks a direction",
    intro:
      "Since Level 8 you've known that kal means yesterday AND tomorrow. Today the mystery resolves: the verb decides. Learn a handful of past forms and suddenly you can tell stories — which is most of what conversation is.",
    items: [
      { ur: "تھا", tr: "thā", en: "was (male speaker)", note: "Maiṉ wahāṉ thā — I was there." },
      { ur: "تھی", tr: "thī", en: "was (female speaker)", note: "Same sentence, thī for women — past agrees with gender." },
      { ur: "تھے", tr: "the", en: "were (plural / respectful)", note: "Āp always gets the — respect is plural in Urdu." },
      { ur: "کل میں بازار گیا", tr: "kal maiṉ bāzār gayā", en: "Yesterday I went to the bazaar (m)", note: "THE kal payoff: gayā is past, so kal must mean yesterday." },
      { ur: "کل میں بازار گئی", tr: "kal maiṉ bāzār gaī", en: "Yesterday I went to the bazaar (f)", note: "gayā → gaī. Your verbs introduce you." },
      { ur: "وہ آیا", tr: "woh āyā", en: "he came", note: "And woh āī — she came." },
      { ur: "میں نے کھانا کھایا", tr: "maiṉ ne khānā khāyā", en: "I ate food", note: "Meet 'ne' — the little past-tense marker. Learn the phrase whole for now." },
      { ur: "میں نے فلم دیکھی", tr: "maiṉ ne film dekhī", en: "I watched a film", note: "Another ne chunk — notice dekhī agrees with film (f)." },
      { ur: "بہت مزہ آیا", tr: "bahut mazā āyā", en: "It was great fun", note: "Literally 'much fun came'. The standard verdict on any good evening." },
      { ur: "آپ کہاں تھے؟", tr: "āp kahāṉ the?", en: "Where were you?", note: "L6's kahāṉ + today's the. The classic aunty opener." },
    ],
    funFacts: [
      "The <em>kal</em> mystery, solved: “kal maiṉ gayā” (past verb → yesterday) vs “kal maiṉ jāūṉgā” (future verb → tomorrow). Urdu trusts the verb to carry the calendar.",
      "Past-tense verbs agree with gender — <em>gayā</em> (m) vs <em>gaī</em> (f) — so a single sentence quietly introduces its speaker. Novelists love this; language learners get used to it fast.",
      "That little <em>ne</em> (میں نے) is Urdu's famous ergative marker — it appears with 'doing' verbs in the past. Every textbook devotes a scary chapter to it; every learner masters it by just using phrases like <em>maiṉ ne khāyā</em> until it feels natural. Do that.",
    ],
  },
  {
    id: "L15",
    title: "Mustaqbil · Tomorrow's Plans",
    urName: "مستقبل",
    subtitle: "The future tense — and kal pays off twice",
    intro:
      "The future is friendly: verb + gā (m) / gī (f) / ge (plural), agreeing just like colors did in Level 9. With it comes the other half of the kal trick — and the most famous protest poem in Urdu.",
    items: [
      { ur: "میں جاؤں گا", tr: "maiṉ jāūṉgā", en: "I will go (m)", note: "" },
      { ur: "میں جاؤں گی", tr: "maiṉ jāūṉgī", en: "I will go (f)", note: "gā → gī, same pattern as the past." },
      { ur: "میں کل آؤں گا", tr: "maiṉ kal āūṉgā", en: "I'll come tomorrow", note: "Future verb → kal means tomorrow. The trick, mastered." },
      { ur: "ہم چائے پئیں گے", tr: "ham chāy pīeṉge", en: "We'll drink chai", note: "Ham = we. Arguably Urdu's most inevitable sentence." },
      { ur: "کیا آپ آئیں گے؟", tr: "kyā āp āeṉge?", en: "Will you come?", note: "L6's kyā question trick, now aimed at the future." },
      { ur: "میں اردو سیکھوں گا", tr: "maiṉ urdū sīkhūṉgā", en: "I will learn Urdu", note: "A promise you're already keeping." },
      { ur: "ہم دیکھیں گے", tr: "ham dekheṉge", en: "We shall see", note: "Also the title of Faiz's legendary poem — see the fun fact." },
      { ur: "انشاءاللہ کل ملیں گے", tr: "inshāAllah kal mileṉge", en: "God willing, we'll meet tomorrow", note: "L13's inshāAllah + today's future = how plans are actually made." },
    ],
    funFacts: [
      "Future endings agree like adjectives: <em>jāūṉgā</em> (m), <em>jāūṉgī</em> (f), <em>jāeṉge</em> (plural/respect). One rule, whole tense.",
      "“Ham Dekhenge” — 'We shall see' — is Faiz Ahmed Faiz's protest anthem, sung from Lahore stadiums to student marches for forty years. You just conjugated its title.",
      "Attaching <em>inshāAllah</em> to future plans isn't just piety — it's grammar-adjacent culture. A bare 'I will come' sounds oddly overconfident to desi ears; inshāAllah softens fate itself.",
    ],
  },
  {
    id: "L16",
    title: "Mat Karo · No, Don't, Stop",
    urName: "منع",
    subtitle: "Negation and commands — with courtesy built in",
    intro:
      "Saying no, telling people what (not) to do, and doing both politely. Urdu builds respect directly into command endings — the -iye you met at the chai dhaba runs the whole system.",
    items: [
      { ur: "مت", tr: "mat", en: "don't (with commands)", note: "The command-negator: mat jāo — don't go." },
      { ur: "مت جاؤ", tr: "mat jāo", en: "Don't go!", note: "Every Bollywood/Lollywood climax in one phrase." },
      { ur: "رکو", tr: "ruko", en: "Stop! / Wait!", note: "" },
      { ur: "آؤ", tr: "āo", en: "Come!", note: "Casual tum-level command. Āiye for āp-level." },
      { ur: "بیٹھیے", tr: "baiṭhiye", en: "Please sit", note: "The -iye courtesy ending from Level 10 — every host's first word." },
      { ur: "سنیے", tr: "suniye", en: "Please listen / excuse me", note: "The universal polite summons — how you call a waiter or begin a request." },
      { ur: "مجھے نہیں پتہ", tr: "mujhe nahīṉ patā", en: "I don't know", note: "Top-five most useful sentence in the language. Deploy honestly." },
      { ur: "کوئی مسئلہ نہیں", tr: "koī mas'alah nahīṉ", en: "No problem", note: "Sibling of L10's koī bāt nahīṉ." },
      { ur: "فکر مت کرو", tr: "fikr mat karo", en: "Don't worry", note: "Fikr = worry. The phrase that ends most desi phone calls." },
      { ur: "نہیں چاہیے", tr: "nahīṉ chāhiye", en: "(I) don't want/need it", note: "L5's chāhiye, negated — bazaar armor." },
    ],
    funFacts: [
      "Commands come in three courtesies matching the three 'you's: <em>jā</em> (tū — blunt), <em>jāo</em> (tum — casual), <em>jāiye</em> (āp — gracious). The verb ending does your bowing for you.",
      "<em>Suniye</em> — literally 'please listen' — is the all-purpose polite attention-getter: waiters, shopkeepers, strangers, spouses. Urdu's answer to 'excuse me', but warmer.",
      "<em>Nahīṉ</em> parks right before the verb: “maiṉ nahīṉ jāūṉgā” — I will NOT go. Negation slots into every tense you now own.",
    ],
  },
  {
    id: "L17",
    title: "Bari Ginti · Big Numbers",
    urName: "بڑی گنتی",
    subtitle: "11 to 100 — landmarks through the beautiful chaos",
    intro:
      "Level 3 warned you: Urdu numbers 1–100 are all irregular. Nobody memorizes all hundred at once — you learn the landmarks and the halves system, and bazaar math takes care of the rest.",
    items: [
      { ur: "گیارہ", tr: "gyārah", en: "eleven", note: "" },
      { ur: "بارہ", tr: "bārah", en: "twelve", note: "" },
      { ur: "پندرہ", tr: "pandrah", en: "fifteen", note: "" },
      { ur: "بیس", tr: "bīs", en: "twenty", note: "" },
      { ur: "پچیس", tr: "pachchīs", en: "twenty-five", note: "The quarter-century landmark — and a common price." },
      { ur: "تیس", tr: "tīs", en: "thirty", note: "" },
      { ur: "چالیس", tr: "chālīs", en: "forty", note: "" },
      { ur: "پچاس", tr: "pachās", en: "fifty", note: "" },
      { ur: "سو", tr: "sau", en: "one hundred", note: "Your chai bill from Level 10." },
      { ur: "ڈیڑھ", tr: "ḍeṛh", en: "one and a half", note: "Yes — 1.5 has its own dedicated word. See the fun fact." },
      { ur: "ساڑھے", tr: "sāṛhe", en: "…and a half", note: "Sāṛhe tīn = 3.5. Also how clocks work: sāṛhe pāṉch = 5:30." },
    ],
    funFacts: [
      "All hundred numbers are genuinely irregular — 87 is <em>satāsī</em>, 88 is <em>aṭṭhāsī</em>, and even native speakers pause at 79. Learn the tens, point at the rest.",
      "Urdu runs a halves system English lacks: <em>ḍeṛh</em> (1.5) and <em>ḍhāī</em> (2.5) are their own words, and <em>sāṛhe</em> makes any number half-more. 'Ḍeṛh sau' (150) beats saying 'one hundred fifty' every time.",
      "<em>Sāṛhe</em> is how time works: sāṛhe chhe = 6:30. Master it and you can schedule chai — which is the true purpose of clocks.",
    ],
  },
  {
    id: "L18",
    title: "Shaadi Mein · At the Wedding",
    urName: "شادی",
    subtitle: "The grand capstone — survive and shine as a wedding guest",
    intro:
      "The final exam is a shaadi. Blessings, small talk with rishtedaar, the eternal food question, and a firm refusal to dance — every tense and trick from eighteen levels, deployed where it matters most. Play both sides out loud.",
    items: [
      { ur: "شادی مبارک ہو!", tr: "shādī mubārak ho!", en: "Congratulations on the wedding!", note: "Your entrance line. L13's mubārak, upgraded to an occasion." },
      { ur: "آپ دلہن کی طرف سے ہیں؟", tr: "āp dulhan kī taraf se haiṉ?", en: "Are you from the bride's side?", note: "Dulhan = bride. The shaadi ice-breaker." },
      { ur: "میں دولہا کا دوست ہوں", tr: "maiṉ dūlhā kā dost hūṉ", en: "I'm the groom's friend", note: "Dūlhā = groom, dost from L4. Now you belong." },
      { ur: "بہت خوبصورت شادی ہے", tr: "bahut khūbsūrat shādī hai", en: "It's a beautiful wedding", note: "Khūbsūrat from L12's weather exclamation — recycled for maximum aunty-approval." },
      { ur: "مہندی کل تھی", tr: "mehndī kal thī", en: "The mehndi was yesterday", note: "L14 past + P2's mehndī. Kal = yesterday here — you know why." },
      { ur: "ولیمہ پرسوں ہوگا", tr: "walīmah parsoṉ hogā", en: "The walima is the day after tomorrow", note: "Future hogā + L8's parsoṉ. The three-event timeline, mastered." },
      { ur: "کھانا کب ملے گا؟", tr: "khānā kab milegā?", en: "When will the food come?", note: "The true national anthem of wedding guests. L6 kab + future." },
      { ur: "بریانی مزیدار ہے", tr: "biryānī mazedār hai", en: "The biryani is delicious", note: "Say it whether or not there's aloo. Peace matters." },
      { ur: "ناچیے!", tr: "nāchiye!", en: "Dance, please!", note: "The -iye courtesy, weaponized by aunties." },
      { ur: "میں نہیں ناچوں گا", tr: "maiṉ nahīṉ nāchūṉgā", en: "I will NOT dance", note: "L16 negation + L15 future. A complete, doomed sentence." },
    ],
    funFacts: [
      "“Khānā kab milegā?” is whispered at every shaadi on Earth roughly forty minutes after arrival. You now whisper it grammatically.",
      "The event sequence you can now narrate in three tenses: <em>mehndī kal thī</em> (past), <em>shādī āj hai</em> (present), <em>walīmah parsoṉ hogā</em> (future). Eighteen levels, one sentence family.",
      "Declaring <em>maiṉ nahīṉ nāchūṉgā</em> has never once prevented the dancing. The aunties always win. Consider it your final listening exercise.",
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
        img: { src: "images/calligraphy.jpg", alt: "Nastaliq calligraphy artwork", caption: "An illuminated master-calligraphy piece whose words literally read khatt-e Nastaliq — 'the Nastaliq script'. Finish this track and you can read it yourself.", credit: "Photo: \u0641\u0631\u0632\u0627\u0646 \u06a9\u0631\u0645\u0627\u0646\u06cc \u0646\u0698\u0627\u062f at Persian Wikipedia \u00b7 public domain \u00b7 via Wikimedia Commons" },
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
  {
    id: "R6",
    title: "Board Parhiye · Signboards",
    subtitle: "Read the street like a local",
    intro:
      "Final reading test: the street itself. These are the words painted on shop shutters, gates, and bus stops across Pakistan. Half are English loanwords in Nastaliq disguise — sound them out and grin when they turn into words you already knew.",
    sections: [
      {
        heading: "Signs you'll actually see",
        note: "Tap to hear. Imagine each one hand-painted on a shutter in truck-art colors.",
        words: [
          { ur: "کھلا ہے", tr: "khulā hai", en: "OPEN", spell: "the shopkeeper's welcome" },
          { ur: "بند ہے", tr: "band hai", en: "CLOSED", spell: "come back after chai" },
          { ur: "دکان", tr: "dukān", en: "shop", spell: "dāl + kāf + alif + nūn" },
          { ur: "خطرہ", tr: "khatrah", en: "DANGER", spell: "starts with Sound School's خ rasp" },
          { ur: "بس اسٹاپ", tr: "bas asṭāp", en: "bus stop", spell: "sound it out — it's English!" },
          { ur: "اسکول", tr: "iskūl", en: "school", spell: "school with Urdu's 'i-' ramp" },
          { ur: "ہسپتال", tr: "haspatāl", en: "hospital", spell: "your L11 word, on a real sign" },
          { ur: "خوش آمدید", tr: "khush āmdīd", en: "WELCOME", spell: "khush (happy, L13) + āmdīd (arrival) — painted over every gate" },
        ],
      },
      {
        heading: "Reader's field notes",
        facts: [
          "Shop signs love the word order <span class='ur-inline'>دکان</span> + owner's name — 'Bilal General Store' becomes a bilingual mashup, English and Nastaliq sharing one board.",
          "<strong>خوش آمدید</strong> (welcome) arches over wedding halls, motorway toll gates, and truck bumpers alike. It's the phrase most likely to greet you in beautiful calligraphy.",
          "Once you can read <em>bas asṭāp</em> and <em>iskūl</em>, you've unlocked the secret: a huge share of urban signage is just English, lovingly transliterated. Reading Pakistan is easier than it looks.",
        ],
      },
    ],
    funFacts: [
      "Pakistani truck art turns signboards into a folk-art form — trucks carry couplets, blessings (mashāAllah, buri nazar wale tera muhn kala!), and portraits in riotous color. Reading Nastaliq unlocks an entire moving art gallery.",
      "Hand-painted signage survived in Pakistan long after vinyl printing arrived — master khattāt (calligraphers) still paint Nastaliq by brush, and you can spot the human hand in every stroke.",
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
    cover: "لب پہ آتی ہے دعا",
    subtitle: "The verses every Urdu speaker grew up on",
    intro:
      "Language lives in its poetry. These are the lines Pakistani kids sing at school assembly, the rhymes their parents taught them, and a taste of the ghazal tradition. Tap any line to hear it — poems are the best pronunciation coaches.",
    sections: [
      {
        heading: "Lab pe aati hai dua — the school-assembly prayer",
        img: { src: "images/iqbal.jpg", alt: "Portrait of Allama Muhammad Iqbal", caption: "Allama Iqbal \u2014 the poet-philosopher every Pakistani schoolchild recites each morning.", credit: "Photo: Iqbal Academy Pakistan \u00b7 public domain \u00b7 via Wikimedia Commons" },
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
        img: { src: "images/ghalib.jpg", alt: "Photograph of Mirza Ghalib wearing a tall cap", caption: "Mirza Ghalib himself, photographed in Delhi in the 1860s.", credit: "Photo: unknown (1860s) \u00b7 public domain \u00b7 via Wikimedia Commons" },
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
    cover: "اونٹ کے منہ میں زیرہ",
    subtitle: "The one-liners every aunty has locked and loaded",
    intro:
      "Proverbs (kahāwateṉ) are Urdu's compressed wisdom — vivid little scenes starring camels, monkeys, and buffaloes that get deployed daily in every household. Drop one at the right moment and you'll earn more respect than a hundred grammatically perfect sentences. Tap each to hear it.",
    sections: [
      {
        heading: "Five proverbs to know",
        img: { src: "images/camel.jpg", alt: "Camels in the Thar desert", caption: "Camels of the Thar \u2014 picture handing one of these a single cumin seed.", credit: "Photo: Vyacheslav Argenberg \u00b7 CC BY 4.0 \u00b7 via Wikimedia Commons" },
        note: "Each is a tiny movie. Learn the image and the meaning follows.",
        verse: [
          { ur: "نیکی کر دریا میں ڈال", tr: "nekī kar, daryā meṉ ḍāl", en: "Do a good deed and throw it in the river — do good expecting nothing back", ctx: "A centuries-old folk saying, beloved of elders — offered when you help someone who may never repay you, and that's exactly the point." },
          { ur: "ڈوبتے کو تنکے کا سہارا", tr: "ḍūbte ko tinke kā sahārā", en: "To the drowning, even a straw is support — any hope helps in desperation", ctx: "Traditional Urdu-Persian wisdom, quoted for centuries whenever someone in a desperate spot clutches at the thinnest of hopes." },
          { ur: "بندر کیا جانے ادرک کا سواد", tr: "bandar kyā jāne adrak kā swād", en: "What does a monkey know of ginger's taste — pearls before swine", ctx: "The classic bazaar retort, passed down through generations — deployed when something fine is wasted on someone who can't appreciate it." },
          { ur: "جس کی لاٹھی اس کی بھینس", tr: "jis kī lāṭhī, us kī bhaiṉs", en: "Whoever holds the stick owns the buffalo — might makes right", ctx: "An old saying from rural Punjab's cattle disputes — now quoted about politics, cricket umpires, and anyone who wins by strength alone." },
          { ur: "اونٹ کے منہ میں زیرہ", tr: "ūṉṭ ke muṉh meṉ zīrā", en: "Cumin in a camel's mouth — a laughably small portion", ctx: "A traditional favorite of aunties at dinner tables everywhere — said when a serving is comically too small for the appetite it faces." },
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
  {
    id: "C3",
    title: "Ghazal 101 · Poetry's Crown",
    cover: "دل ناداں تجھے ہوا کیا ہے",
    subtitle: "How Urdu's signature art form actually works",
    intro:
      "You've tasted Ghalib — now learn the machine behind the magic. A ghazal is a chain of self-contained couplets (sher) sharing one meter and one rhyme scheme. Learn two technical words — radif and qafiya — and you'll hear the architecture in every ghazal ever sung.",
    sections: [
      {
        heading: "The rules of the game",
        facts: [
          "<strong>Sher</strong> — a two-line couplet, complete in itself. Each sher is its own tiny story; a ghazal is an anthology, not a narrative.",
          "<strong>Radif</strong> — the identical refrain that ends both lines of the opening couplet, then the second line of every couplet after. The audience hears it coming and often says it WITH the singer.",
          "<strong>Qafiya</strong> — the rhyming word just before the radif. Radif stays fixed; qafiya changes. That tension is the engine of the form.",
          "<strong>Maqta</strong> — the final couplet, where the poet signs the poem by working in their pen name (takhallus).",
        ],
      },
      {
        heading: "Hear the radif — Ghalib's most beloved opening",
        note: "Both lines end in 'kyā hai' — that's the radif. The rhymes before it (huā / dawā) are the qafiya. Tap each line and listen for the pattern.",
        verse: [
          { ur: "دل ناداں تجھے ہوا کیا ہے", tr: "dil-e-nādāṉ tujhe huā kyā hai", en: "Oh naive heart, what has come over you?" },
          { ur: "آخر اس درد کی دوا کیا ہے", tr: "ākhir is dard kī dawā kyā hai", en: "What, after all, is the cure for this pain?" },
        ],
        credit: "— Mirza Ghalib (matla — the opening couplet)",
      },
      {
        heading: "The poet signs off — a maqta",
        note: "Watch Ghalib drop his own name into the final couplet — poetry's original signature move.",
        verse: [
          { ur: "ہیں اور بھی دنیا میں سخنور بہت اچھے", tr: "haiṉ aur bhī dunyā meṉ sukhanwar bahut achhe", en: "There are plenty of fine poets in the world…" },
          { ur: "کہتے ہیں کہ غالب کا ہے اندازِ بیاں اور", tr: "kahte haiṉ ki Ghālib kā hai andāz-e-bayāṉ aur", en: "…but they say Ghalib's way with words is something else entirely" },
        ],
        credit: "— Mirza Ghalib (maqta — yes, he's bragging, and yes, he earned it)",
      },
      {
        heading: "Mushaira survival guide",
        facts: [
          "At a mushā'ira (poetry gathering), applause is verbal: <strong>“wāh wāh!”</strong> for a good line, <strong>“mukarrar!”</strong> (again!) to demand an instant encore of a couplet.",
          "Poets recite the first line slowly, twice, letting the audience savor the setup — then land the second line like a punchline. The pause is the performance.",
          "Ghazals live twice: on the page and in song. Mehdi Hassan, Begum Akhtar, Farida Khanum, and Jagjit Singh made ghazal-singing its own art — 'Ranjish hi sahi' or 'Aaj jane ki zid na karo' are the gateway listens.",
        ],
      },
    ],
    funFacts: [
      "The radif turns audiences into co-performers: everyone knows the refrain is coming, so the whole hall says it together. A ghazal is the only poetry form with a built-in singalong.",
      "Ghalib wrote his greatest work in the 1850s while chronically broke, endlessly witty about it — his letters complain about mangoes, debts, and critics in equal measure. He remains Urdu's most quoted personality, ghost-writing the subcontinent's captions and toasts 170 years on.",
    ],
  },
];

// ─────────────────────────────────────────────────────────────
// Daily game — English words that marched out of Urdu/Hindustani

// ─────────────────────────────────────────────────────────────
// Thora Break — tired of Urdu? Explore Pakistan instead.
// Free-roam modules (no locks): geography, culture, history.
// ─────────────────────────────────────────────────────────────

const PAKISTAN_UNITS = [
  {
    id: "P1",
    title: "Naqsha · Geography",
    postfrom: "from: Gilgit-Baltistan",
    subtitle: "K2, the Indus, and five very different provinces",
    intro:
      "Pakistan runs from the second-highest point on Earth down to the Arabian Sea in under 2,000 km — glaciers to mangroves. Here's the lay of the land (with a few Urdu words smuggled in, because we can't help ourselves).",
    sections: [
      {
        heading: "The big picture",
        mapEmbed: true,
        img: { src: "images/k2.jpg", alt: "K2 seen from base camp with expedition tents below", caption: "K2 from base camp — 8,611 meters of the Savage Mountain.", credit: "Photo: Zacharie Grossen · CC BY-SA 4.0 · via Wikimedia Commons" },
        facts: [
          "<strong>Four provinces + two territories:</strong> Punjab (over half the population), Sindh (Karachi and the coast), Khyber Pakhtunkhwa (the mountain northwest), Balochistan (biggest by far, emptiest by far) — plus Gilgit-Baltistan and Azad Jammu &amp; Kashmir in the high north.",
          "<strong>The Indus is the spine.</strong> Rising near Tibet, it runs the entire length of the country and waters the plains that feed it — the same river that named India, Sindh, AND Hindustan.",
          "<strong>Three mountain ranges collide</strong> in the north — Karakoram, Himalaya, and Hindu Kush meet in Gilgit-Baltistan. Five of the world's fourteen 8,000-meter peaks are in Pakistan.",
          "<strong>K2 (8,611 m)</strong> is Earth's second-highest mountain and, by climbers' reckoning, a harder prize than Everest — nicknamed the Savage Mountain.",
        ],
      },
      {
        heading: "The mountain north, up close",
        img: [
          { src: "images/hunza.jpg", alt: "Hunza Valley terraces and peaks from Eagle's Nest", caption: "Hunza Valley from Eagle's Nest \u2014 orchards under 7,000-meter walls.", credit: "Photo: Alllexxxis \u00b7 CC BY-SA 4.0 \u00b7 via Wikimedia Commons" },
          { src: "images/deosai.jpg", alt: "Treeless green Deosai plateau with snow peaks on the horizon", caption: "The Deosai plateau in summer — treeless, green, and 4,100 meters up.", credit: "Photo: Jameel Ahmed (Hunzographer) · CC BY-SA 4.0 · via Wikimedia Commons" },
        ],        facts: [
          "<strong>Hunza Valley</strong> — apricot orchards under 7,000-meter walls, ancient forts at Baltit and Altit, and legendary longevity lore. The valley floor sits at 2,400 m; the view goes up another five kilometers.",
          "<strong>Nanga Parbat (8,126 m)</strong> — the 'Killer Mountain' anchoring the western Himalaya, with the planet's biggest single vertical rise: the Rupal Face, a 4,600 m wall. Fairy Meadows sits at its feet, named exactly right.",
          "<strong>Deosai Plains</strong> — the world's second-highest plateau (~4,100 m): a summer carpet of wildflowers, home to Himalayan brown bears, snowbound eight months a year.",
          "<strong>The Khunjerab Pass (4,693 m)</strong> — the highest paved international border crossing on Earth, where the Karakoram Highway hands you to China. Border guards play cricket up there in summer.",
        ],
      },
      {
        heading: "Rivers, plains, and the five of Punjab",
        img: { src: "images/indus.jpg", alt: "Sunset over the Indus at the arched Sukkur Barrage", caption: "Sunset on the Indus at the Sukkur Barrage — headworks of the world's largest canal-irrigation system.", credit: "Photo: Ghulam Rasool Shar · CC BY-SA 4.0 · via Wikimedia Commons" },
        facts: [
          "Punjab literally means <em>panj āb</em> — five waters: the Jhelum, Chenab, Ravi, Sutlej, and Beas, all draining into the Indus. The world's largest contiguous canal-irrigation system turns their water into wheat, rice, and mangoes.",
          "<strong>Tarbela Dam</strong> on the Indus is one of the largest earth-filled dams on the planet — a wall of dirt and rock 143 m high, feeding both farms and the power grid.",
          "Where the Indus finally meets the sea, it fans into a delta of <strong>mangrove forests</strong> — nurseries for shrimp and fish, and a natural storm shield for the coast.",
        ],
      },
      {
        heading: "Extremes worth bragging about",
        facts: [
          "<strong>Heat:</strong> Mohenjo-daro recorded 53.7°C (128.7°F) in 2010 — among the highest reliably measured temperatures anywhere, ever.",
          "<strong>Cold:</strong> the Karakoram holds the largest glaciers outside the polar regions — Baltoro and Biafo are rivers of ice over 60 km long.",
          "<strong>Strange and wonderful:</strong> Hingol National Park in Balochistan has active mud volcanoes and the 'Princess of Hope' rock spire (named by Angelina Jolie on a UN visit); Ziarat's juniper forest is among the oldest living forests on Earth — some trees pre-date Islam.",
        ],
      },
      {
        heading: "Geography words worth stealing",
        note: "Tap to hear — these show up in place-names everywhere.",
        words: [
          { ur: "دریا", tr: "daryā", en: "river", spell: "as in Daryā-e-Sindh, the Indus" },
          { ur: "پہاڑ", tr: "pahāṛ", en: "mountain", spell: "retroflex ڑ workout" },
          { ur: "وادی", tr: "wādī", en: "valley", spell: "as in Wādī-e-Hunza" },
          { ur: "جھیل", tr: "jhīl", en: "lake", spell: "Saif-ul-Malook, the fairy-tale jhīl" },
          { ur: "صحرا", tr: "sehrā", en: "desert", spell: "as in the Thar" },
          { ur: "سمندر", tr: "samundar", en: "sea", spell: "the Arabian Sea coast" },
          { ur: "ساحل", tr: "sāhil", en: "shore / coast", spell: "Karachi's Clifton sāhil" },
          { ur: "شہر", tr: "shehr", en: "city", spell: "Karachi: Pakistan's biggest shehr" },
        ],
      },
      {
        heading: "City fly-by",
        facts: [
          "<strong>Karachi</strong> — 20-million-plus megacity, port, and money machine. Started as a fishing village called Kolachi.",
          "<strong>Lahore</strong> — the cultural capital: Mughal forts, food streets, and the proverb 'who hasn't seen Lahore hasn't been born.'",
          "<strong>Islamabad</strong> — purpose-built capital from the 1960s, all grids and greenery under the Margalla Hills. Pakistanis joke it's 'ten minutes from Pakistan.'",
          "<strong>Peshawar, Quetta, Multan, Gwadar</strong> — the ancient gate, the mountain bowl, the city of saints, the deep-sea port. Four completely different Pakistans.",
        ],
      },
    ],
    funFacts: [
      "Pakistan has the largest glaciers outside the polar regions — the Karakoram's Baltoro and Siachen are rivers of ice tens of kilometers long, feeding the Indus through the summer melt.",
      "The N-35 — the Karakoram Highway — is often called the eighth wonder of the world: a paved road over the 4,700 m Khunjerab Pass into China, threaded between avalanche chutes by 1970s engineers.",
      "Lake Saif-ul-Malook (3,224 m) comes with its own fairy tale: a prince who fell in love with a fairy princess there. On a still night the Milky Way reflects in it — locals say that's when the fairies come down.",
    ],
  },
  {
    id: "P2",
    title: "Saqafat · Culture",
    postfrom: "from: a Lahore mehndi night",
    subtitle: "Truck art, qawwali, dramas, and competitive hospitality",
    intro:
      "Pakistani culture runs loud, generous, and ornamented — trucks painted like jewelry boxes, weddings that last a week, dramas the whole subcontinent watches, and a national talent for feeding guests past all reason.",
    sections: [
      {
        heading: "The essentials",
        img: { src: "images/truckart.jpg", alt: "Decorated Pakistani truck with a huge cargo load on a highway", caption: "A working truck in full regalia near Thatta \u2014 art, engineering, and optimism about load limits.", credit: "Photo: A.Savin \u00b7 FAL \u00b7 via Wikimedia Commons" },
        facts: [
          "<strong>Truck art</strong> — working trucks decorated bumper-to-bumper with calligraphy, portraits, chained hearts, and poetry. Owners spend fortunes; the truck is the canvas of the working class.",
          "<strong>Qawwali</strong> — Sufi devotional music built on handclaps, harmonium, and ecstatic call-and-response. Nusrat Fateh Ali Khan took it from shrine courtyards to world stages.",
          "<strong>Shalwar kameez</strong> — the national dress for everyone: loose trousers, long tunic, infinitely adaptable from farm work to bridal couture.",
          "<strong>Mehmān-nawāzī</strong> (hospitality) is a competitive sport. Refusing food is a negotiation you will lose — remember Level 5's 'bas, shukriya' and deploy it early.",
        ],
      },
      {
        heading: "The screen & the sound",
        facts: [
          "<strong>PTV's golden age</strong> gave the whole subcontinent its water-cooler moments: <em>Dhoop Kinare</em>, <em>Tanhaiyaan</em>, <em>Ankahi</em> — and yes, <em>Alpha Bravo Charlie</em> (1998), whose 90s warmth inspired this very app's design.",
          "<strong>Modern dramas</strong> carry the torch: <em>Humsafar</em> (2011) made Fawad Khan and Mahira Khan continental stars and put Hum TV on the map.",
          "<strong>Coke Studio</strong> — the fusion series that became South Asia's biggest musical export; 'Pasoori' (2022) hit global charts in a Punjabi-Urdu blend.",
          "<strong>Mehdi Hassan &amp; Noor Jehan</strong> — the king of ghazal and the Melody Queen: two voices that defined the radio century. Lata Mangeshkar said God speaks through Mehdi Hassan's throat.",
        ],
      },
      {
        heading: "Festivals & the calendar",
        facts: [
          "<strong>Ramzan</strong> reshapes the whole month: pre-dawn sehri meals, sunset iftars where the entire country stops at once, and TV schedules built around it.",
          "<strong>Both Eids</strong> — Eid-ul-Fitr (sweets, eidi cash for kids, new clothes) and Eid-ul-Azha (sacrifice and meat distribution) — are multi-day national reunions.",
          "<strong>Basant</strong> — Lahore's legendary spring kite festival: rooftops, yellow clothes, and the sky full of paper. <strong>14 August</strong> turns every street green and white with flags, badges, and bunting.",
          "<strong>Shaadi season</strong> (winter) is its own festival: mehndi night (music + henna), baraat (groom's procession), walima (reception) — each with its own outfit, playlist, and biryani.",
        ],
      },
      {
        heading: "Craft country",
        img: { src: "images/ajrak.jpg", alt: "Deep red Ajrak block-printed cloth", caption: "Ajrak \u2014 Sindh's block-printed cloth, a pattern tradition thousands of years old.", credit: "Photo: Ahub1988 \u00b7 CC BY-SA 3.0 \u00b7 via Wikimedia Commons" },
        facts: [
          "<strong>Ajrak</strong> — Sindh's deep-red block-printed cloth, worn as turban, shawl, and gift of honor; the pattern tradition is thousands of years old.",
          "<strong>Multani blue pottery, Peshawari chappal, khussa shoes, Sindhi topi</strong> — every region signs its name in a craft. The Peshawari chappal even walked into international fashion collections.",
          "<strong>Mehndi (henna)</strong> — hands painted for every celebration; the darker the stain, goes the aunty-lore, the deeper the love.",
        ],
      },
      {
        heading: "Culture words to know",
        note: "Tap to hear.",
        words: [
          { ur: "مہمان", tr: "mehmān", en: "guest", spell: "sacred status in any desi home" },
          { ur: "شادی", tr: "shādī", en: "wedding", spell: "multi-day, multi-outfit, multi-biryani" },
          { ur: "دعوت", tr: "dāwat", en: "feast / dinner invitation", spell: "arrive hungry, surrender early" },
          { ur: "مہندی", tr: "mehndī", en: "henna (and the henna night)", spell: "the celebration in a cone" },
          { ur: "پتنگ", tr: "patang", en: "kite", spell: "Basant's main character" },
          { ur: "میلہ", tr: "melā", en: "fair / festival", spell: "as in the crowds: 'it's a melā in here!'" },
          { ur: "رسم", tr: "rasm", en: "custom / ritual", spell: "every shādī has a dozen" },
          { ur: "تحفہ", tr: "tohfā", en: "gift", spell: "never arrive at a dāwat without one" },
        ],
      },
    ],
    funFacts: [
      "A Pakistani wedding is a festival season, not an event: mehndi, baraat, walima — each with its own dress code, playlist, and biryani. Guests budget a week and several outfits.",
      "The Karachi-vs-Lahore biryani rivalry is a genuine cultural fault line: Karachi insists on aloo (potatoes) in biryani, Lahore considers that heresy. Choose your answer based on who's at the table.",
      "Truck art has its own genre of one-liner poetry painted on bumpers. A beloved classic: <em>burī nazar wāle, terā muṉh kālā</em> — 'may the face of the evil-eyed turn black.' Part blessing, part roast.",
    ],
  },
  {
    id: "P3",
    title: "Tareekh · History",
    postfrom: "from: Mohenjo-daro, 2500 BCE",
    subtitle: "5,000 years: Indus cities to Independence",
    intro:
      "The land that is now Pakistan has hosted one of humanity's first great civilizations, Buddhist universities, Sufi saints, Mughal splendor, and the birth of a nation — all along the same river.",
    sections: [
      {
        heading: "Deep time: the Indus cities",
        img: [
          { src: "images/mohenjodaro.jpg", alt: "Ruins of Mohenjo-daro with the stupa mound", caption: "Mohenjo-daro, Sindh \u2014 grid streets and covered drains, 4,500 years old.", credit: "Photo: Saqib Qayyum \u00b7 CC BY-SA 3.0 \u00b7 via Wikimedia Commons" },
          { src: "images/dancinggirl.jpg", alt: "Bronze Dancing Girl statuette of Mohenjo-daro", caption: "The Dancing Girl of Mohenjo-daro — four inches of 4,500-year-old attitude.", credit: "Photo: Joe Ravi (photo) \u00b7 CC BY-SA 3.0 \u00b7 via Wikimedia Commons" },
        ],        facts: [
          "<strong>~2500 BCE — Mohenjo-daro and Harappa.</strong> Grid streets, standardized bricks, covered drains, public baths — indoor plumbing millennia before Rome. At its peak the Indus civilization was larger than Egypt and Mesopotamia combined.",
          "Its <strong>script is still undeciphered</strong> — thousands of inscribed seals, no Rosetta Stone. One of archaeology's great unsolved puzzles is sitting in Sindh.",
          "The famous bronze <em>Dancing Girl</em> statuette of Mohenjo-daro — four inches of pure attitude, hand on hip — is 4,500 years old.",
        ],
      },
      {
        heading: "Gandhara: the Buddhist millennium",
        img: { src: "images/gandhara.jpg", alt: "Stone head of the Buddha from Gandhara", caption: "A Gandhara Buddha, carved in present-day Pakistan ~1,700 years ago \u2014 Greek waves, South Asian serenity.", credit: "Photo: Daderot \u00b7 CC0 \u00b7 via Wikimedia Commons" },
        facts: [
          "Around <strong>Taxila and Peshawar</strong> (roughly 500 BCE–500 CE), the Gandhara civilization flourished at the crossroads of the Silk Road.",
          "<strong>Taxila</strong> hosted one of the ancient world's great centers of learning — students traveled from across Asia to study medicine, law, and archery there.",
          "Gandhara gave the world the <strong>first human-form Buddha statues</strong> — carved with Greek robes and wavy hair, a fusion of Athens and the subcontinent that exists nowhere else.",
        ],
      },
      {
        heading: "Saints and emperors",
        img: [
          { src: "images/badshahi.jpg", alt: "Badshahi Mosque in Lahore", caption: "The Badshahi Mosque, Lahore \u2014 for three centuries the largest mosque on Earth.", credit: "Photo: Muhammad Umair Mirza \u00b7 CC BY-SA 4.0 \u00b7 via Wikimedia Commons" },
          { src: "images/karachi1890.jpg", alt: "Bird's-eye view of Karachi in 1890", caption: "Karachi under the Raj, 1890 — a bird's-eye view of Saddar Bazaar.", credit: "Photo: British Library collection \u00b7 public domain \u00b7 via Wikimedia Commons" },
        ],        facts: [
          "<strong>The Sufis</strong> carried Islam through poetry and music: Data Ganj Bakhsh in Lahore, Lal Shahbaz Qalandar in Sehwan (whose shrine's ecstatic <em>dhamaal</em> drumming continues nightly), Abdullah Shah Ghazi watching over Karachi's coast.",
          "<strong>The Mughals (1526–1700s)</strong> made Lahore an imperial jewel: the Badshahi Mosque (for centuries the world's largest), Shalimar Gardens, and the Lahore Fort still anchor the old city.",
          "<strong>The British Raj</strong> left railways, cantonments, cricket, and the English-Urdu code-switching that Pakistanis still speak in daily.",
        ],
      },
      {
        heading: "1947: the founding cast",
        img: { src: "images/jinnah.jpg", alt: "Portrait of Muhammad Ali Jinnah as a young man, 1910", caption: "Muhammad Ali Jinnah in 1910 \u2014 the young Bombay barrister who would argue a country into existence.", credit: "Photo: unknown (1910) \u00b7 public domain \u00b7 via Wikimedia Commons" },
        facts: [
          "<strong>Allama Iqbal</strong> — the poet you met in Virsa — articulated the dream of a separate homeland in his 1930 Allahabad address. He died in 1938, nine years before it came true.",
          "<strong>Muhammad Ali Jinnah (Quaid-e-Azam, 'the Great Leader')</strong> — the London-trained barrister who argued a country into existence. On <strong>14 August 1947</strong>, Pakistan was born.",
          "<strong>Fatima Jinnah</strong> — his sister, a dentist by training — became Mādar-e-Millat, 'Mother of the Nation,' and later ran for president herself in 1965.",
          "Partition also brought one of history's largest migrations, with millions displaced and enormous human cost on all sides — a memory that still shapes the region.",
        ],
      },
      {
        heading: "Since then, in fast-forward",
        img: { src: "images/minar.jpg", alt: "Minar-e-Pakistan tower in Lahore", caption: "Minar-e-Pakistan, Lahore \u2014 built where the 1940 resolution was passed.", credit: "Photo: Kamran Aslam \u00b7 CC BY-SA 4.0 \u00b7 via Wikimedia Commons" },
        facts: [
          "<strong>1971</strong> — after a brutal war, East Pakistan became Bangladesh: the borders you saw in the map game date from then.",
          "<strong>1992</strong> — Imran Khan's 'cornered tigers' won the Cricket World Cup, a moment burned into national memory (much more in the Sports unit).",
          "<strong>Abdul Sattar Edhi</strong> built the world's largest volunteer ambulance network from a single Karachi clinic — when he died in 2016, he was mourned like a head of state.",
          "<strong>Malala Yousafzai</strong> became the youngest Nobel laureate in history (2014, at 17); <strong>Arfa Karim</strong> had already become the world's youngest Microsoft Certified Professional at nine.",
        ],
      },
      {
        heading: "History words to know",
        note: "Tap to hear.",
        words: [
          { ur: "تاریخ", tr: "tārīkh", en: "history (also: date)", spell: "one word, two jobs" },
          { ur: "آزادی", tr: "āzādī", en: "freedom / independence", spell: "the word of 14 August" },
          { ur: "قوم", tr: "qaum", en: "nation / people", spell: "Sound School's deep ق" },
          { ur: "بادشاہ", tr: "bādshāh", en: "king / emperor", spell: "as in the Badshahi Mosque" },
          { ur: "قلعہ", tr: "qilā", en: "fort", spell: "every old city has one" },
          { ur: "مزار", tr: "mazār", en: "shrine / mausoleum", spell: "Jinnah's white-marble mazār crowns Karachi" },
          { ur: "یادگار", tr: "yādgār", en: "monument / memorial", spell: "literally 'memory-keeper'" },
        ],
      },
    ],
    funFacts: [
      "The name 'Pakistan' was coined in 1933 as a composite: P-unjab, A-fghania, K-ashmir, S-indh, and Balochi-STAN — and it also reads as 'land of the pure' (pāk = pure). A national name that's both an acronym and a pun: extremely Urdu behavior.",
      "Minar-e-Pakistan in Lahore marks the spot of the 1940 Lahore Resolution — and the Badshahi Mosque next door is so photogenic the two make the country's most recognizable skyline.",
      "Jinnah's 11 August 1947 speech to the Constituent Assembly — 'you are free to go to your temples, you are free to go to your mosques' — is still quoted in every debate about the country's founding vision.",
    ],
  },
  {
    id: "P4",
    title: "Khel · Sports",
    postfrom: "from: the 1992 dressing room",
    subtitle: "Cornered tigers, squash dynasties, and polo in the sky",
    intro:
      "Pakistan doesn't just play sports — it produces eras. A cricket World Cup written like a film script, the most dominant champion in the history of ANY sport, and a polo ground above the clouds.",
    sections: [
      {
        heading: "Cricket: the second religion",
        img: { src: "images/stadium.jpg", alt: "Gaddafi Stadium Lahore lit at night", caption: "A packed house under the floodlights — big-match night.", credit: "Photo: Younisjunejo \u00b7 CC BY-SA 4.0 \u00b7 via Wikimedia Commons" },
        facts: [
          "<strong>1992, Melbourne.</strong> Nearly eliminated mid-tournament, captain Imran Khan told his team to fight 'like cornered tigers.' They won the whole World Cup. The phrase, the fielding, Wasim Akram's double-strike — all of it is national scripture.",
          "<strong>Street cricket ('tape-ball')</strong> is the country's true academy: a tennis ball wrapped in electrical tape, played in every gali. It builds the wristy, improvisational style Pakistani batsmen and bowlers are famous for.",
          "<strong>Reverse swing</strong> — making an old ball curve the 'wrong' way at high speed — was pioneered by Pakistani fast bowlers (Sarfraz Nawaz → Imran → Wasim and Waqar, the 'two Ws'). It changed fast bowling worldwide.",
          "The <strong>PSL</strong> (Pakistan Super League) brought big-stage cricket home, and the 2017 Champions Trophy final — a thrashing of India at the Oval — is rewatched like a comfort film.",
        ],
      },
      {
        heading: "The squash dynasty",
        facts: [
          "<strong>Jahangir Khan went unbeaten for five years and 555 matches</strong> (1981–86) — the longest winning streak by any athlete in any professional sport, ever. Read that again.",
          "He and <strong>Jansher Khan</strong> won 16 British Opens and 14 World Opens between them; for nearly two decades the squash world simply played for second place.",
          "The dynasty came from one extended family in Peshawar — a father coaching sons and nephews on cement courts. Sporting empires have started with less, but not often.",
        ],
      },
      {
        heading: "Beyond the boundary",
        img: { src: "images/shandur.jpg", alt: "Polo match at Shandur Top with mountains behind", caption: "Polo at Shandur Top, 3,700 m \u2014 the world's highest polo ground.", credit: "Photo: Addden321 \u00b7 CC BY-SA 4.0 \u00b7 via Wikimedia Commons" },
        facts: [
          "<strong>Field hockey</strong> is the official national sport: 3 Olympic golds and a record 4 World Cups — the 1970s-80s teams played hockey the way Brazil played football.",
          "<strong>Shandur Top (3,700 m)</strong> hosts the world's highest polo tournament: Chitral vs Gilgit, freestyle rules, on a pass between mountain ranges. Spectators camp for days.",
          "<strong>Kabaddi</strong> — the ancient raid-and-tag sport — packs stadiums in Punjab, and Pakistan's team is a perennial World Cup finalist.",
          "In the mountains, <strong>high-altitude porters from Hunza and Baltistan</strong> are the quiet superstars of world mountaineering — many K2 summits ride on their ropes and route-finding.",
        ],
      },
      {
        heading: "Sports words to know",
        note: "Tap to hear.",
        words: [
          { ur: "کھیل", tr: "khel", en: "game / sport", spell: "as in Roz ka Khel — your daily games!" },
          { ur: "جیت", tr: "jīt", en: "win / victory", spell: "the 1992 word" },
          { ur: "ہار", tr: "hār", en: "defeat (also: garland!)", spell: "lose the match, still get flowers" },
          { ur: "میدان", tr: "maidān", en: "field / ground", spell: "every mohalla has one" },
          { ur: "کپتان", tr: "kaptān", en: "captain", spell: "say it and everyone pictures 1992" },
        ],
      },
    ],
    funFacts: [
      "The word <em>hār</em> means both 'defeat' and 'flower garland' — so at Pakistani airports, returning teams get hār for their hār. The puns write themselves.",
      "Tape-ball cricket is such a distinct institution that international players who grew up on it credit it for their unorthodox skills — a tennis ball taped tight swings viciously and teaches improvisation no academy can.",
    ],
  },
  {
    id: "P5",
    title: "Dastarkhwan · Food",
    postfrom: "from: a Karachi dhaba at dawn",
    subtitle: "A regional eating tour, from nihari dawn to falooda midnight",
    intro:
      "The dastarkhwan is the cloth spread for a meal — and Pakistan's is enormous. Every province cooks a different country. Arrive hungry; this unit has no other prerequisite.",
    sections: [
      {
        heading: "The regional tour",
        img: { src: "images/biryani.jpg", alt: "Plate of biryani with rice, meat and potato", caption: "Biryani with aloo and boiled egg — exhibit A for the pro-potato faction.", credit: "Photo: DeepanjanGhosh \u00b7 CC BY-SA 4.0 \u00b7 via Wikimedia Commons" },
        facts: [
          "<strong>Punjab:</strong> nihari (slow-cooked overnight stew, eaten at DAWN — breakfast of emperors), paye, sarson kā sāg with makkī kī roṭī, and lassi in clay tumblers.",
          "<strong>Karachi &amp; Sindh:</strong> the famous aloo-wali biryani, bun kebab from street carts, Sindhi sāī bhājī, and nimco by the paper bag.",
          "<strong>Khyber Pakhtunkhwa:</strong> chapli kebab (a spiced patty the size of your face, fried in sight of the Khyber), kabuli pulao, and namkeen gosht — meat, salt, fat, perfection.",
          "<strong>Balochistan:</strong> sajji — whole lamb salt-roasted on stakes around a fire — and kaak, bread baked hard on hot stones.",
        ],
      },
      {
        heading: "The sweet department",
        img: { src: "images/jalebi.jpg", alt: "Fresh orange jalebi spirals", caption: "Jalebi \u2014 fried spirals of syrup, sold hot by the newspaper-full.", credit: "Photo: Gaurav Dhwaj Khadka \u00b7 CC BY-SA 4.0 \u00b7 via Wikimedia Commons" },
        facts: [
          "<strong>Mithai</strong> is a love language: gulab jamun, jalebi (fried spirals of syrup), barfi, kheer. Good news travels in a box of mithai — job, engagement, exam result, all of it.",
          "<strong>Falooda</strong> — rose syrup, vermicelli, basil seeds, ice cream — is dessert, drink, and architecture at once.",
          "<strong>Rooh Afza</strong>, the rose-colored 'soul refresher' syrup invented in 1906, is summer in a bottle — stirred into milk at every iftar table on both sides of the border.",
        ],
      },
      {
        heading: "Mango season (a national event)",
        facts: [
          "Pakistan is one of the world's top mango producers, and <strong>mango season (May–September) is treated like a holiday</strong> — crates travel between families as serious diplomatic gifts.",
          "The great debate: <strong>Sindhri vs Chaunsa vs Anwar Ratol.</strong> Sindh backs the honey-sweet Sindhri; Punjab swears by Chaunsa; the tiny aromatic Anwar Ratol has a cult following. There is no neutral position.",
          "Mango diplomacy is real: Pakistani leaders have gifted crates to heads of state for decades. A well-timed box of Anwar Ratols opens doors treaties can't.",
        ],
      },
      {
        heading: "Street & chai culture",
        facts: [
          "<strong>Gol gappay</strong> (crisp shells filled with spiced water), <strong>dahi bhallay, samosas, pakoras</strong> — street food is an evening ritual, not a snack.",
          "<strong>Doodh patti</strong> — tea brewed entirely in milk, no water allowed — is the dhaba standard, served scalding in glasses, endlessly refilled.",
          "First monsoon rain = mandatory pakoras. This is not a suggestion; it is meteorologically enforced national policy.",
        ],
      },
      {
        heading: "Food words to know",
        note: "Tap to hear — then go eat something.",
        words: [
          { ur: "مٹھائی", tr: "miṭhāī", en: "sweets", spell: "good news comes in boxes of it" },
          { ur: "آم", tr: "ām", en: "mango", spell: "the king of fruits — and of arguments" },
          { ur: "دودھ", tr: "doodh", en: "milk", spell: "as in doodh patti chai" },
          { ur: "گرم", tr: "garam", en: "hot (temperature)", spell: "as in garam chai, garam samosay" },
          { ur: "میٹھا", tr: "mīṭhā", en: "sweet (taste)", spell: "the national flavor" },
          { ur: "نمک", tr: "namak", en: "salt", spell: "namkeen = the salty snack family" },
        ],
      },
    ],
    funFacts: [
      "Nihari's name comes from <em>nahār</em>, Arabic for 'morning' — it was slow-cooked all night and eaten at dawn by Mughal-era laborers (and, legend says, nobles curing hangovers). Eating a heavy meat stew for breakfast remains a proud national habit.",
      "The chai-wala's glass is engineered culture: doodh patti is served too hot to hold on purpose — you pour it into the saucer and sip from that. Slowing you down is the point; the conversation is the meal.",
    ],
  },
  {
    id: "P6",
    title: "Qudrat · Nature & Wildlife",
    postfrom: "from: the Deosai plains",
    subtitle: "Corkscrew horns, blind dolphins, and leopards made of snow",
    intro:
      "Qudrat means nature — and Pakistan's runs from mangrove coast to 8,000-meter ice. Its wildlife list reads like a fantasy novel: a goat with corkscrew horns, a dolphin that swims sideways in a river, and a ghost cat patrolling the Karakoram.",
    sections: [
      {
        heading: "The national cast",
        img: { src: "images/markhor.jpg", alt: "A markhor with corkscrew horns", caption: "A markhor and its corkscrew horns, photographed at Los Angeles Zoo — the national animal that looks Photoshopped.", credit: "Photo: Bill Abbott \u00b7 CC BY-SA 2.0 \u00b7 via Wikimedia Commons" },
        facts: [
          "<strong>Markhor</strong> — the national animal: a wild mountain goat with meter-long corkscrew horns that looks Photoshopped. Once nearly extinct, community-run conservation in the north brought it roaring back — one of Asia's great comeback stories.",
          "<strong>Chukar partridge</strong> — the national bird, a red-legged mountain runner beloved in folk poetry as a symbol of intense (and slightly unhinged) love.",
          "<strong>Deodar</strong> — the national tree: cathedral-sized Himalayan cedars whose name means 'timber of the gods.'",
          "<strong>Jasmine (chambeli)</strong> — the national flower, threaded into bracelets sold at every traffic light on summer evenings.",
        ],
      },
      {
        heading: "The rare and the strange",
        img: { src: "images/snowleopard.jpg", alt: "Snow leopard portrait", caption: "The snow leopard — the ghost of the mountains.", credit: "Photo: Tambako The Jaguar \u00b7 CC BY-SA 2.0 \u00b7 via Wikimedia Commons" },
        facts: [
          "<strong>The Indus blind dolphin (bhulan)</strong> — one of the world's few freshwater dolphins, functionally blind, navigating the silty river by echolocation and often swimming on its side. Numbers are slowly recovering.",
          "<strong>Snow leopards</strong> patrol Gilgit-Baltistan's crags — one of the world's healthiest populations of the 'ghost of the mountains.'",
          "<strong>Himalayan brown bears</strong> dig marmots on the Deosai plateau; <strong>Marco Polo sheep</strong> with curling meter-wide horns graze the Khunjerab borderlands.",
          "<strong>Green turtles</strong> nest on Karachi's own beaches at Sandspit — megacity on one side of the sand, ancient reptile ritual on the other.",
        ],
      },
      {
        heading: "Wild places to know",
        facts: [
          "<strong>Deosai National Park</strong> — the 'Land of Giants': a 4,100 m plateau that becomes a wildflower sea each July.",
          "<strong>Hingol National Park</strong> — Balochistan's badlands: mud volcanoes, canyon spires, ibex on cliffs, and crocodiles in the Hingol river.",
          "<strong>Astola Island</strong> — Pakistan's largest offshore island and first marine protected area: turtle beaches and coral in the Arabian Sea.",
          "<strong>Ziarat's juniper valley</strong> — thousands of hectares of trees up to several millennia old; locals call the oldest ones 'living fossils.'",
        ],
      },
      {
        heading: "Nature words to know",
        note: "Tap to hear.",
        words: [
          { ur: "جانور", tr: "jānwar", en: "animal", spell: "" },
          { ur: "پرندہ", tr: "parindah", en: "bird", spell: "poetic plural: parinde" },
          { ur: "درخت", tr: "darakht", en: "tree", spell: "" },
          { ur: "پھول", tr: "phūl", en: "flower", spell: "aspirated ph — Sound School!" },
          { ur: "جنگل", tr: "jangal", en: "forest", spell: "the word English took as 'jungle'" },
        ],
      },
    ],
    funFacts: [
      "The markhor's name is Persian for 'snake-eater' — folklore claims it kills and eats snakes (it doesn't; it's a vegetarian goat with a dramatic reputation). The corkscrew horns are real, though: up to 160 cm of built-in mythology.",
      "Trophy-hunt permits for a handful of aging markhor sell for hundreds of thousands of dollars, and most of the money goes to the mountain villages that protect the herds — the counterintuitive economics that saved the species.",
    ],
  },
];

// ─────────────────────────────────────────────────────────────
// Naqsha Challenge — map features (ids match pakmap.js SVG)
// ─────────────────────────────────────────────────────────────

const GEO_FEATURES = [
  { id: "punjab", type: "province", name: "Punjab", ur: "پنجاب", tr: "Panjāb", blurb: "Home to over half of all Pakistanis — the name means 'five rivers' (panj āb)." },
  { id: "sindh", type: "province", name: "Sindh", ur: "سندھ", tr: "Sindh", blurb: "Named for the Indus (Sindhu) — home of Karachi, Mohenjo-daro, and Sufi shrines." },
  { id: "kp", type: "province", name: "Khyber Pakhtunkhwa", ur: "خیبر پختونخوا", tr: "Khaibar Pakhtūnkhwā", blurb: "The mountain northwest — Peshawar's ancient bazaars and the gateway of empires." },
  { id: "balochistan", type: "province", name: "Balochistan", ur: "بلوچستان", tr: "Balochistān", blurb: "Pakistan's largest province by area and its emptiest — deserts, mountains, and the Gwadar coast." },
  { id: "gb", type: "province", name: "Gilgit-Baltistan", ur: "گلگت بلتستان", tr: "Gilgit Baltistān", blurb: "Where Karakoram, Himalaya, and Hindu Kush collide — home of K2 and trekker heaven." },
  { id: "ajk", type: "province", name: "Azad Kashmir", ur: "آزاد کشمیر", tr: "Āzād Kashmīr", blurb: "Green valleys and rivers in the high northeast." },
  { id: "karachi", type: "city", name: "Karachi", ur: "کراچی", tr: "Karāchī", blurb: "The 20-million-strong megacity and port — Pakistan's money machine, once a fishing village called Kolachi." },
  { id: "lahore", type: "city", name: "Lahore", ur: "لاہور", tr: "Lāhaur", blurb: "The cultural heart — Mughal monuments and food streets. 'Who hasn't seen Lahore hasn't been born.'" },
  { id: "islamabad", type: "city", name: "Islamabad", ur: "اسلام آباد", tr: "Islāmābād", blurb: "The purpose-built 1960s capital, gridded and green beneath the Margalla Hills." },
  { id: "peshawar", type: "city", name: "Peshawar", ur: "پشاور", tr: "Peshāwar", blurb: "One of South Asia's oldest living cities — 2,000+ years guarding the Khyber Pass." },
  { id: "quetta", type: "city", name: "Quetta", ur: "کوئٹہ", tr: "Koiṭah", blurb: "Balochistan's high-altitude capital, ringed by mountains — famous for dried fruit and sajji." },
  { id: "gwadar", type: "city", name: "Gwadar", ur: "گوادر", tr: "Gwādar", blurb: "The hammerhead peninsula port on the Arabian Sea's far western coast." },
  { id: "multan", type: "city", name: "Multan", ur: "ملتان", tr: "Multān", blurb: "The City of Saints — shrines, blue pottery, and legendary summer heat." },
  { id: "indus", type: "feature", name: "the Indus River", ur: "دریائے سندھ", tr: "Daryā-e-Sindh", blurb: "Pakistan's 3,200 km spine — it watered one of humanity's first civilizations and named India, Sindh, and Hindustan." },
  { id: "k2", type: "feature", name: "K2", ur: "کے ٹو", tr: "Ke Ṭū", blurb: "Earth's second-highest peak (8,611 m) — the 'Savage Mountain', a harder climb than Everest." },
  { id: "thar", type: "feature", name: "the Thar Desert", ur: "صحرائے تھر", tr: "Sehrā-e-Thar", blurb: "A living desert of peacocks and folk music that turns green in the monsoon." },
  { id: "sea", type: "feature", name: "the Arabian Sea", ur: "بحیرہ عرب", tr: "Bahīrah-e-Arab", blurb: "1,000+ km of coastline, from the mangroves of the Indus delta to Gwadar." },
  { id: "faisalabad", type: "city", name: "Faisalabad", ur: "فیصل آباد", tr: "Faisalābād", blurb: "Pakistan's textile engine, laid out around a Union-Jack-shaped bazaar under a clock tower — formerly Lyallpur." },
  { id: "hyderabad", type: "city", name: "Hyderabad", ur: "حیدرآباد", tr: "Haidarābād", blurb: "Sindh's second city on the Indus — seat of the Talpur mirs before Karachi took the spotlight." },
  { id: "sialkot", type: "city", name: "Sialkot", ur: "سیالکوٹ", tr: "Siālkoṭ", blurb: "Birthplace of Allama Iqbal — and of most of the world's hand-stitched footballs, including World Cup balls." },
  { id: "skardu", type: "city", name: "Skardu", ur: "سکردو", tr: "Skardū", blurb: "Baltistan's capital and the staging post for K2 — expeditions buy their last supplies here." },
  { id: "sukkur", type: "city", name: "Sukkur", ur: "سکھر", tr: "Sukkur", blurb: "The barrage city — its 1932 headworks feed the world's largest canal-irrigation system." },
  { id: "bahawalpur", type: "city", name: "Bahawalpur", ur: "بہاولپور", tr: "Bahāwalpur", blurb: "A former princely state with Italianate palaces, gateway to the Cholistan desert." },
  { id: "chitral", type: "city", name: "Chitral", ur: "چترال", tr: "Chitrāl", blurb: "Mountain kingdom beneath Tirich Mir, home of the Kalash valleys and their ancient culture." },
  { id: "harappa", type: "site", name: "Harappa", ur: "ہڑپہ", tr: "Haṛappā", blurb: "The Indus civilization's other great city, in Punjab — the whole civilization is named 'Harappan' after it." },
  { id: "taxila", type: "site", name: "Taxila", ur: "ٹیکسلا", tr: "Ṭeksilā", blurb: "Gandhara's university city — a UNESCO site where students studied a millennium before Oxford." },
  { id: "khyberpass", type: "site", name: "the Khyber Pass", ur: "درۂ خیبر", tr: "Darrah-e-Khaibar", blurb: "The mountain gateway between Central and South Asia — armies, caravans, and empires have squeezed through for 2,500 years." },
  { id: "rohtas", type: "site", name: "Rohtas Fort", ur: "قلعہ روہتاس", tr: "Qilā Rohtās", blurb: "Sher Shah Suri's colossal 16th-century garrison fort — 4 km of walls, never taken by storm. UNESCO-listed." },
  { id: "derawar", type: "site", name: "Derawar Fort", ur: "قلعہ دراوڑ", tr: "Qilā Derāwar", blurb: "Forty mighty bastions rising out of the Cholistan desert — visible for miles across the dunes." },
  { id: "nangaparbat", type: "feature", name: "Nanga Parbat", ur: "ننگا پربت", tr: "Nangā Parbat", blurb: "The 'Killer Mountain' (8,126 m) — anchor of the western Himalaya, with the planet's biggest vertical wall, the Rupal Face." },
  { id: "khewra", type: "site", name: "the Khewra Salt Mine", ur: "کھیوڑہ", tr: "Khewṛā", blurb: "Source of the world-famous pink rock salt, mined since antiquity — legend says Alexander's horses discovered it by licking the rocks." },
  { id: "khunjerab", type: "site", name: "the Khunjerab Pass", ur: "درۂ خنجراب", tr: "Darrah-e-Khunjerāb", blurb: "At 4,693 m, the highest paved border crossing on Earth — where the Karakoram Highway hands you to China." },
  { id: "tarbela", type: "site", name: "Tarbela Dam", ur: "تربیلا", tr: "Tarbelā", blurb: "One of the largest earth-filled dams on the planet, holding back the Indus for farms and the power grid." },
  { id: "hingol", type: "site", name: "Hingol National Park", ur: "ہنگول", tr: "Hingol", blurb: "Balochistan's badlands: mud volcanoes, canyon spires, and the 'Princess of Hope' rock." },
  { id: "mehrgarh", type: "site", name: "Mehrgarh", ur: "مہرگڑھ", tr: "Mehrgaṛh", blurb: "A farming village 9,000 years ago — one of South Asia's oldest settlements, the deep root beneath the Indus cities." },
  { id: "tirichmir", type: "feature", name: "Tirich Mir", ur: "ترچ میر", tr: "Tirich Mīr", blurb: "The crown of the Hindu Kush (7,708 m), looming over Chitral — the third great range's highest point." },
  { id: "makli", type: "site", name: "Makli Necropolis", ur: "مکلی", tr: "Maklī", blurb: "One of the world's largest necropolises, near Thatta — half a million tombs across a UNESCO-listed hillside." },
  { id: "kartarpur", type: "site", name: "Kartarpur", ur: "کرتارپور", tr: "Kartārpur", blurb: "Gurdwara Darbar Sahib, where Guru Nanak spent his final years — since 2019, a visa-free corridor brings Sikh pilgrims across the border daily." },
  { id: "takhtibahi", type: "site", name: "Takht-i-Bahi", ur: "تخت بھائی", tr: "Takht Bhāī", blurb: "A Buddhist monastery on a Gandhara ridge — UNESCO-listed and remarkably intact after nearly 2,000 years." },
  { id: "saifulmalook", type: "feature", name: "Lake Saif-ul-Malook", ur: "جھیل سیف الملوک", tr: "Jhīl Saif-ul-Malūk", blurb: "The fairy-tale lake at 3,224 m — legend says a prince fell in love with a fairy princess on its shore." },
  { id: "attabad", type: "feature", name: "Attabad Lake", ur: "عطا آباد جھیل", tr: "Attāābād Jhīl", blurb: "Born in 2010 when a landslide dammed the Hunza River — its impossible turquoise is now the most photographed water in the north." },
  { id: "india", type: "country", name: "India", ur: "بھارت", tr: "Bhārat", blurb: "The eastern neighbor — the border runs from the Arabian Sea marshes through Punjab's fields to the Kashmir mountains." },
  { id: "china", type: "country", name: "China", ur: "چین", tr: "Chīn", blurb: "The northeastern neighbor across the Karakoram — connected by the Khunjerab Pass, the highest paved border crossing on Earth." },
  { id: "afghanistan", type: "country", name: "Afghanistan", ur: "افغانستان", tr: "Afghānistān", blurb: "The northwestern neighbor along the long Durand Line — the Khyber Pass has linked the two sides for millennia." },
  { id: "iran", type: "country", name: "Iran", ur: "ایران", tr: "Īrān", blurb: "The southwestern neighbor across Balochistan's deserts — and the source of much of Urdu's poetic vocabulary." },
];

const GEO_QUESTIONS = 5;

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
  { en: "mogul", ur: "مغل", tr: "Mughal", meaning: "a Mughal — of the imperial dynasty", story: "Media moguls and business moguls all borrow their title from the Mughal emperors — Urdu's word for the dynasty became English's word for anyone with an empire." },
  { en: "pundit", ur: "پنڈت", tr: "panḍit", meaning: "a learned scholar", story: "From panḍit, a title for a learned man. Cable-news punditry has drifted a fair way from the original job description." },
  { en: "bangle", ur: "بنگڑی", tr: "bangṛī", meaning: "a glass wrist ring", story: "From bangṛī, the glass bracelets sold by the dozen in every bazaar — they chimed their way into English wardrobes and dictionaries alike." },
  { en: "gymkhana", ur: "گیند خانہ", tr: "gend khānā", meaning: "ball-house / sports club", story: "From gend-khānā (ball house), the colonial sports club. English misheard it toward 'gym' and kept it for horse shows and car rallies." },
  { en: "chintz", ur: "چھینٹ", tr: "chhīṉṭ", meaning: "spotted, sprinkled cloth", story: "From chhīṉṭ, the printed calico Europe went mad for — so mad that 'chintzy' later became an insult for cheap imitations of it." },
  { en: "pashmina", ur: "پشمینہ", tr: "pashmīnā", meaning: "made of fine wool (pashm)", story: "From pashm, the fine underwool of Himalayan goats — the shawl fiber that made Kashmir a luxury brand centuries before fashion houses existed." },
  { en: "purdah", ur: "پردہ", tr: "pardah", meaning: "curtain / veil", story: "Literally 'curtain'. English took it for the practice of seclusion, and political journalists still describe governments as being 'in purdah' before budgets." },
  { en: "mongoose", ur: "منگوس", tr: "mangūs", meaning: "the snake-fighting animal", story: "From mangūs. The plural is 'mongooses' — English briefly flirted with 'mongeese' and wisely thought better of it." },
  { en: "dekko", ur: "دیکھو", tr: "dekho", meaning: "look!", story: "British Army slang straight from the imperative dekho — 'take a dekko at this.' A whole Urdu verb, smuggled home in a kit bag." },
  { en: "Blighty", ur: "ولایتی", tr: "vilāyatī", meaning: "foreign / of Britain", story: "Soldiers' Urdu vilāyatī ('foreign', hence British) became WWI trench slang for home itself — 'a Blighty wound' sent you back to Britain." },
  { en: "toddy", ur: "تاڑی", tr: "tāṛī", meaning: "palm sap (the original brew)", story: "From tāṛī, fermented palm sap. The hot whisky 'toddy' kept the name long after losing the palm tree." },
  { en: "dungarees", ur: "ڈنگری", tr: "ḍungrī", meaning: "coarse cloth from Dongri", story: "Named for ḍungrī cloth from Dongri, the Bombay dockside district — workwear that sailed from the docks of Bombay to the overalls of the world." },
  { en: "chit", ur: "چٹھی", tr: "chiṭṭhī", meaning: "a note / small letter", story: "From chiṭṭhī, a little letter. Offices worldwide still run on chits without knowing they're speaking Urdu." },
  { en: "pijama", ur: "پاجامہ", tr: "pājāma", meaning: "leg garment", borrower: "Spanish", story: "The same pāy-jāma that reached English kept travelling: Spanish pijama, Italian pigiama, French pyjama — one Urdu word now yawns in every Romance language." },
  { en: "champú", ur: "چانپو", tr: "chāmpo", meaning: "massage!", borrower: "Spanish", story: "Chāmpo rode into English as 'shampoo', then kept going — Spanish champú, Portuguese xampu, French shampooing. A global head massage, linguistically speaking." },
  { en: "kaki", ur: "خاکی", tr: "khākī", meaning: "dust-coloured", borrower: "French", story: "Urdu's dust-colour marched through the British Army into French as kaki and Spanish as caqui — the world's armies dressed in an Urdu adjective." },
  { en: "nabab", ur: "نواب", tr: "nawāb", meaning: "a princely governor", borrower: "French", story: "Nawāb became French nabab — 18th-century Paris slang for anyone home from India suspiciously rich. Balzac used it; the aunties would approve." },
  { en: "cipaye", ur: "سپاہی", tr: "sipāhī", meaning: "soldier", borrower: "French", story: "Sipāhī (soldier) travelled via Portuguese sipaio into French cipaye and English sepoy — one Urdu word enlisted in three European armies." },
  { en: "châle", ur: "شال", tr: "shāl", meaning: "woven wrap", borrower: "French", story: "The shāl that became the English shawl also became the French châle and Italian scialle — Kashmir's looms clothed all of Europe's shoulders." },
  { en: "cachemira", ur: "کشمیر", tr: "Kashmīr", meaning: "Kashmir — the valley itself", borrower: "Spanish", story: "The valley's name became the wool's name: Spanish cachemira, French cachemire, English cashmere. Few places get knitted into this many languages." },
  { en: "bungaló", ur: "بنگلہ", tr: "banglā", meaning: "Bengal-style house", borrower: "Spanish", story: "The banglā house style kept moving after English: Spanish bungaló, French bungalow, Italian bungalow — a one-storey word with global square footage." },
  { en: "gari", ur: "گاڑی", tr: "gāṛī", meaning: "vehicle / car", borrower: "Swahili", story: "Indian traders carried gāṛī across the Indian Ocean — in Swahili, gari is simply the everyday word for a car, from Mombasa to Dar es Salaam." },
  { en: "duka", ur: "دکان", tr: "dukān", meaning: "shop", borrower: "Swahili", story: "East Africa's corner shop is a duka — dukān with the ending worn smooth by a century of Swahili. The shopkeeper is a mduka-wallah of sorts." },
  { en: "pesa", ur: "پیسہ", tr: "paisā", meaning: "money", borrower: "Swahili", story: "Swahili pesa (money) is the Urdu paisā — which means Kenya's famous M-Pesa mobile money is literally 'mobile paisā'. The subcontinent's smallest coin became Africa's biggest fintech brand." },
  { en: "laki", ur: "لاکھ", tr: "lākh", meaning: "one hundred thousand", borrower: "Swahili", story: "The South Asian lākh (100,000) crossed the ocean whole: Swahili counts big numbers in laki. Two number systems, one trade route." },
  { en: "biriani", ur: "بریانی", tr: "biryānī", meaning: "the layered rice dish", borrower: "Swahili", story: "Zanzibar's beloved biriani came with Indian Ocean traders — proof that biryani arguments now span two continents." },
  { en: "roti", ur: "روٹی", tr: "roṭī", meaning: "flatbread", borrower: "Malay", story: "In Malaysia and Indonesia, roti means bread of every kind — roti canai stalls are national institutions. The word arrived with Indian traders and never left the menu." },
  { en: "cuti", ur: "چھٹی", tr: "chhuṭṭī", meaning: "holiday / leave", borrower: "Malay", story: "Malay cuti — vacation — is the Urdu chhuṭṭī. An entire nation books its chhuṭṭī without knowing it." },
  { en: "dobi", ur: "دھوبی", tr: "dhobī", meaning: "washerman / laundry", borrower: "Malay", story: "Malaysia's laundry shops are kedai dobi — dhobī shops. The washerman's trade name traveled with the diaspora." },
  { en: "topi", ur: "ٹوپی", tr: "ṭopī", meaning: "hat / cap", borrower: "Malay", story: "Malay topi (hat) is the Urdu ṭopī, straight across. Same head, same word, different hemisphere." },
  { en: "acar", ur: "اچار", tr: "achār", meaning: "pickle", borrower: "Malay", story: "Malay and Indonesian acar — pickled vegetables — is achār. The pickle jar is one of history's great travelers." },
  { en: "Dschungel", ur: "جنگل", tr: "jangal", meaning: "forest / wild land", borrower: "German", story: "Jangal reached English as 'jungle', then kept marching into German as Dschungel — spelled the hard way, as German insists." },
  { en: "Punsch", ur: "پانچ", tr: "pāṉch", meaning: "five", borrower: "German", story: "The five-ingredient pāṉch became English punch, then German Punsch — now steaming at every Christmas market. An Urdu number keeping Bavaria warm." },
  { en: "panka", ur: "پنکھا", tr: "pankhā", meaning: "fan", borrower: "Gulf Arabic", story: "In Gulf Arabic dialects the ceiling fan is a panka — the Urdu pankhā, carried across the Arabian Sea by generations of workers and traders." },
  { en: "doolally", ur: "دیولالی", tr: "Deolālī", meaning: "Deolali — the transit camp", borrower: "English", story: "British soldiers waiting endless months at the Deolali camp went slowly mad with boredom — 'gone doolally' still means 'lost the plot'." },
  { en: "jildi", ur: "جلدی", tr: "jaldī", meaning: "quickly!", borrower: "English", story: "British Army slang 'get a jildi on' is Urdu jaldī (hurry) in fatigues. Drill sergeants have been shouting Urdu for a century." },
  { en: "char", ur: "چائے", tr: "chāy", meaning: "tea", borrower: "English", story: "A British 'nice cup of char' is chāy in disguise — the same word as chai, absorbed twice by English through different doors." },
  { en: "wallah", ur: "والا", tr: "wālā", meaning: "the one who does / deals in", borrower: "English", story: "The Urdu suffix -wālā (the chai-wallah, the rickshaw-wallah) became an English word for any specialist. Cricket commentators remain the last great wallah-users." },
  { en: "rupee", ur: "روپیہ", tr: "rūpiyah", meaning: "the silver coin / currency", story: "Sher Shah Suri standardized the silver rūpiya in the 1540s — from his fort at Rohtas he also gave half of Asia its word for money: rupee, rupiah, and beyond." },
  { en: "raj", ur: "راج", tr: "rāj", meaning: "rule / reign", story: "English took rāj (rule) whole — 'the British Raj' — and still uses it for any era of dominance: the license raj, a cricket board's raj." },
  { en: "sits", ur: "چھینٹ", tr: "chhīṉṭ", meaning: "spotted, sprinkled cloth", borrower: "Dutch", story: "The same chhīṉṭ that became English chintz sailed with the Dutch East India Company as sits — prized calico that Amsterdam once tried to ban for being too popular." },
  { en: "atjar", ur: "اچار", tr: "achār", meaning: "pickle", borrower: "Afrikaans", story: "Achār traveled to Malay as acar, then to the Cape with Malay cooks — Afrikaans atjar is a four-continent pickle: South Asia, Southeast Asia, Africa, and every Sunday table since." },
  { en: "serikali", ur: "سرکار", tr: "sarkār", meaning: "government / authority", borrower: "Swahili", story: "The Urdu-Persian sarkār (government) crossed the Indian Ocean and became Swahili serikali — the standard word for government across East Africa. An entire state apparatus, linguistically imported." },
  { en: "bima", ur: "بیمہ", tr: "bīmā", meaning: "insurance", borrower: "Swahili", story: "Swahili bima (insurance) is the Urdu-Persian bīmā, carried by Indian Ocean merchants who insured their cargo long before modern paperwork." },
];

const DAILY_QUESTIONS = 5;

// ─────────────────────────────────────────────────────────────
// Titles — the learner's journey, from student to Ustaadh
// ─────────────────────────────────────────────────────────────

const RANKS = [
  { need: 0, name: "Talib-e-Ilm · Student", ur: "طالب علم" },
  { need: 5, name: "Shagird · Apprentice", ur: "شاگرد" },
  { need: 11, name: "Parhaku · Bookworm", ur: "پڑھاکو" },
  { need: 17, name: "Hoshiyar · Whiz", ur: "ہوشیار" },
  { need: 24, name: "Ustaadh · Master", ur: "استاد" },
  { need: 32, name: "Ustaadh-e-Azam · Grand Master", ur: "استاد اعظم" },
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

// ─────────────────────────────────────────────────────────────
// Jashn-e-Azadi week (Aug 7–14) — special vocabulary for Suno!
// ─────────────────────────────────────────────────────────────

const AZADI_ITEMS = [
  { ur: "آزادی", tr: "āzādī", en: "freedom / independence", note: "" },
  { ur: "پرچم", tr: "parcham", en: "flag", note: "" },
  { ur: "جشن", tr: "jashn", en: "celebration / festival", note: "" },
  { ur: "وطن", tr: "watan", en: "homeland", note: "" },
  { ur: "قوم", tr: "qaum", en: "nation / people", note: "" },
  { ur: "مبارک", tr: "mubārak", en: "congratulations / blessed", note: "" },
  { ur: "چودہ اگست", tr: "chaudah agast", en: "the 14th of August", note: "" },
  { ur: "جشن آزادی مبارک", tr: "jashn-e-āzādī mubārak", en: "Happy Independence Day!", note: "" },
  { ur: "پاکستان زندہ باد", tr: "Pākistān zindah bād", en: "Long live Pakistan!", note: "" },
];

// ─────────────────────────────────────────────────────────────
// Role-play scenes — every line reuses existing audio clips
// ─────────────────────────────────────────────────────────────

const ROLEPLAYS = [
  {
    id: "RP1",
    title: "At the Chai Dhaba",
    urName: "چائے خانہ",
    desc: "Order chai, ask the price, pay, and part warmly — Level 10's scene, live.",
    youRole: "the customer",
    themRole: "the chai-wala",
    turns: [
      { who: "you", ur: "یہاں چائے اچھی ہے؟", tr: "yahāṉ chāy achhī hai?", en: "Is the tea good here?" },
      { who: "them", ur: "جی ہاں، بہت مزیدار!", tr: "jī hāṉ, bahut mazedār!", en: "Oh yes — very delicious!" },
      { who: "you", ur: "دو چائے دیجیے", tr: "do chāy dījiye", en: "Two teas, please" },
      { who: "you", ur: "کتنے روپے؟", tr: "kitne rupaye?", en: "How many rupees?" },
      { who: "them", ur: "سو روپے", tr: "sau rupaye", en: "One hundred rupees" },
      { who: "you", ur: "یہ لیجیے", tr: "yeh lījiye", en: "Here you go" },
      { who: "them", ur: "بہت شکریہ", tr: "bahut shukriya", en: "Thank you very much" },
      { who: "you", ur: "کوئی بات نہیں", tr: "koī bāt nahīṉ", en: "Don't mention it" },
      { who: "them", ur: "پھر ملیں گے", tr: "phir mileṉge", en: "We'll meet again" },
      { who: "you", ur: "اللہ حافظ", tr: "Allāh hāfiz", en: "Goodbye" },
    ],
  },
  {
    id: "RP2",
    title: "Meeting Someone New",
    urName: "ملاقات",
    desc: "Greetings and introductions — Levels 1 & 2, live.",
    youRole: "yourself",
    themRole: "a new friend",
    turns: [
      { who: "them", ur: "السلام علیکم", tr: "assalām-o-alaikum", en: "Hello" },
      { who: "you", ur: "وعلیکم السلام", tr: "wa-alaikum-us-salām", en: "Hello to you too" },
      { who: "them", ur: "کیا حال ہے؟", tr: "kyā hāl hai?", en: "How are you?" },
      { who: "you", ur: "ٹھیک ہوں", tr: "ṭhīk hūṉ", en: "I'm fine" },
      { who: "them", ur: "آپ کہاں سے ہیں؟", tr: "āp kahāṉ se haiṉ?", en: "Where are you from?" },
      { who: "you", ur: "میں امریکہ سے ہوں", tr: "maiṉ Amrīkā se hūṉ", en: "I am from America" },
      { who: "them", ur: "آپ سے مل کر خوشی ہوئی", tr: "āp se mil kar khushī huī", en: "Pleased to meet you" },
      { who: "you", ur: "شکریہ", tr: "shukriya", en: "Thank you" },
    ],
  },
];

// ─────────────────────────────────────────────────────────────
// Letter tracing — stroke data in a 200x200 box, baseline ~145.
// Qaida order: body stroke(s) first (right-to-left), then dots
// and marks. p = path stroke, d = dot tap-target.
// ─────────────────────────────────────────────────────────────

const TRACE_LETTERS = [
  { ch: "ا", name: "alif", hint: "One stroke: straight down.", strokes: [{ p: "M100,40 L100,152" }] },
  { ch: "ب", name: "be", hint: "The boat first (right to left), then one dot below.", strokes: [{ p: "M158,85 C160,120 140,140 100,142 C62,144 45,130 42,108" }, { d: [100, 168] }] },
  { ch: "پ", name: "pe", hint: "Same boat, then three dots below.", strokes: [{ p: "M158,85 C160,120 140,140 100,142 C62,144 45,130 42,108" }, { d: [88, 164] }, { d: [112, 164] }, { d: [100, 180] }] },
  { ch: "ت", name: "te", hint: "The boat, then two dots above.", strokes: [{ p: "M158,85 C160,120 140,140 100,142 C62,144 45,130 42,108" }, { d: [88, 58] }, { d: [112, 58] }] },
  { ch: "ٹ", name: "ṭe", hint: "The boat, then the little ta-mark on top.", strokes: [{ p: "M158,85 C160,120 140,140 100,142 C62,144 45,130 42,108" }, { p: "M112,40 L112,56 C112,62 104,64 99,60 C94,56 96,47 103,47 C108,47 111,51 112,54" }] },
  { ch: "ث", name: "se", hint: "The boat, then three dots above.", strokes: [{ p: "M158,85 C160,120 140,140 100,142 C62,144 45,130 42,108" }, { d: [88, 60] }, { d: [112, 60] }, { d: [100, 44] }] },
  { ch: "ج", name: "jīm", hint: "The head bar right-to-left, then the big bowl — then the dot inside.", strokes: [{ p: "M126,52 C112,48 100,50 90,58" }, { p: "M122,60 C130,96 104,140 52,122" }, { d: [90, 108] }] },
  { ch: "چ", name: "che", hint: "Head bar, bowl — then three dots in the bowl.", strokes: [{ p: "M126,52 C112,48 100,50 90,58" }, { p: "M122,60 C130,96 104,140 52,122" }, { d: [80, 102] }, { d: [100, 102] }, { d: [90, 118] }] },
  { ch: "ح", name: "baṛī he", hint: "Head bar, then the bowl — and no dots at all.", strokes: [{ p: "M126,52 C112,48 100,50 90,58" }, { p: "M122,60 C130,96 104,140 52,122" }] },
  { ch: "خ", name: "khe", hint: "Head bar, bowl — then one dot on top.", strokes: [{ p: "M126,52 C112,48 100,50 90,58" }, { p: "M122,60 C130,96 104,140 52,122" }, { d: [104, 34] }] },
  { ch: "د", name: "dāl", hint: "One stroke: down from the tip, then sweep along the floor.", strokes: [{ p: "M118,58 C100,68 90,86 93,106 C96,124 112,134 138,131" }] },
  { ch: "ڈ", name: "ḍāl", hint: "Dāl first, then the little ta-mark on top.", strokes: [{ p: "M118,58 C100,68 90,86 93,106 C96,124 112,134 138,131" }, { p: "M104,24 L104,40 C104,46 96,48 91,44 C86,40 88,31 95,31 C100,31 103,35 104,38" }] },
  { ch: "ذ", name: "zāl", hint: "Dāl, then one dot above.", strokes: [{ p: "M118,58 C100,68 90,86 93,106 C96,124 112,134 138,131" }, { d: [106, 38] }] },
  { ch: "ر", name: "re", hint: "One stroke, sliding down below the line.", strokes: [{ p: "M118,78 C114,102 102,128 74,148" }] },
  { ch: "ڑ", name: "ṛe", hint: "Re, then the little ta-mark on top.", strokes: [{ p: "M118,78 C114,102 102,128 74,148" }, { p: "M102,26 L102,42 C102,48 94,50 89,46 C84,42 86,33 93,33 C98,33 101,37 102,40" }] },
  { ch: "ز", name: "ze", hint: "Re, then one dot above.", strokes: [{ p: "M118,78 C114,102 102,128 74,148" }, { d: [108, 52] }] },
  { ch: "ژ", name: "zhe", hint: "Re, then three dots above.", strokes: [{ p: "M118,78 C114,102 102,128 74,148" }, { d: [93, 50] }, { d: [117, 50] }, { d: [105, 34] }] },
  { ch: "س", name: "sīn", hint: "Three little teeth, then the deep tail — one stroke.", strokes: [{ p: "M160,98 C157,90 149,90 146,98 C143,90 135,90 132,98 C129,90 121,90 118,98 C116,114 106,130 88,133 C64,136 52,120 56,100" }] },
  { ch: "ش", name: "shīn", hint: "Sīn, then three dots above the teeth.", strokes: [{ p: "M160,98 C157,90 149,90 146,98 C143,90 135,90 132,98 C129,90 121,90 118,98 C116,114 106,130 88,133 C64,136 52,120 56,100" }, { d: [128, 64] }, { d: [150, 64] }, { d: [139, 48] }] },
  { ch: "ص", name: "swād", hint: "The loop first, flowing into the tail.", strokes: [{ p: "M152,92 C148,84 116,84 112,92 C110,100 124,104 138,102 C148,100 152,97 152,93 C154,120 138,148 104,150 C76,152 60,134 64,112" }] },
  { ch: "ض", name: "zwād", hint: "Swād, then one dot above.", strokes: [{ p: "M152,92 C148,84 116,84 112,92 C110,100 124,104 138,102 C148,100 152,97 152,93 C154,120 138,148 104,150 C76,152 60,134 64,112" }, { d: [130, 60] }] },
  { ch: "ط", name: "to'e", hint: "The loop and base first, then the standing alif.", strokes: [{ p: "M146,112 C148,98 122,94 116,106 C112,117 126,124 146,118" }, { p: "M152,54 L152,118" }] },
  { ch: "ظ", name: "zo'e", hint: "Like to'e — loop, alif, then the dot.", strokes: [{ p: "M146,112 C148,98 122,94 116,106 C112,117 126,124 146,118" }, { p: "M152,54 L152,118" }, { d: [126, 80] }] },
  { ch: "ع", name: "ain", hint: "The little top curve, then the big open belly.", strokes: [{ p: "M120,56 C102,50 94,60 100,72 C106,80 118,79 121,71 C106,84 99,96 101,108 C103,132 78,146 55,133" }] },
  { ch: "غ", name: "ghain", hint: "Ain, then one dot on top.", strokes: [{ p: "M120,56 C102,50 94,60 100,72 C106,80 118,79 121,71 C106,84 99,96 101,108 C103,132 78,146 55,133" }, { d: [108, 34] }] },
  { ch: "ف", name: "fe", hint: "The small loop, then the boat — then the dot.", strokes: [{ p: "M136,76 C136,64 118,62 114,74 C112,84 124,90 133,84 C135,82 136,79 136,76" }, { p: "M136,80 C138,96 126,108 104,110 C82,112 66,102 68,88" }, { d: [124, 44] }] },
  { ch: "ق", name: "qāf", hint: "Fe's loop, but a deep bowl — then two dots.", strokes: [{ p: "M136,76 C136,64 118,62 114,74 C112,84 124,90 133,84 C135,82 136,79 136,76" }, { p: "M136,80 C142,108 122,132 96,132 C72,132 58,112 62,92" }, { d: [112, 44] }, { d: [136, 44] }] },
  { ch: "ک", name: "kāf", hint: "The body first, then the flag stroke on top.", strokes: [{ p: "M142,68 C144,98 124,122 94,124 C70,125 58,110 60,94" }, { p: "M150,44 C132,55 116,68 106,82" }] },
  { ch: "گ", name: "gāf", hint: "Kāf, plus a second flag — gāf's signature.", strokes: [{ p: "M142,68 C144,98 124,122 94,124 C70,125 58,110 60,94" }, { p: "M150,44 C132,55 116,68 106,82" }, { p: "M160,56 C142,67 127,79 118,92" }] },
  { ch: "ل", name: "lām", hint: "Tall like alif, then dive into the bowl.", strokes: [{ p: "M136,46 C136,80 136,100 133,112 C127,136 99,144 76,134 C62,127 58,114 62,102" }] },
  { ch: "م", name: "mīm", hint: "The round head, then the straight tail down.", strokes: [{ p: "M120,84 C126,72 142,74 142,88 C142,100 126,104 118,96 C116,112 115,130 114,150" }] },
  { ch: "ن", name: "nūn", hint: "The deep bowl, then its dot inside.", strokes: [{ p: "M142,78 C152,120 120,146 96,146 C70,146 54,126 56,98" }, { d: [100, 68] }] },
  { ch: "ں", name: "nūn ghunna", hint: "One deep bowl — and famously, no dot.", strokes: [{ p: "M142,78 C152,120 120,146 96,146 C70,146 54,126 56,98" }] },
  { ch: "و", name: "wā'o", hint: "One stroke: the little loop, then sweep the tail down.", strokes: [{ p: "M102,66 C118,58 126,72 117,83 C111,90 101,88 99,80 C93,102 76,128 54,148" }] },
  { ch: "ہ", name: "gol he", hint: "One round loop — the 'round' he.", strokes: [{ p: "M116,66 C138,70 146,94 134,110 C122,126 98,124 90,106 C83,90 94,70 116,66" }] },
  { ch: "ھ", name: "do-chashmī he", hint: "Two little eyes: right one, then left one.", strokes: [{ p: "M136,114 a16,16 0 1,1 -32,2 a16,17 0 1,1 32,-2" }, { p: "M102,114 a16,16 0 1,1 -32,2 a16,17 0 1,1 32,-2" }] },
  { ch: "ء", name: "hamza", hint: "One small hook, like a tiny 2.", strokes: [{ p: "M116,84 C92,78 86,100 96,112 C104,120 116,114 114,102" }] },
  { ch: "ی", name: "choṭī ye", hint: "The deep boat with its curl, then two dots below.", strokes: [{ p: "M150,78 C155,115 130,134 96,136 C66,138 48,122 52,102 C54,90 66,86 74,92" }, { d: [92, 162] }, { d: [114, 162] }] },
  { ch: "ے", name: "baṛī ye", hint: "One long, flat sweep — right to left, then along the floor.", strokes: [{ p: "M148,60 C146,84 140,110 124,124 C96,138 62,134 46,118" }] },
];
