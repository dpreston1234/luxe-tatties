/* =============================================================================
   Vie Glow — site builder

   Reads the JSON files in /content and writes finished HTML into /_site.
   Vercel runs this automatically on every push, so nobody ever runs it by hand.

   Deliberately has ZERO dependencies — no npm install, no package that can
   break on a version bump, no build that can fail because a library changed.
   Plain Node, standard library only.

   To add a new editable field:
     1. add it to the relevant file in /content
     2. use it in the matching render function below
     3. add it to .pages.yml so it appears in the CMS
   ========================================================================== */

import {
  readFileSync, writeFileSync, mkdirSync, rmSync, existsSync,
  readdirSync, copyFileSync, statSync,
} from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = dirname(fileURLToPath(import.meta.url));
const OUT = join(ROOT, "_site");

const load = (n) => JSON.parse(readFileSync(join(ROOT, "content", n), "utf8"));

const settings = load("settings.json");
const pages = {
  home: load("home.json"),
  workshops: load("workshops.json"),
  booking: load("booking.json"),
  portfolio: load("portfolio.json"),
  about: load("about.json"),
  contact: load("contact.json"),
};

/* --- helpers ------------------------------------------------------------- */

// Escape anything that came from the CMS before it goes into HTML.
const e = (s) =>
  String(s ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");

const has = (s) => typeof s === "string" && s.trim().length > 0;
const list = (a) => (Array.isArray(a) ? a : []);

const NAV = [
  { label: "Home", url: "/" },
  { label: "Workshops", url: "/workshops/" },
  { label: "Book a Tattoo", url: "/book-a-tattoo/" },
  { label: "Portfolio", url: "/portfolio/" },
  { label: "About", url: "/about/" },
  { label: "Contact", url: "/contact/" },
];

/* --- shared chrome ------------------------------------------------------- */

function head(p) {
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${e(p.title)}</title>
  <meta name="description" content="${e(p.description)}">
  <link rel="icon" href="/favicon.svg" type="image/svg+xml">
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,500;0,9..144,600;1,9..144,500&family=Work+Sans:wght@400;500;600;700&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="/css/styles.css">
</head>
<body>
  <a class="skip-link" href="#main">Skip to main content</a>`;
}

const brand = () => `<a href="/" class="brand" aria-label="${e(settings.logo_alt)} — home">
        <img class="brand-logo" src="${e(settings.logo)}" alt="${e(settings.logo_alt)}">
      </a>`;

function header(current) {
  const items = NAV.map(
    (n) =>
      `          <li><a href="${n.url}"${n.url === current ? ' aria-current="page"' : ""}>${e(n.label)}</a></li>`
  ).join("\n");
  return `
  <header class="site-header">
    <div class="container">
      ${brand()}
      <button class="nav-toggle" aria-label="Open navigation menu" aria-expanded="false" aria-controls="primary-nav">Menu</button>
      <div class="nav-wrap" id="primary-nav">
        <ul class="nav-links">
${items}
        </ul>
        <a href="/book-a-tattoo/" class="btn btn-accent">${e(settings.book_button_label)}</a>
      </div>
    </div>
  </header>

  <main id="main">`;
}

function footer() {
  const links = NAV.filter((n) => n.url !== "/")
    .map((n) => `            <li><a href="${n.url}">${e(n.label)}</a></li>`)
    .join("\n");
  return `  </main>

  <footer class="site-footer">
    <div class="container">
      <div class="footer-grid">
        <div>
          ${brand()}
          <p style="margin-top:18px;">${e(settings.footer_blurb)}</p>
        </div>
        <div>
          <h4>Explore</h4>
          <ul>
${links}
          </ul>
        </div>
        <div>
          <h4>Follow &amp; Book</h4>
          <ul>
            <li><a href="${e(settings.instagram_main)}" target="_blank" rel="noopener">Instagram — ${e(settings.instagram_main_handle)}</a></li>
            <li><a href="${e(settings.instagram_alt)}" target="_blank" rel="noopener">Instagram — ${e(settings.instagram_alt_handle)}</a></li>
            <li><a href="${e(settings.booking_url)}" target="_blank" rel="noopener">Booking calendar</a></li>
          </ul>
        </div>
      </div>
      <div class="footer-bottom">
        <span>&copy; 2026 ${e(settings.legal_name)}</span>
        <span>${e(settings.city)}</span>
      </div>
    </div>
  </footer>

  <script src="/js/main.js"></script>
</body>
</html>
`;
}

/* --- reusable blocks ------------------------------------------------------ */

// A photo tile, or a labelled placeholder if no image has been uploaded yet.
function tile(item) {
  const size = e(item.size || "tile-sq");
  if (has(item.image)) {
    return `          <img class="photo ${size}" src="${e(item.image)}" alt="${e(item.alt)}">`;
  }
  return `          <div class="placeholder ${size}" role="img" aria-label="Placeholder for ${e(item.alt) || "a photo"}">${e(item.alt) || "Photo"}</div>`;
}

function acuity() {
  return `        <div class="booking-embed">
          <iframe src="${e(settings.booking_url)}/?embed=1" title="Vie Glow booking calendar"
                  width="100%" height="800" loading="lazy" frameborder="0"></iframe>
        </div>
        <div class="booking-fallback" style="margin-top:0;border-radius:0 0 4px 4px;">
          <p>Calendar not loading, or prefer a full page? Open the booking calendar directly.</p>
          <a href="${e(settings.booking_url)}" target="_blank" rel="noopener" class="btn btn-primary btn-lg">Open booking calendar &#8599;</a>
        </div>`;
}

// The Instagram / Google-reviews widget snippets are pasted into the CMS as
// raw embed code. Until one is pasted, a tidy fallback shows instead.
function instagramSlot() {
  if (has(settings.instagram_widget)) {
    return `        <div class="widget-slot">${settings.instagram_widget}</div>`;
  }
  return `        <div class="widget-slot">
          <div class="widget-fallback">
            <p>The live Instagram feed appears here once the feed widget is connected. Until then, see the latest work directly on Instagram.</p>
            <div class="stack-center">
              <a href="${e(settings.instagram_main)}" target="_blank" rel="noopener" class="btn btn-primary btn-lg">Follow ${e(settings.instagram_main_handle)}</a>
              <a href="${e(settings.instagram_alt)}" target="_blank" rel="noopener" class="btn btn-secondary btn-lg">${e(settings.instagram_alt_handle)}</a>
            </div>
          </div>
        </div>`;
}

function reviewsSlot() {
  if (has(settings.reviews_widget)) {
    return `        <div class="widget-slot">${settings.reviews_widget}</div>`;
  }
  return `        <div class="widget-slot">
          <div class="widget-fallback">
            <p>Real Google reviews will display here once the reviews widget is connected.</p>
            <p class="form-note" style="max-width:52ch;margin:0 auto;">Setup needed: claim and verify the Google Business Profile, then paste the widget code into the CMS.</p>
          </div>
        </div>`;
}

function steps(items) {
  return `        <ol class="steps">
${list(items)
  .map(
    (s) => `          <li>
            <div>
              <h3>${e(s.title)}</h3>
              <p>${e(s.text)}</p>
            </div>
          </li>`
  )
  .join("\n")}
        </ol>`;
}

function infoList(items) {
  return `        <ul class="info-list">
${list(items)
  .map((i) => {
    const v = has(i.link)
      ? `<a href="${e(i.link)}" target="_blank" rel="noopener">${e(i.value)}</a>`
      : e(i.value);
    return `          <li><span class="label">${e(i.label)}</span><span class="value">${v}</span></li>`;
  })
  .join("\n")}
        </ul>`;
}

/* --- pages ---------------------------------------------------------------- */

function renderHome(p) {
  return `
    <section class="hero">
      <div class="container">
        <div class="hero-copy">
          <span class="eyebrow">${e(p.hero_eyebrow)}</span>
          <h1>${e(p.hero_heading)}${has(p.hero_heading_italic) ? `<br><em>${e(p.hero_heading_italic)}</em>` : ""}</h1>
          <p class="lede">${e(p.hero_text)}</p>
          <div class="hero-actions">
            <a href="${e(p.hero_button_1_link)}" class="btn btn-accent btn-lg">${e(p.hero_button_1_label)}</a>
            <a href="${e(p.hero_button_2_link)}" class="btn btn-gold btn-lg">${e(p.hero_button_2_label)}</a>
          </div>
        </div>
        <div class="hero-media">
${tile({ image: p.hero_image, alt: p.hero_image_alt, size: "" })}
        </div>
      </div>
    </section>

    <section class="section section-light">
      <div class="container">
        <div class="section-header text-center">
          <span class="eyebrow">${e(p.paths_eyebrow)}</span>
          <h2>${e(p.paths_heading)}</h2>
        </div>
        <div class="grid grid-2">
${list(p.paths)
  .map(
    (c) => `          <div class="card${c.featured ? " card-fill" : ""}">
            ${has(c.badge) ? `<span class="badge">${e(c.badge)}</span>` : ""}
            <h3>${e(c.title)}</h3>
            <p>${e(c.text)}</p>
            <a href="${e(c.button_link)}" class="btn ${c.featured ? "btn-primary" : "btn-primary"}">${e(c.button_label)}</a>
          </div>`
  )
  .join("\n")}
        </div>
      </div>
    </section>

    <section class="section">
      <div class="container">
        <div class="section-header text-center">
          <span class="eyebrow">${e(p.reviews_eyebrow)}</span>
          <h2>${e(p.reviews_heading)}</h2>
        </div>
${reviewsSlot()}
      </div>
    </section>

    <section class="section section-cool">
      <div class="container">
        <div class="section-header text-center">
          <span class="eyebrow">${e(p.gallery_eyebrow)}</span>
          <h2>${e(p.gallery_heading)}</h2>
        </div>
        <div class="gallery">
${list(p.gallery).map(tile).join("\n")}
        </div>
        <p class="text-center mt-lg">
          <a href="/portfolio/" class="btn btn-primary btn-lg">${e(p.gallery_button_label)}</a>
        </p>
      </div>
    </section>

    <section class="section">
      <div class="container">
        <div class="section-header text-center">
          <span class="eyebrow">${e(p.instagram_eyebrow)}</span>
          <h2>${e(p.instagram_heading)}</h2>
        </div>
${instagramSlot()}
      </div>
    </section>

    <section class="section section-light text-center">
      <div class="container narrow">
        <h2>${e(p.closing_heading)}</h2>
        <p class="lede" style="margin:0 auto 32px;">${e(p.closing_text)}</p>
        <div class="stack-center">
          <a href="${e(p.hero_button_1_link)}" class="btn btn-accent btn-lg">${e(p.hero_button_1_label)}</a>
          <a href="${e(p.hero_button_2_link)}" class="btn btn-gold btn-lg">${e(p.hero_button_2_label)}</a>
        </div>
      </div>
    </section>
`;
}

function renderWorkshops(p) {
  return `
    <section class="hero">
      <div class="container" style="grid-template-columns:1fr;">
        <div class="hero-copy narrow">
          <span class="eyebrow">${e(p.hero_eyebrow)}</span>
          <h1>${e(p.hero_heading)}</h1>
          <p class="lede" style="max-width:52ch;">${e(p.hero_text)}</p>
          <div class="hero-actions">
            <a href="#booking" class="btn btn-accent btn-lg">${e(p.hero_button_label)}</a>
          </div>
        </div>
      </div>
    </section>

    <section class="section section-light">
      <div class="container">
        <div class="section-header">
          <span class="eyebrow">${e(p.options_eyebrow)}</span>
          <h2>${e(p.options_heading)}</h2>
        </div>
        <div class="grid grid-3">
${list(p.workshops)
  .map(
    (w) => `          <div class="service-card">
            <div class="service-body">
              ${has(w.badge) ? `<span class="badge">${e(w.badge)}</span>` : ""}
              <h3>${e(w.title)}</h3>
              <p>${e(w.text)}</p>
              <div class="service-meta">
                <span class="price">${e(w.price)}</span>
                <span class="duration">${e(w.duration)}</span>
              </div>
              <a href="${e(w.button_link)}" class="btn ${w.featured ? "btn-accent" : "btn-secondary"} btn-block">${e(w.button_label)}</a>
            </div>
          </div>`
  )
  .join("\n")}
        </div>
        ${has(p.options_note) ? `<p class="form-note">${e(p.options_note)}</p>` : ""}
      </div>
    </section>

    <section class="section">
      <div class="container">
        <div class="section-header">
          <span class="eyebrow">${e(p.why_eyebrow)}</span>
          <h2>${e(p.why_heading)}</h2>
        </div>
${steps(p.steps)}
        ${
          has(p.callout_title)
            ? `<div class="callout">
          <h3>${e(p.callout_title)}</h3>
          <p>${e(p.callout_text)}</p>
          ${has(p.callout_note) ? `<p class="form-note mb-0">${e(p.callout_note)}</p>` : ""}
        </div>`
            : ""
        }
      </div>
    </section>

    <section class="section section-cool" id="booking">
      <div class="container">
        <div class="section-header">
          <span class="eyebrow">${e(p.booking_eyebrow)}</span>
          <h2>${e(p.booking_heading)}</h2>
        </div>
${acuity()}
      </div>
    </section>
`;
}

function renderBooking(p) {
  return `
    <section class="hero">
      <div class="container">
        <div class="hero-copy">
          <span class="eyebrow">${e(p.hero_eyebrow)}</span>
          <h1>${e(p.hero_heading)}</h1>
          <p class="lede">${e(p.hero_text)}</p>
          <div class="hero-actions">
            <a href="#booking" class="btn btn-accent btn-lg">${e(p.hero_button_1_label)}</a>
            <a href="/portfolio/" class="btn btn-gold btn-lg">${e(p.hero_button_2_label)}</a>
          </div>
        </div>
        <div class="hero-media">
${tile({ image: p.hero_image, alt: p.hero_image_alt, size: "" })}
        </div>
      </div>
    </section>

    <section class="section section-light">
      <div class="container">
        <div class="section-header">
          <span class="eyebrow">${e(p.process_eyebrow)}</span>
          <h2>${e(p.process_heading)}</h2>
        </div>
${steps(p.steps)}
      </div>
    </section>

    <section class="section">
      <div class="container narrow">
        <div class="section-header">
          <span class="eyebrow">${e(p.policy_eyebrow)}</span>
          <h2>${e(p.policy_heading)}</h2>
        </div>
${infoList(p.policies)}
        ${has(p.policy_note) ? `<p class="form-note">${e(p.policy_note)}</p>` : ""}
      </div>
    </section>

    <section class="section section-cool" id="booking">
      <div class="container">
        <div class="section-header">
          <span class="eyebrow">${e(p.booking_eyebrow)}</span>
          <h2>${e(p.booking_heading)}</h2>
        </div>
${acuity()}
      </div>
    </section>
`;
}

function renderPortfolio(p) {
  return `
    <section class="hero">
      <div class="container" style="grid-template-columns:1fr;">
        <div class="hero-copy narrow">
          <span class="eyebrow">${e(p.hero_eyebrow)}</span>
          <h1>${e(p.hero_heading)}</h1>
          <p class="lede" style="max-width:52ch;">${e(p.hero_text)}</p>
        </div>
      </div>
    </section>

    <section class="section">
      <div class="container">
        <div class="section-header">
          <span class="eyebrow">${e(p.work_eyebrow)}</span>
          <h2>${e(p.work_heading)}</h2>
        </div>
        <div class="gallery">
${list(p.tattoo_photos).map(tile).join("\n")}
        </div>
      </div>
    </section>

    <section class="section section-cool">
      <div class="container">
        <div class="section-header">
          <span class="eyebrow">${e(p.classroom_eyebrow)}</span>
          <h2>${e(p.classroom_heading)}</h2>
        </div>
        <div class="gallery">
${list(p.classroom_photos).map(tile).join("\n")}
        </div>
      </div>
    </section>

    <section class="section">
      <div class="container">
        <div class="section-header text-center">
          <span class="eyebrow">${e(p.instagram_eyebrow)}</span>
          <h2>${e(p.instagram_heading)}</h2>
        </div>
${instagramSlot()}
      </div>
    </section>

    <section class="section section-light text-center">
      <div class="container narrow">
        <h2>${e(p.cta_heading)}</h2>
        <div class="stack-center mt-lg">
          <a href="/book-a-tattoo/" class="btn btn-accent btn-lg">Book a tattoo</a>
          <a href="/workshops/" class="btn btn-gold btn-lg">See workshops</a>
        </div>
      </div>
    </section>
`;
}

function renderAbout(p) {
  return `
    <section class="hero">
      <div class="container">
        <div class="hero-copy">
          <span class="eyebrow">${e(p.hero_eyebrow)}</span>
          <h1>${e(p.hero_heading)}</h1>
          <p class="lede">${e(p.hero_text)}</p>
        </div>
        <div class="hero-media">
${tile({ image: p.hero_image, alt: p.hero_image_alt, size: "" })}
        </div>
      </div>
    </section>

    <section class="section section-light">
      <div class="container">
        <div class="grid grid-2">
${list(p.blocks)
  .map(
    (b) => `          <div class="card${b.featured ? " card-fill" : ""}">
            <h3>${e(b.title)}</h3>
            <p>${e(b.text)}</p>
          </div>`
  )
  .join("\n")}
        </div>
      </div>
    </section>

    <section class="section">
      <div class="container narrow">
        <div class="section-header">
          <span class="eyebrow">${e(p.location_eyebrow)}</span>
          <h2>${e(p.location_heading)}</h2>
        </div>
${infoList(p.info)}
        <div class="stack-center mt-lg">
          <a href="/book-a-tattoo/" class="btn btn-accent btn-lg">Book an appointment</a>
          <a href="/contact/" class="btn btn-gold btn-lg">Send a message</a>
        </div>
      </div>
    </section>

    <section class="section section-cool text-center">
      <div class="container narrow">
        <span class="eyebrow">${e(p.closing_eyebrow)}</span>
        <h2>${e(p.closing_heading)}</h2>
        <p>${e(p.closing_text)}</p>
      </div>
    </section>
`;
}

function renderContact(p) {
  const live = has(p.form_action);
  const formTag = live
    ? `<form id="contact-form" action="${e(p.form_action)}" method="post">`
    : `<form id="contact-form" novalidate data-demo="true">`;
  return `
    <section class="hero">
      <div class="container" style="grid-template-columns:1fr;">
        <div class="hero-copy narrow">
          <span class="eyebrow">${e(p.hero_eyebrow)}</span>
          <h1>${e(p.hero_heading)}</h1>
          <p class="lede" style="max-width:54ch;">${e(p.hero_text)}</p>
        </div>
      </div>
    </section>

    <section class="section section-light">
      <div class="container narrow">
        ${formTag}
          <div class="form-group">
            <label for="name">Your name</label>
            <input type="text" id="name" name="name" autocomplete="name" required>
          </div>
          <div class="form-group">
            <label for="email">Email address</label>
            <input type="email" id="email" name="email" autocomplete="email" required>
          </div>
          <div class="form-group">
            <label for="inquiry-type">What is this about?</label>
            <select id="inquiry-type" name="inquiry-type" required>
              <option value="" disabled selected>Please choose one</option>
              <option value="workshop">Workshop enquiry</option>
              <option value="tattoo">Tattoo booking</option>
              <option value="other">Something else</option>
            </select>
          </div>
          <div class="form-group">
            <label for="message">Your message</label>
            <textarea id="message" name="message" required placeholder="Tell Van a little about what you are looking for."></textarea>
          </div>
          <button type="submit" class="btn btn-accent btn-lg btn-block">Send message</button>
          ${!live && has(p.form_note) ? `<p class="form-note">${e(p.form_note)}</p>` : ""}
          <p class="form-status" role="status" aria-live="polite"></p>
        </form>
      </div>
    </section>

    <section class="section">
      <div class="container narrow">
        <div class="section-header">
          <span class="eyebrow">${e(p.info_eyebrow)}</span>
          <h2>${e(p.info_heading)}</h2>
        </div>
${infoList(p.info)}
      </div>
    </section>

    <section class="section section-cool text-center">
      <div class="container narrow">
        <span class="eyebrow">${e(p.follow_eyebrow)}</span>
        <h2>${e(p.follow_heading)}</h2>
        <div class="stack-center mt-lg">
          <a href="${e(settings.instagram_main)}" target="_blank" rel="noopener" class="btn btn-primary btn-lg">${e(settings.instagram_main_handle)}</a>
          <a href="${e(settings.instagram_alt)}" target="_blank" rel="noopener" class="btn btn-gold btn-lg">${e(settings.instagram_alt_handle)}</a>
        </div>
      </div>
    </section>
`;
}

/* --- write ---------------------------------------------------------------- */

const ROUTES = [
  { out: "index.html", url: "/", data: pages.home, render: renderHome },
  { out: "workshops/index.html", url: "/workshops/", data: pages.workshops, render: renderWorkshops },
  { out: "book-a-tattoo/index.html", url: "/book-a-tattoo/", data: pages.booking, render: renderBooking },
  { out: "portfolio/index.html", url: "/portfolio/", data: pages.portfolio, render: renderPortfolio },
  { out: "about/index.html", url: "/about/", data: pages.about, render: renderAbout },
  { out: "contact/index.html", url: "/contact/", data: pages.contact, render: renderContact },
];

/* Clear the previous output so deleted pages don't linger. On a fresh Vercel
   checkout there is nothing to clear. If the filesystem refuses the delete we
   warn and carry on rather than failing the whole build — a stale leftover file
   is a much smaller problem than a site that won't deploy. */
if (existsSync(OUT)) {
  try {
    rmSync(OUT, { recursive: true });
  } catch (err) {
    console.warn(`warning: could not clear ${OUT} (${err.code}). Continuing — ` +
                 `files will be overwritten, but anything deleted since the last ` +
                 `build may still be present.`);
  }
}
mkdirSync(OUT, { recursive: true });

for (const r of ROUTES) {
  const html = head(r.data) + header(r.url) + r.render(r.data) + footer();
  const dest = join(OUT, r.out);
  mkdirSync(dirname(dest), { recursive: true });
  writeFileSync(dest, html);
  console.log("built", r.url);
}

/* Copy static files by hand rather than with fs.cpSync. cpSync uses a native
   directory-copy call that some filesystems (network shares, sandboxed mounts)
   refuse with EACCES even when plain writes succeed. This walk only ever calls
   mkdir and copyFile, which work everywhere. */
function copyDir(from, to) {
  mkdirSync(to, { recursive: true });
  for (const entry of readdirSync(from)) {
    if (entry === ".DS_Store") continue;
    const src = join(from, entry);
    const dest = join(to, entry);
    if (statSync(src).isDirectory()) copyDir(src, dest);
    else copyFileSync(src, dest);
  }
}

for (const dir of ["assets", "css", "js"]) {
  if (existsSync(join(ROOT, dir))) copyDir(join(ROOT, dir), join(OUT, dir));
}
if (existsSync(join(ROOT, "favicon.svg"))) {
  copyFileSync(join(ROOT, "favicon.svg"), join(OUT, "favicon.svg"));
}

console.log("done — output in _site/");
