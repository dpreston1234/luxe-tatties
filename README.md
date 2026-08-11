# Luxe Tatties

Prototype website for Luxe Tatties (Van Ngo / Vie Glow Academy Inc.) — beginner micro-tattoo workshops and fine-line tattoo booking, based in BC.

## Before this goes live

This is a working prototype, not a finished, launch-ready site. See `PROTOTYPE-NOTES.md` and `review-report.md` for the full list of what's still placeholder (pricing, photos, booking widget embed, contact form backend, analytics, financing wording, etc.) before it should go in front of real customers.

## How to put this on the internet (no git experience needed)

These steps assume you're starting from scratch — follow them in order.

1. **Open a terminal in this folder.** On a Mac, you can right-click the `luxe` folder and look for an "Open in Terminal" option, or open Terminal and type `cd ` (with a space after) then drag the folder into the window and press Enter.

2. **Turn this folder into a git project** by running:
   ```
   git init
   ```
   (If you see a message saying it's already a git repository, that's fine — skip this step.)

3. **Save your first snapshot** by running these two commands, one at a time:
   ```
   git add .
   git commit -m "Initial site build"
   ```

4. **Create a new, empty repository on GitHub:**
   - Go to [github.com](https://github.com) and sign in (or create a free account)
   - Click the "+" icon in the top right, then "New repository"
   - Give it a name (e.g. `luxe-tatties`), leave it empty (don't add a README or .gitignore there — this folder already has one), and click "Create repository"
   - GitHub will show you a repository URL that looks like `https://github.com/your-username/luxe-tatties.git` — copy it

5. **Connect this folder to that GitHub repository** by running (replace the URL with the one you copied):
   ```
   git remote add origin https://github.com/your-username/luxe-tatties.git
   git push -u origin main
   ```
   If it says your branch is called `master` instead of `main`, use `git push -u origin master` instead.

6. **Deploy it with Vercel:**
   - Go to [vercel.com](https://vercel.com) and sign in (you can sign in with your GitHub account)
   - Click "Add New Project"
   - Choose "Import" next to the GitHub repository you just created
   - Leave all the settings as default (this is a plain static site — no build step needed) and click "Deploy"
   - Vercel will give you a live URL in a minute or two

That's it — the site is live. Any time you make changes to the files and want to update the live site, just run `git add .`, `git commit -m "describe what changed"`, and `git push` again — Vercel will automatically redeploy.

## Project structure

```
luxe/
├── index.html              Home page
├── pages/                  About, Workshops, Book a Tattoo, Portfolio, Contact
├── css/styles.css          Shared stylesheet
├── js/main.js              Nav toggle + contact form handling
├── assets/images/          Drop real client photos here (see README.txt inside)
├── client-brief.md         Brand & market research
├── requirements.md         Scoped pages & features
├── review-report.md        Compliance check against the brief/requirements
├── PROTOTYPE-NOTES.md      What's built, what's placeholder, self-check
├── vercel.json             Deployment config (clean URLs)
└── .gitignore
```
