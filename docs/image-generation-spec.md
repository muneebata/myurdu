# Image generation spec for myurdu.org

What to generate, where it helps, and how to size it so it drops straight
into the site. Updated after the zoo and Rishtay batches, which set the
house style.

**Current coverage:** 47 images live. Fully illustrated: the zoo (30),
Rishtay (17), Thora Break (16 photos), five of eight Sair stops. Bare:
22 of 24 levels, both story readers, four Virsa units, three Sair stops.

---

## 1. The two shapes

### A. Square tiles (people, animals, objects, single words)
Shown at 64×64 on word rows and 86×86 on tree cards, always centre-cropped.

- **Deliver as a grid sheet**, like the family portraits.
- **Canvas:** 1536×1024, or 1024×1024.
- **Best layout:** 4 columns × 3 rows = 12 tiles (about 380×340 each).
- **Maximum density:** 6 × 4 = 24. Below ~230px per tile faces smear.
- Subject centred, not cropped at the cell edge.

### B. Landscape scenes (lesson headers, story art, role-play thumbnails)
Shown full width, sometimes cropped to a 120px-tall banner, so keep the
action in the middle third vertically.

- **One per image, not in a grid.**
- **Canvas:** 1536×1024. Never below 1200 wide.

---

## 2. Three rules that matter most

1. **No text in the image. None.** Image models render Urdu as convincing
   gibberish, and this site teaches the script. No signboards, no
   calligraphy, no book pages with visible writing, no English labels.
2. **Leave a gutter between tiles** on grid sheets: at least 16px of plain
   background between one card's border and the next, and nothing touching
   the canvas edge. This is what lets the crops be measured rather than
   guessed. The second family sheet's columns drifted up to 14px, which is
   why the first pass came out off-centre.
3. **No real people, no real places.** No poets, no historical figures, no
   K2 or Mohenjo-daro. Those stay documented photographs. Invented
   characters and generic settings only.

---

## 3. House style block (paste into every prompt)

> Flat editorial illustration, warm cream paper background, soft muted
> palette of sage green, terracotta, mustard, dusty rose and teal. Gentle
> clean linework, subtle paper grain. Each subject inside a decorative
> rounded rectangular frame with small floral corner motifs in colored line
> art, in the style of South Asian truck art and vintage printed cards.
> Friendly, warm, dignified. No text or lettering anywhere in the image.

For landscape scenes drop the frame sentence and add: *wide scene,
important action centred vertically, generous margins.*

---

## 4. What to generate, in priority order

### Batch 1 · Three Sair thumbnails (landscape, 3 images)
The only stops still without art, because no honestly-captionable
photograph existed for them. **Why it is additive:** every other stop shows
a scene before you start talking, which sets the situation. These three
start cold.

| Scene | What to show |
|---|---|
| RP2 Meeting Someone New | Two young men shaking hands on a university lawn, others in the background |
| RP7 The Phone Call | A young woman at home on a mobile, mid-conversation, warm evening light |
| RP8 The Tailor | Tailor's shop: bolts of fabric on shelves, sewing machine, measuring tape, tailor greeting a customer |

### Batch 2 · Five story illustrations (landscape, 5 images)
One per story in the graded readers, which currently have no art at all.
**Why it is additive:** these are invented characters, so no photo can ever
exist. Illustration turns the reading track into a storybook, and a picture
above a passage gives a learner the context to guess unfamiliar words
instead of stalling.

| Story | What to show |
|---|---|
| Chāy kā din | A family at home with a teapot and cups, rain outside the window |
| Rikshā wālā | A decorated auto-rickshaw at a busy corner, driver leaning out, passenger negotiating |
| Ṭren kā safar | A train pulling into a platform, families with luggage, a chai vendor |
| Dost kī dāwat | A crowded dinner table, friends seated and laughing |
| Bāzār meṉ mol-tol | A fruit stall piled with mangoes, customer and vendor mid-haggle |

### Batch 3 · Vocabulary tiles (square sheets, ~90 tiles, 8 sheets)
**Why it is additive, and why this is the biggest win:** 22 of 24 levels
are pure text. The zoo proved how much a picture per word helps, and 91 of
the phrases across the levels are concrete enough to draw. Pictures also
let a learner check meaning without reading English, which is the whole
point.

- **Food (12):** water, tea, roti, rice, daal, meat, egg, mango, mithai, salt, sugar, yogurt
- **Feelings (8):** happy, sad, hungry, thirsty, tired, angry, scared, surprised. Faces, and reuse the same cast so characters recur
- **Weather (7):** rain, sunshine, clouds, wind, snow, a hot day, a cold day
- **Places (10):** hospital, railway station, market, mosque, school, shop, house, park, bank, post office
- **Everyday actions (10):** eating, drinking, going, coming, speaking, listening, sleeping, reading, writing, working
- **Time of day (4):** morning, afternoon, evening, night
- **Household objects (12):** bed, chair, table, door, window, key, telephone, book, clock, cup, lamp, plate
- **Clothes (8):** shalwar kameez, dupatta, kurta, topi, shoes, sweater, sari, shawl
- **Body (10):** head, eye, ear, nose, mouth, hand, foot, stomach, hair, tooth
- **Colours (8):** simple objects in red, blue, green, yellow, black, white, pink, orange

### Batch 4 · Level scene headers (landscape, 22 images)
One establishing scene per level. **Why it is additive:** it gives each
level a face on the ledger and sets the situation before the phrases start.

L1 greetings at a doorway · L2 two strangers introducing themselves ·
L3 counting money at a stall · L4 a family gathering · L5 a spread on a
dastarkhwan · L6 a child asking a parent something · L7 people doing
everyday actions in one scene · L8 the same street at four times of day ·
L9 a shop of colourful fabric · L11 a street corner with directions ·
L12 monsoon rain on a street · L13 friends talking on a rooftop ·
L14 an elder telling children a story · L15 a family planning a trip with a
calendar · L16 a parent gently stopping a child · L17 a shopkeeper with a
ledger of prices · L18 a mehndi gathering · L19 a family in their home ·
L20 someone shopping for what they need · L21 two objects compared side by
side · L22 someone deciding at a fork in the road · L23 a group finishing a
task together

### Batch 5 · Four Virsa scenes (landscape, 4 images)
The culture units are text-only and are the most atmospheric writing on the
site. **Why it is additive:** these describe scenes a reader cannot picture
without help, and no public-domain photograph exists.

- **Tehzeeb:** the aadab gesture, right palm raised toward the face, a younger person greeting an elder
- **Tehzeeb:** takalluf at a dawat, host insisting, guest politely declining
- **Mushaira:** a candle-lit night gathering, poets seated facing a rapt audience, one candle before the reciter
- **Ghazal 101:** a singer with a harmonium before a small seated audience

---

## 5. Where images should NOT go

- **The script units** (R2 Shape-shifters, R3 Vowels, R6 Signboards,
  R7 Joṛ, R8 Paṛho). Every useful picture there would need legible Urdu,
  which image models cannot produce. These need hand-drawn diagrams or
  real photographs instead.
- **Sound School.** It already uses real sagittal vocal-tract diagrams
  from published phonetics research. Generated mouth art would be a
  downgrade dressed as an upgrade.
- **Kutub Khana's pre-photography poets** (Mir, Khusrau, Momin, Zauq,
  Dagh, Merathi). An invented likeness of a real person is a fabrication.
- **Thora Break.** Those photographs document real places.

---

## 6. Handing them over

Drop the sheet or scene in Downloads and say the word. Crops get measured
off the actual card edges, checked on a contact sheet, and wired in with
the right aspect handling. No need to cut anything or match filenames.

**Spare capacity you already have:** rows 4 to 6 of the second family sheet
(teenagers, children, babies) are cropped and unused, and three teen faces
from the first sheet are free. Good for story characters or a future
children's track.
