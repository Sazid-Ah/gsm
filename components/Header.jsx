"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  Search,
  ShoppingCart,
  PhoneCall,
  ChevronDown,
  Menu,
  X,
  Zap,
  Headphones,
  Cpu,
  ArrowRight,
  Download,
  LayoutGrid,
} from "lucide-react";
import { useCart } from "@/app/context/CartContext";

const QUICK_LINK_ICONS = { grid: LayoutGrid, download: Download };

/**
 * Site header. All navigation content arrives as props from the root layout,
 * which reads it from lib/api.js — nothing here is hardcoded catalog data.
 *
 * Every nav button and dropdown entry is a filter: it navigates to the listing
 * route for that category/subcategory, which then renders the filtered set.
 */
export default function Header({ nav, site }) {
  const router = useRouter();
  const pathname = usePathname();
  const { cartCount } = useCart();
  const searchInputRef = useRef(null);

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [openSubMenu, setOpenSubMenu] = useState(null);
  const [scrolled, setScrolled] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchScope, setSearchScope] = useState("all");

  const menus = nav?.primary ?? [];
  const quickLinks = nav?.quickLinks ?? [];

  // Condense the header (utility strip + ticker collapse) once the page scrolls.
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Lock body scroll and close the drawer on Escape while it is open.
  useEffect(() => {
    if (!mobileMenuOpen) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const handleKey = (e) => {
      if (e.key === "Escape") setMobileMenuOpen(false);
    };
    window.addEventListener("keydown", handleKey);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleKey);
    };
  }, [mobileMenuOpen]);

  // "/" jumps to the search field, the way most storefronts behave.
  useEffect(() => {
    const handleKey = (e) => {
      if (e.key !== "/" || e.metaKey || e.ctrlKey || e.altKey) return;
      const el = document.activeElement;
      const tag = el?.tagName;
      if (tag === "INPUT" || tag === "TEXTAREA" || tag === "SELECT" || el?.isContentEditable) return;
      e.preventDefault();
      searchInputRef.current?.focus();
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, []);

  const isActive = (href) => (href === "/" ? pathname === "/" : pathname?.startsWith(href));
  const toggleSubMenu = (menu) => setOpenSubMenu(openSubMenu === menu ? null : menu);
  const closeMobileMenu = () => setMobileMenuOpen(false);

  // Search is a filter too: it lands on the listing route, scoped to the
  // selected category when one is chosen.
  const handleSearch = (e) => {
    e.preventDefault();
    const q = searchQuery.trim();
    if (!q) return;
    const base = searchScope === "all" ? "/tools" : `/category/${searchScope}`;
    router.push(`${base}?q=${encodeURIComponent(q)}`);
    setMobileMenuOpen(false);
  };

  return (
    <header
      className={`sticky top-0 z-50 w-full font-sans transition-shadow duration-300 ${
        scrolled ? "shadow-2xl shadow-slate-900/20" : "shadow-md"
      }`}
    >
      {/* 1. TOP UTILITY STRIP — collapses away on scroll */}
      <div
        className={`overflow-hidden border-b border-slate-800/80 bg-slate-900 text-[11px] text-slate-300 transition-all duration-300 ${
          scrolled ? "max-h-0 opacity-0" : "max-h-12 opacity-100"
        }`}
      >
        <div className="mx-auto flex max-w-[1440px] items-center justify-between px-4 py-1.5 md:px-8">
          <div className="flex items-center gap-6 font-medium tracking-wide">
            <a
              href={site.phoneHref}
              className="group flex items-center gap-1.5 transition-colors hover:text-amber-400"
            >
              <PhoneCall className="h-3 w-3 text-amber-400" />
              <span className="hidden sm:inline">SALES &amp; ENQUIRY:</span>
              <strong className="text-white transition-colors group-hover:text-amber-400">
                {site.phone}
              </strong>
            </a>
            <span className="hidden text-slate-600 md:inline-block">|</span>
            <a
              href={site.telegram}
              target="_blank"
              rel="noreferrer"
              className="hidden transition-colors hover:text-amber-400 sm:inline"
            >
              Telegram Channel
            </a>
          </div>

          <div className="flex items-center gap-2 font-semibold text-emerald-400">
            <Download className="h-3 w-3" />
            <span>All files free to download</span>
          </div>
        </div>
      </div>

      {/* 2. MAIN NAV */}
      <div
        className={`border-b border-slate-800 bg-slate-950 px-4 text-white transition-all duration-300 md:px-8 ${
          scrolled ? "py-2" : "py-3"
        }`}
      >
        <div className="mx-auto flex max-w-[1440px] items-center justify-between gap-4 lg:gap-6">
          {/* Brand + mobile toggle */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="rounded-lg border border-slate-800 bg-slate-900 p-2 text-slate-300 transition-colors hover:border-slate-700 hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-500 lg:hidden"
              aria-label="Toggle navigation"
              aria-expanded={mobileMenuOpen}
              aria-controls="mobile-nav-drawer"
            >
              <Menu className="h-5 w-5" />
            </button>

            <Link href="/" className="group flex items-center gap-2.5" aria-label={`${site.name} home`}>
              <span className="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-gradient-to-br from-amber-400 to-yellow-600 text-slate-950 shadow-lg shadow-amber-500/25 ring-1 ring-amber-300/40 transition-transform duration-300 group-hover:scale-105">
                <Cpu className="h-5 w-5" />
              </span>
              <span className="flex flex-col leading-none">
                <span className="text-xl font-black tracking-wide">
                  <span className="text-amber-400">{site.brand.prefix}</span>
                  <span className="text-white">{site.brand.suffix}</span>
                </span>
                <span className="mt-1 hidden text-[9px] font-semibold uppercase tracking-[0.18em] text-slate-500 sm:block">
                  {site.tagline}
                </span>
              </span>
            </Link>
          </div>

          {/* Desktop filter nav */}
          <nav className="hidden items-center gap-6 text-xs font-bold uppercase tracking-wider xl:flex">
            <Link
              href="/tools"
              className={`group relative py-2 transition-colors ${
                isActive("/tools") ? "text-amber-400" : "text-slate-200 hover:text-amber-400"
              }`}
            >
              All Tools
              <span
                className={`absolute -bottom-0.5 left-0 h-0.5 rounded-full bg-amber-400 transition-all duration-300 ${
                  isActive("/tools") ? "w-full" : "w-0 group-hover:w-full"
                }`}
              />
            </Link>

            {menus.map((menu) => {
              const active = isActive(menu.href);
              return (
                <div key={menu.key} className="group relative py-2">
                  <Link
                    href={menu.href}
                    aria-haspopup="true"
                    className={`flex items-center gap-1.5 transition-colors ${
                      active ? "text-amber-400" : "text-slate-200 group-hover:text-amber-400"
                    }`}
                  >
                    {menu.label}
                    <ChevronDown className="h-3.5 w-3.5 text-slate-400 transition-transform duration-200 group-hover:rotate-180 group-focus-within:rotate-180" />
                    <span
                      className={`absolute -bottom-0.5 left-0 h-0.5 rounded-full bg-amber-400 transition-all duration-300 ${
                        active ? "w-full" : "w-0 group-hover:w-full"
                      }`}
                    />
                  </Link>

                  <div className="invisible absolute left-0 top-full z-50 w-72 translate-y-2 rounded-2xl border border-slate-800 bg-slate-900/95 p-2 opacity-0 shadow-2xl shadow-black/50 backdrop-blur transition-all duration-200 group-hover:visible group-hover:translate-y-0 group-hover:opacity-100 group-focus-within:visible group-focus-within:translate-y-0 group-focus-within:opacity-100">
                    <p className="px-3 pb-2 pt-1 text-[9px] font-bold uppercase tracking-[0.18em] text-slate-500">
                      Filter by type
                    </p>
                    {menu.items.map((item) => (
                      <Link
                        key={item.href}
                        href={item.href}
                        className="group/item flex items-center justify-between gap-2 rounded-lg px-3 py-2 text-[12px] font-medium normal-case text-slate-300 transition-colors hover:bg-slate-800 hover:text-amber-400 focus:outline-none focus-visible:bg-slate-800 focus-visible:text-amber-400"
                      >
                        <span>{item.label}</span>
                        <span className="flex items-center gap-2">
                          <span className="rounded-full bg-slate-800 px-1.5 py-0.5 text-[10px] font-bold text-slate-400 group-hover/item:bg-amber-500/15 group-hover/item:text-amber-400">
                            {item.count}
                          </span>
                          <ArrowRight className="h-3.5 w-3.5 -translate-x-1 opacity-0 transition-all duration-200 group-hover/item:translate-x-0 group-hover/item:opacity-100" />
                        </span>
                      </Link>
                    ))}
                    <Link
                      href={menu.href}
                      className="mt-1 flex items-center gap-1.5 border-t border-slate-800 px-3 pb-1 pt-2 text-[10px] font-bold uppercase tracking-wider text-amber-400 transition-colors hover:text-amber-300"
                    >
                      View all {menu.count} <ArrowRight className="h-3 w-3" />
                    </Link>
                  </div>
                </div>
              );
            })}
          </nav>

          {/* Actions */}
          <div className="flex items-center gap-3">
            <a
              href={site.phoneHref}
              className="hidden items-center gap-3 rounded-xl border border-slate-800 bg-slate-900/80 px-3.5 py-1.5 transition-colors hover:border-amber-500/50 2xl:flex"
            >
              <Headphones className="h-5 w-5 text-amber-400" />
              <span className="block">
                <span className="block text-[10px] font-bold uppercase tracking-wider text-slate-400">
                  Live Desk
                </span>
                <span className="block text-xs font-bold text-white">{site.phone}</span>
              </span>
            </a>

            <Link
              href="/cart"
              aria-label={`Cart, ${cartCount} ${cartCount === 1 ? "license" : "licenses"}`}
              className="relative flex items-center gap-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-yellow-500 px-4 py-2.5 text-xs font-bold text-slate-950 shadow-lg shadow-amber-500/20 transition-all hover:brightness-110 active:scale-95"
            >
              <ShoppingCart className="h-4 w-4" />
              <span className="hidden sm:inline">Cart</span>
              <span className="rounded-full bg-slate-950 px-2 py-0.5 text-[10px] font-extrabold text-amber-400">
                {cartCount}
              </span>
            </Link>
          </div>
        </div>
      </div>

      {/* 3. SEARCH ROW */}
      <div className="border-b border-slate-200 bg-white px-4 py-3 shadow-sm md:px-8">
        <div className="mx-auto flex max-w-[1440px] flex-col items-center justify-between gap-3 sm:flex-row sm:gap-4">
          <form
            onSubmit={handleSearch}
            role="search"
            className="flex w-full flex-1 items-center overflow-hidden rounded-xl border-2 border-slate-200 bg-slate-50 transition-all duration-200 focus-within:border-amber-500 focus-within:bg-white focus-within:shadow-lg focus-within:shadow-amber-500/10"
          >
            <div className="relative hidden border-r border-slate-200 md:block">
              <label htmlFor="search-scope" className="sr-only">
                Limit search to a category
              </label>
              <select
                id="search-scope"
                value={searchScope}
                onChange={(e) => setSearchScope(e.target.value)}
                className="cursor-pointer appearance-none bg-transparent py-3 pl-4 pr-8 text-xs font-semibold text-slate-700 outline-none"
              >
                <option value="all">All Categories</option>
                {menus.map((menu) => (
                  <option key={menu.key} value={menu.key}>
                    {menu.label}
                  </option>
                ))}
              </select>
              <ChevronDown className="pointer-events-none absolute right-2.5 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-slate-400" />
            </div>

            <label htmlFor="site-search" className="sr-only">
              Search tools and files
            </label>
            <input
              id="site-search"
              ref={searchInputRef}
              type="search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search tools, flash files, schematics..."
              className="w-full bg-transparent px-4 py-3 text-xs font-medium text-slate-900 placeholder-slate-400 outline-none [&::-webkit-search-cancel-button]:hidden"
            />

            {searchQuery ? (
              <button
                type="button"
                onClick={() => setSearchQuery("")}
                aria-label="Clear search"
                className="mr-1 rounded-lg p-1.5 text-slate-400 transition-colors hover:bg-slate-200 hover:text-slate-700"
              >
                <X className="h-3.5 w-3.5" />
              </button>
            ) : (
              <kbd className="mr-2 hidden rounded border border-slate-300 bg-white px-1.5 py-0.5 text-[10px] font-bold text-slate-400 lg:inline-block">
                /
              </kbd>
            )}

            <button
              type="submit"
              className="flex items-center gap-1.5 self-stretch bg-amber-500 px-5 text-xs font-bold text-slate-950 transition-colors hover:bg-amber-600"
            >
              <Search className="h-4 w-4" />
              <span className="hidden md:inline">Search</span>
            </button>
          </form>

          <div className="flex w-full items-center justify-between gap-6 text-xs font-bold text-slate-700 sm:w-auto sm:justify-end">
            {quickLinks.map(({ label, href, icon }) => {
              const Icon = QUICK_LINK_ICONS[icon] ?? LayoutGrid;
              return (
                <Link
                  key={href}
                  href={href}
                  className="flex items-center gap-1.5 whitespace-nowrap transition-colors hover:text-amber-600"
                >
                  <Icon className="h-4 w-4 text-amber-500" />
                  <span>{label}</span>
                </Link>
              );
            })}
          </div>
        </div>
      </div>

      {/* 4. TICKER */}
      <div
        className={`overflow-hidden bg-gradient-to-r from-red-600 via-rose-600 to-red-600 text-[11px] font-bold text-white shadow-inner transition-all duration-300 ${
          scrolled ? "max-h-0 opacity-0" : "max-h-10 opacity-100"
        }`}
      >
        <div className="flex w-max animate-marquee py-1.5 hover:[animation-play-state:paused]">
          {[0, 1].map((copy) => (
            <div key={copy} className="flex shrink-0 items-center" aria-hidden={copy === 1}>
              {site.ticker.map((item) => (
                <span key={item} className="flex items-center gap-2 whitespace-nowrap px-6 tracking-wide">
                  <Zap className="h-3.5 w-3.5 shrink-0 text-amber-300" />
                  {item}
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* 5. MOBILE DRAWER */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 flex xl:hidden">
          <div
            className="fixed inset-0 animate-fade-in bg-slate-950/80 backdrop-blur-sm"
            onClick={closeMobileMenu}
          />
          <div
            id="mobile-nav-drawer"
            role="dialog"
            aria-modal="true"
            aria-label="Main menu"
            className="relative z-10 flex h-full w-4/5 max-w-xs animate-drawer-in flex-col justify-between overflow-y-auto border-r border-slate-800 bg-slate-950 p-6 text-white shadow-2xl"
          >
            <div>
              <div className="mb-6 flex items-center justify-between border-b border-slate-800 pb-4">
                <Link href="/" onClick={closeMobileMenu} className="flex items-center gap-2.5">
                  <span className="grid h-8 w-8 shrink-0 place-items-center rounded-lg bg-gradient-to-br from-amber-400 to-yellow-600 text-slate-950">
                    <Cpu className="h-4 w-4" />
                  </span>
                  <span className="text-lg font-black tracking-wider">
                    <span className="text-amber-400">{site.brand.prefix}</span>
                    <span className="text-white">{site.brand.suffix}</span>
                  </span>
                </Link>
                <button
                  onClick={closeMobileMenu}
                  aria-label="Close menu"
                  className="rounded-lg p-1 text-slate-400 transition-colors hover:bg-slate-900 hover:text-white"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              <div className="space-y-1 text-xs font-bold uppercase tracking-wider">
                <Link
                  href="/tools"
                  onClick={closeMobileMenu}
                  className={`flex items-center justify-between border-b border-slate-800 py-3 ${
                    isActive("/tools") ? "text-amber-400" : "text-slate-200 hover:text-amber-400"
                  }`}
                >
                  All Tools
                  <ArrowRight className="h-3.5 w-3.5" />
                </Link>

                {menus.map((menu) => (
                  <div key={menu.key} className="border-b border-slate-800">
                    <button
                      onClick={() => toggleSubMenu(menu.key)}
                      aria-expanded={openSubMenu === menu.key}
                      aria-controls={`mobile-submenu-${menu.key}`}
                      className={`flex w-full items-center justify-between py-3 text-left ${
                        isActive(menu.href) ? "text-amber-400" : "text-slate-200 hover:text-amber-400"
                      }`}
                    >
                      <span>
                        {menu.label}
                        <span className="ml-2 text-[10px] font-bold text-slate-500">{menu.count}</span>
                      </span>
                      <ChevronDown
                        className={`h-4 w-4 transition-transform duration-200 ${
                          openSubMenu === menu.key ? "rotate-180 text-amber-400" : ""
                        }`}
                      />
                    </button>
                    {openSubMenu === menu.key && (
                      <div
                        id={`mobile-submenu-${menu.key}`}
                        className="space-y-1 border-l border-slate-800 pb-3 pl-4 text-[11px] font-medium normal-case text-slate-400"
                      >
                        {menu.items.map((item) => (
                          <Link
                            key={item.href}
                            href={item.href}
                            onClick={closeMobileMenu}
                            className="flex items-center justify-between py-1.5 transition-colors hover:text-amber-400"
                          >
                            {item.label}
                            <span className="text-[10px] text-slate-600">{item.count}</span>
                          </Link>
                        ))}
                        <Link
                          href={menu.href}
                          onClick={closeMobileMenu}
                          className="flex items-center gap-1.5 py-1.5 font-bold text-amber-400"
                        >
                          View all <ArrowRight className="h-3 w-3" />
                        </Link>
                      </div>
                    )}
                  </div>
                ))}

                <div className="grid grid-cols-2 gap-2 pt-4">
                  {quickLinks.map(({ label, href, icon }) => {
                    const Icon = QUICK_LINK_ICONS[icon] ?? LayoutGrid;
                    return (
                      <Link
                        key={href}
                        href={href}
                        onClick={closeMobileMenu}
                        className="flex items-center gap-2 rounded-xl border border-slate-800 bg-slate-900 px-3 py-2.5 text-[10px] text-slate-300 transition-colors hover:border-amber-500/50 hover:text-amber-400"
                      >
                        <Icon className="h-4 w-4 shrink-0 text-amber-500" />
                        {label}
                      </Link>
                    );
                  })}
                </div>
              </div>
            </div>

            <div className="mt-8 space-y-3 border-t border-slate-800 pt-6 text-xs text-slate-400">
              <a
                href={site.phoneHref}
                className="flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-amber-500 to-yellow-500 py-2.5 font-bold text-slate-950 shadow-lg shadow-amber-500/20 transition-all hover:brightness-110"
              >
                <PhoneCall className="h-4 w-4" /> {site.phone}
              </a>
              <p className="text-center text-[11px]">Help desk open 24/7 — no account needed</p>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
