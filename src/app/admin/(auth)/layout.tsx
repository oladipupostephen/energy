/**
 * (auth) Route Group Layout
 * ─────────────────────────────────────────────────────────────────────────────
 * Covers /admin/login (and any future auth pages like /admin/forgot-password,
 * /admin/reset-password).
 *
 * This layout intentionally does NOT include the AdminLayoutClient shell
 * (sidebar + header). Auth pages must render as full-page standalone screens.
 *
 * Route group parentheses mean "(auth)" does NOT appear in the URL —
 * the page is still reachable at /admin/login, not /admin/(auth)/login.
 */
export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
