# Prototype Notes — Luxe Tatties

This is a **functional first-draft prototype** (plain HTML/CSS/vanilla JS) — it gets structure, copy, and function right. It is not a finished custom design; a design pass against real brand visuals is a separate, later step (see gaps in `client-brief.md`).

Preview by opening `index.html` directly in a browser.

## Structure
```
index.html            Home
pages/
  workshops.html
  book-a-tattoo.html
  portfolio.html
  about.html
  contact.html
css/styles.css         shared stylesheet
js/main.js              nav toggle + contact form handling
assets/images/          drop real photos here (see README.txt inside)
```

## Self-check against Must-Haves (requirements.md)

| Must-Have | Status |
|---|---|
| Home, About, Workshops, Book a Tattoo, Portfolio, Contact pages | ✅ Built |
| Training-led nav/homepage, tattoo booking secondary | ✅ |
| Single contact form w/ workshop vs. tattoo dropdown | ✅ Built, does not submit anywhere yet (placeholder) |
| Embedded vieglow.as.me booking widget | ⚠️ **Partial** — a real cross-origin iframe embed can't be reliably done in a static prototype (needs a live server + the client's actual embed code from Acuity/Squarespace). Built as a clearly labeled placeholder block with a working link-out to the real booking page instead. Swap in the real embed code before launch. |
| Social links to @vieglow.ca / @luxetatties | ✅ In footer + Contact page |
| Analytics (e.g. Google Analytics) | ❌ **Not included** — needs a real GA measurement ID from the client, which doesn't exist yet. Add the tracking snippet to each page's `<head>` once an ID is issued. |
| Copy drafted from brief | ✅ All pages have draft copy in the brand tone (minimalist/intimate/refined); needs Van's review before launch |
| Placeholder imagery, clearly marked | ✅ All photo slots use a dashed-border placeholder div with descriptive alt text — see `assets/images/README.txt` |

## Other things flagged for launch, carried from requirements.md
- Medicard financing wording on Workshops page — pending confirmation of current status and exact disclosure language
- Whether "Vie Glow Academy Inc." should appear in the footer — currently included (marked with a code comment so it's easy to remove)
- Workshop course names/pricing on Workshops page are placeholders — confirm real lineup and prices with Van
- Contact form and booking widget both need real backend/embed wiring before this can go live — see inline `TODO` comments in `js/main.js` and the `.booking-embed` blocks in `workshops.html` / `book-a-tattoo.html`

---
Ready for the `brief-compliance-review` skill.
