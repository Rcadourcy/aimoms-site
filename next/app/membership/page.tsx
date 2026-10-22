import type { Metadata } from 'next';
import TrackedLink from '@/components/TrackedLink';
import '../membership.css';

export const metadata: Metadata = {
  title: 'The Membership — ai.moms™',
  description:
    'Join the ai.moms™ Membership for $59/month. Monthly live sessions on Zoom + private WhatsApp community + access to every ai.moms™ in-person event. Cancel anytime.',
  alternates: { canonical: '/membership' },
  openGraph: {
    title: 'The ai.moms™ Membership — Show up. Learn AI. Build things. Make mom friends.',
    description:
      '$59/month. Monthly live AI sessions on Zoom + private WhatsApp community + access to every ai.moms™ in-person event.',
    type: 'website',
    url: 'https://aimoms.ai/membership',
    images: ['/og-share.jpg'],
  },
};

export default function MembershipPage() {
  return (
    <div className="page-membership">
      {/* HERO */}
      <section className="hero">
        <div className="container-sm">
          <div className="hero-eyebrow"><span className="dot" /> Membership &middot; Live Monthly</div>
          <h1>Show up. Learn AI.<br /><span className="italic-accent">Make mom friends.</span></h1>
          <p className="hero-sub">
            A safe space for moms to learn AI, ask anything, and build alongside each other. Monthly live
            sessions on Zoom + a private WhatsApp community + <strong>access to every ai.moms&#8482; in-person event.</strong>
          </p>
          <div className="hero-price-line">
            <span className="num">$59<span className="pink">/mo</span></span>
            <span className="label">&middot; cancel anytime</span>
          </div>
          <div>
            <TrackedLink href="/membership-register" className="cta-pink cta-large" event="ViewContent" params={{ content_name: 'Membership - Hero CTA' }}>
              Join the Membership &rarr;
            </TrackedLink>
          </div>
          <p className="hero-note">Open to everyone &middot; no Foundations course required</p>
        </div>
      </section>

      {/* WHAT'S INCLUDED */}
      <section className="included-section">
        <div className="container">
          <div className="section-eyebrow">What&rsquo;s Included</div>
          <h2 className="section-title">Four things. <br />All useful.</h2>
          <p className="section-sub">No bloat. No fluff. The four things that actually move the needle when you&rsquo;re trying to build AI into your life as a mom.</p>

          <div className="included-grid">
            <div className="included-card">
              <div className="icon">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="6" width="14" height="12" rx="2" /><path d="m22 8-6 4 6 4V8Z" /></svg>
              </div>
              <h3>Monthly Live Sessions</h3>
              <p>Once a month on Zoom. A new AI topic each session &mdash; tool walk-throughs, workflow breakdowns, real prompts. <strong>Ask any question, no matter how basic</strong> &mdash; this is where moms come to learn out loud. Plus show-and-tell, where members share what they&rsquo;re working on. Replays sent if you can&rsquo;t make it live.</p>
            </div>
            <div className="included-card">
              <div className="icon">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M22 21v-2a4 4 0 0 0-3-3.87" /><path d="M16 3.13a4 4 0 0 1 0 7.75" /></svg>
              </div>
              <h3>Guest Speakers</h3>
              <p>Outside experts drop in throughout the year &mdash; founders, AI practitioners, other moms doing interesting things with these tools. You&rsquo;re not just learning from us. You&rsquo;re hearing from the people building what&rsquo;s next.</p>
            </div>
            <div className="included-card">
              <div className="icon">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" /></svg>
              </div>
              <h3>Private WhatsApp Community</h3>
              <p>A small, smart group of moms learning AI in real time. Share a prompt that worked. Ask a quick question between sessions. See what other moms are building. Supportive, not stupid. No engineer-speak, no shame, no &ldquo;just google it.&rdquo;</p>
            </div>
            <div className="included-card">
              <div className="icon">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" /><circle cx="12" cy="10" r="3" /></svg>
              </div>
              <h3>Access to In-Person Events</h3>
              <p>Members get complimentary access to every ai.moms&#8482; in-person event &mdash; mom-hosted gatherings, workshops, meetups. Show up in real life when you&rsquo;re ready. No ticket required.</p>
            </div>
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="how-section">
        <div className="container-sm">
          <div className="section-eyebrow">How It Works</div>
          <h2 className="section-title">Three steps to in.</h2>
          <p className="section-sub">From sign up to live on the call, in about 5 minutes.</p>

          <div className="steps">
            <div className="step">
              <div className="step-num">1</div>
              <div className="step-body">
                <h3>Sign up</h3>
                <p>$59/month. Cancel anytime. Quick form, then payment &mdash; takes about a minute.</p>
              </div>
            </div>
            <div className="step">
              <div className="step-num">2</div>
              <div className="step-body">
                <h3>Check your email</h3>
                <p>Once you register, you&rsquo;ll get a welcome email with two links: one to register for the recurring monthly Zoom sessions, and one to join the private WhatsApp community.</p>
              </div>
            </div>
            <div className="step">
              <div className="step-num">3</div>
              <div className="step-body">
                <h3>Show up. Learn AI. Build things. Make mom friends.</h3>
                <p>Once a month, drop into the live session &mdash; new topic each time. Bring questions. Share what you&rsquo;re building. Stay in touch in WhatsApp between sessions. Come to the in-person events when you&rsquo;re ready.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* PRICING / JOIN */}
      <section className="pricing-section" id="join">
        <div className="pricing-card">
          <div className="tag">Membership</div>
          <div className="price">$59<span className="small">/month</span></div>
          <div className="sub">Billed monthly. Cancel anytime.</div>

          <ul className="checklist">
            <li>Monthly live sessions on Zoom &mdash; new topic each time</li>
            <li>Q&amp;A + show-and-tell built into every session</li>
            <li>Guest speakers from outside the community</li>
            <li>Replays if you can&rsquo;t make it live</li>
            <li>Private WhatsApp community access</li>
            <li><strong>Access to every ai.moms&#8482; in-person event</strong></li>
            <li>Open to everyone &mdash; no prerequisite</li>
          </ul>

          <TrackedLink href="/membership-register" className="cta-pink cta-large" event="ViewContent" params={{ content_name: 'Membership - Pricing Card CTA' }}>
            Join the Membership &rarr;
          </TrackedLink>

          <p className="fineprint">Quick form, then payment, then a welcome email with your Zoom + WhatsApp invites. About 2 minutes total.</p>
        </div>
      </section>

      {/* FAQ */}
      <section className="faq-section">
        <div className="container-sm">
          <div className="section-eyebrow">Common Questions</div>
          <h2 className="section-title">Read this first.</h2>
          <p style={{ textAlign: 'center', color: 'var(--gray-600)', maxWidth: 520, margin: '0 auto 56px', fontSize: '1em', lineHeight: 1.7 }}>
            If your question isn&rsquo;t here, just email <a href="mailto:hello@aimoms.ai" style={{ color: 'var(--pink)', textDecoration: 'none', borderBottom: '1px solid rgba(255,99,216,0.3)' }}>hello@aimoms.ai</a>.
          </p>

          <div className="faq-list">
            <details className="faq-item">
              <summary>Do I need to take the Foundations course first?</summary>
              <div className="faq-answer">Nope. The membership is open to everyone &mdash; whether you&rsquo;ve never opened Claude or you&rsquo;re already using AI daily. The sessions scale to where you are. Some weeks we cover beginner-friendly topics, some weeks we go deep. WhatsApp keeps the conversation going at every level.</div>
            </details>
            <details className="faq-item">
              <summary>How often are the sessions?</summary>
              <div className="faq-answer">Monthly &mdash; once a month, live on Zoom. The exact day and time will be in your welcome email along with the Zoom registration link. If you can&rsquo;t make it live, a replay is sent to all members.</div>
            </details>
            <details className="faq-item">
              <summary>What&rsquo;s the format of each session?</summary>
              <div className="faq-answer">Each session has a structure: we open with a new AI topic (a tool walk-through, a workflow breakdown, a use-case deep dive), then it&rsquo;s your questions, then we do show-and-tell where members share what they&rsquo;re working on and get help live. Throughout the year, we also bring in guest speakers &mdash; founders, AI practitioners, other moms doing interesting things with these tools.</div>
            </details>
            <details className="faq-item">
              <summary>Do I really get access to all in-person events?</summary>
              <div className="faq-answer">Yes. Every ai.moms&#8482; in-person event &mdash; mom-hosted gatherings, workshops, meetups &mdash; is included with your membership. You just RSVP when you want to come. No ticket required.</div>
            </details>
            <details className="faq-item">
              <summary>What happens after I sign up?</summary>
              <div className="faq-answer">After registration, you&rsquo;ll get a welcome email from us with two links: one to register for the recurring monthly Zoom sessions, and one to join the private WhatsApp community. From there, you&rsquo;re in.</div>
            </details>
            <details className="faq-item">
              <summary>Can I cancel anytime?</summary>
              <div className="faq-answer">Yes &mdash; just send us an email at <a href="mailto:hello@aimoms.ai" style={{ color: 'var(--pink)', textDecoration: 'underline' }}>hello@aimoms.ai</a>. No friction.</div>
            </details>
            <details className="faq-item">
              <summary>How is this different from the Foundations course?</summary>
              <div className="faq-answer">The Foundations course is a one-time, structured curriculum &mdash; 6 modules, 44 lessons &mdash; that teaches you AI from the ground up. The membership is ongoing, live, and topic-driven. Lots of members do both: take the course to get the foundation, then join the membership to keep building and stay sharp as the tools evolve.</div>
            </details>
            <details className="faq-item">
              <summary>Is the WhatsApp group really private?</summary>
              <div className="faq-answer">Yes. It&rsquo;s a closed group, members only, invite link revoked if you cancel. We protect the vibe carefully &mdash; no spam, no ads, no recruiting. Just moms helping moms.</div>
            </details>
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="final-cta">
        <div className="container-sm final-cta-inner">
          <h2>Stop bookmarking AI tutorials.<br /><span className="pink">Start using AI.</span></h2>
          <p>$59 a month. Cancel anytime. Show up monthly, ask anything, share what you&rsquo;re building, and come to the in-person events when you&rsquo;re ready.</p>
          <TrackedLink href="/membership-register" className="cta-pink cta-large" event="ViewContent" params={{ content_name: 'Membership - Final CTA' }}>
            Join the Membership &rarr;
          </TrackedLink>
          <p className="final-cta-note">Quick form, then payment, then your Zoom + WhatsApp invites. About 2 minutes total.</p>
        </div>
      </section>
    </div>
  );
}
