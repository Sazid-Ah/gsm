import Link from "next/link";
import { ChevronRight, X, SlidersHorizontal, Download } from "lucide-react";
import ProductGrid from "./ProductGrid";
import ListingToolbar from "./ListingToolbar";

/**
 * Builds a listing URL, carrying the search term and sort order across filter
 * changes so switching category never silently drops the rest of the query.
 */
function listingHref(segments, { q, sort } = {}) {
  const path = segments.length ? `/category/${segments.join("/")}` : "/tools";
  const params = new URLSearchParams();
  if (q) params.set("q", q);
  if (sort && sort !== "featured") params.set("sort", sort);
  const qs = params.toString();
  return qs ? `${path}?${qs}` : path;
}

/**
 * Shared listing view behind both /tools and /category/[...slug].
 * Every filter is a link, so filtered content is server-rendered per URL.
 */
export default function ProductListing({
  products = [],
  categories = [],
  activeCategory = null,
  activeSubcategory = null,
  q = "",
  sort = "featured",
  sortOptions = [],
}) {
  const basePath = listingHref(
    [activeCategory?.slug, activeSubcategory?.slug].filter(Boolean)
  ).split("?")[0];

  const title = activeSubcategory?.name ?? activeCategory?.name ?? "All Tools & Files";
  const blurb =
    activeCategory?.blurb ??
    "Every tool, flash file and schematic in the catalog. Files are free to download — you only pay for a one-time-use license when you run them.";

  const hasFilters = Boolean(activeCategory || q);

  return (
    <div className="mx-auto max-w-[1440px] px-4 py-6 md:px-8">
      {/* Breadcrumb */}
      <nav aria-label="Breadcrumb" className="mb-4 flex flex-wrap items-center gap-1.5 text-xs font-semibold text-slate-500">
        <Link href="/" className="transition-colors hover:text-amber-600">
          Home
        </Link>
        <ChevronRight className="h-3.5 w-3.5 text-slate-300" />
        <Link href="/tools" className="transition-colors hover:text-amber-600">
          Tools
        </Link>
        {activeCategory && (
          <>
            <ChevronRight className="h-3.5 w-3.5 text-slate-300" />
            <Link
              href={listingHref([activeCategory.slug])}
              className={activeSubcategory ? "transition-colors hover:text-amber-600" : "text-slate-900"}
            >
              {activeCategory.name}
            </Link>
          </>
        )}
        {activeSubcategory && (
          <>
            <ChevronRight className="h-3.5 w-3.5 text-slate-300" />
            <span className="text-slate-900">{activeSubcategory.name}</span>
          </>
        )}
      </nav>

      {/* Page heading */}
      <header className="mb-5 border-l-4 border-amber-500 pl-4">
        <h1 className="text-lg font-black uppercase tracking-wide text-slate-900 md:text-xl">{title}</h1>
        <p className="mt-1 max-w-2xl text-xs leading-relaxed text-slate-500">{blurb}</p>
      </header>

      {/* Active filter chips */}
      {hasFilters && (
        <div className="mb-5 flex flex-wrap items-center gap-2">
          <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Active filters</span>

          {activeCategory && (
            <Link
              href={listingHref(activeSubcategory ? [activeCategory.slug] : [], { q, sort })}
              className="group flex items-center gap-1.5 rounded-full bg-amber-500/15 px-3 py-1 text-[11px] font-bold text-amber-700 transition-colors hover:bg-amber-500/25"
            >
              {activeCategory.name}
              {!activeSubcategory && <X className="h-3 w-3 opacity-60 group-hover:opacity-100" />}
            </Link>
          )}

          {activeSubcategory && (
            <Link
              href={listingHref([activeCategory.slug], { q, sort })}
              className="group flex items-center gap-1.5 rounded-full bg-amber-500/15 px-3 py-1 text-[11px] font-bold text-amber-700 transition-colors hover:bg-amber-500/25"
            >
              {activeSubcategory.name}
              <X className="h-3 w-3 opacity-60 group-hover:opacity-100" />
            </Link>
          )}

          {q && (
            <Link
              href={listingHref(
                [activeCategory?.slug, activeSubcategory?.slug].filter(Boolean),
                { sort }
              )}
              className="group flex items-center gap-1.5 rounded-full bg-slate-200 px-3 py-1 text-[11px] font-bold text-slate-700 transition-colors hover:bg-slate-300"
            >
              “{q}”
              <X className="h-3 w-3 opacity-60 group-hover:opacity-100" />
            </Link>
          )}

          <Link
            href="/tools"
            className="text-[11px] font-bold text-slate-400 underline-offset-2 transition-colors hover:text-red-600 hover:underline"
          >
            Clear all
          </Link>
        </div>
      )}

      <div className="flex flex-col gap-6 lg:flex-row">
        {/* Filter rail */}
        <aside className="w-full shrink-0 lg:w-60">
          <div className="rounded-2xl border border-slate-200 bg-white p-4 lg:sticky lg:top-56">
            <h2 className="mb-3 flex items-center gap-2 border-b border-slate-100 pb-2 text-[10px] font-black uppercase tracking-wider text-slate-500">
              <SlidersHorizontal className="h-3.5 w-3.5 text-amber-500" /> Filter by category
            </h2>

            <Link
              href={listingHref([], { q, sort })}
              className={`mb-1 block rounded-lg px-2.5 py-2 text-xs font-bold transition-colors ${
                !activeCategory
                  ? "bg-amber-500/15 text-amber-700"
                  : "text-slate-700 hover:bg-slate-100"
              }`}
            >
              All Categories
            </Link>

            <ul className="space-y-1">
              {categories.map((category) => {
                const isOpen = activeCategory?.slug === category.slug;
                return (
                  <li key={category.slug}>
                    <Link
                      href={listingHref([category.slug], { q, sort })}
                      className={`flex items-center justify-between rounded-lg px-2.5 py-2 text-xs font-bold transition-colors ${
                        isOpen && !activeSubcategory
                          ? "bg-amber-500/15 text-amber-700"
                          : "text-slate-700 hover:bg-slate-100"
                      }`}
                    >
                      {category.name}
                      <ChevronRight
                        className={`h-3.5 w-3.5 transition-transform ${isOpen ? "rotate-90 text-amber-500" : "text-slate-300"}`}
                      />
                    </Link>

                    {isOpen && (
                      <ul className="ml-2.5 mt-1 space-y-0.5 border-l border-slate-200 pl-3">
                        {category.subcategories.map((sub) => (
                          <li key={sub.slug}>
                            <Link
                              href={listingHref([category.slug, sub.slug], { q, sort })}
                              className={`block rounded-md px-2 py-1.5 text-[11px] font-semibold transition-colors ${
                                activeSubcategory?.slug === sub.slug
                                  ? "bg-amber-500/15 text-amber-700"
                                  : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
                              }`}
                            >
                              {sub.name}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    )}
                  </li>
                );
              })}
            </ul>

            <div className="mt-4 flex items-start gap-2 rounded-xl bg-emerald-50 p-3 text-[10px] leading-relaxed text-emerald-800">
              <Download className="mt-0.5 h-3.5 w-3.5 shrink-0" />
              <span>
                <strong className="block">Downloads are always free.</strong>
                No account needed. A license is only required to run the file.
              </span>
            </div>
          </div>
        </aside>

        {/* Results */}
        <section className="min-w-0 flex-1">
          <ListingToolbar
            total={products.length}
            sort={sort}
            sortOptions={sortOptions}
            basePath={basePath}
            query={q}
          />
          <ProductGrid products={products} />
        </section>
      </div>
    </div>
  );
}
