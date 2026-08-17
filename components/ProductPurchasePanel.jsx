"use client";

import { useState } from "react";
import Image from "next/image";
import {
  Star,
  Download,
  KeyRound,
  Check,
  Plus,
  Minus,
  Zap,
  ShieldCheck,
  MessageCircle,
  FileDown,
} from "lucide-react";
import { useCart } from "@/app/context/CartContext";

/**
 * The buy box. Two independent actions:
 *   1. Download the file — free, immediate, no account and no purchase.
 *   2. Buy one-time-use licenses — quantity is how many runs you are paying for.
 */
export default function ProductPurchasePanel({ product, whatsapp }) {
  const { addToCart } = useCart();
  const [selectedImage, setSelectedImage] = useState(product.images?.[0] ?? product.image);
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);

  const handleAddLicenses = () => {
    for (let i = 0; i < quantity; i++) addToCart(product);
    setAdded(true);
    setTimeout(() => setAdded(false), 1600);
  };

  const discount = product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

  return (
    <div className="grid grid-cols-1 gap-8 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm lg:grid-cols-12 md:p-8">
      {/* Gallery */}
      <div className="flex flex-col gap-4 lg:col-span-5">
        <div className="group relative h-[320px] w-full overflow-hidden rounded-xl border border-slate-200 bg-slate-50 sm:h-[400px]">
          <Image
            src={selectedImage}
            alt={product.name}
            fill
            priority
            sizes="(max-width: 1024px) 100vw, 40vw"
            className="object-contain p-4 transition-transform duration-300 group-hover:scale-105"
          />
          {product.tag && (
            <span className="absolute right-3 top-3 rounded-md bg-red-600 px-2.5 py-1 text-[10px] font-black uppercase text-white shadow-sm">
              {product.tag}
            </span>
          )}
        </div>

        {product.images?.length > 1 && (
          <div className="flex gap-3 overflow-x-auto pb-2">
            {product.images.map((img, idx) => (
              <button
                key={img}
                type="button"
                onClick={() => setSelectedImage(img)}
                aria-label={`View image ${idx + 1}`}
                className={`relative h-16 w-16 shrink-0 overflow-hidden rounded-lg border-2 bg-slate-50 transition-all sm:h-20 sm:w-20 ${
                  selectedImage === img
                    ? "border-amber-500 shadow-md"
                    : "border-slate-200 hover:border-slate-400"
                }`}
              >
                <Image src={img} alt="" fill sizes="80px" className="object-contain p-1" />
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Details + actions */}
      <div className="flex flex-col lg:col-span-7">
        <div className="mb-2 flex items-center justify-between gap-4">
          <span className="rounded-md bg-amber-50 px-2.5 py-1 text-xs font-bold uppercase tracking-wider text-amber-600">
            {product.brand}
          </span>
          <div className="flex items-center gap-1.5 rounded-md bg-slate-100 px-2.5 py-1">
            <div className="flex">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`h-3.5 w-3.5 ${
                    i < Math.round(product.rating)
                      ? "fill-amber-400 text-amber-400"
                      : "fill-slate-300 text-slate-300"
                  }`}
                />
              ))}
            </div>
            <span className="text-xs font-bold text-slate-700">
              {product.rating} ({product.reviews})
            </span>
          </div>
        </div>

        <h1 className="mb-2 text-xl font-extrabold leading-tight text-slate-900 sm:text-2xl">
          {product.name}
        </h1>
        <p className="mb-5 text-xs leading-relaxed text-slate-500">{product.summary}</p>

        {/* STEP 1 — free download */}
        <div className="mb-4 rounded-xl border border-emerald-200 bg-emerald-50 p-4">
          <div className="mb-3 flex items-center justify-between gap-3">
            <div>
              <span className="flex items-center gap-1.5 text-[10px] font-black uppercase tracking-wider text-emerald-700">
                <span className="grid h-4 w-4 place-items-center rounded-full bg-emerald-600 text-[9px] text-white">
                  1
                </span>
                Download the file
              </span>
              <p className="mt-1 text-[11px] font-medium text-emerald-800">
                Free for everyone — no account, no payment.
              </p>
            </div>
            <span className="shrink-0 rounded-md bg-emerald-600 px-2 py-1 text-[10px] font-black uppercase text-white">
              Free
            </span>
          </div>

          <a
            href={`/api/download/${product.id}`}
            className="flex items-center justify-center gap-2 rounded-xl bg-emerald-600 px-6 py-3 text-xs font-extrabold uppercase tracking-wide text-white shadow-lg shadow-emerald-600/20 transition-all hover:bg-emerald-700 active:scale-95"
          >
            <Download className="h-4 w-4" />
            Download {product.file.name}
          </a>

          <dl className="mt-3 grid grid-cols-2 gap-x-4 gap-y-1.5 text-[10px] text-emerald-800 sm:grid-cols-4">
            <div>
              <dt className="font-bold uppercase tracking-wider opacity-60">Version</dt>
              <dd className="font-bold">{product.file.version}</dd>
            </div>
            <div>
              <dt className="font-bold uppercase tracking-wider opacity-60">Size</dt>
              <dd className="font-bold">{product.file.size}</dd>
            </div>
            <div>
              <dt className="font-bold uppercase tracking-wider opacity-60">Updated</dt>
              <dd className="font-bold">{product.file.updated}</dd>
            </div>
            <div>
              <dt className="font-bold uppercase tracking-wider opacity-60">Needs</dt>
              <dd className="font-bold">{product.file.requirements}</dd>
            </div>
          </dl>
        </div>

        {/* STEP 2 — license */}
        <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
          <div className="mb-3 flex items-start justify-between gap-3">
            <div>
              <span className="flex items-center gap-1.5 text-[10px] font-black uppercase tracking-wider text-slate-700">
                <span className="grid h-4 w-4 place-items-center rounded-full bg-amber-500 text-[9px] text-slate-950">
                  2
                </span>
                Buy a license to run it
              </span>
              <p className="mt-1 text-[11px] font-medium text-slate-500">
                {product.license.type} · {product.license.scope}
              </p>
            </div>
            <div className="shrink-0 text-right">
              <div className="flex items-baseline gap-2">
                <span className="text-2xl font-black text-slate-900">
                  ₹{product.price.toLocaleString("en-IN")}
                </span>
                {product.originalPrice && (
                  <span className="text-sm font-semibold text-slate-400 line-through">
                    ₹{product.originalPrice.toLocaleString("en-IN")}
                  </span>
                )}
              </div>
              {discount > 0 && (
                <span className="text-[10px] font-bold text-red-600">{discount}% off · per use</span>
              )}
            </div>
          </div>

          {/* Quantity = number of one-time uses */}
          <div className="mb-3 flex flex-wrap items-center gap-3 border-t border-slate-200 pt-3">
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-600">
              How many uses?
            </span>
            <div className="flex items-center overflow-hidden rounded-lg border border-slate-300 bg-white">
              <button
                type="button"
                onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                aria-label="Decrease license count"
                className="p-2.5 text-slate-600 transition-colors hover:bg-slate-100 hover:text-slate-900"
              >
                <Minus className="h-3.5 w-3.5" />
              </button>
              <span className="min-w-[3rem] select-none text-center text-xs font-bold text-slate-900">
                {quantity}
              </span>
              <button
                type="button"
                onClick={() => setQuantity((q) => q + 1)}
                aria-label="Increase license count"
                className="p-2.5 text-slate-600 transition-colors hover:bg-slate-100 hover:text-slate-900"
              >
                <Plus className="h-3.5 w-3.5" />
              </button>
            </div>
            <span className="text-xs font-bold text-slate-900">
              = ₹{(product.price * quantity).toLocaleString("en-IN")}
            </span>
          </div>

          <div className="flex flex-col gap-2 sm:flex-row">
            <button
              type="button"
              onClick={handleAddLicenses}
              className={`flex flex-1 items-center justify-center gap-2 rounded-xl px-6 py-3 text-xs font-extrabold uppercase tracking-wide shadow-lg transition-all active:scale-95 ${
                added
                  ? "bg-emerald-600 text-white shadow-emerald-600/20"
                  : "bg-amber-500 text-slate-950 shadow-amber-500/20 hover:bg-amber-600"
              }`}
            >
              {added ? (
                <>
                  <Check className="h-4 w-4" /> Added to cart
                </>
              ) : (
                <>
                  <KeyRound className="h-4 w-4" /> Buy {quantity} license{quantity > 1 ? "s" : ""}
                </>
              )}
            </button>

            <a
              href={`https://wa.me/${whatsapp}?text=${encodeURIComponent(
                `Hi, I have a question about ${product.name} before buying a license.`
              )}`}
              target="_blank"
              rel="noreferrer"
              className="flex items-center justify-center gap-2 rounded-xl border border-slate-300 bg-white px-5 py-3 text-xs font-extrabold uppercase tracking-wide text-slate-700 transition-all hover:border-emerald-500 hover:text-emerald-600 active:scale-95"
            >
              <MessageCircle className="h-4 w-4" />
              Ask first
            </a>
          </div>
        </div>

        {/* Assurances */}
        <div className="mt-4 grid grid-cols-3 gap-2 border-t border-slate-100 pt-4 text-center">
          <div className="flex flex-col items-center p-2">
            <FileDown className="mb-1 h-5 w-5 text-emerald-500" />
            <span className="text-[10px] font-bold text-slate-700">File always free</span>
          </div>
          <div className="flex flex-col items-center border-x border-slate-100 p-2">
            <Zap className="mb-1 h-5 w-5 text-amber-500" />
            <span className="text-[10px] font-bold text-slate-700">Instant key delivery</span>
          </div>
          <div className="flex flex-col items-center p-2">
            <ShieldCheck className="mb-1 h-5 w-5 text-cyan-600" />
            <span className="text-[10px] font-bold text-slate-700">No signup required</span>
          </div>
        </div>
      </div>
    </div>
  );
}
