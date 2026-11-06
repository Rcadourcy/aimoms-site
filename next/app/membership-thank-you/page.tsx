import type { Metadata } from 'next';
import Link from 'next/link';
import PurchasePixel from '@/components/PurchasePixel';
import '../membership-thank-you.css';

export const metadata: Metadata = {
  title: "You're in — Welcome to ai.moms™",
  description: 'Welcome to the ai.moms™ Membership. Your Zoom and WhatsApp invites are on the way.',
  alternates: { canonical: '/membership-thank-you' },
  robots: { index: false, follow: true },
};

export default function MembershipThankYouPage() {
  return (
    <div className="page-membership-thank-you">
      {/*
        Stripe success_url lands here. The live site fires a Meta Pixel "Subscribe"
        event with value 49 — preserved verbatim for ad-attribution parity. NOTE: the
        membership price is $59/mo; the 49 looks like a stale value worth confirming
        with Raquel before launch (see commerce.ts PRICES.membership).
      */}
      <PurchasePixel event="Subscribe" contentName="Membership" value={59} />

      {/* CONFIRMATION */}
      <section className="confirm-section">
        <div className="confirm-inner">
          <div className="confirm-kicker">You&apos;re in</div>
          <h1 className="confirm-title">Welcome to the ai.moms<span className="tm">&#8482;</span> <span className="italic-accent">family.</span></h1>
          <p className="confirm-sub">
            You&rsquo;re officially an ai.moms<span className="tm">&#8482;</span> member. <strong>We&rsquo;re so glad you&rsquo;re here.</strong>
          </p>

          {/* SAVE THE DATE */}
          <div className="date-block">
            <div className="date-label">First session</div>
            <div className="date-headline">Tuesday, June 23 &middot; <span style={{ color: 'var(--pink)' }}>12&ndash;1pm ET</span></div>
            <p className="date-sub">Then every other Tuesday, same time. Replays sent if you can&rsquo;t make it live.</p>
          </div>

          {/* WHAT HAPPENS NEXT */}
          <div className="next-block">
            <div className="next-label">What happens next</div>
            <div className="next-headline">Three things, <span style={{ color: 'var(--pink)' }}>in order.</span></div>
            <ol className="next-list">
              <li><span className="num">1</span><span><strong>Check your email.</strong></span></li>
              <li><span className="num">2</span><span><strong>Click the two links</strong> to register for the Zoom calls and join our WhatsApp community.</span></li>
              <li><span className="num">3</span><span><strong>Show up.</strong> Bring whatever you&rsquo;re stuck on, curious about, or proud of.</span></li>
            </ol>
          </div>

          {/* CTA BACK TO SITE */}
          <div className="cta-block">
            <div className="cta-label">In the meantime</div>
            <div className="cta-headline">Get to know <span style={{ color: 'var(--pink)' }}>ai.moms<span className="tm">&#8482;</span></span></div>
            <p className="cta-sub">Explore the rest of the site &mdash; the Foundations course, in-person experiences, the newsletter, and more.</p>
            <Link href="/" className="cta-link">Visit aimoms.ai</Link>
          </div>
        </div>
      </section>
    </div>
  );
}
