import type { Metadata } from "next";
import AdminLayoutClient from "../Components/Admin/Adminlayoutclient";

export const metadata: Metadata = {
  title: {
    default: "Admin Dashboard — SolarStore",
    template: "%s | SolarStore Admin",
  },
  description:
    "SolarStore admin control panel — manage products, orders, customers and analytics.",
  robots: { index: false, follow: false },
};

/**
 * AdminLayout — Server Component
 *
 * Renders the sidebar + header shell for all /admin/* routes.
 * Auth/RBAC is intentionally skipped for now — plug in your
 * session check here when you are ready (next-auth, custom JWT, etc.)
 *
 * /admin/login lives in app/admin/(auth)/ and has its own
 * standalone layout so it is never wrapped by this shell.
 */
export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <AdminLayoutClient>{children}</AdminLayoutClient>;
}
