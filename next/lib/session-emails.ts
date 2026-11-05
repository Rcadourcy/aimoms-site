import 'server-only';
import { SESSION_MINUTES } from '@/lib/session-slots';
import type { SessionRow } from '@/lib/session-bookings';

const esc = (s: string) =>
  s.replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' })[c] as string);
const str = (v: unknown) => (typeof v === 'string' ? v : Array.isArray(v) ? v.join(', ') : '');

const ET = { timeZone: 'America/New_York' } as const;
export function slotLabel(iso: string): string {
  const start = new Date(iso);
  const end = new Date(start.getTime() + SESSION_MINUTES * 6e4);
  const day = start.toLocaleDateString('en-US', { ...ET, weekday: 'long', month: 'long', day: 'numeric' });
  const t = (d: Date) => d.toLocaleTimeString('en-US', { ...ET, hour: 'numeric', minute: '2-digit' });
  return `${day}, ${t(start)} to ${t(end)} ET`;
}

const icsTime = (d: Date) => d.toISOString().replace(/[-:]|\.\d{3}/g, '');
function invite(row: SessionRow, slot: string, organizer: string, mom: string, owner: string, where: string): string {
  const start = new Date(slot);
  const end = new Date(start.getTime() + SESSION_MINUTES * 6e4);
  const clean = (s: string) => s.replace(/[\;,]/g, '\\$&').replace(/\r?\n/g, ' ');
  return [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//ai.moms//Top 3 Session//EN',
    'METHOD:REQUEST',
    'BEGIN:VEVENT',
    `UID:${row.id}@aimoms.ai`,
    `DTSTAMP:${icsTime(new Date())}`,
    `DTSTART:${icsTime(start)}`,
    `DTEND:${icsTime(end)}`,
    `SUMMARY:${clean('ai.moms™ Top 3 Session')}`,
    `LOCATION:${clean(where)}`,
    `DESCRIPTION:${clean(`Join here: ${where}`)}`,
    `ORGANIZER;CN=ai.moms™:mailto:${organizer}`,
    `ATTENDEE;RSVP=TRUE:mailto:${mom}`,
    `ATTENDEE;RSVP=TRUE:mailto:${owner}`,
    'END:VEVENT',
    'END:VCALENDAR',
  ].join('\r\n');
}

async function send(body: Record<string, unknown>) {
  const res = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: { Authorization: `Bearer ${process.env.RESEND_API_KEY}`, 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  });
  if (!res.ok) console.error('[session] Resend send failed', res.status, await res.text());
}

export async function sendSessionEmails(row: SessionRow, verified: boolean): Promise<void> {
  const from = process.env.RESEND_FROM_EMAIL;
  const owner = process.env.RESEND_TO_EMAIL;
  if (!process.env.RESEND_API_KEY || !from || !owner) {
    console.warn('[session] Resend env missing, skipping emails');
    return;
  }
  const d = row.data;
  const first = str(d.first_name) || 'there';
  const name = [str(d.first_name), str(d.last_name)].filter(Boolean).join(' ');
  const mom = str(d.email);
  const slot = str(d.slot);
  const request = str(d.time_request);
  const zoom = process.env.SESSION_ZOOM_URL || 'https://us06web.zoom.us/j/82822702155';
  const inPerson = str(d.where).includes('NYC');
  const where = inPerson ? 'In person in NYC' : zoom || 'Zoom';
  const whereLine = inPerson
    ? "In person in NYC. We'll email you the spot before we meet."
    : zoom
      ? `On Zoom: ${esc(zoom)}`
      : "On Zoom. We'll send your link before we meet.";
  const p = (s: string) => `<p style="margin:0 0 14px">${s}</p>`;
  const wrap = (s: string) =>
    `<div style="font-family:system-ui,sans-serif;font-size:15px;line-height:1.5;color:#060d26;max-width:520px">${s}</div>`;
  const sign = p('The ai.moms™ team 🩷');
  const check = verified ? '' : p('Check Stripe to confirm the payment came through.');
  const wishes = [d.pain_1, d.pain_2, d.pain_3].map(str).filter(Boolean);

  const attachments = (ics: string) => [
    { filename: 'top-3-session.ics', content: Buffer.from(ics).toString('base64'), content_type: 'text/calendar; method=REQUEST' },
  ];

  if (slot) {
    const when = slotLabel(slot);
    const ics = invite(row, slot, from, mom, owner, where);
    await send({
      from: `ai.moms™ <${from}>`,
      to: [mom],
      reply_to: owner,
      subject: `You're booked! ${when}`,
      html: wrap(
        p(`Hi ${esc(first)},`) +
          p(`You're booked for your ai.moms™ Top 3 Session!`) +
          p(`<b>${esc(when)}</b><br>${whereLine}`) +
          p(`We have your 3, and we'll plan around them before we meet. You'll hear from us about which Claude plan you need, so all you have to do is show up with your laptop.`) +
          p(`Need to reschedule? Just reply at least 24 hours before your session.`) +
          sign,
      ),
      attachments: attachments(ics),
    });
    await send({
      from: `ai.moms™ <${from}>`,
      to: [owner],
      reply_to: mom,
      subject: `Booked: ${name}, ${when}`,
      html: wrap(
        p(`<b>${esc(name)}</b> paid and booked.`) +
          p(`<b>${esc(when)}</b><br>${esc(str(d.where))}`) +
          p(`Her 3:<br>${wishes.map(esc).join('<br>')}`) +
          p(`Using AI: ${esc(str(d.lvl)) || 'not given'}<br>Tools: ${esc(str(d.tools)) || 'not given'}`) +
          p(`Accept the attached invite so it lands on your calendar.`) +
          check,
      ),
      attachments: attachments(ics),
    });
    return;
  }

  await send({
    from: `ai.moms™ <${from}>`,
    to: [mom],
    reply_to: owner,
    subject: 'We got your session request',
    html: wrap(
      p(`Hi ${esc(first)},`) +
        p(`Thank you for booking your ai.moms™ Top 3 Session! We have your 3 and your time request:`) +
        p(`<b>${esc(request)}</b>`) +
        p(`We'll email you to confirm your time within one business day.`) +
        sign,
    ),
  });
  await send({
    from: `ai.moms™ <${from}>`,
    to: [owner],
    reply_to: mom,
    subject: `Paid, needs a time: ${name}`,
    html: wrap(
      p(`<b>${esc(name)}</b> paid and asked for another time:`) +
        p(`<b>${esc(request)}</b><br>${esc(str(d.where))}`) +
        p(`Her 3:<br>${wishes.map(esc).join('<br>')}`) +
        p(`Using AI: ${esc(str(d.lvl)) || 'not given'}<br>Tools: ${esc(str(d.tools)) || 'not given'}`) +
        check,
    ),
  });
}
