# Application tracker

Every job the machine has acted on. This file is how it avoids applying to the same role
twice — don't delete rows, even for jobs that were only drafted.

Status values: `drafted` (waiting in Gmail) · `submitted` (sent) · `replied` · `interviewing` · `rejected` · `closed`

| Date | Company | Title | Comp | Score | Status | Apply link |
|---|---|---|---|---|---|---|
| _no runs yet_ | | | | | | |

## Follow-up rule

Anything `submitted` or `drafted` more than 7 days ago with no reply gets surfaced in the
next run report. Executive processes are slow, but silence past two weeks usually means the
role went internal.

## Roles deliberately passed over

Scored below threshold but close enough to be worth a second opinion. If this list keeps
filling up with jobs that look good, the threshold in `criteria.json` is set too high.

| Date | Company | Title | Score | Why passed |
|---|---|---|---|---|
| _none yet_ | | | | |
