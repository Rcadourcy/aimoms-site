import type { Metadata } from 'next';
import Link from 'next/link';
import PurchasePixel from '@/components/PurchasePixel';
import LibraryLinkForm from '@/components/LibraryLinkForm';
import { PRICES } from '@/lib/commerce';
import '../workshop-thank-you.css';

export const metadata: Metadata = {
  title: "You're in — Prompt Library | ai.moms™",
  description: 'Your ai.moms™ Prompt Library is ready.',
  alternates: { canonical: '/prompt-library-thank-you' },
  robots: { index: false, follow: false },
};

export default async function PromptLibraryThankYouPage({
  searchParams,
}: {
  searchParams: Promise<{ session_id?: string }>;
}) {
  const { session_id: id } = await searchParams;
  // Stripe's redirect carries a live session id. Without one, this isn't a buyer arriving from checkout.
  const paid = typeof id === 'string' && /^cs_live_[A-Za-z0-9_]+$/.test(id);

  if (!paid) {
    return (
      <div className="page-workshop-thank-you">
        <section className="confirm-section">
          <div className="confirm-inner">
            <h1 className="confirm-title">Looking for your prompts?</h1>
            <p className="confirm-sub">
              Your link is in the email we sent you. Can&apos;t find it? Write to{' '}
              <a href="mailto:hello@aimoms.ai">hello@aimoms.ai</a> and we&apos;ll send it again.
            </p>
            <p className="confirm-sub"><Link href="/shop">Go to the shop &rarr;</Link></p>
          </div>
        </section>
      </div>
    );
  }

  return (
    <div className="page-workshop-thank-you">
      <PurchasePixel event="Purchase" contentName="Prompt Library" value={PRICES.promptLibrary} />

      <section className="confirm-section">
        <div className="confirm-inner">
          <div className="confirm-kicker">You&apos;re in</div>
          <h1 className="confirm-title">Your 100 prompts are ready.</h1>
          <p className="confirm-sub">
            Open your ai.moms<span className="tm">&#8482;</span> Prompt Library, pick the one that fits today, and paste it into Claude.
          </p>

          <div className="next-block">
            <div className="next-label">Step 1</div>
            <div className="next-headline"><Link href="/library/80be84153d2a" style={{ color: 'var(--pink)' }}>Open My Prompt Library &rarr;</Link></div>
          </div>

          <div className="next-block">
            <div className="next-label">Step 2</div>
            <div className="next-headline">Send the link to your inbox.</div>
            <p className="date-sub">Use the email you want to keep it in. We&apos;ll send one button that opens your library any time.</p>
            <LibraryLinkForm />
          </div>

          <div className="next-block">
            <div className="next-label">When you want more</div>
            <div className="next-headline"><Link href="/build-aime" style={{ color: 'var(--pink)' }}>Build Aime &rarr;</Link></div>
            <p className="date-sub">
              Your Chief Everything Officer&#8482;, with 25 ready-made skills, so you stop pasting prompts and she already knows your family.
            </p>
            <p className="date-sub">Questions? Email <a href="mailto:hello@aimoms.ai">hello@aimoms.ai</a>.</p>
          </div>
        </div>
      </section>
    </div>
  );
}
