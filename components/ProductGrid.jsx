import Link from "next/link";
import { PackageSearch } from "lucide-react";
import ProductCard from "./ProductCard";

/**
 * Presentational grid. Stays a server component — ProductCard is the only
 * client boundary, so listings render on the server.
 *
 * @param {{
 *   products?: import("@/lib/api").Product[],
 *   emptyHref?: string,
 *   emptyLabel?: string,
 * }} props
 */
export default function ProductGrid({ products = [], emptyHref = "/tools", emptyLabel = "Browse all tools" }) {
  if (products.length === 0) {
    return (
      <div className="flex flex-col items-center gap-3 rounded-2xl border border-dashed border-slate-300 bg-white py-16 text-center">
        <PackageSearch className="h-10 w-10 text-slate-300" />
        <p className="text-sm font-bold text-slate-700">No tools match these filters</p>
        <p className="max-w-xs text-xs text-slate-500">
          Try a different category, or clear the filters to see the full catalog.
        </p>
        <Link
          href={emptyHref}
          className="mt-2 rounded-xl bg-amber-500 px-5 py-2.5 text-xs font-bold uppercase tracking-wider text-slate-950 transition-colors hover:bg-amber-600"
        >
          {emptyLabel}
        </Link>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 gap-3 md:grid-cols-3 md:gap-4 lg:grid-cols-4 2xl:grid-cols-5">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}
