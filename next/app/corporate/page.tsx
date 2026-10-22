import type { Metadata } from 'next';
import Link from 'next/link';
import FloatingQuizCTA from '@/components/FloatingQuizCTA';
import '../corporate.css';

export const metadata: Metadata = {
  title: 'For Companies — ai moms™',
  description:
    'Bring ai moms to your company. Corporate AI workshops and programs designed specifically for working mothers.',
  alternates: { canonical: '/corporate' },
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

export default function CorporatePage() {
  return (
    <div className="page-corporate">
      {/* Hero */}
      <section className="hero-corp">
        <div className="container">
          <p className="label">Corporate Programs</p>
          <h1>Invest in <span className="accent">mothers.</span></h1>
          <p>Workshops that teach parents how to use AI to eliminate the invisible load &mdash; so they can show up at work with clarity, focus, and full capacity.</p>
        </div>
      </section>

      {/* Business Case */}
      <section className="business-case">
        <div className="container">
          <h2>Why Companies Are Investing</h2>
          <p className="subtitle">The invisible load isn&apos;t a personal problem &mdash; it&apos;s a workforce problem. When parents are overwhelmed at home, it shows up at work.</p>
          <div className="case-grid">
            <div className="case-card">
              <h3>Retention</h3>
              <p>Parents who feel supported stay. Reduce attrition among your highest-performing women.</p>
            </div>
            <div className="case-card">
              <h3>Productivity</h3>
              <p>Employees who offload 300+ weekly decisions to AI bring sharper focus to work.</p>
            </div>
            <div className="case-card">
              <h3>AI Adoption</h3>
              <p>82% of workers haven&apos;t received AI training. This makes AI personal &mdash; not just professional.</p>
            </div>
            <div className="case-card">
              <h3>Employer Brand</h3>
              <p>Position your company as a leader in supporting working families with innovative benefits.</p>
            </div>
          </div>
        </div>
      </section>

      {/* What We Deliver */}
      <section className="deliver">
        <div className="container">
          <h2>What We Deliver</h2>
          <p className="subtitle">Hands-on sessions that give your employees real AI skills &mdash; applied to the part of their life that drains the most energy.</p>
          <p className="format-note">A 2&ndash;3 hour hands-on session where your employees learn entry AI and build a personalized AI assistant that manages their household &mdash; not theory, a working tool they take home the same day.</p>
          <div className="deliver-grid">
            <div className="deliver-card">
              <h3>AI Foundations</h3>
              <p>Core concepts taught through a mom lens. Real scenarios. No jargon.</p>
            </div>
            <div className="deliver-card">
              <h3>Build Your AI Assistant</h3>
              <p>Each participant builds Aime &mdash; a personalized AI Chief Everything Officer&#8482; trained on their family&apos;s needs, values, and routines.</p>
            </div>
            <div className="deliver-card">
              <h3>Connect to Real Life</h3>
              <p>Integrate AI with Gmail, Calendar, and everyday tools. Participants leave with automations handling meal planning, scheduling, and logistics.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Engagement Options */}
      <section className="engagements">
        <div className="container">
          <h2>Let&apos;s Build Something for Your Team</h2>
          <p className="subtitle">Every company is different. We&apos;ll work with you to design the right experience for your people.</p>
          <div className="engage-grid">
            <div className="engage-card">
              <h3>Lunch &amp; Learn</h3>
              <p className="engage-desc">Intro Session</p>
              <ul className="engage-detail">
                <li>60&ndash;90 minute session</li>
                <li>AI foundations for parents</li>
                <li>Interactive demo</li>
                <li>Up to 50 participants</li>
                <li>Virtual or on-site</li>
              </ul>
            </div>
            <div className="engage-card featured">
              <h3>Workshop</h3>
              <p className="engage-desc">Hands-On Build</p>
              <ul className="engage-detail">
                <li>2&ndash;3 hour hands-on session</li>
                <li>Build a personalized AI assistant</li>
                <li>Real tool integration</li>
                <li>Up to 40 participants</li>
                <li>Virtual or on-site</li>
              </ul>
            </div>
            <div className="engage-card">
              <h3>Program</h3>
              <p className="engage-desc">Multi-Session Series</p>
              <ul className="engage-detail">
                <li>Multi-session team cohort</li>
                <li>Manager training included</li>
                <li>ROI tracking &amp; reporting</li>
                <li>Ongoing community access</li>
                <li>Fully customized</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Who It's For */}
      <section className="who">
        <div className="container">
          <h2>Who This Is For</h2>
          <div className="who-grid">
            <div className="who-card">
              <h3>People &amp; Culture Teams</h3>
              <p>Looking for innovative benefits that support parents and improve retention.</p>
            </div>
            <div className="who-card">
              <h3>ERGs &amp; Affinity Groups</h3>
              <p>Women&apos;s networks and parent groups looking for meaningful, skill-building programming.</p>
            </div>
            <div className="who-card">
              <h3>Forward-Thinking Leaders</h3>
              <p>Executives who understand that supporting the whole employee drives business performance.</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="corp-cta">
        <div className="container">
          <h2>Let&apos;s Design Something<br />for Your Team</h2>
          <p>Every engagement is customized. Reach out and we&apos;ll build a program that fits your people, your culture, and your goals.</p>
          <Link href="/press" className="btn-corp">Start the Conversation &rarr;</Link>
        </div>
      </section>

      {/* FAQ */}
      <section className="faq-corp">
        <div className="container">
          <h2>Frequently Asked Questions</h2>
          <div className="faq-list">
            <div className="faq-item">
              <h3>Is this only for mothers?</h3>
              <p>Our content is designed through the lens of mothers &mdash; the people most affected by the invisible load. But fathers and all parents benefit from the same tools and techniques. Many companies open it to all parents.</p>
            </div>
            <div className="faq-item">
              <h3>Do participants need to be tech-savvy?</h3>
              <p>Not at all. We designed this for people who have never used AI tools before. If they can use email and a web browser, they can do this. We walk through every single step.</p>
            </div>
            <div className="faq-item">
              <h3>Can sessions be virtual?</h3>
              <p>Yes. All formats &mdash; Lunch &amp; Learn, Workshop, and Program &mdash; are available both on-site and virtually. We&apos;ll recommend the best format based on your team.</p>
            </div>
            <div className="faq-item">
              <h3>What do participants leave with?</h3>
              <p>A fully built, personalized AI assistant (Aime) trained on their family&apos;s needs, working automations connected to their real tools, and the skills to keep building. This isn&apos;t theory &mdash; it&apos;s infrastructure.</p>
            </div>
            <div className="faq-item">
              <h3>How does pricing work?</h3>
              <p>Every engagement is scoped and priced based on format, group size, and customization. Reach out and we&apos;ll put together a proposal tailored to your team.</p>
            </div>
            <div className="faq-item">
              <h3>Can this count as AI training for our team?</h3>
              <p>Absolutely. Participants learn core AI concepts, prompt engineering, and tool integration &mdash; skills that transfer directly to the workplace. Many companies position this as part of their AI upskilling initiative.</p>
            </div>
          </div>
        </div>
      </section>

      <FloatingQuizCTA />
    </div>
  );
}
