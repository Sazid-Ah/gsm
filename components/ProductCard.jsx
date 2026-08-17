"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Star, Download, KeyRound, Check } from "lucide-react";
import { useCart } from "@/app/context/CartContext";

/**
 * A catalog tile. Two actions, matching the store model:
 *   - Download  → the file, free, no account, no purchase
 *   - License   → adds one one-time-use license for this tool to the cart
 */
export default function ProductCard({ product }) {
  const { addToCart } = useCart();
  const [added, setAdded] = useState(false);

  const handleAddLicense = () => {
    addToCart(product);
    setAdded(true);
    setTimeout(() => setAdded(false), 1400);
  };

  const discount = product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

  return (
    <div className="group relative flex flex-col overflow-hidden rounded-xl border border-slate-200 bg-white transition-all duration-300 hover:border-amber-500 hover:shadow-xl">
      {product.tag && (
        <span className="pointer-events-none absolute right-0 top-0 z-10 rounded-bl bg-red-600 px-2 py-0.5 text-[9px] font-black uppercase text-white shadow-sm">
          {product.tag}
        </span>
      )}

      <Link href={`/product/${product.id}`} className="block p-3 pb-0">
        <div className="relative mb-3 flex h-32 w-full items-center justify-center overflow-hidden rounded-lg border border-slate-100 bg-slate-50 transition-colors group-hover:bg-amber-500/5">
          <Image
            src={product.image}
            alt={product.name}
            fill
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 20vw"
            className="object-contain p-2 transition-transform duration-300 group-hover:scale-105"
          />
        </div>

        <span className="text-[9px] font-bold uppercase tracking-wider text-amber-600">
          {product.brand}
        </span>
        <h3 className="mt-0.5 line-clamp-2 min-h-[32px] text-xs font-bold leading-snug text-slate-800 transition-colors group-hover:text-amber-600">
          {product.name}
        </h3>
      </Link>

      <div className="flex flex-1 flex-col justify-between p-3 pt-2">
        <div className="mb-2 flex items-center gap-1">
          <div className="flex">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`h-3 w-3 ${
                  i < Math.round(product.rating)
                    ? "fill-amber-400 text-amber-400"
                    : "fill-slate-200 text-slate-200"
                }`}
              />
            ))}
          </div>
          <span className="text-[10px] font-medium text-slate-400">({product.reviews})</span>
        </div>

        {/* Free file */}
        <div className="mb-2 flex items-center justify-between rounded-lg bg-emerald-50 px-2 py-1.5 text-[10px]">
          <span className="flex items-center gap-1 font-bold text-emerald-700">
            <Download className="h-3 w-3" /> Free file
          </span>
          <span className="font-medium text-emerald-600">{product.file.size}</span>
        </div>

        {/* License price */}
        <div className="border-t border-slate-100 pt-2">
          <span className="block text-[9px] font-bold uppercase tracking-wider text-slate-400">
            One-time-use license
          </span>
          <div className="flex items-baseline gap-1.5">
            <span className="text-sm font-extrabold text-slate-900">
              ₹{product.price.toLocaleString("en-IN")}
            </span>
            {product.originalPrice && (
              <>
                <span className="text-[10px] text-slate-400 line-through">
                  ₹{product.originalPrice.toLocaleString("en-IN")}
                </span>
                <span className="text-[9px] font-bold text-red-600">-{discount}%</span>
              </>
            )}
          </div>

          <div className="mt-2 flex gap-1.5">
            <a
              href={`/api/download/${product.id}`}
              className="flex items-center justify-center rounded-lg border border-slate-200 bg-white p-2 text-slate-600 transition-colors hover:border-emerald-500 hover:text-emerald-600"
              title={`Download ${product.file.name} (free)`}
              aria-label={`Download ${product.name} file for free`}
            >
              <Download className="h-3.5 w-3.5" />
            </a>
            <button
              type="button"
              onClick={handleAddLicense}
              className={`flex flex-1 items-center justify-center gap-1.5 rounded-lg p-2 text-[10px] font-bold uppercase tracking-wide transition-all active:scale-95 ${
                added
                  ? "bg-emerald-600 text-white"
                  : "bg-amber-500 text-slate-950 hover:bg-amber-600"
              }`}
            >
              {added ? (
                <>
                  <Check className="h-3.5 w-3.5" /> Added
                </>
              ) : (
                <>
                  <KeyRound className="h-3.5 w-3.5" /> License
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
