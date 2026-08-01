import type { Metadata } from 'next';
import TrackedLink from '@/components/TrackedLink';
import '../workshop.css';

export const metadata: Metadata = {
  title: 'Monthly Virtual Workshop — Your real entry into AI for moms | ai.moms™',
  description:
    'A live 60-minute virtual workshop. The same intro we run at our in-person events — now on Zoom. Hands-on walk-through, real prompts, your questions answered. $68 a seat. Monthly.',
  alternates: { canonical: '/workshop' },
  openGraph: {
    title: 'Monthly Virtual Workshop — ai.moms™',
    description: 'A live 60-minute virtual workshop. $68 a seat. The easiest way to start with AI for moms.',
    type: 'website',
    url: 'https://aimoms.ai/workshop',
    images: ['https://aimoms.ai/og-image.png'],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Monthly Virtual Workshop — ai.moms™',
    description: 'A live 60-minute virtual workshop. $68 a seat. The easiest way to start with AI for moms.',
    images: ['https://aimoms.ai/og-image.png'],
  },
};

export default function WorkshopPage() {
  return (
    <div className="page-workshop">
      {/* HERO */}
      <section className="hero">
        <div className="container">
          <div className="hero-pills-row">
            <div className="hero-eyebrow"><span className="dot" /> Monthly Workshop &middot; Live &middot; 60 minutes</div>
            <div className="hero-price-line">$68<span className="pink"> a seat</span> &middot; replay included</div>
          </div>
          <h1>Your real entry into AI.<br /><span className="italic-accent">In 60 minutes.</span></h1>
          <p className="hero-sub">
            A live virtual workshop &mdash; the same intro we run at our in-person events, now on Zoom.{' '}
            <strong>Hands-on walk-through, real prompts, your questions answered.</strong> Held once a month.
          </p>

          <div className="hero-cta-wrap">
            <TrackedLink
              href="/workshop-register"
              className="cta-pink cta-large"
              event="InitiateCheckout"
              params={{ content_name: 'Workshop - Hero CTA', value: 68, currency: 'USD' }}
            >
              Reserve your seat
            </TrackedLink>
            <p className="hero-note">Open to everyone &middot; no prior AI experience needed</p>
          </div>

          {/* SAVE THE DATE */}
          <div className="date-callout">
            <div className="date-callout-label">Next workshop</div>
            <div className="date-callout-headline">Thursday, August 6 &middot; 10:00am ET</div>
            <p className="date-callout-sub">60 minutes live on Zoom. Replay sent if you can&rsquo;t make it. Held the same time each month.</p>
          </div>
        </div>
      </section>

      {/* INSIDE THE WORKSHOP */}
      <section className="included-section">
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '32px' }}>
            <div className="section-eyebrow centered">What&rsquo;s covered</div>
            <h2 className="section-title centered">Inside the workshop.</h2>
            <p className="section-sub centered">
              Four parts. 60 minutes. Live on Zoom. Built to take you from <strong>where you are</strong> to actually using AI tomorrow.
            </p>
          </div>

          <div className="included-grid">
            <div className="included-card">
              <div className="icon">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2a10 10 0 1 0 10 10" /><path d="M9 11a3 3 0 0 1 6 0c0 1.5-1 2-1.5 2.5S13 14.5 13 16" /><line x1="13" y1="19" x2="13" y2="19.01" /></svg>
              </div>
              <h3>01 &middot; The Welcome</h3>
              <p>Why moms feel the way we feel &mdash; the neuroscience behind it. Then our mission: to retire moms around the globe from <strong>Chief Everything Officer<span className="tm">&#8482;</span></strong>.</p>
            </div>

            <div className="included-card">
              <div className="icon">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12" /></svg>
              </div>
              <h3>02 &middot; The Foundations</h3>
              <p>AI platform basics. The building blocks of good AI use. The prompting principles every mom needs before going deeper.</p>
            </div>

            <div className="included-card">
              <div className="icon">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M23 21v-2a4 4 0 0 0-3-3.87" /><path d="M16 3.13a4 4 0 0 1 0 7.75" /></svg>
              </div>
              <h3>03 &middot; Mom Use Cases</h3>
              <p>Real-world use cases for the three moms we serve:</p>
              <ul className="usecase-list">
                <li><span className="bullet">&middot;</span> The mom at home <strong>eliminating the invisible load</strong></li>
                <li><span className="bullet">&middot;</span> The mom in corporate <strong>saving her seat at the table</strong></li>
                <li><span className="bullet">&middot;</span> The mom in her mompreneur era <strong>building something new</strong></li>
              </ul>
            </div>

            <div className="included-card">
              <div className="icon">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" /></svg>
              </div>
              <h3>04 &middot; Meet Aime</h3>
              <p>Your <strong>AI Chief Everything Officer<span className="tm">&#8482;</span></strong>. We introduce the tool, show how she works, and walk through how she fits into your real life &mdash; at home, at work, or both.</p>
            </div>
          </div>

          {/* Q&A built-in note */}
          <div className="qa-note">
            <p><strong>Plus your questions &mdash; built in throughout.</strong> They&rsquo;re not saved for the end. This is our time to shape the workshop together, around what you actually want to learn.</p>
          </div>
        </div>
      </section>

      {/* PRICING */}
      <section className="pricing-section" id="join">
        <div className="container-sm">
          <div style={{ textAlign: 'center', marginBottom: '30px' }}>
            <div className="section-eyebrow centered">Reserve your seat</div>
            <h2 className="section-title centered" style={{ fontSize: 'clamp(1.8em, 4vw, 2.6em)' }}>$68. One seat. 60 minutes.</h2>
          </div>

          <div className="pricing-card">
            <div className="tag">Monthly Workshop</div>
            <div className="price">$68<span className="small">a seat</span></div>
            <div className="sub">One-time payment. Replay included.</div>

            <ul className="checklist">
              <li>Live 60-minute Zoom workshop</li>
              <li>Hands-on walk-through in Claude</li>
              <li>Real, ready-to-use prompts for moms</li>
              <li>Built-in Q&amp;A &mdash; your actual questions</li>
              <li><strong>Replay if you can&rsquo;t make it live</strong></li>
              <li>Open to everyone &mdash; no prerequisite</li>
            </ul>

            <TrackedLink
              href="/workshop-register"
              className="cta-pink cta-large"
              event="InitiateCheckout"
              params={{ content_name: 'Workshop - Pricing Card', value: 68, currency: 'USD' }}
            >
              Reserve your seat
            </TrackedLink>

            <p className="fineprint">Confirmation email with Zoom link sent within minutes of registration.</p>
          </div>
        </div>
      </section>

      {/* AFTER THE WORKSHOP */}
      <section className="after-section">
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '36px' }}>
            <div className="section-eyebrow centered">After the workshop</div>
            <h2 className="section-title centered">Loved it? Here&rsquo;s where it goes.</h2>
            <p className="section-sub centered">
              The workshop is the easiest way to start. If you walk away wanting more &mdash; and most moms do &mdash; here&rsquo;s what comes next.
            </p>
          </div>

          <div className="after-grid">
            <TrackedLink href="/membership" className="after-card" event="ViewContent" params={{ content_name: 'Workshop - After: Membership' }}>
              <div className="after-tag">Most popular next step</div>
              <h3>Stay sharp every other week.</h3>
              <p>The Membership: bi-weekly live sessions on Zoom, private WhatsApp community, free access to all in-person events. $59/month. Cancel anytime.</p>
              <span className="after-link">Join the Membership &rarr;</span>
            </TrackedLink>

            <TrackedLink href="/foundations" className="after-card" event="ViewContent" params={{ content_name: 'Workshop - After: Foundations' }}>
              <div className="after-tag">Go deeper</div>
              <h3>Take the full course.</h3>
              <p>AI for Moms Foundations: 6 modules, 44 lessons, 50+ ready-to-use prompts. On-demand, watch on your schedule. Built by a mom, for moms.</p>
              <span className="after-link">See the course &rarr;</span>
            </TrackedLink>

            <a href="https://rsvp.aimoms.ai" target="_blank" rel="noopener noreferrer" className="after-card">
              <div className="after-tag">Bring your friends in</div>
              <h3>Host a mom-hosted experience.</h3>
              <p>Want your circle to learn AI together? Host an in-person gathering for your friends &mdash; we&rsquo;ll bring the curriculum, the prompts, and the energy.</p>
              <span className="after-link">Host or RSVP &rarr;</span>
            </a>

            <a
              href="mailto:hello@aimoms.ai?subject=Private%201%3A1%20Coaching%20Inquiry&body=Hi%20ai.moms%20team%2C%0A%0AI%20attended%20the%20workshop%20and%27d%20love%20to%20learn%20more%20about%20private%201%3A1%20AI%20coaching.%20A%20bit%20about%20me%3A%0A%0A"
              className="after-card"
            >
              <div className="after-tag">Want it personal?</div>
              <h3>Private 1:1 coaching.</h3>
              <p>Dedicated, personalized AI coaching tailored to your specific life, work, or business. The most direct path to building your own AI system.</p>
              <span className="after-link">Email us to inquire &rarr;</span>
            </a>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="faq-section">
        <div className="container-sm">
          <div style={{ textAlign: 'center', marginBottom: '24px' }}>
            <div className="section-eyebrow centered">Questions</div>
            <h2 className="section-title centered">Things people ask first.</h2>
          </div>

          <div className="faq-list">
            <details className="faq-item">
              <summary>What if I can&rsquo;t make it live?</summary>
              <div className="faq-answer">A replay is sent to every registered attendee within 24 hours of the workshop. You keep access for 30 days. Live is better for the Q&amp;A, but the replay is genuinely useful too.</div>
            </details>
            <details className="faq-item">
              <summary>Do I need any tech setup?</summary>
              <div className="faq-answer">Just Zoom (free) and a laptop. If you want to follow along hands-on, we recommend creating a free Claude account beforehand &mdash; but it&rsquo;s not required. You can watch first and try later.</div>
            </details>
            <details className="faq-item">
              <summary>Is this the same as the Foundations Course?</summary>
              <div className="faq-answer">No. The Foundations Course is the full curriculum &mdash; 6 modules, 44 lessons, 50+ prompts &mdash; designed for deep learning on your schedule. The workshop is a 60-minute live intro: a taste of what AI can do for moms, with hands-on demos and your real questions. Many people do the workshop first, then take the course.</div>
            </details>
            <details className="faq-item">
              <summary>Who&rsquo;s it for?</summary>
              <div className="faq-answer">Every mom. Whether you&rsquo;ve never opened an AI tool or you use Claude/ChatGPT every day, the workshop meets you where you are. Beginners learn the foundations. Experienced users pick up new prompts and workflows. No prerequisites.</div>
            </details>
            <details className="faq-item">
              <summary>Can I bring a friend?</summary>
              <div className="faq-answer">Absolutely &mdash; just register each person separately so we have your name on the Zoom link. The workshop is more fun with friends, and the Q&amp;A gets better the more moms are in the room.</div>
            </details>
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="final-cta">
        <div className="container-sm">
          <h2>Ready for your real entry into AI?</h2>
          <p>$68 a seat. 60 minutes live. Walk away actually using AI &mdash; and knowing where you want to go next.</p>
          <TrackedLink
            href="/workshop-register"
            className="cta-pink cta-large"
            event="InitiateCheckout"
            params={{ content_name: 'Workshop - Final CTA', value: 68, currency: 'USD' }}
          >
            Reserve your seat
          </TrackedLink>
          <p className="final-cta-note">Open to everyone. No prereqs. Cancel up to 24 hours before for a full refund.</p>
        </div>
      </section>
    </div>
  );
}
