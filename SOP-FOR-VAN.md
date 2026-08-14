# Vie Glow website — how to look after it yourself

This is your instruction manual. You don't need to install anything, and you
don't need to use a black terminal window. Everything here happens in a normal
web browser.

**Read Part 1 first.** It explains how the site works in plain terms, and the
rest will make much more sense afterwards.

---

## Part 1: How this site works (the 2-minute version)

Think of it like a recipe binder.

- **GitHub** is the binder. It holds the pages of the website.
- **Vercel** is the kitchen. It reads the binder and cooks the live website.
- **vieglow.ca** is the sign on the door that sends people to the kitchen.

When you change a page in the binder, the kitchen notices within about a
minute and re-cooks the site automatically. You never "publish" or "upload"
anything. You just edit and save.

**What this means for you:**

- You only ever need to log into one place: **GitHub**
- Changes go live on their own, about 60 seconds after you save
- Every change you've ever made is saved forever, so nothing can be truly lost

### The one habit that keeps you safe

Every time you save a change, GitHub asks you to type a short note about what
you changed. Always write something real, like "changed workshop price" — not
"update". Future-you will thank present-you when something needs undoing.

---

## Part 2: Making a text change

Let's say you want to change some wording on a page.

- Go to https://github.com and log in
- Click on your website repository (the folder with the site in it)
- Find the file for the page you want to change:

| Page on the website | File to open |
|---|---|
| Home page | `index.html` |
| Workshops | `pages` folder → `workshops.html` |
| Book a Tattoo | `pages` folder → `book-a-tattoo.html` |
| Portfolio | `pages` folder → `portfolio.html` |
| About | `pages` folder → `about.html` |
| Contact | `pages` folder → `contact.html` |

- Click the file name to open it
- Click the **pencil icon** near the top right (hover over it and it says "Edit")
- You'll now see the page's text mixed in with a lot of pointy brackets like
  `<p>` and `</p>`

### The golden rule of editing

The words **between** the pointy brackets are yours to change.
The pointy brackets themselves are not.

Example — this line:

```html
<h3>Intro Workshop</h3>
```

You may safely change it to:

```html
<h3>Beginner Half-Day Workshop</h3>
```

You must **not** delete the `<h3>` or the `</h3>`. Those tell the browser it's
a heading. Remove them and the page layout breaks.

- Use **Ctrl+F** (Windows) or **Cmd+F** (Mac) to find the words you're looking for
- Change only the words
- Scroll to the bottom
- In the box that says "Commit changes", type what you changed
- Click the green **Commit changes** button
- Wait about a minute, then refresh vieglow.ca to see it

---

## Part 3: Changing a price

Prices sit inside a tag called `price`. On the Workshops page, look for lines
like this:

```html
<span class="price">Price TBC</span>
<span class="duration">Duration TBC</span>
```

- Change `Price TBC` to your real price, for example `$950`
- Change `Duration TBC` to the real length, for example `3 hours`
- Leave `<span class="price">` and `</span>` exactly as they are
- Save the same way as Part 2

---

## Part 4: Adding or swapping a photo

This is two jobs: put the photo in, then point the page at it.

### Job 1 — upload the photo

- Before you start, make the photo smaller. Phone photos are enormous and will
  make your site slow. Go to https://squoosh.app, drag your photo in, and
  download the smaller version.
- Give the file a simple name. Lowercase, no spaces. `brow-healed-01.jpg` is
  good. `IMG 4432 (1).JPG` is bad.
- In GitHub, click the `assets` folder, then the `images` folder
- Click **Add file** → **Upload files**
- Drag your photo in
- Click **Commit changes**

### Job 2 — point a page at the photo

- Open the page file where you want the photo (see the table in Part 2)
- Find a line that looks like this:

```html
<div class="placeholder tile-sq" role="img" aria-label="Placeholder for tattoo photo 2">Tattoo photo</div>
```

That grey striped box on the site is a placeholder. Replace that **whole line**
with this, keeping the same `tile-` word:

```html
<img class="photo tile-sq" src="../assets/images/brow-healed-01.jpg" alt="Healed fine-line rose tattoo on a forearm">
```

- Change `brow-healed-01.jpg` to your actual file name
- Change the `alt` text to a short plain description of the photo. This is what
  blind visitors hear, and it helps you show up on Google. Always write it.
- If you're editing `index.html` (the home page), use `assets/images/...`
  **without** the `../` at the front. Every other page keeps the `../`.
- Save

### The tile sizes

- `tile-wide` — a wide landscape box
- `tile-tall` — a tall portrait box
- `tile-sq` — a square box

Keep the same tile word that was there before and the layout stays tidy.

---

## Part 5: The booking calendar

Your Acuity calendar is embedded on the Workshops page and the Book a Tattoo
page. You do **not** manage it from the website.

- To add dates, change prices, or block time off, log into Acuity as normal
- Changes appear on the website automatically — there is nothing to update here
- The website is just a window looking at your Acuity calendar

---

## Part 6: The Instagram feed and Google reviews

Both of these are run by a widget service (the account set up during the
build). Same idea as the calendar: you don't manage them from the website.

- **Instagram feed** — updates itself when you post. Nothing to do.
- **Google reviews** — updates itself when someone leaves a review. Nothing to do.
- If either one stops showing, log into the widget dashboard and check whether
  the connection to Instagram or Google needs re-authorising. Social platforms
  make you reconnect every so often. That's normal and takes about two minutes.

Keep the widget subscription paid. If it lapses, those two sections go blank.

---

## Part 7: Undoing a mistake

Nothing you do here is permanent. Every save is a snapshot you can go back to.

- In GitHub, open the file you broke
- Click **History** (top right of the file view)
- You'll see a list of every change, newest first
- Click the version from before you broke it
- Click the **"..."** menu → **View file**
- Click the pencil to edit, copy what's there, and paste it back over the
  broken version
- Save

If that feels scary, stop and message Dez instead. That's genuinely fine — a
broken site left alone for an hour is much better than a broken site someone
panicked on.

---

## Part 8: What to never touch

Leave these alone unless you know what you're doing:

- `css/styles.css` — controls how everything looks. One wrong character and
  the whole site loses its formatting.
- `js/main.js` — controls the mobile menu and the contact form
- `vercel.json` — deployment settings
- Anything inside `<head>` at the top of a page file
- Any line that starts with `<!--` — those are notes left by the person who
  built it, not visible on the site

---

## Part 9: Monthly 10-minute checkup

Once a month, on your phone:

- Open vieglow.ca and click through every page
- Click the Book Now button and check the calendar loads
- Check the Instagram section is showing recent posts
- Send yourself a message through the contact form and confirm it arrives
- Check nothing still says "TBC" or "Placeholder"

---

## Part 10: Who to call

| Problem | Where to go |
|---|---|
| Site is completely down | Vercel status page, then Dez |
| Booking calendar not loading | Acuity support |
| Instagram or reviews section blank | Widget dashboard — check the connection |
| Contact form messages not arriving | The form service dashboard |
| Domain or email trouble | Whoever hosts the domain (see DOMAIN-SETUP.md) |
| You broke something and can't undo it | Dez |

---

## An honest note

Editing HTML in GitHub is more fiddly than WordPress was for simple text
changes. What you get in exchange is a site that is far faster, essentially
free to run, can't be hacked through a plugin, and will still work in five
years without updates.

The realistic split is: you handle text and price changes and photos using this
guide, and anything structural goes to Dez. If you find yourself wanting to
change layout regularly, say so — that's a signal we should add a simple
editing tool on top, not a signal that you're doing it wrong.
