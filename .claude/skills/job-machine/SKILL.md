---
name: job-machine
description: Runs Raquel's executive job search end to end - searches Indeed across her target titles, filters against her hard requirements, scores each surviving role, writes a tailored application package for the ones worth her time, and either submits or saves a ready-to-send draft. Use when she asks to run the job search, check for new roles, apply to jobs, or invokes /job-machine.
---

# Job machine

An executive job search, run on a schedule. It finds roles, throws out the ones that waste
her time, writes the application, and gets it as close to sent as the rules allow.

This is a **personal tool for Raquel**. It has nothing to do with the ai.moms website and
must never be linked from it, deployed with it, or turned into a site feature.

## The one thing to get right

Executive roles are not won by volume. Twenty search results for "CMO" contained one
posting at $30,000/year and another at $62,000. The value here is in what gets **rejected**,
not in how many applications go out. A run that produces two excellent packages beats one
that produces fifteen.

Never pad the results to look productive.

---

## Step 1 — Load the inputs

Read, in this order:

1. `criteria.json` — all tuning lives here
2. The resume file named in `candidate.resume_file`
3. `references/scoring.md` — the rubric
4. The tracker named in `tracker_file`

**If the resume file is missing or still a placeholder, STOP.** Report that and do nothing
else. Every downstream step writes claims about her career; without the real resume those
claims would be invented. There is no acceptable fallback here.

The resume file on disk is the source of truth, not the Indeed profile. The Indeed copy is
OCR-mangled (it contains fragments like `Gr\` owth` and `Lu xur y D ail y`). You may call
`mcp__Indeed__get_resume` to read her stated salary preference, but never quote its text
into an application.

## Step 2 — Search

Run one `mcp__Indeed__search_jobs` per `titles` × `locations` combination, passing
`country_code` and `job_type` from config. These are independent — issue them in parallel
in a single message.

Pool all results. Deduplicate on company + title, keeping whichever posting is newer.

## Step 3 — Hard filters

Apply `hard_filters` mechanically, before spending a detail lookup on anything. No
judgement at this stage:

- Drop if the salary range top is below `min_salary`. Undisclosed comp follows
  `salary_unknown_action`.
- Drop if posted more than `max_days_since_posted` days ago.
- Drop if the title contains any `exclude_title_keywords` entry (case-insensitive).
- Drop if the company is in `exclude_companies`.
- Drop if the job already appears in the tracker. **Never apply to the same role twice** —
  it's the fastest way to look automated and get filtered out by a recruiter.

Log the count dropped at each filter. She should be able to see the funnel working.

## Step 4 — Detail lookup

Call `mcp__Indeed__get_job_details` on every survivor, in parallel.

This is where search-result claims get checked against reality. A posting tagged "Remote"
whose description demands four days onsite is not remote. The description always wins over
the search metadata.

For any employer that isn't obviously well-known, also call `mcp__Indeed__get_company_data`
for the `company_quality` dimension.

## Step 5 — Score

Apply `references/scoring.md` exactly. Produce a table with per-dimension raw scores,
weighted points, and the total, so the reasoning is visible and arguable.

Anything below `scoring.draft_threshold` stops here. List those as one-line rejections with
the reason — she should see what was passed over and why, so she can retune the config if
the machine is being too fussy or too loose.

## Step 6 — Write the application package

For each job at or above the threshold, up to `application.daily_application_cap`, produce:

**A cover letter.** Specific to this posting. Name the company, the actual problem the role
exists to solve, and the two or three things in her record that speak to it directly. No
template language, no "I am writing to express my interest." If it could be sent to a
different company by swapping a name, it isn't finished.

**A resume angle.** Which experience to lead with for this specific role, and which of her
skills to foreground. Not a rewrite — targeted guidance, plus any genuine gap worth naming
before an interviewer finds it.

**The apply link**, kept intact with all parameters. Never strip URL parameters.

### Absolute rule on content

Every factual claim must trace to the resume file. Do not invent employers, dates, metrics,
degrees, or outcomes. If a posting asks for something she doesn't have, say so in the run
report rather than papering over it in the letter. A fabricated credential discovered at
reference-check stage ends the candidacy and follows her name.

## Step 7 — Submit or draft

Consult `application.auto_submit_enabled` and `allowed_auto_submit_channels`.

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

Append one row per job to the tracker: date, company, title, comp, score, what was done,
and the apply link. The tracker is what prevents duplicate applications on the next run, so
write it even for jobs that were only drafted.

Then report to her, briefly:

- How many jobs were found, and how many each filter removed
- The scored shortlist, best first
- What was drafted and where it's waiting
- Anything that needs her judgement — a role just under threshold worth a look, a company
  with worrying reviews, a gap in the resume a posting exposed
- Follow-ups now due: anything applied to 7+ days ago with no reply

If nothing cleared the bar, say exactly that. A quiet week in an executive search is
information, not a failure to hide.
