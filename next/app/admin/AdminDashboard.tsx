'use client';

import { useMemo, useState } from 'react';

export type Submission = {
  id: string;
  form_name: string;
  email: string | null;
  name: string | null;
  data: Record<string, unknown>;
  created_at: string;
};

type WorkshopGroup = {
  key: string;
  date: string;
  format: string;
  location: string;
  rows: Submission[];
};

// Friendly labels for the raw form-name values (matches the API allowlist).
const FORM_LABELS: Record<string, string> = {
  'workshop-signup': 'Monthly Workshop',
  'membership-signup': 'Membership',
  'foundations-signup': 'Foundations Course',
  newsletter: 'Newsletter',
  'quiz-leads': 'Quiz Leads',
  'host-request': 'Host Applications',
  'outofoffice-waitlist': 'Out of Office Waitlist',
  press: 'Press',
  'self-purchase': 'Article — Buy Course',
  'gift-purchase': 'Article — Gift Course',
};

function labelFor(form: string): string {
  return FORM_LABELS[form] ?? form;
}

// Fields already shown in their own columns / group header, or noise — hidden from the
// "Details" cell. (workshop_date/format/location surface in the workshop group header.)
const HIDDEN_DETAIL_KEYS = new Set([
  'email', 'name', 'first_name', 'last_name', 'form-name', 'bot-field',
  'workshop_date', 'format', 'location', '_test',
]);

function fmtDate(iso: string): string {
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return iso;
  return d.toLocaleString(undefined, {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
  });
}

function displayName(r: Submission): string {
  if (r.name) return r.name;
  const first = r.data?.first_name;
  const last = r.data?.last_name;
  const joined = [first, last].filter(Boolean).join(' ').trim();
  return joined || '—';
}

function detailPairs(r: Submission): Array<[string, string]> {
  return Object.entries(r.data ?? {})
    .filter(([k]) => !HIDDEN_DETAIL_KEYS.has(k))
    .map(([k, v]) => [k, Array.isArray(v) ? v.join(', ') : String(v ?? '')] as [string, string])
    .filter(([, v]) => v !== '');
}

function csvEscape(v: unknown): string {
  return `"${String(v ?? '').replace(/"/g, '""')}"`;
}

function downloadCsv(rows: Submission[], filename: string): void {
  const dataKeys = new Set<string>();
  rows.forEach((r) => Object.keys(r.data ?? {}).forEach((k) => {
    if (k !== 'form-name' && k !== 'bot-field' && k !== '_test') dataKeys.add(k);
  }));
  const cols = ['submitted_at', 'form', 'name', 'email', ...[...dataKeys]];
  const lines = [cols.map(csvEscape).join(',')];
  for (const r of rows) {
    const line = cols.map((c) => {
      if (c === 'submitted_at') return csvEscape(fmtDate(r.created_at));
      if (c === 'form') return csvEscape(labelFor(r.form_name));
      if (c === 'name') return csvEscape(displayName(r));
      if (c === 'email') return csvEscape(r.email ?? '');
      const v = r.data?.[c];
      return csvEscape(Array.isArray(v) ? v.join('; ') : v);
    });
    lines.push(line.join(','));
  }
  const blob = new Blob([lines.join('\n')], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

export default function AdminDashboard({
  rows,
  loadError,
}: {
  rows: Submission[];
  loadError: string | null;
}) {
  const [activeForm, setActiveForm] = useState<string>('all');
  const [query, setQuery] = useState('');

  // Counts per form, for the tab bar. Ordered by how many submissions each has.
  const formCounts = useMemo(() => {
    const counts = new Map<string, number>();
    for (const r of rows) counts.set(r.form_name, (counts.get(r.form_name) ?? 0) + 1);
    return [...counts.entries()].sort((a, b) => b[1] - a[1]);
  }, [rows]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return rows.filter((r) => {
      if (activeForm !== 'all' && r.form_name !== activeForm) return false;
      if (!q) return true;
      const hay = [
        r.name,
        r.email,
        ...Object.values(r.data ?? {}).map((v) => (Array.isArray(v) ? v.join(' ') : String(v ?? ''))),
      ]
        .join(' ')
        .toLowerCase();
      return hay.includes(q);
    });
  }, [rows, activeForm, query]);

  // For the workshop view, break the list into groups by the specific workshop — a
  // workshop instance is a unique date + place, so the same date in two cities stays
  // separate. Each group carries its format + location for the header.
  const groups = useMemo<WorkshopGroup[]>(() => {
    if (activeForm !== 'workshop-signup') {
      return [{ key: '', date: '', format: '', location: '', rows: filtered }];
    }
    const map = new Map<string, WorkshopGroup>();
    for (const r of filtered) {
      const date = (r.data?.workshop_date as string) || 'Workshop not specified';
      const location = (r.data?.location as string) || '';
      const format = (r.data?.format as string) || '';
      const key = `${date}||${location}`;
      if (!map.has(key)) map.set(key, { key, date, format, location, rows: [] });
      map.get(key)!.rows.push(r);
    }
    // Most-recent submission first determines group order.
    return [...map.values()];
  }, [filtered, activeForm]);

  const csvName = `aimoms-${activeForm === 'all' ? 'all-signups' : activeForm}.csv`;

  return (
    <div className="page-admin">
      <header className="admin-header">
        <div>
          <div className="admin-eyebrow">
            <span className="admin-brand-ai">ai.</span>
            <span className="admin-brand-moms">moms</span>
            <span className="admin-brand-tm">™</span>
            <span className="admin-eyebrow-label">Signups</span>
          </div>
          <p className="admin-count">
            {rows.length.toLocaleString()} total submission{rows.length === 1 ? '' : 's'}
          </p>
        </div>
        <form method="post" action="/api/admin/logout">
          <button type="submit" className="admin-btn admin-btn-ghost">Log out</button>
        </form>
      </header>

      {loadError && (
        <div className="admin-banner admin-banner-error">
          Couldn’t load submissions: {loadError}
        </div>
      )}

      {!loadError && rows.length === 0 && (
        <div className="admin-banner">
          No submissions yet. New form signups will show up here automatically.
        </div>
      )}

      {/* Tabs — one per form, like Netlify’s form list. */}
      <div className="admin-tabs">
        <button
          className={`admin-tab${activeForm === 'all' ? ' is-active' : ''}`}
          onClick={() => setActiveForm('all')}
        >
          All <span className="admin-tab-count">{rows.length}</span>
        </button>
        {formCounts.map(([form, count]) => (
          <button
            key={form}
            className={`admin-tab${activeForm === form ? ' is-active' : ''}`}
            onClick={() => setActiveForm(form)}
          >
            {labelFor(form)} <span className="admin-tab-count">{count}</span>
          </button>
        ))}
      </div>

      {/* Toolbar — search + CSV export of the current view. */}
      <div className="admin-toolbar">
        <input
          type="search"
          placeholder="Search name, email, anything…"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="admin-search"
        />
        <div className="admin-toolbar-right">
          <span className="admin-showing">
            {filtered.length} shown
          </span>
          <button
            type="button"
            className="admin-btn admin-btn-primary"
            onClick={() => downloadCsv(filtered, csvName)}
            disabled={filtered.length === 0}
          >
            Download CSV
          </button>
        </div>
      </div>

      {/* Results */}
      {groups.map((group) => (
        <section key={group.key || 'all'} className="admin-group">
          {group.date && (
            <div className="admin-group-head">
              <h2 className="admin-group-title">{group.date}</h2>
              {group.format && (
                <span className={`admin-badge${/person/i.test(group.format) ? ' is-inperson' : ''}`}>
                  {group.format}
                </span>
              )}
              {group.location && group.location.toLowerCase() !== 'zoom' && (
                <span className="admin-group-loc">📍 {group.location}</span>
              )}
              <span className="admin-group-count">
                {group.rows.length} signup{group.rows.length === 1 ? '' : 's'}
              </span>
            </div>
          )}
          <div className="admin-table-wrap">
            <table className="admin-table">
              <thead>
                <tr>
                  <th>When</th>
                  <th>Name</th>
                  <th>Email</th>
                  {activeForm === 'all' && <th>Form</th>}
                  <th>Details</th>
                </tr>
              </thead>
              <tbody>
                {group.rows.map((r) => (
                  <tr key={r.id}>
                    <td className="admin-td-when">{fmtDate(r.created_at)}</td>
                    <td>{displayName(r)}</td>
                    <td>
                      {r.email ? (
                        <a href={`mailto:${r.email}`} className="admin-email">{r.email}</a>
                      ) : (
                        '—'
                      )}
                    </td>
                    {activeForm === 'all' && <td>{labelFor(r.form_name)}</td>}
                    <td>
                      <div className="admin-chips">
                        {detailPairs(r).map(([k, v]) => (
                          <span key={k} className="admin-chip">
                            <span className="admin-chip-k">{k}</span> {v}
                          </span>
                        ))}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      ))}
    </div>
  );
}
