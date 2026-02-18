"use client";
import Link from "next/link";

/**
 * SiteFooter
 * Full-width footer with navigation columns, newsletter signup,
 * certifications, and social links.
 *
 * Reuse on: All pages (root layout)
 */
export default function SiteFooter() {
  return (
    <footer className="bg-[#050A18] text-slate-300">
      {/* Newsletter band */}
      <div className="border-b border-white/5">
        <div className="max-w-7xl mx-auto px-6 lg:px-12 py-14">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <h3 className="font-display font-black text-2xl text-white mb-2">
                Solar deals, guides & incentive alerts.
              </h3>
              <p className="text-slate-400 text-sm">
                Join 80,000+ solar buyers getting our weekly newsletter.
              </p>
            </div>
            <form
              onSubmit={(e) => e.preventDefault()}
              className="flex gap-3 max-w-md ml-auto w-full">
              <input
                type="email"
                placeholder="your@email.com"
                className="flex-1 bg-white/5 border border-white/10 focus:border-amber-400/50 rounded-full px-5 py-3 text-white placeholder:text-slate-500 text-sm outline-none transition-colors"
                aria-label="Email address"
              />
              <button
                type="submit"
                className="bg-amber-400 hover:bg-amber-300 text-[#050A18] font-bold px-6 py-3 rounded-full text-sm transition-all hover:scale-105 whitespace-nowrap">
                Subscribe
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* Main footer grid */}
      <div className="max-w-7xl mx-auto px-6 lg:px-12 py-16">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-10">
          {/* Brand */}
          <div className="col-span-2 md:col-span-1 space-y-5">
            <Link href="/" className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-amber-400 flex items-center justify-center shrink-0">
                <SunIcon />
              </div>
              <span className="font-display font-black text-xl text-white">
                Solar<span className="text-amber-400">Store</span>
              </span>
            </Link>
            <p className="text-slate-400 text-sm leading-relaxed">
              America&apos;s largest solar equipment marketplace. Serving
              homeowners and businesses since 2018.
            </p>
            {/* Social links */}
            <div className="flex gap-3">
              {SOCIAL_LINKS.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  aria-label={s.label}
                  className="w-9 h-9 rounded-full border border-white/10 hover:border-amber-400/50 hover:text-amber-400 flex items-center justify-center text-slate-400 transition-all">
                  {s.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Nav columns */}
          {FOOTER_COLS.map((col) => (
            <div key={col.heading}>
              <h4 className="text-white font-display font-bold text-sm uppercase tracking-widest mb-5">
                {col.heading}
              </h4>
              <ul className="space-y-3">
                {col.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-slate-400 hover:text-white text-sm transition-colors">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/5">
        <div className="max-w-7xl mx-auto px-6 lg:px-12 py-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-slate-500 text-xs">
            © {new Date().getFullYear()} SolarStore Inc. All rights reserved.
          </p>
          <div className="flex flex-wrap items-center gap-x-6 gap-y-2">
            {/* Cert badges */}
            {["UL Listed", "CEC Approved", "NABCEP Partner", "BBB A+"].map(
              (cert) => (
                <span
                  key={cert}
                  className="text-xs text-slate-500 border border-white/10 px-2.5 py-1 rounded-full">
                  {cert}
                </span>
              ),
            )}
          </div>
          <div className="flex gap-4 text-xs text-slate-500">
            <Link
              href="/privacy"
              className="hover:text-white transition-colors">
              Privacy
            </Link>
            <Link href="/terms" className="hover:text-white transition-colors">
              Terms
            </Link>
            <Link
              href="/sitemap"
              className="hover:text-white transition-colors">
              Sitemap
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

/* ── Data ── */
const FOOTER_COLS = [
  {
    heading: "Shop",
    links: [
      { label: "Solar Panels", href: "/products?category=solar-panels" },
      { label: "Inverters", href: "/products?category=inverters" },
      { label: "Batteries", href: "/products?category=batteries" },
      { label: "Mounting & Racking", href: "/products?category=mounting" },
      { label: "Accessories", href: "/products?category=accessories" },
      { label: "Deals & Clearance", href: "/deals" },
    ],
  },
  {
    heading: "Tools",
    links: [
      { label: "Savings Calculator", href: "/calculator" },
      { label: "System Builder", href: "/builder" },
      { label: "Financing Calculator", href: "/financing" },
      { label: "Gov. Incentives", href: "/incentives" },
      { label: "Installer Directory", href: "/installers" },
      { label: "Bulk Orders", href: "/bulk" },
    ],
  },
  {
    heading: "Support",
    links: [
      { label: "Help Center", href: "/help" },
      { label: "Track Order", href: "/account/orders" },
      { label: "Returns & Refunds", href: "/returns" },
      { label: "Shipping Policy", href: "/shipping" },
      { label: "Warranty Claims", href: "/warranty" },
      { label: "Contact Us", href: "/contact" },
    ],
  },
  {
    heading: "Company",
    links: [
      { label: "About Us", href: "/about" },
      { label: "Blog & Guides", href: "/learn" },
      { label: "Careers", href: "/careers" },
      { label: "Press", href: "/press" },
      { label: "Affiliates", href: "/affiliates" },
      { label: "Partner Installers", href: "/installers/partner" },
    ],
  },
];

const SOCIAL_LINKS = [
  {
    label: "Twitter",
    href: "#",
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
      </svg>
    ),
  },
  {
    label: "Facebook",
    href: "#",
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
      </svg>
    ),
  },
  {
    label: "YouTube",
    href: "#",
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
        <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
      </svg>
    ),
  },
];

function SunIcon() {
  return (
    <svg
      width="18"
      height="18"
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
