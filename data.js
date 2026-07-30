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
  {
    id: "L11",
    title: "Raste · Places & Directions",
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
  {
    id: "C3",
    title: "Ghazal 101 · Poetry's Crown",
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
    subtitle: "K2, the Indus, and five very different provinces",
    intro:
      "Pakistan runs from the second-highest point on Earth down to the Arabian Sea in under 2,000 km — glaciers to mangroves. Here's the lay of the land (with a few Urdu words smuggled in, because we can't help ourselves).",
    sections: [
      {
        heading: "The big picture",
        facts: [
          "<strong>Four provinces + two territories:</strong> Punjab (over half the population), Sindh (Karachi and the coast), Khyber Pakhtunkhwa (the mountain northwest), Balochistan (biggest by far, emptiest by far) — plus Gilgit-Baltistan and Azad Jammu &amp; Kashmir in the high north.",
          "<strong>The Indus is the spine.</strong> Rising near Tibet, it runs the entire length of the country and waters the plains that feed it — the same river that named India, Sindh, AND Hindustan.",
          "<strong>Three mountain ranges collide</strong> in the north — Karakoram, Himalaya, and Hindu Kush meet in Gilgit-Baltistan. Five of the world's fourteen 8,000-meter peaks are in Pakistan.",
          "<strong>K2 (8,611 m)</strong> is Earth's second-highest mountain and, by climbers' reckoning, a harder prize than Everest — nicknamed the Savage Mountain.",
        ],
      },
      {
        heading: "Geography words worth stealing",
        note: "Tap to hear — these show up in place-names everywhere.",
        words: [
          { ur: "دریا", tr: "daryā", en: "river", spell: "as in Daryā-e-Sindh, the Indus" },
          { ur: "پہاڑ", tr: "pahāṛ", en: "mountain", spell: "retroflex ڑ workout" },
          { ur: "صحرا", tr: "sehrā", en: "desert", spell: "as in the Thar" },
          { ur: "سمندر", tr: "samundar", en: "sea", spell: "the Arabian Sea coast" },
          { ur: "شہر", tr: "shehr", en: "city", spell: "Karachi: Pakistan's biggest shehr" },
        ],
      },
      {
        heading: "City fly-by",
        facts: [
          "<strong>Karachi</strong> — 20-million-plus megacity, port, and money machine. Started as a fishing village called Kolachi.",
          "<strong>Lahore</strong> — the cultural capital: Mughal forts, food streets, and the proverb 'who hasn't seen Lahore hasn't been born.'",
          "<strong>Islamabad</strong> — purpose-built capital from the 1960s, all grids and greenery under the Margalla Hills. Pakistanis joke it's 'ten minutes from Pakistan.'",
        ],
      },
    ],
    funFacts: [
      "Pakistan has the largest glaciers outside the polar regions — the Karakoram's Baltoro and Siachen are rivers of ice tens of kilometers long, feeding the Indus through the summer melt.",
      "The N-35 — the Karakoram Highway — is often called the eighth wonder of the world: a paved road over the 4,700 m Khunjerab Pass into China, threaded between avalanche chutes by 1970s engineers.",
    ],
  },
  {
    id: "P2",
    title: "Saqafat · Culture",
    subtitle: "Truck art, qawwali, cricket, and competitive hospitality",
    intro:
      "Pakistani culture runs loud, generous, and ornamented — trucks painted like jewelry boxes, weddings that last a week, and a national talent for feeding guests past all reason.",
    sections: [
      {
        heading: "The essentials",
        facts: [
          "<strong>Truck art</strong> — working trucks decorated bumper-to-bumper with calligraphy, portraits, chained hearts, and poetry. Owners spend fortunes; the truck is the canvas of the working class.",
          "<strong>Qawwali</strong> — Sufi devotional music built on handclaps, harmonium, and ecstatic call-and-response. Nusrat Fateh Ali Khan took it from shrine courtyards to world stages.",
          "<strong>Cricket is the second religion.</strong> The 1992 World Cup win is national scripture; street-corner 'tape-ball' cricket is played in every gali (alley) in the country.",
          "<strong>Shalwar kameez</strong> — the national dress for everyone: loose trousers, long tunic, infinitely adaptable from farm work to bridal couture.",
          "<strong>Mehmān-nawāzī</strong> (hospitality) is a competitive sport. Refusing food is a negotiation you will lose — remember Level 5's 'bas, shukriya' and deploy it early.",
        ],
      },
      {
        heading: "Culture words to know",
        note: "Tap to hear.",
        words: [
          { ur: "مہمان", tr: "mehmān", en: "guest", spell: "sacred status in any desi home" },
          { ur: "شادی", tr: "shādī", en: "wedding", spell: "multi-day, multi-outfit, multi-biryani" },
          { ur: "دعوت", tr: "dāwat", en: "feast / dinner invitation", spell: "arrive hungry, surrender early" },
          { ur: "میلہ", tr: "melā", en: "fair / festival", spell: "as in the crowds: 'it's a melā in here!'" },
          { ur: "رسم", tr: "rasm", en: "custom / ritual", spell: "every shādī has a dozen" },
        ],
      },
    ],
    funFacts: [
      "A Pakistani wedding is a festival season, not an event: mehndi (music + henna night), baraat (groom's procession), walima (reception) — each with its own dress code, playlist, and biryani. Guests budget a week and several outfits.",
      "The Karachi-vs-Lahore biryani rivalry is a genuine cultural fault line: Karachi insists on aloo (potatoes) in biryani, Lahore considers that heresy. Choose your answer based on who's at the table.",
    ],
  },
  {
    id: "P3",
    title: "Tareekh · History",
    subtitle: "5,000 years: Indus cities to Independence",
    intro:
      "The land that is now Pakistan has hosted one of humanity's first great civilizations, Buddhist universities, Mughal splendor, and the birth of a nation — all along the same river.",
    sections: [
      {
        heading: "The long arc",
        facts: [
          "<strong>~2500 BCE — the Indus Valley Civilization.</strong> Mohenjo-daro (Sindh) and Harappa (Punjab) had grid streets, standardized bricks, and covered drains — indoor plumbing millennia before Rome.",
          "<strong>~500 BCE–500 CE — Gandhara.</strong> Around Taxila and Peshawar, a Buddhist civilization flourished where Greek and South Asian art fused — the first human-form Buddha statues wear Greek robes.",
          "<strong>1526–1700s — the Mughals.</strong> Lahore became an imperial jewel: the Badshahi Mosque, Shalimar Gardens, and the fort still anchor the old city.",
          "<strong>1947 — Independence.</strong> On 14 August, Pakistan was born from Partition, led by Muhammad Ali Jinnah (Quaid-e-Azam, 'the Great Leader') and dreamed up in part by the poet you met in Virsa — Allama Iqbal. Partition also brought one of history's largest migrations, with millions displaced and enormous human cost — a memory that still shapes the region.",
          "<strong>The modern chapter:</strong> the 1992 cricket World Cup, Abdul Sattar Edhi's world-famous ambulance charity, and Malala Yousafzai — the youngest Nobel laureate in history.",
        ],
      },
      {
        heading: "History words to know",
        note: "Tap to hear.",
        words: [
          { ur: "تاریخ", tr: "tārīkh", en: "history (also: date)", spell: "one word, two jobs" },
          { ur: "آزادی", tr: "āzādī", en: "freedom / independence", spell: "the word of 14 August" },
          { ur: "قوم", tr: "qaum", en: "nation / people", spell: "Sound School's deep ق" },
          { ur: "یادگار", tr: "yādgār", en: "monument / memorial", spell: "literally 'memory-keeper'" },
        ],
      },
    ],
    funFacts: [
      "The name 'Pakistan' was coined in 1933 as a composite: P-unjab, A-fghania, K-ashmir, S-indh, and Balochi-STAN — and it also reads as 'land of the pure' (pāk = pure). A national name that's both an acronym and a pun: extremely Urdu behavior.",
      "Mohenjo-daro means 'mound of the dead' in Sindhi — its real ancient name is unknown, because the Indus script is still undeciphered. One of archaeology's great unsolved puzzles is sitting in Sindh.",
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
];

const DAILY_QUESTIONS = 5;

// ─────────────────────────────────────────────────────────────
// Titles — the learner's journey, from student to Ustaadh
// ─────────────────────────────────────────────────────────────

const RANKS = [
  { need: 0, name: "Talib-e-Ilm · Student", ur: "طالب علم" },
  { need: 4, name: "Shagird · Apprentice", ur: "شاگرد" },
  { need: 9, name: "Parhaku · Bookworm", ur: "پڑھاکو" },
  { need: 14, name: "Hoshiyar · Whiz", ur: "ہوشیار" },
  { need: 20, name: "Ustaadh · Master", ur: "استاد" },
  { need: 25, name: "Ustaadh-e-Azam · Grand Master", ur: "استاد اعظم" },
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
