/**
 * Password gate for /admin. Plain server-rendered form — posts to /api/admin/login, no
 * client JS needed. Shown whenever there's no valid admin session cookie.
 */
export default function AdminLogin({
  message,
  configured,
}: {
  message: string | null;
  configured: boolean;
}) {
  return (
    <div className="admin-login-wrap">
      <div className="admin-login-card">
        <div className="admin-brand">
          <span className="admin-brand-ai">ai.</span>
          <span className="admin-brand-moms">moms</span>
          <span className="admin-brand-tm">™</span>
        </div>
        <h1 className="admin-login-title">Signups</h1>
        <p className="admin-login-sub">Enter the admin password to view form submissions.</p>

        {message && <p className="admin-login-error">{message}</p>}

        {configured && (
          <form method="post" action="/api/admin/login" className="admin-login-form">
            <input
              type="password"
              name="password"
              placeholder="Admin password"
              autoComplete="current-password"
              required
              autoFocus
              className="admin-login-input"
            />
            <button type="submit" className="admin-btn admin-btn-primary">
              View signups
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
