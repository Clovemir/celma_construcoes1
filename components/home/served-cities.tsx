import type { City } from "@/constants";
import { MapPin, Truck } from "lucide-react";

interface ServedCitiesProps {
  cities: City[];
}

export function ServedCities({ cities }: ServedCitiesProps) {
  return (
    <section className="glass-panel flex flex-col gap-4 rounded-2xl p-5 md:p-6">
      <div>
        <div className="flex items-center gap-1.5">
          <Truck size={13} className="text-emerald-400" />
          <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-slate-400">
            Cidades atendidas
          </p>
        </div>
        <p className="mt-0.5 text-sm font-medium text-slate-100">
          Região Metropolitana de SP
        </p>
        <p className="mt-1 text-xs text-slate-400">
          Rotas inteligentes de entrega com rastreamento em tempo real.
        </p>
      </div>

      <div className="flex flex-wrap gap-1.5">
        {cities.map((city) => (
          <span
            key={city.id}
            className="inline-flex items-center gap-1 rounded-full border border-slate-800/80 bg-slate-900/60 px-2.5 py-1 text-[11px] text-slate-300"
          >
            <MapPin size={9} className="text-slate-500" />
            {city.name}
          </span>
        ))}
      </div>

      <p className="text-[10px] text-slate-600">
        Expansão contínua conforme demanda.{" "}
        <span className="text-slate-500">
          {/* TODO: Integrar com API de rotas/logística */}
          Novas cidades em breve.
        </span>
      </p>
    </section>
  );
}
