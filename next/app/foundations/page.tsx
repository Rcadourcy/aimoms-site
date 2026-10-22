import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import TrackedLink from '@/components/TrackedLink';
import NewsletterPopup from '@/components/NewsletterPopup';
import FloatingQuizCTA from '@/components/FloatingQuizCTA';
import { PRICES } from '@/lib/commerce';
import '../foundations.css';

export const metadata: Metadata = {
  title: 'ai.moms™ — Retire from Chief Everything Officer™',
  description:
    "Master AI for moms. On your schedule. The on-demand course teaching mothers to build an AI-powered family management team and retire from Chief Everything Officer™.",
  alternates: { canonical: '/foundations' },
  openGraph: {
    title: 'ai.moms™ — Retire from Chief Everything Officer™',
    description:
      'The #1 destination for mothers to learn AI, eliminate the invisible load, and build their own AI-powered family management team.',
    type: 'website',
    url: 'https://aimoms.ai/foundations',
    images: ['/og-share.jpg'],
  },
};

const covers = [
  "AI Foundations — What AI actually is, how to talk to it, and why it's different from Google.",
  'Meal planning, emergency dinners, grocery lists — solved in 30 seconds.',
  'School calendar chaos, newsletters, permission slips — tamed.',
  'Hard decisions, difficult conversations, emotional overwhelm — thought through.',
  'Home management, delegation SOPs, vendor lists — organized.',
  'Travel, birthday parties, gift shopping — planned without the spiral.',
  'AI at work — brand guardians, campaign planning, and your AI marketing partner. The skills transfer.',
  'Build Aime — your AI Chief Everything Officer™ who knows your family, your preferences, and your chaos.',
];

export default function FoundationsPage() {
  return (
    <div className="page-foundations">
      {/* HERO */}
      <section className="hero" style={{ textAlign: 'center' }}>
        <div className="container">
          <div className="hero-label" style={{ textAlign: 'center' }}>
            On-Demand Course · 6 Modules · 44 Video Lessons
          </div>
          <div style={{ textAlign: 'center', marginBottom: 16, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10, flexWrap: 'wrap' }}>
            <span style={{ display: 'inline-block', background: 'rgba(6,13,38,0.06)', color: 'var(--navy)', fontSize: '0.78em', fontWeight: 600, padding: '5px 14px', borderRadius: 20 }}>
              Built by moms, for moms.
            </span>
            <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6, background: '#060d26', color: '#fff', fontSize: '0.78em', fontWeight: 700, padding: '5px 14px', borderRadius: 20, letterSpacing: '0.3px' }}>
              <svg width="12" height="12" viewBox="0 0 24 24" fill="#ff63d8"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z" /><circle cx="12" cy="12" r="4" fill="#ff63d8" /></svg>
              Taught in Claude — the #1 AI right now
            </span>
          </div>
          <h1 style={{ fontFamily: "'Outfit',sans-serif", fontWeight: 900, fontSize: 'clamp(2.8em,6vw,4em)', letterSpacing: '-0.03em', textAlign: 'center', lineHeight: 1.05 }}>
            <span style={{ whiteSpace: 'nowrap' }}>Master AI.</span> <span style={{ whiteSpace: 'nowrap' }}>For moms.</span>
            <br />
            <span style={{ fontFamily: "'Playfair Display',Georgia,serif", fontStyle: 'italic', fontWeight: 500, color: '#ff63d8', whiteSpace: 'nowrap' }}>On your schedule.</span>
          </h1>
          <p className="hero-sub" style={{ textAlign: 'center', marginLeft: 'auto', marginRight: 'auto' }}>
            6 modules. 44 video lessons. 50+ ready-to-use prompts.<br />
            Taught in <strong>Claude</strong> — the most powerful AI platform available right now.<br />
            Built by a mom of two with 20 years of marketing leadership — from LVMH to CMO of luxury and lifestyle brands. Walk into next week actually using this.
          </p>
          <div style={{ fontFamily: "'Outfit',sans-serif", fontWeight: 900, fontSize: '1.1em', color: 'var(--navy)', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: 16, opacity: 0.7, textAlign: 'center' }}>
            Retire from Chief Everything Officer™
          </div>
          <div style={{ textAlign: 'center' }}>
            <Link href="/foundations-register" className="cta-btn" style={{ padding: '16px 60px' }}>Register Now →</Link>
          </div>
          <p className="hero-note" style={{ textAlign: 'center' }}>No tech skills required. Just show up.</p>
        </div>
      </section>

      {/* WHAT YOU'LL COVER */}
      <section style={{ paddingTop: 0 }}>
        <div className="container">
          <div className="cover-card">
            <div className="cover-label">What You&apos;ll Learn</div>
            <h2>The AI skills every mother needs — taught through the stuff you actually deal with. And then we help you build Aime — your AI Chief Everything Officer™.</h2>
            {covers.map((c, i) => (
              <div className="cover-item" key={i}><span>{c}</span></div>
            ))}
          </div>
          <div style={{ textAlign: 'center', marginTop: 24 }}>
            <Link href="/curriculum" style={{ color: 'var(--pink)', fontSize: 13, fontWeight: 600, textDecoration: 'none' }}>See the full curriculum →</Link>
          </div>
        </div>
      </section>

      {/* SOUND FAMILIAR */}
      <section className="familiar-section centered">
        <div className="container">
          <h2>Sound familiar?</h2>
          <p className="familiar-sub">
            Every week there&apos;s a new AI tool. You hear about it, skim the thread, move on.<br /><br />
            <strong>Meanwhile the invisible load keeps growing.</strong>
          </p>
          <div className="pain-card"><h3>You&apos;ve tried AI but it felt... meh</h3><p>You typed a question, got a generic answer, and thought &ldquo;that&apos;s it?&rdquo; That&apos;s because nobody showed you what it can actually do.</p></div>
          <div className="pain-card"><h3>The tutorials don&apos;t match your life</h3><p>Every AI course is for developers or marketers. None of them know what it&apos;s like to meal plan for a picky eater while answering school emails at a red light.</p></div>
          <div className="pain-card"><h3>You&apos;re drowning in decisions nobody sees</h3><p>300+ household decisions a week. Doctor appointments, birthday gifts, what&apos;s for dinner, who&apos;s picking up who. Your brain never stops.</p></div>
          <div className="pain-card"><h3>&ldquo;Having it all&rdquo; turned into doing it all</h3><p>You entered the workforce. The invisible work didn&apos;t get redistributed. It got added. You don&apos;t need more hustle — you need a team. AI can be that team.</p></div>
        </div>
      </section>

      {/* WHAT CHANGES */}
      <section className="changes-section centered">
        <div className="container">
          <h2>What changes after this course</h2>
          <p className="changes-sub">You&apos;ll know what AI tools exist, what they&apos;re each good for, and how to use them for the real stuff — at home and at work.</p>
          <div className="benefit-card"><h3>Hands-on, not lecture</h3><p>Every module has real demos with copy-paste prompts. You open the app, try it, see the result. Not theory — practice.</p></div>
          <div className="benefit-card"><h3>Built for your actual life</h3><p>Meal planning. School chaos. Hard parenting decisions. Morning routines. Plus you&apos;ll build Aime — your own AI family management team that actually knows your life.</p></div>
          <div className="benefit-card"><h3>Your whole life, not just work</h3><p>From meal planning to family scheduling to managing the invisible work no one sees — plus AI at work for emails, research, and presentations.</p></div>
          <div className="benefit-card"><h3>Taught by someone who lives it</h3><p>Taught by a mom of two with 20 years of marketing leadership — from LVMH to CMO of luxury and lifestyle brands — turned AI systems architect and organizational neuroscience specialist. She built this because she needed it.</p></div>
        </div>
      </section>

      {/* MEET AIME */}
      <section style={{ padding: '60px 24px', background: 'var(--navy)', textAlign: 'center', color: '#fff' }}>
        <div className="container" style={{ maxWidth: 700 }}>
          <p style={{ textTransform: 'uppercase', letterSpacing: '0.25em', fontSize: 11, color: '#ff63d8', fontWeight: 700, marginBottom: 10 }}>THE AI YOU&apos;LL BUILD</p>
          <h2 style={{ fontFamily: 'Outfit,sans-serif', textTransform: 'uppercase', letterSpacing: '0.02em', marginBottom: 16, fontSize: 'clamp(1.6em,4vw,2.2em)' }}>Meet Aime</h2>
          <p style={{ fontSize: 15, color: 'rgba(255,255,255,0.6)', lineHeight: 1.8, marginBottom: 32 }}>
            Aime (AI + me, pronounced &ldquo;Amy&rdquo;) is the custom AI assistant you build in this program. She knows your family inside and out — your schedules, preferences, routines, and priorities — and she handles everything from meal planning to birthday parties. Think of her as your wisest, most organized self, powered by AI.
          </p>
          <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap', marginBottom: 24 }}>
            <div style={{ background: 'rgba(255,99,216,0.15)', border: '1px solid rgba(255,99,216,0.3)', borderRadius: 12, padding: '16px 28px', minWidth: 180, textAlign: 'center' }}>
              <div style={{ fontWeight: 700, fontSize: 16, marginBottom: 4 }}>Aime</div>
              <div style={{ fontSize: 12, color: '#ff63d8' }}>Your AI Chief Everything Officer™</div>
            </div>
            <div style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 12, padding: '16px 20px', textAlign: 'center', fontSize: 13, color: 'rgba(255,255,255,0.6)', maxWidth: 400 }}>
              Aime knows your family, your schedule, your preferences, and your chaos. She handles meal planning, travel, events, scheduling, and everything in between.
            </div>
          </div>
          <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.35)' }}>Plus you&apos;ll learn to build Claude Projects for any area of your life for whatever your family needs.</p>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="how-section centered">
        <div className="container">
          <h2>How it works</h2>
          <p className="how-sub">Short video lessons. Watch on your schedule. That&apos;s it.</p>
          <Link href="/foundations-register" className="cta-btn" style={{ marginBottom: 48 }}>Register Now →</Link>
          <div className="step"><div className="step-num">1</div><h3>Enroll &amp; Start Immediately</h3><p>Get instant access to all 6 modules. Watch on your couch, during nap time, or after bedtime.</p></div>
          <div className="step"><div className="step-num">2</div><h3>Follow along with real demos</h3><p>Every lesson has copy-paste prompts. Open Claude and try it right there. 5-10 minutes each.</p></div>
          <div className="step"><div className="step-num">3</div><h3>Walk away actually using AI</h3><p>By the end, AI isn&apos;t a thing you&apos;ve &ldquo;heard about.&rdquo; It&apos;s a tool you use daily — like your phone.</p></div>
        </div>
      </section>

      {/* INSTRUCTOR */}
      <section className="instructor-section">
        <div className="container">
          <p style={{ textTransform: 'uppercase', letterSpacing: '0.25em', fontSize: 11, color: '#ff63d8', fontWeight: 700, marginBottom: 10, textAlign: 'left' }}>COURSE INSTRUCTOR</p>
          <h2 style={{ textAlign: 'left', textTransform: 'uppercase', letterSpacing: '0.02em', marginBottom: 36, color: '#fff' }}>Taught By Someone Who Lives It</h2>
          <div style={{ display: 'flex', gap: 32, alignItems: 'flex-start', flexWrap: 'wrap' }}>
            <div style={{ flex: '0 0 200px' }}>
              <Image src="/raquel.png" alt="Raquel Cadourcy" width={180} height={180} style={{ borderRadius: '50%', width: 180, height: 180, objectFit: 'cover', objectPosition: 'center top', display: 'block', background: '#1a2340' }} />
              <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: 12, fontWeight: 600, marginTop: 12 }}>Raquel Cadourcy</p>
              <p style={{ color: 'rgba(255,255,255,0.3)', fontSize: 11 }}>Founder &amp; CEO, ai moms™</p>
            </div>
            <div style={{ flex: 1, minWidth: 280 }}>
              <p style={{ color: 'rgba(255,255,255,0.7)', lineHeight: 1.8, fontSize: '0.95em', margin: 0 }}>
                A mom of two with 20+ years of marketing leadership — from LVMH to CMO of luxury and lifestyle brands. AI systems architect and organizational neuroscience specialist. Built ai moms™ because she needed it first.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* WHAT'S INCLUDED */}
      <section className="included-section" id="enroll">
        <div className="container">
          <h2 style={{ textAlign: 'center', textTransform: 'uppercase', letterSpacing: '0.02em', marginBottom: 36 }}>What&apos;s Included</h2>
          <div className="included-grid">
            <div><h3>6 On-Demand Modules</h3><p>44 video lessons you watch on your own time. From AI foundations to life demos to building your own AI family management team.</p></div>
            <div><h3>Copy-Paste Prompt Library</h3><p>Every demo includes ready-to-use prompts. Copy, paste, customize. Meal plans, school triage, conversation prep, budgets, and more.</p></div>
            <div><h3>Real-World AI Mastery</h3><p>Master Claude, use powerful prompting, learn powerful prompting techniques, and connect Aime to your email and calendar.</p></div>
            <div><h3>Weekly Live Office Hours</h3><p>Drop in for one-on-one support, questions, and personalized guidance. Pick a time that works for you.</p></div>
            <div><h3>ai moms™ Community</h3><p>Private WhatsApp community of moms learning AI together. Share wins, ask questions, stay motivated.</p></div>
            <div><h3>60-Day Access</h3><p>Go at your own pace. Rewatch anything. Come back when you need a refresher.</p></div>
          </div>

          <div className="price-box">
            <div style={{ fontFamily: "'Be Vietnam Pro',sans-serif", fontSize: 12, fontWeight: 600, letterSpacing: '0.25em', textTransform: 'uppercase', color: '#ff63d8', marginBottom: 8 }}>FOUNDING MEMBER PRICING</div>
            <div style={{ fontFamily: "'Outfit',sans-serif", fontWeight: 900, fontSize: '2.8em', color: '#fff', marginBottom: 4, letterSpacing: '-0.02em' }}>${PRICES.foundations}</div>
            <div style={{ color: 'rgba(255,255,255,0.35)', fontSize: '0.85em', marginBottom: 24, textDecoration: 'line-through' }}>${PRICES.foundationsStandard} standard pricing</div>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 12, margin: '0 auto', maxWidth: 440 }}>
              <Link href="/foundations-register" className="cta-btn" style={{ textAlign: 'center', display: 'block', width: '100%' }}>Register Now — Pay in Full (${PRICES.foundations})</Link>
              <Link href="/foundations-register?plan=split" className="cta-btn" style={{ textAlign: 'center', display: 'block', width: '100%' }}>Register Now — 2 Monthly Payments (${PRICES.foundationsTwoPay})</Link>
            </div>
            <p style={{ textAlign: 'center', fontSize: 12, color: 'rgba(255,255,255,0.35)', marginTop: 22 }}>7-day money-back guarantee. Instant access after payment.</p>
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="testimonials-section" style={{ padding: '60px 24px' }}>
        <div className="container" style={{ maxWidth: 900 }}>
          <h2 style={{ textAlign: 'center', textTransform: 'uppercase', letterSpacing: '0.02em', marginBottom: 36 }}>Hear From Members</h2>
          <div className="testimonials-grid">
            <div className="tcard"><p>&ldquo;WOW! I had no idea how much I can and should be using AI to help save me so much time — you made it so easy to understand and get started! It&apos;s really life-changing.&rdquo;</p><div className="tname">Isabelle D.</div><div className="trole">ai moms™ Member</div></div>
            <div className="tcard"><p>&ldquo;No stupid questions vibes. Doing it alongside other moms made such a difference. I loved the way Raquel walked us through everything step by step — super easy and doable.&rdquo;</p><div className="tname">Lauren B.</div><div className="trole">ai moms™ Member</div></div>
            <div className="tcard"><p>&ldquo;Such a rich and encouraging experience. I&apos;m super excited to start automating, already feeling such a huge sense of accomplishment.&rdquo;</p><div className="tname">Greta P.</div><div className="trole">ai moms™ Member</div></div>
          </div>
          <div className="testimonials-grid autofit">
            <div className="tcard"><p>&ldquo;I loved the format. Your passion is intoxicating — you literally light up when you talk about it. Also the community aspect and the fact that it&apos;s only for us women... Extra points.&rdquo;</p><div className="tname">Isabelle D.</div><div className="trole">ai moms™ Member</div></div>
            <div className="tcard"><p>&ldquo;So worth it! It helped me better understand the power of AI in my day-to-day, how to use it smarter, and how to really leverage it.&rdquo;</p><div className="tname">Charlotte P.</div><div className="trole">ai moms™ Member</div></div>
            <div className="tcard"><p>&ldquo;THANK YOU for the ai.moms™ course! I have been feeling behind when it came to using AI in my personal life and this just made it all click! Aime has already been such a huge help and I&apos;m uncovering even more ways to use AI to just get through the day faster. It feels like a whole new world just opened up. Seriously why didn&apos;t I do this sooner!&rdquo;</p><div className="tname">Lauren B.</div><div className="trole">ai moms™ Member</div></div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="faq-section">
        <div className="container centered"><h2>Common questions</h2></div>
        <div className="container">
          <details className="faq-item"><summary>I&apos;m not technical. Can I actually do this?</summary><div className="faq-answer">Yes. We walk you through every single click. If you can use email and a web browser, you can do this. We designed this for busy moms, not engineers.</div></details>
          <details className="faq-item"><summary>How is this different from just asking AI questions on my own?</summary><div className="faq-answer">Most people use AI like a search engine — ask a question, get a generic answer. We teach you to build Aime, a custom AI assistant that knows YOUR family, YOUR preferences, and YOUR schedule. It&apos;s the difference between a blank doc and a complete system built around your life.</div></details>
          <details className="faq-item"><summary>How long does it take?</summary><div className="faq-answer">Each lesson is 5-10 minutes. You can finish the whole course in a week or spread it over a month. Watch whenever works for you — nap time, after bedtime, lunch break.</div></details>
          <details className="faq-item"><summary>Is this just another productivity hack?</summary><div className="faq-answer">No. You&apos;re learning a complete AI skill set — effective prompting, custom AI assistants, and real automated systems for your household and work. This is infrastructure, not tips.</div></details>
          <details className="faq-item"><summary>Is my family&apos;s information safe?</summary><div className="faq-answer">Yes. We teach you privacy best practices and how to use AI platforms safely. Your family data stays private and secure.</div></details>
          <details className="faq-item"><summary>Can my partner join too?</summary><div className="faq-answer">The program is designed for the primary household manager (usually mom), but you&apos;re welcome to share access with your partner. The skills benefit the whole family.</div></details>
          <details className="faq-item"><summary>What are the payment options?</summary><div className="faq-answer">Founding member pricing is $247 (standard $497). This includes all modules, prompt library, live office hours, community access, and 60-day access.</div></details>
        </div>
      </section>

      {/* QUIZ CTA */}
      <section style={{ padding: '80px 24px', background: 'var(--off-white)', textAlign: 'center' }}>
        <div className="container" style={{ maxWidth: 540 }}>
          <div style={{ fontFamily: "'Be Vietnam Pro',sans-serif", fontWeight: 600, fontSize: 10, color: 'var(--pink)', textTransform: 'uppercase', letterSpacing: '0.3em', marginBottom: 16 }}>WHAT&apos;S YOUR SCORE?</div>
          <h2 style={{ fontFamily: "'Outfit',sans-serif", fontWeight: 900, fontSize: 'clamp(1.5em,4vw,2.2em)', lineHeight: 1.1, marginBottom: 14, letterSpacing: '-0.02em', color: 'var(--navy)' }}>What&apos;s Your Invisible Load Score?</h2>
          <p style={{ fontSize: 14, color: 'var(--gray-600)', maxWidth: 400, margin: '0 auto 28px', lineHeight: 1.7 }}>8 quick questions. 2 minutes. Find out how much you&apos;re carrying — and what to do about it.</p>
          <TrackedLink href="/quiz" target="_blank" rel="noopener noreferrer" event="ViewContent" params={{ content_name: 'Quiz Click' }} className="cta-btn">Take the Free Quiz →</TrackedLink>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="final-cta centered">
        <div className="container">
          <h2>Ready to retire from Chief Everything Officer™?</h2>
          <p className="final-sub">6 modules. 44 video lessons. 50+ ready-to-use prompts. Your actual life. Start today.</p>
          <div style={{ textAlign: 'center' }}><Link href="/foundations-register" className="cta-btn" style={{ padding: '16px 60px' }}>Register Now →</Link></div>
          <p className="final-note">No tech skills required. Just show up.</p>
        </div>
      </section>

      <FloatingQuizCTA />
      <NewsletterPopup />
    </div>
  );
}
