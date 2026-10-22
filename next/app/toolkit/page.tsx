import type { Metadata } from 'next';
import Link from 'next/link';
import ToolkitClient from '@/components/ToolkitClient';
import FloatingQuizCTA from '@/components/FloatingQuizCTA';
import NewsletterPopup from '@/components/NewsletterPopup';
import '../toolkit.css';

export const metadata: Metadata = {
  title: 'The AI Toolkit for Moms — ai.moms™',
  description:
    'The AI Toolkit for Moms. 80+ AI tools scored on ease, time saved, family fit, and value. Mom-tested, mom-reviewed.',
  alternates: { canonical: '/toolkit' },
  openGraph: {
    title: 'The AI Toolkit for Moms — ai.moms™',
    description:
      '80+ AI tools for mothers, scored and ranked. The complete guide to AI apps for family life.',
    type: 'website',
    url: 'https://aimoms.ai/toolkit',
    images: ['https://aimoms.ai/og-share.jpg'],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'The AI Toolkit for Moms — ai.moms™',
    description:
      '80+ AI tools for mothers, scored and ranked. The complete guide to AI apps for family life.',
    images: ['https://aimoms.ai/og-share.jpg'],
  },
};

export default function ToolkitPage() {
  return (
    <div className="page-toolkit">
      {/* HERO */}
      <section className="tk-hero">
        <div className="tk-hero-inner">
          <p className="tk-hero-eyebrow">Mom-Tested. Mom-Reviewed.</p>
          <h1>The AI Toolkit<br /><span className="accent">for moms.</span></h1>
          <p>Every tool scored on what actually matters to moms: ease of use, time saved, family fit, and value. Ranked highest to lowest within every category.</p>
          <div className="tk-hero-chips">
            <div className="tk-chip-pink">80+ Tools Curated</div>
            <div className="tk-chip-ghost">Updated Weekly</div>
          </div>
        </div>
      </section>

      {/* SCORING KEY */}
      <section className="tk-scorekey">
        <div className="tk-scorekey-inner">
          <span className="tk-scorekey-title">How We Score:</span>
          <div className="tk-scorekey-items">
            <span><strong>⚡ Ease</strong> — No learning curve</span>
            <span><strong>⏱ Time</strong> — Reduces invisible load</span>
            <span><strong>👨‍👩‍👧 Family</strong> — Built for family life</span>
            <span><strong>💰 Value</strong> — Worth the cost</span>
          </div>
          <span className="tk-scorekey-note">Each scored 1–10 → Overall</span>
        </div>
      </section>

      {/* FILTER BAR + SECTIONS (interactive) */}
      <ToolkitClient />

      {/* CTA BANNER */}
      <section className="tk-cta">
        <div className="tk-cta-inner">
          <p className="tk-cta-eyebrow">Ready to Put AI to Work?</p>
          <h2>AI Foundations for Moms</h2>
          <p>Our on-demand course teaches you how to actually use AI in your daily life — with hands-on demos, templates, and a family management system you&apos;ll use every single day. No tech background required.</p>
          <Link href="/" className="tk-cta-btn">Get Instant Access &#8594;</Link>
        </div>
      </section>

      <FloatingQuizCTA />
      <NewsletterPopup />
    </div>
  );
}
