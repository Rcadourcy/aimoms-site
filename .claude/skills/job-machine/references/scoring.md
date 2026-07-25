# Scoring rubric

Every job that survives the hard filters gets scored 0–100. Only jobs at or above
`scoring.draft_threshold` in `criteria.json` get a written application.

Score each dimension 0–10, multiply by its weight, divide by 10. Show your arithmetic in
the run report so the number can be argued with.

---

## seniority_match — weight 30

The single most common failure in an executive search is applying down a level. A VP role
at a company where the CMO seat is filled is a step sideways at best.

| Score | Means |
|---|---|
| 10 | CMO / Chief Brand or Growth Officer, reporting to CEO, owns the whole function |
| 8 | SVP/EVP Marketing with full-function ownership and a seat at the leadership table |
| 6 | VP Marketing at a large company where VP is genuinely executive |
| 3 | VP Marketing reporting into a CMO — a level down |
| 0 | Director or below, or an individual-contributor role with a senior title |

Read the job description, not the title. "Chief Marketing Officer" at a 4-person company
paying $30k is a Director job with a vanity title — score it 0.

## industry_match — weight 25

Match against `industries` in `criteria.json`, which is drawn from the actual resume:
luxury, lifestyle, media, martech, adtech.

| Score | Means |
|---|---|
| 10 | Squarely in a `strong` industry |
| 7 | `acceptable` industry, or adjacent to a `strong` one |
| 4 | Neutral industry where the marketing skillset transfers cleanly |
| 0 | Listed in `weak`, or requires domain credentials she doesn't hold |

## compensation — weight 20

The floor is $250,000. That is a filter, not a preference.

| Score | Means |
|---|---|
| 10 | Range top ≥ $350k, or base clearly above $300k |
| 8 | Range comfortably clears $250k |
| 5 | Range straddles the floor — top clears it, bottom doesn't |
| 5 | Comp not disclosed, but company size/stage makes the floor plausible |
| 0 | Range top is below $250k |

Never score a hidden range optimistically because the title sounds senior. The Ridley
Academy "CMO" posting topped out at $150k.

## remote_and_flexibility — weight 15

| Score | Means |
|---|---|
| 10 | Fully remote, no location requirement |
| 7 | Remote with occasional travel (roughly monthly or less) |
| 4 | Hybrid requiring regular presence in a commutable city |
| 0 | Full-time onsite outside her metro, or relocation required |

Watch for postings tagged "Remote" in search results whose description then demands four
days onsite. The description wins.

## company_quality — weight 10

Use the Indeed company data tool when the employer isn't a household name. Weigh culture,
management rating, and work-life balance — the things that actually determine whether a
senior hire lasts.

| Score | Means |
|---|---|
| 10 | Strong ratings (≥4.0), healthy work-life balance, stable |
| 6 | Mixed reviews, nothing alarming |
| 3 | Ratings below 3.0, or a pattern of complaints about leadership churn |
| 0 | Evidence the role is a revolving door, or the employer looks illegitimate |

A posting with no company footprint at all is a 3, not a 6. Unverifiable is a risk.

---

## Worked example

**VP of Marketing, Prosper — Remote, $268,000–$362,000**

| Dimension | Raw | Weight | Points |
|---|---|---|---|
| seniority_match | 8 | 30 | 24.0 |
| industry_match | 7 | 25 | 17.5 |
| compensation | 10 | 20 | 20.0 |
| remote_and_flexibility | 10 | 15 | 15.0 |
| company_quality | 6 | 10 | 6.0 |
| **Total** | | | **82.5** |

Above the 70 threshold → write the application package.

## Rules that override the arithmetic

- A score can never exceed 40 if `compensation` scored 0. Below the floor is below the floor.
- Never inflate a score to reach the threshold and fill a quota. A run that produces one
  application, or zero, is a valid run — report it honestly.
