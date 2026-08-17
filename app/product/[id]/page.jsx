import Link from "next/link";
import { notFound } from "next/navigation";
import { ChevronRight, Zap, KeyRound } from "lucide-react";
import ProductPurchasePanel from "@/components/ProductPurchasePanel";
import ProductGrid from "@/components/ProductGrid";
import {
  getCategory,
  getProduct,
  getProductIds,
  getRelatedProducts,
  getSiteConfig,
} from "@/lib/api";

export async function generateStaticParams() {
  const ids = await getProductIds();
  return ids.map((id) => ({ id }));
}

export async function generateMetadata({ params }) {
  const { id } = await params;
  const product = await getProduct(id);
  if (!product) return { title: "Tool not found" };

  return {
    title: product.name,
    description: product.summary,
  };
}

export default async function ProductDetailPage({ params }) {
  // Next 16: params is a Promise.
  const { id } = await params;
  const product = await getProduct(id);

  // Unknown id is a 404, not a silent fallback to some other product.
  if (!product) notFound();

  const [related, category, site] = await Promise.all([
    getRelatedProducts(product.id, 5),
    getCategory([product.category, product.subcategory]),
    getSiteConfig(),
  ]);

  return (
    <>
      {/* Breadcrumb */}
      <div className="border-b border-slate-200 bg-white px-4 py-3 md:px-8">
        <nav
          aria-label="Breadcrumb"
          className="mx-auto flex max-w-[1440px] flex-wrap items-center gap-2 text-xs font-semibold text-slate-500"
        >
          <Link href="/" className="transition-colors hover:text-amber-600">
            Home
          </Link>
          <ChevronRight className="h-3.5 w-3.5 text-slate-400" />
          <Link href="/tools" className="transition-colors hover:text-amber-600">
            Tools
          </Link>
          {category && (
            <>
              <ChevronRight className="h-3.5 w-3.5 text-slate-400" />
              <Link
                href={`/category/${category.slug}`}
                className="transition-colors hover:text-amber-600"
              >
                {category.name}
              </Link>
              {category.subcategory && (
                <>
                  <ChevronRight className="h-3.5 w-3.5 text-slate-400" />
                  <Link
                    href={`/category/${category.slug}/${category.subcategory.slug}`}
                    className="transition-colors hover:text-amber-600"
                  >
                    {category.subcategory.name}
                  </Link>
                </>
              )}
            </>
          )}
          <ChevronRight className="h-3.5 w-3.5 text-slate-400" />
          <span className="max-w-[200px] truncate text-slate-900 sm:max-w-none">{product.name}</span>
        </nav>
      </div>

      <div className="mx-auto w-full max-w-[1440px] px-4 py-8 md:px-8">
        <ProductPurchasePanel product={product} whatsapp={site.whatsapp} />

        {/* Description + highlights */}
        <div className="mt-8 grid grid-cols-1 gap-6 lg:grid-cols-12">
          <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm md:p-8 lg:col-span-7">
            <h2 className="mb-4 border-l-4 border-amber-500 pl-3 text-sm font-black uppercase tracking-wide text-slate-900">
              About this {product.category === "flash-files" ? "file" : "tool"}
            </h2>
            <p className="text-xs leading-relaxed text-slate-600">{product.description}</p>

            {product.highlights?.length > 0 && (
              <ul className="mt-5 grid grid-cols-1 gap-2 sm:grid-cols-2">
                {product.highlights.map((item) => (
                  <li key={item} className="flex items-start gap-2 text-xs font-medium text-slate-700">
                    <Zap className="mt-0.5 h-3.5 w-3.5 shrink-0 text-amber-500" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            )}

            {product.supports?.length > 0 && (
              <div className="mt-6 border-t border-slate-100 pt-4">
                <h3 className="mb-2 text-[10px] font-black uppercase tracking-wider text-slate-400">
                  Supported
                </h3>
                <div className="flex flex-wrap gap-1.5">
                  {product.supports.map((item) => (
                    <span
                      key={item}
                      className="rounded-full bg-slate-100 px-2.5 py-1 text-[11px] font-semibold text-slate-600"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </section>

          {/* Specs + license terms */}
          <aside className="space-y-6 lg:col-span-5">
            <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
              <h2 className="mb-4 border-l-4 border-amber-500 pl-3 text-sm font-black uppercase tracking-wide text-slate-900">
                Specifications
              </h2>
              <dl className="divide-y divide-slate-100">
                {Object.entries(product.specifications).map(([key, value]) => (
                  <div key={key} className="flex justify-between gap-4 py-2.5 text-xs">
                    <dt className="font-bold text-slate-500">{key}</dt>
                    <dd className="text-right font-semibold text-slate-900">{value}</dd>
                  </div>
                ))}
              </dl>
            </section>

            <section className="rounded-2xl border border-amber-200 bg-amber-50 p-6">
              <h2 className="mb-3 flex items-center gap-2 text-sm font-black uppercase tracking-wide text-amber-900">
                <KeyRound className="h-4 w-4" /> How the license works
              </h2>
              <ol className="space-y-2.5 text-xs leading-relaxed text-amber-900">
                <li className="flex gap-2">
                  <span className="font-black">1.</span>
                  <span>The file above downloads free — install and inspect it as much as you like.</span>
                </li>
                <li className="flex gap-2">
                  <span className="font-black">2.</span>
                  <span>
                    Buy one license per run. Each key covers{" "}
                    <strong>{product.license.scope.toLowerCase()}</strong>.
                  </span>
                </li>
                <li className="flex gap-2">
                  <span className="font-black">3.</span>
                  <span>{product.license.delivery}. Paste it into the tool to unlock the operation.</span>
                </li>
                <li className="flex gap-2">
                  <span className="font-black">4.</span>
                  <span>Keys are single-use — once consumed, buy another for the next device.</span>
                </li>
              </ol>
            </section>
          </aside>
        </div>

        {/* Related */}
        {related.length > 0 && (
          <section className="mt-10">
            <div className="mb-5 flex items-center justify-between border-b-2 border-slate-200 pb-2.5">
              <h2 className="border-l-4 border-amber-500 pl-3 text-sm font-extrabold uppercase tracking-wide text-slate-900">
                Related tools
              </h2>
              <Link
                href={`/category/${product.category}`}
                className="text-xs font-bold text-amber-600 hover:underline"
              >
                More in {category?.name ?? "this category"} →
              </Link>
            </div>
            <ProductGrid products={related} />
          </section>
        )}
      </div>
    </>
  );
}
