"use client";

import Image from "next/image";
import { useState, useEffect, useCallback } from "react";

/**
 * TestimonialsCarousel
 * Auto-playing carousel of customer testimonials with manual prev/next controls,
 * dot indicators, and pause-on-hover.
 *
 * Reuse on: Homepage (primary), About page, Product pages (as social proof)
 */
export default function TestimonialsCarousel() {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);

  const next = useCallback(
    () => setActive((a) => (a + 1) % TESTIMONIALS.length),
    [],
  );
  const prev = () =>
    setActive((a) => (a - 1 + TESTIMONIALS.length) % TESTIMONIALS.length);

  useEffect(() => {
    if (paused) return;
    const id = setInterval(next, 5000);
    return () => clearInterval(id);
  }, [paused, next]);

  const t = TESTIMONIALS[active];

  return (
    <section className="bg-white py-10 px-6 lg:px-12 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 text-sm font-semibold text-amber-600 bg-amber-50 border border-amber-200 px-3 py-1.5 rounded-full">
            <StarIcon className="w-4 h-4 fill-amber-500 stroke-amber-500" />
            4.9 out of 5 — 12,000+ reviews
          </div>
          <h2 className="font-display font-black text-4xl md:text-5xl text-[#0A1628] tracking-tight">
            What Our Customers Say
          </h2>
          <p className="text-slate-500 text-lg max-w-xl mx-auto">
            Real homeowners and businesses who&apos;ve gone solar with
            SolarStore.
          </p>
        </div>

        {/* Carousel container */}
        <div
          className="relative"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}>
          {/* Background cards (depth effect) */}
          <div className="hidden md:block">
            {TESTIMONIALS.map((_, i) => {
              if (i === active) return null;
              const offset =
                (i - active + TESTIMONIALS.length) % TESTIMONIALS.length;
              if (offset > 2) return null;
              return (
                <div
                  key={i}
                  className="absolute inset-x-0 mx-auto max-w-3xl"
                  style={{
                    transform: `scale(${1 - offset * 0.04}) translateY(${offset * 16}px)`,
                    opacity: 1 - offset * 0.35,
                    zIndex: 10 - offset,
                  }}>
                  <div className="bg-slate-50 border border-slate-100 rounded-3xl h-64" />
                </div>
              );
            })}
          </div>

          {/* Active testimonial card */}
          <div
            className="relative z-20 max-w-3xl mx-auto bg-[#0A1628] rounded-3xl p-8 md:p-12 shadow-2xl"
            key={active}>
            {/* Quote mark */}
            <div className="absolute top-8 right-10 text-amber-400/20 font-display font-black text-[120px] leading-none select-none pointer-events-none">
              &quot;
            </div>

            {/* Stars */}
            <div className="flex gap-1 mb-6">
              {Array.from({ length: 5 }).map((_, i) => (
                <StarIcon
                  key={i}
                  className="w-5 h-5 fill-amber-400 stroke-amber-400"
                />
              ))}
            </div>

            {/* Quote */}
            <blockquote className="text-white text-xl md:text-2xl leading-relaxed font-medium mb-8 relative z-10">
              &quot;{t.quote}&quot;
            </blockquote>

            {/* Author */}
            <div className="flex items-center gap-4">
              <div className="relative w-14 h-14 rounded-full overflow-hidden border-2 border-amber-400/30 shrink-0">
                <Image
                  src={t.avatar}
                  alt={t.name}
                  fill
                  sizes="56px"
                  className="object-cover"
                />
              </div>
              <div>
                <div className="font-display font-bold text-white text-lg">
                  {t.name}
                </div>
                <div className="text-slate-400 text-sm">{t.title}</div>
              </div>
              <div className="ml-auto text-right">
                <div className="text-amber-400 font-display font-black text-2xl">
                  {t.savings}
                </div>
                <div className="text-slate-400 text-xs">annual savings</div>
              </div>
            </div>
          </div>

          {/* Controls */}
          <div className="flex items-center justify-center gap-4 mt-8">
            <button
              onClick={prev}
              className="w-10 h-10 rounded-full border-2 border-slate-200 hover:border-[#0A1628] hover:bg-[#0A1628] text-slate-600 hover:text-white flex items-center justify-center transition-all"
              aria-label="Previous testimonial">
              <ChevronLeftIcon />
            </button>

            {/* Dots */}
            <div className="flex gap-2">
              {TESTIMONIALS.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setActive(i)}
                  className={`rounded-full transition-all duration-300 ${
                    i === active
                      ? "bg-amber-400 w-8 h-3"
                      : "bg-slate-200 hover:bg-slate-300 w-3 h-3"
                  }`}
                  aria-label={`Go to testimonial ${i + 1}`}
                />
              ))}
            </div>

            <button
              onClick={next}
              className="w-10 h-10 rounded-full border-2 border-slate-200 hover:border-[#0A1628] hover:bg-[#0A1628] text-slate-600 hover:text-white flex items-center justify-center transition-all"
              aria-label="Next testimonial">
              <ChevronRightIcon />
            </button>
          </div>
        </div>

        {/* Trust logos strip */}
        <div className="mt-20 pt-5 border-t border-slate-100">
          <p className="text-center text-slate-400 text-sm font-medium mb-8 uppercase tracking-widest">
            As featured in
          </p>
          <div className="flex flex-wrap items-center justify-center gap-10 opacity-40 grayscale">
            {[
              "Forbes",
              "TechCrunch",
              "Solar Power World",
              "Electrek",
              "Clean Energy Wire",
            ].map((pub) => (
              <span
                key={pub}
                className="font-display font-black text-[#0A1628] text-lg tracking-tight">
                {pub}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ── Data ── */
const TESTIMONIALS = [
  {
    quote:
      "SolarStore made going solar genuinely easy. I configured my whole 8kW system online, ordered everything in one cart, and had a certified installer out within two weeks. Our electric bill went from $340 to basically zero.",
    name: "Marcus T.",
    title: "Homeowner — Austin, TX",
    avatar:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&q=80",
    savings: "$3,900/yr",
  },
  {
    quote:
      "As a commercial buyer, I was skeptical about ordering $80k of equipment online. But their bulk quote system, expert support, and transparent pricing won me over. Five job sites later, SolarStore is our go-to supplier.",
    name: "Stephanie R.",
    title: "CEO, SunRise Solar Contractors — San Diego, CA",
    avatar:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&q=80",
    savings: "$62,000/yr",
  },
  {
    quote:
      "The savings calculator was spot-on — I was skeptical but it predicted $2,100 annual savings, and we're on track for exactly that. The 30-day return policy gave me confidence to try. Two years in and not a single issue.",
    name: "David K.",
    title: "Homeowner — Phoenix, AZ",
    avatar:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&q=80",
    savings: "$2,100/yr",
  },
];

/* ── Icons ── */
function StarIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" strokeWidth="1.5">
      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
    </svg>
  );
}
function ChevronLeftIcon() {
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
      <polyline points="15 18 9 12 15 6" />
    </svg>
  );
}
function ChevronRightIcon() {
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
      <polyline points="9 18 15 12 9 6" />
    </svg>
  );
}
