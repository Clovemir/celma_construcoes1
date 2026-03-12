import { create } from "zustand";

type Panel = "cart" | "departments" | "support" | "chat" | null;

interface UiState {
  panel: Panel;
  openPanel: (p: Panel) => void;
  closePanel: () => void;
  togglePanel: (p: Panel) => void;
}

export const useUiStore = create<UiState>((set) => ({
  panel: null,
  openPanel: (p) =>
    set((state) => {
      if (state.panel === p) return state;
      return { panel: p };
    }),
  closePanel: () => set({ panel: null }),
  togglePanel: (p) =>
    set((state) => ({ panel: state.panel === p ? null : p })),
}));
