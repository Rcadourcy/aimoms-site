import type { Metadata } from 'next';
import Link from 'next/link';
import HostRequestForm from '@/components/HostRequestForm';
import '../host-application.css';

export const metadata: Metadata = {
  title: 'Host Request — ai.moms™',
  description: 'Request to host a mom-hosted experience in your home. The best kind of girls\' night in.',
  alternates: { canonical: '/host-application' },
  openGraph: {
    title: 'Host a Mom-Hosted Experience — ai.moms™',
    description:
      'Open up your living room. Invite your mom besties. We bring the AI. Request to host a mom-hosted experience.',
    type: 'website',
    url: 'https://aimoms.ai/host-application',
    images: ['https://aimoms.ai/og-share.jpg'],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Host a Mom-Hosted Experience — ai.moms™',
    description: 'Open up your living room. Invite your mom besties. We bring the AI.',
    images: ['https://aimoms.ai/og-share.jpg'],
  },
};

export default function HostApplicationPage() {
  return (
    <div className="page-host-application">
      {/* Hero */}
      <section className="host-hero">
        <div className="host-hero-inner">
          <span className="cat">REQUEST TO HOST</span>
          <h1>
            The smartest girls&#8217; night in<br />
            <span className="italic-accent">you&apos;ll ever host.</span>
          </h1>
          <p>
            A mom-hosted experience is the best kind of girls&#8217; night in &#8212; an intro to AI that helps
            you and your mom besties eliminate the invisible load and build your own AI Chief Everything
            Officer&#8482;. You provide the pours, the snacks, and the guest list. We bring the teaching.
          </p>
        </div>
      </section>

      {/* The Form */}
      <section className="host-form-section">
        <div className="host-form-inner">
          <div className="host-form-card">
            <span className="cat">TELL US ABOUT YOU</span>
            <h2>Host Request</h2>
            <p className="host-form-intro">
              Takes about 3 minutes. We&#8217;ll be in touch to lock in your date.
            </p>
            <HostRequestForm />
          </div>
        </div>
      </section>

      {/* FAQ Mini */}
      <section className="host-faq">
        <div className="host-faq-inner">
          <h2>A Few Quick Things</h2>

          <div className="faq-card">
            <h3>Do I need to know anything about AI?</h3>
            <p>Nope. The whole point is that you don&#8217;t. We teach beginners. If you&#8217;ve been curious but overwhelmed, you&#8217;re exactly who this is for.</p>
          </div>

          <div className="faq-card">
            <h3>What do I provide as the host?</h3>
            <p>Your home, the snacks, and the guest list. We send a simple hosting guide ahead of time. Wine and cheese are encouraged but not required.</p>
          </div>

          <div className="faq-card">
            <h3>How long is the evening?</h3>
            <p>About 3 hours total &#8212; including time to mingle before and after. The structured AI part is around 2.5 hours: an intro to AI, a hands-on session where you put AI to work on real mom-life to-dos, and a Q&amp;A.</p>
          </div>

          <div className="faq-card">
            <h3>Is there a cost to attend?</h3>
            <p>Guests pay per person to attend. As the host, your seat is free. We&#8217;ll walk you through pricing and details once we connect.</p>
          </div>

          <div className="host-faq-back">
            <Link href="/experiences">&larr; Back to Experiences</Link>
          </div>
        </div>
      </section>
    </div>
  );
}
