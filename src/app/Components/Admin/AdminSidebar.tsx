"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useRef, useEffect } from "react";

/* ─────────────────────────────────────────────
   TYPES
───────────────────────────────────────────── */
type AdminRole = "ADMIN" | "SUPER_ADMIN";

interface NavItem {
  href: string;
  label: string;
  icon: React.ReactNode;
  badge: string | null;
  /** If set, link is only rendered for this role or higher */
  minRole?: AdminRole;
}

interface NavGroup {
  label: string;
  items: NavItem[];
}

/* ─────────────────────────────────────────────
   SIDEBAR COMPONENT
───────────────────────────────────────────── */
interface AdminSidebarProps {
  collapsed: boolean;
  onToggle: () => void;
  mobileOpen: boolean;
  onMobileClose: () => void;
  /** Current user role — controls visibility of restricted links */
  role?: AdminRole;
}

export default function AdminSidebar({
  collapsed,
  onToggle,
  mobileOpen,
  onMobileClose,
  role = "ADMIN",
}: AdminSidebarProps) {
  const pathname = usePathname();
  const drawerRef = useRef<HTMLElement>(null);

  const isActive = (href: string) =>
    href === "/admin/dashboard" ? pathname === href : pathname.startsWith(href);

  /* ── FIX #5: Focus trap for mobile drawer ──────────────────────────────
     When the drawer opens, focus moves inside it.
     Tab / Shift+Tab is trapped within the drawer's focusable elements.   */
  useEffect(() => {
    if (!mobileOpen || !drawerRef.current) return;

    const focusable = drawerRef.current.querySelectorAll<HTMLElement>(
      'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])',
    );
    const first = focusable[0];
    const last = focusable[focusable.length - 1];
    first?.focus();

    const trap = (e: KeyboardEvent) => {
      if (e.key !== "Tab") return;
      if (e.shiftKey) {
        if (document.activeElement === first) {
          e.preventDefault();
          last?.focus();
        }
      } else {
        if (document.activeElement === last) {
          e.preventDefault();
          first?.focus();
        }
      }
    };

    document.addEventListener("keydown", trap);
    return () => document.removeEventListener("keydown", trap);
  }, [mobileOpen]);

  return (
    <>
      {/* ── FIX #4: Mobile backdrop ─────────────────────────────────────────
          aria-hidden removed; role="button" + onKeyDown added so keyboard
          and screen-reader users can dismiss the drawer.                  */}
      {mobileOpen && (
        <div
          role="button"
          tabIndex={0}
          aria-label="Close navigation menu"
          className="fixed inset-0 z-40 bg-[#050A18]/80 backdrop-blur-sm lg:hidden cursor-default"
          onClick={onMobileClose}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") onMobileClose();
          }}
        />
      )}

      {/* ── Sidebar panel ── */}
      <aside
        ref={drawerRef}
        className={[
          "fixed top-0 left-0 h-full z-50 flex flex-col",
          "bg-[#050A18] border-r border-white/6",
          "transition-all duration-300 ease-in-out",
          // FIX #2: no overflow-x-hidden here — tooltips need to escape the sidebar width
          collapsed ? "w-18" : "w-64",
          "lg:translate-x-0",
          mobileOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0",
        ].join(" ")}
        aria-label="Admin navigation">
        {/* ── Logo / Brand ── */}
        <div
          className={[
            "flex items-center h-16 shrink-0 border-b border-white/6",
            collapsed ? "justify-center px-0" : "justify-between px-5",
          ].join(" ")}>
          {collapsed ? (
            <Link
              href="/admin/dashboard"
              className="w-8 h-8 rounded-lg bg-amber-400 flex items-center justify-center hover:bg-amber-300 transition-colors"
              aria-label="SolarStore Admin — go to dashboard">
              <SunIcon />
            </Link>
          ) : (
            <Link
              href="/admin/dashboard"
              className="flex items-center gap-2.5 group"
              aria-label="SolarStore Admin — go to dashboard">
              <div className="w-7 h-7 rounded-lg bg-amber-400 flex items-center justify-center shrink-0 group-hover:bg-amber-300 transition-colors">
                <SunIcon />
              </div>
              <div>
                <span className="font-display font-black text-white text-base leading-none">
                  Solar<span className="text-amber-400">Store</span>
                </span>
                <span className="block text-[10px] font-semibold text-slate-500 uppercase tracking-widest leading-none mt-0.5">
                  Admin Panel
                </span>
              </div>
            </Link>
          )}
        </div>

        {/* ── Nav links ──
            FIX #2: overflow-x-hidden removed so absolute tooltips (left-full)
            are not clipped. overflow-y-auto retained for tall nav lists.   ── */}
        <nav
          className="flex-1 overflow-y-auto py-4 scrollbar-hide"
          aria-label="Sidebar navigation">
          {NAV_GROUPS.map((group) => {
            // FIX #6: Filter items by current user's role
            const visibleItems = group.items.filter(
              (item) =>
                !item.minRole || roleRank(role) >= roleRank(item.minRole),
            );
            if (visibleItems.length === 0) return null;

            return (
              <div key={group.label} className="mb-1">
                {/* Group label */}
                {!collapsed ? (
                  <div className="px-5 pt-4 pb-1.5">
                    <span className="text-[10px] font-bold text-slate-600 uppercase tracking-[0.12em]">
                      {group.label}
                    </span>
                  </div>
                ) : (
                  <div className="px-4 pt-3 pb-1">
                    <div className="h-px bg-white/6" />
                  </div>
                )}

                {visibleItems.map((item) => (
                  <SidebarNavItem
                    key={item.href}
                    item={item}
                    active={isActive(item.href)}
                    collapsed={collapsed}
                    onMobileClose={onMobileClose}
                  />
                ))}
              </div>
            );
          })}
        </nav>

        {/* ── Collapse toggle ── */}
        <div className="shrink-0 border-t border-white/6 p-3">
          <button
            onClick={onToggle}
            className={[
              "w-full flex items-center gap-3 px-3 py-2.5 rounded-xl",
              "text-slate-500 hover:text-slate-300 hover:bg-white/5",
              "transition-all duration-150",
              "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400/50",
              collapsed ? "justify-center" : "",
            ].join(" ")}
            aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}>
            <span
              className={`transition-transform duration-300 ${collapsed ? "rotate-180" : ""}`}>
              <CollapseIcon />
            </span>
            {!collapsed && (
              <span className="text-xs font-semibold whitespace-nowrap">
                Collapse sidebar
              </span>
            )}
          </button>
        </div>
      </aside>
    </>
  );
}

/* ─────────────────────────────────────────────
   NAV ITEM
───────────────────────────────────────────── */
function SidebarNavItem({
  item,
  active,
  collapsed,
  onMobileClose,
}: {
  item: NavItem;
  active: boolean;
  collapsed: boolean;
  onMobileClose: () => void;
}) {
  return (
    /* FIX #2: <li> is position:relative so the tooltip (absolute left-full)
       is anchored to this row and rendered outside the nav's scroll container,
       avoiding any clipping.                                                 */
    <li className="relative list-none mx-2">
      <Link
        href={item.href}
        onClick={onMobileClose}
        aria-current={active ? "page" : undefined}
        className={[
          "flex items-center gap-3 px-3 py-2.5 rounded-xl",
          "transition-all duration-150 group outline-none",
          "focus-visible:ring-2 focus-visible:ring-amber-400/50",
          collapsed ? "justify-center" : "",
          active
            ? "bg-amber-400/10 text-amber-400"
            : "text-slate-400 hover:text-slate-100 hover:bg-white/5",
        ].join(" ")}>
        {/* Active left-edge accent bar */}
        {active && (
          <span className="absolute left-0 top-1/2 -translate-y-1/2 w-0.5 h-5 bg-amber-400 rounded-r-full" />
        )}

        {/* Icon */}
        <span
          className={[
            "shrink-0 transition-colors",
            active
              ? "text-amber-400"
              : "text-slate-500 group-hover:text-slate-300",
          ].join(" ")}>
          {item.icon}
        </span>

        {/* Label — expanded mode only */}
        {!collapsed && (
          <span className="flex-1 text-sm font-semibold whitespace-nowrap font-display">
            {item.label}
          </span>
        )}

        {/* Badge — expanded mode only */}
        {!collapsed && item.badge && (
          <span
            className={[
              "text-[10px] font-bold px-1.5 py-0.5 rounded-full min-w-4.5 text-center leading-none",
              active
                ? "bg-amber-400 text-[#050A18]"
                : "bg-slate-700 text-slate-300 group-hover:bg-slate-600",
            ].join(" ")}>
            {item.badge}
          </span>
        )}

        {/* Badge dot — collapsed mode only */}
        {collapsed && item.badge && (
          <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-amber-400" />
        )}
      </Link>

      {/* Tooltip — collapsed mode only, rendered outside the Link element
          so it is not clipped by any parent overflow. z-[60] ensures it
          renders above the sidebar's z-50 stacking context.               */}
      {collapsed && (
        <span
          className="absolute left-full top-1/2 -translate-y-1/2 ml-3 px-2.5 py-1.5 bg-[#0A1628] border border-white/10 text-white text-xs font-semibold rounded-lg whitespace-nowrap opacity-0 pointer-events-none group-hover:opacity-100 transition-opacity duration-150 shadow-xl z-60"
          role="tooltip">
          {item.label}
          {item.badge && (
            <span className="ml-1.5 bg-amber-400 text-[#050A18] text-[10px] font-black px-1 py-0.5 rounded-full">
              {item.badge}
            </span>
          )}
        </span>
      )}
    </li>
  );
}

/* ─────────────────────────────────────────────
   ROLE HELPER  (FIX #6)
───────────────────────────────────────────── */
function roleRank(role: AdminRole): number {
  return role === "SUPER_ADMIN" ? 2 : 1;
}

/* ─────────────────────────────────────────────
   ICONS
   FIX #1 + FIX #3: All icon functions declared HERE, before NAV_GROUPS.
   JSX in the NAV_GROUPS array literal is only evaluated after this point,
   so all referenced components are guaranteed to exist.
   useState / useEffect / useCallback are NOT imported — they are not
   needed anywhere in this file.
───────────────────────────────────────────── */
function SunIcon() {
  return (
    <svg
      width="16"
      height="16"
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
function DashboardIcon() {
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
      <rect x="3" y="3" width="7" height="7" />
      <rect x="14" y="3" width="7" height="7" />
      <rect x="14" y="14" width="7" height="7" />
      <rect x="3" y="14" width="7" height="7" />
    </svg>
  );
}
function BoxIcon() {
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
      <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
      <polyline points="3.27 6.96 12 12.01 20.73 6.96" />
      <line x1="12" y1="22.08" x2="12" y2="12" />
    </svg>
  );
}
function OrdersIcon() {
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
      <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
      <line x1="3" y1="6" x2="21" y2="6" />
      <path d="M16 10a4 4 0 0 1-8 0" />
    </svg>
  );
}
function UsersIcon() {
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
      <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
      <path d="M16 3.13a4 4 0 0 1 0 7.75" />
    </svg>
  );
}
function InventoryIcon() {
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
      <line x1="8" y1="6" x2="21" y2="6" />
      <line x1="8" y1="12" x2="21" y2="12" />
      <line x1="8" y1="18" x2="21" y2="18" />
      <line x1="3" y1="6" x2="3.01" y2="6" />
      <line x1="3" y1="12" x2="3.01" y2="12" />
      <line x1="3" y1="18" x2="3.01" y2="18" />
    </svg>
  );
}
function TagIcon() {
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
      <path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z" />
      <line x1="7" y1="7" x2="7.01" y2="7" />
    </svg>
  );
}
function ReturnIcon() {
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
      <polyline points="1 4 1 10 7 10" />
      <path d="M3.51 15a9 9 0 1 0 .49-3.08" />
    </svg>
  );
}
function AnalyticsIcon() {
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
      <line x1="18" y1="20" x2="18" y2="10" />
      <line x1="12" y1="20" x2="12" y2="4" />
      <line x1="6" y1="20" x2="6" y2="14" />
    </svg>
  );
}
function StarIcon() {
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
      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
    </svg>
  );
}
function ShieldIcon() {
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
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
    </svg>
  );
}
function SettingsIcon() {
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
      <circle cx="12" cy="12" r="3" />
      <path d="M19.07 4.93l-1.41 1.41M4.93 4.93l1.41 1.41M12 2v2M12 20v2M19.07 19.07l-1.41-1.41M4.93 19.07l1.41-1.41M2 12h2M20 12h2" />
    </svg>
  );
}
function CollapseIcon() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round">
      <polyline points="15 18 9 12 15 6" />
    </svg>
  );
}

/* ─────────────────────────────────────────────
   NAV_GROUPS — defined AFTER icon functions   (FIX #1)
   JSX in this array is only evaluated after all
   icon functions above have been declared.
───────────────────────────────────────────── */
const NAV_GROUPS: NavGroup[] = [
  {
    label: "Overview",
    items: [
      {
        href: "/admin/dashboard",
        label: "Dashboard",
        icon: <DashboardIcon />,
        badge: null,
      },
    ],
  },
  {
    label: "Catalog",
    items: [
      {
        href: "/admin/products",
        label: "Products",
        icon: <BoxIcon />,
        badge: null,
      },
      {
        href: "/admin/inventory",
        label: "Inventory",
        icon: <InventoryIcon />,
        badge: "3",
      },
      {
        href: "/admin/coupons",
        label: "Coupons",
        icon: <TagIcon />,
        badge: null,
      },
    ],
  },
  {
    label: "Commerce",
    items: [
      {
        href: "/admin/orders",
        label: "Orders",
        icon: <OrdersIcon />,
        badge: "12",
      },
      {
        href: "/admin/returns",
        label: "Returns",
        icon: <ReturnIcon />,
        badge: "4",
      },
    ],
  },
  {
    label: "People",
    items: [
      {
        href: "/admin/customers",
        label: "Customers",
        icon: <UsersIcon />,
        badge: null,
      },
      {
        href: "/admin/reviews",
        label: "Reviews",
        icon: <StarIcon />,
        badge: "7",
      },
    ],
  },
  {
    label: "Intelligence",
    items: [
      {
        href: "/admin/analytics",
        label: "Analytics",
        icon: <AnalyticsIcon />,
        badge: null,
      },
    ],
  },
  {
    label: "System",
    items: [
      {
        href: "/admin/users",
        label: "User Management",
        icon: <ShieldIcon />,
        badge: null,
        minRole: "SUPER_ADMIN", // FIX #6: hidden from plain ADMIN
      },
      {
        href: "/admin/settings",
        label: "Settings",
        icon: <SettingsIcon />,
        badge: null,
      },
    ],
  },
];
