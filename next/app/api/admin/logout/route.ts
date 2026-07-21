import { NextRequest, NextResponse } from 'next/server';
import { ADMIN_COOKIE } from '@/lib/admin-auth';

/** Clears the admin session cookie and returns to the /admin login screen. */
export async function POST(req: NextRequest) {
  const res = NextResponse.redirect(new URL('/admin', req.url), { status: 303 });
  res.cookies.set(ADMIN_COOKIE, '', { path: '/', maxAge: 0 });
  return res;
}
