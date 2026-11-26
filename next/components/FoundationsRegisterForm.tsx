'use client';

import { useEffect, useRef, useState } from 'react';
import { STRIPE_LINKS, PRICES } from '@/lib/commerce';
import HeardAboutField from './HeardAboutField';
import { trackFbq } from './TrackedLink';

function formatPhone(value: string): string {
  const digits = value.replace(/\D/g, '').substring(0, 10);
  if (digits.length === 0) return '';
  if (digits.length < 4) return '(' + digits;
  if (digits.length < 7) return '(' + digits.substring(0, 3) + ') ' + digits.substring(3);
  return '(' + digits.substring(0, 3) + ') ' + digits.substring(3, 6) + '-' + digits.substring(6);
}

export default function FoundationsRegisterForm() {
  const formRef = useRef<HTMLFormElement>(null);
  const [phone, setPhone] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [isSplit, setIsSplit] = useState(false);

  useEffect(() => {
    // Intentional on-mount client read of the URL query (browser-only).
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setIsSplit(new URLSearchParams(window.location.search).get('plan') === 'split');
  }, []);

  const stripeUrl = isSplit ? STRIPE_LINKS.foundationsTwoPay : STRIPE_LINKS.foundationsPayInFull;

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = formRef.current;
    if (!form) return;
    if (!form.checkValidity()) {
      form.reportValidity();
      return;
    }
    setSubmitting(true);

    let done = false;
    const go = () => {
      if (done) return;
      done = true;
      const email = (form.elements.namedItem('email') as HTMLInputElement | null)?.value || '';
      let redirectUrl = stripeUrl;
      if (email) {
        redirectUrl += (stripeUrl.indexOf('?') > -1 ? '&' : '?') + 'prefilled_email=' + encodeURIComponent(email);
      }
      trackFbq('InitiateCheckout', {
        content_name: 'Foundations - Form Complete',
        value: PRICES.foundations,
        currency: 'USD',
      });
      window.location.href = redirectUrl;
    };

    // Safety net: redirect even if capture is slow/unavailable.
    setTimeout(go, 2500);

    // TODO(phase4): point this at the real /api/forms route (Supabase + Resend).
    const body = new URLSearchParams(new FormData(form) as unknown as Record<string, string>).toString();
    fetch('/api/forms/foundations-signup', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body,
    })
      .then(go)
      .catch(go);
  };

  return (
    <form ref={formRef} name="foundations-signup" onSubmit={handleSubmit} noValidate>
      <input type="hidden" name="form-name" value="foundations-signup" />
      <input type="hidden" name="plan" value={isSplit ? 'split' : 'full'} />

      <p className="hp-field">
        <label>
          Don&apos;t fill this out if you&apos;re human:{' '}
          <input name="bot-field" tabIndex={-1} autoComplete="off" />
        </label>
      </p>

      <div className="form-intro">Tell us about you</div>

      <div className="field-row">
        <div className="field">
          <label className="field-label" htmlFor="first_name">First name</label>
          <input type="text" id="first_name" name="first_name" required autoComplete="given-name" />
        </div>
        <div className="field">
          <label className="field-label" htmlFor="last_name">Last name</label>
          <input type="text" id="last_name" name="last_name" required autoComplete="family-name" />
        </div>
      </div>

      <div className="field">
        <label className="field-label" htmlFor="email">Email</label>
        <input type="email" id="email" name="email" required autoComplete="email" />
      </div>

      <div className="field">
        <label className="field-label" htmlFor="phone">Phone</label>
        <input
          type="tel"
          id="phone"
          name="phone"
          required
          autoComplete="tel"
          maxLength={14}
          inputMode="numeric"
          value={phone}
          onChange={(e) => setPhone(formatPhone(e.target.value))}
          onFocus={(e) => { if (e.target.value === '') setPhone('('); }}
          onBlur={(e) => { if (e.target.value === '(') setPhone(''); }}
        />
      </div>

      <HeardAboutField />

      <div className="submit-wrap">
        <button type="submit" disabled={submitting}>
          {submitting ? 'Taking you to payment' : 'Continue to payment'}
        </button>
        <p className="submit-note">
          You&rsquo;ll be taken to a secure checkout. After payment, you&rsquo;ll get a welcome
          email with your course login link within minutes.
        </p>
      </div>
    </form>
  );
}
