/**
 * TrustStrip
 * A horizontally scrolling strip of trust signals:
 * certifications (UL, CEC), shipping perks, and return policy.
 *
 * Reuse on: Homepage, Product pages, Checkout pages
 */
export default function TrustStrip() {
  return (
    <section className="bg-[#0A1628] border-y border-white/5 py-5 overflow-hidden">
      <div className="group flex items-center gap-0 animate-marquee whitespace-nowrap hover:[animation-play-state:paused]">
        {/* Duplicate for seamless loop */}
        {[...trustItems, ...trustItems].map((item, i) => (
          <div key={i} className="inline-flex items-center gap-3 px-8 shrink-0">
            <span className="text-amber-400">{item.icon}</span>
            <span className="text-sm font-semibold text-slate-200 tracking-wide uppercase">
              {item.label}
            </span>
            <span className="w-px h-5 bg-white/10 ml-4" aria-hidden="true" />
          </div>
        ))}
      </div>
    </section>
  );
}

const trustItems = [
  {
    icon: <ULIcon />,
    label: "UL Certified Products",
  },
  {
    icon: <CECIcon />,
    label: "CEC Approved",
  },
  {
    icon: <TruckIcon />,
    label: "Free Shipping over $500",
  },
  {
    icon: <ReturnIcon />,
    label: "30-Day Returns",
  },
  {
    icon: <ShieldIcon />,
    label: "25-Year Panel Warranties",
  },
  {
    icon: <LockIcon />,
    label: "Secure Checkout",
  },
  {
    icon: <StarIcon />,
    label: "4.9★ Avg. Rating",
  },
  {
    icon: <PhoneIcon />,
    label: "Expert Solar Support",
  },
];

/* ── Inline SVG icons ── */
function ULIcon() {
  return (
    <svg
      width="22"
      height="22"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round">
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      <path d="M9 12l2 2 4-4" />
    </svg>
  );
}
function CECIcon() {
  return (
    <svg
      width="22"
      height="22"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round">
      <circle cx="12" cy="12" r="10" />
      <path d="M14.83 9.17A4 4 0 1 0 12 16a4 4 0 0 0 2.83-1.17" />
    </svg>
  );
}
function TruckIcon() {
  return (
    <svg
      width="22"
      height="22"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round">
      <rect x="1" y="3" width="15" height="13" />
      <polygon points="16 8 20 8 23 11 23 16 16 16 16 8" />
      <circle cx="5.5" cy="18.5" r="2.5" />
      <circle cx="18.5" cy="18.5" r="2.5" />
    </svg>
  );
}
function ReturnIcon() {
  return (
    <svg
      width="22"
      height="22"
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
function ShieldIcon() {
  return (
    <svg
      width="22"
      height="22"
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
function LockIcon() {
  return (
    <svg
      width="22"
      height="22"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round">
      <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
      <path d="M7 11V7a5 5 0 0 1 10 0v4" />
    </svg>
  );
}
function StarIcon() {
  return (
    <svg
      width="22"
      height="22"
      viewBox="0 0 24 24"
      fill="currentColor"
      stroke="currentColor"
      strokeWidth="1">
      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
    </svg>
  );
}
function PhoneIcon() {
  return (
    <svg
      width="22"
      height="22"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round">
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 13a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.6 2.18h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
    </svg>
  );
}
