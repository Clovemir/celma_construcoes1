"use client";

import { useEffect } from "react";
import {
  Building2,
  Paintbrush,
  Droplets,
  Zap,
  Wrench,
  Grid3X3,
  Palette,
  LayoutGrid,
  X,
  type LucideIcon,
} from "lucide-react";
import { CATEGORIES } from "@/constants";
import { useCategoryStore } from "@/store/category-store";

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

export function CategorySidebar() {
  const { isOpen, close, activeCategory, setActiveCategory } =
    useCategoryStore();

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [close]);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  function handleSelect(id: number | null) {
    setActiveCategory(activeCategory === id ? null : id);
    close();
  }

  return (
    <>
      <div
        className={`fixed inset-0 z-40 bg-slate-950/60 backdrop-blur-sm transition-opacity duration-300 ${
          isOpen ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
        onClick={close}
        aria-hidden="true"
      />

      <aside
        className={`fixed bottom-0 left-0 top-16 z-50 flex w-64 flex-col border-r border-slate-800/80 bg-slate-950/98 shadow-2xl backdrop-blur-xl transition-transform duration-300 ease-in-out md:top-[72px] ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
        aria-label="Menu de departamentos"
      >
        <div className="flex items-center justify-between border-b border-slate-800/80 px-4 py-4">
          <div>
            <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-slate-500">
              Departamentos
            </p>
            <p className="mt-0.5 text-xs text-slate-300">
              Filtre por categoria
            </p>
          </div>
          <button
            onClick={close}
            className="flex h-8 w-8 items-center justify-center rounded-full border border-slate-800/80 bg-slate-900/80 text-slate-400 hover:bg-slate-800 hover:text-slate-100 transition-colors"
            aria-label="Fechar menu"
          >
            <X size={15} />
          </button>
        </div>

        <nav className="flex-1 overflow-y-auto p-3">
          <div className="space-y-1">
            <SidebarItem
              label="Todos os produtos"
              sublabel="Ver catálogo completo"
              icon={<LayoutGrid size={16} />}
              active={activeCategory === null}
              onClick={() => handleSelect(null)}
            />

            <div className="my-2 border-t border-slate-800/60" />

            {CATEGORIES.map((cat) => {
              const Icon = ICON_MAP[cat.icon] ?? Building2;
              return (
                <SidebarItem
                  key={cat.id}
                  label={cat.name}
                  sublabel={cat.description}
                  icon={<Icon size={16} />}
                  active={activeCategory === cat.id}
                  onClick={() => handleSelect(cat.id)}
                />
              );
            })}
          </div>
        </nav>

        <div className="border-t border-slate-800/80 px-4 py-3">
          <p className="text-[10px] text-slate-600">
            Mais departamentos em breve conforme integração com banco de dados.
          </p>
        </div>
      </aside>
    </>
  );
}

interface SidebarItemProps {
  label: string;
  sublabel?: string;
  icon: React.ReactNode;
  active: boolean;
  onClick: () => void;
}

function SidebarItem({ label, sublabel, icon, active, onClick }: SidebarItemProps) {
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
