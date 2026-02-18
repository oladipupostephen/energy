"use client";

import Link from "next/link";
import { useState, useEffect } from "react";

/**
 * SiteHeader
 * Sticky top navigation with logo, main nav links, search, cart, and account.
 * Transitions from transparent (over hero) to solid on scroll.
 *
 * Reuse on: All pages (root layout)
 */
export default function SiteHeader() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const cartCount = 2; // Replace with real cart state/context

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? "bg-[#050A18]/95 backdrop-blur-xl shadow-xl border-b border-white/5"
            : "bg-transparent"
        }`}>
        {/* Top announcement bar */}
        {!scrolled && (
          <div className="bg-amber-400 text-[#050A18] text-center text-xs font-bold py-2 px-4">
            🌞 Free shipping on orders over $500 · 30-day returns · 25-year
            panel warranties
          </div>
        )}

        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-2.5 shrink-0">
              <div className="w-8 h-8 rounded-lg bg-amber-400 flex items-center justify-center">
                <SunLogoIcon />
              </div>
              <span className="font-display font-black text-xl text-white tracking-tight">
                Solar<span className="text-amber-400">Store</span>
              </span>
            </Link>

            {/* Desktop nav */}
            <nav
              className="hidden md:flex items-center gap-1"
              aria-label="Main navigation">
              {NAV_ITEMS.map((item) => (
                <div key={item.label} className="relative group">
                  <Link
                    href={item.href}
                    className="text-sm font-medium text-slate-300 hover:text-white px-4 py-2 rounded-lg hover:bg-white/5 transition-all duration-150 flex items-center gap-1">
                    {item.label}
                    {item.children && <ChevronDownIcon />}
                  </Link>

                  {/* Dropdown */}
                  {item.children && (
                    <div className="absolute top-full left-0 mt-1 bg-[#0A1628] border border-white/10 rounded-2xl shadow-2xl py-2 min-w-50 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                      {item.children.map((child) => (
                        <Link
                          key={child.label}
                          href={child.href}
                          className="flex items-center gap-3 px-4 py-2.5 text-sm text-slate-300 hover:text-white hover:bg-white/5 transition-colors">
                          <span className="text-amber-400">{child.icon}</span>
                          {child.label}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </nav>

            {/* Right actions */}
            <div className="flex items-center gap-2">
              {/* Search */}
              <button
                className="hidden sm:flex items-center gap-2 text-slate-400 hover:text-white border border-white/10 hover:border-white/20 rounded-full px-4 py-2 text-sm transition-all"
                aria-label="Search products">
                <SearchIcon />
                <span className="hidden md:inline text-slate-500">
                  Search...
                </span>
              </button>

              {/* Account */}
              <Link
                href="/account"
                className="w-9 h-9 rounded-full border border-white/10 hover:border-white/30 flex items-center justify-center text-slate-300 hover:text-white transition-all"
                aria-label="Account">
                <UserIcon />
              </Link>

              {/* Cart */}
              <Link
                href="/cart"
                className="relative w-9 h-9 rounded-full bg-amber-400 hover:bg-amber-300 flex items-center justify-center text-[#050A18] transition-all hover:scale-105"
                aria-label={`Cart, ${cartCount} items`}>
                <CartIcon />
                {cartCount > 0 && (
                  <span className="absolute -top-1 -right-1 w-4.5 h-4.5 min-w-4.5 bg-[#050A18] text-amber-400 text-[10px] font-black rounded-full flex items-center justify-center leading-none px-1">
                    {cartCount}
                  </span>
                )}
              </Link>

              {/* Mobile menu toggle */}
              <button
                className="md:hidden w-9 h-9 rounded-lg border border-white/10 flex items-center justify-center text-slate-300 hover:text-white ml-1"
                onClick={() => setMobileOpen(!mobileOpen)}
                aria-label="Toggle menu">
                {mobileOpen ? <XIcon /> : <MenuIcon />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile menu */}
        {mobileOpen && (
          <div className="md:hidden bg-[#050A18]/98 backdrop-blur-xl border-t border-white/5 px-6 py-4 space-y-1">
            {NAV_ITEMS.map((item) => (
              <div key={item.label}>
                <Link
                  href={item.href}
                  onClick={() => setMobileOpen(false)}
                  className="block text-slate-300 hover:text-white py-3 text-base font-medium border-b border-white/5">
                  {item.label}
                </Link>
                {item.children?.map((child) => (
                  <Link
                    key={child.label}
                    href={child.href}
                    onClick={() => setMobileOpen(false)}
                    className="block text-slate-400 hover:text-white py-2 text-sm pl-4">
                    {child.label}
                  </Link>
                ))}
              </div>
            ))}
            <div className="pt-4 flex gap-3">
              <Link
                href="/account"
                className="flex-1 text-center border border-white/20 text-white py-3 rounded-full text-sm font-medium">
                Account
              </Link>
              <Link
                href="/cart"
                className="flex-1 text-center bg-amber-400 text-[#050A18] py-3 rounded-full text-sm font-bold">
                Cart ({cartCount})
              </Link>
            </div>
          </div>
        )}
      </header>

      {/* Spacer to prevent content jump (only when not on hero page) */}
      <div className="h-0" aria-hidden="true" />
    </>
  );
}

const NAV_ITEMS = [
  {
    label: "Products",
    href: "/products",
    children: [
      {
        label: "Solar Panels",
        href: "/products?category=solar-panels",
        icon: "☀️",
      },
      { label: "Inverters", href: "/products?category=inverters", icon: "⚡" },
      { label: "Batteries", href: "/products?category=batteries", icon: "🔋" },
      {
        label: "Accessories",
        href: "/products?category=accessories",
        icon: "🔧",
      },
    ],
  },
  {
    label: "Tools",
    href: "/tools",
    children: [
      { label: "Savings Calculator", href: "/calculator", icon: "📊" },
      { label: "System Builder", href: "/builder", icon: "🏗️" },
      { label: "Financing", href: "/financing", icon: "💳" },
      { label: "Gov. Incentives", href: "/incentives", icon: "🏛️" },
    ],
  },
  { label: "Installers", href: "/installers" },
  { label: "Learn", href: "/learn" },
  { label: "Deals", href: "/deals" },
];

/* ── Icons ── */
function SunLogoIcon() {
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
function SearchIcon() {
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
      <circle cx="11" cy="11" r="8" />
      <line x1="21" y1="21" x2="16.65" y2="16.65" />
    </svg>
  );
}
function UserIcon() {
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
      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
      <circle cx="12" cy="7" r="4" />
    </svg>
  );
}
function CartIcon() {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round">
      <circle cx="9" cy="21" r="1" />
      <circle cx="20" cy="21" r="1" />
      <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
    </svg>
  );
}
function MenuIcon() {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round">
      <line x1="3" y1="6" x2="21" y2="6" />
      <line x1="3" y1="12" x2="21" y2="12" />
      <line x1="3" y1="18" x2="21" y2="18" />
    </svg>
  );
}
function XIcon() {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round">
      <line x1="18" y1="6" x2="6" y2="18" />
      <line x1="6" y1="6" x2="18" y2="18" />
    </svg>
  );
}
function ChevronDownIcon() {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round">
      <polyline points="6 9 12 15 18 9" />
    </svg>
  );
}
