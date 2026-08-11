"use client";

import { useState, useEffect, use } from "react";
import Image from "next/image";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import FloatingWhatsApp from "@/components/FloatingWhatsApp";
import { ALL_PRODUCTS, getProductById } from "../../data/products";
import { useCart } from "../../context/CartContext";
import { 
  Star, 
  ShoppingCart, 
  Zap, 
  ShieldCheck, 
  RefreshCw, 
  MessageCircle, 
  ChevronRight,
  Plus,
  Minus,
  Check
} from "lucide-react";

export default function ProductDetailPage({ params }) {
  const resolvedParams = use(params);
  const productId = resolvedParams?.id;

  const product = getProductById(productId) || ALL_PRODUCTS[0];
  const { cartCount, addToCart } = useCart();

  const [selectedImage, setSelectedImage] = useState(
    product.images?.[0] || product.image
  );
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState("description");
  const [searchQuery, setSearchQuery] = useState("");
  const [isAdded, setIsAdded] = useState(false);

  useEffect(() => {
    if (product) {
      setSelectedImage(product.images?.[0] || product.image);
    }
  }, [product]);

  const handleIncrease = () => setQuantity((prev) => prev + 1);
  const handleDecrease = () => setQuantity((prev) => (prev > 1 ? prev - 1 : 1));

  const handleAddToCart = () => {
    for (let i = 0; i < quantity; i++) {
      addToCart(product);
    }
    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 1500);
  };

  const discountPercent = product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

  return (
    <div className="min-h-screen flex flex-col font-sans bg-slate-50 text-slate-800">
      <Header
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        cartCount={cartCount}
      />

      <div className="bg-white border-b border-slate-200 py-3 px-4 md:px-8">
        <div className="max-w-[1440px] mx-auto flex items-center gap-2 text-xs font-semibold text-slate-500">
          <Link href="/" className="hover:text-amber-600">Home</Link>
          <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
          <span className="text-slate-400">{product.category}</span>
          <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
          <span className="text-slate-900 truncate max-w-[200px] sm:max-w-none">{product.name}</span>
        </div>
      </div>

      <main className="max-w-[1440px] mx-auto px-4 md:px-8 py-8 flex-1 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 bg-white p-6 md:p-8 rounded-2xl border border-slate-200 shadow-sm">
          <div className="lg:col-span-5 flex flex-col gap-4">
            <div className="relative w-full h-[320px] sm:h-[400px] bg-slate-50 rounded-xl border border-slate-200 overflow-hidden group">
              <Image
                src={selectedImage}
                alt={product.name}
                fill
                priority
                className="object-contain p-4 transition-transform duration-300 group-hover:scale-105"
              />
              {product.tag && (
                <span className="absolute top-3 right-3 bg-red-600 text-white text-[10px] font-black uppercase px-2.5 py-1 rounded-md shadow-sm">
                  {product.tag}
                </span>
              )}
            </div>

            {product.images && product.images.length > 1 && (
              <div className="flex gap-3 overflow-x-auto pb-2">
                {product.images.map((img, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => setSelectedImage(img)}
                    className={`relative w-16 h-16 sm:w-20 sm:h-20 rounded-lg border-2 overflow-hidden bg-slate-50 flex-shrink-0 transition-all ${
                      selectedImage === img
                        ? "border-amber-500 shadow-md"
                        : "border-slate-200 hover:border-slate-400"
                    }`}
                  >
                    <Image
                      src={img}
                      alt={`Thumbnail ${idx}`}
                      fill
                      className="object-contain p-1"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          <div className="lg:col-span-7 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between gap-4 mb-2">
                <span className="text-xs font-bold uppercase tracking-wider text-amber-600 bg-amber-50 px-2.5 py-1 rounded-md">
                  {product.category}
                </span>

                <div className="flex items-center gap-1.5 bg-slate-100 px-2.5 py-1 rounded-md">
                  <div className="flex text-amber-400">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                    ))}
                  </div>
                  <span className="text-xs font-bold text-slate-700">
                    {product.rating} ({product.reviews} reviews)
                  </span>
                </div>
              </div>

              <h1 className="text-xl sm:text-2xl font-extrabold text-slate-900 leading-tight mb-4">
                {product.name}
              </h1>

              <div className="flex items-baseline gap-3 mb-6 p-4 bg-slate-50 border border-slate-100 rounded-xl">
                <span className="text-2xl sm:text-3xl font-black text-slate-900">
                  ₹{(product.price * quantity).toLocaleString("en-IN")}
                </span>

                {product.originalPrice && (
                  <span className="text-base text-slate-400 line-through font-semibold">
                    ₹{(product.originalPrice * quantity).toLocaleString("en-IN")}
                  </span>
                )}

                {discountPercent > 0 && (
                  <span className="bg-red-100 text-red-700 text-xs font-bold px-2 py-0.5 rounded-md">
                    {discountPercent}% OFF
                  </span>
                )}
              </div>

              {product.highlights && product.highlights.length > 0 && (
                <div className="space-y-2 mb-6">
                  <h3 className="text-xs font-bold uppercase text-slate-400 tracking-wider">Highlights</h3>
                  <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs font-medium text-slate-700">
                    {product.highlights.map((item, idx) => (
                      <li key={idx} className="flex items-center gap-2">
                        <Zap className="w-3.5 h-3.5 text-amber-500 flex-shrink-0" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              <div className="flex items-center gap-4 mb-6">
                <span className="text-xs font-bold text-slate-700 uppercase">Quantity:</span>
                <div className="flex items-center border border-slate-300 rounded-lg bg-white overflow-hidden shadow-sm">
                  <button
                    type="button"
                    onClick={handleDecrease}
                    className="p-2.5 text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition-colors"
                  >
                    <Minus className="w-3.5 h-3.5" />
                  </button>

                  <span className="px-4 text-xs font-bold text-slate-900 min-w-[3rem] text-center select-none">
                    {quantity}
                  </span>

                  <button
                    type="button"
                    onClick={handleIncrease}
                    className="p-2.5 text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition-colors"
                  >
                    <Plus className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>

            <div className="space-y-4 pt-4 border-t border-slate-200">
              <div className="flex flex-col sm:flex-row gap-3">
                <button
                  type="button"
                  onClick={handleAddToCart}
                  className={`flex-1 font-extrabold py-3 px-6 rounded-xl shadow-lg flex items-center justify-center gap-2 text-xs uppercase tracking-wide transition-all ${
                    isAdded
                      ? "bg-emerald-600 text-white shadow-emerald-600/20"
                      : "bg-amber-500 hover:bg-amber-600 active:scale-95 text-slate-950 shadow-amber-500/20"
                  }`}
                >
                  {isAdded ? (
                    <>
                      <Check className="w-4 h-4" /> Added To Cart!
                    </>
                  ) : (
                    <>
                      <ShoppingCart className="w-4 h-4" /> Add To Cart ({quantity})
                    </>
                  )}
                </button>

                <a
                  href={`https://wa.me/918923744131?text=${encodeURIComponent(
                    `Hi, I want to order ${product.name} (Quantity: ${quantity})`
                  )}`}
                  target="_blank"
                  rel="noreferrer"
                  className="flex-1 bg-emerald-600 hover:bg-emerald-700 active:scale-95 text-white font-extrabold py-3 px-6 rounded-xl shadow-lg shadow-emerald-600/20 flex items-center justify-center gap-2 text-xs uppercase tracking-wide transition-all"
                >
                  <MessageCircle className="w-4 h-4" />
                  Buy via WhatsApp
                </a>
              </div>

              <div className="grid grid-cols-3 gap-2 pt-2 text-center border-t border-slate-100">
                <div className="flex flex-col items-center p-2">
                  <Zap className="w-5 h-5 text-amber-500 mb-1" />
                  <span className="text-[10px] font-bold text-slate-700">Instant API Delivery</span>
                </div>
                <div className="flex flex-col items-center p-2 border-x border-slate-100">
                  <ShieldCheck className="w-5 h-5 text-emerald-500 mb-1" />
                  <span className="text-[10px] font-bold text-slate-700">Official Reseller</span>
                </div>
                <div className="flex flex-col items-center p-2">
                  <RefreshCw className="w-5 h-5 text-cyan-600 mb-1" />
                  <span className="text-[10px] font-bold text-slate-700">24/7 Desk Support</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-8 bg-white border border-slate-200 rounded-2xl p-6 md:p-8 shadow-sm">
          <div className="flex border-b border-slate-200 gap-6 mb-6">
            <button
              type="button"
              onClick={() => setActiveTab("description")}
              className={`pb-3 text-xs font-bold uppercase tracking-wider transition-colors ${
                activeTab === "description"
                  ? "text-amber-600 border-b-2 border-amber-500"
                  : "text-slate-500 hover:text-slate-800"
              }`}
            >
              Description
            </button>
            <button
              type="button"
              onClick={() => setActiveTab("specs")}
              className={`pb-3 text-xs font-bold uppercase tracking-wider transition-colors ${
                activeTab === "specs"
                  ? "text-amber-600 border-b-2 border-amber-500"
                  : "text-slate-500 hover:text-slate-800"
              }`}
            >
              Specifications
            </button>
          </div>

          {activeTab === "description" && (
            <div className="text-xs leading-relaxed text-slate-600 space-y-3">
              <p>{product.description}</p>
              <p>
                All digital credits and software activation keys are processed automatically.
                Ensure your registered username or hardware serial number is correctly supplied during checkout.
              </p>
            </div>
          )}

          {activeTab === "specs" && product.specifications && (
            <div className="divide-y divide-slate-100 max-w-xl">
              {Object.entries(product.specifications).map(([key, val]) => (
                <div key={key} className="py-2.5 flex justify-between text-xs">
                  <span className="font-bold text-slate-500">{key}</span>
                  <span className="font-semibold text-slate-900">{val}</span>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>

      <Footer />
      <FloatingWhatsApp />
    </div>
  );
}