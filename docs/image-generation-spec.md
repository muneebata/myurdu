# Image generation spec for myurdu.org

What to generate, and how to size it so it drops straight into the site.
Written after the Rishtay family grids, which worked well and set the house style.

---

## 1. The two shapes

Everything on the site is one of two shapes. Generate accordingly.

### A. Square tiles (people, animals, objects, single words)
Displayed at 64×64 px on word rows and 86×86 px on family-tree cards, always
center-cropped to a square.

- **Deliver as a grid sheet**, the way you did the family portraits.
- **Canvas:** 1536×1024 (landscape) or 1024×1024.
- **Best layout:** 4 columns × 3 rows = 12 tiles on a 1536×1024 canvas.
  That gives roughly 380×340 px per tile, which is plenty.
- **Maximum density:** 6 columns × 4 rows = 24 tiles. Below about 230 px per
  tile the faces start to smear when displayed.
- **Subject centered** in its cell with a little headroom, not cropped at the edge.

### B. Landscape scenes (lesson headers, story art, role-play thumbnails)
Displayed full width, and sometimes cropped to a short banner 120 px tall, so keep
the important action in the middle third vertically.

- **Generate one per image, not in a grid.**
- **Canvas:** 1536×1024. Do not go below 1200 px wide.

---

## 2. Three rules that matter more than anything else

1. **No text in the image. None.** Image models render Urdu and Nastaliq as
   convincing gibberish, and this is a site that teaches script. No signboards,
   no calligraphy, no book pages with visible writing, no English labels either.
2. **Leave a clear gutter between tiles on grid sheets.** At least 16 px of plain
   background between one card's border and the next, and don't let any card
   touch the canvas edge. This is what lets the crops be measured exactly instead
   of guessed. The second family sheet had columns that drifted up to 14 px, which
   is why the first pass came out off-center.
3. **No real people, no real places.** No portraits of actual poets, historical
   figures, or celebrities, and no depictions of real landmarks like K2 or
   Mohenjo-daro. Those stay as documented photographs. Invented characters and
   generic settings only.

---

## 3. House style block (paste this into every prompt)

> Flat editorial illustration, warm cream paper background, soft muted palette of
> sage green, terracotta, mustard, dusty rose and teal. Gentle clean linework,
> subtle paper grain. Each subject inside a decorative rounded rectangular frame
> with small floral corner motifs in colored line art, in the style of South Asian
> truck art and vintage printed cards. Friendly, warm, dignified. No text or
> lettering anywhere in the image.

For landscape scenes, drop the frame sentence and add: *wide scene, important
action centered vertically, generous margins.*

---

## 4. What to generate, in priority order

### Batch 1 · Role-play thumbnails (3 landscape scenes)
The three Sair stops that have no image because no honest photograph existed.

| Scene | What to show |
|---|---|
| RP2 Meeting Someone New | Two young men shaking hands and smiling on a university lawn or park path, others in the background |
| RP7 The Phone Call | A young woman sitting at home on a mobile phone, mid-conversation, warm evening light |
| RP8 The Tailor | A tailor's shop interior: bolts of fabric on shelves, a sewing machine, measuring tape, tailor greeting a customer |

### Batch 2 · Story illustrations (5 landscape scenes)
One per story in the graded readers. These have invented characters, so
illustration is the only honest option.

| Story | What to show |
|---|---|
| Chāy kā din (a chai kind of day) | A family at home with a teapot and cups, rain outside the window |
| Rikshā wālā (the rickshaw driver) | A decorated auto-rickshaw at a busy street corner, driver leaning out, passenger negotiating |
| Ṭren kā safar (the train journey) | A train pulling into a platform, families with luggage, chai vendor |
| Dost kī dāwat (a friend's invitation) | A dinner table crowded with dishes, friends seated and laughing |
| Bāzār meṉ mol-tol (bargaining in the bazaar) | A fruit stall piled with mangoes, customer and vendor mid-haggle |

### Batch 3 · Lesson headers (22 landscape scenes)
Every level except L10 and L24, which already have photographs.

L1 greetings at a doorway · L2 two strangers introducing themselves ·
L3 counting money at a stall · L4 a family portrait gathering ·
L5 a spread of food on a dastarkhwan · L6 a child asking a parent a question ·
L7 people doing everyday actions in one scene · L8 the same street at four times
of day · L9 a shop of colorful fabric · L11 a street corner with directions ·
L12 monsoon rain on a street · L13 friends talking on a rooftop ·
L14 an elder telling a story to children · L15 a family planning a trip with a
calendar · L16 a parent gently stopping a child · L17 a shopkeeper with a ledger
of prices · L18 a mehndi or wedding gathering · L19 a family in their home ·
L20 someone shopping for what they need · L21 two objects side by side being
compared · L22 someone deciding at a fork in the road · L23 a group finishing a
task together

### Batch 4 · Vocabulary tiles (square grid sheets, about 80 tiles)
Twelve per sheet at 4×3, so roughly seven sheets. These attach to individual
word rows the way the zoo animals do.

- **Food (12):** water, tea, roti, rice, daal, meat, egg, mango, sweets/mithai,
  salt, sugar, yogurt
- **Feelings (8):** happy, sad, hungry, thirsty, tired, angry, scared, surprised.
  Use faces, and reuse the same cast so characters recur across the site
- **Weather (7):** rain, sunshine, clouds, wind, snow, hot day, cold day
- **Places (10):** hospital, railway station, market, mosque, school, shop, house,
  park, bank, post office
- **Everyday actions (10):** eating, drinking, going, coming, speaking, listening,
  sleeping, reading, writing, working
- **Time of day (4):** morning, afternoon, evening, night
- **Household objects (12):** bed, chair, table, door, window, key, telephone,
  book, clock, cup, lamp, plate
- **Clothes (8):** shalwar kameez, dupatta, kurta, topi, shoes, sweater, sari,
  shawl
- **Body (10, for a future unit):** head, eye, ear, nose, mouth, hand, foot,
  stomach, hair, tooth

### Batch 5 · Culture scenes (3 landscape)
- **Tehzeeb:** the aadab gesture, right palm raised toward the face, a younger
  person greeting an elder
- **Tehzeeb:** takalluf at a dawat, a host insisting on more food while the guest
  politely declines
- **Mushaira:** a candle-lit poetry gathering at night, poets seated facing a
  rapt audience, a single candle in front of one reciter

### Spare capacity you already have
Rows 4, 5 and 6 of the second family sheet (teenagers, children, babies) are
cropped and unused. Good for a future children's track or story characters.

---

## 5. Handing them over

Just drop the sheet or scene in Downloads and say the word. The crops get measured
off the actual card edges, checked on a contact sheet, and wired in with the right
aspect handling. No need to cut anything yourself or match file names.
