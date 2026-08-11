This folder is where real client-provided photography goes.

Every page currently uses a dashed-border "placeholder" <div> instead of an
<img> tag (see css/styles.css .placeholder class). Once Van provides real
photos:

1. Drop image files in this folder (e.g. hero-workshop.jpg, tattoo-01.jpg).
2. In each HTML page, replace the relevant <div class="placeholder">...</div>
   with an <img src="../assets/images/FILENAME" alt="descriptive text">.
3. Keep the existing alt-text wording as a starting point for the real
   image's alt attribute — it already describes what each slot needs.

Slots needed (see requirements.md for full context):
- Home hero: Van teaching a workshop
- Home gallery: workshop photo, tattoo detail, student practice (3 images)
- Workshops: none currently, but consider adding a workshop-in-progress shot
- Book a Tattoo hero: fine-line tattoo close-up
- Portfolio: 6 client tattoo pieces + 3 workshop moments
- About hero: headshot of Van Ngo
