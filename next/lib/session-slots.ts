import ICAL from 'ical.js';

/**
 * Bookable times for the Top 3 Session: Monday to Friday, starts between
 * 9:00am and 1:00pm New York time, so the last session ends at 2:30pm.
 * Pure functions, so they can be tested without Google, Stripe or Supabase.
 */
export const SESSION_MINUTES = 90;
const FIRST_START = 9 * 60;
const LAST_START = 13 * 60;
const STEP_MINUTES = 30;
const NOTICE_HOURS = 48; // time to read her 3 and prep
export const DAYS_AHEAD = 28;
const TZ = 'America/New_York';

export type Busy = { start: number; end: number };

const HOUR = 36e5;

function nyOffsetMs(at: Date): number {
  const name = new Intl.DateTimeFormat('en-US', { timeZone: TZ, timeZoneName: 'longOffset' })
    .formatToParts(at)
    .find((p) => p.type === 'timeZoneName')?.value;
  const m = name?.match(/GMT([+-])(\d{2}):(\d{2})/);
  if (!m) return 0;
  return (m[1] === '-' ? -1 : 1) * (Number(m[2]) * HOUR + Number(m[3]) * 6e4);
}

function nyDateParts(at: Date) {
  const shifted = new Date(at.getTime() + nyOffsetMs(at));
  return { y: shifted.getUTCFullYear(), m: shifted.getUTCMonth(), d: shifted.getUTCDate() };
}

export function buildSlots(now: Date, busy: Busy[]): string[] {
  const earliest = now.getTime() + NOTICE_HOURS * HOUR;
  const { y, m, d } = nyDateParts(now);
  const out: string[] = [];
  for (let i = 0; i <= DAYS_AHEAD; i++) {
    const day = new Date(Date.UTC(y, m, d + i, 12));
    const dow = day.getUTCDay();
    if (dow === 0 || dow === 6) continue;
    const offset = nyOffsetMs(day);
    for (let min = FIRST_START; min <= LAST_START; min += STEP_MINUTES) {
      const start = Date.UTC(y, m, d + i, 0, min) - offset;
      const end = start + SESSION_MINUTES * 6e4;
      if (start < earliest) continue;
      if (busy.some((b) => b.start < end && b.end > start)) continue;
      out.push(new Date(start).toISOString());
    }
  }
  return out;
}

/** Busy times from a Google Calendar iCal feed. Events marked Free are skipped. */
export function parseBusy(ics: string, from: Date, to: Date): Busy[] {
  const root = new ICAL.Component(ICAL.parse(ics));
  for (const tz of root.getAllSubcomponents('vtimezone')) {
    ICAL.TimezoneService.register(tz);
  }
  const masters = new Map<string, ICAL.Event>();
  const overrides: ICAL.Component[] = [];
  const singles: ICAL.Event[] = [];
  for (const comp of root.getAllSubcomponents('vevent')) {
    if (comp.hasProperty('recurrence-id')) {
      overrides.push(comp);
      continue;
    }
    const ev = new ICAL.Event(comp);
    if (ev.isRecurring()) masters.set(ev.uid, ev);
    else singles.push(ev);
  }
  for (const comp of overrides) {
    const ev = new ICAL.Event(comp);
    const master = masters.get(ev.uid);
    if (master) master.relateException(ev);
    else singles.push(ev);
  }

  const out: Busy[] = [];
  const add = (ev: ICAL.Event, start: ICAL.Time, end: ICAL.Time) => {
    const c = ev.component;
    if (c.getFirstPropertyValue('status') === 'CANCELLED') return;
    if (c.getFirstPropertyValue('transp') === 'TRANSPARENT') return;
    const s = start.toJSDate().getTime();
    const e = end.toJSDate().getTime();
    if (s < to.getTime() && e > from.getTime()) out.push({ start: s, end: e });
  };

  for (const ev of singles) add(ev, ev.startDate, ev.endDate);
  for (const ev of masters.values()) {
    const it = ev.iterator();
    for (let i = 0; i < 20000; i++) {
      const next = it.next();
      if (!next || next.toJSDate() > to) break;
      const o = ev.getOccurrenceDetails(next);
      add(o.item, o.startDate, o.endDate);
    }
  }
  return out;
}
