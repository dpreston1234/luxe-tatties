# Launch checklist — for Dez

Everything still standing between this build and a site Van can hand to real
customers. Roughly ordered by what blocks what.

---

## A. Needs Van (you can't do these without her)

| # | Item | Why it blocks launch |
|---|---|---|
| A1 | High-res logo file (SVG or PNG, transparent) | Header currently uses a typographic placeholder |
| A2 | Real workshop names, durations, prices | Every price on the site reads "Price TBC" |
| A3 | Deposit policy for tattoo bookings | Stated as "TBC" on the booking page |
| A4 | Studio address + hours | About page shows "Full address TBC" |
| A5 | Public contact email | Contact page shows "Email address TBC" |
| A6 | 6–9 real tattoo photos, 2 workshop photos | Portfolio is all placeholder tiles |
| A7 | Whether the financing provider (Medicard?) is still active, and their approved wording | Compliance — never state third-party finance terms yourself |
| A8 | Confirm the demo photos currently on the site are hers and cleared for use | Pulled from public IG for the pitch, not licensed |
| A9 | Acuity login (or have her paste the embed code) | See B1 |
| A10 | Google Business Profile — does she have one, is it verified? | No profile means no reviews widget, full stop |

**A10 is the one to check first.** If she has no verified Google Business
Profile, the reviews section can't work at all and verification takes days
(Google mails a postcard). Start that clock early.

---

## B. Integrations to wire up

### B1 — Acuity booking calendar

Currently embedded as an iframe pointing at `https://vieglow.as.me/?embed=1`,
with a visible "Open booking calendar" fallback button underneath.

**Verify this actually renders once deployed.** Some scheduling pages block
being framed. If the box shows up blank on the live site:

- Log into Van's Acuity
- Go to **Scheduling Page → Link → Direct Links & Embedding**
- Pick the scheduler from the dropdown, click the **Embed Scheduler** tab, **Copy**
- In `pages/workshops.html` and `pages/book-a-tattoo.html`, replace the whole
  `<iframe>` block with what Acuity gave you (it carries her owner ID plus
  Acuity's auto-resize script, which is strictly better than what's there now)

Both files have a comment marking exactly where.

### B2 — Instagram feed

Decision was a single paid widget suite. Elfsight's current pricing:

| Plan | Price | Monthly views | Widgets |
|---|---|---|---|
| Free | $0 | 200 | 1 |
| Basic | $4/mo | 5,000 | 3 |
| Pro | $8/mo | 50,000 | 9 |
| Premium | $16/mo | 150,000 | 21 |

Note those are **per single app**. The "All Apps" pack costs the same tiers but
covers everything — that's the one to buy, since we need two widgets
(Instagram + Google Reviews). **Basic ($4/mo, All Apps) is almost certainly
enough** for a solo studio's traffic. Don't oversell her Premium.

Steps:

- Create the Elfsight account **on Van's own email**, not yours — she owns it
- Build an Instagram Feed widget, connect @vieglow.ca
- Copy the two-line snippet
- Paste it into the marked slot in `index.html` and `pages/portfolio.html`
- Delete the `.widget-fallback` div directly underneath (comments say where)

### B3 — Google reviews

- Confirm the Google Business Profile exists and is verified (see A10)
- Build a Google Reviews widget in the same Elfsight account
- Paste into the marked slot in `index.html`
- Delete the fallback div

**No sample review text was written into the site on purpose.** Inventing
testimonials would be false advertising, and in Canada that's a Competition Act
problem, not just a taste problem.

### B4 — Contact form

Not connected. Nothing submitted goes anywhere.

- Sign up at formspree.io (free tier is 50 submissions/month)
- Change the form tag in `pages/contact.html` to:
  `<form id="contact-form" action="https://formspree.io/f/YOURID" method="post">`
- Delete `data-demo="true"`
- Delete the grey "not connected yet" note under the button
- Send a test message and confirm it lands

### B5 — Analytics

- Vercel has free built-in Web Analytics — turn it on in the project dashboard.
  One toggle, no code, no cookie banner needed. Easier than Google Analytics
  and enough for her needs.

---

## C. Domain

See `DOMAIN-SETUP.md`. Start with Part 1 — you still need to establish where
vieglow.ca's DNS actually lives and whether she has @vieglow.ca email.

---

## D. Content and legal gaps

- [ ] Aftercare information — the brief flagged this and there's no aftercare
      content anywhere yet. Worth a short section on the booking page.
- [ ] 18+ policy is stated. Good.
- [ ] Decide whether "Vie Glow Academy Inc." stays in the footer (currently in)
- [ ] Privacy note — once the contact form and analytics are live, she's
      collecting data. A short privacy line is worth adding.
- [ ] Nothing on the site should make health or medical claims.

---

## E. Pre-flight, day of launch

- [ ] Search the whole project for `TBC`, `Placeholder`, `PLACEHOLDER` — should
      return zero results in visible text
- [ ] Click every nav link on a phone
- [ ] Book a real test appointment through the embedded calendar, then cancel it
- [ ] Submit the contact form and confirm receipt
- [ ] Check the site on Safari on an actual iPhone, not just a simulator
- [ ] Confirm the padlock shows on vieglow.ca
- [ ] Send a test email to her @vieglow.ca address after DNS changes

---

## What was already verified in this build

- All internal links resolve (automated check, 6 pages)
- Every interactive element is 44px+ on both desktop and mobile
- Every image has alt text
- Exactly one `<h1>` per page
- Colour contrast measured against WCAG 2.1 AA — body text 14.5:1, muted text
  6.3:1, accent text 5.5:1, all passing
- Rendered and screenshotted at 1440px and 390px
- Keyboard focus rings present, skip-link added, reduced-motion respected
