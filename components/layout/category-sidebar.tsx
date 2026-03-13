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

interface CategorySidebarProps {
  active: number | null;
  onSelect: (id: number | null) => void;
}

export function CategorySidebar({ active, onSelect }: CategorySidebarProps) {
  return (
    <aside className="hidden w-52 shrink-0 md:block lg:w-60">
      <div className="sticky top-24 space-y-1 pr-2">
        <p className="mb-3 px-3 text-[10px] font-semibold uppercase tracking-[0.2em] text-slate-500">
          Departamentos
        </p>

        <SidebarItem
          label="Todos os produtos"
          icon={<LayoutGrid size={16} />}
          active={active === null}
          onClick={() => onSelect(null)}
          color="text-slate-300"
        />

        {CATEGORIES.map((cat) => {
          const Icon = ICON_MAP[cat.icon] ?? Building2;
          return (
            <SidebarItem
              key={cat.id}
              label={cat.name}
              sublabel={cat.description}
              icon={<Icon size={16} />}
              active={active === cat.id}
              onClick={() => onSelect(active === cat.id ? null : cat.id)}
              color="text-slate-300"
            />
          );
        })}
      </div>
    </aside>
  );
}

interface SidebarItemProps {
  label: string;
  sublabel?: string;
  icon: React.ReactNode;
  active: boolean;
  onClick: () => void;
  color?: string;
}

function SidebarItem({
  label,
  sublabel,
  icon,
  active,
  onClick,
}: SidebarItemProps) {
  return (
    <button
      onClick={onClick}
      className={`group flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left transition-all ${
        active
          ? "bg-orange-500/15 text-orange-300 ring-1 ring-orange-500/30"
          : "text-slate-400 hover:bg-slate-800/60 hover:text-slate-100"
      }`}
    >
      <span
        className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-lg transition-colors ${
          active
            ? "bg-orange-500/20 text-orange-400"
            : "bg-slate-800/80 text-slate-400 group-hover:bg-slate-700/80 group-hover:text-slate-200"
        }`}
      >
        {icon}
      </span>
      <span className="min-w-0 flex-1">
        <span className="block truncate text-xs font-medium">{label}</span>
        {sublabel && (
          <span className="block truncate text-[10px] text-slate-500 group-hover:text-slate-400">
            {sublabel}
          </span>
        )}
      </span>
      {active && (
        <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-orange-400" />
      )}
    </button>
  );
}
