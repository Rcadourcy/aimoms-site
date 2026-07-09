# CLAUDE.md — ai.moms™ (aimoms.ai)
*Last updated: 2026-06-22*

## What this is
ai.moms™ is "the #1 destination for moms to learn AI — so she can get her time back and
learn to build her dreams." It's a multi-product education + media brand for mothers: a
paid Foundations course, a monthly membership, a monthly virtual workshop, in-person
experiences/events, a free newsletter ("The Edit") with a 43-article library, a shop, and
a quiz funnel. The throughline: take an overwhelmed mom from drowning in "the invisible
load" to confidently using AI — "Retire from Chief Everything Officer™."

The site is being migrated from a hand-built static HTML site on Netlify to Next.js +
Supabase on Vercel, preserving money flow, lead capture, SEO, and ad tracking. Raquel
(founder) maintains it — she is non-technical, hand-edits content, and is new to Git, the
terminal, and Claude Code. Build and explain accordingly.

## The user
Moms, in three personas the brand speaks to directly:
- **Mom at home** — "drowning in the invisible load — the calendars, the meals, the school forms."
- **Mom at work** — short on time, afraid of being "left behind" professionally.
- **Mompreneur** — "building something" and needs "leverage" to balance it all.
She should feel seen and capable, never judged. "No stupid questions vibes. You are not alone."

## Brand & copy voice (this site has NO AI chat feature — these rules govern all copy)
- Warm, validating, empowering — speak TO moms as a fellow mom, never clinically or from above.
- Name the overwhelm ("the invisible load"), then offer hope + a practical next step.
- Anti-hustle: "You don't need more hustle — you need a team." Never guilt or shame.
- Plain language, zero jargon. "Not theory — practice."
- Emoji sparingly and meaningfully (💕 🌸).
- Keep signature brand terms intact: "Chief Everything Officer™", "the invisible load",
  "Aime", "built by moms, for moms."
- NEVER make copy salesy/spammy, condescending, or medical/clinical.

## "Aime" means two different things — keep them distinct
- **The Aime chatbot** (the old on-site `aime.html` tool that called the Anthropic API) is
  **intentionally removed.** The migrated site has NO AI feature. Do not re-add an AI chat
  or call any LLM API from the site without Raquel's approval.
- **"Aime" the concept** — the custom AI assistant a mom *builds herself* in the Foundations
  course (her personal "Chief Everything Officer™") — is core brand vocabulary. Keep it.

## Tech stack (target — project is pre-migration; no package.json yet)
- Next.js (App Router) + TypeScript
- Tailwind CSS (fidelity-first port of the current inline styles, then refactor)
- Supabase (Postgres for articles + form submissions; Auth later for the gated course)
- Resend (transactional email — replicates Netlify Forms notifications). Raquel owns the
  account; API key lives in Vercel env, never in code.
- Vercel (deployment). **Hosting/access plan: build directly on Raquel's Vercel + Supabase
  accounts via TOKENS + CLI** (Lauren's own free accounts are at their project limits, and
  paid team-member invites aren't an option). Lauren's OAuth MCPs stay on her own account;
  a token drives the CLI against Raquel's account — they coexist, so use the CLI (not MCP
  tools) for Raquel's projects. Vercel: `VERCEL_TOKEN` + `vercel --token`. Supabase:
  `SUPABASE_ACCESS_TOKEN` + `supabase link/db push`. Tokens via one-time link; runtime keys
  in gitignored `.env.local`. Building where it'll live means no cutover migration later.
  Note: Hobby is non-commercial — the paid course site should move to Pro before/at launch.
- Stripe Payment Links (hosted checkout — URLs only, no Stripe SDK). The Foundations
  **course link + price are config/env values** and will change soon (see Non-negotiables).
- Facebook Pixel (ad tracking)
- No AI/LLM feature on the site.

## Repo layout (during migration)
- **Repo root** = the live static HTML site (Netlify). This is the **reference** — the
  source of truth for content, copy, pricing, Stripe links, Pixel, and exact URLs while we
  rebuild. Do not break it; it stays live until cutover.
- **`next/`** = the new Next.js app (App Router + TS + Tailwind 4). All rebuild work happens
  here. We swap it in at cutover, then retire the root HTML.
- Supabase + Vercel are **not provisioned yet** (deferred — do together with Lauren).

## What's been built (current static site — the migration target)
- Homepage; Foundations course (sales → register → thank-you)
- Membership $59/mo (sales → register → thank-you)
- Monthly Workshop $68 (sales → register → thank-you)
- Experiences & Events (display-only pricing; host-application + out-of-office waitlist forms)
- Shop (course, gift, bundle); Quiz funnel (→ course)
- Subscribe / newsletter ("The Edit"); Editorial + 43 articles (rendered from articles-data.js)
- Community, Science, Corporate, Curriculum, Press
- Careers + 6 intern pages; Privacy, Terms; success / thank-you pages

## Non-negotiables (enforce on every change)
- NEVER alter, replace, or remove a **Stripe Payment Link** — copy them verbatim. Money
  flow is the most protected part of this site.
- **PROTECTED EXTERNAL WORKFLOW — course provisioning.** A Foundations purchase grants
  course access via a chain that runs entirely OFF this website: Stripe checkout →
  a **Make.com** scenario (Raquel's account) → (1) creates the buyer as a user in
  **Supabase**, (2) emails them a **magic link to set a password** and enter the
  Foundations course (hosted separately on Netlify at `aimomsfoundationscourse`). Because
  it lives on Stripe + Make + Supabase and NOT on the marketing site, the Netlify→Vercel
  hosting/DNS cutover does not touch it. It only breaks if a **Stripe Payment Link
  changes** or the **Make trigger stops matching** the incoming event. So: when the
  Foundations price/link changes, Raquel must confirm the Make scenario still fires on the
  new link/product. Never modify or "improve" checkout in a way that alters what Stripe
  sends. This flow is owned by Raquel — do not attempt to rebuild it on the site.
- The **Foundations course Stripe link AND price are single config/env values** and will
  change within days (Raquel is raising the price → a new link). Swapping them must be a
  one-line edit — never hard-code or find-replace the course link across pages.
- NEVER remove or modify the **Facebook Pixel** (`fbq` init `1206405304980852`) or its
  `InitiateCheckout` / `Lead` / `ViewContent` / `PageView` events on existing elements —
  ad attribution depends on it.
- ALWAYS preserve existing **URL slugs** exactly (SEO + shared links). The `*-thank-you`
  pages are Stripe `success_url` targets — never rename or remove them.
- Every **form** must persist to Supabase `submissions` AND email Raquel via Resend. A
  purchase-lead form must STILL redirect to Stripe even if the capture call fails.
- NEVER call Stripe/Supabase service keys/Resend from client code — only via `app/api/` routes.
- NEVER hard-code secrets/API keys — `process.env` only. (The current site has zero
  hard-coded secrets; keep it that way.)
- NEVER add live checkout to **Events ($150)** or **Experiences ($125→$150)** until Raquel
  provides Stripe links — display-only + lead/host forms only.
- **Course price stays $247** for now. Do not change any pricing without Raquel's approval.
- All **43 articles** live in Supabase (migrated from articles-data.js) and must render identically.
- When the gated course area gets auth (future): users can NEVER see another user's data —
  every user-content table needs Row Level Security scoped to `auth.uid()`.
- NEVER add new pages/features without Raquel's approval.

## Session protocol
At the end of every session, Claude must:
1. Update `.ai/memory.md` with what was built, decisions made, and any errors fixed.
2. Set "Next step" specific enough that the next session starts without re-explaining context.
3. Suggest a git commit message if there are uncommitted changes.

## Project links
- Live URL: https://aimoms.ai (currently hosted on Netlify)
- GitHub: not created yet (no remote)
- Supabase project: not provisioned yet
- Vercel project: not provisioned yet
- Future gated course: aimomsfoundationscourse.netlify.app (route placeholder only for now)

## Known gotchas
- The **Foundations Stripe link changes whenever the price changes** — it's a single config
  value, never find-replace across pages.
- **Netlify Forms do NOT exist on Vercel** — all forms must be rebuilt as API routes, or
  lead capture silently dies.
- **67 hotlinked `images.unsplash.com` URLs** are fragile (rate limits/policy) — being
  re-hosted into `/public`.
- **`*-thank-you` pages double as Stripe `success_url` targets** — renaming a slug breaks
  the post-payment redirect. Note: `success_url` only controls where the *buyer's browser*
  lands; it does NOT trigger course provisioning. Course access is created by the Make
  scenario off a Stripe *event*, so provisioning fires even if a buyer closes the tab
  before the thank-you page loads.
- **Course provisioning (Stripe → Make → Supabase user + magic-link email) is external and
  survives cutover** — see the PROTECTED EXTERNAL WORKFLOW non-negotiable. Verify it with a
  real/test purchase at cutover; it is not visible in this repo or Lauren's Make account.
