import type { Metadata } from 'next';
import Link from 'next/link';
import '../careers.css';

export const metadata: Metadata = {
  title: 'Careers — ai moms™',
  description:
    'ai moms™ is on a mission to retire working mothers from Chief Everything Officer™. We have a course, a community, and a movement. Now we are growing our team.',
  alternates: { canonical: '/careers' },
  openGraph: {
    title: 'Careers — ai moms™',
    description:
      'We are building something real. Come build it with us. ai moms™ is growing our team.',
    type: 'website',
    url: 'https://aimoms.ai/careers',
    images: ['https://aimoms.ai/og-image.png'],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Careers — ai moms™',
    description:
      'We are building something real. Come build it with us. ai moms™ is growing our team.',
    images: ['https://aimoms.ai/og-image.png'],
  },
};

export default function CareersPage() {
  return (
    <div className="page-careers">
      <section className="hero">
        <div className="hero-label">Careers</div>
        <h1>We&apos;re building something <em>real.</em> Come build it with us.</h1>
        <p>ai moms&#8482; is on a mission to retire working mothers from Chief Everything Officer&#8482;. We have a course, a community, and a movement. Now we&apos;re growing our team.</p>
      </section>

      <section className="positions">
        <h2>Available Experiences</h2>

        <Link href="/certified-teacher" className="position-row">
          <div className="position-left">
            <div className="position-type">Paid Role &middot; For Moms</div>
            <div className="position-title">Certified ai.moms&#8482; Teacher</div>
            <div className="position-pills">
              <span className="pill">Paid &middot; Per Workshop</span>
              <span className="pill">Remote or In-Person</span>
              <span className="pill">For Moms</span>
            </div>
          </div>
          <div className="position-arrow">&rarr;</div>
        </Link>

        <Link href="/mom-ambassador" className="position-row">
          <div className="position-left">
            <div className="position-type">Now Open &middot; For Moms</div>
            <div className="position-title">ai.moms&#8482; Mom Ambassador</div>
            <div className="position-pills">
              <span className="pill">Flexible &middot; Your City</span>
              <span className="pill">For Moms</span>
            </div>
          </div>
          <div className="position-arrow">&rarr;</div>
        </Link>

        <Link href="/social-intern" className="position-row">
          <div className="position-left">
            <div className="position-type">Internship &middot; For Academic Credit</div>
            <div className="position-title">Social Media Intern</div>
            <div className="position-pills">
              <span className="pill">Unpaid &middot; For Course Credit</span>
              <span className="pill">NY-Based or Remote</span>
              <span className="pill">Part-Time Volunteer Hours</span>
            </div>
          </div>
          <div className="position-arrow">&rarr;</div>
        </Link>

        <Link href="/marketing-intern" className="position-row">
          <div className="position-left">
            <div className="position-type">Internship &middot; For Academic Credit</div>
            <div className="position-title">Brand Marketing Intern</div>
            <div className="position-pills">
              <span className="pill">Unpaid &middot; For Course Credit</span>
              <span className="pill">NY-Based or Remote</span>
              <span className="pill">Part-Time Volunteer Hours</span>
            </div>
          </div>
          <div className="position-arrow">&rarr;</div>
        </Link>

        <Link href="/brand-partnerships-intern" className="position-row">
          <div className="position-left">
            <div className="position-type">Internship &middot; For Academic Credit</div>
            <div className="position-title">Brand Partnerships Intern</div>
            <div className="position-pills">
              <span className="pill">Unpaid &middot; For Course Credit</span>
              <span className="pill">NY-Based or Remote</span>
              <span className="pill">Part-Time Volunteer Hours</span>
            </div>
          </div>
          <div className="position-arrow">&rarr;</div>
        </Link>

        <Link href="/editorial-intern" className="position-row">
          <div className="position-left">
            <div className="position-type">Internship &middot; For Academic Credit</div>
            <div className="position-title">Editorial Intern</div>
            <div className="position-pills">
              <span className="pill">Unpaid &middot; For Course Credit</span>
              <span className="pill">NY-Based or Remote</span>
              <span className="pill">Part-Time Volunteer Hours</span>
            </div>
          </div>
          <div className="position-arrow">&rarr;</div>
        </Link>

        <Link href="/ai-product-ops-intern" className="position-row">
          <div className="position-left">
            <div className="position-type">Internship &middot; For Academic Credit</div>
            <div className="position-title">AI Product &amp; Operations Intern</div>
            <div className="position-pills">
              <span className="pill">Unpaid &middot; For Course Credit</span>
              <span className="pill">NY-Based or Remote</span>
              <span className="pill">Part-Time Volunteer Hours</span>
            </div>
          </div>
          <div className="position-arrow">&rarr;</div>
        </Link>
      </section>
    </div>
  );
}
