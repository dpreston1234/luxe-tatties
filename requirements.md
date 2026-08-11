# Requirements — Luxe Tatties

Based on `client-brief.md`. Site covers two offerings: **beginner micro-tattoo workshops** (leads nav/homepage) and **client tattoo booking** (secondary).

## Nav priority
**Training leads.** Homepage and top nav foreground the workshops; client tattoo booking is a clearly present but secondary section/CTA.

## Page list
1. **Home** — hero + intro to both offerings, workshops foregrounded, secondary CTA into tattoo booking
2. **About** — Van Ngo's story/credibility (Vie Glow Academy Inc.), why she teaches + why she tattoos
3. **Workshops** — course details, format (premade stencils, safety-focused), pricing/financing note, enrollment CTA
4. **Book a Tattoo** — client-facing tattoo booking page, fine-line/minimalist focus
5. **Portfolio/Gallery** — tattoo work showcase (healed pieces, fine-line focus)
6. **Contact** — single contact form covering both workshop inquiries and tattoo booking questions

## Per-page functionality notes

| Page | Functionality |
|---|---|
| Home | Links into Workshops and Book a Tattoo; social links (Instagram) |
| About | Static content, photo of Van |
| Workshops | Embedded booking widget (vieglow.as.me) for workshop slots; pricing display; mention of financing option (client to confirm wording — see brief's compliance flag on financing disclosure) |
| Book a Tattoo | Embedded booking widget (vieglow.as.me) for tattoo appointments; links to Portfolio |
| Portfolio/Gallery | Image grid, sourced from client-provided photos |
| Contact | Single form (name, email, message, dropdown: "Workshop inquiry" / "Tattoo booking" / "Other") routing to Van's inbox |

All pages: footer with Instagram links (@vieglow.ca, @luxetatties) and — pending Dez/client confirmation from the brief's open questions — possible "Vie Glow Academy Inc." legal line.

## Content status
**Needs drafting from the brief.** No existing site copy — all page copy to be drafted from `client-brief.md` (tone: minimalist, intimate, refined) for Van/client review and edit before launch.

## Media status
**Client will provide photos.** Van will supply real images (workshop shots, tattoo portfolio pieces, headshot/about photo). Prototype will use clearly-marked placeholders until real assets arrive — do not present placeholder imagery as final.

## Integrations
- **Booking**: embed `vieglow.as.me` (Acuity-style scheduling) on both Workshops and Book a Tattoo pages
- **Social**: link out to `@vieglow.ca` and `@luxetatties` on Instagram
- **Analytics**: basic analytics (e.g. Google Analytics — free tier)
- **Financing**: Medicard link/mention on Workshops page — ⚠️ **flag for Dez**: confirm with client whether this is still active and get exact wording/disclosure language before publishing (per compliance flag in the brief — link to Medicard's own terms rather than stating financing as a Luxe Tatties/Vie Glow Academy policy)
- Not included in this pass: email marketing tool, e-commerce/payment processing beyond the booking widget's own checkout (if any)

## Must-Have vs. Nice-to-Have
**Everything above is Must-Have for launch** (per Dez's direction) — no phase-2 deferral. Full page set, embedded booking, contact form, social links, and analytics all ship in v1.

## Open items carried from client-brief.md
- Confirm whether "Vie Glow Academy Inc." appears in footer/legal
- Confirm Medicard financing wording/disclosure before publishing
- Pull reference screenshots from @vieglow.ca / @luxetatties for final color/font direction

---
*Ready for review. Once confirmed, next step is the site-prototype-builder skill to build the HTML/CSS/JS prototype.*
