import ProductListing from "@/components/ProductListing";
import { getCategories, getProducts, getSortOptions } from "@/lib/api";

export const metadata = {
  title: "All Tools & Files",
  description:
    "Browse every GSM tool, flash file and schematic. Free downloads, one-time-use licenses.",
};

export default async function ToolsPage({ searchParams }) {
  // Next 16: searchParams is a Promise.
  const { q = "", sort = "featured" } = await searchParams;

  const [products, categories, sortOptions] = await Promise.all([
    getProducts({ q, sort }),
    getCategories(),
    getSortOptions(),
  ]);

  return (
    <ProductListing
      products={products}
      categories={categories}
      q={q}
      sort={sort}
      sortOptions={sortOptions}
    />
  );
}
