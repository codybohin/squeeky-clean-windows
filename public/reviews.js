/* ============================================================
   SQUEAKY CLEAN WINDOWS — REVIEWS
   ============================================================

   This file controls the Reviews section of the website.

   IMPORTANT: It ships EMPTY on purpose — no made-up reviews.
   Until you add real reviews here, the site shows a friendly
   placeholder instead of fake testimonials.

   ------------------------------------------------------------
   HOW TO ADD YOUR REAL GOOGLE REVIEWS
   ------------------------------------------------------------
   1. Go to your Google Business Profile and open a review you
      want to feature.
   2. Copy the reviewer's first name (or first name + last
      initial), their star rating, and the text of the review.
   3. Add an entry to the GOOGLE_REVIEWS list below, following
      the same format as the example (which is commented out).
   4. Update GOOGLE_RATING to your current average, and paste
      your Google profile/reviews link into GOOGLE_PROFILE_URL.
   5. Save and re-deploy. The reviews appear automatically.

   Only paste reviews customers actually left you. Copying real
   reviews from your own Google profile onto your own site is
   normal and fine — inventing them is not.
   ============================================================ */

// Your average star rating shown in the Google pill (e.g. "4.9")
const GOOGLE_RATING = "—";

// Link to your Google reviews / Business Profile
const GOOGLE_PROFILE_URL = "#";

// Your real reviews. Format for each:
// { name: "Jordan M.", rating: 5, date: "2 weeks ago", text: "..." }
const GOOGLE_REVIEWS = [
  // ---- EXAMPLE (delete this comment block and uncomment to use) ----
  // {
  //   name: "Jordan M.",
  //   rating: 5,
  //   date: "2 weeks ago",
  //   text: "Showed up on time and the windows have never looked better. Even cleaned the tracks I'd given up on."
  // },
];
