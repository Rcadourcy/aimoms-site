import type { Metadata } from 'next';
import PressForm from '@/components/PressForm';
import FloatingQuizCTA from '@/components/FloatingQuizCTA';
import NewsletterPopup from '@/components/NewsletterPopup';
import '../press.css';

export const metadata: Metadata = {
  title: 'Partnerships, Press & Media — ai.moms™',
  description: 'Press features, podcast interviews, speaking engagements, brand partnerships.',
  alternates: { canonical: '/press' },
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

export default function PressPage() {
  return (
    <div className="page-press">
      <section className="press-hero">
        <div className="press-hero-inner">
          <h1>Partnerships, press &amp; <span className="serif-accent">media.</span></h1>
          <p>
            Press features, podcast interviews, speaking engagements, brand partnerships, collaborations
            &mdash; we&rsquo;re open to it all.
          </p>
        </div>
      </section>

      <section className="press-form-section">
        <div className="press-form-inner">
          <PressForm />
        </div>
      </section>

      <FloatingQuizCTA />
      <NewsletterPopup />
    </div>
  );
}
