"use client";

import { useState } from "react";
import Link from "next/link";
import { useCart } from "@/app/context/CartContext";
import { createOrder } from "@/lib/api";
import {
  ShieldCheck,
  Lock,
  CreditCard,
  Smartphone,
  Building,
  CheckCircle2,
  ChevronLeft,
  Zap,
  KeyRound,
  ArrowRight,
  Copy,
  Check,
  Download,
  ShoppingBag,
} from "lucide-react";

const PAYMENT_ICONS = { smartphone: Smartphone, card: CreditCard, bank: Building };

export default function CheckoutForm({ paymentMethods = [] }) {
  const { cart = [], cartCount = 0, subtotal = 0, clearCart } = useCart();

  const [paymentMethod, setPaymentMethod] = useState(paymentMethods[0]?.id ?? "upi");
  const [submitting, setSubmitting] = useState(false);
  const [order, setOrder] = useState(null);
  const [copiedKey, setCopiedKey] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    deviceRef: "",
    notes: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (cart.length === 0 || submitting) return;

    setSubmitting(true);
    try {
      // POST /orders — see lib/api.js. Returns one single-use key per unit.
      const result = await createOrder({
        customer: formData,
        items: cart,
        paymentMethod,
      });
      setOrder(result);
      clearCart();
    } finally {
      setSubmitting(false);
    }
  };

  const copyKey = async (key) => {
    try {
      await navigator.clipboard.writeText(key);
      setCopiedKey(key);
      setTimeout(() => setCopiedKey(null), 1500);
    } catch {
      // Clipboard permission denied — the key stays visible on screen.
    }
  };

  /* ------------------------- ORDER CONFIRMATION ------------------------- */
  if (order) {
    return (
      <div className="min-h-full bg-slate-950 text-slate-100">
        <div className="mx-auto w-full max-w-2xl px-4 py-12">
          <div className="space-y-6 rounded-3xl border border-slate-800 bg-slate-900 p-8 shadow-2xl">
            <div className="text-center">
              <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full border border-emerald-500/20 bg-emerald-500/10 text-emerald-400">
                <CheckCircle2 className="h-8 w-8" />
              </div>
              <span className="text-[10px] font-bold uppercase tracking-widest text-amber-500">
                Order {order.reference}
              </span>
              <h1 className="mt-1 text-2xl font-black text-white">Licenses issued</h1>
              <p className="mt-2 text-xs leading-relaxed text-slate-400">
                {order.licenses.length} single-use{" "}
                {order.licenses.length === 1 ? "key is" : "keys are"} ready below. A copy has been
                sent to <strong className="text-white">{order.customer.email}</strong>.
              </p>
            </div>

            {/* License keys */}
            <div className="space-y-2">
              <h2 className="flex items-center gap-2 text-[10px] font-black uppercase tracking-wider text-slate-400">
                <KeyRound className="h-3.5 w-3.5 text-amber-400" /> Your one-time-use keys
              </h2>
              {order.licenses.map((license, index) => (
                <div
                  key={`${license.key}-${index}`}
                  className="flex items-center justify-between gap-3 rounded-xl border border-slate-800 bg-slate-950 p-3"
                >
                  <div className="min-w-0">
                    <span className="block truncate text-[11px] font-semibold text-slate-400">
                      {license.productName}
                    </span>
                    <code className="font-mono text-sm font-bold tracking-wider text-amber-400">
                      {license.key}
                    </code>
                  </div>
                  <div className="flex shrink-0 items-center gap-1">
                    <a
                      href={`/api/download/${license.productId}`}
                      title="Download the file (free)"
                      className="rounded-lg p-2 text-slate-500 transition-colors hover:bg-slate-800 hover:text-emerald-400"
                    >
                      <Download className="h-4 w-4" />
                    </a>
                    <button
                      type="button"
                      onClick={() => copyKey(license.key)}
                      title="Copy key"
                      className="rounded-lg p-2 text-slate-500 transition-colors hover:bg-slate-800 hover:text-white"
                    >
                      {copiedKey === license.key ? (
                        <Check className="h-4 w-4 text-emerald-400" />
                      ) : (
                        <Copy className="h-4 w-4" />
                      )}
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <div className="space-y-2.5 rounded-2xl border border-slate-800 bg-slate-950 p-4 text-xs">
              <div className="flex justify-between text-slate-400">
                <span>Payment method</span>
                <span className="font-bold uppercase text-white">{order.paymentMethod}</span>
              </div>
              {order.customer.deviceRef && (
                <div className="flex justify-between text-slate-400">
                  <span>Device / tool reference</span>
                  <span className="font-mono font-bold text-amber-400">
                    {order.customer.deviceRef}
                  </span>
                </div>
              )}
              <div className="flex justify-between border-t border-slate-800/80 pt-2 text-slate-400">
                <span>Total paid</span>
                <span className="text-sm font-bold text-emerald-400">
                  ₹{order.total.toLocaleString("en-IN")}
                </span>
              </div>
            </div>

            <p className="rounded-xl bg-amber-500/10 p-3 text-[11px] leading-relaxed text-amber-300">
              Each key unlocks a single operation. Keep them safe — once a key is consumed it cannot
              be reused, and the file itself stays free to download any time.
            </p>

            <div className="flex flex-col gap-2 sm:flex-row">
              <Link
                href="/tools"
                className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-amber-500 py-3 text-xs font-bold uppercase tracking-wider text-slate-950 transition-all hover:bg-amber-400"
              >
                Browse more tools <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                href="/"
                className="flex flex-1 items-center justify-center gap-2 rounded-xl border border-slate-800 py-3 text-xs font-bold uppercase tracking-wider text-slate-300 transition-all hover:border-slate-700 hover:text-white"
              >
                Home
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  /* ----------------------------- EMPTY CART ----------------------------- */
  if (cart.length === 0) {
    return (
      <div className="min-h-full bg-slate-950 text-slate-100">
        <div className="mx-auto my-12 max-w-lg space-y-6 rounded-3xl border border-slate-800 bg-slate-900/40 p-12 text-center">
          <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full border border-slate-800 bg-slate-900 text-slate-600">
            <ShoppingBag className="h-10 w-10" />
          </div>
          <h1 className="text-xl font-black text-white">Nothing to check out</h1>
          <p className="text-xs leading-relaxed text-slate-400">
            Add a one-time-use license to your cart first. Downloads never need checkout — they are
            free.
          </p>
          <Link
            href="/tools"
            className="inline-flex items-center gap-2 rounded-xl bg-amber-500 px-6 py-3 text-xs font-bold uppercase tracking-wider text-slate-950 transition-all hover:bg-amber-400"
          >
            Browse tools <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    );
  }

  /* ---------------------------- CHECKOUT FORM --------------------------- */
  return (
    <div className="min-h-full bg-slate-950 text-slate-100">
      <div className="mx-auto w-full max-w-[1440px] space-y-8 px-4 py-8 md:px-8">
        <div className="flex items-center justify-between border-b border-slate-800 pb-4">
          <Link
            href="/cart"
            className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-400 transition-colors hover:text-amber-400"
          >
            <ChevronLeft className="h-4 w-4" /> Return to cart
          </Link>
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-emerald-400">
            <Lock className="h-3.5 w-3.5" /> Encrypted checkout
          </div>
        </div>

        <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-8 lg:grid-cols-3">
          <div className="space-y-6 lg:col-span-2">
            {/* Step 1 — delivery details, no account */}
            <section className="space-y-4 rounded-2xl border border-slate-800 bg-slate-900/80 p-6">
              <h2 className="flex items-center gap-2 text-sm font-extrabold uppercase tracking-wider text-white">
                <span className="flex h-6 w-6 items-center justify-center rounded-full bg-amber-500 text-xs font-black text-slate-950">
                  1
                </span>
                Where should we send the keys?
              </h2>
              <p className="text-xs text-slate-400">
                No account required — keys appear on the next screen and are emailed as a backup.
              </p>

              <div className="grid grid-cols-1 gap-4 pt-2 sm:grid-cols-2">
                <div>
                  <label
                    htmlFor="name"
                    className="mb-1.5 block text-[11px] font-bold uppercase text-slate-400"
                  >
                    Full name
                  </label>
                  <input
                    id="name"
                    required
                    type="text"
                    placeholder="Your name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full rounded-xl border border-slate-800 bg-slate-950 px-4 py-2.5 text-xs text-white outline-none focus:border-amber-500"
                  />
                </div>

                <div>
                  <label
                    htmlFor="email"
                    className="mb-1.5 block text-[11px] font-bold uppercase text-slate-400"
                  >
                    Email address
                  </label>
                  <input
                    id="email"
                    required
                    type="email"
                    placeholder="you@example.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full rounded-xl border border-slate-800 bg-slate-950 px-4 py-2.5 text-xs text-white outline-none focus:border-amber-500"
                  />
                </div>

                <div>
                  <label
                    htmlFor="phone"
                    className="mb-1.5 block text-[11px] font-bold uppercase text-slate-400"
                  >
                    WhatsApp number
                  </label>
                  <input
                    id="phone"
                    required
                    type="tel"
                    placeholder="+91 00000 00000"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full rounded-xl border border-slate-800 bg-slate-950 px-4 py-2.5 text-xs text-white outline-none focus:border-amber-500"
                  />
                </div>

                <div>
                  <label
                    htmlFor="deviceRef"
                    className="mb-1.5 block text-[11px] font-bold uppercase text-slate-400"
                  >
                    Device / tool ID <span className="text-slate-600">(optional)</span>
                  </label>
                  <input
                    id="deviceRef"
                    type="text"
                    placeholder="IMEI or tool username"
                    value={formData.deviceRef}
                    onChange={(e) => setFormData({ ...formData, deviceRef: e.target.value })}
                    className="w-full rounded-xl border border-slate-800 bg-slate-950 px-4 py-2.5 text-xs text-white outline-none focus:border-amber-500"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label
                    htmlFor="notes"
                    className="mb-1.5 block text-[11px] font-bold uppercase text-slate-400"
                  >
                    Notes <span className="text-slate-600">(optional)</span>
                  </label>
                  <textarea
                    id="notes"
                    rows={2}
                    placeholder="Anything we should know about this order..."
                    value={formData.notes}
                    onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                    className="w-full resize-none rounded-xl border border-slate-800 bg-slate-950 px-4 py-2 text-xs text-white outline-none focus:border-amber-500"
                  />
                </div>
              </div>
            </section>

            {/* Step 2 — payment */}
            <section className="space-y-4 rounded-2xl border border-slate-800 bg-slate-900/80 p-6">
              <h2 className="flex items-center gap-2 text-sm font-extrabold uppercase tracking-wider text-white">
                <span className="flex h-6 w-6 items-center justify-center rounded-full bg-amber-500 text-xs font-black text-slate-950">
                  2
                </span>
                Payment
              </h2>

              <div className="grid grid-cols-1 gap-3 pt-2 sm:grid-cols-3">
                {paymentMethods.map((method) => {
                  const Icon = PAYMENT_ICONS[method.icon] ?? CreditCard;
                  const active = paymentMethod === method.id;
                  return (
                    <button
                      key={method.id}
                      type="button"
                      onClick={() => setPaymentMethod(method.id)}
                      aria-pressed={active}
                      className={`flex flex-col justify-between space-y-2 rounded-xl border p-4 text-left transition-all ${
                        active
                          ? "border-amber-500 bg-amber-500/10 text-white"
                          : "border-slate-800 bg-slate-950 text-slate-400 hover:border-slate-700"
                      }`}
                    >
                      <Icon className={`h-5 w-5 ${active ? "text-amber-400" : "text-slate-500"}`} />
                      <span>
                        <span className="block text-xs font-bold text-white">{method.label}</span>
                        <span className="text-[10px] text-slate-500">{method.desc}</span>
                      </span>
                    </button>
                  );
                })}
              </div>
            </section>
          </div>

          {/* Order review — real cart */}
          <div className="space-y-6">
            <div className="space-y-6 rounded-2xl border border-slate-800 bg-slate-900 p-6 lg:sticky lg:top-56">
              <h2 className="border-b border-slate-800 pb-4 text-base font-black uppercase tracking-wider text-white">
                Order review
              </h2>

              <div className="space-y-3 text-xs">
                {cart.map((item) => (
                  <div key={item.id} className="flex items-start justify-between gap-3 text-slate-300">
                    <div className="flex min-w-0 items-start gap-2">
                      <KeyRound className="mt-0.5 h-4 w-4 shrink-0 text-amber-400" />
                      <span className="min-w-0">
                        <span className="block truncate">{item.name}</span>
                        <span className="text-[10px] text-slate-500">
                          {item.quantity} × one-time use
                        </span>
                      </span>
                    </div>
                    <span className="shrink-0 font-bold text-white">
                      ₹{(item.price * item.quantity).toLocaleString("en-IN")}
                    </span>
                  </div>
                ))}
              </div>

              <div className="space-y-2 border-t border-slate-800 pt-4">
                <div className="flex justify-between text-xs text-slate-400">
                  <span>
                    Licenses ({cartCount} {cartCount === 1 ? "use" : "uses"})
                  </span>
                  <span className="font-bold text-white">₹{subtotal.toLocaleString("en-IN")}</span>
                </div>
                <div className="flex justify-between text-xs text-slate-400">
                  <span>File downloads</span>
                  <span className="font-bold text-emerald-400">FREE</span>
                </div>
                <div className="flex items-center justify-between border-t border-slate-800 pt-2">
                  <span>
                    <span className="block text-xs font-bold uppercase tracking-wider text-white">
                      Total
                    </span>
                    <span className="mt-0.5 flex items-center gap-1 text-[10px] font-semibold text-emerald-400">
                      <Zap className="h-3 w-3" /> Keys issued instantly
                    </span>
                  </span>
                  <span className="text-2xl font-black text-amber-400">
                    ₹{subtotal.toLocaleString("en-IN")}
                  </span>
                </div>
              </div>

              <button
                type="submit"
                disabled={submitting}
                className="w-full rounded-xl bg-amber-500 py-4 text-xs font-black uppercase tracking-wider text-slate-950 shadow-lg shadow-amber-500/20 transition-all hover:bg-amber-400 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {submitting ? "Issuing keys..." : "Pay & get keys"}
              </button>

              <div className="flex items-center justify-center gap-2 text-[11px] text-slate-500">
                <ShieldCheck className="h-4 w-4 text-emerald-400" />
                No account created — keys are yours immediately
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
