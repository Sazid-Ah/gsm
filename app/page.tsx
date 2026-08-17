import Link from "next/link";
import { ArrowRight, Layers } from "lucide-react";
import Hero from "@/components/Hero";
import ProductGrid from "@/components/ProductGrid";
import { getCategories, getProducts, getSiteConfig } from "@/lib/api";

export default async function Home() {
  const [site, categories, featured, newest, all] = await Promise.all([
    getSiteConfig(),
    getCategories(),
    getProducts({ sort: "featured", limit: 10 }),
    getProducts({ sort: "newest", limit: 5 }),
    getProducts(),
  ]);

  return (
    <>
      <Hero site={site} totalTools={all.length} />

      {/* Browse by category — the same filters as the header, on the page */}
      <section className="mx-auto max-w-[1440px] px-4 py-8 md:px-8">
        <div className="mb-5 flex items-center justify-between border-b-2 border-slate-200 pb-2.5">
          <h2 className="flex items-center gap-2 border-l-4 border-amber-500 pl-3 text-sm font-extrabold uppercase tracking-wide text-slate-900 md:text-base">
            <Layers className="h-4 w-4 text-amber-500" /> Browse by category
          </h2>
          <Link href="/tools" className="text-xs font-bold text-amber-600 hover:underline">
            All tools →
          </Link>
        </div>

        <div className="grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-5">
          {categories.map((category) => {
            const count = all.filter((p) => p.category === category.slug).length;
            return (
              <Link
                key={category.slug}
                href={`/category/${category.slug}`}
                className="group flex flex-col justify-between rounded-xl border border-slate-200 bg-white p-4 transition-all hover:border-amber-500 hover:shadow-lg"
              >
                <div>
                  <h3 className="text-xs font-black uppercase tracking-wide text-slate-900 transition-colors group-hover:text-amber-600">
                    {category.name}
                  </h3>
                  <p className="mt-1.5 line-clamp-3 text-[11px] leading-relaxed text-slate-500">
                    {category.blurb}
                  </p>
                </div>
                <span className="mt-3 flex items-center justify-between text-[10px] font-bold uppercase tracking-wider text-slate-400">
                  {count} {count === 1 ? "file" : "files"}
                  <ArrowRight className="h-3.5 w-3.5 -translate-x-1 text-amber-500 opacity-0 transition-all group-hover:translate-x-0 group-hover:opacity-100" />
                </span>
              </Link>
            );
          })}
        </div>
      </section>

      {/* Most used */}
      <section className="mx-auto max-w-[1440px] px-4 pb-8 md:px-8">
        <div className="mb-5 flex items-center justify-between border-b-2 border-slate-200 pb-2.5">
          <h2 className="border-l-4 border-amber-500 pl-3 text-sm font-extrabold uppercase tracking-wide text-slate-900 md:text-base">
            Most used tools
          </h2>
          <Link href="/tools" className="text-xs font-bold text-amber-600 hover:underline">
            More products →
          </Link>
        </div>
        <ProductGrid products={featured} />
      </section>

      {/* Newest */}
      <section className="mx-auto max-w-[1440px] px-4 pb-12 md:px-8">
        <div className="mb-5 flex items-center justify-between border-b-2 border-slate-200 pb-2.5">
          <h2 className="border-l-4 border-amber-500 pl-3 text-sm font-extrabold uppercase tracking-wide text-slate-900 md:text-base">
            Recently added
          </h2>
          <Link
            href="/tools?sort=newest"
            className="text-xs font-bold text-amber-600 hover:underline"
          >
            See all new →
          </Link>
        </div>
        <ProductGrid products={newest} />
      </section>
    </>
  );
}
