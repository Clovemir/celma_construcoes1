"use client";

import {
  Building2,
  Paintbrush,
  Droplets,
  Zap,
  Wrench,
  Grid3X3,
  Palette,
  LayoutGrid,
  type LucideIcon,
} from "lucide-react";
import { CATEGORIES } from "@/constants";

const ICON_MAP: Record<string, LucideIcon> = {
  Building2,
  Paintbrush,
  Droplets,
  Zap,
  Wrench,
  Grid3X3,
  Palette,
  LayoutGrid,
};

interface MobileCategoryBarProps {
  active: number | null;
  onSelect: (id: number | null) => void;
}

export function MobileCategoryBar({ active, onSelect }: MobileCategoryBarProps) {
  return (
    <div className="flex gap-2 overflow-x-auto pb-1 md:hidden">
      <button
        onClick={() => onSelect(null)}
        className={`flex shrink-0 items-center gap-1.5 rounded-full border px-3 py-1.5 text-[11px] font-medium transition-all ${
          active === null
            ? "border-orange-500/50 bg-orange-500/15 text-orange-300"
            : "border-slate-800/80 bg-slate-900/80 text-slate-300 hover:bg-slate-800"
        }`}
      >
        <LayoutGrid size={12} />
        Todos
      </button>
      {CATEGORIES.map((cat) => {
        const Icon = ICON_MAP[cat.icon] ?? Building2;
        return (
          <button
            key={cat.id}
            onClick={() => onSelect(active === cat.id ? null : cat.id)}
            className={`flex shrink-0 items-center gap-1.5 rounded-full border px-3 py-1.5 text-[11px] font-medium transition-all ${
              active === cat.id
                ? "border-orange-500/50 bg-orange-500/15 text-orange-300"
                : "border-slate-800/80 bg-slate-900/80 text-slate-300 hover:bg-slate-800"
            }`}
          >
            <Icon size={12} />
            {cat.name}
          </button>
        );
      })}
    </div>
  );
}
