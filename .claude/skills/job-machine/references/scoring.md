# Scoring rubric

Every job that survives the hard filters gets scored 0–100, **within the track that
searched for it**, against that track's resume. A "COO" posting is scored on the ops rubric
against `resume-ops.md`; a "CMO" posting is scored on the marketing rubric against
`resume-marketing.md`. Only jobs at or above `scoring.draft_threshold` in `criteria.json`
get a written application.

Score each dimension 0–10, multiply by its weight, divide by 10. Show your arithmetic in
the run report so the number can be argued with.

---

## seniority_match — weight 30

The single most common failure in an executive search is applying down a level. A VP role
at a company where the top seat is filled is a step sideways at best.

**Marketing track:**

| Score | Means |
|---|---|
| 10 | CMO / Chief Brand or Growth Officer, reporting to CEO, owns the whole function |
| 8 | SVP/EVP Marketing with full-function ownership and a seat at the leadership table |
| 6 | VP Marketing at a large company where VP is genuinely executive |
| 3 | VP Marketing reporting into a CMO — a level down |
| 0 | Director or below, or an individual-contributor role with a senior title |

**Ops track:**

| Score | Means |
|---|---|
| 10 | COO / Chief Transformation Officer, reporting to CEO, owns cross-functional operations |
| 8 | SVP Operations with full P&L or org-wide scope and a leadership-table seat |
| 6 | VP Operations at a large company where VP is genuinely executive |
| 3 | VP Operations reporting into a COO, or a Chief of Staff role with no direct authority |
| 0 | Director or below, or an individual-contributor role with a senior title |

Read the job description, not the title. "Chief Marketing Officer" at a 4-person company
paying $30k is a Director job with a vanity title — score it 0. Same for "COO" at a company
that's really hiring an office manager.

## industry_match — weight 25

Match against `industries` in `criteria.json`, which is drawn from the actual track record:
luxury/lifestyle (Allure Bridals, LVMH/Hennessy), media/agency (Modern Luxury Media,
HelloWorld/Merkle), and adtech (Nativo, Undertone/Perion). Shared across both tracks — the
ops track's transformation work happened inside the same companies.

| Score | Means |
|---|---|
| 10 | Squarely in a `strong` industry |
| 7 | `acceptable` industry, or adjacent to a `strong` one |
| 4 | Neutral industry where the skillset transfers cleanly |
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

Never score a hidden range optimistically because the title sounds senior. A test search on
this exact title set turned up a "Chief Marketing Officer" posting topping out at $150k and
another at $30k — titles inflate, ranges don't lie.

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

## Worked examples

**Marketing track — VP of Marketing, Prosper, Remote, $268,000–$362,000**

| Dimension | Raw | Weight | Points |
|---|---|---|---|
| seniority_match | 8 | 30 | 24.0 |
| industry_match | 7 | 25 | 17.5 |
| compensation | 10 | 20 | 20.0 |
| remote_and_flexibility | 10 | 15 | 15.0 |
| company_quality | 6 | 10 | 6.0 |
| **Total** | | | **82.5** |

Above the 70 threshold → write the application package, drawing on `resume-marketing.md`
and leading with the Allure Bridals / Modern Luxury Media org-scaling and revenue-model work.

**Ops track — Chief Operating Officer, a Series-C consumer brand, Remote, $260,000–$300,000**

| Dimension | Raw | Weight | Points |
|---|---|---|---|
| seniority_match | 10 | 30 | 30.0 |
| industry_match | 10 | 25 | 25.0 |
| compensation | 8 | 20 | 16.0 |
| remote_and_flexibility | 10 | 15 | 15.0 |
| company_quality | 6 | 10 | 6.0 |
| **Total** | | | **92.0** |

Above threshold → write the package against `resume-ops.md`, leading with the $10MM waste
elimination and the Nativo/Allure cross-functional restructures — the strongest ops proof
points, not the marketing-campaign metrics that sit in the other resume.

## Rules that override the arithmetic

- A score can never exceed 40 if `compensation` scored 0. Below the floor is below the floor.
- Never inflate a score to reach the threshold and fill a quota. A run that produces one
  application, or zero, is a valid run — report it honestly.
