import { notFound } from "next/navigation";
import ProductListing from "@/components/ProductListing";
import { getCategories, getCategory, getProducts, getSortOptions } from "@/lib/api";

/**
 * Filtered listing. Handles one or two segments:
 *   /category/server-credits
 *   /category/server-credits/xiaomi-auth
 * Search and sort ride along as query params.
 */
export async function generateStaticParams() {
  const categories = await getCategories();
  return categories.flatMap((category) => [
    { slug: [category.slug] },
    ...category.subcategories.map((sub) => ({ slug: [category.slug, sub.slug] })),
  ]);
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const category = await getCategory(slug);
  if (!category) return { title: "Category not found" };

  const name = category.subcategory?.name ?? category.name;
  return { title: name, description: category.blurb };
}

export default async function CategoryPage({ params, searchParams }) {
  // Next 16: both params and searchParams are Promises.
  const [{ slug }, { q = "", sort = "featured" }] = await Promise.all([params, searchParams]);

  if (slug.length > 2) notFound();

  const category = await getCategory(slug);
  if (!category) notFound();

  const [products, categories, sortOptions] = await Promise.all([
    getProducts({
      category: category.slug,
      subcategory: category.subcategory?.slug,
      q,
      sort,
    }),
    getCategories(),
    getSortOptions(),
  ]);

  return (
    <ProductListing
      products={products}
      categories={categories}
      activeCategory={category}
      activeSubcategory={category.subcategory}
      q={q}
      sort={sort}
      sortOptions={sortOptions}
    />
  );
}
