import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Admin Login — SolarStore",
  robots: { index: false, follow: false },
};

/**
 * AdminLoginPage — Async Server Component
 * The auth gate for /admin/*. Replace the form action with your real
 * auth logic (next-auth signIn, custom API call, etc.)
 *
 * Next.js 15+: searchParams is now a Promise and must be awaited.
 * https://nextjs.org/docs/messages/sync-dynamic-apis
 */
export default async function AdminLoginPage({
  searchParams,
}: {
  searchParams: Promise<{ callbackUrl?: string; error?: string }>;
}) {
  // Unwrap the Promise before accessing any property
  const params = await searchParams;

  return (
    <div className="min-h-screen bg-[#050A18] flex items-center justify-center px-4">
      {/* Background decoration */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-[-20%] right-[-10%] w-[600px] h-[600px] rounded-full bg-amber-500/8 blur-[120px]" />
        <div className="absolute bottom-[-10%] left-[-5%] w-[400px] h-[400px] rounded-full bg-blue-600/5 blur-[100px]" />
        {/* Grid */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage:
              "linear-gradient(#FFCA3A 1px, transparent 1px), linear-gradient(90deg, #FFCA3A 1px, transparent 1px)",
            backgroundSize: "60px 60px",
          }}
        />
      </div>

      <div className="relative w-full max-w-md">
        {/* Logo */}
        <div className="flex items-center justify-center gap-3 mb-10">
          <div className="w-10 h-10 rounded-xl bg-amber-400 flex items-center justify-center">
            <SunIcon />
          </div>
          <div>
            <span className="font-display font-black text-2xl text-white">
              Solar<span className="text-amber-400">Store</span>
            </span>
            <div className="text-xs text-slate-500 font-semibold uppercase tracking-widest text-center">
              Admin
            </div>
          </div>
        </div>

        {/* Card */}
        <div className="bg-[#0A1628] border border-white/10 rounded-3xl p-8 shadow-2xl">
          <h1 className="font-display font-black text-2xl text-white mb-2">
            Welcome back
          </h1>
          <p className="text-slate-400 text-sm mb-8">
            Sign in to access the admin dashboard.
          </p>

          {/* Error message */}
          {params.error === "access_denied" && (
            <div className="flex items-center gap-3 bg-red-500/10 border border-red-500/20 text-red-400 rounded-xl px-4 py-3 text-sm mb-6">
              <span>⚠</span>
              <span>You don&apos;t have permission to access that page.</span>
            </div>
          )}
          {params.error === "CredentialsSignin" && (
            <div className="flex items-center gap-3 bg-red-500/10 border border-red-500/20 text-red-400 rounded-xl px-4 py-3 text-sm mb-6">
              <span>⚠</span>
              <span>Invalid email or password. Please try again.</span>
            </div>
          )}

          {/* Form — replace action with your auth endpoint */}
          <form
            action="/api/admin/auth/login"
            method="POST"
            className="space-y-5">
            {params.callbackUrl && (
              <input
                type="hidden"
                name="callbackUrl"
                value={params.callbackUrl}
              />
            )}

            <div className="space-y-1.5">
              <label
                htmlFor="email"
                className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                Email Address
              </label>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                className="w-full bg-white/5 border border-white/10 focus:border-amber-400/50 focus:ring-2 focus:ring-amber-400/20 rounded-xl px-4 py-3 text-white placeholder:text-slate-600 text-sm outline-none transition-all"
                placeholder="admin@solarstore.com"
              />
            </div>

            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <label
                  htmlFor="password"
                  className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                  Password
                </label>
                <Link
                  href="/admin/forgot-password"
                  className="text-xs text-amber-500 hover:text-amber-400 font-semibold">
                  Forgot password?
                </Link>
              </div>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                className="w-full bg-white/5 border border-white/10 focus:border-amber-400/50 focus:ring-2 focus:ring-amber-400/20 rounded-xl px-4 py-3 text-white placeholder:text-slate-600 text-sm outline-none transition-all"
                placeholder="••••••••••••"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-amber-400 hover:bg-amber-300 active:scale-[0.98] text-[#050A18] font-black py-3.5 rounded-xl transition-all duration-200 text-sm shadow-lg hover:shadow-amber-400/30 mt-2">
              Sign in to Dashboard
            </button>
          </form>

          <p className="text-center text-xs text-slate-600 mt-6">
            Admin access only. Unauthorised access is prohibited.
          </p>
        </div>

        <p className="text-center mt-6">
          <Link
            href="/"
            className="text-slate-600 hover:text-slate-400 text-xs transition-colors">
            ← Back to SolarStore
          </Link>
        </p>
      </div>
    </div>
  );
}

function SunIcon() {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="#050A18"
      strokeWidth="2.5"
      strokeLinecap="round">
      <circle cx="12" cy="12" r="5" />
      <line x1="12" y1="1" x2="12" y2="3" />
      <line x1="12" y1="21" x2="12" y2="23" />
      <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
      <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
      <line x1="1" y1="12" x2="3" y2="12" />
      <line x1="21" y1="12" x2="23" y2="12" />
      <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
      <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
    </svg>
  );
}
