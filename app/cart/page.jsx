"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useCart } from "../context/CartContext";
import {
  Trash2,
  Plus,
  Minus,
  ShoppingBag,
  ArrowRight,
  ShieldCheck,
  Tag,
  ChevronLeft,
  KeyRound,
  Download,
  PackageCheck,
} from "lucide-react";

export default function CartPage() {
  const { cart = [], cartCount = 0, subtotal = 0, updateQuantity, removeFromCart } = useCart();

  const [promoCode, setPromoCode] = useState("");
  const [discount, setDiscount] = useState(0);
  const [promoError, setPromoError] = useState("");

  const applyPromoCode = (e) => {
    e.preventDefault();
    if (promoCode.trim().toUpperCase() === "GSM10") {
      setDiscount(0.1);
      setPromoError("");
    } else {
      setDiscount(0);
      setPromoError("That code is not valid. Try GSM10 for 10% off.");
    }
  };

  const discountAmount = subtotal * discount;
  const grandTotal = subtotal - discountAmount;

  return (
    <div className="min-h-full bg-slate-950 text-slate-100">
      <div className="mx-auto w-full max-w-[1440px] space-y-8 px-4 py-8 md:px-8">
        <div className="flex items-center justify-between border-b border-slate-800 pb-4">
          <Link
            href="/tools"
            className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-400 transition-colors hover:text-amber-400"
          >
            <ChevronLeft className="h-4 w-4" /> Continue shopping
          </Link>
          <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
            {cartCount} {cartCount === 1 ? "license" : "licenses"}
          </span>
        </div>

        {cart.length > 0 ? (
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
            {/* Licenses in cart */}
            <div className="space-y-4 lg:col-span-2">
              <div className="flex items-start gap-2 rounded-2xl border border-emerald-500/20 bg-emerald-500/5 p-4 text-[11px] leading-relaxed text-emerald-300">
                <Download className="mt-0.5 h-4 w-4 shrink-0" />
                <span>
                  <strong className="text-emerald-200">You are only paying for licenses.</strong> The
                  files themselves are free — download them any time from the product page, before or
                  after buying.
                </span>
              </div>

              {cart.map((item) => (
                <div
                  key={item.id}
                  className="flex flex-col items-center justify-between gap-5 rounded-2xl border border-slate-800 bg-slate-900/80 p-4 transition-all hover:border-slate-700 sm:flex-row sm:p-5"
                >
                  <div className="flex w-full flex-1 items-center gap-4 sm:w-auto">
                    <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-xl border border-slate-800 bg-slate-950">
                      <Image
                        src={item.image}
                        alt={item.name}
                        fill
                        sizes="64px"
                        className="object-contain p-2"
                      />
                    </div>
                    <div className="flex-1 space-y-1">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-amber-500">
                        {item.brand}
                      </span>
                      <Link
                        href={`/product/${item.id}`}
                        className="line-clamp-1 block text-sm font-bold text-white transition-colors hover:text-amber-400"
                      >
                        {item.name}
                      </Link>
                      <span className="inline-flex items-center gap-1 text-[10px] font-semibold text-emerald-400">
                        <KeyRound className="h-3 w-3" />
                        One-time-use license · {item.license?.scope ?? "single operation"}
                      </span>
                    </div>
                  </div>

                  <div className="flex w-full items-center justify-between gap-6 border-t border-slate-800 pt-4 sm:w-auto sm:justify-end sm:border-t-0 sm:pt-0">
                    <div className="flex items-center rounded-xl border border-slate-800 bg-slate-950 px-2 py-1">
                      <button
                        onClick={() => updateQuantity(item.id, -1)}
                        className="p-1 text-slate-400 transition-colors hover:text-white"
                        aria-label={`Fewer licenses for ${item.name}`}
                      >
                        <Minus className="h-3.5 w-3.5" />
                      </button>
                      <span className="w-8 text-center text-xs font-bold text-white">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => updateQuantity(item.id, 1)}
                        className="p-1 text-slate-400 transition-colors hover:text-white"
                        aria-label={`More licenses for ${item.name}`}
                      >
                        <Plus className="h-3.5 w-3.5" />
                      </button>
                    </div>

                    <div className="min-w-[90px] text-right">
                      <span className="block text-xs font-black text-white">
                        ₹{((item.price || 0) * (item.quantity || 1)).toLocaleString("en-IN")}
                      </span>
                      <span className="text-[10px] font-medium text-slate-500">
                        ₹{(item.price || 0).toLocaleString("en-IN")} per use
                      </span>
                    </div>

                    <button
                      onClick={() => removeFromCart(item.id)}
                      className="rounded-xl p-2 text-slate-500 transition-colors hover:bg-rose-500/10 hover:text-rose-400"
                      title="Remove"
                      aria-label={`Remove ${item.name} from cart`}
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              ))}

              <div className="flex items-center justify-between rounded-2xl border border-slate-800/60 bg-slate-900/40 p-4 text-xs text-slate-400">
                <span className="flex items-center gap-2">
                  <ShieldCheck className="h-4 w-4 text-emerald-400" />
                  License keys are issued instantly on the confirmation screen.
                </span>
              </div>
            </div>

            {/* Summary */}
            <div className="space-y-6">
              <div className="space-y-6 rounded-2xl border border-slate-800 bg-slate-900 p-6 lg:sticky lg:top-56">
                <h2 className="border-b border-slate-800 pb-4 text-base font-black uppercase tracking-wider text-white">
                  Order summary
                </h2>

                <form onSubmit={applyPromoCode} className="space-y-2">
                  <label
                    htmlFor="promo"
                    className="block text-[11px] font-bold uppercase tracking-wider text-slate-400"
                  >
                    Have a promo code?
                  </label>
                  <div className="flex gap-2">
                    <div className="relative flex-1">
                      <Tag className="absolute left-3 top-3 h-4 w-4 text-slate-500" />
                      <input
                        id="promo"
                        type="text"
                        value={promoCode}
                        onChange={(e) => setPromoCode(e.target.value)}
                        placeholder="Try GSM10"
                        className="w-full rounded-xl border border-slate-800 bg-slate-950 py-2 pl-9 pr-3 text-xs uppercase text-white outline-none focus:border-amber-500"
                      />
                    </div>
                    <button
                      type="submit"
                      className="rounded-xl bg-slate-800 px-4 py-2 text-xs font-bold uppercase tracking-wider text-white transition-colors hover:bg-slate-700"
                    >
                      Apply
                    </button>
                  </div>
                  {discount > 0 && (
                    <p className="flex items-center gap-1 text-[11px] font-bold text-emerald-400">
                      <PackageCheck className="h-3.5 w-3.5" /> 10% promo discount applied
                    </p>
                  )}
                  {promoError && (
                    <p className="text-[11px] font-semibold text-rose-400">{promoError}</p>
                  )}
                </form>

                <div className="space-y-3 border-b border-t border-slate-800 py-4 text-xs">
                  <div className="flex justify-between text-slate-400">
                    <span>
                      Licenses ({cartCount} {cartCount === 1 ? "use" : "uses"})
                    </span>
                    <span className="font-bold text-white">
                      ₹{subtotal.toLocaleString("en-IN")}
                    </span>
                  </div>
                  {discount > 0 && (
                    <div className="flex justify-between text-emerald-400">
                      <span>Promo discount (10%)</span>
                      <span className="font-bold">
                        -₹{Math.round(discountAmount).toLocaleString("en-IN")}
                      </span>
                    </div>
                  )}
                  <div className="flex justify-between text-slate-400">
                    <span>File downloads</span>
                    <span className="font-bold text-emerald-400">FREE</span>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-sm font-bold uppercase tracking-wider text-white">Total</span>
                  <div className="text-right">
                    <span className="text-xl font-black text-amber-400">
                      ₹{Math.round(grandTotal).toLocaleString("en-IN")}
                    </span>
                    <span className="block text-[10px] text-slate-500">Taxes included</span>
                  </div>
                </div>

                <Link
                  href="/checkout"
                  className="flex w-full items-center justify-center gap-2 rounded-xl bg-amber-500 py-3.5 text-xs font-black uppercase tracking-wider text-slate-950 shadow-lg shadow-amber-500/20 transition-all hover:bg-amber-400"
                >
                  Checkout <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </div>
          </div>
        ) : (
          <div className="mx-auto my-12 max-w-lg space-y-6 rounded-3xl border border-slate-800 bg-slate-900/40 p-12 text-center">
            <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full border border-slate-800 bg-slate-900 text-slate-600">
              <ShoppingBag className="h-10 w-10" />
            </div>
            <div className="space-y-2">
              <h1 className="text-xl font-black text-white">No licenses in your cart</h1>
              <p className="text-xs leading-relaxed text-slate-400">
                Remember: the files are free to download without buying anything. You only need a
                license when you are ready to run a tool on a device.
              </p>
            </div>
            <Link
              href="/tools"
              className="inline-flex items-center gap-2 rounded-xl bg-amber-500 px-6 py-3 text-xs font-bold uppercase tracking-wider text-slate-950 transition-all hover:bg-amber-400"
            >
              Browse tools <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
