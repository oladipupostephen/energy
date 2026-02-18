import Image from "next/image";
import Link from "next/link";

/**
 * CategoryShowcase
 * A visual grid of product categories for quick navigation.
 * Displays category images, names, and product counts.
 *
 * Reuse on: Homepage (primary), Shop landing page
 */
export default function CategoryShowcase() {
  return (
    <section className="bg-white py-10 px-6 lg:px-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-14 space-y-4">
          <div className="inline-flex items-center gap-2 text-sm font-semibold text-amber-600 bg-amber-50 border border-amber-200 px-3 py-1.5 rounded-full">
            <GridIcon />
            Shop by Category
          </div>
          <h2 className="font-display font-black text-4xl md:text-5xl text-[#0A1628] tracking-tight">
            Everything You Need,
            <span className="text-amber-500"> In One Place</span>
          </h2>
        </div>

        {/* Category grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {CATEGORIES.map((cat) => (
            <Link
              key={cat.slug}
              href={`/products?category=${cat.slug}`}
              className="group relative rounded-2xl overflow-hidden aspect-square bg-slate-100 hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
              {/* Background image */}
              <Image
                src={cat.image}
                alt={cat.name}
                fill
                sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 16vw"
                className="object-cover group-hover:scale-110 transition-transform duration-500"
              />
              {/* Dark overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#050A18]/90 via-[#050A18]/30 to-transparent" />

              {/* Content */}
              <div className="absolute inset-0 p-4 flex flex-col justify-end">
                <div className="text-white font-display font-bold text-sm leading-tight mb-0.5">
                  {cat.name}
                </div>
                <div className="text-slate-300 text-xs">
                  {cat.count} products
                </div>
                <div className="mt-2 w-6 h-0.5 bg-amber-400 group-hover:w-full transition-all duration-300" />
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

const CATEGORIES = [
  {
    slug: "solar-panels",
    name: "Solar Panels",
    count: "2,400+",
    image:
      "https://images.unsplash.com/photo-1508514177221-188b1cf16e9d?w=400&q=80",
  },
  {
    slug: "inverters",
    name: "Inverters",
    count: "380+",
    image:
      "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&q=80",
  },
  {
    slug: "batteries",
    name: "Batteries & Storage",
    count: "520+",
    image:
      "https://images.unsplash.com/photo-1609091839311-d5365f9ff1c5?w=400&q=80",
  },
  {
    slug: "mounting",
    name: "Mounting & Racking",
    count: "1,100+",
    image:
      "https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?w=400&q=80",
  },
  {
    slug: "monitoring",
    name: "Monitoring & EV",
    count: "240+",
    image:
      "https://images.unsplash.com/photo-1593941707882-a5bba14938c7?w=400&q=80",
  },
  {
    slug: "accessories",
    name: "Accessories",
    count: "3,200+",
    image:
      "https://images.unsplash.com/photo-1592833159155-c62df1b65634?w=400&q=80",
  },
];

function GridIcon() {
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
      <rect x="3" y="3" width="7" height="7" />
      <rect x="14" y="3" width="7" height="7" />
      <rect x="14" y="14" width="7" height="7" />
      <rect x="3" y="14" width="7" height="7" />
    </svg>
  );
}
