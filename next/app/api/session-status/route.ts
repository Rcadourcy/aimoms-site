import { NextResponse } from 'next/server';
import { lastEmailError } from '@/lib/session-bookings';

export const dynamic = 'force-dynamic';

/** Which booking settings are in place. Yes or no only, never the values. */
export async function GET() {
  const set = (name: string) => Boolean(process.env[name]);
  return NextResponse.json({
    resend_key: set('RESEND_API_KEY'),
    resend_from: set('RESEND_FROM_EMAIL'),
    resend_to: set('RESEND_TO_EMAIL'),
    stripe_key: set('STRIPE_READ_KEY'),
    live_calendar: set('GOOGLE_CAL_ICS_URLS'),
    last_email_error: await lastEmailError().catch(() => null),
  });
}
