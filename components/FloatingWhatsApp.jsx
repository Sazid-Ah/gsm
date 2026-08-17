import { MessageCircle } from "lucide-react";

export default function FloatingWhatsApp({ phone }) {
  return (
    <div className="fixed bottom-5 right-5 z-40 flex flex-col items-end gap-2">
      <a
        href={`https://wa.me/${phone}`}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center justify-center rounded-full bg-emerald-500 p-3.5 font-bold text-white shadow-2xl shadow-emerald-500/30 transition-all hover:scale-105 hover:bg-emerald-600"
        aria-label="Chat on WhatsApp"
      >
        <MessageCircle className="h-6 w-6 fill-white text-emerald-500" />
      </a>
    </div>
  );
}
