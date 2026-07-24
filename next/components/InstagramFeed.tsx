/**
 * "Follow along on Instagram" section — the first step of pulling our own social
 * content onto the site. Renders a grid of tiles + a follow CTA.
 *
 * Right now it renders a curated set of brand images (the `posts` default below).
 * To go LIVE with the real feed, pass a `posts` array fetched from either:
 *   (a) a Make.com scenario → Supabase → this component (owns the data, no client
 *       secrets, matches our stack), or
 *   (b) a widget/embed provider.
 * Each post is { img, alt, permalink } so wiring the live source is a drop-in swap.
 */
import Link from 'next/link';

export type IgPost = { img: string; alt: string; permalink?: string };

const DEFAULT_POSTS: IgPost[] = [
  { img: '/img-mom-3.png', alt: 'A mom smiling, laptop open' },
  { img: '/img-unsplash-23.jpg', alt: 'Mom and daughter laughing together over coffee' },
  { img: '/img-unsplash-9.jpg', alt: 'Kids playing outdoors in summer sunshine' },
  { img: '/img-unsplash-21.jpg', alt: 'Woman meal-planning with a tablet in a bright kitchen' },
  { img: '/img-unsplash-19.jpg', alt: 'Woman walking outside speaking into her phone' },
  { img: '/img-unsplash-33.jpg', alt: 'Mom helping her teen with college paperwork' },
  { img: '/img-unsplash-26.jpg', alt: 'Mom and a caregiver going over a checklist together' },
  { img: '/img-mom-4.png', alt: 'A confident mom outdoors' },
];

export default function InstagramFeed({
  handle = 'aimoms',
  profileUrl,
  posts = DEFAULT_POSTS,
}: {
  handle?: string;
  profileUrl?: string;
  posts?: IgPost[];
}) {
  const url = profileUrl ?? `https://www.instagram.com/${handle}/`;
  return (
    <section className="ig-section">
      <div className="container">
        <div className="section-eyebrow centered">On Instagram</div>
        <h2 className="section-title centered">
          Come hang out <span className="italic-accent">@{handle}</span>.
        </h2>
        <p className="section-sub centered" style={{ margin: '0 auto 40px' }}>
          The tools, the wins, and the mom-life realness. Follow along &mdash; and tag us in what you build.
        </p>

        <div className="ig-grid">
          {posts.map((p, i) => (
            <a
              key={i}
              className="ig-tile"
              href={p.permalink ?? url}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="View on Instagram"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={p.img} alt={p.alt} loading="lazy" />
              <span className="ig-ov" aria-hidden="true">
                <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2" y="2" width="20" height="20" rx="5" />
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
                </svg>
              </span>
            </a>
          ))}
        </div>

        <div className="ig-cta-row">
          <Link href={url} className="cta-pink" target="_blank" rel="noopener noreferrer">
            Follow @{handle} &rarr;
          </Link>
        </div>
      </div>
    </section>
  );
}
