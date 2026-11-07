'use client';

import { useMemo, useState, type ReactNode } from 'react';

export type Prompt = {
  number: number;
  persona: string;
  category: string;
  title: string;
  use: string;
  role: string;
  context: string;
  task: string;
  format: string;
};

const SECTIONS = ['role', 'context', 'task', 'format'] as const;
const label = (s: string) => s[0].toUpperCase() + s.slice(1);
const asText = (p: Prompt) => SECTIONS.map((s) => `${label(s)}: ${p[s]}`).join('\n\n');

/** Her own details sit in [square brackets]. They show pink so she can see what to replace. */
function withPink(text: string): ReactNode[] {
  return text.split(/(\[[^\]]+\])/g).map((part, i) => (part.startsWith('[') ? <span className="ph" key={i}>{part}</span> : part));
}

function Card({ p }: { p: Prompt }) {
  const [open, setOpen] = useState(false);
  const [copied, setCopied] = useState(false);

  async function copy() {
    try {
      await navigator.clipboard.writeText(asText(p));
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      setOpen(true);
    }
  }

  return (
    <article className="lib-card">
      <div className="lib-card-cat">{p.number}. {p.category}</div>
      <h3>{p.title}</h3>
      <p className="lib-use">{p.use}</p>
      <div className="lib-actions">
        <button type="button" className="lib-copy" onClick={copy}>{copied ? 'Copied' : 'Copy'}</button>
        <button type="button" className="lib-toggle" onClick={() => setOpen(!open)} aria-expanded={open}>{open ? 'Hide prompt' : 'See prompt'}</button>
      </div>
      {open && (
        <div className="lib-prompt">
          {SECTIONS.map((s) => (
            <p key={s}><b>{label(s)}:</b> {withPink(p[s])}</p>
          ))}
        </div>
      )}
    </article>
  );
}

export default function PromptLibrary({ prompts }: { prompts: Prompt[] }) {
  const personas = useMemo(() => [...new Set(prompts.map((p) => p.persona))], [prompts]);
  const [persona, setPersona] = useState(personas[0]);
  const [category, setCategory] = useState('All');
  const [query, setQuery] = useState('');

  const categories = useMemo(
    () => ['All', ...new Set(prompts.filter((p) => p.persona === persona).map((p) => p.category))],
    [prompts, persona],
  );
  const q = query.trim().toLowerCase();
  const shown = prompts.filter((p) =>
    q
      ? `${p.title} ${p.use} ${p.category} ${asText(p)}`.toLowerCase().includes(q)
      : p.persona === persona && (category === 'All' || p.category === category),
  );

  return (
    <section className="lib-body">
      <div className="lib-inner">
        <input
          type="search"
          className="lib-search"
          placeholder="Search all 100 prompts"
          aria-label="Search prompts"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        {!q && (
          <>
            <div className="lib-tabs">
              {personas.map((name) => (
                <button
                  type="button"
                  key={name}
                  className={name === persona ? 'on' : ''}
                  onClick={() => { setPersona(name); setCategory('All'); }}
                >
                  {name}
                </button>
              ))}
            </div>
            <div className="lib-chips">
              {categories.map((name) => (
                <button type="button" key={name} className={name === category ? 'on' : ''} onClick={() => setCategory(name)}>{name}</button>
              ))}
            </div>
          </>
        )}
        <div className="lib-list">
          {shown.map((p) => <Card key={p.number} p={p} />)}
          {shown.length === 0 && <p className="lib-note">Nothing matches that. Try one word, like dinner.</p>}
        </div>
      </div>
    </section>
  );
}
