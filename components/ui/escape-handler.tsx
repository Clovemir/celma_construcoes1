"use client";

import { useEffect } from "react";
import { useUiStore } from "@/store/ui-store";

export function EscapeHandler() {
  const closePanel = useUiStore((s) => s.closePanel);

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") {
        closePanel();
      }
    }
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [closePanel]);

  return null;
}
