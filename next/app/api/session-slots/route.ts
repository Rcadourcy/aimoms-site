import { NextResponse } from 'next/server';
import { buildSlots, parseBusy, LAST_BOOKABLE_DAY, type Busy } from '@/lib/session-slots';
import { takenSlots } from '@/lib/session-bookings';
import synced from '@/data/session-busy.json';

export const dynamic = 'force-dynamic';

const MAX_SYNC_AGE_HOURS = 72;

/**
 * Open times for the Top 3 Session. Returns times only, never calendar details.
 * Busy times come from data/session-busy.json, which a scheduled task refreshes from
 * Raquel's calendars. If GOOGLE_CAL_ICS_URLS is set, the live feeds are used instead.
 * With a stale file or any failure it returns ok:false and the page falls back to
 * "request a time", so checkout keeps working.
 */
async function calendarBusy(now: Date): Promise<Busy[] | null> {
  const feeds = (process.env.GOOGLE_CAL_ICS_URLS ?? '').split(',').map((u) => u.trim()).filter(Boolean);
  if (feeds.length) {
    const to = new Date(LAST_BOOKABLE_DAY + 2 * 864e5);
    const calendars = await Promise.all(
      feeds.map(async (url) => {
        const res = await fetch(url, { cache: 'no-store' });
        if (!res.ok) throw new Error(`calendar feed ${res.status}`);
        return parseBusy(await res.text(), now, to);
      }),
    );
    return calendars.flat();
  }
  const age = now.getTime() - Date.parse(synced.updated);
  if (!(age < MAX_SYNC_AGE_HOURS * 36e5)) return null;
  return synced.busy.map((b) => ({ start: Date.parse(b.start), end: Date.parse(b.end) }));
}

export async function GET() {
  try {
    const now = new Date();
    const busy = await calendarBusy(now);
    if (!busy) return NextResponse.json({ ok: false, slots: [] });
    const all = [...busy, ...(await takenSlots(now))];
    return NextResponse.json({ ok: true, slots: buildSlots(now, all) });
  } catch (err) {
    console.error('[session-slots]', err);
    return NextResponse.json({ ok: false, slots: [] });
  }
}
