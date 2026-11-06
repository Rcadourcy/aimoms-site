'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';

const PIXEL_ID = '1206405304980852';

type FbqFn = ((...args: unknown[]) => void) & {
  callMethod?: (...args: unknown[]) => void;
  queue: unknown[][];
  push?: unknown;
  loaded?: boolean;
  version?: string;
};

/**
 * Loads the Meta Pixel and replays anything queued on window._fbqQueue.
 * NOTE: the original static site had a guard bug (`if(f.fbq)return`) that, combined with
 * its pre-defined queue stub, meant fbevents.js never loaded. This version replaces the
 * stub with the real fbq so tracking actually fires — same pixel id + events.
 */
function loadMetaPixel() {
  if (typeof window === 'undefined' || window._fbqLoaded) return;
  window._fbqLoaded = true;

  const ga = document.createElement('script');
  ga.async = true;
  ga.src = '/ga.js';
  document.head.appendChild(ga);

  const queued = window._fbqQueue || [];

  const n = function (this: unknown, ...args: unknown[]) {
    if (n.callMethod) n.callMethod(...args);
    else n.queue.push(args);
  } as FbqFn;
  n.push = n;
  n.loaded = true;
  n.version = '2.0';
  n.queue = [];
  window.fbq = n;
  if (!window._fbq) window._fbq = n;

  const script = document.createElement('script');
  script.async = true;
  script.src = 'https://connect.facebook.net/en_US/fbevents.js';
  const first = document.getElementsByTagName('script')[0];
  first?.parentNode?.insertBefore(script, first);

  window.fbq('init', PIXEL_ID);
  window.fbq('track', 'PageView');
  queued.forEach((args) => {
    try {
      (window.fbq as (...a: unknown[]) => void)(...(args as unknown[]));
    } catch {
      /* ignore replay errors */
    }
  });
}

export default function Analytics() {
  const [showBanner, setShowBanner] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem('aimoms_cookies');
    // Intentional on-mount client read (localStorage is browser-only).
    // eslint-disable-next-line react-hooks/set-state-in-effect
    if (!consent) setShowBanner(true);
    else if (consent === 'all') loadMetaPixel();
  }, []);

  const acceptCookies = () => {
    localStorage.setItem('aimoms_cookies', 'all');
    setShowBanner(false);
    loadMetaPixel();
  };

  const declineCookies = () => {
    localStorage.setItem('aimoms_cookies', 'essential');
    setShowBanner(false);
    window.fbq = () => {};
    window._fbqQueue = [];
  };

  if (!showBanner) return null;

  return (
    <div className="cookie-banner">
      <div className="cookie-title">
        <span className="ai">ai.</span>
        <span className="moms">moms</span>
        <span className="tm-mini">&#8482;</span> <span className="uses">uses cookies</span>
      </div>
      <p>
        We use cookies and advertising technologies &mdash; including Meta Pixel &mdash; to
        improve your experience. <Link href="/privacy">Privacy Policy</Link>
      </p>
      <div className="cookie-actions">
        <button type="button" className="cookie-accept" onClick={acceptCookies}>
          Accept All
        </button>
        <button type="button" className="cookie-decline" onClick={declineCookies}>
          Essential Only
        </button>
      </div>
    </div>
  );
}
