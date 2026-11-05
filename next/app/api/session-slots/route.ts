import { NextResponse } from 'next/server';
import { buildSlots, parseBusy, lastBookableDay, type Busy } from '@/lib/session-slots';
import { takenSlots } from '@/lib/session-bookings';
import synced from '@/data/session-busy.json';
import holds from '@/data/session-holds.json';

export const dynamic = 'force-dynamic';

/**
 * Open times for the Top 3 Session. Returns times only, never calendar details.
 * Busy times come from data/session-busy.json, which a scheduled task refreshes from
 * Raquel's calendars at 11am and 7pm. If GOOGLE_CAL_ICS_URLS is set, the live feeds are
 * used instead. data/session-holds.json (trips, holidays) always applies. On any failure
 * it returns ok:false and the page falls back to "request a time", so checkout keeps working.
 */
const toBusy = (b: { start: string; end: string }): Busy => ({ start: Date.parse(b.start), end: Date.parse(b.end) });

async function calendarBusy(now: Date): Promise<Busy[]> {
  const feeds = (process.env.GOOGLE_CAL_ICS_URLS ?? '').split(',').map((u) => u.trim()).filter(Boolean);
  if (feeds.length) {
    const to = new Date(lastBookableDay(now) + 2 * 864e5);
    const calendars = await Promise.all(
      feeds.map(async (url) => {
        const res = await fetch(url, { cache: 'no-store' });
        if (!res.ok) throw new Error(`calendar feed ${res.status}`);
        return parseBusy(await res.text(), now, to);
      }),
    );
    return calendars.flat();
  }
  return synced.busy.map(toBusy);
}

export async function GET() {
  try {
    const now = new Date();
    const all = [...(await calendarBusy(now)), ...holds.map(toBusy), ...(await takenSlots(now))];
    return NextResponse.json({ ok: true, slots: buildSlots(now, all) });
  } catch (err) {
    console.error('[session-slots]', err);
    return NextResponse.json({ ok: false, slots: [] });
  }
}
