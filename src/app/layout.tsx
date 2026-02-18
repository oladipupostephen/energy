import type { Metadata } from "next";
import { Syne, DM_Sans } from "next/font/google";
import "./globals.css";

/**
 * Font configuration — Syne (display) + DM Sans (body)
 * These are loaded via next/font/google for automatic optimization.
 */
const syne = Syne({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-syne",
  display: "swap",
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-dm-sans",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://solarstore.com"),
  title: {
    default: "SolarStore — America's #1 Solar Equipment Marketplace",
    template: "%s | SolarStore",
  },
  description:
    "Shop premium solar panels, inverters, batteries and accessories. Calculate savings, build systems, find certified installers.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${syne.variable} ${dmSans.variable}`}>
      <body className="font-body antialiased">{children}</body>
    </html>
  );
}
