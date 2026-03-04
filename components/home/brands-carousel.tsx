import type { Brand } from "@/constants";

interface BrandsCarouselProps {
  brands: Brand[];
}

export function BrandsCarousel({ brands }: BrandsCarouselProps) {
  return (
    <section className="glass-panel flex flex-col gap-3 rounded-2xl p-5 md:p-6">
      <div className="flex items-center justify-between gap-4">
        <div>
          <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-slate-500">
            Marcas recomendadas
          </p>
          <p className="text-xs text-slate-300">
            Seleção em parceria com grandes fabricantes.
          </p>
        </div>
        <p className="text-[10px] text-slate-500">
          Curadoria técnica para garantir performance na obra.
        </p>
      </div>
      <div className="relative overflow-hidden">
        <div className="flex gap-4 opacity-80 grayscale hover:opacity-100 hover:grayscale-0 animate-[marquee_30s_linear_infinite]">
          {brands.concat(brands).map((brand, index) => (
            <div
              key={`${brand.id}-${index}`}
              className="flex h-10 min-w-[90px] items-center justify-center rounded-xl border border-slate-800/80 bg-slate-900/70 px-3 text-[11px] font-semibold tracking-[0.18em]"
            >
              {brand.name}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

