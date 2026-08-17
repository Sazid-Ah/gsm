import Link from "next/link";
import { Cpu, PhoneCall, MessageCircle, Download, KeyRound } from "lucide-react";

export default function Footer({ nav, site }) {
  const menus = nav?.primary ?? [];

  return (
    <footer className="mt-12 border-t border-slate-800 bg-slate-900 pb-6 pt-10 font-sans text-xs text-slate-300">
      <div className="mx-auto mb-8 grid max-w-[1440px] grid-cols-1 gap-8 px-4 md:grid-cols-4 md:px-8">
        {/* Brand */}
        <div>
          <div className="mb-3 flex items-center gap-2.5">
            <span className="grid h-8 w-8 shrink-0 place-items-center rounded-lg bg-gradient-to-br from-amber-400 to-yellow-600 text-slate-950">
              <Cpu className="h-4 w-4" />
            </span>
            <span className="text-xl font-black tracking-wider">
              <span className="text-amber-400">{site.brand.prefix}</span>
              <span className="text-white">{site.brand.suffix}</span>
            </span>
          </div>
          <p className="text-[11px] leading-relaxed text-slate-400">{site.description}</p>
          <a
            href={site.phoneHref}
            className="mt-3 flex items-center gap-2 text-sm font-bold text-amber-400 transition-colors hover:text-amber-300"
          >
            <PhoneCall className="h-4 w-4" /> {site.phone}
          </a>
          <a
            href={`https://wa.me/${site.whatsapp}`}
            target="_blank"
            rel="noreferrer"
            className="mt-2 inline-flex items-center gap-2 text-[11px] font-semibold text-emerald-400 transition-colors hover:text-emerald-300"
          >
            <MessageCircle className="h-3.5 w-3.5" /> Chat on WhatsApp
          </a>
        </div>

        {/* Categories — same filters as the header */}
        <div>
          <h4 className="mb-3 text-xs font-bold uppercase tracking-wider text-white">Categories</h4>
          <ul className="space-y-2 text-[11px] text-slate-400">
            {menus.map((menu) => (
              <li key={menu.key}>
                <Link href={menu.href} className="transition-colors hover:text-amber-400">
                  {menu.label}
                  <span className="ml-1.5 text-slate-600">({menu.count})</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Shop */}
        <div>
          <h4 className="mb-3 text-xs font-bold uppercase tracking-wider text-white">Shop</h4>
          <ul className="space-y-2 text-[11px] text-slate-400">
            <li>
              <Link href="/tools" className="transition-colors hover:text-amber-400">
                All tools &amp; files
              </Link>
            </li>
            <li>
              <Link href="/tools?sort=newest" className="transition-colors hover:text-amber-400">
                Recently added
              </Link>
            </li>
            <li>
              <Link href="/tools?sort=price-low" className="transition-colors hover:text-amber-400">
                Cheapest licenses
              </Link>
            </li>
            <li>
              <Link href="/cart" className="transition-colors hover:text-amber-400">
                View cart
              </Link>
            </li>
          </ul>
        </div>

        {/* How it works */}
        <div>
          <h4 className="mb-3 text-xs font-bold uppercase tracking-wider text-white">How it works</h4>
          <ul className="space-y-3 text-[11px] text-slate-400">
            <li className="flex gap-2">
              <Download className="mt-0.5 h-3.5 w-3.5 shrink-0 text-emerald-400" />
              <span>
                <strong className="block text-slate-200">Files are free</strong>
                Download anything without an account.
              </span>
            </li>
            <li className="flex gap-2">
              <KeyRound className="mt-0.5 h-3.5 w-3.5 shrink-0 text-amber-400" />
              <span>
                <strong className="block text-slate-200">Licenses are per use</strong>
                One key unlocks one device operation.
              </span>
            </li>
          </ul>
        </div>
      </div>

      <div className="mx-auto max-w-[1440px] border-t border-slate-800 px-4 pt-4 text-center text-[11px] text-slate-500 md:px-8">
        Copyright © {new Date().getFullYear()} {site.name}. All Rights Reserved.
      </div>
    </footer>
  );
}
