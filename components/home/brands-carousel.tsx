import type { Brand } from "@/constants";
import { Star } from "lucide-react";

interface BrandsCarouselProps {
  brands: Brand[];
}

export function BrandsCarousel({ brands }: BrandsCarouselProps) {
  return (
    <section className="glass-panel flex flex-col gap-4 overflow-hidden rounded-2xl p-5 md:p-6">
      <div className="flex items-start justify-between gap-4">
        <div>
          <div className="flex items-center gap-1.5">
            <Star size={13} className="text-orange-400" fill="currentColor" />
            <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-slate-400">
              Marcas parceiras
            </p>
          </div>
          <p className="mt-0.5 text-sm font-medium text-slate-100">
            Curadoria técnica para sua obra
          </p>
          <p className="mt-1 text-xs text-slate-400">
            Selecionamos apenas fabricantes com certificação e histórico comprovado.
          </p>
        </div>
      </div>

      <div className="relative overflow-hidden">
        <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-8 bg-gradient-to-r from-slate-900/80 to-transparent" />
        <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-8 bg-gradient-to-l from-slate-900/80 to-transparent" />
        <div className="flex gap-3 animate-[marquee_25s_linear_infinite]">
          {brands.concat(brands).concat(brands).map((brand, index) => (
            <div
              key={`${brand.id}-${index}`}
              className="flex h-10 min-w-[100px] shrink-0 items-center justify-center rounded-xl border border-slate-800/80 bg-slate-900/70 px-4 text-[11px] font-semibold uppercase tracking-[0.15em] text-slate-300 opacity-70 transition-opacity hover:opacity-100"
            >
              {brand.name}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
