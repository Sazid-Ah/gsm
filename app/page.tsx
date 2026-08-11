// src/app/page.js
"use client";

import { useState, useMemo } from "react";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import ProductGrid from "@/components/ProductGrid";
import Footer from "@/components/Footer";
import FloatingWhatsApp from "@/components/FloatingWhatsApp";
import { ALL_PRODUCTS } from "./data/products"; // <--- Imported from separate file
import { useCart } from "./context/CartContext";

export interface Product {
  id: string;
  name: string;
  category: string;
  price: number;
  originalPrice?: number | null;
  rating: number;
  reviews: number;
  tag: string;
  image: string;
  isNew?: boolean;
}


export default function Home() {
  const [searchQuery, setSearchQuery] = useState("");
  const { cartCount, addToCart } = useCart();

  const filteredProducts = useMemo(() => {
    if (!searchQuery.trim()) return ALL_PRODUCTS;
    return ALL_PRODUCTS.filter((product) =>
      product.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [searchQuery]);


  return (
    <div className="min-h-screen flex flex-col font-sans bg-slate-50 text-slate-800">
      <Header
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        cartCount={cartCount}
      />
      <Hero />
      <main className="flex-1">
        <ProductGrid
          title="New Arrival Products"
          products={filteredProducts}
          onAddToCart={(product: Product) => addToCart(product)}
        />
      </main>
      <Footer />
      <FloatingWhatsApp />
    </div>
  );
}