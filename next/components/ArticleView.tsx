'use client';

import { useState } from 'react';
import Link from 'next/link';
import { STRIPE_LINKS } from '@/lib/commerce';
import type { Article, ArticleBlock } from '@/lib/articles-data';

/** Map a static-site cta href to its migrated clean slug. */
function mapCtaHref(href: string | undefined): string {
  switch (href) {
    case 'index.html': return '/';
    case 'aime.html': return '/foundations'; // aime page removed; the Aime concept lives in the course
    case 'subscribe.html': return '/subscribe';
    case 'toolkit.html': return '/toolkit';
    case undefined: return '/';
    default: return href.startsWith('http') ? href : '/' + href.replace(/\.html$/, '');
  }
}

const CTA_MESSAGES: Record<string, { h: string; p: string }> = {
  course: { h: 'Ready to build the full system?', p: 'The ai.moms™ On-Demand course is 6 modules — go at your own pace, start seeing results immediately.' },
  aime: { h: 'Meet Aime — your AI Chief Everything Officer™.', p: 'Built for mothers, at every stage. Ready when you are.' },
  tool: { h: 'Ready to try it yourself?', p: 'Our ai.moms™ micro-tools do one thing exceptionally well — no setup, no learning curve.' },
  email: { h: 'Join thousands of mothers doing this differently.', p: 'Weekly insights, prompts, and tools — straight to your inbox.' },
};

function PromptBlock({ label, text }: { label: string; text: string }) {
  const [copied, setCopied] = useState(false);
  const copy = () => {
    navigator.clipboard.writeText(text).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };
  return (
    <div className="prompt-box">
      <span className="prompt-label">{label}</span>
      <div className="prompt-text">{text}</div>
      <button className={`copy-btn${copied ? ' copied' : ''}`} onClick={copy}>
        {copied ? 'Copied!' : 'Copy Prompt'}
      </button>
    </div>
  );
}

export default function ArticleView({
  article,
  related,
}: {
  article: Article;
  related: Article[];
}) {
  const [modalOpen, setModalOpen] = useState(false);
  const [step, setStep] = useState<'choose' | 'self' | 'gift'>('choose');

  const openModal = () => { setStep('choose'); setModalOpen(true); };
  const closeModal = () => setModalOpen(false);

  // Self / gift purchase: capture lead, then redirect to Stripe regardless of capture result.
  const redirectAfterCapture = (formName: string, form: HTMLFormElement, stripeUrl: string) => {
    const body = new URLSearchParams(new FormData(form) as unknown as Record<string, string>).toString();
    // TODO(phase4): point at /api/forms/<formName> (Supabase + Resend).
    fetch(`/api/forms/${formName}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body,
    })
      .then(() => { window.location.href = stripeUrl; })
      .catch(() => { window.location.href = stripeUrl; });
  };

  const handleSelfSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    redirectAfterCapture('self-purchase', e.currentTarget, STRIPE_LINKS.foundationsPayInFull);
  };
  const handleGiftSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    redirectAfterCapture('gift-purchase', e.currentTarget, STRIPE_LINKS.courseGift);
  };

  const renderBlock = (block: ArticleBlock, i: number) => {
    switch (block.type) {
      case 'intro':
        return <p key={i} className="article-intro">{block.text}</p>;
      case 'text':
        return <p key={i} className="article-text">{block.text}</p>;
      case 'h2':
        return <h2 key={i} className="article-h2">{block.text}</h2>;
      case 'pullquote':
        return <div key={i} className="pullquote"><p>{block.text}</p></div>;
      case 'image':
        // eslint-disable-next-line @next/next/no-img-element
        return <img key={i} className="article-img" src={block.src} alt={block.alt || ''} loading="lazy" />;
      case 'prompt':
        // NOTE: the live site silently dropped prompt blocks (a switch-statement bug left
        // `case 'prompt'` unreachable). Restored here — these are the articles' core
        // teachable prompts. Flagged for Raquel to confirm before launch.
        return <PromptBlock key={i} label={block.label || 'Try this'} text={block.text || ''} />;
      case 'mothers-day-cta':
        return (
          <div key={i} className="md-cta-inline">
            <h3>The gift she&rsquo;ll actually remember.</h3>
            <p>Not another thing to find a place for. Give her the gift of time back — for herself, for good.</p>
            <div className="md-path-cards">
              <div className="md-path-card" onClick={openModal}>
                <span className="path-emoji">🌸</span>
                <div className="path-title">I&rsquo;m a mom buying this for myself.</div>
                <div className="path-sub">You deserve this.</div>
              </div>
              <div className="md-path-card" onClick={openModal}>
                <span className="path-emoji">🎁</span>
                <div className="path-title">I&rsquo;m gifting this to a mom I love.</div>
                <div className="path-sub">The gift she actually wants.</div>
              </div>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  const cta = article.cta;
  const ctaContent = CTA_MESSAGES[cta.type] || CTA_MESSAGES.course;

  return (
    <>
      {/* HERO IMAGE */}
      <div className="article-hero">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img className="hero-img" src={`/${article.heroImage}`} alt={article.heroAlt} />
      </div>

      <div className="article-wrap">
        <div style={{ paddingTop: 32 }}>
          <Link href="/theaim" className="back-link">The AIM</Link>
        </div>

        <div className="article-meta">
          <span className="article-cat">{article.category}</span>
          <span className="article-dot" />
          <span className="article-read">{article.readTime} read</span>
          <span className="article-dot" />
          <span className="article-read" style={{ color: '#ccc' }}>ai moms&#8482; editorial</span>
        </div>

        <h1 className="article-title">{article.title}</h1>
        <p className="article-subtitle">{article.subtitle}</p>

        <div>{article.body.map(renderBlock)}</div>

        {/* CTA BLOCK */}
        <div className="article-cta">
          {cta.type === 'mothers-day-gift' ? (
            <>
              <h3>Give her the one thing she actually wants.</h3>
              <p>Not another thing to find a place for. The gift of time back — and herself back.</p>
              <button onClick={openModal} className="btn-pink" style={{ fontSize: 13 }}>Give Her Time Back →</button>
            </>
          ) : (
            <>
              <h3>{ctaContent.h}</h3>
              <p>{ctaContent.p}</p>
              <Link href={mapCtaHref(cta.href)} className="btn-pink">{cta.label}</Link>
            </>
          )}
        </div>

        <p className="article-byline">ai moms&#8482; editorial &mdash; The Edit</p>

        {/* RELATED */}
        {related.length > 0 && (
          <div style={{ marginTop: 48 }}>
            <div className="related-label">Keep Reading</div>
            <div className="related-grid">
              {related.map((a) => (
                <Link key={a.id} href={`/article?id=${a.id}`} className="related-card">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={`/${a.heroImage}`} alt={a.heroAlt} loading="lazy" />
                  <div className="related-card-body">
                    <span className="related-cat">{a.category}</span>
                    <div className="related-title">{a.title}</div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* GIFT MODAL */}
      <div className={`modal-overlay${modalOpen ? ' open' : ''}`} onClick={(e) => { if (e.target === e.currentTarget) closeModal(); }}>
        <div className="modal-box">
          <button className="modal-close" onClick={closeModal}>✕</button>

          {step === 'choose' && (
            <div className="modal-step active">
              <div className="modal-title">Who is this for?</div>
              <div className="modal-sub">The gift that actually gives her something back.</div>
              <div className="modal-paths">
                <div className="md-path-card" onClick={() => setStep('self')}>
                  <span className="path-emoji">🌸</span>
                  <div className="path-title">I&rsquo;m a mom, and I deserve this.</div>
                  <div className="path-sub">Buying for myself — finally.</div>
                </div>
                <div className="md-path-card" onClick={() => setStep('gift')}>
                  <span className="path-emoji">🎁</span>
                  <div className="path-title">I&rsquo;m gifting this to a mom I love.</div>
                  <div className="path-sub">The gift she actually wants.</div>
                </div>
              </div>
            </div>
          )}

          {step === 'self' && (
            <div className="modal-step active">
              <div className="modal-title">You deserve this. 🌸</div>
              <div className="modal-sub">Quick details so we can personalize your experience — then straight to checkout.</div>
              <form name="self-purchase" className="gift-form" onSubmit={handleSelfSubmit}>
                <input type="hidden" name="form-name" value="self-purchase" />
                <input type="hidden" name="purchase-type" value="self" />
                <p className="hp-field"><input name="bot-field" tabIndex={-1} autoComplete="off" /></p>
                <label className="form-label">Your first name</label>
                <input type="text" name="name" placeholder="Your name" required />
                <label className="form-label">Your email</label>
                <input type="email" name="email" placeholder="you@email.com" required />
                <button type="submit" className="gift-submit">Take Me to Checkout →</button>
              </form>
              <p className="modal-note">You&rsquo;ll go straight to secure checkout. No spam — we&rsquo;ll only send you course access and resources.</p>
            </div>
          )}

          {step === 'gift' && (
            <div className="modal-step active">
              <div className="modal-title">What a beautiful gift. 🎁</div>
              <div className="modal-sub">Tell us a little about who you&rsquo;re gifting — we&rsquo;ll make sure she feels seen from the moment she opens it.</div>
              <form name="gift-purchase" className="gift-form" onSubmit={handleGiftSubmit}>
                <input type="hidden" name="form-name" value="gift-purchase" />
                <input type="hidden" name="purchase-type" value="gift" />
                <p className="hp-field"><input name="bot-field" tabIndex={-1} autoComplete="off" /></p>
                <label className="form-label">Her name (the mom you&rsquo;re gifting)</label>
                <input type="text" name="recipient-name" placeholder="Her first name" required />
                <label className="form-label">Your name</label>
                <input type="text" name="gifter-name" placeholder="Your name" required />
                <label className="form-label">Your email (we&rsquo;ll send the gift details here)</label>
                <input type="email" name="email" placeholder="you@email.com" required />
                <button type="submit" className="gift-submit">Take Me to Checkout →</button>
              </form>
              <p className="modal-note">Secure checkout. We&rsquo;ll send you a gift confirmation to forward to her.</p>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
