import { PRODUCTS, BRANDS, CITIES } from "@/constants";
import { OffersSection } from "@/components/home/offers-section";
import { ProductGrid } from "@/components/home/product-grid";
import { BrandsCarousel } from "@/components/home/brands-carousel";
import { ServedCities } from "@/components/home/served-cities";

export default function HomePage() {
  const offers = PRODUCTS.filter((p) => p.highlight);

  return (
    <div className="container space-y-10 py-6 md:py-10">
      <section className="grid gap-6 md:grid-cols-[minmax(0,2fr)_minmax(0,1.2fr)] items-stretch">
        <OffersSection products={offers} />
        <div className="glass-panel relative overflow-hidden rounded-2xl p-6">
          <div className="mb-2 inline-flex items-center rounded-full border border-emerald-400/40 bg-emerald-500/10 px-3 py-1 text-xs font-medium text-emerald-300">
            <span className="mr-1.5 h-1.5 w-1.5 rounded-full bg-emerald-400" />
            Entrega rápida região metropolitana
          </div>
          <h2 className="text-xl font-semibold tracking-tight md:text-2xl">
            Tudo para sua obra em um só lugar.
          </h2>
          <p className="mt-2 text-sm text-slate-300">
            Portfólio completo de materiais, acabamento premium e linha
            profissional para grandes projetos.
          </p>
          <div className="mt-6 grid gap-4 text-xs text-slate-300 md:grid-cols-2">
            <div className="rounded-xl border border-slate-800/80 bg-slate-900/60 px-4 py-3">
              <p className="text-[0.7rem] uppercase tracking-wide text-slate-400">
                Atendimento especializado
              </p>
              <p className="mt-1 font-medium text-slate-50">
                Consultoria técnica para obras residenciais e corporativas.
              </p>
            </div>
            <div className="rounded-xl border border-slate-800/80 bg-slate-900/60 px-4 py-3">
              <p className="text-[0.7rem] uppercase tracking-wide text-slate-400">
                Portfólio premium
              </p>
              <p className="mt-1 font-medium text-slate-50">
                Marcas referência em qualidade e performance.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <div className="flex items-center justify-between gap-4">
          <div>
            <h2 className="text-lg font-semibold tracking-tight md:text-xl">
              Catálogo em destaque
            </h2>
            <p className="text-xs text-slate-400 md:text-sm">
              Selecione os itens da sua lista de materiais e finalize o pedido
              em poucos cliques.
            </p>
          </div>
        </div>
        <ProductGrid products={PRODUCTS} />
      </section>

      <section className="grid gap-6 md:grid-cols-[minmax(0,2fr)_minmax(0,1.3fr)]">
        <BrandsCarousel brands={BRANDS} />
        <ServedCities cities={CITIES} />
      </section>
    </div>
  );
}

