"use client";

import { Truck, Award, Headphones, Lock } from "lucide-react";

export function BenefitsSection() {
  const benefits = [
    {
      icon: Truck,
      title: "Entrega Rápida",
      description: "Entrega em até 24h para região metropolitana.",
    },
    {
      icon: Award,
      title: "Produtos Premium",
      description: "Seleção curada de marcas referenciais em qualidade.",
    },
    {
      icon: Headphones,
      title: "Suporte Especializado",
      description: "Consultoria técnica de profissionais da construção.",
    },
    {
      icon: Lock,
      title: "Compra Segura",
      description: "Ambiente 100% seguro com criptografia SSL.",
    },
  ];

  return (
    <section className="bg-gradient-to-r from-slate-900/50 via-slate-950 to-slate-900/50 border border-slate-800/40 rounded-3xl">
      <div className="container py-8 md:py-12">
        <div className="grid gap-6 md:gap-8 md:grid-cols-2 lg:grid-cols-4">
          {benefits.map((benefit) => {
            const Icon = benefit.icon;
            return (
              <div
                key={benefit.title}
                className="flex flex-col items-start gap-3 px-4 py-6 rounded-2xl hover:bg-slate-900/40 transition-colors"
              >
                <div className="p-2.5 rounded-full bg-gradient-to-br from-orange-500/20 to-amber-500/20 border border-orange-500/30">
                  <Icon className="h-5 w-5 text-orange-400" />
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-slate-100">
                    {benefit.title}
                  </h3>
                  <p className="mt-1 text-xs text-slate-400">
                    {benefit.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
