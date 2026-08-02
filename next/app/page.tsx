import type { Metadata } from 'next';
import Link from 'next/link';
import TrackedLink from '@/components/TrackedLink';
import './home.css';

export const metadata: Metadata = {
  alternates: { canonical: '/' },
};

export default function Home() {
  return (
    <div className="page-home">
      {/* HERO */}
      <section className="hero">
        <div className="container-sm">
          <div className="hero-eyebrow">
            <span className="dot" /> Built by moms, for moms.
          </div>
          <h1>
            Your entry into AI.
            <br />
            <span className="italic-accent">For moms.</span>
          </h1>
          <p className="hero-sub">
            The #1 destination for moms to learn AI &mdash; so she can get her time back and
            learn to build her dreams.
          </p>
          <div className="hero-cta-row">
            <TrackedLink
              href="/foundations-register"
              event="ViewContent"
              params={{ content_name: 'Foundations - Hero CTA from Homepage' }}
              className="cta-pink cta-large"
            >
              Register for the Course &rarr;
            </TrackedLink>
            <Link href="/membership" className="cta-ghost">
              Join the Membership &rarr;
            </Link>
          </div>
          <p className="hero-note">
            Foundations course: founding member pricing &middot; <strong>$247</strong> &middot;
            instant access
          </p>
        </div>
      </section>

      {/* THREE MOMS */}
      <section className="editorial-section">
        <div className="container">
          <div className="section-eyebrow centered">Who We Serve</div>
          <h2 className="section-title centered">Three moms. One mission.</h2>
          <p className="section-sub centered">
            Different lives. Different reasons for being here. Same load.
          </p>

          <div className="trio-grid">
            <div className="trio-card">
              <div className="num">01</div>
              <h3>The Mom at Home</h3>
              <p>
                She&rsquo;s drowning in the invisible load &mdash; the calendars, the meals, the
                school forms, the birthdays. She&rsquo;s here to put AI to work on the mental load
                no one else sees.
              </p>
            </div>
            <div className="trio-card dark">
              <div className="num">02</div>
              <h3>The Mom at Work</h3>
              <p>
                She doesn&rsquo;t have hours to play with the new tools. Her colleagues without
                kids do. She&rsquo;s here to stay in the room &mdash; and not get left behind.
              </p>
            </div>
            <div className="trio-card">
              <div className="num">03</div>
              <h3>The Mompreneur</h3>
              <p>
                She&rsquo;s building something &mdash; a side project, a service, a real company.
                AI is the leverage that makes it possible alongside everything else.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* OUR MISSION + THREE PILLARS */}
      <section className="editorial-section on-navy">
        <div className="container">
          <div className="section-eyebrow centered">Our Mission</div>
          <h2
            className="section-title centered"
            style={{ fontSize: 'clamp(1.7em,4vw,2.8em)', maxWidth: 840, margin: '0 auto 50px' }}
          >
            To retire moms around the globe from{' '}
            <span style={{ whiteSpace: 'nowrap' }}>
              Chief Everything Officer<span className="tm">&#8482;.</span>
            </span>
          </h2>

          <div className="trio-grid">
            <div className="trio-card">
              <div className="num">01</div>
              <h3>The Education</h3>
              <p>
                Real foundation, not just tips and tricks. Skills that go beyond the household
                &mdash; and into the future.
              </p>
            </div>
            <div className="trio-card dark">
              <div className="num">02</div>
              <h3>The Solution</h3>
              <p>
                Aime, your AI Chief Everything Officer<span className="tm">&#8482;</span> &mdash;
                plus the <strong style={{ color: '#fff' }}>tools, prompts, and skills</strong> that
                turn her into a truly agentic partner who carries the load with you.
              </p>
            </div>
            <div className="trio-card">
              <div className="num">03</div>
              <h3>The Community</h3>
              <p>
                You are not alone. The invisible load thrives in isolation. Community starves it.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* WAYS TO ACTIVATE */}
      <section className="ways-section" id="ways">
        <div className="ways-head">
          <div className="section-eyebrow centered">Ways To Work With Us</div>
          <h2 className="section-title centered">Eight ways to learn AI with us.</h2>
          <p className="section-sub centered">
            Pick the entry point that fits where you are right now. None requires the others.
          </p>
        </div>

        <div className="ways-grid">
          <Link href="/foundations" className="way-card featured">
            <div className="way-tag">01 &middot; On-demand</div>
            <h3>
              AI for Moms
              <br />
              Foundations Course
            </h3>
            <p>
              6 modules. 44 bite-size lessons. 50+ ready-to-use prompts. Watch on your couch,
              during nap time, or after bedtime. Walk away actually using AI.
            </p>
            <div className="way-link">Register Now &rarr;</div>
          </Link>

          <Link href="/workshop" className="way-card">
            <div className="way-tag">02 &middot; Live &middot; $68</div>
            <h3>Monthly Virtual Workshop</h3>
            <p>
              A 60-minute live intro to AI for moms. Hands-on walk-through, real prompts, your
              questions answered. Held once a month over Zoom. The easiest way to start.
            </p>
            <div className="way-link">Reserve your seat &rarr;</div>
          </Link>

          <Link href="/membership" className="way-card">
            <div className="way-tag">03 &middot; Ongoing</div>
            <h3>The Membership</h3>
            <p>
              $59/month. Bi-weekly live sessions on Zoom + private WhatsApp community +{' '}
              <strong>free access to every ai.moms&#8482; in-person event.</strong> Cancel anytime.
            </p>
            <div className="way-link">Join the Membership &rarr;</div>
          </Link>

          <a href="https://rsvp.aimoms.ai" target="_blank" rel="noopener noreferrer" className="way-card">
            <div className="way-tag">04 &middot; In-person</div>
            <h3>
              Mom-Hosted
              <br />
              Experiences
            </h3>
            <p>
              Intimate, in-home gatherings where moms learn AI together in a supportive setting.
              Hosted by moms, in real life.
            </p>
            <div className="way-link">RSVP or host your own &rarr;</div>
          </a>

          <Link href="/corporate" className="way-card">
            <div className="way-tag">05 &middot; For companies</div>
            <h3>Corporate Programs</h3>
            <p>
              Custom AI training for companies committed to investing in the mothers on their
              teams. Workshops, keynotes, and full programs.
            </p>
            <div className="way-link">For your company &rarr;</div>
          </Link>

          <Link href="/out-of-office-waitlist" className="way-card">
            <div className="way-tag">06 &middot; Immersive</div>
            <h3>
              Out of Office
              <br />
              Weekends<span className="tm">&#8482;</span>
            </h3>
            <p>
              Destination weekends to learn AI and rediscover the version of you before you became
              a mom. Launching 2026.
            </p>
            <div className="way-link">Join the waitlist &rarr;</div>
          </Link>

          <a
            href="mailto:hello@aimoms.ai?subject=Private%201%3A1%20Coaching%20Inquiry&body=Hi%20ai.moms%20team%2C%0A%0AI%27d%20love%20to%20learn%20more%20about%20private%201%3A1%20AI%20coaching.%20A%20bit%20about%20me%3A%0A%0A"
            className="way-card"
          >
            <div className="way-tag">07 &middot; One-on-one</div>
            <h3>Private 1:1 Coaching</h3>
            <p>
              Dedicated, personalized AI coaching tailored to your specific life, work, or
              business. The most direct path to building your own system.
            </p>
            <div className="way-link">Email us to inquire &rarr;</div>
          </a>

          <Link href="/subscribe" className="way-card">
            <div className="way-tag">08 &middot; Free</div>
            <h3>The Newsletter</h3>
            <p>
              Our weekly newsletter on AI for moms. Tools we love, prompts that work, and stories
              from the community. Free.
            </p>
            <div className="way-link">Join the list &rarr;</div>
          </Link>
        </div>
      </section>

      {/* SOCIAL PROOF */}
      <section className="proof on-navy">
        <div className="proof-head">
          <h2 className="section-title centered">Real moms. Real results.</h2>
        </div>

        <div className="proof-grid">
          <div className="proof-card">
            <p>
              &ldquo;I found the session extremely helpful. Using the skills I learned, I created a
              summer learning program for my Kindergartener that is engaging and highly customized
              to his love of soldiers and Legos &mdash; in literally 60 seconds.&rdquo;
            </p>
            <div className="proof-author">Colleen Lee</div>
            <div className="proof-role">ai.moms&#8482; Member</div>
          </div>
          <div className="proof-card">
            <p>
              &ldquo;I just wanted to share I&rsquo;ve been going through the ai.moms Foundations
              Course. WOW. It&rsquo;s so incredible!!!! I still have a lot to go but I am beyond
              impressed and love it, I can&rsquo;t wait to keep going with it! 💕&rdquo;
            </p>
            <div className="proof-author">Sara Joy</div>
            <div className="proof-role">ai.moms&#8482; Member</div>
          </div>
          <div className="proof-card">
            <p>
              &ldquo;WOW! I had no idea how much I can and should be using AI to help save me so
              much time &mdash; you made it so easy to understand and get started! It&rsquo;s really
              life-changing.&rdquo;
            </p>
            <div className="proof-author">Isabelle D.</div>
            <div className="proof-role">ai.moms&#8482; Member</div>
          </div>
          <div className="proof-card">
            <p>
              &ldquo;No stupid questions vibes. Doing it alongside other moms made such a
              difference. Raquel walked us through everything step by step &mdash; super easy and
              doable.&rdquo;
            </p>
            <div className="proof-author">Lauren B.</div>
            <div className="proof-role">ai.moms&#8482; Member</div>
          </div>
          <div className="proof-card">
            <p>
              &ldquo;Such a rich and encouraging experience. I&rsquo;m super excited to start
              automating, already feeling such a huge sense of accomplishment.&rdquo;
            </p>
            <div className="proof-author">Greta P.</div>
            <div className="proof-role">ai.moms&#8482; Member</div>
          </div>
          <div className="proof-card">
            <p>
              &ldquo;I loved the format. Your passion is intoxicating &mdash; you literally light up
              when you talk about it. Also the community aspect and the fact that it&rsquo;s only
              for us women&hellip; extra points.&rdquo;
            </p>
            <div className="proof-author">Isabelle D.</div>
            <div className="proof-role">ai.moms&#8482; Member</div>
          </div>
          <div className="proof-card">
            <p>
              &ldquo;So worth it! It helped me better understand the power of AI in my day-to-day,
              how to use it smarter, and how to really leverage it.&rdquo;
            </p>
            <div className="proof-author">Charlotte P.</div>
            <div className="proof-role">ai.moms&#8482; Member</div>
          </div>
          <div className="proof-card">
            <p>
              &ldquo;THANK YOU for the ai.moms<span className="tm">&#8482;</span> course! I&rsquo;ve
              been feeling behind when it came to using AI in my personal life and this just made it
              all click! Aime has already been such a huge help. It feels like a whole new world
              just opened up. Seriously why didn&rsquo;t I do this sooner!&rdquo;
            </p>
            <div className="proof-author">Lauren B.</div>
            <div className="proof-role">ai.moms&#8482; Member</div>
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="final-cta">
        <div className="container-sm">
          <h2>
            Ready to retire from{' '}
            <span style={{ whiteSpace: 'nowrap' }}>
              Chief Everything Officer<span className="tm">&#8482;</span>?
            </span>
          </h2>
          <p>
            Start with the Foundations Course. Six modules, self-paced, instant access &mdash; the
            most direct way to learn AI for moms and start building from day one.
          </p>
          <TrackedLink
            href="/foundations"
            event="ViewContent"
            params={{ content_name: 'Foundations - Final CTA from Homepage', value: 247, currency: 'USD' }}
            className="cta-pink cta-large"
          >
            Register for the course &rarr;
          </TrackedLink>
          <p className="final-cta-note">
            $247 founding-member pricing &middot; instant access &middot; yours for 60 days.
          </p>
        </div>
      </section>
    </div>
  );
}
