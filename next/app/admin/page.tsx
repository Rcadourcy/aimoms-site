import type { Metadata } from 'next';
import { isAuthed, isAdminConfigured } from '@/lib/admin-auth';
import { createServiceClient } from '@/lib/supabase/server';
import AdminLogin from './AdminLogin';
import AdminDashboard, { type Submission } from './AdminDashboard';
import './admin.css';

export const metadata: Metadata = {
  title: 'Signups — ai.moms™ admin',
  robots: { index: false, follow: false },
};

// Always render fresh — this is a live view of submissions, never cached.
export const dynamic = 'force-dynamic';

export default async function AdminPage({
  searchParams,
}: {
  searchParams: Promise<{ e?: string }>;
}) {
  const { e } = await searchParams;

  if (!(await isAuthed())) {
    const message = !isAdminConfigured()
      ? 'Admin isn’t set up yet — an ADMIN_PASSWORD needs to be added to the site’s environment.'
      : e === '1'
        ? 'That password didn’t match. Try again.'
        : null;
    return <AdminLogin message={message} configured={isAdminConfigured()} />;
  }

  let rows: Submission[] = [];
  let loadError: string | null = null;
  try {
    const supabase = createServiceClient();
    const { data, error } = await supabase
      .from('submissions')
      .select('id, form_name, email, name, data, created_at')
      .order('created_at', { ascending: false })
      .limit(5000);
    if (error) loadError = error.message;
    else rows = (data ?? []) as Submission[];
  } catch (err) {
    loadError = err instanceof Error ? err.message : 'Could not connect to the database.';
  }

  return <AdminDashboard rows={rows} loadError={loadError} />;
}
