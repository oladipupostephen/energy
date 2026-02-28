import type { Metadata } from "next";
import { redirect } from "next/navigation";
//import AdminLayoutClient from "@/components/admin/AdminLayoutClient";

/* ─────────────────────────────────────────────
   METADATA
───────────────────────────────────────────── */
export const metadata: Metadata = {
  title: {
    default: "Admin Dashboard — SolarStore",
    template: "%s | SolarStore Admin",
  },
  description:
    "SolarStore admin control panel — manage products, orders, customers and analytics.",
  robots: { index: false, follow: false }, // Never index admin pages
};

/* ─────────────────────────────────────────────
   RBAC AUTH CHECK
   Replace this stub with your real session check.
   e.g. getServerSession(authOptions) from next-auth,
        or cookies().get('admin_token') + JWT verify.
───────────────────────────────────────────── */
async function getAdminSession() {
  // ⚠️  STUB — replace with real auth logic
  // Example with next-auth:
  //   const session = await getServerSession(authOptions);
  //   if (!session || !["ADMIN","SUPER_ADMIN"].includes(session.user.role)) return null;
  //   return session;
  //
  // For now we return a mock session so the layout renders.
  return {
    user: {
      id: "usr_001",
      name: "Sarah Mitchell",
      email: "sarah@solarstore.com",
      role: "SUPER_ADMIN" as const,
    },
  };
}

/* ─────────────────────────────────────────────
   LAYOUT — Server Component
   Performs auth check server-side (fast redirect,
   no client-side flash) then renders the shell.
───────────────────────────────────────────── */
export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getAdminSession();

  // Not authenticated → redirect to login
  if (!session) {
    redirect("/admin/login");
  }

  // Not authorized (e.g. plain customer role) → redirect home
  if (!["ADMIN", "SUPER_ADMIN"].includes(session.user.role)) {
    redirect("/");
  }

  //   return <AdminLayoutClient>{children}</AdminLayoutClient>;
}
