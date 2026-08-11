# Compliance Review — Luxe Tatties Prototype

Reviewed against `client-brief.md` and `requirements.md`. This is a checklist for Dez — nothing here has been auto-fixed.

## ✅ Confirmed matches

**Brand tone (minimalist, intimate, refined)**
- Copy voice across all 6 pages reads calm and unhurried, no hard-sell language — matches "intimate/refined"
- Palette (warm off-white, charcoal, single muted accent) and type (Playfair Display serif headings + Work Sans sans body) follow the brief's recommended direction and stay restrained — matches "minimalist"
- Generous white space, no clutter, one CTA pairing per section

**Page & nav structure**
- All 6 required pages exist: Home, About, Workshops, Book a Tattoo, Portfolio, Contact
- Training leads correctly: nav order is Home → Workshops → Book a Tattoo → Portfolio → About → Contact; homepage hero and primary CTA lead with Workshops, Book a Tattoo is the secondary CTA

**Per-page functionality**
- Home links into both Workshops and Book a Tattoo ✅
- About has static content + photo placeholder for Van ✅
- Book a Tattoo links to Portfolio ✅
- Portfolio has separate tattoo-work and workshop-moment galleries ✅
- Contact form includes the required dropdown (Workshop inquiry / Tattoo booking / Other) ✅
- Instagram links to both @vieglow.ca and @luxetatties present in the footer on every page and again on the Contact page ✅
- Accessibility basics present: one H1 per page, alt text/aria-labels on all placeholder image blocks, visible focus states on form fields

## ⚠️ Gaps or mismatches

1. **Booking widget is not actually embedded** (Workshops page, Book a Tattoo page) — Requirements call for an embedded `vieglow.as.me` scheduling widget. The build has a clearly labeled placeholder block with a link-out button instead, because a real cross-origin iframe embed needs the client's actual embed code and a live server (not testable from a static file). **Fix needed**: get the real embed snippet from Van/Acuity/Squarespace and swap it in before anything ships — this is flagged inline in the code but is a genuine functional gap today, not just cosmetic.

2. **Contact form doesn't submit anywhere** (Contact page) — it shows a simulated success message via JS but sends no data. **Fix needed**: wire `js/main.js` to a real form backend (Formspree, serverless function, etc.) — TODO comment is already in place at the relevant line.

3. **Analytics not implemented** (site-wide) — Requirements listed analytics as a Must-Have. Nothing is built because there's no real GA measurement ID yet. **Fix needed**: once Van/Dez has an ID, add the tracking snippet to every page's `<head>`.

4. **Workshop pricing and course names are placeholders** (Workshops page) — "Intro Workshop," "Full Micro-Tattoo Course," "Private / Group Sessions" and all "Pricing on request" text were invented to fill the layout, not confirmed with the client. **Fix needed**: confirm real course lineup and pricing with Van before this page ships.

5. **Financing (Medicard) messaging is unconfirmed** (Workshops page) — the brief flagged this as a compliance concern (financing terms should point to the provider's own terms, not be stated as studio policy). The build includes a placeholder note but no real disclosure language. **Fix needed**: confirm current Medicard status and get approved wording before publishing.

6. **"Vie Glow Academy Inc." footer line is unconfirmed** (site-wide footer) — this was an open question in the brief, never answered. It's currently included (marked with a code comment for easy removal). **Decision needed from Dez/client**: keep or remove.

7. **Booking deposit policy is a placeholder** (Book a Tattoo page) — "A deposit may be required..." is marked as unconfirmed. **Fix needed**: get Van's actual deposit policy.

8. **Brand visuals haven't been verified against the real Instagram accounts** — the color/font direction is a reasoned recommendation, not pulled from actual @vieglow.ca / @luxetatties post grids (this tool can't view Instagram image content, only bio text). This was flagged as a gap in `client-brief.md` and carries through to the build. **Fix needed**: pull 5-10 reference screenshots and sanity-check the palette/type choices against them before this goes further than prototype stage.

9. **All photography is placeholder** (every page) — expected at this stage since Van hasn't provided photos yet, but noting it here so it isn't missed at handoff. Slot list and instructions are in `assets/images/README.txt`.

## 🔜 Nice-to-haves not yet built

None — per Dez's direction during requirements collection, everything discussed was scoped as Must-Have for launch, with no items deferred to a phase 2. There is nothing in this category to report.

---
**Recommendation**: structurally and stylistically the prototype is in good shape and matches the brief. The gaps above are mostly "needs real data/assets from Van" (pricing, photos, financing wording, deposit policy, real booking embed) rather than build mistakes — none of them require rebuilding anything, just filling in placeholders once the client provides the real information. Items 1–3 (booking embed, form backend, analytics) are the ones that block a genuine launch, not just a client preview.
