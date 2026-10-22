import type { Metadata } from 'next';
import NewsletterForm from '@/components/NewsletterForm';
import '../subscribe.css';

export const metadata: Metadata = {
  title: 'Subscribe — ai moms™',
  description: 'Subscribe to ai moms. The smartest AI content for moms, delivered every Friday.',
  alternates: { canonical: '/subscribe' },
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

export default function SubscribePage() {
  return (
    <div className="page-subscribe">
      <section className="subscribe-section">
        <div className="subscribe-inner">
          <div className="sub-brandmark">
            <span className="ai">ai.</span><span className="moms">moms</span><span className="tm-mini">&#8482;</span>
          </div>
          <h1>The Smartest AI Content for Moms. Every Friday.</h1>
          <p className="sub-lead">
            One email a week. Real AI strategies for real life &mdash; from meal prep to meetings. No jargon.
            No spam. Just the stuff that actually helps.
          </p>
          <NewsletterForm />
          <p className="sub-fine">Unsubscribe anytime. We respect your inbox.</p>
        </div>
      </section>
    </div>
  );
}
