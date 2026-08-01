import type { Metadata } from 'next';
import WorkshopRegisterForm from '@/components/WorkshopRegisterForm';
import '../workshop-register.css';

export const metadata: Metadata = {
  title: 'Reserve Your Seat — Monthly Workshop — ai.moms™',
  description:
    'Reserve your seat for the next ai.moms™ Monthly Workshop. $68 a seat. 60 minutes live on Zoom — Thursday, August 6, 10:00am ET. Replay included.',
  alternates: { canonical: '/workshop-register' },
  robots: { index: false, follow: true },
};

export default function WorkshopRegisterPage() {
  return (
    <div className="page-workshop-register">
      {/* HERO */}
      <section className="hero">
        <div className="container-sm">
          <div className="hero-eyebrow"><span className="dot" /> Monthly Workshop &middot; Registration</div>
          <h1>You&rsquo;re almost in.</h1>
          <p className="hero-sub">
            Two quick steps: a few details about you, then payment. About <strong>2 minutes</strong> total.
            Then you&rsquo;ll get a confirmation email with your Zoom link.
          </p>
          <div className="hero-price-line">$68<span className="pink"> a seat</span> &middot; replay included</div>
        </div>
      </section>

      {/* FORM */}
      <section className="form-section">
        <div className="container-sm">
          <WorkshopRegisterForm />
        </div>
      </section>
    </div>
  );
}
