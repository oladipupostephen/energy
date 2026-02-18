"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef } from "react";

/**
 * HeroSection
 * Full-width landing hero with animated headline, two CTAs, and an
 * illustrative solar panel hero visual.
 *
 * Reuse on: Homepage only (primary entry point)
 */
export default function HeroSection() {
  const rayRef = useRef<HTMLDivElement>(null);

  // Subtle parallax on mouse move for sun rays
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (!rayRef.current) return;
      const x = (e.clientX / window.innerWidth - 0.5) * 20;
      const y = (e.clientY / window.innerHeight - 0.5) * 20;
      rayRef.current.style.transform = `translate(${x}px, ${y}px)`;
    };
    window.addEventListener("mousemove", handler);
    return () => window.removeEventListener("mousemove", handler);
  }, []);

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden bg-[#050A18]">
      {/* ── Background: geometric sun rays ── */}
      <div
        ref={rayRef}
        className="absolute inset-0 pointer-events-none transition-transform duration-700 ease-out"
        aria-hidden="true">
        {/* Radial glow */}
        <div className="absolute top-[-10%] right-[-5%] w-200 h-200 rounded-full bg-amber-500/10 blur-[120px]" />
        <div className="absolute top-[20%] right-[10%] w-100 h-100 rounded-full bg-amber-400/8 blur-[80px]" />
        {/* Conic sun-ray pattern */}
        <svg
          className="absolute top-[5%] right-[0%] w-175 h-175 opacity-[0.06]"
          viewBox="0 0 700 700"
          fill="none">
          <circle cx="350" cy="350" r="340" stroke="#FFCA3A" strokeWidth="1" />
          {Array.from({ length: 24 }).map((_, i) => {
            const angle = (i * 360) / 24;
            const rad = (angle * Math.PI) / 180;
            const x2 = 350 + 340 * Math.cos(rad);
            const y2 = 350 + 340 * Math.sin(rad);
            return (
              <line
                key={i}
                x1="350"
                y1="350"
                x2={x2}
                y2={y2}
                stroke="#FFCA3A"
                strokeWidth="1"
              />
            );
          })}
        </svg>
        {/* Grid overlay */}
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage:
              "linear-gradient(#FFCA3A 1px, transparent 1px), linear-gradient(90deg, #FFCA3A 1px, transparent 1px)",
            backgroundSize: "60px 60px",
          }}
        />
      </div>

      {/* ── Content ── */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 lg:px-12 py-24">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left: copy */}
          <div className="space-y-8">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 text-sm font-semibold text-amber-400 border border-amber-400/30 bg-amber-400/10 px-4 py-2 rounded-full animate-fade-in-up">
              <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
              #1 Solar Marketplace in the US
            </div>

            {/* Headline */}
            <h1
              className="font-display font-black text-3xl md:text-4xl lg:text-5xl text-white leading-[1.05] tracking-tight animate-fade-in-up"
              style={{ animationDelay: "100ms" }}>
              Power Your Home
              <span className="block text-transparent bg-clip-text bg-linear-to-r from-amber-400 to-amber-500">
                With the Sun.
              </span>
            </h1>

            {/* Subheadline */}
            <p
              className="text-slate-300 text-xl leading-relaxed max-w-lg animate-fade-in-up"
              style={{ animationDelay: "200ms" }}>
              Shop premium solar panels, inverters, and batteries. Build your
              system, calculate your savings, and go solar with confidence — all
              in one place.
            </p>

            {/* CTAs */}
            <div
              className="flex flex-wrap gap-4 animate-fade-in-up"
              style={{ animationDelay: "300ms" }}>
              <Link
                href="/products?category=solar-panels"
                className="inline-flex items-center gap-2 bg-amber-400 hover:bg-amber-300 text-[#050A18] font-bold px-8 py-4 rounded-full transition-all duration-200 shadow-xl hover:shadow-amber-400/40 hover:scale-105 active:scale-95 text-base">
                <ShoppingBagIcon />
                Shop Solar Panels
              </Link>
              <Link
                href="/calculator"
                className="inline-flex items-center gap-2 border-2 border-white/20 hover:border-amber-400/50 text-white hover:text-amber-400 font-semibold px-8 py-4 rounded-full transition-all duration-200 hover:bg-amber-400/5 text-base">
                <CalculatorIcon />
                Calculate Savings
              </Link>
            </div>

            {/* Quick stats */}
            <div
              className="flex flex-wrap gap-8 pt-4 animate-fade-in-up"
              style={{ animationDelay: "400ms" }}>
              {[
                { value: "12,000+", label: "Products" },
                { value: "$0", label: "Down Financing" },
                { value: "30-Day", label: "Returns" },
              ].map((stat) => (
                <div key={stat.label}>
                  <div className="font-display font-black text-2xl text-amber-400">
                    {stat.value}
                  </div>
                  <div className="text-slate-400 text-sm font-medium">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right: hero illustration */}
          <div
            className="relative flex justify-center lg:justify-end animate-fade-in-up"
            style={{ animationDelay: "200ms" }}>
            {/* Glowing orb behind image */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <div className="w-80 h-80 rounded-full bg-amber-500/20 blur-[60px]" />
            </div>

            {/* Hero image container */}
            <div className="relative w-full max-w-lg">
              {/* Floating badge — kWh saved */}
              <div className="absolute -left-4 top-8 z-20 bg-white rounded-2xl shadow-2xl p-4 flex items-center gap-3 animate-float">
                <div className="w-10 h-10 rounded-xl bg-green-500/10 flex items-center justify-center">
                  <LeafIcon />
                </div>
                <div>
                  <div className="font-display font-black text-slate-900 text-lg leading-tight">
                    1.2M
                  </div>
                  <div className="text-slate-500 text-xs font-medium">
                    kWh saved this month
                  </div>
                </div>
              </div>

              {/* Floating badge — avg savings */}
              <div className="absolute -right-2 bottom-16 z-20 bg-[#0A1628] border border-amber-400/20 rounded-2xl shadow-2xl p-4 animate-float [animation-delay:1.5s]">
                <div className="text-amber-400 font-display font-black text-xl">
                  $1,840
                </div>
                <div className="text-slate-400 text-xs font-medium">
                  avg. annual savings
                </div>
              </div>

              {/* Main hero image */}
              <div className="relative rounded-3xl overflow-hidden border border-white/10 shadow-2xl aspect-4/3">
                <Image
                  src="https://images.unsplash.com/photo-1509391366360-2e959784a276?w=800&q=80"
                  alt="Residential solar panel installation on modern home"
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover"
                  priority
                />
                {/* Overlay gradient at bottom */}
                <div className="absolute inset-0 bg-linear-to-t from-[#050A18]/60 to-transparent" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── Bottom wave divider ── */}
      <div className="absolute bottom-0 left-0 right-0 pointer-events-none">
        <svg
          viewBox="0 0 1440 80"
          fill="none"
          xmlns="http://www.w3.org/2000/svg">
          <path
            d="M0 80L60 72C120 64 240 48 360 40C480 32 600 32 720 37.3C840 43 960 53 1080 56C1200 59 1320 53 1380 50L1440 47V80H1380C1320 80 1200 80 1080 80C960 80 840 80 720 80C600 80 480 80 360 80C240 80 120 80 60 80H0Z"
            fill="#F8FAFC"
          />
        </svg>
      </div>
    </section>
  );
}

/* ── Inline SVG icons ── */
function ShoppingBagIcon() {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round">
      <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
      <line x1="3" y1="6" x2="21" y2="6" />
      <path d="M16 10a4 4 0 0 1-8 0" />
    </svg>
  );
}
function CalculatorIcon() {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round">
      <rect x="4" y="2" width="16" height="20" rx="2" />
      <line x1="8" y1="6" x2="16" y2="6" />
      <line x1="8" y1="10" x2="10" y2="10" />
      <line x1="12" y1="10" x2="14" y2="10" />
      <line x1="16" y1="10" x2="16" y2="10" />
      <line x1="8" y1="14" x2="10" y2="14" />
      <line x1="12" y1="14" x2="14" y2="14" />
      <line x1="16" y1="14" x2="16" y2="18" />
      <line x1="8" y1="18" x2="10" y2="18" />
      <line x1="12" y1="18" x2="14" y2="18" />
    </svg>
  );
}
function LeafIcon() {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="#22C55E"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round">
      <path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10z" />
      <path d="M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12" />
    </svg>
  );
}
