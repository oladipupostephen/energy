"use client";
import Image from "next/image";
import Link from "next/link";
import ProductCard from "./ProductCard";

/**
 * FeaturedProducts
 * Curated grid of 4–8 products fetched server-side (SSR).
 * In production, replace `FEATURED_PRODUCTS` with a fetch() call to your DB/API.
 *
 * Reuse on: Homepage (primary), optionally Category pages as "Top Picks"
 */
export default function FeaturedProducts() {
  return (
    <section className="bg-slate-50 py-12 px-6 lg:px-12 ">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-14">
          <div>
            <div className="inline-flex items-center gap-2 text-sm font-semibold text-amber-600 bg-amber-50 border border-amber-200 px-3 py-1 rounded-full mb-4">
              <SunIcon className="w-4 h-4" />
              Curated Selection
            </div>
            <h2 className="font-display font-black text-4xl md:text-5xl text-[#0A1628] tracking-tight leading-tight">
              Featured Products
            </h2>
            <p className="text-slate-500 text-lg mt-3 max-w-xl">
              Hand-picked solar panels, inverters, and storage systems — all
              backed by top-tier warranties.
            </p>
          </div>
          <Link
            href="/products"
            className="shrink-0 inline-flex items-center gap-2 text-[#0A1628] font-semibold border-2 border-[#162B55] hover:bg-[#0A1628] hover:text-white px-6 py-3 rounded-full transition-all duration-200">
            View All Products
            <ArrowRightIcon />
          </Link>
        </div>

        {/* Product grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {FEATURED_PRODUCTS.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
}

/* ── Types ── */
interface Product {
  id: string;
  slug: string;
  name: string;
  category: string;
  price: number;
  originalPrice?: number;
  rating: number;
  reviewCount: number;
  image: string;
  badge?: string;
}

/* ── Dummy data (replace with DB fetch in production) ── */
const FEATURED_PRODUCTS: Product[] = [
  {
    id: "1",
    slug: "renogy-400w-monocrystalline",
    name: "Renogy 400W Monocrystalline Solar Panel",
    category: "Solar Panels",
    price: 289,
    originalPrice: 349,
    rating: 5,
    reviewCount: 342,
    image:
      "https://images.unsplash.com/photo-1621905251189-08b45d6a269e?w=600&q=80",
    badge: "Best Seller",
  },
  {
    id: "2",
    slug: "enphase-iq8-microinverter",
    name: "Enphase IQ8+ Microinverter — 290W",
    category: "Inverters",
    price: 199,
    rating: 5,
    reviewCount: 218,
    image:
      "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&q=80",
    badge: "New",
  },
  {
    id: "3",
    slug: "lg-chem-resu10h-battery",
    name: "LG Chem RESU10H 9.8kWh Battery",
    category: "Batteries",
    price: 4999,
    originalPrice: 5599,
    rating: 4,
    reviewCount: 87,
    image:
      "https://images.unsplash.com/photo-1609091839311-d5365f9ff1c5?w=600&q=80",
    badge: "Sale",
  },
  {
    id: "4",
    slug: "sol-ark-15k-hybrid-inverter",
    name: "Sol-Ark 15K Hybrid Inverter",
    category: "Inverters",
    price: 3299,
    rating: 5,
    reviewCount: 156,
    image:
      "https://images.unsplash.com/photo-1592833159155-c62df1b65634?w=600&q=80",
  },
];

/* ── Inline SVG icons ── */
function SunIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round">
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
function ArrowRightIcon() {
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
      <line x1="5" y1="12" x2="19" y2="12" />
      <polyline points="12 5 19 12 12 19" />
    </svg>
  );
}
function HeartIcon() {
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
      <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
    </svg>
  );
}
function CartPlusIcon() {
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
      <line x1="17" y1="9" x2="17" y2="15" />
      <line x1="14" y1="12" x2="20" y2="12" />
    </svg>
  );
}
