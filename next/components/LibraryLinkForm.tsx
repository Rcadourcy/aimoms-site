'use client';

import { useState, type FormEvent } from 'react';

/** The hidden Kit form. Kit's confirmation email carries the button to her Prompt Library. */
const KIT_FORM = 10155811;

/** Sends her the library link by email, so she still has it after this tab is gone. */
export default function LibraryLinkForm() {
  const [email, setEmail] = useState('');
  const [state, setState] = useState<'idle' | 'sending' | 'sent' | 'check' | 'failed'>('idle');
  const [checkUrl, setCheckUrl] = useState('');

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    setState('sending');
    try {
      // Straight from her browser: Kit quarantines repeat sign-ups coming from one server address.
      const res = await fetch(`https://app.kit.com/forms/${KIT_FORM}/subscriptions`, {
        method: 'POST',
        headers: { Accept: 'application/json' },
        body: new URLSearchParams({ email_address: email.trim() }),
      });
      const data = await res.json();
      if (data.status === 'quarantined' && data.url) {
        setCheckUrl(data.url);
        setState('check');
      } else {
        setState(data.status === 'success' ? 'sent' : 'failed');
      }
    } catch {
      setState('failed');
    }
  }

  if (state === 'sent') {
    return <p className="date-sub">Sent. Check your inbox for your library link, and your spam folder if it isn&apos;t there in a few minutes.</p>;
  }
  if (state === 'check') {
    return <p className="date-sub">One quick step: <a href={checkUrl} target="_blank" rel="noopener noreferrer">tap here to confirm you&apos;re a person</a>, and your link will be on its way.</p>;
  }
  return (
    <form onSubmit={onSubmit} className="library-link-form">
      <input
        type="email"
        required
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="your@email.com"
        aria-label="Your email"
      />
      <button type="submit" disabled={state === 'sending'}>{state === 'sending' ? 'Sending' : 'Email Me My Link'}</button>
      {state === 'failed' && <p className="date-sub">That didn&apos;t go through. Email hello@aimoms.ai and we&apos;ll send it to you.</p>}
    </form>
  );
}
