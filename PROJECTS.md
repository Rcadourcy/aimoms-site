# ai.moms™ — Projects List 💕

*Our running to-do for the site. Everything lives here so it's out of your head and in one place.*
*Last updated: 2026-07-24*

## How this works
- We keep ideas here, then **pick one and build it**. No need to do them in order.
- 🧱 = **Claude can build this** — just say "let's do [name]."
- 👤 = **Needs you** — a decision, a password, or something in your Stripe/Vercel/Make account.
- Move things to **✅ Done** as we finish. Add anything new under **💡 Ideas / Someday** anytime.

---

## 🔴 Up next (the launch — get off Netlify onto your own accounts)
The new site is fully built and working on a test URL. These steps flip it to live on *your* accounts.

1. 👤 **Get the Vercel token to Claude** so the site can deploy to *your* Vercel (right now the preview lives on Lauren's account).
2. 👤 **Upgrade your Vercel to Pro** before launch (the free plan isn't allowed for a paid course site).
3. 🧱👤 **DNS cutover (GoDaddy):** point aimoms.ai from Netlify → Vercel. Keep Netlify as a fallback.
4. 👤 **Verify aimoms.ai in Resend**, then switch form emails to send from **hello@aimoms.ai**.
5. 👤 **Export your existing Netlify Forms leads** before cutover so no signups are lost.
6. 👤 **Set the Stripe "thank-you" redirects:** point each Stripe link's success page to its matching `*-thank-you` page.
7. 👤 **Test the course-access flow once** (buy → Make → Supabase account → magic-link email → set password → course opens). Proves provisioning still works after the move.
8. 👤 **Set a real ADMIN_PASSWORD** in Vercel for the signups dashboard (it's a temporary `1234` right now).

## 🟡 Before-launch fixes & decisions
9. 👤 **Foundations price change:** when you raise the price, we swap one link + you confirm the Make automation still fires. (Course stays **$247** until you say otherwise.)
10. 👤 **Confirm 3 tracking values** (they were copied as-is from the old site — confirm before launch):
    - Membership thank-you reports **$49**, but membership is **$59/mo**.
    - Workshop thank-you reports **$25**, but the workshop is **$68**.
    - Workshop signup form has a leftover "Foundations" label from copy-paste (harmless, but worth cleaning).
11. 👤 **Article "prompt" boxes:** the old site had a bug that hid all 101 teachable prompt boxes across your 43 articles. The new site brings them back. Confirm you want them shown.

## 🟢 Content & product decisions
12. 👤 **The Quiz:** keep as-is / redesign / remove? (Currently ported over untouched.)
13. 👤 **Foundations course page:** it's a hidden placeholder right now — decide when it goes live and gets a nav link.

---

## 💡 Ideas / Someday
*(Add anything here — new pages, campaigns, products, experiments. No idea too small.)*
-
-
-

---

## ✅ Done
- Built the whole new site in Next.js (41 pages, live-tested on a preview URL).
- Moved all 43 articles into the database; they render identically.
- Rebuilt every form to save to the database **and** email you (old Netlify forms don't work on Vercel).
- Re-hosted 42 fragile Unsplash images into the site so they won't break.
- Built a **/admin signups dashboard** (replaces the old Netlify Forms tab, with search + CSV export).
- Added a "Go to my course" safety-net button on the thank-you pages.
- Confirmed & documented the protected course-access flow (Stripe → Make → Supabase).
