"use client";

import { create } from "zustand";

interface CategoryState {
  activeCategory: number | null;
  setActiveCategory: (id: number | null) => void;
  isOpen: boolean;
  open: () => void;
  close: () => void;
  toggle: () => void;
}

export const useCategoryStore = create<CategoryState>((set) => ({
  activeCategory: null,
  setActiveCategory: (id) => set({ activeCategory: id }),
  isOpen: false,
  open: () => set({ isOpen: true }),
  close: () => set({ isOpen: false }),
  toggle: () => set((state) => ({ isOpen: !state.isOpen })),
}));
