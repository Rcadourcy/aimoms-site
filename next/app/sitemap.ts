import type { MetadataRoute } from 'next';
import { getAllArticles } from '@/lib/articles';

const BASE = 'https://aimoms.ai';

// Public, indexable routes only. Excludes *-register / *-thank-you / *-success
// (noindex transactional pages) and the /foundations-course stub. Every article in The Edit
// is listed at its canonical /article?id= URL so search engines can find it.
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
  const articles: MetadataRoute.Sitemap = (await getAllArticles()).map((a) => ({
    url: `${BASE}/article?id=${a.id}`,
    changeFrequency: 'monthly',
    priority: 0.6,
  }));
  return [...pages, ...articles];
}
