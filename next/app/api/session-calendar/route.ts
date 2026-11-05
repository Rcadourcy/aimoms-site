import { NextRequest, NextResponse } from 'next/server';
import { calendarFile, sessionZoom } from '@/lib/session-emails';

/** The "Add to Apple or Outlook Calendar" link in the Kit confirmation email. */
export async function GET(req: NextRequest) {
  const start = req.nextUrl.searchParams.get('start') ?? '';
  if (Number.isNaN(Date.parse(start))) return new NextResponse('Not found', { status: 404 });
  const where = req.nextUrl.searchParams.get('place') === 'nyc' ? 'In person in NYC' : sessionZoom();
  return new NextResponse(calendarFile(start, where), {
    headers: {
      'Content-Type': 'text/calendar; charset=utf-8',
      'Content-Disposition': 'attachment; filename="top-3-session.ics"',
    },
  });
}
