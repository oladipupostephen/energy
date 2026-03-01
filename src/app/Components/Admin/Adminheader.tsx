"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState, useRef, useEffect } from "react";
import Image from "next/image";

/* ─────────────────────────────────────────────
   BREADCRUMB RESOLVER
   Maps pathnames to readable breadcrumb labels
───────────────────────────────────────────── */
const ROUTE_LABELS: Record<string, string> = {
  admin: "Admin",
  dashboard: "Dashboard",
  products: "Products",
  orders: "Orders",
  customers: "Customers",
  inventory: "Inventory",
  coupons: "Coupons",
  returns: "Returns",
  analytics: "Analytics",
  reviews: "Reviews",
  settings: "Settings",
  users: "User Management",
  new: "New",
  edit: "Edit",
};

function useBreadcrumbs() {
  const pathname = usePathname();
  const segments = pathname.split("/").filter(Boolean);
  return segments.map((seg, i) => ({
    label: ROUTE_LABELS[seg] ?? seg.charAt(0).toUpperCase() + seg.slice(1),
    href: "/" + segments.slice(0, i + 1).join("/"),
    isLast: i === segments.length - 1,
  }));
}

/* ─────────────────────────────────────────────
   MOCK NOTIFICATIONS
───────────────────────────────────────────── */
const NOTIFICATIONS = [
  {
    id: "1",
    text: "Order #8821 is awaiting fulfilment",
    time: "2m ago",
    unread: true,
  },
  {
    id: "2",
    text: "Low stock alert: Renogy 400W (3 left)",
    time: "14m ago",
    unread: true,
  },
  {
    id: "3",
    text: "New review requires moderation",
    time: "1h ago",
    unread: true,
  },
  {
    id: "4",
    text: "Return request #R042 approved",
    time: "3h ago",
    unread: false,
  },
];

/* ─────────────────────────────────────────────
   MOCK ADMIN USER
   Replace with session data (next-auth / custom)
───────────────────────────────────────────── */
const ADMIN_USER = {
  name: "Sarah Mitchell",
  email: "sarah@solarstore.com",
  role: "SUPER_ADMIN" as "ADMIN" | "SUPER_ADMIN",
  avatar:
    "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&q=80",
};

/* ─────────────────────────────────────────────
   HEADER COMPONENT
───────────────────────────────────────────── */
interface AdminHeaderProps {
  onMobileMenuOpen: () => void;
  sidebarCollapsed: boolean;
}

export default function AdminHeader({
  onMobileMenuOpen,
  sidebarCollapsed,
}: AdminHeaderProps) {
  const breadcrumbs = useBreadcrumbs();
  const router = useRouter();
  const [notifOpen, setNotifOpen] = useState(false);
  const [userOpen, setUserOpen] = useState(false);
  const notifRef = useRef<HTMLDivElement>(null);
  const userRef = useRef<HTMLDivElement>(null);

  const unreadCount = NOTIFICATIONS.filter((n) => n.unread).length;

  // Close dropdowns on outside click
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (notifRef.current && !notifRef.current.contains(e.target as Node))
        setNotifOpen(false);
      if (userRef.current && !userRef.current.contains(e.target as Node))
        setUserOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const handleLogout = () => {
    // Replace with your actual logout logic (e.g. signOut() from next-auth)
    router.push("/admin/login");
  };

  return (
    <header className="h-16 flex items-center bg-white border-b border-slate-100 px-4 lg:px-6 gap-4 z-30 sticky top-0">
      {/* ── Mobile hamburger ── */}
      <button
        onClick={onMobileMenuOpen}
        className="lg:hidden w-9 h-9 flex items-center justify-center rounded-xl text-slate-500 hover:text-slate-800 hover:bg-slate-100 transition-colors"
        aria-label="Open navigation menu">
        <HamburgerIcon />
      </button>

      {/* ── Breadcrumbs ── */}
      <nav
        aria-label="Breadcrumb"
        className="flex items-center gap-1.5 flex-1 min-w-0">
        {breadcrumbs.map((crumb, i) => (
          <span key={crumb.href} className="flex items-center gap-1.5 min-w-0">
            {i > 0 && (
              <ChevronRightIcon className="w-3.5 h-3.5 text-slate-300 shrink-0" />
            )}
            {crumb.isLast ? (
              <span className="text-sm font-display font-bold text-slate-800 truncate">
                {crumb.label}
              </span>
            ) : (
              <Link
                href={crumb.href}
                className="text-sm font-medium text-slate-400 hover:text-slate-700 transition-colors truncate">
                {crumb.label}
              </Link>
            )}
          </span>
        ))}
      </nav>

      {/* ── Right actions ── */}
      <div className="flex items-center gap-2 shrink-0">
        {/* Search shortcut */}
        <button
          className="hidden md:flex items-center gap-2 text-slate-400 hover:text-slate-700 border border-slate-200 hover:border-slate-300 rounded-xl px-3 py-2 text-xs font-medium transition-all bg-slate-50 hover:bg-white"
          aria-label="Search (⌘K)">
          <SearchIcon />
          <span className="text-slate-500">Search</span>
          <kbd className="ml-1 text-[10px] bg-white border border-slate-200 text-slate-400 px-1.5 py-0.5 rounded font-mono">
            ⌘K
          </kbd>
        </button>

        {/* Notifications */}
        <div className="relative" ref={notifRef}>
          <button
            onClick={() => {
              setNotifOpen((o) => !o);
              setUserOpen(false);
            }}
            className="relative w-9 h-9 flex items-center justify-center rounded-xl text-slate-500 hover:text-slate-800 hover:bg-slate-100 transition-colors"
            aria-label={`Notifications (${unreadCount} unread)`}
            aria-expanded={notifOpen}>
            <BellIcon />
            {unreadCount > 0 && (
              <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-amber-400 ring-2 ring-white" />
            )}
          </button>

          {notifOpen && (
            <div className="absolute right-0 top-full mt-2 w-80 bg-white border border-slate-100 rounded-2xl shadow-2xl overflow-hidden z-50 animate-scale-in">
              <div className="px-4 py-3 border-b border-slate-100 flex items-center justify-between">
                <span className="font-display font-bold text-slate-800 text-sm">
                  Notifications
                </span>
                <button className="text-xs text-amber-600 hover:text-amber-700 font-semibold">
                  Mark all read
                </button>
              </div>
              <div className="divide-y divide-slate-50 max-h-72 overflow-y-auto">
                {NOTIFICATIONS.map((n) => (
                  <div
                    key={n.id}
                    className={`flex items-start gap-3 px-4 py-3 hover:bg-slate-50 transition-colors cursor-pointer ${n.unread ? "bg-amber-50/50" : ""}`}>
                    <div
                      className={`w-1.5 h-1.5 rounded-full mt-2 shrink-0 ${n.unread ? "bg-amber-400" : "bg-slate-200"}`}
                    />
                    <div className="min-w-0 flex-1">
                      <p className="text-xs text-slate-700 font-medium leading-snug">
                        {n.text}
                      </p>
                      <p className="text-[11px] text-slate-400 mt-0.5">
                        {n.time}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
              <div className="px-4 py-2.5 border-t border-slate-100">
                <Link
                  href="/admin/notifications"
                  className="text-xs text-amber-600 hover:text-amber-700 font-semibold"
                  onClick={() => setNotifOpen(false)}>
                  View all notifications →
                </Link>
              </div>
            </div>
          )}
        </div>

        {/* User menu */}
        <div className="relative" ref={userRef}>
          <button
            onClick={() => {
              setUserOpen((o) => !o);
              setNotifOpen(false);
            }}
            className="flex items-center gap-2.5 pl-1 pr-3 py-1 rounded-xl hover:bg-slate-100 transition-colors"
            aria-label="User menu"
            aria-expanded={userOpen}>
            {/* Avatar */}
            <div className="relative w-8 h-8 rounded-full overflow-hidden border-2 border-amber-400/30 shrink-0">
              <Image
                src={ADMIN_USER.avatar}
                alt={ADMIN_USER.name}
                fill
                sizes="32px"
                className="object-cover"
              />
            </div>
            {/* Name + role */}
            <div className="hidden md:block text-left">
              <div className="text-xs font-display font-bold text-slate-800 leading-tight">
                {ADMIN_USER.name.split(" ")[0]}
              </div>
              <RoleBadge role={ADMIN_USER.role} />
            </div>
            <ChevronDownIcon
              className={`hidden md:block w-3.5 h-3.5 text-slate-400 transition-transform duration-200 ${userOpen ? "rotate-180" : ""}`}
            />
          </button>

          {userOpen && (
            <div className="absolute right-0 top-full mt-2 w-60 bg-white border border-slate-100 rounded-2xl shadow-2xl overflow-hidden z-50 animate-scale-in">
              {/* User info */}
              <div className="px-4 py-4 border-b border-slate-100 bg-slate-50">
                <div className="flex items-center gap-3">
                  <div className="relative w-10 h-10 rounded-full overflow-hidden border-2 border-amber-400/30 shrink-0">
                    <Image
                      src={ADMIN_USER.avatar}
                      alt={ADMIN_USER.name}
                      fill
                      sizes="40px"
                      className="object-cover"
                    />
                  </div>
                  <div className="min-w-0">
                    <div className="font-display font-bold text-slate-800 text-sm truncate">
                      {ADMIN_USER.name}
                    </div>
                    <div className="text-xs text-slate-500 truncate">
                      {ADMIN_USER.email}
                    </div>
                    <div className="mt-1">
                      <RoleBadge role={ADMIN_USER.role} />
                    </div>
                  </div>
                </div>
              </div>

              {/* Menu items */}
              <div className="py-1.5">
                {[
                  {
                    href: "/admin/settings/profile",
                    label: "My Profile",
                    icon: <UserIcon />,
                  },
                  {
                    href: "/admin/settings",
                    label: "Settings",
                    icon: <SettingsIcon />,
                  },
                  {
                    href: "/admin/audit",
                    label: "Audit Log",
                    icon: <AuditIcon />,
                  },
                ].map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setUserOpen(false)}
                    className="flex items-center gap-3 px-4 py-2.5 text-sm text-slate-600 hover:text-slate-900 hover:bg-slate-50 transition-colors">
                    <span className="text-slate-400">{item.icon}</span>
                    {item.label}
                  </Link>
                ))}
              </div>

              {/* Logout */}
              <div className="border-t border-slate-100 py-1.5">
                <button
                  onClick={handleLogout}
                  className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-red-500 hover:text-red-600 hover:bg-red-50 transition-colors">
                  <LogoutIcon />
                  Sign out
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}

/* ─────────────────────────────────────────────
   ROLE BADGE
───────────────────────────────────────────── */
export function RoleBadge({ role }: { role: "ADMIN" | "SUPER_ADMIN" }) {
  const isSuperAdmin = role === "SUPER_ADMIN";
  return (
    <span
      className={[
        "inline-flex items-center gap-1 text-[9px] font-black uppercase tracking-wider px-1.5 py-0.5 rounded",
        isSuperAdmin
          ? "bg-amber-400/20 text-amber-600 border border-amber-400/30"
          : "bg-slate-200 text-slate-500 border border-slate-300",
      ].join(" ")}>
      {isSuperAdmin && <span>★</span>}
      {isSuperAdmin ? "Super Admin" : "Admin"}
    </span>
  );
}

/* ─────────────────────────────────────────────
   ICONS
───────────────────────────────────────────── */
function HamburgerIcon() {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round">
      <line x1="3" y1="6" x2="21" y2="6" />
      <line x1="3" y1="12" x2="21" y2="12" />
      <line x1="3" y1="18" x2="21" y2="18" />
    </svg>
  );
}
function ChevronRightIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round">
      <polyline points="9 18 15 12 9 6" />
    </svg>
  );
}
function ChevronDownIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round">
      <polyline points="6 9 12 15 18 9" />
    </svg>
  );
}
function SearchIcon() {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round">
      <circle cx="11" cy="11" r="8" />
      <line x1="21" y1="21" x2="16.65" y2="16.65" />
    </svg>
  );
}
function BellIcon() {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round">
      <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
      <path d="M13.73 21a2 2 0 0 1-3.46 0" />
    </svg>
  );
}
function UserIcon() {
  return (
    <svg
      width="15"
      height="15"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round">
      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
      <circle cx="12" cy="7" r="4" />
    </svg>
  );
}
function SettingsIcon() {
  return (
    <svg
      width="15"
      height="15"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round">
      <circle cx="12" cy="12" r="3" />
      <path d="M19.07 4.93l-1.41 1.41M4.93 4.93l1.41 1.41M12 2v2M12 20v2M19.07 19.07l-1.41-1.41M4.93 19.07l1.41-1.41M2 12h2M20 12h2" />
    </svg>
  );
}
function AuditIcon() {
  return (
    <svg
      width="15"
      height="15"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round">
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
      <polyline points="14 2 14 8 20 8" />
      <line x1="16" y1="13" x2="8" y2="13" />
      <line x1="16" y1="17" x2="8" y2="17" />
      <polyline points="10 9 9 9 8 9" />
    </svg>
  );
}
function LogoutIcon() {
  return (
    <svg
      width="15"
      height="15"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round">
      <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
      <polyline points="16 17 21 12 16 7" />
      <line x1="21" y1="12" x2="9" y2="12" />
    </svg>
  );
}
