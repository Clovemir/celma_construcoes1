"use client";

import { useUiStore } from "@/store/ui-store";
import { SupportWidget } from "@/components/support/support-widget";
import { CartDrawer } from "@/components/cart/cart-drawer";
import { EscapeHandler } from "@/components/ui/escape-handler";

export function ClientLayout() {
  return (
    <>
      {/* dimmed overlay to prevent interaction when a panel is open */}
      {useUiStore((s) => s.panel) && (
        <div
          className="fixed inset-0 z-20 bg-black/50"
          onClick={() => useUiStore.getState().closePanel()}
        />
      )}
      <EscapeHandler />
      <CartDrawer />
      <SupportWidget />
    </>
  );
}