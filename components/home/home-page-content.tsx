"use client";

import { useMemo } from "react";
import type { Product, Brand, City } from "@/constants";
import { OffersSection } from "@/components/home/offers-section";
import { ProductGrid } from "@/components/home/product-grid";
import { BrandsCarousel } from "@/components/home/brands-carousel";
import { ServedCities } from "@/components/home/served-cities";
import { MobileCategoryBar } from "@/components/home/mobile-category-bar";
import { CATEGORIES } from "@/constants";
import { useCategoryStore } from "@/store/category-store";
import { SlidersHorizontal, X } from "lucide-react";

interface HomePageContentProps {
  products: Product[];
  brands: Brand[];
  cities: City[];
}

export function HomePageContent({ products, brands, cities }: HomePageContentProps) {
  const { activeCategory, setActiveCategory } = useCategoryStore();

  const offers = useMemo(() => products.filter((p) => p.highlight), [products]);

  const filteredProducts = useMemo(() => {
    if (activeCategory === null) return products;
    return products.filter((p) => p.categoryId === activeCategory);
  }, [products, activeCategory]);

  const activeCategoryName = activeCategory
    ? CATEGORIES.find((c) => c.id === activeCategory)?.name
    : null;

  return (
    <div className="container py-6 md:py-8">
      <div className="space-y-8">
        <section className="grid gap-5 lg:grid-cols-[minmax(0,2fr)_minmax(0,1.2fr)]">
          <OffersSection products={offers} />

          <div className="glass-panel relative overflow-hidden rounded-2xl p-5 md:p-6">
            <div className="mb-3 inline-flex items-center rounded-full border border-emerald-400/40 bg-emerald-500/10 px-3 py-1 text-xs font-medium text-emerald-300">
              <span className="mr-1.5 h-1.5 w-1.5 rounded-full bg-emerald-400" />
              Entrega rápida região metropolitana
            </div>
            <h2 className="text-xl font-semibold tracking-tight md:text-2xl">
              Tudo para sua obra em um só lugar.
            </h2>
            <p className="mt-2 text-xs text-slate-300 md:text-sm">
              Portfólio completo de materiais, acabamento premium e linha
              profissional para grandes projetos.
            </p>
            <div className="mt-5 grid gap-3 text-xs text-slate-300 sm:grid-cols-2">
              <InfoCard
                label="Atendimento especializado"
                text="Consultoria técnica para obras residenciais e corporativas."
              />
              <InfoCard
                label="Portfólio premium"
                text="Marcas referência em qualidade e performance."
              />
              <InfoCard
                label="Entrega programada"
                text="Logística inteligente para sua obra não parar."
              />
              <InfoCard
                label="Pagamento facilitado"
                text="Pix, boleto e cartão em até 10x sem juros."
              />
            </div>
          </div>
        </section>

        <section className="space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-lg font-semibold tracking-tight md:text-xl">
                  {activeCategoryName ?? "Catálogo em destaque"}
                </h2>
                {activeCategoryName && (
                  <button
                    onClick={() => setActiveCategory(null)}
                    className="inline-flex items-center gap-1 rounded-full bg-slate-800/80 px-2 py-0.5 text-[10px] text-slate-400 hover:bg-slate-700 hover:text-slate-200"
                  >
                    <X size={10} />
                    limpar
                  </button>
                )}
              </div>
              <p className="text-xs text-slate-400">
                {filteredProducts.length}{" "}
                {filteredProducts.length === 1 ? "produto" : "produtos"}{" "}
                disponíveis
              </p>
            </div>
            <div className="flex items-center gap-1.5 text-[11px] text-slate-500">
              <SlidersHorizontal size={13} />
              <span>Ordenação e filtros em breve</span>
            </div>
          </div>

          <MobileCategoryBar
            active={activeCategory}
            onSelect={setActiveCategory}
          />

          <ProductGrid products={filteredProducts} />
        </section>

        <section className="grid gap-5 md:grid-cols-[minmax(0,2fr)_minmax(0,1.3fr)]">
          <BrandsCarousel brands={brands} />
          <ServedCities cities={cities} />
        </section>
      </div>
    </div>
  );
}

function InfoCard({ label, text }: { label: string; text: string }) {
  return (
    <div className="rounded-xl border border-slate-800/80 bg-slate-900/60 px-4 py-3">
      <p className="text-[10px] uppercase tracking-wide text-slate-500">
        {label}
      </p>
      <p className="mt-1 text-xs font-medium text-slate-50">{text}</p>
    </div>
  );
}
