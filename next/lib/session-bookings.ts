import 'server-only';
import { createServiceClient } from '@/lib/supabase/server';
import { SESSION_MINUTES, type Busy } from '@/lib/session-slots';

/** The Off Your Plate Stripe payment link. A slot counts as booked once its checkout is paid. */
export const PAYMENT_LINK = 'plink_1UYTVMQla4s4LgSSTEXVwYRo';
const HOLD_MINUTES = 30; // a slot stays held while she's on the Stripe page

export type SessionRow = { id: string; created_at: string; data: Record<string, unknown> };

async function stripeGet(path: string) {
  const res = await fetch(`https://api.stripe.com/v1/${path}`, {
    headers: { Authorization: `Bearer ${process.env.STRIPE_READ_KEY}` },
    cache: 'no-store',
  });
  if (!res.ok) throw new Error(`Stripe ${res.status}`);
  return res.json();
}

export function getCheckoutSession(id: string) {
  return stripeGet(`checkout/sessions/${encodeURIComponent(id)}`);
}

async function paidBookingIds(): Promise<Set<string>> {
  const ids = new Set<string>();
  let after = '';
  for (let page = 0; page < 10; page++) {
    const list = await stripeGet(
      `checkout/sessions?payment_link=${PAYMENT_LINK}&status=complete&limit=100${after}`,
    );
    for (const s of list.data) if (s.client_reference_id) ids.add(s.client_reference_id);
    if (!list.has_more) break;
    after = `&starting_after=${list.data[list.data.length - 1].id}`;
  }
  return ids;
}

/** Times already taken on the site: paid bookings, plus anyone checking out right now. */
export async function takenSlots(now: Date): Promise<Busy[]> {
  const since = new Date(now.getTime() - 90 * 864e5).toISOString();
  const { data, error } = await createServiceClient()
    .from('submissions')
    .select('id, created_at, data')
    .eq('form_name', 'session-signup')
    .gte('created_at', since);
  if (error) throw new Error(error.message);
  const paid = await paidBookingIds();
  const out: Busy[] = [];
  for (const row of (data ?? []) as SessionRow[]) {
    const slot = typeof row.data.slot === 'string' ? Date.parse(row.data.slot) : NaN;
    if (Number.isNaN(slot)) continue;
    const held = now.getTime() - Date.parse(row.created_at) < HOLD_MINUTES * 6e4;
    if (held || paid.has(String(row.data.booking_id))) {
      out.push({ start: slot, end: slot + SESSION_MINUTES * 6e4 });
    }
  }
  return out;
}

export async function findBooking(bookingId: string): Promise<SessionRow | null> {
  const { data, error } = await createServiceClient()
    .from('submissions')
    .select('id, created_at, data')
    .eq('form_name', 'session-signup')
    .eq('data->>booking_id', bookingId)
    .order('created_at', { ascending: false })
    .limit(1);
  if (error) throw new Error(error.message);
  return (data?.[0] as SessionRow) ?? null;
}

export async function markConfirmed(row: SessionRow): Promise<void> {
  const { error } = await createServiceClient()
    .from('submissions')
    .update({ data: { ...row.data, confirmed_at: new Date().toISOString() } })
    .eq('id', row.id);
  if (error) throw new Error(error.message);
}
