import type { Metadata } from 'next';
import Link from 'next/link';
import '../experiences.css';

export const metadata: Metadata = {
  title: 'Mom-Hosted Experiences — ai.moms™',
  description:
    "Mom-hosted experiences from ai.moms™. In-home AI gatherings for mothers — the best kind of girls' night in.",
  alternates: { canonical: '/experiences' },
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

export default function ExperiencesPage() {
  return (
    <div className="page-experiences">
      {/* HERO */}
      <section className="hero-exp">
        <div className="container">
          <h1>
            Mom-hosted experiences.
            <br />
            <span className="italic-accent">The best kind of girls&apos; night in.</span>
          </h1>
          <p>
            Bring ai moms&#8482; into your living room. An intimate, hands-on AI workshop with your
            closest friends. Your entry to AI. But for moms. Everyone leaves understanding AI and with
            a fully built assistant running their household.
          </p>
        </div>
      </section>

      {/* HERO IMAGE */}
      <div className="hero-image">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/experiences-hero.jpg" alt="" />
      </div>

      {/* THE CONCEPT */}
      <section className="concept">
        <div className="container">
          <div className="concept-inner">
            <h2>The Experience</h2>
            <p>
              You invite your closest mom friends. We bring the curriculum. You provide the living
              room, the good food, and the vibe.
            </p>
            <p>
              By the end of the evening, every woman in the room understands how to use AI in her daily
              life and has a fully customized AI assistant &mdash; loaded with her family&rsquo;s
              schedules, preferences, and routines &mdash; plus the confidence to use AI in every area
              of her life.
            </p>
            <p className="lead-bold">
              No tech experience needed. Just show up with your computer and an open mind.
            </p>
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="how-it-works">
        <div className="container">
          <h2>How It Works</h2>
          <div className="steps">
            <div className="step">
              <div className="step-num">1</div>
              <h3>You Host</h3>
              <p>
                Pick a date, invite your friends, set up your space. Wine, cheese, cozy vibes &mdash;
                you know the drill. We&rsquo;ll send you a simple hosting guide.
              </p>
            </div>
            <div className="step">
              <div className="step-num">2</div>
              <h3>We Teach</h3>
              <p>
                An ai moms&#8482; facilitator guides the group through a hands-on, step-by-step
                workshop. Everyone builds their own AI assistant in real time.
              </p>
            </div>
            <div className="step">
              <div className="step-num">3</div>
              <h3>Everyone Leaves Set Up</h3>
              <p>
                By the end of the night, every woman has a working AI system customized for her family.
                Plus ongoing access to the ai moms&#8482; community.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* THE EVENING */}
      <section className="evening">
        <div className="container">
          <h2>What the Evening Looks Like</h2>
          <div className="timeline">
            <div className="tl-item">
              <div className="tl-time">Arrive</div>
              <div className="tl-content">
                <strong>Settle in.</strong> Introductions and a quick vibe check. Everyone downloads
                Claude if they haven&rsquo;t already.
              </div>
            </div>
            <div className="tl-item">
              <div className="tl-time">60 min</div>
              <div className="tl-content">
                <strong>AI 101 for Moms.</strong> A jargon-free intro to AI &mdash; what it can do, what
                it can&rsquo;t, and why this matters for your life specifically.
              </div>
            </div>
            <div className="tl-item">
              <div className="tl-time">60 min</div>
              <div className="tl-content">
                <strong>Build Your Aime.</strong> Guided, hands-on session where everyone builds their
                own AI assistant. Loaded with their family&rsquo;s schedules, preferences, and routines.
                Lots of laughing, lots of &ldquo;wait, it can do THAT?&rdquo;
              </div>
            </div>
            <div className="tl-item">
              <div className="tl-time">30 min</div>
              <div className="tl-content">
                <strong>Test Drive + Q&amp;A.</strong> Try out your new assistant with real scenarios.
                Ask questions. Troubleshoot together. Share wins.
              </div>
            </div>
            <div className="tl-item">
              <div className="tl-time">Wrap</div>
              <div className="tl-content">
                <strong>Leave with a working system.</strong> Everyone goes home understanding AI, with
                Aime set up, plus access to the ai moms&#8482; community for ongoing support.
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* DETAILS */}
      <section className="details">
        <div className="container">
          <h2>The Details</h2>
          <div className="detail-grid">
            <div className="detail-card">
              <h3>$125</h3>
              <p>
                Per person
                <br />
                <span className="fine">Host attends free</span>
              </p>
            </div>
            <div className="detail-card">
              <h3>~3 hrs</h3>
              <p>
                Total evening
                <br />
                <span className="fine">Snacks included</span>
              </p>
            </div>
            <div className="detail-card">
              <h3>Your Home</h3>
              <p>
                You host, we teach
                <br />
                <span className="fine">Simple hosting guide provided</span>
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* HOST CTA */}
      <section className="host-cta">
        <div className="container">
          <h2>Want to Host?</h2>
          <p>
            We&rsquo;re kicking off our first wave of hosts this spring. If you&rsquo;ve got a living
            room, a group of mom friends, and good snacks &mdash; let&rsquo;s make it happen.
          </p>
          <Link href="/host-application" className="btn-host">
            I&rsquo;m Interested in Hosting &rarr;
          </Link>
          <p className="fine">We&rsquo;ll reach out with next steps and availability.</p>
        </div>
      </section>

      {/* FAQ */}
      <section className="faq-exp">
        <div className="container">
          <h2>Questions</h2>
          <div className="faq-list">
            <div className="faq-item">
              <h3>Do my guests need any tech experience?</h3>
              <p>
                None at all. If they can use a computer, they can do this. We walk everyone through
                every step.
              </p>
            </div>
            <div className="faq-item">
              <h3>What do I need to provide as the host?</h3>
              <p>
                Just your home and the atmosphere &mdash; wine, snacks, whatever feels right for your
                group. We handle all the teaching and materials. We&rsquo;ll send you a simple hosting
                guide ahead of time.
              </p>
            </div>
            <div className="faq-item">
              <h3>Does the host attend free?</h3>
              <p>Yes! As the host, your spot is on us. You just gather the crew and set the vibe.</p>
            </div>
            <div className="faq-item">
              <h3>Where are experiences available?</h3>
              <p>
                We&rsquo;re starting in the New York tri-state area and expanding based on demand. If
                you&rsquo;re somewhere else, reach out &mdash; we&rsquo;d love to hear from you.
              </p>
            </div>
            <div className="faq-item">
              <h3>What does everyone leave with?</h3>
              <p>
                A real understanding of AI, hands-on experience with ChatGPT and Claude, a fully set up
                AI assistant (Aime) customized for their family, plus access to the ai moms&#8482;
                community for ongoing support.
              </p>
            </div>
            <div className="faq-item">
              <h3>Can I do this for a corporate team or work event?</h3>
              <p>
                Absolutely. We offer corporate experiences too. Email us at{' '}
                <a href="mailto:hello@aimoms.ai">hello@aimoms.ai</a> and we&rsquo;ll put together
                something custom.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
