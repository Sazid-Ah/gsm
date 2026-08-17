"use client";

import React, { createContext, useContext, useSyncExternalStore } from "react";

/** Shape mirrors the products served by lib/api.js. */
export interface ProductFile {
  name: string;
  version: string;
  size: string;
  updated: string;
  requirements: string;
}

export interface ProductLicense {
  type: string;
  scope: string;
  delivery: string;
}

export interface Product {
  id: string;
  name: string;
  category: string;
  subcategory?: string;
  brand?: string;
  /** Price of ONE one-time-use license. The file itself is always free. */
  price: number;
  originalPrice?: number | null;
  rating?: number;
  reviews?: number;
  tag?: string | null;
  image: string;
  images?: string[];
  isNew?: boolean;
  summary?: string;
  description?: string;
  file?: ProductFile;
  license?: ProductLicense;
  supports?: string[];
  highlights?: string[];
  specifications?: Record<string, string>;
}

/** `quantity` is how many one-time uses the customer is buying. */
export interface CartItem extends Product {
  quantity: number;
}

export interface CartContextType {
  cart: CartItem[];
  cartCount: number;
  subtotal: number;
  addToCart: (product: Product) => void;
  removeFromCart: (id: string) => void;
  updateQuantity: (id: string, delta: number) => void;
  clearCart: () => void;
}

/* ---------------------------------------------------------------------------
 * localStorage-backed store.
 *
 * The cart lives outside React because it must not exist during SSR: the server
 * has no localStorage, so it always renders an empty cart, and the real one is
 * adopted right after hydration. useSyncExternalStore models exactly that —
 * `getServerSnapshot` returns empty, `getSnapshot` reads storage — which avoids
 * a hydration mismatch without a setState-in-effect round trip. Listening to the
 * `storage` event also keeps multiple open tabs in sync for free.
 * ------------------------------------------------------------------------- */

const STORAGE_KEY = "gsm_cart";
const EMPTY: CartItem[] = [];

let listeners: Array<() => void> = [];
let cachedRaw: string | null = null;
let cachedCart: CartItem[] = EMPTY;

function emit(): void {
  for (const listener of listeners) listener();
}

/** Snapshot must be referentially stable between reads, hence the raw-string cache. */
function readCart(): CartItem[] {
  let raw: string | null = null;
  try {
    raw = localStorage.getItem(STORAGE_KEY);
  } catch {
    raw = null;
  }

  if (raw === cachedRaw) return cachedCart;
  cachedRaw = raw;

  try {
    const parsed = raw ? JSON.parse(raw) : EMPTY;
    cachedCart = Array.isArray(parsed) ? parsed : EMPTY;
  } catch {
    cachedCart = EMPTY;
  }
  return cachedCart;
}

function writeCart(next: CartItem[]): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
  } catch (error) {
    console.error("Failed to save cart:", error);
  }
  emit();
}

function subscribe(listener: () => void): () => void {
  listeners = [...listeners, listener];
  window.addEventListener("storage", listener);
  return () => {
    listeners = listeners.filter((l) => l !== listener);
    window.removeEventListener("storage", listener);
  };
}

const getServerSnapshot = (): CartItem[] => EMPTY;

const CartContext = createContext<CartContextType | null>(null);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const cart = useSyncExternalStore(subscribe, readCart, getServerSnapshot);

  const mutate = (updater: (prev: CartItem[]) => CartItem[]): void => {
    writeCart(updater(readCart()));
  };

  const addToCart = (product: Product): void => {
    mutate((prev) => {
      const existing = prev.find((item) => item.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.id === product.id ? { ...item, quantity: (item.quantity || 1) + 1 } : item
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });
  };

  const removeFromCart = (id: string): void => {
    mutate((prev) => prev.filter((item) => item.id !== id));
  };

  const updateQuantity = (id: string, delta: number): void => {
    mutate((prev) =>
      prev
        .map((item) =>
          item.id === id ? { ...item, quantity: (item.quantity || 1) + delta } : item
        )
        .filter((item) => item.quantity > 0)
    );
  };

  const clearCart = (): void => {
    mutate(() => EMPTY);
  };

  const cartCount = cart.reduce((sum, item) => sum + (item.quantity || 1), 0);
  const subtotal = cart.reduce(
    (sum, item) => sum + (Number(item?.price) || 0) * (Number(item?.quantity) || 1),
    0
  );

  return (
    <CartContext.Provider
      value={{
        cart,
        cartCount,
        subtotal,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart(): CartContextType {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
}
