import type { Metadata } from 'next';
import MembershipRegisterForm from '@/components/MembershipRegisterForm';
import '../membership-register.css';

export const metadata: Metadata = {
  title: 'Join the Membership — ai.moms™',
  description:
    'Register for the ai.moms™ Membership. $59/month — monthly live sessions on Zoom, private WhatsApp community, and free access to every ai.moms™ in-person event.',
  alternates: { canonical: '/membership-register' },
  robots: { index: false, follow: true },
};

export default function MembershipRegisterPage() {
  return (
    <div className="page-membership-register">
      {/* HERO */}
      <section className="hero">
        <div className="container-sm">
          <div className="hero-eyebrow"><span className="dot" /> Membership &middot; Registration</div>
          <h1>You&rsquo;re almost in.</h1>
          <p className="hero-sub">
            Two quick steps: a few details about you, then payment. About <strong>2 minutes</strong> total.
            Then you&rsquo;ll get a welcome email with your Zoom + WhatsApp links.
          </p>
          <div className="hero-price-line">$59<span className="pink">/mo</span> &middot; cancel anytime</div>
        </div>
      </section>

      {/* FORM */}
      <section className="form-section">
        <div className="container-sm">
          <MembershipRegisterForm />
        </div>
      </section>
    </div>
  );
}
