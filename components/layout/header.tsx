"use client";

import { useState, useMemo } from "react";
import { ShoppingCart, Search, Phone, X, LayoutGrid } from "lucide-react";
import { PRODUCTS } from "@/constants";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useCart } from "@/store/cart-store";
import { useCategoryStore } from "@/store/category-store";
import { formatCurrencyBRL } from "@/lib/utils";

export function Header() {
  const [query, setQuery] = useState("");
  const [debouncedQuery, setDebouncedQuery] = useState("");
  const [showSearchResults, setShowSearchResults] = useState(false);
  const [mobileSearchOpen, setMobileSearchOpen] = useState(false);
  const { items, open: openCart } = useCart();
  const { toggle: toggleSidebar, activeCategory } = useCategoryStore();

  const totalItems = items.reduce((acc, item) => acc + item.quantity, 0);

  function handleChange(value: string) {
    setQuery(value);
    setShowSearchResults(Boolean(value));
    window.clearTimeout((window as any).__searchTimeout);
    (window as any).__searchTimeout = window.setTimeout(() => {
      setDebouncedQuery(value);
    }, 300);
  }

  const searchResults = useMemo(() => {
    if (!debouncedQuery) return [];
    const q = debouncedQuery.toLowerCase();
    return PRODUCTS.filter(
      (p) =>
        p.name.toLowerCase().includes(q) ||
        p.brand.toLowerCase().includes(q)
    ).slice(0, 6);
  }, [debouncedQuery]);

  return (
    <header className="sticky top-0 z-40 border-b border-slate-800/80 bg-slate-950/95 backdrop-blur-xl">
      <div className="container flex h-16 items-center justify-between gap-3 md:h-[72px]">
        <div className="flex items-center gap-2">
          <button
            onClick={toggleSidebar}
            className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border transition-colors ${
              activeCategory !== null
                ? "border-orange-500/50 bg-orange-500/15 text-orange-400"
                : "border-slate-800/80 bg-slate-900/80 text-slate-400 hover:bg-slate-800 hover:text-slate-100"
            }`}
            aria-label="Abrir departamentos"
          >
            <LayoutGrid size={16} />
          </button>

          <div className="flex items-center gap-2">
            <div className="flex h-9 w-9 items-center justify-center rounded-2xl bg-gradient-to-br from-orange-500 to-amber-400 text-slate-950 shadow-soft">
              <span className="text-base font-black tracking-tight">C</span>
            </div>
            <div className="leading-tight">
              <div className="text-sm font-bold tracking-tight md:text-base">
                Celma Construções
              </div>
              <div className="text-[10px] uppercase tracking-[0.18em] text-slate-400">
                Materiais para obra
              </div>
            </div>
          </div>
        </div>

        <div className="relative hidden max-w-lg flex-1 md:block">
          <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500" />
          <Input
            placeholder="Buscar produto, marca ou categoria…"
            className="pl-9 text-xs md:text-sm"
            value={query}
            onChange={(e) => handleChange(e.target.value)}
            onFocus={() => query && setShowSearchResults(true)}
            onBlur={() => setTimeout(() => setShowSearchResults(false), 150)}
          />
          {showSearchResults && searchResults.length > 0 && (
            <div className="absolute left-0 right-0 top-11 z-50 overflow-hidden rounded-2xl border border-slate-800/90 bg-slate-950/98 shadow-soft">
              <div className="px-3 py-2 text-[10px] font-semibold uppercase tracking-[0.18em] text-slate-500">
                Resultados
              </div>
              <ul className="divide-y divide-slate-800/60 pb-1">
                {searchResults.map((product) => (
                  <li
                    key={product.id}
                    className="flex cursor-pointer items-center justify-between gap-3 px-3 py-2.5 transition-colors hover:bg-slate-900/90"
                  >
                    <div className="min-w-0">
                      <p className="line-clamp-1 text-xs font-medium text-slate-100">
                        {product.name}
                      </p>
                      <p className="text-[10px] text-slate-500">
                        {product.brand} · {product.unit}
                      </p>
                    </div>
                    <span className="whitespace-nowrap text-xs font-semibold text-orange-300">
                      {formatCurrencyBRL(product.price)}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        <div className="flex items-center gap-2">
          <button
            className="flex h-9 w-9 items-center justify-center rounded-full border border-slate-800/80 bg-slate-900/80 text-slate-400 hover:bg-slate-800 hover:text-slate-100 md:hidden"
            onClick={() => setMobileSearchOpen((v) => !v)}
            aria-label="Buscar"
          >
            {mobileSearchOpen ? <X size={16} /> : <Search size={16} />}
          </button>

          <div className="hidden items-center gap-1.5 text-[11px] md:flex">
            <Phone size={12} className="text-slate-500" />
            <div className="leading-tight text-right">
              <span className="block text-[10px] uppercase tracking-[0.18em] text-slate-500">
                Atendimento
              </span>
              <span className="block font-medium text-slate-200">
                Fale com um consultor
              </span>
            </div>
          </div>

          <Button
            variant="ghost"
            size="icon"
            className="relative h-9 w-9 rounded-full border border-slate-800/80 bg-slate-900/80 text-slate-100 hover:bg-slate-800/80"
            onClick={openCart}
            aria-label="Abrir carrinho"
          >
            <ShoppingCart size={17} />
            {totalItems > 0 && (
              <span className="absolute -right-1 -top-1 inline-flex min-h-[18px] min-w-[18px] items-center justify-center rounded-full bg-orange-500 px-1 text-[10px] font-bold text-slate-950 shadow-md">
                {totalItems}
              </span>
            )}
          </Button>
        </div>
      </div>

      {mobileSearchOpen && (
        <div className="border-t border-slate-800/80 bg-slate-950/98 px-4 py-3 md:hidden">
          <div className="relative">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500" />
            <Input
              placeholder="Buscar produto ou marca…"
              className="pl-9 text-xs"
              value={query}
              autoFocus
              onChange={(e) => handleChange(e.target.value)}
            />
          </div>
          {showSearchResults && searchResults.length > 0 && (
            <ul className="mt-2 divide-y divide-slate-800/60 rounded-xl border border-slate-800/80 bg-slate-900/80">
              {searchResults.map((product) => (
                <li
                  key={product.id}
                  className="flex items-center justify-between gap-3 px-3 py-2.5"
                >
                  <p className="line-clamp-1 text-xs text-slate-100">
                    {product.name}
                  </p>
                  <span className="whitespace-nowrap text-xs font-semibold text-orange-300">
                    {formatCurrencyBRL(product.price)}
                  </span>
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
    </header>
  );
}
