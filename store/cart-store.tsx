"use client";

import React, { createContext, useContext, useMemo } from "react";
import { create } from "zustand";
import type { Product } from "@/constants";

export interface CartItem {
  product: Product;
  quantity: number;
}

interface CartState {
  items: CartItem[];
  isOpen: boolean;
  toggleOpen: () => void;
  open: () => void;
  close: () => void;
  addItem: (product: Product) => void;
  removeItem: (productId: number) => void;
  increment: (productId: number) => void;
  decrement: (productId: number) => void;
  clear: () => void;
}

const useCartStore = create<CartState>((set) => ({
  items: [],
  isOpen: false,
  toggleOpen: () => set((state) => ({ isOpen: !state.isOpen })),
  open: () => set({ isOpen: true }),
  close: () => set({ isOpen: false }),
  addItem: (product) =>
    set((state) => {
      const existing = state.items.find(
        (item) => item.product.id === product.id
      );
      if (existing) {
        return {
          items: state.items.map((item) =>
            item.product.id === product.id
              ? { ...item, quantity: item.quantity + 1 }
              : item
          ),
        };
      }
      return {
        items: [...state.items, { product, quantity: 1 }],
      };
    }),
  removeItem: (productId) =>
    set((state) => ({
      items: state.items.filter((item) => item.product.id !== productId),
    })),
  increment: (productId) =>
    set((state) => ({
      items: state.items.map((item) =>
        item.product.id === productId
          ? { ...item, quantity: item.quantity + 1 }
          : item
      ),
    })),
  decrement: (productId) =>
    set((state) => ({
      items: state.items
        .map((item) =>
          item.product.id === productId
            ? { ...item, quantity: item.quantity - 1 }
            : item
        )
        .filter((item) => item.quantity > 0),
    })),
  clear: () => set({ items: [] }),
}));

const CartContext = createContext<ReturnType<typeof useCartStore> | null>(
  null
);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const store = useCartStore();
  const value = useMemo(() => store, [store]);

  return (
    <CartContext.Provider value={value}>{children}</CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart deve ser usado dentro de CartProvider");
  }
  return context;
}

