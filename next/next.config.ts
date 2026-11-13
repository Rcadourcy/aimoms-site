import type { NextConfig } from "next";
import path from "node:path";
import fs from "node:fs";

// The AIM (/theaim) is built to static pages in public/editorial by scripts/build-editorial.mjs.
// Old /article?id= links go to the new article when it's published, otherwise to /theaim.
function editorialRedirects() {
  const dir = path.join(__dirname, 'content/editorial');
  const out: { source: string; has: { type: 'query'; key: string; value: string }[]; destination: string; permanent: boolean }[] = [];
  for (const f of fs.readdirSync(dir)) {
    if (!f.endsWith('.json') || f.startsWith('_')) continue;
    const a = JSON.parse(fs.readFileSync(path.join(dir, f), 'utf8'));
    const dest = a.status === 'draft' ? '/theaim' : `/theaim/${a.slug}`;
    for (const id of [a.legacyId, ...(a.mergedIds || [])].filter(Boolean)) {
      for (const source of ['/article', '/article.html']) out.push({ source, has: [{ type: 'query', key: 'id', value: id }], destination: dest, permanent: true });
    }
  }
  return out;
}

const nextConfig: NextConfig = {
  // Pin the workspace root to this folder so Next doesn't pick up a stray
  // lockfile elsewhere on the machine (e.g. ~/pnpm-lock.yaml).
  turbopack: {
    root: path.join(__dirname),
  },
  // The homepage and in-person thank-you page are hand-built static pages in /public.
  // beforeFiles runs ahead of app/page.tsx, so "/" serves the new homepage.
  // Old page addresses that now live elsewhere. The quiz is on the homepage.
  async redirects() {
    return [
      { source: '/off-your-plate', destination: '/top3', permanent: false },
      { source: '/curriculum', destination: '/foundations#curriculum', permanent: false },
      { source: '/quiz', destination: '/#quiz', permanent: true },
      { source: '/quiz.html', destination: '/#quiz', permanent: true },
      ...editorialRedirects(),
      { source: '/article', destination: '/theaim', permanent: true },
      { source: '/article.html', destination: '/theaim', permanent: true },
      { source: '/editorial.html', destination: '/theaim', permanent: true },
      // Nov 13: The AIM moved from /editorial to /theaim (photos stay at /editorial/img).
      { source: '/editorial', destination: '/theaim', permanent: true },
      { source: '/editorial/:slug([a-z0-9-]+)', destination: '/theaim/:slug', permanent: true },
    ];
  },
  async rewrites() {
    return {
      beforeFiles: [
        { source: '/', destination: '/home-v2.html' },
        { source: '/experience-thank-you', destination: '/experience-thank-you.html' },
        { source: '/nyc', destination: '/nyc.html' },
        { source: '/top3', destination: '/top3.html' },
        { source: '/off-your-plate-thank-you', destination: '/off-your-plate-thank-you.html' },
        { source: '/foundations', destination: '/foundations-v2.html' },
        { source: '/build-aime', destination: '/build-aime.html' },
        { source: '/build-aime-thank-you', destination: '/build-aime-thank-you.html' },
        { source: '/skill-guide', destination: '/skill-guide.html' },
        { source: '/experiences', destination: '/experiences-v2.html' },
        { source: '/your-town', destination: '/your-town.html' },
        { source: '/claude-duet', destination: '/claude-duet.html' },
        { source: '/corporate', destination: '/corporate-v2.html' },
        { source: '/membership', destination: '/membership-v2.html' },
        { source: '/theaim', destination: '/editorial/index.html' },
        { source: '/theaim/:slug([a-z0-9-]+)', destination: '/editorial/:slug.html' },
      ],
      afterFiles: [],
      fallback: [],
    };
  },
};

export default nextConfig;
