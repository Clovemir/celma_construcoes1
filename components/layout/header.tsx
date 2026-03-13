"use client";

import { useState, useMemo, useEffect } from "react";
import { useUiStore } from "@/store/ui-store";
import { ShoppingCart, Search, ChevronDown, Menu } from "lucide-react";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import { CATEGORIES, PRODUCTS } from "@/constants";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useCart } from "@/store/cart-store";
import { formatCurrencyBRL } from "@/lib/utils";

export function Header() {
  const [query, setQuery] = useState("");
  const [debouncedQuery, setDebouncedQuery] = useState("");
  const [showSearchResults, setShowSearchResults] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const { panel, togglePanel, closePanel } = useUiStore();
  const departmentsOpen = panel === "departments";

  // whenever an overlay panel becomes active, hide mobile menu if open
  useEffect(() => {
    if (panel && mobileMenuOpen) {
      setMobileMenuOpen(false);
    }
  }, [panel, mobileMenuOpen]);
  const { items, open } = useCart();

  const totalItems = items.reduce((acc, item) => acc + item.quantity, 0);

  // debounce simples simulado
  function handleChange(value: string) {
    setQuery(value);
    setShowSearchResults(Boolean(value));
    window.clearTimeout((window as any).__searchTimeout);
    (window as any).__searchTimeout = window.setTimeout(() => {
      setDebouncedQuery(value);
    }, 400);
  }

  const searchResults = useMemo(() => {
    if (!debouncedQuery) return [];
    const q = debouncedQuery.toLowerCase();
    return PRODUCTS.filter((p) => p.name.toLowerCase().includes(q)).slice(
      0,
      5
    );
  }, [debouncedQuery]);

  return (
    <header className="sticky top-0 z-40 border-b border-slate-800/80 bg-slate-950/95 backdrop-blur-xl">
      <div className="container flex h-16 items-center justify-between gap-4 md:h-20">
        <div className="flex items-center gap-3">
          <button
            className="inline-flex items-center justify-center rounded-full border border-slate-800/80 bg-slate-900/80 p-2 text-slate-200 hover:bg-slate-800/80 md:hidden"
            onClick={() => {
              setMobileMenuOpen((prev) => !prev);
              if (!mobileMenuOpen) {
                useUiStore.getState().closePanel();
              }
            }}
            aria-label="Abrir menu"
          >
            <Menu size={18} />
          </button>
          <div className="flex items-center gap-2">
            <div className="flex h-9 w-9 items-center justify-center rounded-2xl bg-gradient-to-br from-orange-500 to-amber-400 text-slate-950 shadow-soft">
              <span className="text-base font-black tracking-tight">C</span>
            </div>
            <div className="leading-tight">
              <div className="text-sm font-semibold tracking-tight md:text-base">
                Celma Construções
              </div>
              <div className="text-[10px] uppercase tracking-[0.18em] text-slate-400">
                Materiais para obra
              </div>
            </div>
          </div>
        </div>

        <div className="relative hidden max-w-xl flex-1 items-center gap-3 md:flex">
          <div className="relative flex-1">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500" />
            <Input
              placeholder="Buscar por produto, marca ou categoria"
              className="pl-9 text-xs md:text-sm"
              value={query}
              onChange={(e) => handleChange(e.target.value)}
              onFocus={() => query && setShowSearchResults(true)}
              onBlur={() => setTimeout(() => setShowSearchResults(false), 150)}
            />
            {showSearchResults && searchResults.length > 0 && (
              <div className="absolute left-0 right-0 top-11 z-30 rounded-2xl border border-slate-800/90 bg-slate-950/98 shadow-lg shadow-slate-950/50 backdrop-blur-sm">
                <div className="px-3 py-2 text-[10px] font-medium uppercase tracking-[0.18em] text-slate-500">
                  {searchResults.length} Resultado{searchResults.length !== 1 ? 's' : ''}
                </div>
                <ul className="divide-y divide-slate-800/50">
                  {searchResults.map((product) => (
                    <li
                      key={product.id}
                      className="flex cursor-pointer items-center justify-between gap-3 px-3 py-2.5 text-xs text-slate-100 hover:bg-slate-900/60 transition-colors group"
                    >
                      <div className="flex-1">
                        <span className="line-clamp-1 font-medium group-hover:text-orange-300 transition-colors">
                          {product.name}
                        </span>
                        <p className="text-[10px] text-slate-500">{product.brand}</p>
                      </div>
                      <span className="whitespace-nowrap text-[11px] font-semibold text-orange-400">
                        {formatCurrencyBRL(product.price)}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          <div className="relative">
            <button
              className="inline-flex items-center gap-1 rounded-full border border-slate-800/90 bg-slate-900/90 px-3 py-1.5 text-[11px] font-medium text-slate-200 hover:bg-slate-800/90"
              onClick={() => togglePanel("departments")}
            >
              <span className="hidden md:inline">Departamentos</span>
              <ChevronDown
                size={14}
                className={`transition-transform ${
                  departmentsOpen ? "rotate-180" : ""
                }`}
              />
            </button>
            {departmentsOpen && (
              <div
                role="menu"
                aria-label="Departamentos"
                className="absolute right-0 top-9 z-50 w-64 rounded-2xl border border-slate-800/90 bg-slate-950/100 p-2 shadow-soft backdrop-blur-sm"
                onBlur={() => closePanel()}
              >
                <p className="px-2 pb-1 text-[10px] font-medium uppercase tracking-[0.18em] text-slate-500">
                  Departamentos
                </p>
                <ul className="space-y-1 pt-1 text-sm">
                  {CATEGORIES.map((category) => (
                    <li
                      key={category.id}
                      className="flex cursor-pointer items-center justify-between rounded-xl px-2.5 py-1.5 text-slate-100 hover:bg-slate-900"
                    >
                      <span className="text-xs font-medium">
                        {category.name}
                      </span>
                      <span className="text-[10px] uppercase tracking-[0.18em] text-slate-500">
                        Ver itens
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>

        <div className="flex items-center gap-3">
          <ThemeToggle />
          <div className="hidden items-center gap-2 text-right text-xs md:flex">
            <span className="block text-[10px] uppercase tracking-[0.18em] text-slate-500">
              Atendimento
            </span>
            <span className="block font-medium text-slate-100">
              Obra corporativa? Fale com um consultor.
            </span>
          </div>

          <Button
            variant="ghost"
            size="icon"
            className="relative h-10 w-10 rounded-full border border-slate-800/80 bg-slate-900/80 text-slate-100 hover:bg-slate-800/80"
            onClick={() => useUiStore.getState().togglePanel("cart")}
            aria-label="Abrir carrinho"
          >
            <ShoppingCart size={18} />
            {totalItems > 0 && (
              <span className="absolute -right-1 -top-1 inline-flex min-h-[18px] min-w-[18px] items-center justify-center rounded-full bg-orange-500 px-[6px] text-[10px] font-semibold text-slate-950 shadow-md">
                {totalItems}
              </span>
            )}
          </Button>
        </div>
      </div>

      {mobileMenuOpen && (
        <div className="border-t border-slate-800/80 bg-slate-950/98 md:hidden">
          <div className="container space-y-4 py-3">
            <div className="relative">
              <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500" />
              <Input
                placeholder="Buscar produtos"
                className="pl-9 text-xs"
                value={query}
                onChange={(e) => handleChange(e.target.value)}
              />
            </div>
            <div>
              <p className="mb-1 text-[10px] font-medium uppercase tracking-[0.18em] text-slate-500">
                Departamentos
              </p>
              <div className="flex flex-wrap gap-1.5">
                {CATEGORIES.map((category) => (
                  <Badge key={category.id} className="text-[11px]">
                    {category.name}
                  </Badge>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}

