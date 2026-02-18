import type { Metadata } from "next";
import HeroSection from "./Components/landing/HeroSection";
import TrustStrip from "./Components/landing/TrustStrip";
import CategoryShowcase from "./Components/landing/CategoryShowcase";
import FeaturedProducts from "./Components/landing/FeaturedProducts";
import SavingsCalculatorWidget from "./Components/landing/SavingsCalculatorWidget";
import TestimonialsCarousel from "./Components/landing/TestimonialsCarousel";
import InstallerCTA from "./Components/landing/InstallerCTA";
import SiteHeader from "./Components/landing/SiteHeader";
import SiteFooter from "./Components/landing/SiteFooter";
//import SiteFooter from "@/components/landing/SiteFooter";

/* ── SEO Metadata ── */
export const metadata: Metadata = {
  title: "SolarStore — America's #1 Solar Equipment Marketplace",
  description:
    "Shop premium solar panels, inverters, batteries, and accessories. Calculate your savings, build your system, and find certified installers — all in one place. Free shipping over $500.",
  keywords: [
    "solar panels",
    "solar equipment",
    "solar inverters",
    "battery storage",
    "solar marketplace",
    "buy solar panels online",
    "home solar system",
    "solar savings calculator",
    "certified solar installers",
  ],
  openGraph: {
    title: "SolarStore — America's #1 Solar Equipment Marketplace",
    description:
      "Premium solar panels, inverters, and batteries with expert tools and certified installers.",
    type: "website",
    locale: "en_US",
    url: "https://solarstore.com",
    siteName: "SolarStore",
    images: [
      {
        url: "https://solarstore.com/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "SolarStore — Power Your Home With the Sun",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "SolarStore — America's #1 Solar Equipment Marketplace",
    description:
      "Shop solar panels, inverters, batteries. Calculate savings. Find installers.",
    images: ["https://solarstore.com/og-image.jpg"],
    creator: "@SolarStore",
  },
  alternates: {
    canonical: "https://solarstore.com",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large" },
  },
};

/**
 * Homepage — Server Component
 *
 * Renders SSR with no client-side data dependencies for fast LCP.
 * Individual client islands (carousel, calculator) use "use client" within
 * their own component files only where necessary.
 *
 * Component order (conversion funnel):
 * 1. SiteHeader    — Navigation (sticky, transparent → solid)
 * 2. HeroSection   — First impression & primary CTAs
 * 3. TrustStrip    — Trust signals to validate intent
 * 4. CategoryShowcase — Product discovery entry points
 * 5. FeaturedProducts — Curated product grid (social proof via ratings)
 * 6. SavingsCalculatorWidget — Personalised value prop / lead qualifier
 * 7. TestimonialsCarousel — Social proof to overcome objections
 * 8. InstallerCTA  — Conversion for the full purchase journey
 * 9. SiteFooter    — Navigation, newsletter, legal
 */
export default function HomePage() {
  return (
    <>
      <SiteHeader />
      <main>
        <HeroSection />
        {/* <TrustStrip /> */}
        <FeaturedProducts />
        <SavingsCalculatorWidget />
        <TestimonialsCarousel />
        <CategoryShowcase />
        <InstallerCTA />
        {/*
        
       
        
         */}
      </main>
      <SiteFooter />
    </>
  );
}
