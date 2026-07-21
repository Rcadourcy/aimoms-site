import { NextRequest, NextResponse } from 'next/server';
import { createHash } from 'crypto';
import { ADMIN_COOKIE } from '@/lib/admin-auth';

/**
 * Accepts the admin password (posted from the /admin login form), and on a match sets the
 * session cookie and redirects back to /admin. Wrong password → back to /admin?e=1.
 */
export async function POST(req: NextRequest) {
  const pw = process.env.ADMIN_PASSWORD;
  if (!pw) {
    return NextResponse.redirect(new URL('/admin?e=config', req.url), { status: 303 });
  }

  let provided = '';
  const ct = req.headers.get('content-type') ?? '';
  try {
    if (ct.includes('application/json')) {
      provided = String((await req.json())?.password ?? '');
    } else {
      const fd = await req.formData();
      provided = String(fd.get('password') ?? '');
    }
  } catch {
    provided = '';
  }

  if (provided !== pw) {
    return NextResponse.redirect(new URL('/admin?e=1', req.url), { status: 303 });
  }

  const token = createHash('sha256').update(pw).digest('hex');
  const res = NextResponse.redirect(new URL('/admin', req.url), { status: 303 });
  res.cookies.set(ADMIN_COOKIE, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/',
    maxAge: 60 * 60 * 8, // 8 hours
  });
  return res;
}
