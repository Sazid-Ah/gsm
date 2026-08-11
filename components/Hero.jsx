import { ShieldCheck, Truck, Package, PhoneCall } from "lucide-react";

export default function Hero() {
  return (
    <section className="bg-slate-100 pb-6 font-sans">
      {/* Banner Graphic Area */}
      <div className="max-w-[1400px] mx-auto pt-4 px-6">
        <div className="relative bg-slate-900 rounded overflow-hidden shadow border border-slate-200">
          <div className="w-full h-[360px] md:h-[420px] bg-gradient-to-r from-slate-950 via-blue-950 to-indigo-950 flex items-center justify-between p-8 md:p-12 text-white">
            <div className="max-w-xl space-y-4">
              <span className="inline-block bg-amber-400 text-slate-950 font-black text-xs px-3 py-1 rounded">
                PENGUINE MULTI TOOL
              </span>
              <h1 className="text-3xl md:text-5xl font-black leading-tight">
                Unlock, FRP Bypass, and repair MTK devices
              </h1>
              <p className="text-amber-300 font-bold text-sm">
                For Xiaomi, Realme, and more
              </p>

              <div className="pt-2 flex items-center gap-4 text-xs font-bold text-slate-900">
                <span className="bg-white px-3 py-1.5 rounded shadow">
                  📞 +918923744131
                </span>
                <span className="bg-white px-3 py-1.5 rounded shadow">
                  🌐 www.Gsmserver.in
                </span>
              </div>
            </div>

            {/* Slide Dots Indicator */}
            <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5">
              {[...Array(6)].map((_, i) => (
                <span
                  key={i}
                  className={`w-2.5 h-2.5 rounded-full ${
                    i === 0 ? "bg-white" : "bg-white/40"
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Feature Highlights Bar */}
      <div className="max-w-[1400px] mx-auto mt-4 px-6">
        <div className="bg-white border border-slate-200 rounded p-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-xs text-slate-800">
          <div className="flex items-center gap-3">
            <Truck className="w-8 h-8 text-amber-500" />
            <div>
              <strong className="block text-sm font-bold">Cash on Delivery(COD)</strong>
              <span className="text-slate-500">All India Available</span>
            </div>
          </div>

          <div className="flex items-center gap-3 border-l-0 lg:border-l border-slate-200 pl-0 lg:pl-4">
            <ShieldCheck className="w-8 h-8 text-amber-500" />
            <div>
              <strong className="block text-sm font-bold">Secure Payment</strong>
              <span className="text-slate-500">We ensure secure payment</span>
            </div>
          </div>

          <div className="flex items-center gap-3 border-l-0 lg:border-l border-slate-200 pl-0 lg:pl-4">
            <Package className="w-8 h-8 text-amber-500" />
            <div>
              <strong className="block text-sm font-bold">100% Original Products</strong>
              <span className="text-slate-500">Guarantee</span>
            </div>
          </div>

          <div className="flex items-center gap-3 border-l-0 lg:border-l border-slate-200 pl-0 lg:pl-4">
            <PhoneCall className="w-8 h-8 text-amber-500" />
            <div>
              <strong className="block text-sm font-bold">Customer Support</strong>
              <span className="text-slate-500">Call or email us 24/7</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}