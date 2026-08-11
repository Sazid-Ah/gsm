"use client";

import { MessageCircle } from "lucide-react";

export default function FloatingWhatsApp() {
  return (
    <div className="fixed bottom-5 right-5 z-50 flex items-end flex-col gap-2">
      {/* Floating Info Box */}
      {/* <div className="hidden sm:block bg-white border border-slate-200 p-3 rounded-xl shadow-2xl max-w-xs text-[11px] text-slate-700">
        <p className="font-bold text-slate-900">Need instant confirmation?</p>
        <p className="text-slate-500">Ask us on WhatsApp about stock status or server credit pricing!</p>
      </div> */}

      {/* Floating WhatsApp Action Button */}
      <a
        href="https://wa.me/918923744131"
        target="_blank"
        rel="noopener noreferrer"
        className="bg-emerald-500 hover:bg-emerald-600 text-white font-bold p-3.5 rounded-full shadow-2xl shadow-emerald-500/30 flex items-center justify-center transition-all hover:scale-105"
        aria-label="Chat on WhatsApp"
      >
        <MessageCircle className="w-6 h-6 fill-white text-emerald-500" />
      </a>
    </div>
  );
}