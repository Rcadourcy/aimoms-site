# aimoms.ai — Netlify → Vercel Cutover Checklist
*Run this live on the call. Lauren drives the technical steps; Raquel provides access + clicks in her own dashboards. Budget ~75–90 min. Goal: aimoms.ai serves the new Next.js site, money + leads + email + pixel all working, with Netlify kept as a fallback until we're sure.*

**The single most important rule:** do everything reversible first, test on the temporary `*.vercel.app` URL, and only flip DNS once we've hit a clean **Go/No-Go gate (Step 5)**. DNS is the only step that touches live traffic, and it's reversible in minutes.

---

## Key facts (so nobody guesses on the call)
- **Supabase** = already Raquel's, already live (project `pzrrxtakwvspstwbvefb`). Articles + form leads tested working. No change needed. *(This same project also holds the course's buyer accounts — see the course-provisioning note below.)*
- **Course provisioning is external and NOT part of this cutover.** When someone buys Foundations: **Stripe checkout → a Make.com scenario → (1) creates the buyer in Supabase, (2) emails them a magic link to set a password and enter the course** (hosted separately on Netlify at `aimomsfoundationscourse.netlify.app`). This chain runs on Stripe + Make + Supabase — **not on the website** — so pointing `aimoms.ai` at Vercel does not touch it. The only ways it breaks: a **Stripe Payment Link changes**, or the **Make trigger stops matching**. We don't rebuild it — we just **don't disturb the Stripe links** and **test it once end-to-end** (Step 5b). It lives in **Raquel's Make account** (owner confirms it's active).
- **Resend** = already Raquel's account (owner `raquelcadourcy@gmail.com`). Needs the `aimoms.ai` sending domain verified (DNS records) so notifications can come from `hello@aimoms.ai`.
- **Vercel** = the preview is currently on *Lauren's* Hobby account. Production must run on **Raquel's Vercel (Pro)** — Hobby is non-commercial.
- **Stripe** = Raquel's. The site is already at `aimoms.ai` today and the thank-you slugs are unchanged, so success URLs should already be correct — we **verify**, not rebuild.
- **GoDaddy** = the DNS registrar. This is where the actual cutover happens.
- **The 6 runtime env vars** Lauren has in `next/.env.local` (Supabase URL/anon/service + Resend key/from/to).

---

## STEP 0 — Before the call (Lauren, tonight)
- [ ] **Create the GitHub repo + push `main`.** Recommended: create it under **Raquel's GitHub** (she owns the asset) and add Lauren as a collaborator — or create under Lauren's and add Raquel/grant her Vercel access. **Private** repo. Secrets are already safe (verified: no `.env` files or keys tracked, and none anywhere in git history). *(If you'd rather create it under Raquel's account, do this as the first item on the call instead.)*
- [ ] In GoDaddy, **lower the TTL** on the existing `aimoms.ai` A/CNAME records to **600 seconds** (10 min). This makes tomorrow's flip propagate fast. *(If Lauren doesn't have GoDaddy access yet, this becomes the first thing on the call — do it and take a short break before Step 6 to let the old TTL expire.)*
- [ ] Confirm the preview is green: https://aimoms-preview.vercel.app (homepage, /events, /experiences, an /article, one test form).
- [ ] Have open: `next/.env.local` (env values), the Stripe link→thank-you map (Step 3), this checklist.

## STEP 1 — Confirm access + current state (first 5 min of call)
- [ ] Raquel is logged in and screen-sharing: **Vercel**, **GoDaddy**, **Stripe**, **Resend** (Supabase too, just in case).
- [ ] Raquel's **Vercel is upgraded to Pro** (paid) — required to host a commercial site. Do this now if not done.
- [ ] **Confirm the Foundations price + Stripe link are still current.** Raquel was raising the price (new link). If it changed, Lauren updates the one line in `next/lib/commerce.ts`, rebuilds, and redeploys before launch.
  - [ ] ⚠️ **If the Foundations link/product changed:** confirm the **Make.com course-provisioning scenario still triggers on the new link/product.** If its trigger filters by a specific Stripe product or price ID, a new product = provisioning silently stops (buyers pay but never get course access). Re-point the Make trigger if needed, then test via Step 5b. *(This risk is about the price change, not the hosting cutover.)*

## STEP 2 — Stand up production on Raquel's Vercel, via GitHub *(no user impact — temp URL only)*
**Deploy model: GitHub-connected** — future content edits auto-deploy on push (the durable path Raquel can maintain).
- [ ] Repo is created + pushed (Step 0). Re-confirm `next/.env.local` and `next/.vercel` are **not** in it (already verified clean).
- [ ] In **Raquel's Vercel** → **Add New → Project → Import Git Repository** → select the repo. *(If it's not listed, click "Adjust GitHub App Permissions" / install the Vercel GitHub app on the account or org that owns the repo.)*
- [ ] ⚠️ **Set Root Directory = `next/`.** The repo root is the old static site; the Next.js app lives in `next/`. Framework preset should auto-detect **Next.js** once the root is right.
- [ ] Add the **6 env vars** (Production scope) — these do **not** carry over from the earlier CLI preview: `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`, `SUPABASE_SERVICE_ROLE_KEY`, `RESEND_API_KEY`, `RESEND_FROM_EMAIL`, `RESEND_TO_EMAIL` (Lauren has the values in `next/.env.local`).
- [ ] **Deploy** → get Raquel's `*.vercel.app` URL.
- [ ] Smoke test that temp URL (homepage 200, one article, one form submit → check the Supabase row). **This is what we'll point the domain at.**
- [ ] Confirm auto-deploy: a trivial commit pushed to `main` triggers a fresh Vercel build.

## STEP 3 — Verify Stripe success URLs *(verify, don't rebuild)*
The site is already `aimoms.ai` and the thank-you slugs are unchanged, so these should already be right. For **each** payment link, open it in Stripe → **After payment / Confirmation page** and confirm it points to the matching on-site page (or just keep whatever `aimoms.ai/...` path is already there — those slugs all exist on the new site):

| Product | Link ends in | Should confirm to |
|---|---|---|
| Foundations — pay in full | `…dZ608` | `https://aimoms.ai/foundations-thank-you` |
| Foundations — 2 payments | `…dZ609` | `https://aimoms.ai/foundations-thank-you` |
| Membership | `…dZ60j` | `https://aimoms.ai/membership-thank-you` |
| Workshop | `…dZ60l` | `https://aimoms.ai/workshop-thank-you` |
| Course gift | `…dZ60a` | its current `aimoms.ai/…` confirmation (confirm with Raquel) |
| Bundle | `…dZ60b` | its current `aimoms.ai/…` confirmation (confirm with Raquel) |

- [ ] All six checked. **Only change one if it points at a `*.netlify.app` URL or a dead path** — otherwise leave it exactly as-is. **Never edit the payment link itself, only the confirmation-page setting.**

## STEP 4 — Verify the `aimoms.ai` sending domain in Resend *(non-disruptive; can run in parallel)*
- [ ] In Raquel's **Resend → Domains → Add Domain → `aimoms.ai`**. Resend shows a set of DNS records (SPF `TXT`, DKIM, and a return-path `MX`).
- [ ] Add **exactly those records** in GoDaddy DNS. *(These only affect email, not where the website points — safe to add anytime.)*
- [ ] Click **Verify** in Resend (can take a few min to propagate).
- [ ] Once verified, Lauren flips the two Resend env vars on Raquel's Vercel to production values and redeploys:
  - `RESEND_FROM_EMAIL` → `hello@aimoms.ai`
  - `RESEND_TO_EMAIL` → `hello@aimoms.ai` (or whichever inbox Raquel wants lead notifications in)
- [ ] Submit one test form on the temp URL → confirm the email actually lands in Raquel's inbox (not just the Supabase row).

## STEP 5 — 🚦 GO / NO-GO GATE (test everything on the temp `*.vercel.app` URL)
Do **not** touch DNS until every box here is checked on Raquel's production temp URL:
- [ ] Homepage, Foundations, Membership, Workshop, Experiences, Events, Editorial, an Article — all load and look right.
- [ ] Click each **Buy/Register** CTA → lands on the **correct Stripe checkout** (right product + price). *(Stop there — no need to pay.)*
- [ ] Submit a **lead form** (e.g., newsletter + a register form) → **Supabase row appears** AND **Raquel gets the email**.
- [ ] A register form still redirects to Stripe even if you submit fast (capture never blocks checkout).
- [ ] **Facebook Pixel** firing (use the Meta Pixel Helper browser extension on the temp URL — confirm PageView + an InitiateCheckout on a buy click).
- [ ] Export existing **Netlify Forms** submissions first: Netlify → the site → Forms → export CSV for each form, so no historical leads are lost. ✅ done.

**If anything fails → stop, fix, re-test. Do not flip DNS.**

## STEP 5b — 🎓 Verify course provisioning end-to-end *(Stripe → Make → Supabase user + magic-link email)*
This is the one flow the Step 5 gate can't prove by "stopping at checkout," because it only fires on a **completed** purchase. It's independent of hosting, so it can be tested **any time** (even before the call) — but confirm it at least once around cutover so we KNOW buyers still get into the course.
- [ ] Run one **completed** Foundations purchase. Cleanest: **Stripe test mode** with a test card (`4242 4242 4242 4242`). If test mode can't reach the live Make scenario, do a **real purchase and refund it** afterward (the refund does not un-provision — remove the test user from Supabase manually).
- [ ] Confirm all four downstream effects, in order:
  1. [ ] The **Make scenario ran** (Make → the scenario → History shows a successful run, no errors).
  2. [ ] The **buyer appears in Supabase** (the course-user table / Auth users).
  3. [ ] The **magic-link email arrived** at the buyer's address.
  4. [ ] The link **sets a password and opens the Foundations course** (lands in the course on `aimomsfoundationscourse.netlify.app`).
- [ ] Also sanity-check the **safety-net fallback**: from `…/foundations-thank-you`, the "Go to my course" button opens the course host, and "Forgot password" there re-sends access for an already-provisioned buyer.
- [ ] Clean up any test user created in Supabase.

**Why this is safe re: cutover:** none of the four steps above touch `aimoms.ai` hosting or DNS — so the flip in Step 6 does not change any of it. We test only to confirm the pre-existing Make scenario is healthy.

## STEP 6 — DNS cutover on GoDaddy *(the actual switch)*
- [ ] In Raquel's Vercel project → **Settings → Domains → Add `aimoms.ai`** (and `www.aimoms.ai`). Vercel will display the exact records to set.
- [ ] In **GoDaddy DNS**, change the records to the values **Vercel shows** (typically: apex `A` record `@` → Vercel's IP, and `www` `CNAME` → `cname.vercel-dns.com`). Replace the old Netlify records. *Use the exact values Vercel gives — don't hardcode from memory.*
- [ ] Wait for Vercel to show **"Valid Configuration"** and auto-issue the SSL certificate (usually a few min; can be up to ~30).
- [ ] **Leave the Netlify site published** — it's our fallback until we confirm the new site is solid.

## STEP 7 — Verify on the real domain (after DNS propagates)
- [ ] `https://aimoms.ai` loads the **new** site over HTTPS (valid padlock), `www` redirects to apex (or vice-versa, however Vercel set it).
- [ ] Re-run the Step 5 checks **on `aimoms.ai`**: a couple of pages, one buy-CTA → Stripe, one form → Supabase row + email, Pixel firing.
- [ ] Spot-check a few old shared URLs / SEO slugs still resolve (e.g. `/foundations`, `/editorial`, an `/article?id=…`, the `*-thank-you` pages).
- [ ] Confirm `aimoms.ai/sitemap.xml` and `/robots.txt` serve.

## ROLLBACK (if something's wrong after the flip)
- [ ] In GoDaddy, **revert the A/CNAME records to the old Netlify values.** Because we lowered TTL in Step 0, traffic returns to Netlify within ~10 min. Netlify was never taken down, so the old site is intact. Then debug on the Vercel temp URL and try again.

## AFTER LAUNCH (cleanup + follow-ups, not on the critical path)
- [ ] Once `aimoms.ai` is stable for a day or two, restore the GoDaddy TTL to a normal value (e.g. 3600).
- [ ] Retire Lauren's `aimoms-preview` project (it was a temporary Hobby preview).
- [ ] Decommission / unpublish the Netlify site once fully confident.
- [ ] Hand Raquel the Resend login; confirm she can see lead notifications.
- [ ] Set the Stripe `success_url`s if any were found pointing at non-aimoms URLs in Step 3.
- [ ] *(Optional)* Walk Raquel through the edit→commit→push→auto-deploy loop once, so she's comfortable making content changes.

---

### Who does what (quick reference)
- **Lauren:** GitHub repo + push, Vercel project import (Root Directory = `next/`) + env vars, build/verify, all testing, reads out the DNS records to set.
- **Raquel:** logs into + screen-shares her dashboards, upgrades Vercel to Pro, authorizes the Vercel GitHub app (if repo is on her account), clicks Verify in Resend, confirms Stripe confirmation pages, makes the GoDaddy DNS edits, confirms the test email landed.
