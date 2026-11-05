import { NextRequest, NextResponse } from 'next/server';
import { findBooking, getCheckoutSession, markConfirmed, PAYMENT_LINK } from '@/lib/session-bookings';
import { sendSessionEmails, slotLabel } from '@/lib/session-emails';

/** Runs from the thank-you page: checks the payment with Stripe, then sends the confirmation once. */
export async function POST(req: NextRequest) {
  try {
    const { session_id: id } = await req.json();
    if (typeof id !== 'string' || !/^cs_[A-Za-z0-9_]+$/.test(id) || !process.env.STRIPE_READ_KEY) {
      return NextResponse.json({ ok: false });
    }
    const session = await getCheckoutSession(id);
    if (session.payment_status !== 'paid' || session.payment_link !== PAYMENT_LINK || !session.client_reference_id) {
      return NextResponse.json({ ok: false });
    }
    const row = await findBooking(session.client_reference_id);
    if (!row) return NextResponse.json({ ok: false });
    if (!row.data.confirmed_at) {
      await markConfirmed(row);
      await sendSessionEmails(row);
    }
    const slot = typeof row.data.slot === 'string' ? row.data.slot : '';
    return NextResponse.json({ ok: true, when: slot ? slotLabel(slot) : null });
  } catch (err) {
    console.error('[session-confirm]', err);
    return NextResponse.json({ ok: false });
  }
}
