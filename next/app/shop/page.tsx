import type { Metadata } from 'next';
import TrackedLink from '@/components/TrackedLink';
import NewsletterPopup from '@/components/NewsletterPopup';
import FloatingQuizCTA from '@/components/FloatingQuizCTA';
import { STRIPE_LINKS, PRICES } from '@/lib/commerce';
import '../shop.css';

export const metadata: Metadata = {
  title: 'Shop — ai.moms™',
  description: 'We are on a mission to retire mothers from Chief Everything Officer.',
  alternates: { canonical: '/shop' },
  openGraph: {
    title: 'ai moms™ — Retire from Chief Everything Officer.™',
    description:
      'The #1 destination for mothers to learn AI, eliminate the invisible load, and build their own AI-powered family management team.',
    type: 'website',
    url: 'https://aimoms.ai',
    images: ['https://aimoms.ai/og-share.jpg'],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'ai moms™ — Retire from Chief Everything Officer.™',
    description:
      'The #1 destination for mothers to learn AI, eliminate the invisible load, and build their own AI-powered family management team.',
    images: ['https://aimoms.ai/og-share.jpg'],
  },
};

export default function ShopPage() {
  return (
    <div className="page-shop">
      {/* HERO */}
      <section className="shop-hero">
        <div className="shop-hero-inner">
          <div className="shop-eyebrow">The Shop &middot; Coming Soon</div>
          <h1>AI tools, merch &amp;<br /><span className="serif-accent">gifts for mom.</span></h1>
          <p>The AI for Moms Foundations Course is live now. Everything else is on the way.</p>
        </div>
      </section>

      {/* DIGITAL */}
      <section className="shop-section on-navy">
        <div className="shop-section-inner">
          <h2>Digital</h2>
          <div className="grid3">
            <div className="product-card featured">
              <span className="product-badge">Now Live</span>
              <span className="cat">COURSE</span>
              <h3>AI for Moms Foundations Course</h3>
              <p className="product-meta">6 modules &middot; 44 lessons &middot; Aime AI access</p>
              <div className="product-foot">
                <span className="product-price">${PRICES.foundations}</span>
                <TrackedLink
                  href="/foundations-register"
                  className="btn btn-pink"
                  event="InitiateCheckout"
                  params={{ content_name: 'shop-course', value: PRICES.foundations, currency: 'USD' }}
                >
                  Register Now
                </TrackedLink>
              </div>
            </div>

            <div className="product-card">
              <span className="cat">PROMPT PACK</span>
              <h3>Morning Routine Pack</h3>
              <p className="product-meta">15 prompts for mornings that run themselves</p>
              <div className="product-foot">
                <span className="product-price">$9.99</span>
                <span className="btn-soon">Coming Soon</span>
              </div>
            </div>

            <div className="product-card">
              <span className="cat">PROMPT PACK</span>
              <h3>Meal Planning Pack</h3>
              <p className="product-meta">20 prompts for meals, groceries &amp; nutrition</p>
              <div className="product-foot">
                <span className="product-price">$9.99</span>
                <span className="btn-soon">Coming Soon</span>
              </div>
            </div>

            <div className="product-card">
              <span className="cat">PROMPT PACK</span>
              <h3>School Year Pack</h3>
              <p className="product-meta">15 prompts for school logistics &amp; activities</p>
              <div className="product-foot">
                <span className="product-price">$9.99</span>
                <span className="btn-soon">Coming Soon</span>
              </div>
            </div>

            <div className="product-card">
              <span className="cat">PROMPT PACK</span>
              <h3>Travel Pack</h3>
              <p className="product-meta">15 prompts for family trip planning</p>
              <div className="product-foot">
                <span className="product-price">$9.99</span>
                <span className="btn-soon">Coming Soon</span>
              </div>
            </div>

            <div className="product-card">
              <span className="cat">BUNDLE</span>
              <h3>The Starter Kit</h3>
              <p className="product-meta">3 prompt packs + getting started guide</p>
              <div className="product-foot">
                <span className="product-price">$47</span>
                <span className="btn-soon">Coming Soon</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* MERCH */}
      <section className="shop-section on-cream">
        <div className="shop-section-inner">
          <h2>Merch</h2>
          <div className="grid4">
            <div className="merch-card">
              <div className="merch-thumb t-navy">
                <span className="merch-logo"><span className="ai">ai.</span><span className="light">moms</span></span>
                <span className="merch-soon-tag on-dark">COMING SOON</span>
              </div>
              <div className="merch-body">
                <h3>ai.moms&#8482; Baseball Cap</h3>
                <p>Navy with pink embroidered logo.</p>
                <div className="merch-foot"><span className="merch-price">$28</span><span className="label-soon">Coming Soon</span></div>
              </div>
            </div>

            <div className="merch-card">
              <div className="merch-thumb t-charcoal">
                <span className="merch-logo"><span className="ai">ai.</span><span className="light">moms</span></span>
                <span className="merch-soon-tag on-dark">COMING SOON</span>
              </div>
              <div className="merch-body">
                <h3>ai.moms&#8482; Winter Beanie</h3>
                <p>Soft ribbed knit. Embroidered logo.</p>
                <div className="merch-foot"><span className="merch-price">$18</span><span className="label-soon">Coming Soon</span></div>
              </div>
            </div>

            <div className="merch-card">
              <div className="merch-thumb t-cream">
                <span className="merch-logo"><span className="ai">ai.</span><span className="dark">moms</span></span>
                <span className="merch-soon-tag on-light">COMING SOON</span>
              </div>
              <div className="merch-body">
                <h3>Retired from Chief Everything Officer&#8482; Mug</h3>
                <p>&ldquo;Retired from Chief Everything Officer&#8482;&rdquo; &mdash; ceramic, 14oz.</p>
                <div className="merch-foot"><span className="merch-price">$18</span><span className="label-soon">Coming Soon</span></div>
              </div>
            </div>

            <div className="merch-card">
              <div className="merch-thumb t-stone">
                <span className="merch-logo"><span className="ai">ai.</span><span className="dark">moms</span></span>
                <span className="merch-soon-tag on-light">COMING SOON</span>
              </div>
              <div className="merch-body">
                <h3>ai.moms&#8482; Canvas Tote</h3>
                <p>&ldquo;Retired from Chief Everything Officer&#8482;&rdquo; &mdash; heavy canvas.</p>
                <div className="merch-foot"><span className="merch-price">$28</span><span className="label-soon">Coming Soon</span></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* GIFT */}
      <section className="shop-section gift">
        <div className="gift-inner">
          <span className="cat">GIVE THE GIFT OF TIME</span>
          <h2>Know a mom <span className="serif-accent">who needs this?</span></h2>
          <p className="gift-lead">The perfect gift for Mother&rsquo;s Day, her birthday, or just because she deserves to stop doing everything alone.</p>
          <p className="gift-subnote">Dads, partners, grandparents, friends &mdash; give her the gift of 10+ hours back every week.</p>
          <div className="gift-grid">
            <div className="gift-card">
              <span className="cat">COURSE GIFT</span>
              <h3>AI for Moms Foundations Course</h3>
              <p className="gift-meta">6 modules, 44 lessons, Aime AI access</p>
              <span className="gift-price">${PRICES.foundations}</span>
              {/* Stripe Payment Link — verbatim from commerce.ts (courseGift). External hosted checkout. */}
              <a href={STRIPE_LINKS.courseGift} target="_blank" rel="noopener noreferrer" className="btn-gift">Gift Now</a>
            </div>
            <div className="gift-card featured">
              <span className="cat">GIFT BUNDLE &#10022;</span>
              <h3>Course + Kit + Tote</h3>
              <p className="gift-meta">Foundations Course + Starter Kit + Canvas Tote</p>
              <span className="gift-price">${PRICES.bundle}</span>
              {/* Stripe Payment Link — verbatim from commerce.ts (bundle). External hosted checkout. */}
              <a href={STRIPE_LINKS.bundle} target="_blank" rel="noopener noreferrer" className="btn-gift">Gift Now</a>
            </div>
          </div>
          <p className="gift-final-note">Recipient gets a personalized email with instant access.</p>
        </div>
      </section>

      <FloatingQuizCTA />
      <NewsletterPopup />
    </div>
  );
}
