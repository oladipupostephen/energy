"use client";

import { useState } from "react";
import Link from "next/link";

/**
 * SavingsCalculatorWidget
 * An interactive teaser calculator that estimates annual savings and ROI.
 * Shows a preview result and invites users to the full /calculator page.
 *
 * Reuse on: Homepage (primary), optionally /calculator as a quick widget
 */
export default function SavingsCalculatorWidget() {
  const [monthlyBill, setMonthlyBill] = useState(200);
  const [state, setState] = useState("CA");

  // Simplified estimation logic
  const incentiveRate = STATE_INCENTIVES[state] ?? 0.3;
  const annualBill = monthlyBill * 12;
  const solarCoverage = 0.9; // solar covers ~90% of bill
  const annualSavings = Math.round(annualBill * solarCoverage);
  const systemCost = Math.round((monthlyBill / 20) * 1000 * 8); // rough $$/W
  const federalCredit = Math.round(systemCost * 0.3);
  const stateCredit = Math.round(systemCost * incentiveRate * 0.3);
  const netCost = systemCost - federalCredit - stateCredit;
  const paybackYears = (netCost / annualSavings).toFixed(1);
  const co2Saved = Math.round((annualSavings / 130) * 0.92 * 1000) / 1000; // tons

  return (
    <section className="bg-[#0A1628] py-24 px-6 lg:px-12 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] rounded-full bg-amber-500/5 blur-[100px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] rounded-full bg-blue-500/5 blur-[80px] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left: copy */}
          <div className="space-y-6">
            <div className="inline-flex items-center gap-2 text-sm font-semibold text-amber-400 border border-amber-400/30 bg-amber-400/10 px-3 py-1.5 rounded-full">
              <ZapIcon />
              Savings Calculator
            </div>
            <h2 className="font-display font-black text-4xl md:text-5xl text-white leading-tight tracking-tight">
              How Much Could
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-amber-300">
                You Save?
              </span>
            </h2>
            <p className="text-slate-300 text-lg leading-relaxed">
              Enter your monthly electricity bill and we&apos;ll estimate your
              potential savings, system cost, and payback period — instantly.
            </p>

            {/* Environmental impact */}
            <div className="grid grid-cols-2 gap-4 pt-2">
              {[
                {
                  icon: <LeafIcon />,
                  value: `${co2Saved}t`,
                  label: "CO₂ avoided/year",
                },
                {
                  icon: <HomeIcon />,
                  value: `${Math.round(co2Saved * 113)} trees`,
                  label: "Equivalent trees planted",
                },
              ].map((item) => (
                <div
                  key={item.label}
                  className="bg-white/5 border border-white/10 rounded-2xl p-4 flex items-center gap-3">
                  <span className="text-green-400">{item.icon}</span>
                  <div>
                    <div className="font-display font-black text-white text-xl">
                      {item.value}
                    </div>
                    <div className="text-slate-400 text-xs">{item.label}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right: calculator widget */}
          <div className="bg-white rounded-3xl p-8 shadow-2xl space-y-6">
            <h3 className="font-display font-black text-[#0A1628] text-xl">
              Quick Savings Estimate
            </h3>

            {/* Monthly bill slider */}
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <label className="text-sm font-semibold text-slate-600">
                  Monthly Electric Bill
                </label>
                <span className="font-display font-black text-[#0A1628] text-lg">
                  ${monthlyBill}
                </span>
              </div>
              <input
                type="range"
                min={50}
                max={1000}
                step={10}
                value={monthlyBill}
                onChange={(e) => setMonthlyBill(Number(e.target.value))}
                className="w-full h-2 bg-slate-200 rounded-full appearance-none cursor-pointer accent-amber-500"
              />
              <div className="flex justify-between text-xs text-slate-400">
                <span>$50</span>
                <span>$1,000</span>
              </div>
            </div>

            {/* State selector */}
            <div className="space-y-2">
              <label className="text-sm font-semibold text-slate-600">
                Your State
              </label>
              <select
                value={state}
                onChange={(e) => setState(e.target.value)}
                className="w-full border-2 border-slate-200 focus:border-amber-400 rounded-xl px-4 py-3 text-slate-700 font-medium outline-none transition-colors bg-slate-50">
                {Object.keys(STATE_INCENTIVES).map((s) => (
                  <option key={s} value={s}>
                    {STATE_NAMES[s]}
                  </option>
                ))}
              </select>
            </div>

            {/* Results */}
            <div className="bg-linear-to-br from-[#0A1628] to-[#162B55] rounded-2xl p-6 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                {[
                  {
                    label: "Annual Savings",
                    value: `$${annualSavings.toLocaleString()}`,
                    highlight: true,
                  },
                  {
                    label: "Payback Period",
                    value: `${paybackYears} yrs`,
                    highlight: false,
                  },
                  {
                    label: "Federal Tax Credit",
                    value: `$${federalCredit.toLocaleString()}`,
                    highlight: false,
                  },
                  {
                    label: "Est. System Cost",
                    value: `$${netCost.toLocaleString()}`,
                    highlight: false,
                  },
                ].map((item) => (
                  <div key={item.label}>
                    <div
                      className={`font-display font-black text-xl ${item.highlight ? "text-amber-400" : "text-white"}`}>
                      {item.value}
                    </div>
                    <div className="text-slate-400 text-xs font-medium">
                      {item.label}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* CTA */}
            <Link
              href="/calculator"
              className="block w-full text-center bg-amber-400 hover:bg-amber-300 text-[#050A18] font-bold py-4 rounded-xl transition-all duration-200 hover:shadow-lg hover:shadow-amber-400/30 hover:scale-[1.02]">
              Get Full Savings Report →
            </Link>
            <p className="text-xs text-slate-400 text-center">
              * Estimates based on average US solar data. Actual results vary.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ── State data ── */
const STATE_INCENTIVES: Record<string, number> = {
  CA: 0.35,
  TX: 0.2,
  FL: 0.28,
  NY: 0.4,
  AZ: 0.3,
  CO: 0.32,
  NV: 0.27,
  WA: 0.18,
  OR: 0.29,
  MA: 0.45,
  NJ: 0.38,
  IL: 0.22,
  OH: 0.2,
  GA: 0.18,
  NC: 0.25,
};
const STATE_NAMES: Record<string, string> = {
  CA: "California",
  TX: "Texas",
  FL: "Florida",
  NY: "New York",
  AZ: "Arizona",
  CO: "Colorado",
  NV: "Nevada",
  WA: "Washington",
  OR: "Oregon",
  MA: "Massachusetts",
  NJ: "New Jersey",
  IL: "Illinois",
  OH: "Ohio",
  GA: "Georgia",
  NC: "North Carolina",
};

/* ── Icons ── */
function ZapIcon() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round">
      <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
    </svg>
  );
}
function LeafIcon() {
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
      <path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10z" />
      <path d="M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12" />
    </svg>
  );
}
function HomeIcon() {
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
      <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
      <polyline points="9 22 9 12 15 12 15 22" />
    </svg>
  );
}
