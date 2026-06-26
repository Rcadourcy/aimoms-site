import type { MetadataRoute } from 'next';

const BASE = 'https://aimoms.ai';

// Public, indexable routes only. Excludes *-register / *-thank-you / *-success
// (noindex transactional pages), the dynamic /article route, and the /foundations-course
// stub. Mirrors the static site's sitemap.xml and adds the other live public pages.
const ROUTES = [
  '',
  'foundations',
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

export default function sitemap(): MetadataRoute.Sitemap {
  return ROUTES.map((path) => ({
    url: path ? `${BASE}/${path}` : `${BASE}/`,
    changeFrequency: 'weekly',
    priority: path === '' ? 1 : 0.7,
  }));
}
