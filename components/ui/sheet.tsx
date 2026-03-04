import * as React from "react";
import { cn } from "@/lib/utils";

interface SheetProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  side?: "right" | "left";
  title?: string;
  description?: string;
  children: React.ReactNode;
}

export function Sheet({
  open,
  onOpenChange,
  side = "right",
  title,
  description,
  children,
}: SheetProps) {
  return (
    <>
      {open && (
        <div
          className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm"
          onClick={() => onOpenChange(false)}
        />
      )}
      <div
        className={cn(
          "fixed inset-y-0 z-50 w-full max-w-md transform bg-slate-950/98 shadow-2xl transition-transform duration-300 ease-out border-l border-slate-800/80",
          side === "right" ? "right-0" : "left-0",
          open
            ? "translate-x-0"
            : side === "right"
            ? "translate-x-full"
            : "-translate-x-full"
        )}
      >
        <div className="flex h-full flex-col">
          {(title || description) && (
            <div className="border-b border-slate-800/80 px-5 py-4">
              {title && (
                <h2 className="text-sm font-semibold tracking-tight text-slate-50">
                  {title}
                </h2>
              )}
              {description && (
                <p className="mt-1 text-xs text-slate-400">{description}</p>
              )}
            </div>
          )}
          <div className="flex-1 overflow-y-auto px-5 py-4 scrollbar-thin">
            {children}
          </div>
        </div>
      </div>
    </>
  );
}

