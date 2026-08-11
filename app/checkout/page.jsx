"use client";

import { useState } from "react";
import Link from "next/link";
import Header from "@/components/Header";
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
  Cpu,
  ArrowRight
} from "lucide-react";

export default function CheckoutPage() {
  const [paymentMethod, setPaymentMethod] = useState("upi");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    usernameGSM: "",
    notes: ""
  });

  // Mock Order Items
  const orderItems = [
    {
      id: "unlocktool-3m",
      name: "UnlockTool 3 Months License Key",
      price: 1850,
      quantity: 1,
      icon: KeyRound,
    },
    {
      id: "samsung-frp-10",
      name: "Samsung FRP Auto Server Credits (10 Credits)",
      price: 1200,
      quantity: 2,
      icon: Zap,
    },
    {
      id: "borneo-1y",
      name: "Borneo Schematics 1 Year License",
      price: 3400,
      quantity: 1,
      icon: Cpu,
    },
  ];

  const subtotal = orderItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const totalAmount = subtotal;

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitted(true);
  };

  // ORDER SUCCESS SCREEN
  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans">
        <Header cartCount={0} />
        <main className="flex-1 max-w-xl w-full mx-auto px-4 py-16 flex items-center justify-center">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-8 text-center space-y-6 shadow-2xl">
            <div className="w-16 h-16 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 rounded-full flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-8 h-8" />
            </div>

            <div className="space-y-2">
              <span className="text-[10px] font-bold text-amber-500 uppercase tracking-widest">
                Order Processed 24/7
              </span>
              <h1 className="text-2xl font-black text-white">Payment Successful!</h1>
              <p className="text-xs text-slate-400 leading-relaxed">
                Your credits and activation keys have been initiated. A confirmation receipt has been sent to <strong className="text-white">{formData.email}</strong>.
              </p>
            </div>

            <div className="bg-slate-950 border border-slate-800 rounded-2xl p-4 text-left text-xs space-y-2.5">
              <div className="flex justify-between text-slate-400">
                <span>Order Reference:</span>
                <span className="font-mono text-white font-bold">#GSM-{Math.floor(100000 + Math.random() * 900000)}</span>
              </div>
              <div className="flex justify-between text-slate-400">
                <span>Account/Tool ID:</span>
                <span className="font-mono text-amber-400 font-bold">{formData.usernameGSM}</span>
              </div>
              <div className="flex justify-between text-slate-400">
                <span>Payment Method:</span>
                <span className="font-bold text-white uppercase">{paymentMethod}</span>
              </div>
              <div className="flex justify-between text-slate-400 border-t border-slate-800/80 pt-2">
                <span>Total Paid:</span>
                <span className="font-bold text-emerald-400 text-sm">₹{totalAmount.toLocaleString("en-IN")}</span>
              </div>
            </div>

            <Link
              href="/"
              className="inline-flex items-center justify-center gap-2 w-full bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold py-3 rounded-xl text-xs uppercase tracking-wider transition-all"
            >
              Return to Home <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </main>
      </div>
    );
  }

  // CHECKOUT FORM SCREEN
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans">
      <Header cartCount={3} />

      <main className="flex-1 max-w-[1440px] w-full mx-auto px-4 md:px-8 py-8 space-y-8">
        {/* Navigation Breadcrumb */}
        <div className="flex items-center justify-between border-b border-slate-800 pb-4">
          <Link href="/cart" className="inline-flex items-center gap-2 text-xs font-bold text-slate-400 hover:text-amber-400 transition-colors uppercase tracking-wider">
            <ChevronLeft className="w-4 h-4" /> Return to Cart
          </Link>
          <div className="flex items-center gap-2 text-xs text-emerald-400 font-bold uppercase tracking-wider">
            <Lock className="w-3.5 h-3.5" /> 256-Bit Encrypted Checkout
          </div>
        </div>

        <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* CUSTOMER & LICENSE DETAILS (LEFT COLUMN) */}
          <div className="lg:col-span-2 space-y-6">
            
            {/* Step 1: Activation Details */}
            <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 space-y-4">
              <h2 className="text-sm font-extrabold text-white uppercase tracking-wider flex items-center gap-2">
                <span className="w-6 h-6 bg-amber-500 text-slate-950 rounded-full flex items-center justify-center text-xs font-black">1</span>
                Activation & Account Details
              </h2>
              <p className="text-xs text-slate-400">
                Enter your GSM tool username or registered email so digital credits can be directly applied.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                <div>
                  <label className="block text-[11px] font-bold text-slate-400 uppercase mb-1.5">Full Name</label>
                  <input
                    required
                    type="text"
                    placeholder="John Doe"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-800 focus:border-amber-500 rounded-xl px-4 py-2.5 text-xs text-white outline-none"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-slate-400 uppercase mb-1.5">Email Address</label>
                  <input
                    required
                    type="email"
                    placeholder="john@example.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-800 focus:border-amber-500 rounded-xl px-4 py-2.5 text-xs text-white outline-none"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-slate-400 uppercase mb-1.5">WhatsApp Mobile No.</label>
                  <input
                    required
                    type="tel"
                    placeholder="+91 89237 44131"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-800 focus:border-amber-500 rounded-xl px-4 py-2.5 text-xs text-white outline-none"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-slate-400 uppercase mb-1.5">
                    GSM Tool Username / Server ID
                  </label>
                  <input
                    required
                    type="text"
                    placeholder="UnlockTool Username / Server ID"
                    value={formData.usernameGSM}
                    onChange={(e) => setFormData({ ...formData, usernameGSM: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-800 focus:border-amber-500 rounded-xl px-4 py-2.5 text-xs text-white outline-none"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-[11px] font-bold text-slate-400 uppercase mb-1.5">
                    Special Order Instructions (Optional)
                  </label>
                  <textarea
                    rows={2}
                    placeholder="Add any specific instruction for auto credit topup..."
                    value={formData.notes}
                    onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-800 focus:border-amber-500 rounded-xl px-4 py-2 text-xs text-white outline-none resize-none"
                  />
                </div>
              </div>
            </div>

            {/* Step 2: Payment Option */}
            <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 space-y-4">
              <h2 className="text-sm font-extrabold text-white uppercase tracking-wider flex items-center gap-2">
                <span className="w-6 h-6 bg-amber-500 text-slate-950 rounded-full flex items-center justify-center text-xs font-black">2</span>
                Payment Options
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
                {[
                  { id: "upi", label: "UPI / PhonePe", icon: Smartphone, desc: "GPay, Paytm, PhonePe, QR" },
                  { id: "card", label: "Credit/Debit Card", icon: CreditCard, desc: "Visa, Mastercard, RuPay" },
                  { id: "netbanking", label: "Net Banking", icon: Building, desc: "All Major Banks" },
                ].map((method) => {
                  const Icon = method.icon;
                  return (
                    <button
                      key={method.id}
                      type="button"
                      onClick={() => setPaymentMethod(method.id)}
                      className={`p-4 rounded-xl border text-left transition-all flex flex-col justify-between space-y-2 ${
                        paymentMethod === method.id
                          ? "bg-amber-500/10 border-amber-500 text-white"
                          : "bg-slate-950 border-slate-800 text-slate-400 hover:border-slate-700"
                      }`}
                    >
                      <Icon className={`w-5 h-5 ${paymentMethod === method.id ? "text-amber-400" : "text-slate-500"}`} />
                      <div>
                        <span className="block text-xs font-bold text-white">{method.label}</span>
                        <span className="text-[10px] text-slate-500">{method.desc}</span>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* CHECKOUT SUMMARY (RIGHT COLUMN) */}
          <div className="space-y-6">
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-6 sticky top-28">
              <h2 className="text-base font-black text-white uppercase tracking-wider border-b border-slate-800 pb-4">
                Order Review
              </h2>

              {/* Items List */}
              <div className="space-y-3 text-xs">
                {orderItems.map((item) => {
                  const IconComponent = item.icon;
                  return (
                    <div key={item.id} className="flex items-center justify-between gap-3 text-slate-300">
                      <div className="flex items-center gap-2 overflow-hidden">
                        <IconComponent className="w-4 h-4 text-amber-400 shrink-0" />
                        <span className="truncate">{item.name} <strong className="text-slate-500">x{item.quantity}</strong></span>
                      </div>
                      <span className="font-bold text-white shrink-0">
                        ₹{(item.price * item.quantity).toLocaleString("en-IN")}
                      </span>
                    </div>
                  );
                })}
              </div>

              {/* Total Calculation */}
              <div className="border-t border-slate-800 pt-4 space-y-2">
                <div className="flex justify-between text-xs text-slate-400">
                  <span>Subtotal</span>
                  <span className="font-bold text-white">₹{subtotal.toLocaleString("en-IN")}</span>
                </div>
                <div className="flex justify-between text-xs text-slate-400">
                  <span>Digital Delivery</span>
                  <span className="font-bold text-emerald-400">FREE / INSTANT</span>
                </div>
                <div className="flex items-center justify-between pt-2 border-t border-slate-800">
                  <div>
                    <span className="text-xs font-bold text-white uppercase tracking-wider block">Total Amount</span>
                    <span className="text-[10px] text-emerald-400 font-semibold flex items-center gap-1 mt-0.5">
                      <Zap className="w-3 h-3" /> Auto 24/7 Processing
                    </span>
                  </div>
                  <span className="text-2xl font-black text-amber-400">
                    ₹{totalAmount.toLocaleString("en-IN")}
                  </span>
                </div>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full bg-amber-500 hover:bg-amber-400 text-slate-950 font-black py-4 rounded-xl transition-all shadow-lg shadow-amber-500/20 text-xs uppercase tracking-wider flex items-center justify-center gap-2"
              >
                Pay & Activate Now
              </button>

              <div className="flex items-center justify-center gap-2 text-[11px] text-slate-500">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                Instant API processing after payment
              </div>
            </div>
          </div>
        </form>
      </main>
    </div>
  );
}