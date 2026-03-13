import type { City } from "@/constants";
import { Badge } from "@/components/ui/badge";
import { MapPin } from "lucide-react";

interface ServedCitiesProps {
  cities: City[];
}

export function ServedCities({ cities }: ServedCitiesProps) {
  return (
    <section className="glass-panel flex flex-col justify-between gap-3 rounded-2xl p-5 md:p-6">
      <div>
        <div className="flex items-center gap-2 mb-2">
          <MapPin className="h-4 w-4 text-emerald-400" />
          <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-slate-500">
            Cidades atendidas
          </p>
        </div>
        <p className="mt-1 text-xs text-slate-300">
          Operação focada em São Paulo e região metropolitana, com rotas
          inteligentes de entrega.
        </p>
      </div>
      <div className="flex flex-wrap gap-2 pt-1">
        {cities.map((city) => (
          <Badge
            key={city.id}
            variant="outline"
            className="text-[11px] text-slate-200 hover:border-emerald-500/50 hover:bg-slate-900/50 transition-all cursor-pointer"
          >
            {city.name} - {city.state}
          </Badge>
        ))}
      </div>
      <div className="mt-2 p-3 rounded-xl bg-emerald-500/5 border border-emerald-500/20">
        <p className="text-[10px] text-emerald-200">
          ✓ Expansão para novas regiões pode ser planejada com base em demanda e integrações logísticas.
        </p>
      </div>
    </section>
  );
}

