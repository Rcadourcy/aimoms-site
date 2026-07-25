# The job machine — how to use it

A private tool for Raquel's job search. Nothing to do with the ai.moms website.

## Running it

In Claude Code, type:

```
/job-machine
```

That's the whole thing. It searches, filters, scores, writes, and reports back.

## What it does each run

It runs **two tracks** side by side — CMO/Marketing and COO/Operations — because those are
two different searches with two different resumes, not one search that happens to mix
titles.

1. Searches Indeed for every title in each track's list
2. Throws out anything under your salary floor, too old, or already applied to (per track)
3. Reads the full description of what's left — catching the "remote" jobs that aren't
4. Scores each one out of 100 against the resume for that track
5. Writes a real cover letter against the matching resume for the ones that clear the bar
6. Puts each package in your Gmail drafts, ready to review and send
7. Logs everything so it never applies to the same posting twice

## Changing how it behaves

Everything is in **`criteria.json`**. It's the only file you need to touch.

| To do this | Change this |
|---|---|
| Raise or lower the salary floor | `min_salary` |
| Search different job titles | `tracks.marketing.titles` or `tracks.ops.titles` |
| Get fewer, better matches | Raise `draft_threshold` (currently 70) |
| Get more matches to look at | Lower `draft_threshold` |
| Never see a certain employer | Add them to `exclude_companies` |
| Apply to more roles per run | Raise `daily_application_cap` (applies per track) |
| Drop a track entirely | Delete it from `tracks`, or just ignore its results in the report |

Save the file and the next run picks it up.

**Keeping either search confidential:** add the employer to `exclude_companies` so their
postings never surface, in either track.

## About actually hitting "send"

Right now the machine stops at a finished draft. Two reasons, and only one of them is a
limitation:

**The technical one.** The Indeed connector can search jobs but has no apply function, and
the Gmail connector can write drafts but not send them. There is no wire to send down.

**The one that would still apply anyway.** Automating an application through Indeed,
LinkedIn Easy Apply, or a company's Workday/Greenhouse portal breaks the terms you agreed to
and can get your account suspended. It also reads as machine-generated to anyone on the
other end — and at CMO level, that's the end of the candidacy. The three-minute review you
do before clicking send is worth more than the three minutes it costs.

The exception is postings that list an application **email address**. That's an ordinary
email you're entitled to send, so the machine builds it fully addressed to the employer,
subject line and all. When a send capability gets connected, flip `auto_submit_enabled` to
`true` and add `"email"` to `allowed_auto_submit_channels`, and those go out on their own.
The portal ones never will.

## Running it automatically

Ask Claude to "set up the job machine to run every weekday morning" and it'll schedule it.
You'll get the shortlist and the drafts waiting for you.

## Files

| File | What it is |
|---|---|
| `criteria.json` | Your settings — the only file you edit |
| `resume-marketing.md` | Your CMO/Marketing resume — scores and letters for that track come from here |
| `resume-ops.md` | Your COO/Operations resume — scores and letters for that track come from here |
| `SKILL.md` | The instructions Claude follows |
| `references/scoring.md` | How jobs get scored out of 100, for each track |
| `applications.md` | Log of everything applied to, so it never repeats |
