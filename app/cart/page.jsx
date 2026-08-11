"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import FloatingWhatsApp from "@/components/FloatingWhatsApp";
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
  Zap,
  PackageCheck
} from "lucide-react";

export default function CartPage() {
  const { cart = [], cartCount = 0, updateQuantity, removeFromCart } = useCart();

  const [promoCode, setPromoCode] = useState("");
  const [discount, setDiscount] = useState(0);
  const [promoApplied, setPromoApplied] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  // Safely calculate subtotal from the cart array
  const subtotal = cart.reduce(
    (sum, item) => sum + (Number(item?.price) || 0) * (Number(item?.quantity) || 1),
    0
  );

  // Promo Code Handler
  const applyPromoCode = (e) => {
    e.preventDefault();
    if (promoCode.trim().toUpperCase() === "GSM10") {
      setDiscount(0.1); // 10% discount
      setPromoApplied(true);
    } else {
      alert("Invalid coupon code. Use 'GSM10' for 10% off.");
    }
  };

  // Dynamic calculations
  const discountAmount = subtotal * discount;
  const grandTotal = subtotal - discountAmount;

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans">
      {/* Header synced with global cart count */}
      <Header searchQuery={searchQuery} setSearchQuery={setSearchQuery} cartCount={cartCount} />

      <main className="flex-1 max-w-[1440px] w-full mx-auto px-4 md:px-8 py-8 space-y-8">
        {/* Navigation Breadcrumb */}
        <div className="flex items-center justify-between border-b border-slate-800 pb-4">
          <Link href="/" className="inline-flex items-center gap-2 text-xs font-bold text-slate-400 hover:text-amber-400 transition-colors uppercase tracking-wider">
            <ChevronLeft className="w-4 h-4" /> Continue Shopping
          </Link>
          <span className="text-xs text-slate-500 font-bold uppercase tracking-wider">
            Shopping Cart ({cartCount})
          </span>
        </div>

        {cart.length > 0 ? (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* DYNAMIC ITEM LIST (LEFT COLUMN) */}
            <div className="lg:col-span-2 space-y-4">
              {cart.map((item) => (
                <div
                  key={item.id}
                  className="bg-slate-900/80 border border-slate-800 rounded-2xl p-4 sm:p-5 flex flex-col sm:flex-row items-center justify-between gap-5 transition-all hover:border-slate-700"
                >
                  {/* Dynamic Product Image & Meta */}
                  <div className="flex items-center gap-4 w-full sm:w-auto flex-1">
                    <div className="relative w-16 h-16 rounded-xl overflow-hidden bg-slate-950 border border-slate-800 shrink-0">
                      <Image
                        src={item.image}
                        alt={item.name || "Product Image"}
                        fill
                        sizes="64px"
                        className="object-contain p-2"
                      />
                    </div>
                    <div className="space-y-1 flex-1">
                      <span className="text-[10px] font-bold text-amber-500 uppercase tracking-wider">
                        {item.category}
                      </span>
                      <Link href={`/product/${item.id}`} className="block text-sm font-bold text-white hover:text-amber-400 transition-colors line-clamp-1">
                        {item.name}
                      </Link>
                      <span className="inline-flex items-center gap-1 text-[10px] text-emerald-400 font-semibold">
                        <Zap className="w-3 h-3" /> 24/7 Instant Auto Refill
                      </span>
                    </div>
                  </div>

                  {/* Quantity Controls & Real-Time Price */}
                  <div className="flex items-center justify-between sm:justify-end gap-6 w-full sm:w-auto pt-4 sm:pt-0 border-t sm:border-t-0 border-slate-800">
                    {/* Quantity Adjustment Buttons */}
                    <div className="flex items-center bg-slate-950 border border-slate-800 rounded-xl px-2 py-1">
                      <button
                        onClick={() => updateQuantity && updateQuantity(item.id, -1)}
                        className="p-1 text-slate-400 hover:text-white transition-colors"
                        aria-label="Decrease quantity"
                      >
                        <Minus className="w-3.5 h-3.5" />
                      </button>
                      <span className="w-8 text-center text-xs font-bold text-white">{item.quantity}</span>
                      <button
                        onClick={() => updateQuantity && updateQuantity(item.id, 1)}
                        className="p-1 text-slate-400 hover:text-white transition-colors"
                        aria-label="Increase quantity"
                      >
                        <Plus className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    {/* Total Item Price */}
                    <div className="text-right min-w-[90px]">
                      <span className="block text-xs font-black text-white">
                        ₹{((item.price || 0) * (item.quantity || 1)).toLocaleString("en-IN")}
                      </span>
                      {item.quantity > 1 && (
                        <span className="text-[10px] text-slate-500 font-medium">
                          ₹{(item.price || 0).toLocaleString("en-IN")} each
                        </span>
                      )}
                    </div>

                    {/* Remove Item Button */}
                    <button
                      onClick={() => removeFromCart && removeFromCart(item.id)}
                      className="p-2 rounded-xl text-slate-500 hover:text-rose-400 hover:bg-rose-500/10 transition-colors"
                      title="Remove item"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}

              <div className="bg-slate-900/40 border border-slate-800/60 rounded-2xl p-4 flex items-center justify-between text-xs text-slate-400">
                <span className="flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-emerald-400" />
                  All server credits and licenses are delivered automatically via API.
                </span>
              </div>
            </div>

            {/* DYNAMIC ORDER SUMMARY (RIGHT COLUMN) */}
            <div className="space-y-6">
              <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-6 sticky top-28">
                <h2 className="text-base font-black text-white uppercase tracking-wider border-b border-slate-800 pb-4">
                  Order Summary
                </h2>

                {/* Promo Coupon */}
                <form onSubmit={applyPromoCode} className="space-y-2">
                  <label className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">
                    Have a promo code?
                  </label>
                  <div className="flex gap-2">
                    <div className="relative flex-1">
                      <Tag className="w-4 h-4 text-slate-500 absolute left-3 top-3" />
                      <input
                        type="text"
                        value={promoCode}
                        onChange={(e) => setPromoCode(e.target.value)}
                        placeholder="Try GSM10"
                        className="w-full bg-slate-950 border border-slate-800 focus:border-amber-500 rounded-xl pl-9 pr-3 py-2 text-xs text-white uppercase outline-none"
                      />
                    </div>
                    <button
                      type="submit"
                      className="bg-slate-800 hover:bg-slate-700 text-white font-bold px-4 py-2 rounded-xl text-xs uppercase tracking-wider transition-colors"
                    >
                      Apply
                    </button>
                  </div>
                  {promoApplied && (
                    <p className="text-[11px] text-emerald-400 font-bold flex items-center gap-1">
                      <PackageCheck className="w-3.5 h-3.5" /> 10% Promo Discount Applied!
                    </p>
                  )}
                </form>

                {/* Price Breakdown */}
                <div className="space-y-3 text-xs border-t border-b border-slate-800 py-4">
                  <div className="flex justify-between text-slate-400">
                    <span>Subtotal</span>
                    <span className="font-bold text-white">
                      ₹{(subtotal || 0).toLocaleString("en-IN")}
                    </span>
                  </div>
                  {discount > 0 && (
                    <div className="flex justify-between text-emerald-400">
                      <span>Promo Discount (10%)</span>
                      <span className="font-bold">-₹{(discountAmount || 0).toLocaleString("en-IN")}</span>
                    </div>
                  )}
                  <div className="flex justify-between text-slate-400">
                    <span>Digital Service Delivery</span>
                    <span className="font-bold text-emerald-400">FREE / INSTANT</span>
                  </div>
                </div>

                {/* Final Grand Total */}
                <div className="flex items-center justify-between">
                  <span className="text-sm font-bold text-white uppercase tracking-wider">Total Amount</span>
                  <div className="text-right">
                    <span className="text-xl font-black text-amber-400">
                      ₹{(grandTotal || 0).toLocaleString("en-IN")}
                    </span>
                    <span className="block text-[10px] text-slate-500">Taxes included</span>
                  </div>
                </div>

                {/* Checkout CTA */}
                <Link
                  href="/checkout"
                  className="w-full bg-amber-500 hover:bg-amber-400 text-slate-950 font-black py-3.5 rounded-xl transition-all shadow-lg shadow-amber-500/20 text-xs uppercase tracking-wider flex items-center justify-center gap-2"
                >
                  Proceed to Checkout <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </div>
        ) : (
          /* DYNAMIC EMPTY STATE */
          <div className="bg-slate-900/40 border border-slate-800 rounded-3xl p-12 text-center max-w-lg mx-auto space-y-6 my-12">
            <div className="w-20 h-20 bg-slate-900 rounded-full flex items-center justify-center mx-auto text-slate-600 border border-slate-800">
              <ShoppingBag className="w-10 h-10" />
            </div>
            <div className="space-y-2">
              <h2 className="text-xl font-black text-white">Your Cart is Empty</h2>
              <p className="text-xs text-slate-400 leading-relaxed">
                You haven't added any software licenses, server credits, or hardware tools to your cart yet.
              </p>
            </div>
            <Link
              href="/"
              className="inline-flex items-center gap-2 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold px-6 py-3 rounded-xl text-xs uppercase tracking-wider transition-all"
            >
              Start Shopping <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        )}
      </main>

      <Footer />
      <FloatingWhatsApp />
    </div>
  );
}