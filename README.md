# Squeeky Clean Windows

A clean, fast website for a window and gutter cleaning business serving Northern Utah — built around an instant, real-time quote calculator so visitors get a price without waiting on a callback.

---

## ⚠️ Before you launch — placeholder info to replace

This ships with **placeholder contact info** that needs to be swapped for real details:

| What | Where | Find | Replace with |
|---|---|---|---|
| Phone number | `public/index.html` (4 places) | `555-0100` | Your real number |
| Email | `public/index.html` (footer) | `hello@squeekycleanwindows.com` | Your real inbox |
| Google reviews | `public/reviews.js` | (ships empty) | Your real reviews — see instructions in that file |

The phone number appears as both a `tel:` link (digits only, e.g. `+18015550100`) and display text (e.g. `(801) 555-0100`) — make sure to update both formats in each spot.

---

## What's built

**Instant quote calculator** — visitors pick property type, window count, service level (interior/exterior/both), number of stories, and add-ons (screens, tracks, gutters, hard-water treatment). The price updates live as a range, itemized like a real estimate. Pricing is based on 2026 market research:
- $5/window single-side, $9/window both sides (base rate)
- Story multiplier: 1.0x single story, 1.18x two-story, 1.4x three-story+
- $95 job minimum
- Gutter add-on from $120
- Screens +$2/window, tracks +$3/window, hard-water +15%

**No fake reviews** — `reviews.js` ships empty with a placeholder message and clear instructions for pasting in real Google reviews once you have them. Nothing fabricated.

**Lead capture** — the commercial quote form and the "Book this quote" button both submit to `/api/lead.js`, a Vercel serverless function that:
- Always logs the lead (so nothing is lost even before email is set up)
- Optionally emails you the lead via [Resend](https://resend.com) (free tier) if you set `RESEND_API_KEY` and `LEAD_TO_EMAIL`

**Design** — Fraunces (serif display) + Outfit (body), a teal/sky/sun palette grounded in water and glass, a squeegee-swipe animation in the hero, and an invoice-style itemized quote panel.

---

## Local development

This is a static site + one serverless function — no build step needed.

```bash
# Preview the static site
npx serve public

# Or with Python
python3 -m http.server 8000 --directory public
```

The `/api/lead` endpoint only runs on Vercel (or with `vercel dev` locally — see below).

---

## Deploy to Vercel

1. Push this repo to GitHub
2. Import it in Vercel — it auto-detects the static `public/` folder and the `api/lead.js` function
3. **Set environment variables** (optional, for email delivery):
   - `RESEND_API_KEY` — from resend.com (free tier covers small business volume)
   - `LEAD_TO_EMAIL` — the inbox where you want quote requests delivered
4. Deploy

Without the Resend env vars set, leads still work — they're just logged to your Vercel function logs (Project → Deployments → Functions → lead) instead of emailed. You can check leads there anytime, or add the env vars later with zero code changes.

### Local serverless testing
```bash
npm i -g vercel
vercel dev
```

---

## Adding your Google reviews

Open `public/reviews.js`. You'll see:

```js
const GOOGLE_RATING = "—";
const GOOGLE_PROFILE_URL = "#";
const GOOGLE_REVIEWS = [];
```

Update all three:
```js
const GOOGLE_RATING = "4.9";
const GOOGLE_PROFILE_URL = "https://g.page/r/your-business/review";
const GOOGLE_REVIEWS = [
  { name: "Jordan M.", rating: 5, date: "2 weeks ago", text: "Showed up on time and the windows have never looked better." },
  // add as many as you like
];
```

Only paste reviews customers actually left on your Google Business Profile — copying real reviews onto your own site is normal practice, inventing them is not.

---

## Adjusting prices

All pricing logic lives in one place — search for `PRICING` in `public/index.html`:

```js
const PRICING = {
  perWindow: { exterior: 5, interior: 5, both: 9 },
  minimum: 95,
  storyMult: { 1: 1.0, 2: 1.18, 3: 1.4 },
  addons: { screens: 2, tracks: 3 },
  gutterBase: 120,
  hardwaterPct: 0.15,
};
```

Change any number and the calculator updates instantly — no other code changes needed.

---

## File structure

```
squeeky-clean-windows/
├── public/
│   ├── index.html      # Entire site — markup, styles, quote calculator
│   └── reviews.js       # Your real Google reviews (ships empty)
├── api/
│   └── lead.js           # Serverless function — receives quote/commercial form submissions
├── vercel.json
└── package.json
```
