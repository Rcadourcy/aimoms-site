import type { Metadata } from 'next';
import OutOfOfficeWaitlistForm from '@/components/OutOfOfficeWaitlistForm';
import '../out-of-office-waitlist.css';

export const metadata: Metadata = {
  title: 'Out of Office Weekends™ — Waitlist — ai.moms™',
  description:
    'A full-day retreat for moms. Tennis, pool, learn AI, mahjong, dinner, breathe. Join the waitlist for the first Out of Office Weekend.',
  alternates: { canonical: '/out-of-office-waitlist' },
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

export default function OutOfOfficeWaitlistPage() {
  return (
    <div className="page-out-of-office-waitlist">
      {/* HERO */}
      <section className="hero">
        <div className="container">
          <div className="hero-eyebrow"><span className="dot" /> Out of Office Weekends<span className="tm">&#8482;</span> &middot; Coming soon</div>
          <h1>Tennis. Pool. Learn AI.<br />Mahjong. Dinner. <span className="italic-accent">Breathe.</span></h1>
          <p className="hero-sub">A full-day retreat for moms who want a real break from <strong>Chief Everything Officer<span className="tm">&#8482;</span></strong> duty. Learn AI, play tennis, network with brilliant women, eat extraordinary meals, and breathe.</p>
          <a href="#waitlist" className="cta-pink cta-large">Join the waitlist &rarr;</a>
          <p className="hero-note">First Out of Office launches Fall 2026 &middot; Limited to 50 moms</p>
        </div>
      </section>

      {/* A TYPICAL DAY */}
      <section className="schedule-section">
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: 8 }}>
            <div className="section-eyebrow centered"><span className="dot" /> A typical day</div>
            <h2 className="section-title centered">An itinerary redesigned around how moms actually want to spend a day off.</h2>
          </div>

          <div className="schedule-grid">
            <div className="schedule-card">
              <div className="schedule-time">8:30 &ndash; 9:30 AM</div>
              <div className="schedule-name">Morning fitness.</div>
              <p className="schedule-desc">The format changes with each Out of Office &mdash; HIIT, strength, barre, long walks. Announced before each retreat. Coaches on-site. Coffee waiting.</p>
            </div>

            <div className="schedule-card">
              <div className="schedule-time">9:30 &ndash; 11:00 AM</div>
              <div className="schedule-name">Tennis.</div>
              <p className="schedule-desc">Active mornings. Tennis, pickleball, paddle. Coaches and partners on-site. Coffee always.</p>
            </div>

            <div className="schedule-card">
              <div className="schedule-time">11:00 AM &ndash; 12:30 PM</div>
              <div className="schedule-name">Pool.</div>
              <p className="schedule-desc">Swim, lounge, poolside lunch. Reset the body before the brain work starts.</p>
            </div>

            <div className="schedule-card">
              <div className="schedule-time">12:30 &ndash; 2:30 PM</div>
              <div className="schedule-name">Learn AI.</div>
              <p className="schedule-desc">Two-hour deep dive with Aime &mdash; your AI Chief Everything Officer<span className="tm">&#8482;</span>. Real tools, real prompts, real workflows you&rsquo;ll use the second you get home.</p>
            </div>

            <div className="schedule-card">
              <div className="schedule-time">2:30 &ndash; 5:30 PM</div>
              <div className="schedule-name">Mahjong.</div>
              <p className="schedule-desc">Mahjong tables, games, spa. Social, slow, brain-on but lighter. Pick your speed.</p>
            </div>

            <div className="schedule-card">
              <div className="schedule-time">5:30 &ndash; 7:30 PM</div>
              <div className="schedule-name">Dinner.</div>
              <p className="schedule-desc">Chef-curated dinner. Long table. Real conversation. The kind of meal you don&rsquo;t make at home because someone always needs something.</p>
            </div>

            <div className="schedule-card wide">
              <div className="schedule-time">7:30 PM &ndash; close</div>
              <div className="schedule-name">Breathe.</div>
              <p className="schedule-desc">The exhale. Sunset drinks, long conversations, no agenda. The moment you look around at the moms you just spent the day with and realize &mdash; that was a really good day.</p>
            </div>
          </div>
        </div>
      </section>

      {/* WHAT'S INCLUDED */}
      <section className="included-section">
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: 8 }}>
            <div className="section-eyebrow centered"><span className="dot" /> What&rsquo;s included</div>
            <h2 className="section-title centered">Everything taken care of.</h2>
            <p className="section-sub centered">Show up with a bag. We&rsquo;ll handle the rest.</p>
          </div>

          <div className="included-grid">
            <div className="included-card">
              <div className="icon">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" /><polyline points="9 22 9 12 15 12 15 22" /></svg>
              </div>
              <h3>Beautiful venue.</h3>
              <p>Private property, design-forward spaces. Room to spread out, lounge, take a phone call if you have to. No tourists wandering through.</p>
            </div>

            <div className="included-card">
              <div className="icon">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10" /><path d="M2 12h20" /><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" /></svg>
              </div>
              <h3>Full AI curriculum.</h3>
              <p>Hands-on AI training. Built specifically for moms by moms. Walk away with workflows you actually use.</p>
            </div>

            <div className="included-card">
              <div className="icon">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 8h1a4 4 0 0 1 0 8h-1" /><path d="M2 8h16v9a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4z" /><line x1="6" y1="1" x2="6" y2="4" /><line x1="10" y1="1" x2="10" y2="4" /><line x1="14" y1="1" x2="14" y2="4" /></svg>
              </div>
              <h3>All meals + drinks.</h3>
              <p>Chef-curated lunch and dinner. Snacks always around. Natural wine, good coffee, fresh juice.</p>
            </div>

            <div className="included-card">
              <div className="icon">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M23 21v-2a4 4 0 0 0-3-3.87" /><path d="M16 3.13a4 4 0 0 1 0 7.75" /></svg>
              </div>
              <h3>Activities + coaches.</h3>
              <p>Tennis, pickleball, mahjong, pool, spa, morning fitness. Pros on-site to teach, partner, or just hang out.</p>
            </div>
          </div>
        </div>
      </section>

      {/* WHERE & WHEN */}
      <section className="locations-section">
        <div className="container">
          <div className="section-eyebrow centered" style={{ color: 'var(--pink)' }}><span className="dot" style={{ background: 'var(--pink)' }} /> Where &amp; when</div>
          <h2>Locations and dates <span style={{ color: 'var(--pink)' }}>coming soon.</span></h2>
          <p>We&rsquo;re scouting properties now &mdash; mountain, beach, desert. Waitlist members get first dibs on dates and locations when they&rsquo;re announced. Pricing released alongside the first weekend.</p>
        </div>
      </section>

      {/* WAITLIST FORM */}
      <section className="form-section" id="waitlist">
        <OutOfOfficeWaitlistForm />
      </section>

      {/* FAQ */}
      <section className="faq-section">
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: 8 }}>
            <div className="section-eyebrow centered"><span className="dot" /> What we know so far</div>
            <h2 className="section-title centered">Frequently asked.</h2>
          </div>

          <div className="faq-wrap">
            <details className="faq-item">
              <summary>When is the first Out of Office?</summary>
              <div className="faq-answer">Fall 2026. We&rsquo;re finalizing the property and the exact dates now. Waitlist members will be the first to know &mdash; before any public announcement.</div>
            </details>

            <details className="faq-item">
              <summary>How much will it cost?</summary>
              <div className="faq-answer">Pricing will be shared when we announce the first weekend. It&rsquo;s an all-inclusive full-day retreat &mdash; venue, lunch + dinner, all activities, full AI curriculum. Think boutique retreat pricing, not weekend-warrior pricing.</div>
            </details>

            <details className="faq-item">
              <summary>How many moms per retreat?</summary>
              <div className="faq-answer">Capped at 50. Small enough that you actually know everyone by the end. Large enough that the mastermind conversations stay rich.</div>
            </details>

            <details className="faq-item">
              <summary>Do I need to know AI to come?</summary>
              <div className="faq-answer">No. The curriculum starts at the beginning and goes deep. The only prerequisite is wanting to learn. If you&rsquo;re already advanced, you&rsquo;ll get more out of the business hour and the optional one-on-ones than the curriculum &mdash; and that&rsquo;s totally fine.</div>
            </details>

            <details className="faq-item">
              <summary>Can I bring a friend?</summary>
              <div className="faq-answer">Yes &mdash; she just needs to be on the waitlist too. We&rsquo;ll do our best to put friends in the same weekend if both of you are confirmed.</div>
            </details>

            <details className="faq-item">
              <summary>Is this just for moms, or anyone?</summary>
              <div className="faq-answer">Moms. That&rsquo;s the whole thing. The curriculum, the conversations, the energy, the schedule &mdash; all built around how moms specifically want to spend a day off.</div>
            </details>
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="final-cta">
        <div className="container">
          <h2>Set your <span style={{ color: 'var(--pink)' }}>Out of Office.</span> We&rsquo;ll handle the rest.</h2>
          <p>First Out of Office launches Fall 2026. Limited to 50 moms. Waitlist members get first dibs.</p>
          <a href="#waitlist" className="cta-pink cta-large">Join the waitlist &rarr;</a>
          <p className="final-cta-note">No commitment &middot; No payment &middot; Just your name on the list</p>
        </div>
      </section>
    </div>
  );
}
