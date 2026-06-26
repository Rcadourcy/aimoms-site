import Link from 'next/link';
import '../app/role.css';

/* Shared layout for the six Careers role/role-detail pages (certified-teacher +
   five intern pages). All six were the same static HTML template with only the copy
   differing, so the structure is data-driven here and the copy lives in each page's
   ROLE object. Source <nav>/<footer> dropped — global Header/Footer come from layout. */

export type RoleSection = {
  /** Optional pink eyebrow above the title (e.g. "About the Role", "The Experience"). */
  label?: string;
  title: string;
  /** Body paragraphs. Each item may contain a <strong> via the `strong` markup below. */
  paragraphs?: React.ReactNode[];
  /** Bulleted item-list entries. */
  items?: React.ReactNode[];
  /** Optional closing paragraph rendered after the item-list. */
  note?: React.ReactNode;
  /** Optional italic highlight quote with optional attribution. */
  highlight?: { quote: string; attribution?: string };
};

export type RoleData = {
  /** URL slug (used for nothing visual; kept for clarity). */
  slug: string;
  heroLabel: string;
  heroTitle: React.ReactNode;
  pills: string[];
  heroDesc: string;
  sections: RoleSection[];
  apply: {
    lead: string;
    intro: React.ReactNode;
    steps: React.ReactNode[];
    /** Full mailto href, preserved verbatim from source. */
    mailto: string;
  };
  closingLine: string;
};

export default function RolePage({ role }: { role: RoleData }) {
  return (
    <div className="page-role">
      <div className="role-backbar">
        <Link href="/careers" className="back-link">
          &larr; Back to Careers
        </Link>
      </div>

      <section className="hero">
        <div className="hero-inner">
          <div className="hero-label">{role.heroLabel}</div>
          <h1>{role.heroTitle}</h1>
          <div className="hero-pills">
            {role.pills.map((p) => (
              <span key={p} className="pill">
                {p}
              </span>
            ))}
          </div>
          <p className="hero-desc">{role.heroDesc}</p>
        </div>
      </section>

      <div className="content">
        {role.sections.map((s, i) => (
          <section key={i} className="section">
            {s.label && <div className="section-label">{s.label}</div>}
            <h2 className="section-title">{s.title}</h2>

            {s.paragraphs?.map((p, j) => (
              <p key={j} className="body-text">
                {p}
              </p>
            ))}

            {s.items && (
              <ul className="item-list">
                {s.items.map((it, j) => (
                  <li key={j}>{it}</li>
                ))}
              </ul>
            )}

            {s.note && <p className="body-text">{s.note}</p>}

            {s.highlight && (
              <div className="highlight-box">
                <p>
                  &ldquo;{s.highlight.quote}&rdquo;
                  {s.highlight.attribution && (
                    <span className="attribution">{s.highlight.attribution}</span>
                  )}
                </p>
              </div>
            )}
          </section>
        ))}

        <section className="apply-block">
          <div className="section-label">Apply</div>
          <h2>How to Apply</h2>
          <p className="lead">{role.apply.lead}</p>
          <p>{role.apply.intro}</p>
          <ol>
            {role.apply.steps.map((step, i) => (
              <li key={i}>{step}</li>
            ))}
          </ol>
          <a href={role.apply.mailto} className="apply-btn">
            Apply Now
          </a>
        </section>

        <p className="closing-line">{role.closingLine}</p>
      </div>
    </div>
  );
}
