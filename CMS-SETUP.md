# Connecting the CMS — for Dez

Fifteen minutes, no accounts to pay for, nothing to self-host.

---

## What just changed, in one picture

Before, the words on the site lived inside the HTML files. Now they live in
plain data files in `/content`, and a small script builds the HTML from them.

```
  Van edits in Pages CMS
          |
          v
  /content/*.json changes  (Pages CMS saves straight to GitHub)
          |
          v
  Vercel notices the change and runs:  node build.mjs
          |
          v
  Finished HTML lands in /_site  ->  live site updates
```

Van never sees a bracket. She sees labelled boxes: **Workshop name**,
**Price**, **Duration**, **Photo**.

---

## Part 1 — Push the new setup first

The CMS reads `.pages.yml` from GitHub, so the code has to be up there before
you connect anything.

- Open Terminal
- Run these, one at a time:

```
cd ~/Developer/luxe
git rm -r --cached pages index.html
rm -rf pages index.html
git add -A
git commit -m "Move to content files plus a build step, add Pages CMS config"
git push
```

The `git rm` line removes the old hand-written HTML. It is not needed any
more — those pages are now generated. Nothing is lost; git keeps every old
version forever.

- Go to your Vercel dashboard and watch the deployment
- It should say **Ready**. If it fails, open the build log and send it to me.

**Check the live site works before going further.** If `luxe-tatties.vercel.app`
looks right, the build step is working.

---

## Part 2 — Install Pages CMS

- Go to https://app.pagescms.org
- Click **Sign in with GitHub**
- It asks to install the Pages CMS GitHub App — click through
- When it asks which repositories: choose **Only select repositories** and pick
  just the Vie Glow one

Do not grant it access to all your repos. It only needs the one.

- Back in Pages CMS, click the Vie Glow repository
- It reads `.pages.yml` automatically and builds the editor

You should now see a left-hand menu: Site settings, Home page, Workshops page,
Book a Tattoo page, Portfolio page, About page, Contact page.

---

## Part 3 — Test it yourself before showing her

- Click **Workshops page**
- Scroll to **Your workshops**
- Change a price to something obvious like `$1`
- Click **Save**
- Go to Vercel — a new deployment starts within a few seconds
- Wait about a minute, refresh the site, confirm the price changed
- Change it back

If that round trip works, the whole thing works.

Also worth testing once: click **+ Add** under Your workshops, fill in a fake
one, save, confirm it appears, then delete it. That is the add/remove behaviour
she will actually use.

---

## Part 4 — Give Van access

She needs a GitHub account. That is the one unavoidable signup.

- Have her create a free account at https://github.com
- In your repo: **Settings → Collaborators → Add people** → her username
- She accepts the email invite
- She goes to https://app.pagescms.org, signs in with GitHub, installs the app
  when prompted, and picks the repository

From then on her whole world is app.pagescms.org. Bookmark it on her machine.

---

## Part 5 — Two things now editable that used to need you

**The Instagram and Google review widgets.** In **Site settings** there are two
boxes: *Instagram feed embed code* and *Google reviews embed code*. Paste the
Elfsight snippet into the box, save, done. No code editing. While a box is
empty the site shows a tidy fallback instead of a broken gap.

**The contact form.** In **Contact page** there is *Form delivery address*.
Paste a Formspree address (`https://formspree.io/f/abcdwxyz`) and the form
switches from demo mode to actually sending. Leave it empty and the form stays
off with a note explaining so.

---

## What Van still cannot do — on purpose

- Change colours, fonts, or spacing
- Move sections around or add new page types
- Break the layout

That is the deal being made. She gets safety; you keep the design intact. If
she needs a new section, that is a five-minute job for you: add the field to
the content file, use it in `build.mjs`, add it to `.pages.yml`.

---

## If something goes wrong

**Vercel build fails after a CMS save**

Open the build log. Almost always it is malformed JSON, which means someone
edited a file by hand rather than through the CMS. Use `git revert` on the bad
commit, or fix the file and push.

**Pages CMS shows "no configuration found"**

`.pages.yml` is missing from the default branch, or has a YAML syntax error.
It has to be at the repo root, and it has to be on `main`.

**A photo uploads but does not appear**

Pages CMS writes uploads to `assets/images/` and stores the path as
`/assets/images/filename.jpg`. If a path is missing the leading slash the
image will not resolve.

**Everything looks fine locally but not live**

Vercel is serving `_site`, not the repo root. If you added a file and it is not
showing up, check that `build.mjs` copies it — the passthrough list near the
bottom handles `assets`, `css`, `js` and `favicon.svg` only.

---

## Running it on your own machine

You do not need to, but if you want to preview before pushing:

```
cd ~/Developer/luxe
node build.mjs
cd _site && python3 -m http.server 8000
```

Then open http://localhost:8000

No `npm install`. There are deliberately zero dependencies — nothing to
install, nothing that breaks when a package updates a year from now.
