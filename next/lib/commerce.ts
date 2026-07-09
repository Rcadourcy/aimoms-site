/**
 * Single source of truth for Stripe Payment Links and prices.
 *
 * ⚠️ The Foundations course link AND price change within days (Raquel is raising the
 * price → Stripe issues a NEW link). Update them HERE only — every page imports from
 * this file, so a price/link change is a one-line edit, never a find-replace.
 *
 * Each Stripe link's success_url is configured (in the Stripe dashboard) to redirect to
 * the matching on-site /<product>-thank-you page.
 */

export const STRIPE_LINKS = {
  foundationsPayInFull: 'https://buy.stripe.com/28EfZj6U8aEB7MRbBwdZ608',
  foundationsTwoPay: 'https://buy.stripe.com/6oU6oJ3HW8wt1ot0WSdZ609',
  membership: 'https://buy.stripe.com/28EaEZdiw2854AFgVQdZ60j',
  workshop: 'https://buy.stripe.com/3cI4gB5Q49Ax5EJ494dZ60l',
  courseGift: 'https://buy.stripe.com/8x2fZj6U83c98QV20WdZ60a',
  bundle: 'https://buy.stripe.com/14A7sN92gfYVffj350dZ60b',
} as const;

/**
 * The current Monthly Workshop instance. Raquel updates `date` each month — the SAME
 * value she already changes on the workshop sales page ("Next workshop: …"). It is
 * stamped onto every workshop registration (hidden `workshop_date` field) so the /admin
 * signups view can group registrations by which workshop they're for. Keep it a single
 * config value — never hard-code the date into the form.
 */
export const WORKSHOP = {
  date: 'Thursday, July 9, 2026 · 10:00am ET',
} as const;

export const PRICES = {
  foundations: 247, // founding-member price (will rise — change here only)
  foundationsStandard: 497, // strikethrough anchor
  foundationsTwoPay: 124, // x2 monthly
  membership: 59, // /month
  workshop: 68,
  bundle: 297,
} as const;
