// Vie Glow Academy — shared site JS
// Handles: mobile nav toggle, contact form submission (placeholder).

document.addEventListener("DOMContentLoaded", () => {
  initNavToggle();
  initContactForm();
});

/* ---------- Mobile nav toggle ---------- */

function initNavToggle() {
  const toggle = document.querySelector(".nav-toggle");
  const links = document.querySelector(".nav-links");
  if (!toggle || !links) return;

  toggle.addEventListener("click", () => {
    const isOpen = links.classList.toggle("open");
    toggle.setAttribute("aria-expanded", String(isOpen));
  });
}

/* ---------- Contact form ---------- */
/* PLACEHOLDER: this form does not actually send anywhere yet. Before launch,
   wire `action`/fetch below to a real form backend (e.g. Formspree, a
   serverless function, or the client's email service) and remove the
   simulated success message. */

function initContactForm() {
  const form = document.querySelector("#contact-form");
  if (!form) return;

  const status = form.querySelector(".form-status");

  form.addEventListener("submit", (event) => {
    event.preventDefault();

    // TODO: replace with a real submission endpoint before launch.
    // Example: fetch("https://formspree.io/f/XXXXX", { method: "POST", body: new FormData(form) })

    if (status) {
      status.textContent =
        "Thanks — this is a prototype, so nothing was actually sent. Once a real form endpoint is connected, submissions will reach Van directly.";
      status.classList.add("visible");
    }

    form.reset();
  });
}
