"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Star, ShoppingCart } from "lucide-react";

export default function ProductGrid({
  title = "New Arrival Products",
  products ,
  onAddToCart,
}) {
  return (
    <section className="max-w-[1440px] mx-auto px-4 md:px-8 py-6 font-sans">
      {/* Section Header */}
      <div className="flex items-center justify-between border-b-2 border-slate-200 pb-2.5 mb-6">
        <h2 className="text-sm md:text-base font-extrabold text-slate-900 uppercase tracking-wide border-l-4 border-amber-500 pl-3">
          {title}
        </h2>
        <a href="#" className="text-xs text-amber-600 font-bold hover:underline">
          More Products →
        </a>
      </div>

      {/* Grid List */}
      {products.length === 0 ? (
        <div className="text-center py-12 bg-white rounded-xl border border-slate-200">
          <p className="text-xs text-slate-500 font-semibold">
            No tools found matching your search.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3 md:gap-4">
          {products.map((product) => (
            <div
              key={product.id}
              className="group bg-white border border-slate-200 rounded-xl p-3 flex flex-col justify-between hover:border-amber-500 hover:shadow-xl transition-all duration-300 relative overflow-hidden"
            >
              {/* Product Badge */}
              {product.tag && (
                <div className="absolute top-0 right-0 bg-red-600 text-white text-[9px] font-black uppercase px-2 py-0.5 rounded-bl z-10 shadow-sm pointer-events-none">
                  {product.tag}
                </div>
              )}

              {/* CLICKABLE PRODUCT LINK (Image & Title) */}
              <Link href={`/product/${product.id}`} className="block">
                {/* Product Image Area */}
                <div className="w-full h-32 bg-slate-50 border border-slate-100 rounded-lg flex items-center justify-center relative mb-3 group-hover:bg-amber-500/5 transition-colors overflow-hidden">
                  {product.image ? (
                    <Image
                      src={product.image}
                      alt={product.name}
                      fill
                      sizes="(max-width: 768px) 50vw, (max-width: 1200px) 25vw, 16vw"
                      className="object-contain p-2 group-hover:scale-105 transition-transform duration-300"
                    />
                  ) : (
                    <span className="text-slate-400 font-bold text-[10px] uppercase tracking-wider text-center px-2">
                      {product.category}
                    </span>
                  )}
                </div>

                {/* Title */}
                <h3 className="text-xs font-bold text-slate-800 line-clamp-2 hover:text-amber-600 transition-colors leading-snug min-h-[32px]">
                  {product.name}
                </h3>
              </Link>

              {/* Rating & Action Controls */}
              <div className="flex-1 flex flex-col justify-between mt-2">
                <div>
                  <div className="flex items-center gap-1 mb-2">
                    <div className="flex text-amber-400">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className="w-3 h-3 fill-amber-400 text-amber-400"
                        />
                      ))}
                    </div>
                    <span className="text-[10px] text-slate-400 font-medium">
                      ({product.reviews})
                    </span>
                  </div>
                </div>

                {/* Price & Add to Cart */}
                <div className="pt-2 border-t border-slate-100 flex items-center justify-between">
                  <div>
                    <div className="text-sm font-extrabold text-slate-900">
                      ₹{product.price.toLocaleString()}
                    </div>
                    {product.originalPrice !== null && (
                      <div className="text-[10px] text-slate-400 line-through">
                        ₹{product.originalPrice.toLocaleString()}
                      </div>
                    )}
                  </div>

                  <button
                    onClick={onAddToCart}
                    className="bg-amber-500 hover:bg-amber-600 active:scale-95 text-slate-950 p-2 rounded-lg transition-all shadow-sm"
                    title="Add to Cart"
                  >
                    <ShoppingCart className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}