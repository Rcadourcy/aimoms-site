import type { Metadata } from 'next';
import Link from 'next/link';
import '../curriculum.css';

export const metadata: Metadata = {
  title: "What You'll Learn — ai moms™",
  description:
    'ai moms course curriculum. 3 modules, 45+ video lessons. Learn AI, build your AI team, automate your life.',
  alternates: { canonical: '/curriculum' },
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

export default function CurriculumPage() {
  return (
    <div className="page-curriculum">
      {/* HERO */}
      <section className="curr-hero">
        <div className="container">
          <div className="curr-eyebrow">FULL CURRICULUM</div>
          <h1>What You&#8217;ll Learn</h1>
          <p>3 modules. 45+ video lessons. From AI foundations to building your own AI family management team to automating your life.</p>
        </div>
      </section>

      <div className="container">
        {/* MODULE 1 */}
        <div className="mod">
          <div className="mod-label">MODULE 1</div>
          <h2>Learn</h2>
          <div className="mod-sub">AI Education &#8212; The Foundation &middot; 9 Sections &middot; 12 Videos</div>
          <div className="mod-outcome"><strong>Outcome:</strong> Equipped with the AI knowledge to begin your retirement from Chief Everything Officer&#8482;</div>

          <ul className="section-list">
            <li><span className="num">&#10003;</span><div><span className="title">The neuroscience of the mental load</span><div className="desc">Why you&#8217;re drowning &#8212; and why it&#8217;s not your fault. The history and brain science behind the invisible work.</div></div></li>
            <li><span className="num">&#10003;</span><div><span className="title">AI foundations &#8212; no jargon, no fluff</span><div className="desc">What AI actually is, how to use it effectively, and why this moment is different for mothers.</div></div></li>
            <li><span className="num">&#10003;</span><div><span className="title">Live demos of AI solving real mom problems</span><div className="desc">Watch AI handle meal planning, school emails, decision-making, and more &#8212; in real time.</div></div></li>
            <li><span className="num">&#10003;</span><div><span className="title">The RCTF prompting method</span><div className="desc">The simple framework that turns generic AI responses into genuinely useful, personalized results.</div></div></li>
            <li><span className="num">&#10003;</span><div><span className="title">Meet Aime &#8212; your AI Chief Everything Officer</span><div className="desc">Introduction to the custom AI assistant you&#8217;ll build, and the team of specialists she coordinates.</div></div></li>
          </ul>
        </div>

        {/* MODULE 2 */}
        <div className="mod">
          <div className="mod-label">MODULE 2</div>
          <h2>Build</h2>
          <div className="mod-sub">Build Your Aime Custom GPT &middot; 8 Sections &middot; 22 Videos</div>
          <div className="mod-outcome"><strong>Outcome:</strong> Your own Chief Everything Officer&#8482; &#8212; a fully-built Custom GPT loaded with your family&#8217;s knowledge, ready to use immediately</div>

          <ul className="section-list">
            <li><span className="num">&#10003;</span><div><span className="title">Build Aime from scratch &#8212; step by step</span><div className="desc">Click-by-click walkthrough to create your Custom GPT, loaded with your family&#8217;s knowledge.</div></div></li>
            <li><span className="num">&#10003;</span><div><span className="title">Test Aime with your real life</span><div className="desc">Put her to work immediately &#8212; meal planning, scheduling, decision-making, conversation prep.</div></div></li>
            <li><span className="num">&#10003;</span><div><span className="title">Build your AI family management team</span><div className="desc">Onboard Bianca (meals), Sara (schedules), Suzie (travel), Grace (events) &#8212; plus create your own custom assistants.</div></div></li>
          </ul>
        </div>

        {/* MODULE 3 */}
        <div className="mod">
          <div className="mod-label">MODULE 3</div>
          <h2>Automate</h2>
          <div className="mod-sub">Connect Aime to Your Real-World Systems &middot; 11 Sections &middot; 12 Videos</div>
          <div className="mod-outcome"><strong>Outcome:</strong> Aime can now take real actions &#8212; reading emails, managing your calendar, and building your Family Command Center. You officially retire from Chief Everything Officer&#8482;.</div>

          <ul className="section-list">
            <li><span className="num">&#10003;</span><div><span className="title">Connect Aime to your email and calendar</span><div className="desc">Set up automation workflows so Aime can read emails and manage your Google Calendar automatically.</div></div></li>
            <li><span className="num">&#10003;</span><div><span className="title">Build real automation workflows</span><div className="desc">Step-by-step Make.com setup &#8212; email actions, calendar actions, and your Family Command Center.</div></div></li>
            <li><span className="num">&#10003;</span><div><span className="title">Apply AI to your professional life</span><div className="desc">The same skills transfer to work &#8212; research, emails, presentations, meeting prep.</div></div></li>
          </ul>
        </div>
      </div>

      {/* CTA */}
      <div className="cta-section">
        <div className="container">
          <h2>Ready to Build Your AI Team?</h2>
          <p className="cta-lead">3 modules. 45+ video lessons. 50+ prompts. Founding member pricing: $247.</p>
          <Link href="/foundations#enroll" className="cta-btn">Register Now &#8594;</Link>
          <p className="cta-fine">7-day money-back guarantee. Instant access after payment.</p>
        </div>
      </div>
    </div>
  );
}
