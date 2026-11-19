'use client';

import { useEffect, useState } from 'react';

/**
 * Timed/scroll-triggered newsletter modal, shown once per visitor (localStorage
 * 'aimoms_newsletter'). Mirrors the static site's popup.
 * TODO(phase4): wire the form to the /api/forms newsletter route (Supabase + Resend).
 */
export default function NewsletterPopup() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (localStorage.getItem('aimoms_newsletter')) return;
    let shown = false;
    const show = () => {
      if (shown) return;
      shown = true;
      setOpen(true);
    };
    const timer = setTimeout(show, 6000);
    const onScroll = () => {
      const ratio = window.scrollY / (document.body.scrollHeight - window.innerHeight);
      if (ratio > 0.3) show();
    };
    window.addEventListener('scroll', onScroll);
    return () => {
      clearTimeout(timer);
      window.removeEventListener('scroll', onScroll);
    };
  }, []);

  const close = () => {
    localStorage.setItem('aimoms_newsletter', 'closed');
    setOpen(false);
  };

  if (!open) return null;

  return (
    <div
      onClick={close}
      style={{
        position: 'fixed',
        inset: 0,
        background: 'rgba(6,13,38,0.65)',
        zIndex: 9999,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backdropFilter: 'blur(4px)',
      }}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          background: '#fff',
          borderRadius: 16,
          padding: '40px 32px',
          maxWidth: 420,
          width: '90%',
          textAlign: 'center',
          position: 'relative',
          boxShadow: '0 20px 60px rgba(0,0,0,0.3)',
        }}
      >
        <button
          type="button"
          onClick={close}
          aria-label="Close"
          style={{
            position: 'absolute',
            top: 12,
            right: 16,
            background: 'none',
            border: 'none',
            fontSize: 20,
            color: '#999',
            cursor: 'pointer',
          }}
        >
          &times;
        </button>
        <div style={{ fontWeight: 800, fontSize: 18, letterSpacing: '-0.04em', marginBottom: 14 }}>
          <span style={{ color: '#ff63d8', fontFamily: "'Playfair Display',Georgia,serif", fontStyle: 'italic', fontWeight: 900 }}>ai.</span>
          <span style={{ color: '#060d26' }}>moms</span>
          <span style={{ fontSize: 6, verticalAlign: 'super', opacity: 0.4 }}>&#8482;</span>
        </div>
        <h3 style={{ fontFamily: "'Outfit',sans-serif", fontSize: 22, fontWeight: 800, color: '#060d26', marginBottom: 8, lineHeight: 1.2 }}>
          The Smartest AI Content for Moms. Every Friday.
        </h3>
        <p style={{ fontSize: 13, color: '#999', marginBottom: 20 }}>
          One email. Zero fluff. Join 1,000+ mothers already getting smarter with AI.
        </p>
        <form
          name="newsletter"
          onSubmit={(e) => {
            e.preventDefault();
            // TODO(phase4): POST to /api/forms (Supabase + Resend), then show success.
          }}
          style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}
        >
          <input
            type="text"
            name="name"
            required
            placeholder="First name"
            style={{ flex: 1, minWidth: 100, padding: '12px 16px', borderRadius: 100, border: '1.5px solid #E2E2DF', fontSize: 14, outline: 'none' }}
          />
          <input
            type="email"
            name="email"
            required
            placeholder="your@email.com"
            style={{ flex: 1, padding: '12px 16px', borderRadius: 100, border: '1.5px solid #E2E2DF', fontSize: 14, outline: 'none' }}
          />
          <button
            type="submit"
            style={{ background: '#ff63d8', color: '#fff', border: 'none', padding: '12px 22px', borderRadius: 100, fontSize: 13, fontWeight: 600, cursor: 'pointer', whiteSpace: 'nowrap' }}
          >
            Subscribe
          </button>
        </form>
      </div>
    </div>
  );
}
