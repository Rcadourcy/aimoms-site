import { NextResponse } from 'next/server';
import { buildSlots, parseBusy, DAYS_AHEAD, type Busy } from '@/lib/session-slots';
import { takenSlots } from '@/lib/session-bookings';

export const dynamic = 'force-dynamic';

/**
 * Open times for the Off Your Plate session. Returns times only, never calendar details.
 * GOOGLE_CAL_ICS_URLS holds the secret iCal address of each calendar, comma separated.
 * With anything missing or failing it returns ok:false and the page falls back to
 * "request a time", so checkout keeps working.
 */
export async function GET() {
  const feeds = (process.env.GOOGLE_CAL_ICS_URLS ?? '').split(',').map((u) => u.trim()).filter(Boolean);
  if (!feeds.length || !process.env.STRIPE_READ_KEY) {
    return NextResponse.json({ ok: false, slots: [] });
  }
  try {
    const now = new Date();
    const to = new Date(now.getTime() + (DAYS_AHEAD + 2) * 864e5);
    const calendars = await Promise.all(
      feeds.map(async (url) => {
        const res = await fetch(url, { cache: 'no-store' });
        if (!res.ok) throw new Error(`calendar feed ${res.status}`);
        return parseBusy(await res.text(), now, to);
      }),
    );
    const busy: Busy[] = [...calendars.flat(), ...(await takenSlots(now))];
    return NextResponse.json({ ok: true, slots: buildSlots(now, busy) });
  } catch (err) {
    console.error('[session-slots]', err);
    return NextResponse.json({ ok: false, slots: [] });
  }
}
