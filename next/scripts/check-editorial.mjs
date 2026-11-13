// Checks every article in content/editorial against the ai.moms™ editorial rules.
// Usage: node scripts/check-editorial.mjs [slug...]   (exit code 1 when anything fails)
import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';
import { fileURLToPath } from 'node:url';

const ROOT = path.dirname(path.dirname(fileURLToPath(import.meta.url)));
const SRC = path.join(ROOT, 'content/editorial');
const PUB = path.join(ROOT, 'public');
const only = process.argv.slice(2);

const PILLARS = ['AI News', 'Seasonal', 'For Moms', 'Education', 'Community'];
const LIVE_PAGES = ['/build-aime', '/skill-guide', '/foundations', '/community', '/science', '/nyc', '/experiences', '/host-application', '/membership', '/editorial', '/subscribe', '/your-town', '/workshop', '/corporate', '/claude-duet', '/privacy', '/terms', '/press', '/curriculum'];
const BRIEF = ['workingTitle', 'draftDate', 'author', 'level', 'audience', 'h1', 'altH1s', 'primaryKeywords', 'supportingTerms', 'metaTitle', 'metaDescription', 'slugPath', 'internalLinks', 'externalLinks', 'schema', 'length', 'sourceArticle', 'reviewNotes'];
const BANNED = /\b(delve|tapestry|realm|landscape|testament|underscores?|boasts?|leverag\w*|robust|seamless\w*|elevat(e|es|ing)|unlock\w*|harness\w*|foster\w*|nestled|vibrant|bustling|myriad|plethora|treasure trove|game[- ]changer|supercharg\w*|pivotal|crucial|vital|empower\w*|level up|secret weapon|curated)\b/i;
const PHRASES = /(here['’]s the thing|let['’]s dive in|imagine this|picture this|at the end of the day|in today['’]s fast-paced|it['’]s worth noting|\bmoreover\b|\bfurthermore\b|save this|bookmark this|isn['’]t just|not only .{1,40} but also)/i;

const files = fs.readdirSync(SRC).filter((f) => f.endsWith('.json') && !f.startsWith('_'));
const all = files.map((f) => ({ f, a: JSON.parse(fs.readFileSync(path.join(SRC, f), 'utf8')) }));
const slugs = new Set(all.map((x) => x.a.slug));

// Image use across the site, by file content, to catch repeats under different names.
const md5 = (p) => crypto.createHash('md5').update(fs.readFileSync(p)).digest('hex');
const imgUse = new Map();
for (const { a } of all) {
  const imgs = [a.hero?.src, ...a.body.filter((b) => b.type === 'image').map((b) => b.src)].filter(Boolean);
  for (const src of imgs) {
    const p = path.join(PUB, src);
    if (!fs.existsSync(p)) continue;
    const h = md5(p);
    imgUse.set(h, [...(imgUse.get(h) || []), a.slug]);
  }
}

function strings(o, out = []) {
  if (typeof o === 'string') out.push(o);
  else if (Array.isArray(o)) o.forEach((x) => strings(x, out));
  else if (o && typeof o === 'object') Object.values(o).forEach((x) => strings(x, out));
  return out;
}

let failed = 0;
for (const { f, a } of all) {
  if (only.length && !only.includes(a.slug)) continue;
  const errs = [];
  const warn = [];
  const need = (c, m) => { if (!c) errs.push(m); };
  need(f === a.slug + '.json', 'file name ≠ slug');
  need(/^[a-z0-9]+(-[a-z0-9]+){1,8}$/.test(a.slug), 'slug format');
  need(PILLARS.includes(a.pillar), 'pillar: ' + a.pillar);
  need(a.cluster, 'cluster missing');
  need(a.title && a.title.length <= 60, `title ${a.title?.length} chars`);
  need(a.cardTitle && a.cardTitle.length <= 48, `cardTitle ${a.cardTitle?.length} chars`);
  need(a.dek && a.dek.length <= 170, `dek ${a.dek?.length} chars`);
  need(/^\d{4}-\d{2}-\d{2}$/.test(a.date || ''), 'date');
  need(/^\d+ min$/.test(a.readTime || ''), 'readTime');
  need(a.takeaways?.length >= 3 && a.takeaways.length <= 7, 'takeaways count');
  need(a.faq?.length >= 2, 'faq count');
  need(/^Moms,|\?$/.test(a.closing?.title || ''), 'closing title should start "Moms," or be a question');
  need(a.pillar === 'AI News' || a.body.some((b) => b.type === 'answer' && /^\*\*The short answer:\*\*/.test(b.text)), 'no "The short answer" block');
  const prompts = a.body.filter((b) => b.type === 'prompt');
  need(prompts.length >= 1 || a.pillar === 'Community', 'no prompt block');
  for (const p of prompts) {
    const t = p.lines.join(' ');
    if (!/\*\*Role:\*\*/.test(t) || !/\*\*Task:\*\*/.test(t)) warn.push(`prompt "${p.label}" not RCTF`);
    if (!/clarifying questions/i.test(t)) warn.push(`prompt "${p.label}" missing the clarifying-questions line`);
  }
  const b = a.brief || {};
  for (const k of BRIEF) need(b[k] !== undefined && b[k] !== '', 'brief.' + k);
  need(!b.metaTitle || b.metaTitle.length <= 60, `metaTitle ${b.metaTitle?.length} chars`);
  if (b.metaDescription && (b.metaDescription.length < 110 || b.metaDescription.length > 160)) warn.push(`metaDescription ${b.metaDescription.length} chars`);
  need(!b.slugPath || b.slugPath === '/editorial/' + a.slug, 'brief.slugPath ≠ slug');

  // Copy rules (reader-facing text, not the internal brief).
  const { brief, ...pub } = a;
  const faqQs = new Set((a.faq || []).map((x) => x.q));
  for (const s of strings(pub)) {
    if (/ai\.moms(?!™)/i.test(s)) errs.push('ai.moms without ™: ' + s.slice(Math.max(0, s.search(/ai\.moms/i) - 30), s.search(/ai\.moms/i) + 15));
    if (/[—–]|\.\.\.|…/.test(s)) errs.push('em/en dash or ellipsis: ' + s.slice(0, 60));
    if (/\bCEO\b/.test(s)) errs.push('"CEO": ' + s.slice(0, 60));
    if (/^\*\*(Role|Context|Task|Format):/.test(s)) continue; // prompt text is the reader's own words
    const m = s.match(BANNED); if (m) errs.push(`banned word "${m[0]}": ` + s.slice(0, 60));
    const p = s.match(PHRASES); if (p) errs.push(`banned phrase "${p[0]}": ` + s.slice(0, 60));
    if (!faqQs.has(s) && /\b(I|I['’]m|I['’]ve|my)\b/.test(s.replace(/\*\*(Role|Context|Task|Format):\*\*.*/g, '')) && !/^\*\*/.test(s) && !/[“"]/.test(s)) warn.push('first person "I/my" (check it\'s quoted or a prompt): ' + s.slice(0, 60));
  }

  // Links.
  for (const s of strings(pub)) for (const [, , u] of s.matchAll(/\[([^\]]+)\]\(([^)]+)\)/g)) {
    if (/^https?:/.test(u)) { if (/aimoms\.ai/.test(u)) warn.push('absolute aimoms.ai link: ' + u); continue; }
    const p = u.split('#')[0];
    if (p.startsWith('/editorial/')) { const sl = p.slice(11); if (!slugs.has(sl) && !['whats-on-moms-mind', 'for-moms', 'ai-education', 'community', 'ai-news'].includes(sl)) errs.push('link to missing article: ' + u); }
    else if (!LIVE_PAGES.includes(p)) errs.push('link to a page not on the approved list: ' + u);
  }

  // Images.
  const imgs = [a.hero?.src && { src: a.hero.src, alt: a.hero.alt, hero: 1 }, ...a.body.filter((x) => x.type === 'image')].filter(Boolean);
  if (!a.hero?.src) warn.push('no hero image');
  for (const im of imgs) {
    const p = path.join(PUB, im.src);
    if (!fs.existsSync(p)) { errs.push('image missing: ' + im.src); continue; }
    if (!im.alt || im.alt.length < 15) errs.push('alt text too short: ' + im.src);
    const users = imgUse.get(md5(p)) || [];
    if (users.filter((s) => s !== a.slug).length || users.length > 1) errs.push(`photo used more than once (${users.join(', ')}): ${im.src}`);
  }

  if (errs.length || warn.length) {
    console.log(`\n${errs.length ? '✗' : '•'} ${a.slug}`);
    errs.forEach((e) => console.log('   ERROR ' + e));
    warn.forEach((w) => console.log('   warn  ' + w));
  }
  if (errs.length) failed++;
}
console.log(`\n${failed ? failed + ' article(s) with errors' : 'All articles pass'} (${only.length || all.length} checked)`);
process.exit(failed ? 1 : 0);
