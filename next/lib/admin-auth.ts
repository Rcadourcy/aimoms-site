/**
 * Lightweight gate for the internal /admin signups view. Single shared password stored
 * in the ADMIN_PASSWORD env var (Vercel env / .env.local — never in code). On login we
 * set an httpOnly cookie whose value is a SHA-256 of the password, so the raw password is
 * never stored in the browser. This is deliberately simple — it protects an internal,
 * single-operator dashboard. When the gated course area gets real auth later, this can be
 * upgraded to Supabase Auth. Not a replacement for per-user auth on user data.
 */
import 'server-only';
import { createHash } from 'crypto';
import { cookies } from 'next/headers';

export const ADMIN_COOKIE = 'aimoms_admin';

/** The cookie value we expect for a valid session, or null if admin isn't configured. */
export function expectedToken(): string | null {
  const pw = process.env.ADMIN_PASSWORD;
  if (!pw) return null;
  return createHash('sha256').update(pw).digest('hex');
}

export function isAdminConfigured(): boolean {
  return Boolean(process.env.ADMIN_PASSWORD);
}

export async function isAuthed(): Promise<boolean> {
  const token = expectedToken();
  if (!token) return false;
  const jar = await cookies();
  return jar.get(ADMIN_COOKIE)?.value === token;
}
