import type { City } from "@/constants";
import { Badge } from "@/components/ui/badge";

interface ServedCitiesProps {
  cities: City[];
}

export function ServedCities({ cities }: ServedCitiesProps) {
  return (
    <section className="glass-panel flex flex-col justify-between gap-3 rounded-2xl p-5 md:p-6">
      <div>
        <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-slate-500">
          Cidades atendidas
        </p>
        <p className="mt-1 text-xs text-slate-300">
          Operação focada em São Paulo e região metropolitana, com rotas
          inteligentes de entrega.
        </p>
      </div>
      <div className="flex flex-wrap gap-1.5 pt-1">
        {cities.map((city) => (
          <Badge
            key={city.id}
            variant="outline"
            className="text-[11px] text-slate-200"
          >
            {city.name} - {city.state}
          </Badge>
        ))}
      </div>
      <p className="mt-2 text-[10px] text-slate-500">
        Expansão para novas regiões pode ser planejada com base em demanda e
        integrações logísticas. {/* TODO: Integrar com API/Database */}
      </p>
    </section>
  );
}

