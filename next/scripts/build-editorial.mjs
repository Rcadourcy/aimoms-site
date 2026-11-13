// Builds The AIM (aimoms.ai/editorial): home, one page per pillar, one page per article.
// Content: content/editorial/*.json. Output: public/editorial/*.html (served by rewrites in next.config.ts).
// `--all` includes drafts (for review); the production build leaves them out.
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { demoBlock, DEMO_CSS, DEMO_JS, RUNNER_JS } from './editorial-demo.mjs';
import { videoTop, VIDEO_CSS, VIDEO_JS } from './editorial-video.mjs';
import { aimeBlock, AIME_CSS, AIME_JS } from './editorial-aime.mjs';

const ROOT = path.dirname(path.dirname(fileURLToPath(import.meta.url)));
const SRC = path.join(ROOT, 'content/editorial');
const PUB = path.join(ROOT, 'public');
const OUTARG = process.argv.find((x) => x.startsWith('--out='));
const OUT = OUTARG ? path.resolve(OUTARG.slice(6)) : path.join(PUB, 'editorial');
const SITE = 'https://aimoms.ai';
const ALL = process.argv.includes('--all');
// `--launch` builds only the launch set listed in _index.json (drafts included), for a preview of launch day.
const LAUNCH = process.argv.includes('--launch');

// Header, footer and tracking come from a live static page so the site chrome stays in one place.
const SG = fs.readFileSync(path.join(PUB, 'skill-guide.html'), 'utf8');
const cut = (s, a, b) => s.slice(s.indexOf(a), s.indexOf(b, s.indexOf(a)) + b.length);
const NAV = cut(SG, '<nav class="s-nav pad">', '</nav>')
  // Nov 13 (Raquel): The AIM sits after Private Session, where Membership was; Membership stays in the hamburger menu.
  .replace(/<a class="tnl"[^>]*href="\/(?:editorial|theaim)">The AIM<\/a>/g, '').replace(/<a href="\/(?:editorial|theaim)">The AIM<\/a>/g, '')
  .replace('<a class="tnl" href="/membership">Membership</a>', '')
  .replace('<a class="tnl" href="/top3">Private Session</a>', '<a class="tnl" href="/top3">Private Session</a><a class="tnl on" href="/editorial">The AIM</a>')
  .replace('<a href="/membership">Membership</a>', '<a href="/editorial">The AIM</a><a href="/membership">Membership</a>');
const FOOTER = cut(SG, '<footer class="ffoot pad">', '</footer>');
const FBQ_STUB = cut(SG, '<script>\nwindow._fbqQueue', '</script>');
const PIXEL = cut(SG, '<script>\n(function(){\n  function loadMetaPixel', '</script>');
const CHROME_CSS = fs.readFileSync(path.join(SRC, '_chrome.css'), 'utf8');

export const PILLARS = [
  { key: 'AI News', name: 'AI News for Moms', id: 'ai-news', desc: 'What happened in AI this week, and what it means for you. New every week.' },
  { key: 'Seasonal', name: "On Mom's Mind", id: 'whats-on-moms-mind', desc: "What's coming up on the family calendar, planned before it lands on you." },
  { key: 'For Moms', name: 'The Three Moms', id: 'for-moms', desc: 'The mom at home, at the 9 to 5 and the mompreneur.' },
  { key: 'Education', name: 'AI Education', title: 'AI Education. For Moms.', id: 'ai-education', desc: 'Learn AI step by step, from your first prompt to letting it run on its own.' },
  { key: 'Community', name: 'Community', id: 'community', desc: 'Why moms feel the way they do, and why we learn better together.' },
];
const pillarOf = (a) => PILLARS.find((p) => p.key === a.pillar) || PILLARS[1];

const esc = (s = '') => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
const plain = (s = '') => String(s).replace(/\*\*(.+?)\*\*/g, '$1').replace(/_(.+?)_/g, '$1').replace(/\[(.+?)\]\((.+?)\)/g, '$1').replace(/`([^`]+)`/g, '$1').replace(/==(.+?)==/g, '$1');
const slugify = (s) => plain(s).toLowerCase().replace(/[’']/g, '').replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
// Production build: links to articles that aren't live yet show as plain text, and empty sections drop out of the nav.
let LIVE = null;
const isDead = (u) => { if (!LIVE) return false; const m = /^\/editorial\/([a-z0-9-]+)\/?(?:[#?].*)?$/.exec(u.replace(SITE, '')); return !!m && !LIVE.has(m[1]); };
function inline(s = '') {
  let h = esc(s);
  h = h.replace(/\[(.+?)\]\((.+?)\)/g, (m, t, u) => isDead(u) ? t : /^https?:/.test(u) && !u.startsWith(SITE) ? `<a href="${u}" target="_blank" rel="noopener">${t}</a>` : `<a href="${u.replace(SITE, '')}">${t}</a>`);
  h = h.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>').replace(/(^|[\s(])_(.+?)_(?=[\s.,;:!?)]|$)/g, '$1<em>$2</em>');
  h = h.replace(/`([^`]+)`/g, '<code>$1</code>');
  h = h.replace(/==(.+?)==/g, '<mark class="fill">$1</mark>');
  return h;
}
const fmtDate = (d) => new Date(d + 'T12:00:00').toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });
const absImg = (src) => (src ? SITE + src : SITE + '/og-share.jpg');
const kicker = (a) => `${pillarOf(a).name} · ${a.cluster}`.toUpperCase();
const words = (a) => [a.takeaways, a.body.map((x) => x.text || (x.items || []).join(' ') || (x.lines || []).join(' ') || (x.rows || []).flat().join(' ')), a.faq.map((f) => f.q + ' ' + f.a), a.closing.paragraphs].flat(3).join(' ').split(/\s+/).length;

const CSS = `
.ed{--navy:#060d26;--pink:#ff63d8;--pink-text:#060d26;--ivory:#ffffff;--mid:#4b5163;--muted:#6b7280;--rule:rgba(6,13,38,.16);--paper:#f8f8f8;background:var(--ivory);color:var(--navy)}
.ed a{color:var(--navy);text-decoration:none} .ed a:hover{color:var(--navy);text-decoration:underline;text-decoration-color:var(--pink);text-underline-offset:4px}
.ed .wrap{max-width:1240px;margin:0 auto;padding-left:24px;padding-right:24px}
.ed .sr-only{position:absolute;left:-9999px}
.ed .accent{font-family:'Playfair Display',Georgia,serif;font-style:italic;font-weight:700;color:var(--pink);letter-spacing:0;text-transform:none}
.ed .kicker{display:block;font-size:11px;font-weight:700;letter-spacing:.2em;text-transform:uppercase;color:var(--pink-text)}
.ed .meta{font-size:12px;color:var(--muted)}
.ed .ph{background:var(--paper) 50% 25%/cover no-repeat}
.ed .ph.none{display:flex;align-items:center;justify-content:center;background:var(--navy)}
.ed .ph.none::after{content:"AIM";font:900 22px 'Outfit',sans-serif;letter-spacing:.3em;color:rgba(255,255,255,.35)}

/* masthead */
.ed .mast{padding-top:56px}
.ed .mast-row{display:flex;justify-content:space-between;align-items:flex-end;gap:32px;padding-bottom:30px}
.ed .mast-title{display:flex;align-items:baseline;flex-wrap:wrap;gap:6px 18px}
.ed .mast h1,.ed .mast .name{margin:0;font-family:'Outfit',sans-serif;font-weight:900;font-size:clamp(54px,8vw,104px);line-height:.9;letter-spacing:-.02em}
.ed .mast .by{display:inline-flex;align-items:center;gap:10px;font:700 16px 'Be Vietnam Pro',sans-serif;letter-spacing:.02em;white-space:nowrap}
.ed .mast .by::before{content:"";width:9px;height:9px;border-radius:50%;background:var(--pink);flex:none}
.ed .mast .tag{margin:20px 0 0;font-size:18px;line-height:1.55;color:var(--navy);max-width:50ch}
/* Navy masthead (approved by Raquel, Nov 12) */
.ed .mast{background:var(--navy);color:#fff;box-shadow:0 0 0 100vmax var(--navy);clip-path:inset(0 -100vmax);padding-bottom:4px}
.ed .mast h1,.ed .mast .name,.ed .mast .by{color:#fff}
.ed .mast .tag{color:rgba(255,255,255,.82)}
.ed .mast .rules{border-top-color:rgba(255,255,255,.2)}
.ed .mast .pnav{border-bottom:0}
.ed .mast .pnav a{color:#fff}
.ed .mast .search input{border-color:#fff}
.ed .mast+section{margin-top:40px}
.ed .search{display:flex;flex:0 1 340px}
.ed .search input{flex:1;min-height:44px;padding:0 18px;border:1px solid var(--navy);border-radius:100px;background:#fff;font-size:14px;font-family:inherit;color:var(--navy)}
.ed .rules{border-top:1px solid var(--rule)}
.ed .pnav{display:flex;gap:0;overflow-x:auto;scrollbar-width:none;border-bottom:1px solid var(--rule)}
.ed .pnav a{flex:0 0 auto;padding:14px 0;margin-right:28px;font-size:12px;font-weight:700;letter-spacing:.16em;text-transform:uppercase}
.ed .pnav a:first-child{padding-left:0}
.ed .pnav a[aria-current]{text-decoration:underline;text-decoration-color:var(--pink);text-underline-offset:4px}

/* top stories */
.ed .top{display:grid;grid-template-columns:1.9fr 1fr;gap:0;padding-top:28px}
.ed .lead{padding-right:32px;border-right:1px solid var(--rule)}
.ed .lead .ph{aspect-ratio:3/2}
.ed .lead .kicker{margin-top:18px}
.ed .lead h2{margin:8px 0 10px;font-family:'Outfit',sans-serif;font-weight:800;font-size:clamp(30px,3.4vw,44px);line-height:1.06;letter-spacing:-.02em}
.ed .lead p{margin:0;font-size:17px;line-height:1.55;color:var(--mid);max-width:640px}
.ed .side{padding-left:32px;display:flex;flex-direction:column}
.ed .side a{display:block;padding:0 0 22px}
.ed .side a+a{padding-top:22px;border-top:1px solid var(--rule)}
.ed .side .ph{aspect-ratio:16/10;margin-bottom:12px}
.ed .news{padding-left:32px}
.ed .news .box{border-top:3px solid var(--navy);padding-top:12px}
.ed .news .date{font-size:12px;color:var(--mid);margin-top:4px}
.ed .news h2{margin:6px 0 14px;font-family:'Outfit',sans-serif;font-weight:800;font-size:24px;line-height:1.15}
.ed .news ol{list-style:none;margin:0;padding:0;counter-reset:n}
.ed .news li{counter-increment:n;display:flex;gap:12px;padding:12px 0;border-top:1px solid var(--rule);font-size:15px;line-height:1.4;font-weight:600}
.ed .news li::before{content:counter(n);font:italic 700 20px 'Playfair Display',Georgia,serif;color:var(--pink);min-width:16px;line-height:1.1}
.ed .news .go{display:inline-block;margin:14px 16px 0 0;font-size:12px;font-weight:700;letter-spacing:.14em;text-transform:uppercase;border-bottom:1px solid var(--pink);padding-bottom:2px}
.ed .side h3{margin:6px 0 0;font-family:'Outfit',sans-serif;font-weight:800;font-size:21px;line-height:1.18}

/* sections */
.ed .sec{padding-top:56px}
.ed .sec-head{display:flex;justify-content:space-between;align-items:flex-end;gap:16px;flex-wrap:wrap;border-top:3px solid var(--navy);padding-top:14px;margin-bottom:24px}
.ed .sec-head h2{margin:0;font-family:'Outfit',sans-serif;font-weight:900;font-size:34px;letter-spacing:-.01em;line-height:1.05}
.ed .sec-head p{margin:6px 0 0;font-size:15px;color:var(--mid)}
.ed .sec-head .all{font-size:12px;font-weight:700;letter-spacing:.14em;text-transform:uppercase;border-bottom:1px solid currentColor;padding-bottom:2px}
.ed .grid{display:grid;grid-template-columns:repeat(4,1fr);gap:28px}
.ed .tile{display:block}
.ed .tile .ph{aspect-ratio:4/3;margin-bottom:12px}
.ed .tile h3{margin:6px 0 6px;font-family:'Outfit',sans-serif;font-weight:800;font-size:19px;line-height:1.22}
.ed .tile p{margin:0 0 6px;font-size:14px;line-height:1.5;color:var(--mid)}
.ed .tile.room{position:relative;color:#fff;background:var(--navy);display:flex;flex-direction:column}
.ed .tile.room .ph{margin:0}
.ed .tile.room .txt{padding:16px 18px 20px}
.ed .tile.room .kicker{color:var(--pink)}
.ed .tile.room h3{color:#fff}
.ed .tile.room p{color:rgba(255,255,255,.8)}
.ed .tile.room .go{font-size:12px;font-weight:700;letter-spacing:.14em;text-transform:uppercase;color:#fff;border-bottom:1px solid var(--pink)}
.ed .start{display:flex;flex-direction:column}
.ed .start .kicker{padding-bottom:10px;border-bottom:1px solid var(--navy)}
.ed .start a{display:flex;gap:14px;align-items:baseline;padding:14px 0;border-bottom:1px solid var(--rule);font-family:'Outfit',sans-serif;font-weight:800;font-size:17px;line-height:1.25}
.ed .start a b{font:italic 700 26px 'Playfair Display',Georgia,serif;color:var(--pink);min-width:22px}
.ed .results{padding-top:36px}
.ed .results[hidden]{display:none}
.ed .empty{font-size:15px;color:var(--muted)}

/* pillar page */
.ed .p-head{padding-top:28px;padding-bottom:8px}
.ed .p-head .crumb{font-size:12px;font-weight:700;letter-spacing:.14em;text-transform:uppercase;color:var(--mid)}
.ed .p-head h1{margin:10px 0 8px;font-family:'Outfit',sans-serif;font-weight:900;font-size:clamp(44px,6vw,76px);line-height:.98;letter-spacing:-.02em}
.ed .p-head p{margin:0;font-size:18px;color:var(--mid);max-width:640px}
.ed .p-head .count{margin-top:14px;font-size:12px;font-weight:700;letter-spacing:.16em;text-transform:uppercase}
.ed .jump{display:flex;gap:8px;flex-wrap:wrap;padding:18px 0 4px}
.ed .jump a{display:inline-flex;align-items:center;min-height:34px;padding:0 14px;border:1px solid var(--navy);border-radius:100px;font-size:12px;font-weight:600}
.ed .cluster{padding-top:40px;scroll-margin-top:90px}
.ed .cluster h2{margin:0 0 20px;padding-top:12px;border-top:1px solid var(--navy);font-size:12px;font-weight:700;letter-spacing:.2em;text-transform:uppercase}

/* newsletter */
.ed .nl{margin-top:80px;margin-bottom:-72px;background:var(--navy);color:#fff;border-bottom:1px solid rgba(255,255,255,.14)}
.ed .nl .wrap{display:grid;grid-template-columns:minmax(0,1.1fr) minmax(0,1fr);gap:32px 72px;align-items:end;padding-top:64px;padding-bottom:64px}
.ed .nl .kicker{color:var(--pink)}
.ed .nl h2{margin:14px 0 12px;font-family:'Outfit',sans-serif;font-weight:800;font-size:clamp(34px,4.4vw,52px);line-height:1.04;letter-spacing:-.02em;color:#fff}
.ed .nl .accent{color:var(--pink)}
.ed .nl p{margin:0;font-size:16px;line-height:1.55;color:rgba(255,255,255,.78);max-width:460px}
.ed .nl form{display:flex;align-items:flex-end;gap:20px;border-bottom:1px solid rgba(255,255,255,.55);transition:border-color .2s}
.ed .nl form:focus-within{border-bottom-color:var(--pink)}
.ed .nl input[type=email]{flex:1;min-width:0;min-height:52px;padding:0;border:0;border-radius:0;background:transparent;color:#fff;font-size:19px;font-family:inherit;outline:0}
.ed .nl input[type=email]::placeholder{color:rgba(255,255,255,.55)}
.ed .nl button{min-height:52px;padding:0;background:none;color:var(--pink);border:0;border-radius:0;font-size:15px;font-weight:700;font-family:inherit;cursor:pointer;white-space:nowrap}
.ed .nl button:after{content:" →"}
.ed .nl button:hover{color:#fff}
.ed .hp{position:absolute;left:-9999px}

/* article */
.ed .crumbs{padding-top:24px;font-size:12px;font-weight:700;letter-spacing:.14em;text-transform:uppercase}
.ed .crumbs a{color:var(--mid)}
.ed .art{max-width:740px;margin:0 auto;padding-left:24px;padding-right:24px}
.ed .art-head{padding-top:28px;padding-bottom:26px;text-align:center}
.ed .art-head h1{margin:14px 0 0;font-family:'Outfit',sans-serif;font-weight:800;font-size:clamp(34px,4.6vw,54px);line-height:1.05;letter-spacing:-.025em}
.ed .art-head .dek{margin:16px auto 0;font-size:19px;line-height:1.55;color:var(--mid);max-width:620px}
.ed .byline{display:flex;justify-content:center;gap:8px 18px;flex-wrap:wrap;margin-top:20px;padding:12px 0;border-top:1px solid var(--rule);border-bottom:1px solid var(--rule);font-size:13px;color:var(--mid)}
.ed .byline b{color:var(--navy)}
.ed .hero-img{max-width:1120px;margin:0 auto;padding-left:24px;padding-right:24px}
.ed .hero-img img{width:100%;aspect-ratio:16/9;object-fit:cover;object-position:50% 25%;display:block}
.ed .hero-img figcaption{font-size:12px;color:var(--muted);margin-top:8px}
.ed .prose{padding-top:12px;font-size:18px;line-height:1.72;color:#1f2433}
.ed .prose p{margin:0 0 20px}
.ed .prose h2{scroll-margin-top:80px;margin:52px 0 16px;font-family:'Outfit',sans-serif;font-weight:800;font-size:29px;line-height:1.15;letter-spacing:-.015em;color:var(--navy)}
.ed .prose h3{margin:32px 0 10px;font-family:'Outfit',sans-serif;font-weight:800;font-size:21px;color:var(--navy)}
.ed .prose ul,.ed .prose ol{margin:0 0 22px;padding-left:22px}
.ed .prose li{margin:0 0 10px;padding-left:4px}
.ed .prose ul li::marker{color:var(--pink)}
.ed .prose strong{color:var(--navy);font-weight:700}
.ed .prose a{color:var(--navy);text-decoration:underline;text-decoration-color:var(--pink);text-decoration-thickness:2px;text-underline-offset:3px}
.ed code{font-family:ui-monospace,SFMono-Regular,Menlo,monospace;font-size:.86em;background:var(--paper);color:var(--navy);padding:1px 6px;white-space:nowrap}
.ed .takeaways{margin:28px 0 36px;padding:20px 0;border-top:1px solid var(--navy);border-bottom:1px solid var(--navy)}
.ed .takeaways h2{margin:0 0 12px;font:700 12px 'Be Vietnam Pro',sans-serif;letter-spacing:.2em;text-transform:uppercase;color:var(--pink-text)}
.ed .takeaways ul{margin:0;font-size:16px;line-height:1.6}
.ed .answer{border-left:3px solid var(--pink);padding:4px 0 4px 20px;margin:0 0 22px}
.ed .tbl{overflow-x:auto;margin:0 0 26px}
.ed table{width:100%;border-collapse:collapse;font-size:15px;line-height:1.5}
.ed th{text-align:left;font-size:12px;letter-spacing:.12em;text-transform:uppercase;padding:10px 12px;border-bottom:2px solid var(--navy)}
.ed td{padding:12px;border-bottom:1px solid var(--rule);vertical-align:top}
.ed .prompt{position:relative;background:var(--navy);color:#fff;padding:26px 28px 22px;margin:0 0 26px;font-size:16px;line-height:1.65}
.ed .prompt .lbl{display:block;font-size:11px;font-weight:700;letter-spacing:.2em;text-transform:uppercase;color:var(--pink);margin-bottom:12px}
.ed .prompt p{margin:0 0 12px} .ed .prompt strong{color:var(--pink)}
.ed .prompt code{background:rgba(255,255,255,.12);color:#fff}
.ed mark.fill{background:var(--pink);color:var(--navy);padding:1px 6px;border-radius:4px;font-weight:600;-webkit-box-decoration-break:clone;box-decoration-break:clone}
.ed .prompt .copy{position:absolute;top:16px;right:16px;background:transparent;color:#fff;border:1px solid rgba(255,255,255,.5);border-radius:100px;padding:7px 16px;font:700 12px 'Be Vietnam Pro',sans-serif;cursor:pointer}
.ed .fig{margin:8px 0 26px}
.ed .fig img{width:100%;display:block}
.ed .fig.portrait img{max-width:420px;margin:0 auto}
.ed .faq{margin-top:52px}
.ed .faq details{border-top:1px solid var(--rule);padding:16px 0}
.ed .faq details:last-child{border-bottom:1px solid var(--rule)}
.ed .faq summary{font-weight:700;font-size:17px;cursor:pointer;color:var(--navy)}
.ed .faq details p{margin:10px 0 0;font-size:16px}
.ed .takeaways.intoc{margin-top:-20px;border-top:0}
.ed .sources h2{font-size:20px;margin-top:32px}
.ed .sources ul{font-size:15px}
.ed .disclosure{margin:24px 0 0;font-size:14px;line-height:1.6;color:var(--mid)}
.ed .closing{margin-top:52px;padding-top:8px;border-top:3px solid var(--navy)}
.ed .author{margin-top:36px;padding:24px 0;border-top:1px solid var(--rule);border-bottom:1px solid var(--rule);display:flex;gap:22px;align-items:center}
.ed .author img{flex:0 0 96px;width:96px;height:96px;border-radius:50%;object-fit:cover;object-position:center 22%}
.ed .author .name{margin:6px 0 6px;font-family:'Outfit',sans-serif;font-weight:800;font-size:20px}
.ed .author p{margin:0;font-size:15px;line-height:1.6;color:var(--mid)}
.ed .related{margin-top:64px}
@media (max-width:1000px){.ed .grid{grid-template-columns:repeat(2,1fr)}}
@media (max-width:860px){.ed .news{padding-left:0;padding-top:24px}.ed .top{grid-template-columns:1fr}.ed .lead{padding-right:0;border-right:0;padding-bottom:24px;border-bottom:0}.ed .side{padding-left:0;padding-top:22px;display:grid;grid-template-columns:1fr 1fr;gap:20px}.ed .side a,.ed .side a+a{padding:0;border:0}}
@media (max-width:700px){.ed .mast-row{flex-direction:column;align-items:stretch}.ed .search{flex:none}.ed .grid{gap:22px 16px}.ed .tile h3{font-size:16px}.ed .tile p{display:none}.ed .side{grid-template-columns:1fr}.ed .side h3{font-size:18px}.ed .prose{font-size:17px}.ed .prose h2{font-size:25px}.ed .prompt{padding:54px 20px 20px}.ed .sec-head h2{font-size:28px}.ed .nl .wrap{grid-template-columns:1fr;padding-top:48px;padding-bottom:48px}.ed .author{align-items:flex-start}.ed .author img{width:72px;height:72px;flex-basis:72px}}
`;

const NEWSLETTER = `<section class="nl" aria-label="Newsletter"><div class="wrap">
  <div>
    <span class="kicker">Coming soon</span>
    <h2>Be first when our <span class="accent">newsletter</span> launches</h2>
    <p>What's new in AI and what it means for your week, in plain words. We're still building it, so add your email and we'll tell you the day it starts.</p>
  </div>
  <form name="newsletter" class="nl-form" novalidate>
    <input type="hidden" name="form-name" value="newsletter">
    <label class="hp">Don't fill this out if you're human: <input name="bot-field" tabindex="-1" autocomplete="off"></label>
    <label class="sr-only" for="nl-email">Email address</label>
    <input id="nl-email" type="email" name="email" required placeholder="you@email.com">
    <button type="submit">Get me on the list</button>
  </form>
</div></section>`;
const NEWSLETTER_JS = `document.querySelectorAll('.nl-form').forEach(function(f){f.addEventListener('submit',function(e){e.preventDefault();var em=f.querySelector('[name=email]');if(!em.value||em.value.indexOf('@')<1){em.focus();return}var done=false,go=function(){if(done)return;done=true;location.href='/newsletter-success'};setTimeout(go,2500);fetch('/api/forms/newsletter',{method:'POST',headers:{'Content-Type':'application/x-www-form-urlencoded'},body:new URLSearchParams(new FormData(f)).toString()}).then(go,go)})});`;
const COPY_JS = `document.querySelectorAll('.prompt .copy').forEach(function(b){b.addEventListener('click',function(){var t=b.parentNode.querySelector('.ptext').innerText;var ok=function(){b.textContent='Copied';setTimeout(function(){b.textContent='Copy'},1600)};try{navigator.clipboard.writeText(t).then(ok,function(){})}catch(e){}})});`;

function page({ title, description, canonical, ogType, image, extraHead = '', main, script = '' }) {
  return `<!DOCTYPE html>
<html lang="en">
<head>
<link rel="icon" type="image/svg+xml" href="/favicon.svg">
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>${esc(title)}</title>
<meta name="description" content="${esc(description)}">
<link rel="canonical" href="${canonical}">
<meta property="og:title" content="${esc(title)}">
<meta property="og:description" content="${esc(description)}">
<meta property="og:type" content="${ogType}">
<meta property="og:url" content="${canonical}">
<meta property="og:image" content="${esc(image)}">
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:title" content="${esc(title)}">
<meta name="twitter:description" content="${esc(description)}">
<meta name="twitter:image" content="${esc(image)}">
${extraHead}
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Outfit:wght@400;600;700;800;900&family=Be+Vietnam+Pro:wght@300;400;500;600;700;800&family=Playfair+Display:ital,wght@1,700;1,900&display=swap">
${FBQ_STUB}
<style>${CHROME_CSS}${CSS}${DEMO_CSS()}${VIDEO_CSS}${AIME_CSS}.s-nav .tnl.on{box-shadow:inset 0 -2px 0 var(--pink,#ff63d8);padding:4px 0}</style>
<script src="/aim-track.js" defer></script>
</head>
<body>
<div class="site" id="site">
${NAV}
<main class="ed">
${main}
${NEWSLETTER}
</main>
${FOOTER}
</div>
<script>${NEWSLETTER_JS}${script}</script>
${PIXEL}
</body>
</html>
`;
}

const ph = (src, alt, cls = '', focus) => src ? `<div class="ph ${cls}" role="img" aria-label="${esc(alt)}" style="background-image:url('${esc(src)}')${focus ? `;background-position:${esc(focus)}` : ''}"></div>` : `<div class="ph none ${cls}" aria-hidden="true"></div>`;
// Hero credit: one photo, or a collage of several (`photos`).
const creditLink = (c) => `<a href="${esc(c.url)}" target="_blank" rel="noopener">${esc(c.name)}</a>`;
const credit = (c) => {
  const site = esc(c.site || 'Unsplash');
  if (!c.photos) return `Photo: ${creditLink(c)} on ${site}`;
  const links = c.photos.map(creditLink);
  const list = links.length > 1 ? `${links.slice(0, -1).join(', ')} and ${links.at(-1)}` : links[0];
  return `Collage by ai.moms™ with photos by ${list} on ${site}`;
};
const tile = (a, { dek = true } = {}) => `<a class="tile" href="/editorial/${a.slug}">${ph(a.hero?.src, a.hero?.alt, '', a.hero?.focus)}<span class="kicker">${esc(a.cluster)}</span><h3>${esc(plain(a.cardTitle || a.title))}</h3>${dek ? `<p>${esc(plain(a.dek))}</p>` : ''}<span class="meta">${esc(a.readTime)} read</span></a>`;

const MAST = (current) => `<div class="wrap mast">
  <div class="mast-row">
    <div>
      <div class="mast-title">${current ? `<a class="name" href="/editorial">The AIM</a>` : `<h1>The AIM<span class="sr-only"> by ai.moms™: AI news, guides and prompts for moms</span></h1>`}<span class="by">by ai.moms™</span></div>
      <p class="tag">The AIM is for the mom at home, the mom at work and the mompreneur. Whatever you’re aiming for, ai.moms™ offers the AI know-how, education and community to get there faster.</p>
    </div>
    <form class="search" role="search" action="/editorial" onsubmit="${current ? '' : 'return false'}">
      <label class="sr-only" for="search">Search The AIM</label>
      <input id="search" name="q" type="search" placeholder="Search articles, prompts, topics" autocomplete="off">
    </form>
  </div>
  <div class="rules"></div>
  <nav class="pnav" aria-label="Sections">${PILLARS.filter((p) => !LIVE || LIVE.has(p.id)).map((p) => `<a href="/editorial/${p.id}"${current === p.id ? ' aria-current="page"' : ''}>${p.name}</a>`).join('')}</nav>
</div>`;

function block(b) {
  switch (b.type) {
    case 'p': return `<p>${inline(b.text)}</p>`;
    case 'answer': return `<p class="answer">${inline(b.text)}</p>`;
    case 'h2': return `<h2 id="${slugify(b.text)}">${inline(b.text)}</h2>`;
    case 'h3': return `<h3>${inline(b.text)}</h3>`;
    case 'ul': case 'ol': return `<${b.type}>${b.items.map((i) => `<li>${inline(i)}</li>`).join('')}</${b.type}>`;
    case 'table': return `<div class="tbl"><table><thead><tr>${b.head.map((h) => `<th>${inline(h)}</th>`).join('')}</tr></thead><tbody>${b.rows.map((r) => `<tr>${r.map((c) => `<td>${inline(c)}</td>`).join('')}</tr>`).join('')}</tbody></table></div>`;
    case 'prompt': return `<div class="prompt"><span class="lbl">${inline(b.label || 'Copy this prompt')}</span><button class="copy" type="button">Copy</button><div class="ptext">${b.lines.map((l) => `<p>${inline(l)}</p>`).join('')}</div></div>`;
    case 'demo': return demoBlock(b);
    case 'aime': return aimeBlock(b);
    case 'image': return `<figure class="fig${b.portrait ? ' portrait' : ''}"><img src="${esc(b.src)}" alt="${esc(b.alt)}" loading="lazy"></figure>`;
    default: throw new Error('Unknown block type ' + b.type);
  }
}

// "In This Article": every H2, linked, for articles that set jumpLinks (the aimoms-blog-formatter order).
// jumpLinks can also be a list of heading texts, to link only those headings.
function jumpLinks(a) {
  let heads = [...a.body.filter((b) => b.type === 'h2').map((b) => [slugify(b.text), b.text]), ...(a.faq.length ? [['faq', a.faqTitle || 'Frequently Asked Questions']] : []), [slugify(a.closing.title), a.closing.title]];
  if (Array.isArray(a.jumpLinks)) heads = heads.filter(([, t]) => a.jumpLinks.includes(t));
  return `<section class="takeaways intoc" aria-label="In this article"><h2>In This Article</h2><ul>${heads.map(([id, t]) => `<li><a target="_self" href="#${id}">${inline(t)}</a></li>`).join('')}</ul></section>`;
}

function articlePage(a, all, { video = false } = {}) {
  const p = pillarOf(a);
  // The live site keeps only the SEO fields of the brief; review notes stay internal.
  const b = LIVE ? Object.fromEntries(Object.entries(a.brief || {}).filter(([k]) => ['h1', 'primaryKeywords', 'supportingTerms', 'metaTitle', 'metaDescription', 'slugPath', 'schema'].includes(k))) : (a.brief || {});
  const url = `${SITE}/editorial/${a.slug}`;
  const ld = [
    { '@context': 'https://schema.org', '@type': 'Article', headline: plain(a.title), description: b.metaDescription || plain(a.dek), image: absImg(a.hero?.src), datePublished: a.date, dateModified: a.date,
      author: a.byline === 'The ai.moms™ team' ? { '@type': 'Organization', name: 'ai.moms™', url: SITE } : { '@type': 'Person', name: a.byline, ...(a.authorBio ? { description: a.authorBio } : {}), ...(a.authorPhoto ? { image: SITE + a.authorPhoto } : {}) },
      publisher: { '@type': 'Organization', name: 'ai.moms™', url: SITE, logo: { '@type': 'ImageObject', url: SITE + '/icon-512.png' } },
      mainEntityOfPage: url, articleSection: `${p.name} · ${a.cluster}`, keywords: [...(b.primaryKeywords || []), ...(b.supportingTerms || [])].join(', '), wordCount: words(a) },
    a.faq.length && { '@context': 'https://schema.org', '@type': 'FAQPage', mainEntity: a.faq.map((f) => ({ '@type': 'Question', name: plain(f.q), acceptedAnswer: { '@type': 'Answer', text: plain(f.a) } })) },
    { '@context': 'https://schema.org', '@type': 'BreadcrumbList', itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'The AIM', item: SITE + '/editorial' },
      { '@type': 'ListItem', position: 2, name: p.name, item: `${SITE}/editorial/${p.id}` },
      { '@type': 'ListItem', position: 3, name: plain(a.title), item: url }] },
  ].filter(Boolean);
  const extraHead = [
    ...(b.primaryKeywords ? [`<meta name="keywords" content="${esc([...b.primaryKeywords, ...(b.supportingTerms || [])].join(', '))}">`] : []),
    ...(video ? ['<meta name="robots" content="noindex">'] : []),
    `<meta name="author" content="${esc(a.byline)}">`,
    `<meta property="article:published_time" content="${a.date}">`,
    `<meta property="article:section" content="${esc(p.name)}">`,
    ...(b.primaryKeywords || []).map((k) => `<meta property="article:tag" content="${esc(k)}">`),
    ...ld.map((x) => `<script type="application/ld+json">${JSON.stringify(x).replace(/</g, '\\u003c')}</script>`),
    `<script type="application/json" id="editorial-brief">${JSON.stringify({ slug: a.slug, pillar: a.pillar, cluster: a.cluster, byline: a.byline, date: a.date, wordCount: words(a), ...b }).replace(/</g, '\\u003c')}</script>`,
  ].join('\n');
  // Keep reading only suggests articles that have a hero photo.
  const pool = all.filter((x) => x.hero?.src);
  let related = pool.filter((x) => x.slug !== a.slug && x.pillar === a.pillar && x.cluster === a.cluster);
  for (const x of pool) if (related.length < 4 && x.slug !== a.slug && x.pillar === a.pillar && !related.includes(x)) related.push(x);
  for (const x of pool) if (related.length < 4 && x.slug !== a.slug && !related.includes(x)) related.push(x);
  related = related.slice(0, 4);
  const main = `
<div class="wrap crumbs"><a href="/editorial">The AIM</a> · <a href="/editorial/${p.id}">${esc(p.name)}</a></div>
<article>
  <header class="art art-head">
    <span class="kicker">${esc(kicker(a))}</span>
    <h1>${inline(a.title)}</h1>
    <p class="dek">${inline(a.dek)}</p>
    <div class="byline"><span>By <b>${esc(a.byline)}</b></span><span>${fmtDate(a.date)}</span><span>${esc(a.readTime)} read</span></div>
  </header>
  ${video ? videoTop(a, { slugify }) : a.hero?.src ? `<figure class="hero-img"><img src="${esc(a.hero.src)}" alt="${esc(a.hero.alt)}"${a.hero.focus ? ` style="object-position:${esc(a.hero.focus)}"` : ''} fetchpriority="high">${a.hero.credit ? `<figcaption>${credit(a.hero.credit)}</figcaption>` : ''}</figure>` : ''}
  <div class="art prose">
    ${video ? '' : `<section class="takeaways" aria-label="Key takeaways"><h2>Key Takeaways</h2><ul>${a.takeaways.map((t) => `<li>${inline(t)}</li>`).join('')}</ul></section>`}
    ${a.jumpLinks ? jumpLinks(a) : ''}
    ${a.body.map(block).join('\n    ')}
    ${a.faq.length ? `<section class="faq"><h2 id="faq">${inline(a.faqTitle || 'Frequently Asked Questions')}</h2>${a.faqIntro ? `<p>${inline(a.faqIntro)}</p>` : ''}${a.faq.map((f) => `<details open><summary>${inline(f.q)}</summary><p>${inline(f.a)}</p></details>`).join('')}</section>` : ''}
    <section class="closing"><h2 id="${slugify(a.closing.title)}">${inline(a.closing.title)}</h2>${a.closing.paragraphs.map((x) => `<p>${inline(x)}</p>`).join('')}</section>
    ${a.authorBio ? `<section class="author" aria-label="About the author">${a.authorPhoto ? `<img src="${esc(a.authorPhoto)}" alt="${esc(a.byline)}, author" width="96" height="96" loading="lazy">` : ''}<div><span class="kicker">About the author</span><p class="name">${esc(a.byline)}</p><p>${inline(a.authorBio)}</p></div></section>` : ''}
    ${a.sources?.length ? `<section class="sources"><h2 id="sources">Sources</h2><ul>${a.sources.map((x) => `<li>${inline(x)}</li>`).join('')}</ul></section>` : ''}
    ${a.disclosure ? `<p class="disclosure">${inline(a.disclosure)}</p>` : ''}
  </div>
</article>
<section class="wrap related" aria-label="Keep reading"><div class="sec-head"><h2>Keep reading</h2><a class="all" href="/editorial/${p.id}">More ${esc(p.name)}</a></div><div class="grid">${related.map((x) => tile(x)).join('')}</div></section>`;
  return page({ title: b.metaTitle || plain(a.title), description: b.metaDescription || plain(a.dek), canonical: url, ogType: 'article', image: absImg(a.hero?.src), extraHead, main, script: COPY_JS + (a.body.some((x) => x.type === 'demo') ? DEMO_JS() : video ? RUNNER_JS : '') + (video ? VIDEO_JS : '') + (a.body.some((x) => x.type === 'aime') ? AIME_JS : '') });
}

function pillarPage(p, list, cfg) {
  const items = list.filter((a) => a.pillar === p.key);
  // Seasonal topics run in calendar order from today (cfg.timeline); others keep first-seen order.
  const order = (c) => { const i = (cfg.timeline || []).indexOf(c); return i < 0 ? 99 : i; };
  const clusters = [...new Set(items.map((a) => a.cluster))].sort((x, y) => (p.key === 'Seasonal' ? order(x) - order(y) : 0));
  const n = items.length;
  const main = `${MAST(p.id)}
<header class="wrap p-head">
  <span class="crumb"><a href="/editorial">The AIM</a></span>
  <h1>${esc(p.title || p.name)}</h1>
  <p>${esc(p.desc)}</p>
  <div class="count">${n ? `${n} article${n === 1 ? '' : 's'} &amp; guide${n === 1 ? '' : 's'}` : 'New articles coming soon'}</div>
  ${n ? '' : '<p>We’re writing these now. In the meantime, start with the latest on <a href="/editorial">The AIM</a>.</p>'}
  ${clusters.length > 1 ? `<nav class="jump" aria-label="Topics">${clusters.map((c) => `<a href="#${slugify(c)}">${esc(c)}</a>`).join('')}</nav>` : ''}
</header>
${clusters.map((c) => `<section class="wrap cluster" id="${slugify(c)}"><h2>${esc(c)}</h2><div class="grid">${items.filter((a) => a.cluster === c).sort((x, y) => !!y.hero?.src - !!x.hero?.src).map((a) => tile(a)).join('')}</div></section>`).join('\n')}`;
  return page({ title: `${p.name}: AI Articles and Guides for Moms | The AIM by ai.moms™`, description: `${p.desc} Articles and guides from The AIM by ai.moms™.`, canonical: `${SITE}/editorial/${p.id}`, ogType: 'website', image: absImg(items[0]?.hero?.src), main });
}

function indexPage(list, cfg) {
  const by = (s) => list.find((a) => a.slug === s);
  const lead = by(cfg.lead) || list[0];
  const news = list.find((a) => a.pillar === 'AI News');
  const side = (cfg.side || []).map(by).filter(Boolean).filter((a) => a !== lead).slice(0, 2);
  const shown = new Set([lead, ...side].filter(Boolean).map((a) => a.slug));
  const pick = (key, n, prefer = []) => {
    const pool = list.filter((a) => a.pillar === key && !shown.has(a.slug)).sort((x, y) => !!y.hero?.src - !!x.hero?.src);
    const out = [...prefer.map(by).filter((a) => a && pool.includes(a)), ...pool].filter((a, i, arr) => arr.indexOf(a) === i).slice(0, n);
    out.forEach((a) => shown.add(a.slug));
    return out;
  };
  const head = (p, count) => `<div class="sec-head"><div><h2>${esc(p.title || p.name)}</h2><p>${esc(p.desc)}</p></div>${count > 1 ? `<a class="all" href="/editorial/${p.id}">All ${count} ${p.key === 'For Moms' ? 'articles &amp; guides' : 'articles'}</a>` : ''}</div>`;
  const count = (key) => list.filter((a) => a.pillar === key).length;
  const start = (cfg.startHere || []).map(by).filter(Boolean);
  const sections = PILLARS.map((p) => {
    if (!count(p.key) || p.key === 'AI News') return '';
    const prefer = (cfg.featured || {})[p.key] || [];
    if (p.key === 'Education' && start.length) {
      const tiles = pick(p.key, 3, prefer);
      return `<section class="wrap sec" id="${p.id}">${head(p, count(p.key))}<div class="grid">${tiles.map((a) => tile(a)).join('')}<div class="start"><span class="kicker">New to AI? Start here</span>${start.map((a, i) => `<a href="/editorial/${a.slug}"><b>${i + 1}</b>${esc(plain(a.cardTitle || a.title))}</a>`).join('')}</div></div></section>`;
    }
    if (p.key === 'Community' && cfg.room) {
      const tiles = pick(p.key, 3, prefer);
      const r = cfg.room;
      return `<section class="wrap sec" id="${p.id}">${head(p, count(p.key))}<div class="grid">${tiles.map((a) => tile(a)).join('')}<a class="tile room" href="${esc(r.href)}">${ph(r.photo, r.photoAlt)}<div class="txt"><span class="kicker">${esc(r.kicker)}</span><h3>${inline(r.title)}</h3><p>${esc(r.copy)}</p><span class="go">${esc(r.cta)}</span></div></a></div></section>`;
    }
    const tiles = pick(p.key, 4, prefer);
    if (!tiles.length) return '';
    return `<section class="wrap sec" id="${p.id}">${head(p, count(p.key))}<div class="grid">${tiles.map((a) => tile(a)).join('')}</div></section>`;
  }).join('\n');
  const index = list.map((a) => ({ s: a.slug, t: plain(a.cardTitle || a.title), d: plain(a.dek), c: a.cluster, p: pillarOf(a).name, i: a.hero?.src || '', r: a.readTime,
    k: plain([a.title, a.dek, a.cluster, pillarOf(a).name, ...(a.brief?.primaryKeywords || []), ...(a.brief?.supportingTerms || [])].join(' ')).toLowerCase() }));
  const main = `${MAST(null)}
<section class="wrap top" aria-label="Top stories">
  ${lead ? `<a class="lead" href="/editorial/${lead.slug}">${ph(lead.hero?.src, lead.hero?.alt, '', lead.hero?.focus)}<span class="kicker">${esc(kicker(lead))}</span><h2>${esc(plain(lead.cardTitle || lead.title))}</h2><p>${esc(plain(lead.dek))}</p></a>` : ''}
  ${news ? `<aside class="news" aria-label="This week in AI"><div class="box"><span class="kicker">This week in AI</span><div class="date">${fmtDate(news.date)}</div><h2><a href="/editorial/${news.slug}">${esc(plain(news.title))}</a></h2><ol>${news.takeaways.map((t) => `<li>${esc(plain((t.match(/^\*\*(.+?)\*\*/) || [, t])[1]))}</li>`).join('')}</ol><a class="go" href="/editorial/${news.slug}">What it means for you</a><a class="go" href="/editorial/ai-news">All AI news</a></div></aside>` : `<div class="side">${side.map((a) => `<a href="/editorial/${a.slug}">${ph(a.hero?.src, a.hero?.alt, '', a.hero?.focus)}<span class="kicker">${esc(kicker(a))}</span><h3>${esc(plain(a.cardTitle || a.title))}</h3></a>`).join('')}</div>`}
</section>
<section class="wrap results" id="results" hidden aria-live="polite"><div class="sec-head"><h2>Results</h2></div><div class="grid" id="results-grid"></div><p class="empty" id="results-empty" hidden>Nothing yet. Try another word, like dinner, school or prompt.</p></section>
<div id="sections">
${sections}
</div>`;
  const js = `var IDX=${JSON.stringify(index).replace(/</g, '\\u003c')};
var q=document.getElementById('search'),res=document.getElementById('results'),grid=document.getElementById('results-grid'),secs=document.getElementById('sections'),top=document.querySelector('.top');
function e(s){return String(s).replace(/[&<>"]/g,function(c){return{'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]})}
function run(){var t=(q.value||'').trim().toLowerCase();if(!t){res.hidden=true;secs.hidden=false;top.hidden=false;return}var m=IDX.filter(function(a){return t.split(/\\s+/).every(function(w){return a.k.indexOf(w)>-1})});grid.innerHTML=m.map(function(a){return '<a class="tile" href="/editorial/'+a.s+'">'+(a.i?'<div class="ph" role="img" style="background-image:url(\\''+e(a.i)+'\\')"></div>':'<div class="ph none"></div>')+'<span class="kicker">'+e(a.p+' · '+a.c)+'</span><h3>'+e(a.t)+'</h3><p>'+e(a.d)+'</p><span class="meta">'+e(a.r)+' read</span></a>'}).join('');document.getElementById('results-empty').hidden=m.length>0;res.hidden=false;secs.hidden=true;top.hidden=true}
q.addEventListener('input',run);var u=new URLSearchParams(location.search).get('q');if(u){q.value=u;run()}`;
  const ld = { '@context': 'https://schema.org', '@type': 'CollectionPage', name: 'The AIM by ai.moms™', url: SITE + '/editorial', hasPart: list.map((a) => ({ '@type': 'Article', headline: plain(a.title), url: `${SITE}/editorial/${a.slug}` })) };
  return page({ title: 'The AIM by ai.moms™: AI News, Guides and Prompts for Moms', description: 'The AIM by ai.moms™: AI news, articles, guides and copy-ready prompts for the mom at home, the mom at work and the mompreneur.', canonical: SITE + '/editorial', ogType: 'website', image: absImg(lead?.hero?.src), extraHead: `<script type="application/ld+json">${JSON.stringify(ld).replace(/</g, '\\u003c')}</script>`, main, script: js });
}

const files = fs.readdirSync(SRC).filter((f) => f.endsWith('.json') && !f.startsWith('_'));
const cfg0 = JSON.parse(fs.readFileSync(path.join(SRC, '_index.json'), 'utf8'));
const loaded = files.map((f) => JSON.parse(fs.readFileSync(path.join(SRC, f), 'utf8')))
  .filter((a) => !a.archived && (LAUNCH ? (cfg0.launch || []).includes(a.slug) : (ALL || a.status !== 'draft')));
// Mockups get a page for review but stay out of the home page, section pages and Keep reading.
const list = loaded.filter((a) => !a.mockup);
// Every section keeps its tab and page; a section with no live articles yet says they're coming soon.
if (!ALL && !LAUNCH) LIVE = new Set([...list.map((a) => a.slug), ...PILLARS.map((p) => p.id)]);
list.sort((x, y) => (y.date || '').localeCompare(x.date || '') || x.title.localeCompare(y.title));
// In a launch build, launchHome (lead, side) matches the articles the launch home page features up top.
const cfg = LAUNCH && cfg0.launchHome ? { ...cfg0, ...cfg0.launchHome } : cfg0;
fs.mkdirSync(OUT, { recursive: true });
// The live site serves The AIM at /theaim (files stay in public/editorial, photos at /editorial/img).
const write = (f, html) => fs.writeFileSync(f, LIVE ? html.replace(/\/editorial(?!\/img\/)(?=[\/"'?#<\s]|$)/g, '/theaim') : html);
for (const f of fs.readdirSync(OUT)) if (f.endsWith('.html')) fs.unlinkSync(path.join(OUT, f));
for (const a of loaded) write(path.join(OUT, a.slug + '.html'), articlePage(a, list));
// Review-only test versions with the video, listen and highlights top (never in the production build).
if (ALL) for (const a of list) if (a.video) fs.writeFileSync(path.join(OUT, a.slug + '-video.html'), articlePage(a, list, { video: true }));
let pillars = 0;
for (const p of PILLARS) if (LIVE || list.some((a) => a.pillar === p.key)) { write(path.join(OUT, p.id + '.html'), pillarPage(p, list, cfg)); pillars++; }
write(path.join(OUT, 'index.html'), indexPage(list, cfg));
console.log(`Built ${list.length} article page(s) + ${pillars} pillar page(s) + home → ${path.relative(ROOT, OUT)}/`);
