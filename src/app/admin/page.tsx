"use client";
import type { Metadata } from "next";
import Link from "next/link";

// export const metadata: Metadata = {
//   title: "Dashboard",
// };

/* ─────────────────────────────────────────────
   MOCK DATA — replace with real DB queries
───────────────────────────────────────────── */
const STATS = [
  {
    label: "Revenue (30d)",
    value: "$184,230",
    change: "+12.4%",
    positive: true,
    icon: <RevenueIcon />,
    href: "/admin/analytics",
    color: "amber",
  },
  {
    label: "Orders",
    value: "1,284",
    change: "+8.1%",
    positive: true,
    icon: <OrdersIcon />,
    href: "/admin/orders",
    color: "blue",
  },
  {
    label: "Customers",
    value: "9,471",
    change: "+3.2%",
    positive: true,
    icon: <CustomersIcon />,
    href: "/admin/customers",
    color: "green",
  },
  {
    label: "Avg. Order Value",
    value: "$143.40",
    change: "-2.1%",
    positive: false,
    icon: <AOVIcon />,
    href: "/admin/analytics",
    color: "purple",
  },
];

const RECENT_ORDERS = [
  {
    id: "#8841",
    customer: "Marcus Thompson",
    product: "Renogy 400W × 4",
    amount: "$1,156",
    status: "Fulfilled",
    statusColor: "green",
  },
  {
    id: "#8840",
    customer: "Lisa Park",
    product: "Enphase IQ8+ × 8",
    amount: "$1,592",
    status: "Processing",
    statusColor: "amber",
  },
  {
    id: "#8839",
    customer: "David Kim",
    product: "Sol-Ark 15K Inverter",
    amount: "$3,299",
    status: "Pending",
    statusColor: "slate",
  },
  {
    id: "#8838",
    customer: "Sarah Johnson",
    product: "LG Chem RESU10H",
    amount: "$4,999",
    status: "Fulfilled",
    statusColor: "green",
  },
  {
    id: "#8837",
    customer: "TechBuild Corp",
    product: "Bulk: Mixed × 120",
    amount: "$42,800",
    status: "Processing",
    statusColor: "amber",
  },
];

const ALERTS = [
  {
    type: "warning",
    message: "Renogy 400W Mono — only 3 units remaining",
    href: "/admin/inventory",
  },
  {
    type: "warning",
    message: "Sol-Ark 15K — 0 units in stock",
    href: "/admin/inventory",
  },
  {
    type: "info",
    message: "7 customer reviews awaiting moderation",
    href: "/admin/reviews",
  },
  {
    type: "error",
    message: "4 return requests need your attention",
    href: "/admin/returns",
  },
];

/* ─────────────────────────────────────────────
   PAGE — Server Component
───────────────────────────────────────────── */
export default function AdminDashboardPage() {
  const now = new Date();
  const greeting =
    now.getHours() < 12
      ? "Good morning"
      : now.getHours() < 18
        ? "Good afternoon"
        : "Good evening";

  return (
    <div className="space-y-8 max-w-400">
      {/* ── Page header ── */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-display font-black text-2xl text-slate-800">
            {greeting}, Sarah 👋
          </h1>
          <p className="text-slate-500 text-sm mt-1">
            Here&apos;s what&apos;s happening in your store today.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Link
            href="/admin/products/new"
            className="inline-flex items-center gap-2 bg-[#0A1628] hover:bg-[#162B55] text-white font-semibold text-sm px-4 py-2.5 rounded-xl transition-colors">
            <PlusIcon />
            Add Product
          </Link>
          <Link
            href="/admin/analytics"
            className="inline-flex items-center gap-2 border border-slate-200 hover:border-slate-300 text-slate-600 hover:text-slate-900 font-semibold text-sm px-4 py-2.5 rounded-xl bg-white hover:bg-slate-50 transition-all">
            <AnalyticsIcon />
            Analytics
          </Link>
        </div>
      </div>

      {/* ── Alert strip ── */}
      {ALERTS.length > 0 && (
        <div className="grid sm:grid-cols-2 xl:grid-cols-4 gap-3">
          {ALERTS.map((alert, i) => (
            <Link
              key={i}
              href={alert.href}
              className={[
                "flex items-center gap-3 px-4 py-3 rounded-xl border text-sm font-medium transition-all hover:scale-[1.01]",
                alert.type === "error"
                  ? "bg-red-50 border-red-200 text-red-700 hover:bg-red-100"
                  : alert.type === "warning"
                    ? "bg-amber-50 border-amber-200 text-amber-700 hover:bg-amber-100"
                    : "bg-blue-50 border-blue-200 text-blue-700 hover:bg-blue-100",
              ].join(" ")}>
              <span className="shrink-0">
                {alert.type === "error" ? (
                  <AlertCircleIcon />
                ) : alert.type === "warning" ? (
                  <AlertTriangleIcon />
                ) : (
                  <InfoIcon />
                )}
              </span>
              <span className="truncate">{alert.message}</span>
              <span className="ml-auto shrink-0">
                <ChevronRightSmIcon />
              </span>
            </Link>
          ))}
        </div>
      )}

      {/* ── KPI stats grid ── */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        {STATS.map((stat) => (
          <Link
            key={stat.label}
            href={stat.href}
            className="group bg-white rounded-2xl border border-slate-100 p-5 hover:shadow-lg hover:-translate-y-0.5 transition-all duration-200">
            <div className="flex items-start justify-between mb-4">
              <div
                className={[
                  "w-10 h-10 rounded-xl flex items-center justify-center",
                  stat.color === "amber"
                    ? "bg-amber-50 text-amber-600"
                    : stat.color === "blue"
                      ? "bg-blue-50  text-blue-600"
                      : stat.color === "green"
                        ? "bg-green-50 text-green-600"
                        : "bg-purple-50 text-purple-600",
                ].join(" ")}>
                {stat.icon}
              </div>
              <span
                className={[
                  "text-xs font-bold px-2 py-1 rounded-full",
                  stat.positive
                    ? "text-green-700 bg-green-50"
                    : "text-red-600 bg-red-50",
                ].join(" ")}>
                {stat.change}
              </span>
            </div>
            <div className="font-display font-black text-2xl text-slate-800 mb-1">
              {stat.value}
            </div>
            <div className="text-sm text-slate-500">{stat.label}</div>
          </Link>
        ))}
      </div>

      {/* ── Recent orders + quick actions ── */}
      <div className="grid xl:grid-cols-3 gap-6">
        {/* Recent orders table */}
        <div className="xl:col-span-2 bg-white rounded-2xl border border-slate-100 overflow-hidden">
          <div className="flex items-center justify-between px-5 py-4 border-b border-slate-100">
            <h2 className="font-display font-bold text-slate-800">
              Recent Orders
            </h2>
            <Link
              href="/admin/orders"
              className="text-xs font-semibold text-amber-600 hover:text-amber-700">
              View all →
            </Link>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-slate-50 text-left">
                  <th className="px-5 py-3 text-xs font-bold text-slate-500 uppercase tracking-wider">
                    Order
                  </th>
                  <th className="px-5 py-3 text-xs font-bold text-slate-500 uppercase tracking-wider">
                    Customer
                  </th>
                  <th className="px-5 py-3 text-xs font-bold text-slate-500 uppercase tracking-wider hidden md:table-cell">
                    Product
                  </th>
                  <th className="px-5 py-3 text-xs font-bold text-slate-500 uppercase tracking-wider">
                    Amount
                  </th>
                  <th className="px-5 py-3 text-xs font-bold text-slate-500 uppercase tracking-wider">
                    Status
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {RECENT_ORDERS.map((order) => (
                  <tr
                    key={order.id}
                    className="hover:bg-slate-50/50 transition-colors">
                    <td className="px-5 py-3.5">
                      <Link
                        href={`/admin/orders/${order.id}`}
                        className="font-mono font-bold text-[#0A1628] hover:text-amber-600 transition-colors text-xs">
                        {order.id}
                      </Link>
                    </td>
                    <td className="px-5 py-3.5 font-medium text-slate-700 whitespace-nowrap">
                      {order.customer}
                    </td>
                    <td className="px-5 py-3.5 text-slate-500 hidden md:table-cell truncate max-w-45">
                      {order.product}
                    </td>
                    <td className="px-5 py-3.5 font-display font-bold text-slate-800 whitespace-nowrap">
                      {order.amount}
                    </td>
                    <td className="px-5 py-3.5">
                      <StatusBadge
                        status={order.status}
                        color={
                          order.statusColor as
                            | "green"
                            | "amber"
                            | "slate"
                            | "red"
                        }
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Quick actions */}
        <div className="space-y-4">
          {/* Quick actions card */}
          <div className="bg-white rounded-2xl border border-slate-100 p-5">
            <h2 className="font-display font-bold text-slate-800 mb-4">
              Quick Actions
            </h2>
            <div className="space-y-2">
              {QUICK_ACTIONS.map((action) => (
                <Link
                  key={action.href}
                  href={action.href}
                  className="flex items-center gap-3 p-3 rounded-xl hover:bg-slate-50 transition-colors group">
                  <div className="w-8 h-8 rounded-lg bg-slate-100 group-hover:bg-amber-50 flex items-center justify-center text-slate-500 group-hover:text-amber-600 transition-colors shrink-0">
                    {action.icon}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-sm font-semibold text-slate-700 group-hover:text-slate-900 truncate">
                      {action.label}
                    </div>
                    <div className="text-xs text-slate-400 truncate">
                      {action.desc}
                    </div>
                  </div>
                  <ChevronRightSmIcon />
                </Link>
              ))}
            </div>
          </div>

          {/* Store health mini card */}
          <div className="bg-linear-to-br from-[#050A18] to-[#162B55] rounded-2xl p-5 text-white">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-display font-bold text-sm">Store Health</h3>
              <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
            </div>
            <div className="space-y-3">
              {[
                { label: "Uptime", value: "99.98%", bar: 99 },
                { label: "Avg. Load Time", value: "0.8s", bar: 82 },
                { label: "In-Stock Rate", value: "94.2%", bar: 94 },
              ].map((m) => (
                <div key={m.label}>
                  <div className="flex justify-between text-xs mb-1">
                    <span className="text-slate-400">{m.label}</span>
                    <span className="text-white font-bold">{m.value}</span>
                  </div>
                  <div className="h-1.5 bg-white/10 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-amber-400 rounded-full"
                      style={{ width: `${m.bar}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────
   STATUS BADGE
───────────────────────────────────────────── */
function StatusBadge({
  status,
  color,
}: {
  status: string;
  color: "green" | "amber" | "slate" | "red";
}) {
  const styles = {
    green: "bg-green-50 text-green-700 border-green-200",
    amber: "bg-amber-50 text-amber-700 border-amber-200",
    slate: "bg-slate-100 text-slate-600 border-slate-200",
    red: "bg-red-50 text-red-600 border-red-200",
  };
  return (
    <span
      className={`inline-flex items-center text-[11px] font-bold px-2 py-0.5 rounded-full border ${styles[color]}`}>
      {status}
    </span>
  );
}

/* ─────────────────────────────────────────────
   QUICK ACTIONS DATA
───────────────────────────────────────────── */
const QUICK_ACTIONS = [
  {
    href: "/admin/products/new",
    label: "Add new product",
    desc: "Create a product listing",
    icon: <PlusIcon />,
  },
  {
    href: "/admin/coupons/new",
    label: "Create coupon",
    desc: "Set up a promo code",
    icon: <TagIcon />,
  },
  {
    href: "/admin/orders?filter=pending",
    label: "Review pending orders",
    desc: "12 orders awaiting",
    icon: <OrdersIcon />,
  },
  {
    href: "/admin/returns",
    label: "Process returns",
    desc: "4 requests open",
    icon: <ReturnIcon />,
  },
  {
    href: "/admin/reviews",
    label: "Moderate reviews",
    desc: "7 reviews in queue",
    icon: <StarIcon />,
  },
];

/* ─────────────────────────────────────────────
   ICONS
───────────────────────────────────────────── */
function RevenueIcon() {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round">
      <line x1="12" y1="1" x2="12" y2="23" />
      <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
    </svg>
  );
}
function OrdersIcon() {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round">
      <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
      <line x1="3" y1="6" x2="21" y2="6" />
      <path d="M16 10a4 4 0 0 1-8 0" />
    </svg>
  );
}
function CustomersIcon() {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round">
      <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
      <path d="M16 3.13a4 4 0 0 1 0 7.75" />
    </svg>
  );
}
function AOVIcon() {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round">
      <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
    </svg>
  );
}
function AnalyticsIcon() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round">
      <line x1="18" y1="20" x2="18" y2="10" />
      <line x1="12" y1="20" x2="12" y2="4" />
      <line x1="6" y1="20" x2="6" y2="14" />
    </svg>
  );
}
function PlusIcon() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round">
      <line x1="12" y1="5" x2="12" y2="19" />
      <line x1="5" y1="12" x2="19" y2="12" />
    </svg>
  );
}
function TagIcon() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round">
      <path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z" />
      <line x1="7" y1="7" x2="7.01" y2="7" />
    </svg>
  );
}
function ReturnIcon() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round">
      <polyline points="1 4 1 10 7 10" />
      <path d="M3.51 15a9 9 0 1 0 .49-3.08" />
    </svg>
  );
}
function StarIcon() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round">
      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
    </svg>
  );
}
function ChevronRightSmIcon() {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round">
      <polyline points="9 18 15 12 9 6" />
    </svg>
  );
}
function AlertCircleIcon() {
  return (
    <svg
      width="15"
      height="15"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round">
      <circle cx="12" cy="12" r="10" />
      <line x1="12" y1="8" x2="12" y2="12" />
      <line x1="12" y1="16" x2="12.01" y2="16" />
    </svg>
  );
}
function AlertTriangleIcon() {
  return (
    <svg
      width="15"
      height="15"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round">
      <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
      <line x1="12" y1="9" x2="12" y2="13" />
      <line x1="12" y1="17" x2="12.01" y2="17" />
    </svg>
  );
}
function InfoIcon() {
  return (
    <svg
      width="15"
      height="15"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round">
      <circle cx="12" cy="12" r="10" />
      <line x1="12" y1="16" x2="12" y2="12" />
      <line x1="12" y1="8" x2="12.01" y2="8" />
    </svg>
  );
}
