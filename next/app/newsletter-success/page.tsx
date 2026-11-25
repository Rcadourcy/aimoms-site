import type { Metadata } from 'next';
import Link from 'next/link';
import '../newsletter-success.css';

export const metadata: Metadata = {
  title: "You're subscribed. — ai.moms™",
  description: 'Welcome to The AIM.',
  alternates: { canonical: '/newsletter-success' },
  robots: { index: false, follow: true },
};

export default function NewsletterSuccessPage() {
  return (
    <div className="page-newsletter-success">
      <section className="confirm-section">
        <div className="confirm-inner">
          <h1 className="confirm-title">YOU&rsquo;RE SUBSCRIBED!</h1>
          <p className="confirm-sub">
            The AIM lands in your inbox every Friday: one tip, a prompt or a few to try that same day, and the AI news that matters for mom life.
          </p>
          <p className="confirm-accent">See you Friday.</p>
          <Link href="/theaim/" className="btn btn-navy">&larr; Back to The AIM</Link>
        </div>
      </section>
    </div>
  );
}
