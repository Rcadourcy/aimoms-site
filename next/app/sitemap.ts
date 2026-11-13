import type { MetadataRoute } from 'next';
import fs from 'node:fs';
import path from 'node:path';

const BASE = 'https://aimoms.ai';

// Public, indexable routes only. Excludes *-register / *-thank-you / *-success
// (noindex transactional pages) and the /foundations-course stub. Every page of The AIM
// (built to public/editorial) is listed at its /editorial/<slug> URL.
const ROUTES = [
  '',
  'foundations',
  'build-aime',
  'top3',
  'skill-guide',
  'your-town',
  'membership',
  'workshop',
  'shop',
  'quiz',
  'editorial',
  'experiences',
  'events',
  'community',
  'science',
  'corporate',
  'curriculum',
  'press',
  'toolkit',
  'subscribe',
  'host-application',
  'out-of-office-waitlist',
  'careers',
  'certified-teacher',
  'mom-ambassador',
  'social-intern',
  'marketing-intern',
  'brand-partnerships-intern',
  'ai-product-ops-intern',
  'editorial-intern',
  'privacy',
  'terms',
];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const pages: MetadataRoute.Sitemap = ROUTES.map((path) => ({
    url: path ? `${BASE}/${path}` : `${BASE}/`,
    changeFrequency: 'weekly',
    priority: path === '' ? 1 : 0.7,
  }));
  const dir = path.join(process.cwd(), 'public/editorial');
  const slugs = fs.existsSync(dir) ? fs.readdirSync(dir).filter((f) => f.endsWith('.html') && f !== 'index.html').map((f) => f.replace(/\.html$/, '')) : [];
  const articles: MetadataRoute.Sitemap = slugs.map((slug) => ({
    url: `${BASE}/editorial/${slug}`,
    changeFrequency: 'monthly',
    priority: 0.6,
  }));
  return [...pages, ...articles];
}
