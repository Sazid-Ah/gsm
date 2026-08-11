"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Search,
  ShoppingCart,
  User,
  PhoneCall,
  ChevronDown,
  GitCompare,
  MapPin,
  Percent,
  Menu,
  X,
  Zap,
  Headphones,
} from "lucide-react";

export default function Header({ searchQuery = "", setSearchQuery, cartCount = 0 }) {
  const router = useRouter();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [openSubMenu, setOpenSubMenu] = useState(null);
  const [scrolled, setScrolled] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("all");

  // Dynamic shadow elevation on scroll
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleSubMenu = (menu) => {
    setOpenSubMenu(openSubMenu === menu ? null : menu);
  };

  // Handle Search Submission
  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      const categoryParam = selectedCategory !== "all" ? `&category=${selectedCategory}` : "";
      router.push(`/search?q=${encodeURIComponent(searchQuery)}${categoryParam}`);
      setMobileMenuOpen(false);
    }
  };

  return (
    <header className={`sticky top-0 z-50 w-full font-sans transition-all duration-300 ${scrolled ? "shadow-2xl" : "shadow-md"}`}>
      {/* 1. TOP UTILITY STRIP */}
      <div className="bg-slate-900 text-slate-300 text-[11px] py-1.5 px-4 md:px-8 border-b border-slate-800/80">
        <div className="max-w-[1440px] mx-auto flex justify-between items-center">
          {/* Left info */}
          <div className="flex items-center gap-6 font-medium tracking-wide">
            <a href="tel:+918923744131" className="flex items-center gap-1.5 hover:text-amber-400 transition-colors">
              <PhoneCall className="w-3 h-3 text-amber-400" />
              SALES & ENQUIRY: <strong className="text-white hover:text-amber-400">+91 89237 44131</strong>
            </a>
            <span className="hidden md:inline-block text-slate-500">|</span>
            <a href="https://t.me" target="_blank" rel="noreferrer" className="hover:text-amber-400 transition-colors hidden sm:inline">
              Telegram Channel
            </a>
          </div>

          {/* Right account links */}
          <div className="flex items-center gap-5 text-slate-300">
            <Link href="/blog" className="hover:text-amber-400 transition-colors hidden lg:inline">Blog</Link>
            <Link href="/contact" className="hover:text-amber-400 transition-colors hidden sm:inline">Contact Support</Link>
            <span className="hidden sm:inline text-slate-700">|</span>
            <Link href="/auth/signin" className="flex items-center gap-1.5 font-semibold text-white hover:text-amber-400 transition-colors">
              <User className="w-3.5 h-3.5 text-amber-400" />
              <span>Sign In / Register</span>
            </Link>
          </div>
        </div>
      </div>

      {/* 2. MAIN NAV HEADER (DARK GLASS) */}
      <div className="bg-slate-950 text-white border-b border-slate-800 py-3 px-4 md:px-8">
        <div className="max-w-[1440px] mx-auto flex items-center justify-between gap-6">
          
          {/* Brand Logo & Mobile Toggle */}
          <div className="flex items-center gap-4">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-lg bg-slate-900 border border-slate-800 text-slate-300 hover:text-white hover:border-slate-700 focus:outline-none"
              aria-label="Toggle Navigation"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>

            <Link href="/" className="group flex items-center gap-2">
              <div className="bg-gradient-to-tr from-amber-500 to-yellow-400 text-slate-950 font-black text-2xl tracking-wider px-3 py-1 rounded-md shadow-lg shadow-amber-500/10">
                GSM<span className="text-slate-950">SERVER</span>
              </div>
            </Link>
          </div>

          {/* Desktop Navigation Links with Mega Menu Hover */}
          <nav className="hidden lg:flex items-center gap-8 text-xs font-bold uppercase tracking-wider">
            <Link href="/" className="text-amber-400 hover:text-amber-300 transition-colors">
              Home
            </Link>

            {/* Submenu Dropdown 1 - Hardware */}
            <div className="relative group py-2">
              <Link href="/category/hardware" className="flex items-center gap-1.5 text-slate-200 group-hover:text-amber-400 transition-colors">
                Mobile Hardware Tool <ChevronDown className="w-3.5 h-3.5 text-slate-400 group-hover:rotate-180 transition-transform" />
              </Link>
              <div className="absolute top-full left-0 w-56 bg-slate-900 border border-slate-800 rounded-xl shadow-2xl p-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 transform translate-y-2 group-hover:translate-y-0 z-50">
                <Link href="/category/hardware/microscopes" className="block px-3 py-2 rounded-lg text-slate-300 hover:bg-slate-800 hover:text-amber-400 font-medium normal-case">Microscopes & Cameras</Link>
                <Link href="/category/hardware/soldering-stations" className="block px-3 py-2 rounded-lg text-slate-300 hover:bg-slate-800 hover:text-amber-400 font-medium normal-case">Soldering Stations</Link>
                <Link href="/category/hardware/programmers" className="block px-3 py-2 rounded-lg text-slate-300 hover:bg-slate-800 hover:text-amber-400 font-medium normal-case">Programmers & Adapters</Link>
              </div>
            </div>

            {/* Submenu Dropdown 2 - Server */}
            <div className="relative group py-2">
              <Link href="/category/server-services" className="flex items-center gap-1.5 text-slate-200 group-hover:text-amber-400 transition-colors">
                Server Service <ChevronDown className="w-3.5 h-3.5 text-slate-400 group-hover:rotate-180 transition-transform" />
              </Link>
              <div className="absolute top-full left-0 w-56 bg-slate-900 border border-slate-800 rounded-xl shadow-2xl p-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 transform translate-y-2 group-hover:translate-y-0 z-50">
                <Link href="/category/server-services/samsung-frp" className="block px-3 py-2 rounded-lg text-slate-300 hover:bg-slate-800 hover:text-amber-400 font-medium normal-case">Samsung FRP Credits</Link>
                <Link href="/category/server-services/xiaomi-credits" className="block px-3 py-2 rounded-lg text-slate-300 hover:bg-slate-800 hover:text-amber-400 font-medium normal-case">Xiaomi Auth Credits</Link>
                <Link href="/category/server-services/oppo-realme" className="block px-3 py-2 rounded-lg text-slate-300 hover:bg-slate-800 hover:text-amber-400 font-medium normal-case">Oppo / Realme Server</Link>
              </div>
            </div>

            {/* Submenu Dropdown 3 - Software */}
            <div className="relative group py-2">
              <Link href="/category/software-tools" className="flex items-center gap-1.5 text-slate-200 group-hover:text-amber-400 transition-colors">
                Software Box <ChevronDown className="w-3.5 h-3.5 text-slate-400 group-hover:rotate-180 transition-transform" />
              </Link>
              <div className="absolute top-full left-0 w-56 bg-slate-900 border border-slate-800 rounded-xl shadow-2xl p-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 transform translate-y-2 group-hover:translate-y-0 z-50">
                <Link href="/category/software-tools/unlocktool" className="block px-3 py-2 rounded-lg text-slate-300 hover:bg-slate-800 hover:text-amber-400 font-medium normal-case">UnlockTool License</Link>
                <Link href="/category/software-tools/borneo" className="block px-3 py-2 rounded-lg text-slate-300 hover:bg-slate-800 hover:text-amber-400 font-medium normal-case">Borneo Schematics</Link>
                <Link href="/category/software-tools/umt-dongle" className="block px-3 py-2 rounded-lg text-slate-300 hover:bg-slate-800 hover:text-amber-400 font-medium normal-case">UMT Dongle / Box</Link>
              </div>
            </div>

            <Link href="/flash-files" className="text-slate-200 hover:text-amber-400 transition-colors">
              Flash Files
            </Link>
          </nav>

          {/* Right Action Icons */}
          <div className="flex items-center gap-5">
            <a href="tel:+918923744131" className="hidden sm:flex items-center gap-3 bg-slate-900/80 border border-slate-800 rounded-xl px-3.5 py-1.5 hover:border-amber-500/50 transition-colors">
              <Headphones className="w-5 h-5 text-amber-400" />
              <div>
                <span className="block text-slate-400 text-[10px] uppercase font-bold tracking-wider">Live Desk</span>
                <span className="font-bold text-xs text-white">+91 89237 44131</span>
              </div>
            </a>

            <div className="flex items-center gap-3">
              {/* <Link href="/compare" className="relative p-2.5 rounded-xl bg-slate-900 border border-slate-800 hover:border-slate-700 text-slate-300 hover:text-amber-400 transition-all">
                <GitCompare className="w-4 h-4" />
                <span className="absolute -top-1.5 -right-1.5 bg-amber-500 text-slate-950 font-black rounded-full w-4 h-4 text-[10px] flex items-center justify-center">
                  0
                </span>
              </Link> */}

              <Link href="/cart" className="relative flex items-center gap-2.5 bg-gradient-to-r from-amber-500 to-yellow-500 text-slate-950 font-bold px-4 py-2 rounded-xl hover:brightness-110 shadow-lg shadow-amber-500/20 transition-all text-xs">
                <ShoppingCart className="w-4 h-4" />
                <span className="hidden sm:inline">Cart</span>
                <span className="bg-slate-950 text-amber-400 font-extrabold rounded-full px-2 py-0.5 text-[10px]">
                  {cartCount}
                </span>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* 3. SEARCH BAR ROW */}
      <div className="bg-white border-b border-slate-200 py-3 px-4 md:px-8 shadow-sm">
        <div className="max-w-[1440px] mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          
          {/* Search Box */}
          <form onSubmit={handleSearch} className="w-full flex-1 flex items-center bg-slate-50 border-2 border-slate-200 focus-within:border-amber-500 rounded-xl overflow-hidden transition-all">
            <div className="relative border-r border-slate-200 hidden md:block">
              <select 
                value={selectedCategory} 
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="bg-transparent text-slate-700 text-xs py-2.5 px-4 outline-none appearance-none pr-8 font-semibold cursor-pointer"
              >
                <option value="all">All Categories</option>
                <option value="software">Software Tools</option>
                <option value="server">Server Credits</option>
                <option value="hardware">Hardware Tools</option>
              </select>
              <ChevronDown className="w-3.5 h-3.5 text-slate-400 absolute right-2.5 top-3.5 pointer-events-none" />
            </div>

            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery && setSearchQuery(e.target.value)}
              placeholder="Search tools, activation keys, server credits..."
              className="w-full text-xs px-4 py-2.5 bg-transparent outline-none text-slate-900 placeholder-slate-400 font-medium"
            />

            <button type="submit" className="bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold px-5 py-2.5 text-xs transition-colors flex items-center gap-1.5">
              <Search className="w-4 h-4" />
              <span className="hidden md:inline">Search</span>
            </button>
          </form>

          {/* Quick Shortcuts */}
          <div className="flex items-center justify-between w-full sm:w-auto gap-6 text-xs font-bold text-slate-700">
            <Link href="/track-order" className="flex items-center gap-1.5 hover:text-amber-600 transition-colors">
              <MapPin className="w-4 h-4 text-amber-500" />
              <span>Track Order</span>
            </Link>
            <Link href="/deals" className="flex items-center gap-1.5 hover:text-amber-600 transition-colors">
              <Percent className="w-4 h-4 text-amber-500" />
              <span>Daily Deals</span>
            </Link>
          </div>
        </div>
      </div>

      {/* 4. RED MARQUEE ANNOUNCEMENT STRIP */}
      <div className="bg-gradient-to-r from-red-600 via-rose-600 to-red-600 text-white text-[11px] font-bold py-1.5 px-4 text-center tracking-wide flex items-center justify-center gap-2 shadow-inner">
        <Zap className="w-3.5 h-3.5 text-amber-300 animate-pulse hidden sm:inline" />
        <p className="truncate">
          🔥 Automated 24/7 Server Credit Top-up Active! Get instant WhatsApp support before placing your order.
        </p>
      </div>

      {/* 5. MOBILE DRAWER SLIDE-OVER */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 lg:hidden flex">
          <div 
            className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm transition-opacity"
            onClick={() => setMobileMenuOpen(false)}
          />
          <div className="relative bg-slate-950 w-4/5 max-w-xs h-full text-white p-6 flex flex-col justify-between shadow-2xl z-10 overflow-y-auto border-r border-slate-800">
            <div>
              <div className="flex items-center justify-between border-b border-slate-800 pb-4 mb-6">
                <Link href="/" onClick={() => setMobileMenuOpen(false)} className="font-black text-xl tracking-wider flex items-center">
                  <span className="text-amber-400">GSM</span>
                  <span className="text-white">SERVER</span>
                </Link>
                <button 
                  onClick={() => setMobileMenuOpen(false)} 
                  className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-slate-900"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="space-y-3 text-xs uppercase font-bold tracking-wider">
                <Link href="/" onClick={() => setMobileMenuOpen(false)} className="block py-2 text-amber-400 border-b border-slate-800">
                  Home
                </Link>

                {/* Mobile Accordion 1 - Hardware */}
                <div className="border-b border-slate-800 pb-2">
                  <button 
                    onClick={() => toggleSubMenu("hardware")} 
                    className="w-full flex items-center justify-between py-2 text-slate-200 hover:text-amber-400"
                  >
                    <span>Mobile Hardware Tool</span>
                    <ChevronDown className={`w-4 h-4 transition-transform ${openSubMenu === "hardware" ? "rotate-180" : ""}`} />
                  </button>
                  {openSubMenu === "hardware" && (
                    <div className="pl-4 pt-2 space-y-2 text-[11px] text-slate-400 font-medium normal-case">
                      <Link href="/category/hardware/microscopes" onClick={() => setMobileMenuOpen(false)} className="block hover:text-amber-400">Microscopes</Link>
                      <Link href="/category/hardware/soldering-stations" onClick={() => setMobileMenuOpen(false)} className="block hover:text-amber-400">Soldering Stations</Link>
                      <Link href="/category/hardware/programmers" onClick={() => setMobileMenuOpen(false)} className="block hover:text-amber-400">Programmers</Link>
                    </div>
                  )}
                </div>

                {/* Mobile Accordion 2 - Server */}
                <div className="border-b border-slate-800 pb-2">
                  <button 
                    onClick={() => toggleSubMenu("server")} 
                    className="w-full flex items-center justify-between py-2 text-slate-200 hover:text-amber-400"
                  >
                    <span>Server Service</span>
                    <ChevronDown className={`w-4 h-4 transition-transform ${openSubMenu === "server" ? "rotate-180" : ""}`} />
                  </button>
                  {openSubMenu === "server" && (
                    <div className="pl-4 pt-2 space-y-2 text-[11px] text-slate-400 font-medium normal-case">
                      <Link href="/category/server-services/samsung-frp" onClick={() => setMobileMenuOpen(false)} className="block hover:text-amber-400">Samsung FRP Credits</Link>
                      <Link href="/category/server-services/xiaomi-credits" onClick={() => setMobileMenuOpen(false)} className="block hover:text-amber-400">Xiaomi Credits</Link>
                      <Link href="/category/server-services/oppo-realme" onClick={() => setMobileMenuOpen(false)} className="block hover:text-amber-400">Oppo / Realme Server</Link>
                    </div>
                  )}
                </div>

                {/* Mobile Accordion 3 - Software */}
                <div className="border-b border-slate-800 pb-2">
                  <button 
                    onClick={() => toggleSubMenu("software")} 
                    className="w-full flex items-center justify-between py-2 text-slate-200 hover:text-amber-400"
                  >
                    <span>Software Box</span>
                    <ChevronDown className={`w-4 h-4 transition-transform ${openSubMenu === "software" ? "rotate-180" : ""}`} />
                  </button>
                  {openSubMenu === "software" && (
                    <div className="pl-4 pt-2 space-y-2 text-[11px] text-slate-400 font-medium normal-case">
                      <Link href="/category/software-tools/unlocktool" onClick={() => setMobileMenuOpen(false)} className="block hover:text-amber-400">UnlockTool License</Link>
                      <Link href="/category/software-tools/borneo" onClick={() => setMobileMenuOpen(false)} className="block hover:text-amber-400">Borneo Schematics</Link>
                      <Link href="/category/software-tools/umt-dongle" onClick={() => setMobileMenuOpen(false)} className="block hover:text-amber-400">UMT Dongle / Box</Link>
                    </div>
                  )}
                </div>

                <Link href="/flash-files" onClick={() => setMobileMenuOpen(false)} className="block py-2 text-slate-200 hover:text-amber-400 border-b border-slate-800">
                  Flash Files
                </Link>
              </div>
            </div>

            <div className="pt-6 border-t border-slate-800 text-xs text-slate-400 space-y-3">
              <Link href="/auth/signin" onClick={() => setMobileMenuOpen(false)} className="flex items-center gap-2 text-amber-400 font-bold">
                <User className="w-4 h-4" /> Sign In / Register
              </Link>
              <a href="tel:+918923744131" className="block text-[11px] hover:text-white">Help desk: +91 89237 44131</a>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}