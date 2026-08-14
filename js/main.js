/* Vie Glow — shared site JS
   Handles: mobile navigation menu, contact form.
   Plain JavaScript, no libraries, no build step. */

document.addEventListener("DOMContentLoaded", function () {
  initNav();
  initContactForm();
});

/* ---------------------------------------------------------------- nav --
   The "Menu" button on phones/tablets opens and closes the navigation.
   Also closes on Escape and on a click outside, which matters for people
   using a phone one-handed. */

function initNav() {
  var toggle = document.querySelector(".nav-toggle");
  var wrap = document.querySelector(".nav-wrap");
  if (!toggle || !wrap) return;

  function setOpen(open) {
    wrap.classList.toggle("open", open);
    toggle.setAttribute("aria-expanded", String(open));
    toggle.textContent = open ? "Close" : "Menu";
  }

  toggle.addEventListener("click", function (e) {
    e.stopPropagation();
    setOpen(!wrap.classList.contains("open"));
  });

  document.addEventListener("click", function (e) {
    if (wrap.classList.contains("open") && !wrap.contains(e.target)) {
      setOpen(false);
    }
  });

  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape" && wrap.classList.contains("open")) {
      setOpen(false);
      toggle.focus();
    }
  });
}

/* ------------------------------------------------------- contact form --
   TO CONNECT THIS FORM FOR REAL (about 5 minutes, free):
     1. Sign up at https://formspree.io (or getform.io).
     2. Create a form. It gives you a URL like
        https://formspree.io/f/abcdwxyz
     3. In pages/contact.html, change the opening form tag to:
        <form id="contact-form" action="https://formspree.io/f/abcdwxyz" method="post">
        (delete the data-demo="true" part)
     4. Delete the grey "This form is not connected yet" note underneath it.
   Once action/method are set, the browser submits the form normally and the
   demo handler below deliberately stays out of the way. */

function initContactForm() {
  var form = document.querySelector("#contact-form");
  if (!form) return;

  var status = form.querySelector(".form-status");
  var isDemo = form.getAttribute("data-demo") === "true";

  form.addEventListener("submit", function (event) {
    // Real endpoint connected? Let the browser submit normally.
    if (!isDemo) return;

    event.preventDefault();

    if (!form.checkValidity()) {
      if (status) {
        status.textContent = "Please fill in every field before sending.";
        status.classList.add("visible");
      }
      form.reportValidity();
      return;
    }

    if (status) {
      status.textContent =
        "Thanks. This form is not connected yet, so nothing was sent. " +
        "Once a form service is connected, messages will reach Van directly.";
      status.classList.add("visible");
    }
    form.reset();
  });
}
