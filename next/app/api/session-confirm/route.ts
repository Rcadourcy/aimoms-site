import { NextRequest, NextResponse } from 'next/server';
import { findBooking, getCheckoutSession, markConfirmed, PAYMENT_LINK } from '@/lib/session-bookings';
import { sendSessionEmails, slotLabel } from '@/lib/session-emails';

/**
 * Runs from the thank-you page and sends the confirmation once. With STRIPE_READ_KEY set the
 * payment is checked with Stripe. Without it we trust Stripe's redirect (a live session id plus
 * the booking id saved in her browser) and Raquel's email asks her to check the payment.
 */
export async function POST(req: NextRequest) {
  try {
    const { session_id: id, booking_id: saved } = await req.json();
    if (typeof id !== 'string' || !/^cs_live_[A-Za-z0-9_]+$/.test(id)) return NextResponse.json({ ok: false });
    const verified = Boolean(process.env.STRIPE_READ_KEY);
    let booking = saved;
    if (verified) {
      const session = await getCheckoutSession(id);
      if (session.payment_status !== 'paid' || session.payment_link !== PAYMENT_LINK) {
        return NextResponse.json({ ok: false });
      }
      booking = session.client_reference_id;
    }
    if (typeof booking !== 'string' || !/^[0-9a-f-]{36}$/.test(booking)) return NextResponse.json({ ok: false });
    const row = await findBooking(booking);
    if (!row) return NextResponse.json({ ok: false });
    if (!row.data.confirmed_at) {
      await markConfirmed(row);
      await sendSessionEmails(row, verified);
    }
    const slot = typeof row.data.slot === 'string' ? row.data.slot : '';
    return NextResponse.json({ ok: true, when: slot ? slotLabel(slot) : null });
  } catch (err) {
    console.error('[session-confirm]', err);
    return NextResponse.json({ ok: false });
  }
}
