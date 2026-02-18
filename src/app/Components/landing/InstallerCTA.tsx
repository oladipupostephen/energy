import Image from "next/image";
import Link from "next/link";

/**
 * InstallerCTA
 * Full-width CTA section encouraging visitors to find a certified installer.
 * Features a split layout with imagery and bullet benefits.
 *
 * Reuse on: Homepage (primary), /installers page header
 */
export default function InstallerCTA() {
  return (
    <section className="bg-slate-50 py-10 px-6 lg:px-12">
      <div className="max-w-7xl mx-auto">
        <div className="bg-linear-to-br from-[#050A18] via-[#0A1628] to-[#162B55] rounded-3xl overflow-hidden">
          <div className="grid lg:grid-cols-2 min-h-120">
            {/* Left: content */}
            <div className="p-10 md:p-16 flex flex-col justify-center space-y-8">
              <div className="inline-flex items-center gap-2 text-sm font-semibold text-amber-400 border border-amber-400/30 bg-amber-400/10 px-3 py-1.5 rounded-full w-fit">
                <MapPinIcon />
                Installer Network
              </div>

              <div>
                <h2 className="font-display font-black text-4xl md:text-5xl text-white leading-tight tracking-tight">
                  Find a Certified
                  <span className="block text-transparent bg-clip-text bg-linear-to-r from-amber-400 to-amber-300">
                    Installer Near You
                  </span>
                </h2>
                <p className="text-slate-300 text-lg mt-4 leading-relaxed max-w-lg">
                  Our network of 5,000+ certified solar installers ensures
                  professional installation, backed by workmanship warranties.
                </p>
              </div>

              {/* Benefits */}
              <ul className="space-y-3">
                {BENEFITS.map((benefit) => (
                  <li
                    key={benefit}
                    className="flex items-center gap-3 text-slate-200">
                    <span className="w-5 h-5 rounded-full bg-amber-400/20 border border-amber-400/40 flex items-center justify-center shrink-0">
                      <CheckIcon />
                    </span>
                    <span className="text-sm font-medium">{benefit}</span>
                  </li>
                ))}
              </ul>

              {/* CTA row */}
              <div className="flex flex-wrap gap-4">
                <Link
                  href="/installers"
                  className="inline-flex items-center gap-2 bg-amber-400 hover:bg-amber-300 text-[#050A18] font-bold px-8 py-4 rounded-full transition-all duration-200 shadow-lg hover:shadow-amber-400/30 hover:scale-105">
                  <SearchIcon />
                  Find Installers
                </Link>
                <Link
                  href="/installers/quote"
                  className="inline-flex items-center gap-2 border-2 border-white/20 hover:border-amber-400/50 text-white hover:text-amber-400 font-semibold px-8 py-4 rounded-full transition-all duration-200">
                  Request a Quote
                </Link>
              </div>

              {/* Social proof mini stat */}
              <div className="flex items-center gap-6 pt-2 border-t border-white/10">
                {[
                  { value: "5,000+", label: "Certified Installers" },
                  { value: "50", label: "States Covered" },
                  { value: "4.8★", label: "Avg. Installer Rating" },
                ].map((s) => (
                  <div key={s.label}>
                    <div className="font-display font-black text-amber-400 text-xl">
                      {s.value}
                    </div>
                    <div className="text-slate-400 text-xs">{s.label}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right: imagery */}
            <div className="relative hidden lg:block">
              {/* Main image */}
              <Image
                src="https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=800&q=80"
                alt="Certified solar installer team working on rooftop installation"
                fill
                sizes="50vw"
                className="object-cover"
              />
              {/* Overlay gradient */}
              <div className="absolute inset-0 bg-linear-to-r from-[#050A18]/80 via-[#050A18]/20 to-transparent" />

              {/* Floating installer card */}
              <div className="absolute bottom-10 right-8 bg-white rounded-2xl shadow-2xl p-5 w-64">
                <div className="flex items-center gap-3 mb-3">
                  <div className="relative w-12 h-12 rounded-full overflow-hidden border-2 border-amber-400 shrink-0">
                    <Image
                      src="https://images.unsplash.com/photo-1560250097-0b93528c311a?w=200&q=80"
                      alt="Installer"
                      fill
                      sizes="48px"
                      className="object-cover"
                    />
                  </div>
                  <div>
                    <div className="font-display font-bold text-[#0A1628] text-sm">
                      SunPro Installs
                    </div>
                    <div className="text-slate-500 text-xs">
                      Austin, TX • 2.3 mi away
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-1 mb-3">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <svg
                      key={i}
                      className="w-3.5 h-3.5 text-amber-400 fill-amber-400"
                      viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                  <span className="text-xs text-slate-500 ml-1">
                    4.9 (312 jobs)
                  </span>
                </div>
                <div className="flex flex-wrap gap-1 mb-3">
                  {["NABCEP Certified", "Licensed & Insured"].map((tag) => (
                    <span
                      key={tag}
                      className="text-xs bg-green-50 text-green-700 border border-green-200 px-2 py-0.5 rounded-full font-medium">
                      {tag}
                    </span>
                  ))}
                </div>
                <div className="text-xs text-slate-400">
                  Available this week · Free consultation
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

const BENEFITS = [
  "NABCEP-certified and state-licensed professionals",
  "Competitive quotes from multiple local installers",
  "10-year workmanship warranty on all installations",
  "Permitting and utility interconnection handled",
  "Post-install monitoring and maintenance support",
];

/* ── Icons ── */
function MapPinIcon() {
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
      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
      <circle cx="12" cy="10" r="3" />
    </svg>
  );
}
function SearchIcon() {
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
      <circle cx="11" cy="11" r="8" />
      <line x1="21" y1="21" x2="16.65" y2="16.65" />
    </svg>
  );
}
function CheckIcon() {
  return (
    <svg
      width="12"
      height="12"
      viewBox="0 0 24 24"
      fill="none"
      stroke="#FFCA3A"
      strokeWidth="3"
      strokeLinecap="round"
      strokeLinejoin="round">
      <polyline points="20 6 9 17 4 12" />
    </svg>
  );
}
