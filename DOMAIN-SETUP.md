# Task: Point vieglow.ca at the new Vercel website

**Read all of Part 1 before you touch anything.** It tells you what you're
dealing with. Parts 2 and 3 are the actual work, and Part 4 checks it worked.

The whole thing takes about 20 minutes, plus waiting time.

---

## The one thing that can go badly wrong

A domain name is like a signpost. Right now the vieglow.ca signpost points at
SiteGround. We want it to point at Vercel instead.

But that same signpost **also** points her email where it needs to go. If you
move the whole signpost at once, email stops arriving and nobody tells you —
messages just vanish.

So the safe method is: **move only the website part of the signpost, and leave
the email part exactly where it is.** That's what these instructions do.

- Never click anything that says "Change nameservers" or "Use Vercel DNS"
- Never delete a record whose type is **MX** or **TXT**
- Only add or change records of type **A** and **CNAME**

---

## Part 1: Find out what you're actually dealing with

We need to answer two questions before changing anything.

### Question 1 — Does she have email at @vieglow.ca?

- Ask her directly: "Do you have an email address that ends in @vieglow.ca?"
- If yes, write that down. It means we must be careful with MX records.
- If she only uses Gmail, Hotmail, or similar, there's less to break — but
  follow the same safe steps anyway.

### Question 2 — Where is the domain actually controlled from?

A domain has two separate homes, and they're often different companies:

- The **registrar** — the company she bought the name from and renews it with
- The **DNS host** — the company holding the list of records that says where
  traffic goes

We need the **DNS host**. Here's how to find it:

- Go to https://who.is and type `vieglow.ca` in the search box
- Press Enter
- Look for a line called **Name Servers** (sometimes written "NS")
- Read what it says and match it below:

| What Name Servers says | What it means |
|---|---|
| Something with `siteground` in it | SiteGround controls DNS. Do everything in Part 3 inside SiteGround. |
| Something with `cloudflare` in it | Cloudflare controls DNS. Do Part 3 inside Cloudflare instead. |
| Something with `godaddy`, `namecheap`, `rebel`, `cira` etc. | That company controls DNS. Do Part 3 there. |
| Something with `vercel-dns` in it | Already pointed at Vercel. Skip to Part 4. |

- Write down the answer. You'll need to log into **that** company in Part 3.
- If she can't remember her login for that company, sort that out now. Nothing
  below works without it.

---

## Part 2: Tell Vercel the domain is coming

We do this side first, so Vercel can hand us the exact numbers to type in.

- Go to https://vercel.com and log in
- Click on the website project (the one currently at `luxe-tatties.vercel.app`)
- Along the top, click **Settings**
- In the left-hand menu, click **Domains**
- Click the **Add Domain** button
- Type `vieglow.ca` and click **Add**
- Vercel will ask if you also want `www.vieglow.ca` — say **yes**

Vercel now shows you a box with the records you need. It will look something
like this:

```
Type: A       Name: @      Value: 216.198.79.1
Type: CNAME   Name: www    Value: 6f3a1c....vercel-dns-017.com
```

- **Copy those two values down exactly as Vercel shows them.**
- Do not use values from a blog post or from these instructions. Vercel gives
  each project its own values, and they change over time. The ones on your
  screen are the correct ones.
- Leave this browser tab open. You'll come back to it.

---

## Part 3: Change the two records at the DNS host

Open a second browser tab and log into whichever company you identified in
Part 1 (most likely SiteGround).

### Finding the DNS screen in SiteGround

- Log in at https://siteground.com
- Click **Websites** at the top
- Find vieglow.ca and click **Site Tools**
- In the left menu click **Domain**, then click **DNS Zone Editor**

You'll now see a list of records. This is the signpost.

### Before you change anything — take a photo

- Screenshot the whole list, or scroll and screenshot in pieces
- This is your undo button. If anything breaks, you can put it back.

### Change record 1 — the main address

- Look in the list for a record where **Type** is `A` and **Name** is `@`
  (some hosts show a blank name, or the full `vieglow.ca` — same thing)
- Click **Edit** on that record
- Delete whatever is in the **Value** / **Points to** box
- Type in the A record value Vercel gave you in Part 2
- Save
- If no `A` record with name `@` exists, click **Add New Record** and create
  one: Type `A`, Name `@`, Value = the number from Vercel

### Change record 2 — the www address

- Look for a record where **Name** is `www`
- If it exists and its Type is `CNAME`, click **Edit** and replace the Value
  with the CNAME value from Vercel
- If it exists but its Type is `A`, delete it, then add a new one as below
- If it doesn't exist, click **Add New Record**:
  - Type: `CNAME`
  - Name: `www`
  - Value: the long `....vercel-dns-017.com` address from Vercel
- Save

### Now leave everything else alone

- Do **not** touch any record where Type is **MX** — that's her email
- Do **not** touch any record where Type is **TXT** — that's email
  anti-spam verification
- Do **not** touch any record with `_dmarc`, `_domainkey`, or `dkim` in the
  name — also email

If you only edited the `A` and `CNAME` records above, her email is untouched.

---

## Part 4: Wait, then check it worked

The internet doesn't update instantly. Signposts take time to be repainted
everywhere.

- Wait at least 30 minutes. It can take up to 24 hours.
- Go back to the Vercel tab from Part 2 and refresh the page
- Under Settings → Domains, `vieglow.ca` should change from a warning
  triangle to a green checkmark saying **Valid Configuration**
- Vercel then automatically issues the padlock (the security certificate).
  That happens on its own within a few minutes of the checkmark appearing.

### Then test these four things

- Open https://vieglow.ca — should show the new site
- Open https://www.vieglow.ca — should also show the new site
- Look for the padlock icon in the browser address bar — should be there
- **Send her a test email at her @vieglow.ca address and confirm she gets it**

That last one is the important one. Do it the same day.

---

## If something goes wrong

**The site doesn't load after 24 hours**

- Go to https://dnschecker.org, type `vieglow.ca`, choose type `A`
- If the number shown doesn't match what Vercel told you, the record didn't
  save. Go back to Part 3 and check.

**Vercel says "Invalid Configuration"**

- Click the domain in Vercel and read what value it expected versus what it
  found. Usually a typo or a trailing dot in the value you pasted.

**The padlock never appears / security warning**

- Look in the DNS list for a record of type `CAA`. If one exists and doesn't
  mention `letsencrypt.org`, it's blocking the certificate.
- Either delete the CAA record, or add a second CAA record allowing
  `letsencrypt.org`.

**Her email stopped arriving**

- Go straight back to the DNS list and compare it against the screenshot you
  took in Part 3
- Put back any MX or TXT record that changed
- Email usually starts flowing again within an hour

---

## Part 5: Afterwards — cancel or keep SiteGround?

Once the site is confirmed working and email is confirmed working:

- If the domain is **registered** at SiteGround, keep at least the domain
  registration. Cancelling it entirely can release the domain name.
- If she was paying for **web hosting** at SiteGround, that part is now unused
  and can be cancelled. Vercel serves the website instead.
- Give it a full week of working normally before cancelling anything.
- Her old WordPress site should be backed up before cancelling, just in case.

---

*Written for the Vie Glow site handoff. Vercel's DNS values are project-specific
and change over time — always read them off the Vercel dashboard rather than
copying them from any document, including this one.*
