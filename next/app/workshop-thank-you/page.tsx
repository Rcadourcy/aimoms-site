import type { Metadata } from 'next';
import PurchasePixel from '@/components/PurchasePixel';
import '../workshop-thank-you.css';

export const metadata: Metadata = {
  title: "You're in — Workshop Confirmed | ai.moms™",
  description: 'Your seat is reserved for the next ai.moms™ Monthly Workshop. Zoom link arriving by email.',
  alternates: { canonical: '/workshop-thank-you' },
  robots: { index: false, follow: true },
};

export default function WorkshopThankYouPage() {
  return (
    <div className="page-workshop-thank-you">
      {/*
        Stripe success_url lands here. The live site fires a Meta Pixel "Purchase"
        event with value 25 — preserved verbatim for ad-attribution parity. NOTE: the
        workshop price is $68; the 25 looks like a stale value worth confirming with
        Raquel before launch (see commerce.ts PRICES.workshop).
      */}
      <PurchasePixel event="Purchase" contentName="Monthly Workshop" value={25} />

      {/* CONFIRMATION */}
      <section className="confirm-section">
        <div className="confirm-inner">
          <div className="confirm-kicker">You&apos;re in</div>
          <h1 className="confirm-title">Your seat is reserved.</h1>
          <p className="confirm-sub">
            You&rsquo;re officially registered for the next ai.moms<span className="tm">&#8482;</span> Monthly Workshop.{' '}
            <strong>We&rsquo;re so glad you&rsquo;re joining us.</strong>
          </p>

          {/* SAVE THE DATE */}
          <div className="date-block">
            <div className="date-label">Save the date</div>
            <div className="date-headline">Thursday, August 6 &middot; <span style={{ color: 'var(--pink)' }}>10:00am ET</span></div>
            <p className="date-sub">60 minutes live on Zoom. Replay sent if you can&rsquo;t make it live.</p>
          </div>

          {/* WHAT HAPPENS NEXT */}
          <div className="next-block">
            <div className="next-label">What happens next</div>
            <div className="next-headline">Three things, <span style={{ color: 'var(--pink)' }}>in order.</span></div>
            <ol className="next-list">
              <li><span className="num">1</span><span><strong>Check your inbox.</strong> A confirmation email from <a href="mailto:hello@aimoms.ai" style={{ color: 'var(--navy)', textDecoration: 'underline' }}>hello@aimoms.ai</a> arrives in a few minutes with your Zoom link.</span></li>
              <li><span className="num">2</span><span><strong>Add it to your calendar.</strong> The Zoom link works for the live session and the replay.</span></li>
              <li><span className="num">3</span><span><strong>Bring your questions.</strong> The workshop is shaped around what moms actually want to learn.</span></li>
            </ol>
          </div>
        </div>
      </section>
    </div>
  );
}
