import Link from "next/link";
import {
  Download,
  KeyRound,
  Zap,
  Headphones,
  ArrowRight,
  MessageCircle,
} from "lucide-react";

const TRUST_ICONS = { download: Download, key: KeyRound, zap: Zap, headphones: Headphones };

export default function Hero({ site, totalTools = 0 }) {
  return (
    <section className="bg-slate-100 pb-6 font-sans">
      {/* Banner */}
      <div className="mx-auto max-w-[1440px] px-4 pt-4 md:px-8">
        <div className="relative overflow-hidden rounded-2xl border border-slate-200 shadow-sm">
          <div className="flex min-h-[340px] flex-col justify-center gap-6 bg-gradient-to-br from-slate-950 via-blue-950 to-indigo-950 p-8 text-white md:min-h-[400px] md:p-12">
            <div className="max-w-2xl space-y-4">
              <span className="inline-flex items-center gap-2 rounded-full bg-emerald-500/15 px-3 py-1 text-[11px] font-black uppercase tracking-wider text-emerald-400 ring-1 ring-emerald-500/30">
                <Download className="h-3.5 w-3.5" />
                {totalTools} files · all free to download
              </span>

              <h1 className="text-3xl font-black leading-tight md:text-5xl">
                Download the tool free.
                <br />
                <span className="text-amber-400">Pay only when you use it.</span>
              </h1>

              <p className="max-w-xl text-sm leading-relaxed text-slate-300">
                Every repair tool, flash file and schematic on {site.name} downloads at no cost. When
                you are ready to run one on a device, buy a single one-time-use license — no
                subscription, no account, no signup.
              </p>

              <div className="flex flex-wrap items-center gap-3 pt-2">
                <Link
                  href="/tools"
                  className="flex items-center gap-2 rounded-xl bg-amber-500 px-6 py-3 text-xs font-extrabold uppercase tracking-wide text-slate-950 shadow-lg shadow-amber-500/20 transition-all hover:bg-amber-400 active:scale-95"
                >
                  Browse all tools <ArrowRight className="h-4 w-4" />
                </Link>
                <a
                  href={`https://wa.me/${site.whatsapp}`}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-2 rounded-xl border border-white/20 bg-white/5 px-6 py-3 text-xs font-extrabold uppercase tracking-wide text-white backdrop-blur transition-all hover:border-emerald-400/50 hover:text-emerald-400 active:scale-95"
                >
                  <MessageCircle className="h-4 w-4" /> Ask on WhatsApp
                </a>
              </div>
            </div>

            {/* How it works */}
            <div className="grid max-w-3xl grid-cols-1 gap-3 border-t border-white/10 pt-5 sm:grid-cols-3">
              {site.howItWorks.map((item) => (
                <div key={item.step} className="flex items-start gap-2.5">
                  <span className="grid h-6 w-6 shrink-0 place-items-center rounded-full bg-amber-500 text-[11px] font-black text-slate-950">
                    {item.step}
                  </span>
                  <div>
                    <span className="block text-xs font-bold text-white">{item.title}</span>
                    <span className="text-[11px] text-slate-400">{item.note}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Trust bar */}
      <div className="mx-auto mt-4 max-w-[1440px] px-4 md:px-8">
        <div className="grid grid-cols-1 gap-4 rounded-2xl border border-slate-200 bg-white p-4 text-xs text-slate-800 sm:grid-cols-2 lg:grid-cols-4">
          {site.trustPoints.map((point, index) => {
            const Icon = TRUST_ICONS[point.icon] ?? Zap;
            return (
              <div
                key={point.title}
                className={`flex items-center gap-3 ${
                  index > 0 ? "border-slate-200 pl-0 lg:border-l lg:pl-4" : ""
                }`}
              >
                <Icon className="h-8 w-8 shrink-0 text-amber-500" />
                <div>
                  <strong className="block text-sm font-bold">{point.title}</strong>
                  <span className="text-slate-500">{point.note}</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
