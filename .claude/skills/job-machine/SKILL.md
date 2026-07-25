---
name: job-machine
description: Runs Raquel's executive job search end to end, across her two tracks (CMO/Marketing and COO/Operations) - searches Indeed, filters against her hard requirements, scores each surviving role against the matching resume, writes a tailored application package for the ones worth her time, and either submits or saves a ready-to-send draft. Use when she asks to run the job search, check for new roles, apply to jobs, or invokes /job-machine.
---

# Job machine

An executive job search, run on a schedule, across **two tracks**: CMO/Marketing and
COO/Operations. Each track has its own titles and its own resume. It finds roles, throws
out the ones that waste her time, writes the application against the right resume, and
gets it as close to sent as the rules allow.

This is a **personal tool for Raquel**. It has nothing to do with the ai.moms website and
must never be linked from it, deployed with it, or turned into a site feature.

## The one thing to get right

Executive roles are not won by volume. A test search for "CMO"/"VP Marketing" alone turned
up a "Chief Marketing Officer" posting at $30,000/year and another at $62,000, against a
$250,000 floor. The value here is in what gets **rejected**, not in how many applications go
out. A run that produces two excellent packages beats one that produces fifteen.

Never pad the results to look productive.

---

## Step 1 — Load the inputs

Read, in this order:

1. `criteria.json` — all tuning lives here, including both tracks' titles and resume files
2. **Both** resume files named under `tracks.*.resume_file` — `resume-marketing.md` and
   `resume-ops.md`
3. `references/scoring.md` — the rubric for both tracks
4. The tracker named in `tracker_file`

**If either resume file is missing or still reads as a placeholder, treat that one track as
blocked and say so — but run the other track normally.** Never invent resume content to
fill a gap. A track running on a real resume and a track sitting out is a legitimate partial
run; two tracks running on fabricated content is not.

The resume files on disk are the source of truth, not the Indeed profile. Raquel updates
that separately; don't quote its text into an application even if it happens to be current.

## Step 2 — Search, once per track

For **each track** in `tracks`, run one `mcp__Indeed__search_jobs` per
`titles` × `search.locations` combination for that track, passing `search.country_code` and
`search.job_type`. All of these are independent — issue every call across every track in a
single parallel batch.

Pool results **within each track separately**. Deduplicate on company + title within a
track, keeping whichever posting is newer. Do not merge the two tracks' result pools — a
company's CMO posting and its COO posting are different jobs, evaluated separately, against
different resumes.

## Step 3 — Hard filters (per track)

Apply `hard_filters` mechanically to each track's pool, before spending a detail lookup on
anything. No judgement at this stage:

- Drop if the salary range top is below `min_salary`. Undisclosed comp follows
  `salary_unknown_action`.
- Drop if posted more than `max_days_since_posted` days ago.
- Drop if the title contains any `exclude_title_keywords` entry (case-insensitive).
- Drop if the company is in `exclude_companies`.
- Drop if the job already appears in the tracker **for that track**. A company can
  legitimately appear once per track (a CMO posting and a COO posting at the same firm are
  not duplicates), but never apply to the same posting twice.

Log the count dropped at each filter, per track. She should be able to see the funnel
working on both sides.

## Step 4 — Detail lookup

Call `mcp__Indeed__get_job_details` on every survivor in both tracks, in parallel.

This is where search-result claims get checked against reality. A posting tagged "Remote"
whose description demands four days onsite is not remote. The description always wins over
the search metadata.

For any employer that isn't obviously well-known, also call `mcp__Indeed__get_company_data`
for the `company_quality` dimension.

## Step 5 — Score

Apply `references/scoring.md` exactly, **using the rubric column and resume for that job's
own track** — a COO posting is never scored against the marketing resume, or vice versa.
Produce a table with per-dimension raw scores, weighted points, and the total, per track, so
the reasoning is visible and arguable.

Anything below `scoring.draft_threshold` stops here. List those as one-line rejections with
the reason — she should see what was passed over and why, so she can retune the config if
the machine is being too fussy or too loose, per track.

## Step 6 — Write the application package

For each job at or above the threshold, up to `application.daily_application_cap`
**per track**, produce:

**A cover letter.** Specific to this posting, drawing only from that track's resume file.
Name the company, the actual problem the role exists to solve, and the two or three things
in her record that speak to it directly. For the marketing track, that usually means the
brand/revenue/campaign metrics (Meta CTR +54%, Google Ads clicks +1,211%, $32MM attributed
revenue). For the ops track, it usually means the transformation and structural work ($10MM
waste eliminated, org redesigns, cross-functional restructures, P&L ownership) — even where
it happened at the same company as a marketing-track letter, lead with different facts. No
template language, no "I am writing to express my interest." If it could be sent to a
different company by swapping a name, it isn't finished.

**A resume angle.** Which experience to lead with for this specific role, and which of her
skills to foreground, from that track's resume. Not a rewrite — targeted guidance, plus any
genuine gap worth naming before an interviewer finds it.

**The apply link**, kept intact with all parameters. Never strip URL parameters.

### Absolute rule on content

Every factual claim must trace to the resume file for that job's track. Do not invent
employers, dates, metrics, degrees, or outcomes, and do not borrow a fact from the other
track's resume even if it's about the same job at the same company — use the version of the
narrative that belongs to the track that's applying. If a posting asks for something she
doesn't have, say so in the run report rather than papering over it in the letter. A
fabricated credential discovered at reference-check stage ends the candidacy and follows her
name.

## Step 7 — Submit or draft

Consult `application.auto_submit_enabled` and `allowed_auto_submit_channels`. These apply
identically to both tracks.

**When `auto_submit_enabled` is false — the current state — nothing is sent.** Every package
becomes a saved draft, and the run report says so plainly.

**Even when it is true**, a channel qualifies for automatic submission only if it is listed
in `allowed_auto_submit_channels`. That list is empty by design. To be added, a channel must
explicitly permit programmatic submission.

These are **never** eligible, regardless of the switch:

- Indeed's apply flow, LinkedIn Easy Apply, or any job-board portal
- Any employer ATS web form (Workday, Greenhouse, Lever, Ashby) driven through a browser
- Anything requiring a CAPTCHA or a login that isn't hers to automate

Automating those violates the terms she agreed to, risks her account, and — the reason that
matters more — flags her application as machine-generated at exactly the level of seniority
where that is fatal.

The one channel that can legitimately qualify: a posting that publishes an application
**email address**. That's a normal email she's entitled to send.

So, per package:

- **Posting lists an application email** → build the complete email via
  `mcp__Gmail__create_draft`, addressed to the employer, subject line and letter in place.
  If auto-submit is enabled and email is an allowed channel, send it. Otherwise it sits in
  her drafts, correctly addressed, one click from sent.
- **Posting is portal-only** (the common case) → create the draft addressed **to her own
  address**, containing the cover letter, the resume angle, and the apply link. She pastes
  and submits. This is the fastest path that doesn't put her account at risk.

Never send anything to an employer while `auto_submit_enabled` is false. Not as a test, not
as a demonstration.

## Step 8 — Log and report

Append one row per job to the tracker, **including which track it came from**: date, track,
company, title, comp, score, what was done, and the apply link. The tracker is what prevents
duplicate applications on the next run, so write it even for jobs that were only drafted.

Then report to her, briefly, with the two tracks clearly separated:

- How many jobs were found per track, and how many each filter removed
- The scored shortlist per track, best first
- What was drafted and where it's waiting
- Anything that needs her judgement — a role just under threshold worth a look, a company
  with worrying reviews, a gap either resume exposed
- Follow-ups now due: anything applied to 7+ days ago with no reply, from either track

If a track found nothing above the bar, say exactly that for that track — don't let a strong
result on one track paper over a quiet one on the other.
