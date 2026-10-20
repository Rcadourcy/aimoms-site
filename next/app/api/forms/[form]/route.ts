import { NextRequest, NextResponse } from 'next/server';
import { createServiceClient } from '@/lib/supabase/server';

/**
 * One handler for every lead form. Each form POSTs url-encoded fields to
 * /api/forms/<form-name>. We (1) persist the row to Supabase `submissions` and
 * (2) email Raquel via Resend — replicating the old Netlify Forms notifications.
 *
 * IMPORTANT (money flow): the purchase-lead forms (foundations/membership/workshop/
 * self/gift) redirect the buyer to Stripe REGARDLESS of what this route returns — the
 * client fires the redirect on both .then and .catch plus a setTimeout safety net. So a
 * slow or failing capture here NEVER blocks checkout. Note also that fetch() does not
 * reject on a 4xx/5xx, so the inline-success forms still show success; the status codes
 * below are for correctness/observability, not UX gating.
 */

// Allowlist — only these form names are accepted. (Matches the 10 form-name hidden inputs.)
const ALLOWED_FORMS = new Set([
  'newsletter',
  'foundations-signup',
  'membership-signup',
  'workshop-signup',
  'host-request',
  'outofoffice-waitlist',
  'quiz-leads',
  'press',
  'self-purchase',
  'gift-purchase',
  'experience-signup',
]);

// Fields that are never part of the lead payload.
const SKIP_FIELDS = new Set(['bot-field', 'form-name']);

type Payload = Record<string, string | string[]>;

function collectFields(form: FormData): Payload {
  const out: Payload = {};
  for (const [rawKey, rawVal] of form.entries()) {
    if (SKIP_FIELDS.has(rawKey)) continue;
    const value = typeof rawVal === 'string' ? rawVal : '';
    // Array fields come in as `nights[]` / `intent[]` (or repeated keys) — collect to arrays.
    const key = rawKey.endsWith('[]') ? rawKey.slice(0, -2) : rawKey;
    if (rawKey.endsWith('[]') || key in out) {
      const existing = out[key];
      if (Array.isArray(existing)) existing.push(value);
      else if (existing !== undefined) out[key] = [String(existing), value];
      else out[key] = [value];
    } else {
      out[key] = value;
    }
  }
  return out;
}

function firstString(v: string | string[] | undefined): string | undefined {
  if (Array.isArray(v)) return v[0];
  return v;
}

function extractName(p: Payload): string | undefined {
  const name = firstString(p.name);
  if (name) return name;
  const first = firstString(p.first_name);
  const last = firstString(p.last_name);
  const joined = [first, last].filter(Boolean).join(' ').trim();
  return joined || undefined;
}

function renderEmailHtml(formName: string, p: Payload): string {
  const rows = Object.entries(p)
    .map(([k, v]) => {
      const val = Array.isArray(v) ? v.join(', ') : v;
      const safeKey = k.replace(/[<>&]/g, '');
      const safeVal = String(val).replace(/[<>&]/g, (c) =>
        c === '<' ? '&lt;' : c === '>' ? '&gt;' : '&amp;',
      );
      return `<tr><td style="padding:4px 12px 4px 0;font-weight:600;vertical-align:top">${safeKey}</td><td style="padding:4px 0">${safeVal || '—'}</td></tr>`;
    })
    .join('');
  return `<div style="font-family:system-ui,sans-serif;font-size:14px;color:#1a1a2e">
    <p>New <strong>${formName}</strong> submission on ai.moms™:</p>
    <table style="border-collapse:collapse">${rows}</table>
  </div>`;
}

async function sendNotification(formName: string, p: Payload): Promise<void> {
  const apiKey = process.env.RESEND_API_KEY;
  const from = process.env.RESEND_FROM_EMAIL;
  const to = process.env.RESEND_TO_EMAIL;
  if (!apiKey || !from || !to) {
    console.warn('[forms] Resend env missing — skipping notification email');
    return;
  }
  const email = firstString(p.email);
  const res = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      from: `ai.moms forms <${from}>`,
      to: [to],
      reply_to: email || undefined,
      subject: `New ${formName} submission — ai.moms™`,
      html: renderEmailHtml(formName, p),
    }),
  });
  if (!res.ok) {
    console.error('[forms] Resend send failed', res.status, await res.text());
  }
}

export async function POST(
  req: NextRequest,
  { params }: { params: Promise<{ form: string }> },
) {
  const { form } = await params;

  if (!ALLOWED_FORMS.has(form)) {
    return NextResponse.json({ ok: false, error: 'unknown form' }, { status: 404 });
  }

  let fields: FormData;
  try {
    fields = await req.formData();
  } catch {
    return NextResponse.json({ ok: false, error: 'bad body' }, { status: 400 });
  }

  // Honeypot — bots fill the hidden bot-field. Pretend success, store nothing.
  const honeypot = fields.get('bot-field');
  if (typeof honeypot === 'string' && honeypot.trim() !== '') {
    return NextResponse.json({ ok: true });
  }

  const payload = collectFields(fields);
  const email = firstString(payload.email);
  const name = extractName(payload);

  // Persist. The email notification is best-effort and must not block the response.
  let stored = true;
  try {
    const supabase = createServiceClient();
    const { error } = await supabase.from('submissions').insert({
      form_name: form,
      email: email ?? null,
      name: name ?? null,
      data: payload,
      user_agent: req.headers.get('user-agent'),
    });
    if (error) {
      stored = false;
      console.error('[forms] Supabase insert failed', form, error.message);
    }
  } catch (err) {
    stored = false;
    console.error('[forms] Supabase insert threw', form, err);
  }

  try {
    await sendNotification(form, payload);
  } catch (err) {
    console.error('[forms] notification threw', form, err);
  }

  return NextResponse.json({ ok: stored }, { status: stored ? 200 : 500 });
}
