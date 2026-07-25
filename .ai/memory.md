# Working Memory — ai.moms™ (aimoms.ai)
*Started: 2026-06-22*

## Current Sprint
Working on: Migrating the static HTML site → Next.js + Supabase + Vercel.
  Full plan: ~/.claude/plans/aime-html-is-no-robust-fog.md
Status: Phases 0,1,2,3,4,6,7a,7b DONE & verified. Build green — 41 routes.
  LIVE PREVIEW: https://aimoms-preview.vercel.app (on LAUREN's Vercel Hobby, project
  aimoms-preview — Raquel was inaccessible; real launch must redeploy to Raquel's Pro).
  Verified live: pages 200, /article from Supabase, local images, a form POST wrote a real
  Supabase row. 6 runtime env vars set in Vercel (Production scope).
  - Supabase LIVE on Raquel's project (ref pzrrxtakwvspstwbvefb). Migration applied via the
    Management API (no CLI). 43 articles imported; /article reads from Supabase (lib/articles.ts,
    local fallback). 10-form handler app/api/forms/[form]/route.ts verified live (rows + Resend
    200; honeypot dropped; unknown→404). RLS: articles public-read, submissions server-only.
  - 42 unsplash images re-hosted to public/img/articles/ (67 refs rewritten; Supabase re-imported).
  - Keys in next/.env.local (gitignored): Supabase URL/anon/service, Resend key/from/to,
    SUPABASE_ACCESS_TOKEN (sbp_) + SUPABASE_PROJECT_REF.
  Commits this session: 4d7401a (Phase 3+4), 02c227c (Phase 7a).
Blocked by: VERCEL_TOKEN (Lauren getting it) for the preview deploy; GoDaddy DNS for cutover;
  Raquel's Stripe dashboard for success_url.
Next step:
  - Phase 7b: `vercel --token $VERCEL_TOKEN` deploy from next/ to a preview URL; set the 6
    runtime env vars in the Vercel project (Supabase URL/anon/service, Resend key/from/to);
    smoke-test preview (article, a form, pixel).
  - Cutover (GoDaddy DNS): verify aimoms.ai in Resend (then FROM/TO → hello@aimoms.ai);
    export existing Netlify Forms leads; point DNS Netlify→Vercel (Netlify as fallback).
  - Phase 5 (Raquel): set each Stripe link's success_url → matching *-thank-you page.
  Article notes: /article reads ?id= (dynamic server page), renders from the new
  next/lib/articles-data.ts (43 articles, copied verbatim from articles-data.js -> ESM +
  types; temporary until Phase 3 Supabase). getArticle/ARTICLE_IDS exported. Gift modal
  self-purchase -> STRIPE_LINKS.foundationsPayInFull, gift-purchase -> STRIPE_LINKS.courseGift
  (redirect-regardless on capture; POST /api/forms/* wired Phase 4). CTA hrefs mapped to
  clean slugs (index.html->/ , aime.html->/foundations [aime removed], subscribe.html->
  /subscribe, toolkit.html->/toolkit). Body images still hotlink unsplash (Phase 7 re-host);
  hero images are local /img-*.jpg (all 28 present in public).
  Quiz notes: ported as full interactive client component (components/QuizApp.tsx) with
  TODO(raquel) keep/redesign/remove. 4 screens (intro/quiz/result/final), all Pixel events
  preserved (quiz-started, quiz-result value:total, pay-full/pay-split InitiateCheckout,
  Lead "Quiz Completed" + "quiz-lead"). Course buy buttons use STRIPE_LINKS.foundations*
  + PRICES (pay-split value = foundationsTwoPay*2 = 248, i.e. 124x2; $1 over the $247
  pay-in-full — by design, not a stale-value bug). quiz-leads form POSTs to
  /api/forms/quiz-leads (Phase 4), shows final screen on success. OG image normalized to
  /og-image.png (source used social-share.jpg, likely not re-hosted). Terms/Privacy links
  now internal /terms /privacy (those routes still pending port).
  Shop note: course card + course-gift display use PRICES.foundations (single config
  value); gift links are STRIPE_LINKS.courseGift ($247) + STRIPE_LINKS.bundle ($297),
  verbatim. Course card fires InitiateCheckout content_name "shop-course". Shop reuses
  the global FloatingQuizCTA + NewsletterPopup (same as foundations); cookie/pixel/PageView
  are global (Analytics in layout) — shop's inline pixel init was NOT duplicated.
  ⚠️ FLAGS for Raquel (stale Pixel values — ported verbatim for attribution parity,
  confirm before launch):
   - membership-thank-you fires "Subscribe" value:49, but membership is $59/mo.
   - workshop-thank-you fires "Purchase" value:25, but workshop is $68.
   - workshop-register fires InitiateCheckout content_name "Foundations - Form Complete"
     (a copy-paste leftover on the Workshop form; the event + $68 value are correct).
   - ARTICLE PROMPT BLOCKS (deliberate FIX, not verbatim): the live article.html had a
     switch-statement bug (`case 'prompt'` label deleted) that silently dropped ALL 101
     teachable prompt blocks across the 43 articles. The port RESTORES them (prompt box +
     copy button, exactly as the orphaned code + CSS intended). Confirm this is desired —
     it's the one place we intentionally diverge from live output to recover lost content.
Repo layout: root = live static HTML (reference); next/ = the Next.js rebuild.

## Patterns established (reuse these when porting pages)
- Shared chrome lives in app/layout.tsx (fonts, fbq queue stub, <Header/><Footer/><Analytics/>).
- Design system in app/globals.css; per-page sections in app/<page>.css (plain global import,
  NOT CSS modules, so class names stay intact).
- Internal links → clean slugs via next/link (e.g. /foundations, NOT foundations.html).
- Pixel-tracked CTAs → <TrackedLink href event params> (components/TrackedLink.tsx).
- window.fbq typed in next/types/global.d.ts.
- Static assets already copied to next/public (img-*, raquel.png, og-image.png, favicon.svg).
- Stripe links + prices: import from next/lib/commerce.ts (never hardcode).
- Each page wraps its body in <div className="page-NAME"> and its CSS lives in
  app/NAME.css scoped under .page-NAME { ... } (CSS nesting; @keyframes hoisted out).
- Register forms = client components: validate → InitiateCheckout pixel → POST to
  /api/forms/<name> (Phase 4; .catch redirects anyway) → window.location to Stripe
  (full vs ?plan=split) with prefilled_email. Thank-you pages: <PurchasePixel/>.
- Reusable: TrackedLink, NewsletterPopup, FloatingQuizCTA, PurchasePixel.

## What's been built
(Static site on Netlify, as of 2026-06-22 — the migration target)
Homepage, Foundations (sales/register/thank-you), Membership $59/mo, Workshop $68,
Experiences & Events (display-only), Shop, Quiz funnel, Subscribe/newsletter "The Edit",
43 articles (articles-data.js), Community/Science/Corporate/Curriculum/Press,
Careers + 6 intern pages, Privacy/Terms.

## Deployment
Last deploy: Live on Netlify (aimoms.ai) — pre-migration.
Live URL: https://aimoms.ai
Last commit: "docs: switch plan to Vercel + AI SDK; add Stripe/Forms migration requirements"
Deploy status: Live on Netlify; not yet on Vercel.

## Decisions made and why
- 2026-06-22: Source of truth = Raquel's canonical multi-product zip (newer than the old snapshot).
- 2026-06-22: Drop the on-site Aime chatbot (no longer live); no AI feature in the migrated site.
  ("Aime" the concept — the assistant a mom builds in the course — stays as brand language.)
- 2026-06-22: Course stays $247 for now (config/env value); its Stripe link + price will
  change within days when Raquel raises the price — keep both as one-edit config.
- 2026-06-22: Form notifications via Resend → hello@aimoms.ai; Lauren sets it up during
  migration, Raquel owns the account; API key in Vercel env. Newsletter list may move to
  ConvertKit/Kit later.
- 2026-06-22: about.html (intentional removal) and welcome.html (dup of index) dropped.
- 2026-06-22: Stripe success_url → on-site *-thank-you pages (Stripe doesn't host the
  confirmation; those pages are in the zip).
- 2026-06-22: Gated course area (aimomsfoundationscourse) = route placeholder only this
  migration (Supabase Auth later).
- 2026-06-22: Quiz = port as-is + TODO (keep/redesign/remove later).
- 2026-06-22: Re-host the 67 Unsplash images into /public. DNS registrar access available for cutover.

## Phase log
- 2026-06-22 — Phase 0 complete (commit c5d5b21): synced project to Raquel's canonical
  multi-product zip. Added 14 new pages (Foundations/Membership/Workshop sales+register+
  thank-you, Experiences, Events, host-application, host-success, out-of-office-waitlist);
  refreshed every existing page + sitemap.xml + raquel.png; deleted about/aime/on-demand/
  waitlist; dropped welcome.html (dup of index). articles-data.js unchanged (43 articles).
  Handbook commit beforehand: c5904da.
- 2026-06-22 — Phase 1 local scaffold (commit 876d0e5): create-next-app → Next 16
  (App Router) + TS + Tailwind 4 + ESLint in next/. Removed create-next-app's generic
  CLAUDE.md/AGENTS.md (root handbook is authoritative). Supabase/Vercel NOT provisioned.

## Errors fixed — don't repeat these
(None yet.)

## Session — 2026-07-06
- Traced the Foundations purchase flow: foundations-register.html (Netlify capture) →
  Stripe payment link → foundations-thank-you.html (success_url, fires Meta Purchase
  pixel). The thank-you page does NOT link/redirect to the course player; access is
  delivered out-of-band by a welcome email from hello@aimoms.ai (set password → player).
  No email automation lives in this repo — confirm it survives the Vercel cutover.
- Added a visible "Go to my course" safety-net access button on BOTH thank-you pages
  (root foundations-thank-you.html reusing .cta-link; next/app/foundations-thank-you
  page.tsx + new .course-access-link class in foundations-thank-you.css). Links to the
  course host root https://aimomsfoundationscourse.netlify.app (NOT the deep
  /foundations-player.html — host root handles first-time set-password + returning login).
  Money flow (Stripe links) and Meta Pixel untouched. next tsc --noEmit passes.
- Next step: confirm the post-purchase welcome-email automation (Stripe/Netlify/Make?) and
  where its link lands; decide whether to point the button at /foundations-player.html
  directly once the auth/set-password flow is known. Migrated foundations-course page is
  still a noindex placeholder pending Raquel's approval to add a nav slot.

## Session — 2026-07-07 (forms notifications + signups admin)
FINDINGS
- Welcome-email automation is NOT in the repo and NOT in Lauren's Make account (only 3
  scenarios there: LinkedIn x2 + Notion — none touch ai.moms). It lives on Raquel's side
  (Stripe/Netlify Identity on the course host, or a manual invite). STILL UNVERIFIED —
  must ask Raquel: "When someone pays for Foundations, what actually sends the login
  email, and is it automatic?" The /admin dashboard already shows a live test submission
  (lea129psu@gmail.com), so Supabase IS provisioned/connected despite CLAUDE.md's stale
  "not provisioned yet" note.
- Forms pipeline was ALREADY built by a prior session: app/api/forms/[form]/route.ts
  (Supabase submissions insert + Resend notify + honeypot + purchase-safe redirect), the
  submissions table migration (20260623000001_init.sql, RLS-locked, service-role only),
  and every register form component POSTs to it. The "TODO(phase4)" comment in
  WorkshopRegisterForm is stale — it already hits the real route.

BUILT THIS SESSION
- Per-workshop grouping: added WORKSHOP.date to lib/commerce.ts (single monthly config,
  mirrors the sales-page date) + hidden `workshop_date` field in WorkshopRegisterForm.
  Stored in submissions.data (no schema change). Admin groups workshop signups by it.
- /admin signups view (recreates the Netlify Forms tab, friendlier): app/admin/page.tsx
  (server, force-dynamic, service-role fetch), AdminLogin.tsx, AdminDashboard.tsx (client:
  per-form tabs w/ counts, search, per-workshop groups, CSV export), admin.css.
- Gate: lib/admin-auth.ts + app/api/admin/login|logout routes. Single ADMIN_PASSWORD env
  (added empty to .env.local), httpOnly cookie = SHA-256 of password (raw pw never in
  browser). Simple internal gate — upgrade to Supabase Auth later. NOT per-user auth.
- Safety-net "Go to my course" button added last session to BOTH thank-you pages still in.
- Verified: tsc --noEmit clean, next build clean (/admin + /api/admin/* are dynamic),
  and a live end-to-end run (login/wrong-pw/logout + dashboard rendered the real test row).

NEXT STEP
- Raquel to (1) confirm the welcome-email automation + where its link lands, (2) pick an
  ADMIN_PASSWORD and set it in Vercel env (and .env.local for local). Optional: wire the
  workshop sales-page date to WORKSHOP.date so it's truly one edit/month. Also flagged:
  WorkshopRegisterForm fires InitiateCheckout with content_name "Foundations - Form
  Complete" (copy-paste leftover) — correct before launch.

## Session — 2026-07-07b (course-provisioning workflow confirmed + cutover-protected)
CONFIRMED BY RAQUEL — the real course-access flow:
  Stripe checkout → a Make.com scenario (Raquel's Make account) that (1) creates the buyer
  as a user in Supabase, (2) emails a magic link to set a password and enter the course
  (hosted on Netlify at aimomsfoundationscourse.netlify.app).
KEY INSIGHT: this chain runs on Stripe + Make + Supabase, NOT on the website. So the
  Netlify→Vercel cutover CANNOT interrupt it. It only breaks if (a) a Stripe Payment Link
  changes, or (b) the Make trigger stops matching the Stripe event. success_url only steers
  the buyer's browser to the thank-you page — it does NOT trigger provisioning (Make fires
  off the Stripe event, so access is granted even if the buyer closes the tab).
  Supabase is the SAME live project (pzrrxtakwvspstwbvefb) that holds articles + form
  submissions — course buyer accounts live there too. Don't let migrations/RLS touch the
  course/auth tables. The Make scenario is NOT in this repo and NOT in Lauren's Make acct.
DID THIS SESSION:
- CLAUDE.md: added "PROTECTED EXTERNAL WORKFLOW — course provisioning" non-negotiable +
  two Known-gotcha notes (success_url ≠ provisioning trigger; verify at cutover).
- CUTOVER-CHECKLIST.md: added key fact; a price-raise warning (if Foundations product/price
  changes, confirm Make trigger still matches or provisioning silently stops); and new
  STEP 5b — verify provisioning end-to-end via a completed test purchase (Stripe test card
  4242…, or real+refund), confirming Make ran → Supabase user → magic-link email → password
  set → course opens. Cleanup test user.
- Rewrote the safety-net note on BOTH thank-you pages (root html + next tsx) to match the
  real flow: welcome email has the set-password link; if missing, use "Forgot password" on
  the course login (works because Make already created the account) or email hello@aimoms.ai.
- Verified: tsc --noEmit clean.
NEXT STEP:
- At cutover, run STEP 5b once to prove provisioning is healthy. Raquel to set ADMIN_PASSWORD
  in Vercel env for the /admin signups view. Optional pre-launch: fix WorkshopRegisterForm
  InitiateCheckout content_name leftover ("Foundations - Form Complete"); wire workshop
  sales-page date to WORKSHOP.date.

## Session — 2026-07-14 (in-person workshop support)
- Workshop taxonomy (from site menu): Monthly Workshop = virtual/Zoom $68; in-person
  events are city-based ($150, tags In Person/Virtual/Int'l/Day Retreat/Date TBC) and today
  route to external rsvp.aimoms.ai/<city>/ links. Raquel confirmed in-person workshops are
  coming through the registration flow.
- Added `format` + `location` to WORKSHOP config (lib/commerce.ts) — single values updated
  per workshop. Stamped onto each registration via hidden fields in WorkshopRegisterForm.
  Admin now groups workshop-signup by composite key (date + location) so same date in two
  cities stays separate; group header shows a format badge (Virtual/In person) + 📍location;
  CSV includes the new fields. Hid workshop_date/format/location/_test from row chips.
- Deployed to https://aimoms-preview.vercel.app (prod on the aimoms-preview test project;
  real aimoms.ai still on Netlify, untouched). Re-seeded 41 test rows tagged
  data._test='seed-2026-07b' (6 workshops: 3 virtual + 3 in-person w/ venues). Cleanup:
  DELETE submissions where data->>_test = 'seed-2026-07b'. Commit 600c88c.
- ADMIN_PASSWORD on Vercel = 1234 (TEMP — change before real/production use).

## Session — 2026-07-25 (job machine — personal tool, not site)
- Built `/job-machine` skill at `.claude/skills/job-machine/` — Raquel's personal executive
  job search. NOT an ai.moms feature; must never be linked from or deployed with the site.
- Pipeline: Indeed search across title variants → hard filters (salary floor, age, excluded
  titles/companies, dedupe vs tracker) → detail lookup → 100-pt weighted score → tailored
  cover letter + resume angle → Gmail draft → log to applications.md.
- All tuning in one file: `criteria.json` (min_salary 250000, draft_threshold 70, cap 5).
- Auto-submit is OFF and gated behind `auto_submit_enabled` + an empty allow-list.
  Discovered: Indeed MCP has search/details/resume but NO apply tool; Gmail MCP has
  create_draft but NO send. So there is currently no wire to submit down. Portal apply
  (Indeed/LinkedIn/Workday/Greenhouse) is permanently barred — ToS + account risk. Only a
  posting that publishes an application email can ever qualify.
- Validated against real data: 20 results for CMO/VP Marketing, only 3 clear the $250k floor
  (Prosper $268-362k, Group1001 $250-350k, BLOOM $225-275k). One "CMO" posting paid $30k.
- `resume.md` is a deliberate placeholder — the skill HALTS on it so nothing gets fabricated.
- Noted: Indeed profile resume is OCR-damaged (`Gr\` owth`, `Lu xur y D ail y`) — that's what
  employers see on Indeed applies; worth fixing at profile.indeed.com.
NEXT STEP:
- Raquel to supply the real resume (she was mid-message telling me where it is). Drop it into
  `.claude/skills/job-machine/resume.md`, then run `/job-machine` for a first live pass.

## Session — 2026-07-25 (job machine — real resumes, split into two tracks)
- Raquel supplied her two real resumes (PDFs) mid-session, correcting the earlier
  placeholder. Restructured the skill around them:
  - `resume-marketing.md` (CMO/Marketing track) and `resume-ops.md` (COO/Operations
    track) — full real content: 3x first CMO (Allure Bridals, Nativo, Modern Luxury
    Media), VP Global Brand Marketing (Undertone), LVMH/Hennessy, HelloWorld/Merkle.
    Correction to earlier assumption: current role is Founder & Advisor, RVC Advisory
    Group (2025-present, also how ai.moms was incubated) — NOT still employed at Nativo,
    so no confidentiality exclusion needed there.
  - `criteria.json` now has a `tracks` object (marketing, ops), each with its own titles
    and resume_file. `candidate` block updated with phone/LinkedIn/current role.
  - `SKILL.md` rewritten so every step (search/filter/score/draft) runs once per track,
    and a job is only ever scored against its own track's resume — never mixes marketing
    metrics into an ops cover letter or vice versa.
  - `references/scoring.md` seniority_match now has separate ladders for each track; added
    a second worked example (ops).
  - `applications.md` tracker gained a Track column; same company can legitimately appear
    once per track (different postings).
  - Removed the old single `resume.md` placeholder file.
- PDF text extraction needed pip installs in this environment (poppler-utils apt install
  404'd; used pip pypdf/pdfminer.six + reinstalling cffi/cryptography to fix a broken
  system _cffi_backend). Not a repo change, just environment troubleshooting.
- Auto-submit design unchanged: still off, still gated on an empty allow-list, since Indeed
  MCP has no apply tool and Gmail MCP has no send.
NEXT STEP:
- Run `/job-machine` for a first live pass across both tracks now that real resumes are in.
- Ask Raquel whether "Chief of Staff to the CEO" belongs in the ops track's titles (kept it
  in on a judgment call - it fits the resume's operational-partner pattern but pays less
  than COO/SVP Ops on average, so watch whether it's pulling in weaker comp than the floor).
