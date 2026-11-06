'use client';

import { useEffect } from 'react';
import { trackFbq } from './TrackedLink';

/**
 * Fires a Meta Pixel conversion event on mount. Used on the post-Stripe *-thank-you
 * pages (Stripe's success_url lands here), exactly as the static site did.
 * Defaults to "Purchase" (Foundations/Workshop); the Membership thank-you fires
 * "Subscribe" — matching the live site's events verbatim for ad-attribution parity.
 */
export default function PurchasePixel({
  event = 'Purchase',
  contentName,
  value,
  currency = 'USD',
}: {
  event?: string;
  contentName: string;
  value: number;
  currency?: string;
}) {
  useEffect(() => {
    trackFbq(event, { content_name: contentName, value, currency });
    // ga.js sends this once it loads. If it already has, send it now.
    if (window.gtag) window.gtag('event', 'purchase', { content_name: contentName, value, currency });
    else window._gaPurchase = { name: contentName, value };
  }, [event, contentName, value, currency]);

  return null;
}
