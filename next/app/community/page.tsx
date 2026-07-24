import type { Metadata } from 'next';
import Link from 'next/link';
import InstagramFeed from '@/components/InstagramFeed';
import '../community.css';

export const metadata: Metadata = {
  title: 'Community — ai.moms™',
  description:
    'The ai.moms™ community — a space for mothers learning AI together: a private group chat, monthly virtual gatherings, in-person events, and Out of Office Weekends™.',
  alternates: { canonical: '/community' },
  openGraph: {
    title: 'ai.moms™ — Your Entry Into AI. For Moms.',
    description:
      'The #1 destination for moms to learn AI so she can get her time back and learn to build her dreams.',
    type: 'website',
    url: 'https://aimoms.ai',
    images: ['https://aimoms.ai/og-image.png'],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'ai.moms™ — Your Entry Into AI. For Moms.',
    description:
      'The #1 destination for moms to learn AI so she can get her time back and learn to build her dreams.',
    images: ['https://aimoms.ai/og-image.png'],
  },
};

export default function CommunityPage() {
  return (
    <div className="page-community">
      {/* HERO */}
      <section className="hero">
        <div className="container-sm">
          <div className="hero-eyebrow"><span className="dot" /> The Community</div>
          <h1>You were never meant to<br /><span className="italic-accent">carry it alone.</span></h1>
          <p className="hero-sub">ai.moms&#8482; is more than a course. It&rsquo;s a community of mothers learning AI together &mdash; in a private group chat, on monthly Zooms, and in living rooms across the country.</p>
          <div className="hero-cta-row">
            <Link href="/membership" className="cta-pink cta-large">Join the Membership &rarr;</Link>
            <Link href="/events" className="cta-ghost">See the schedule &rarr;</Link>
          </div>
          <p className="hero-note">The membership is the front door to everything below.</p>
        </div>
      </section>

      {/* WHY COMMUNITY */}
      <section className="editorial-section on-navy">
        <div className="container">
          <div className="section-eyebrow centered">Why It Matters</div>
          <h2 className="section-title centered" style={{ fontSize: 'clamp(1.7em,4vw,2.8em)', maxWidth: '860px', margin: '0 auto 22px' }}>Community isn&rsquo;t a nice-to-have. <span className="italic-accent">It&rsquo;s neurological.</span></h2>
          <p className="section-sub centered">The invisible load thrives in isolation. Here&rsquo;s what shifts in your brain when you&rsquo;re in a room of moms who actually get it.</p>

          <div className="trio-grid">
            <div className="trio-card">
              <div className="num">01</div>
              <h3>Your alarm quiets</h3>
              <p>The amygdala &mdash; your threat-detection center &mdash; settles when you feel understood. The low-grade panic eases the moment another mom says <span className="italic-accent">&ldquo;me too.&rdquo;</span></p>
            </div>
            <div className="trio-card dark">
              <div className="num">02</div>
              <h3>Stress drops</h3>
              <p>Connection and empathy lower cortisol. Being with women who get it <strong>literally</strong> turns down your stress response.</p>
            </div>
            <div className="trio-card">
              <div className="num">03</div>
              <h3>Your mind exhales</h3>
              <p>Shared problem-solving lightens the cognitive load. Your prefrontal cortex finally gets a break when you realize you&rsquo;re not uniquely failing &mdash; you&rsquo;re facing a systemic problem.</p>
            </div>
          </div>

          <div className="mission-block" style={{ marginTop: '22px' }}>
            <div className="label">The Bottom Line</div>
            <h2>When another mom says <span className="italic-accent">&ldquo;I feel that too,&rdquo;</span> your nervous system calms, oxytocin rises &mdash; and you remember you were never the problem.</h2>
          </div>
        </div>
      </section>

      {/* WAYS TO BE IN COMMUNITY */}
      <section className="ways-section">
        <div className="ways-head">
          <div className="section-eyebrow centered">Where We Gather</div>
          <h2 className="section-title centered">Five ways to be in community.</h2>
          <p className="section-sub centered">Start with the membership &mdash; it&rsquo;s the thread that runs through all of it.</p>
        </div>

        <div className="ways-grid">
          <Link href="/membership" className="way-card featured">
            <div className="way-tag">01 &middot; The core</div>
            <h3>The Membership</h3>
            <p>A private group chat that never sleeps, bi-weekly live sessions on Zoom, and The Members&rsquo; Table each month &mdash; plus free access to every in-person event. $49/month, cancel anytime.</p>
            <div className="way-link">Join the membership &rarr;</div>
          </Link>

          <Link href="/experiences" className="way-card">
            <div className="way-tag">02 &middot; In real life</div>
            <h3>Mom-Hosted<br />Experiences</h3>
            <p>Intimate, in-home gatherings where moms learn AI together. You bring the living room and your mom besties &mdash; we bring the teaching.</p>
            <div className="way-link">RSVP or host your own &rarr;</div>
          </Link>

          <Link href="/events" className="way-card">
            <div className="way-tag">03 &middot; On the calendar</div>
            <h3>In-Person<br />Events</h3>
            <p>City gatherings popping up across the country &mdash; from the Upper East Side to Larchmont, Paris to Miami. Find a room near you.</p>
            <div className="way-link">See the schedule &rarr;</div>
          </Link>

          <Link href="/out-of-office-waitlist" className="way-card">
            <div className="way-tag">04 &middot; Immersive</div>
            <h3>Out of Office<br />Weekends<span className="tm">&#8482;</span></h3>
            <p>Destination weekends to learn AI and rediscover the woman you were before you became Chief Everything Officer&#8482;. Launching 2026.</p>
            <div className="way-link">Join the waitlist &rarr;</div>
          </Link>

          <Link href="/subscribe" className="way-card way-card-wide">
            <div className="way-tag">05 &middot; Free</div>
            <h3>The Newsletter</h3>
            <p>Our weekly note on AI for moms &mdash; tools we love, prompts that work, and stories from the community. The easiest way to stay close.</p>
            <div className="way-link">Join the list &rarr;</div>
          </Link>
        </div>
      </section>

      {/* PROOF */}
      <section className="proof on-navy">
        <div className="proof-head">
          <h2 className="section-title centered">In moms we trust.</h2>
        </div>

        <div className="proof-grid">
          <div className="proof-card">
            <p>&ldquo;I loved the format. Your passion is intoxicating &mdash; you literally light up when you talk about it. Also the community aspect and the fact that it&rsquo;s only for us women&hellip; extra points.&rdquo;</p>
            <div className="proof-author">Isabelle D.</div>
            <div className="proof-role">ai.moms&#8482; Member</div>
          </div>
          <div className="proof-card">
            <p>&ldquo;Such a rich and encouraging experience. I&rsquo;m super excited to start automating, already feeling such a huge sense of accomplishment.&rdquo;</p>
            <div className="proof-author">Greta P.</div>
            <div className="proof-role">ai.moms&#8482; Member</div>
          </div>
          <div className="proof-card">
            <p>&ldquo;No stupid questions vibes. Doing it alongside other moms made such a difference. Raquel walked us through everything step by step &mdash; super easy and doable.&rdquo;</p>
            <div className="proof-author">Colleen Lee</div>
            <div className="proof-role">ai.moms&#8482; Member</div>
          </div>
        </div>
      </section>

      {/* INSTAGRAM FEED */}
      <InstagramFeed handle="aimoms" />

      {/* FINAL CTA */}
      <section className="final-cta">
        <div className="container-sm">
          <h2>Your people are <span style={{ whiteSpace: 'nowrap' }}>already here.</span></h2>
          <p>Join the membership and step into the group chat, the monthly Zooms, and every room we open &mdash; online and in real life.</p>
          <Link href="/membership" className="cta-pink cta-large">Join the Membership &rarr;</Link>
          <p className="final-cta-note">$49/month &middot; cancel anytime &middot; free access to every in-person event.</p>
        </div>
      </section>
    </div>
  );
}
