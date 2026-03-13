import type { Brand } from "@/constants";
import { Sparkles } from "lucide-react";

interface BrandsCarouselProps {
  brands: Brand[];
}

export function BrandsCarousel({ brands }: BrandsCarouselProps) {
  return (
    <section className="glass-panel flex flex-col gap-3 rounded-2xl p-5 md:p-6">
      <div className="flex items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <Sparkles className="h-4 w-4 text-orange-400" />
            <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-slate-500">
              Marcas recomendadas
            </p>
          </div>
          <p className="text-xs text-slate-300">
            Seleção em parceria com grandes fabricantes.
          </p>
        </div>
        <p className="text-[10px] text-slate-500 text-right">
          Curadoria técnica para garantir performance na obra.
        </p>
      </div>
      <div className="relative overflow-hidden group">
        <div className="flex gap-4 opacity-80 grayscale hover:opacity-100 hover:grayscale-0 animate-[marquee_30s_linear_infinite] group-hover:animate-[marquee_40s_linear_infinite] transition-all">
          {brands.concat(brands).map((brand, index) => (
            <div
              key={`${brand.id}-${index}`}
              className="flex h-10 min-w-[90px] items-center justify-center rounded-xl border border-slate-800/80 bg-slate-900/70 px-3 text-[11px] font-semibold tracking-[0.18em] hover:border-orange-500/50 hover:bg-slate-900 transition-all cursor-pointer"
            >
              {brand.name}
            </div>
          ))}
        </div>
        <div className="absolute inset-0 pointer-events-none bg-gradient-to-r from-slate-950 via-transparent to-slate-950" />
      </div>
    </section>
  );
}

