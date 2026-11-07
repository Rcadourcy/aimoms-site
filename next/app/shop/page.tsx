import type { Metadata } from 'next';
import Link from 'next/link';
import TrackedLink from '@/components/TrackedLink';
import NewsletterPopup from '@/components/NewsletterPopup';
import FloatingQuizCTA from '@/components/FloatingQuizCTA';
import { STRIPE_LINKS, PRICES } from '@/lib/commerce';
import '../shop.css';

export const metadata: Metadata = {
  title: 'Shop — ai.moms™',
  description:
    'The Foundations Course, Build Aime and the ai.moms™ Plugin, the Prompt Library, The Top 3 Session, in-person experiences and the ai.moms™ hat.',
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
          <div className="shop-eyebrow">The Shop</div>
          <h1>Pick how you want<br /><span className="serif-accent">to start.</span></h1>
          <p>Learn on your own time, sit down with us, or bring your friends into a room. And yes, there&rsquo;s a hat.</p>
        </div>
      </section>

      {/* OFFERS */}
      <section className="shop-section on-navy">
        <div className="shop-section-inner">
          <div className="offer-grid">
            <div className="product-card wide">
              <span className="cat">Course</span>
              <h3>The Foundations Course</h3>
              <p className="product-desc">Learn AI on your own time, step by step, in 44 video lessons across 6 modules.</p>
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
              {/* Stripe Payment Link — verbatim from commerce.ts (courseGift). External hosted checkout. */}
              <a href={STRIPE_LINKS.courseGift} target="_blank" rel="noopener noreferrer" className="gift-link">Give it as a gift &rarr;</a>
            </div>

            <div className="product-card wide">
              <span className="cat">Your assistant</span>
              <h3>Build Aime + the ai.moms&#8482; Plugin</h3>
              <p className="product-desc">Set up Aime, your Chief Everything Officer&#8482;, and get 25 ready-made skills for Claude, Anthropic&rsquo;s AI assistant.</p>
              <div className="product-foot">
                <span className="product-price">$97</span>
                <Link href="/build-aime" className="btn btn-pink">Build Aime</Link>
              </div>
            </div>

            <div className="product-card">
              <span className="cat">Prompts</span>
              <h3>The ai.moms&#8482; Prompt Library</h3>
              <p className="product-desc">100 prompts sorted for the mom at home, the mom at work and the mompreneur. Fill in the pink parts and paste.</p>
              <div className="product-foot">
                <span className="product-price">${PRICES.promptLibrary}</span>
                {/* Stripe Payment Link — verbatim from commerce.ts (promptLibrary). External hosted checkout. */}
                <TrackedLink
                  href={STRIPE_LINKS.promptLibrary}
                  className="btn btn-pink"
                  event="InitiateCheckout"
                  params={{ content_name: 'shop-prompt-library', value: PRICES.promptLibrary, currency: 'USD' }}
                >
                  Get the Library
                </TrackedLink>
              </div>
            </div>

            <div className="product-card">
              <span className="cat">Private session</span>
              <h3>The Top 3 Session</h3>
              <p className="product-desc">90 minutes with us, on Zoom or in person in NYC. Bring your 3 biggest headaches or wishes, and we get them done together.</p>
              <div className="product-foot">
                <span className="product-price">$500</span>
                <a href="/top3" className="btn btn-pink">Pick Your Time</a>
              </div>
            </div>

            <div className="product-card">
              <span className="cat">In person</span>
              <h3>In-Person Experiences</h3>
              <p className="product-desc">Three hands-on hours with moms you already know. Every guest gets the Foundations Course and 25 skills.</p>
              <div className="product-foot">
                <span className="product-price">$265 <small>per guest</small></span>
                <a href="/experiences" className="btn btn-pink">Host One</a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* HAT */}
      <section className="hat-section" id="merch">
        <div className="hat-inner">
          {/* Placeholder photo: Raquel is sending better hat pictures. */}
          <img src="/shop/hat-only.jpg" alt="White ai.moms™ baseball hat on a bar in front of pink gift bags" className="hat-photo" />
          <div className="hat-copy">
            <span className="cat">The Hat</span>
            <h2>ai.moms&#8482; hat placement is <span className="serif-accent">non-negotiable.</span></h2>
            <p className="hat-lead">You&rsquo;ve seen it on the moms in our rooms. It&rsquo;s made for:</p>
            <ul className="hat-list">
              <li>The morning Claude handled the meal plan and nobody handled your hair.</li>
              <li>School pickup, when another mom asks about your hat and you get to tell her.</li>
              <li>Retiring from Chief Everything Officer&#8482; and wanting everyone to know.</li>
            </ul>
            <span className="btn-soon">Coming Soon</span>
          </div>
        </div>
      </section>

      <FloatingQuizCTA />
      <NewsletterPopup />
    </div>
  );
}
