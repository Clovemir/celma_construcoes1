"use client";

import { Button } from "@/components/ui/button";
import { useUiStore } from "@/store/ui-store";
import { Zap } from "lucide-react";

export function PromotionBanner() {
  return (
    <section className="container">
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-orange-600/20 via-orange-500/10 to-amber-600/20 border border-orange-500/20 p-6 md:p-8">
        {/* Animated background elements */}
        <div className="absolute -top-20 -right-20 h-40 w-40 bg-orange-500/10 rounded-full blur-3xl" />
        <div className="absolute -bottom-20 -left-20 h-40 w-40 bg-amber-500/10 rounded-full blur-3xl" />

        <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-3">
              <Zap className="h-5 w-5 text-orange-400 animate-pulse" />
              <span className="text-xs font-semibold uppercase tracking-[0.2em] text-orange-300">
                Oferta Relâmpago
              </span>
            </div>
            <h2 className="text-2xl md:text-3xl font-bold text-slate-50 mb-2">
              Aproveite descontos especiais em grandes quantidades
            </h2>
            <p className="text-sm text-slate-300 max-w-md">
              Cotações personalizadas para construtoras e incorporadoras. 
              Fale com um especialista e receba propostas exclusivas para sua obra.
            </p>
          </div>
          <Button
            className="rounded-full md:text-base px-6 md:px-8 py-2 md:py-3 hover:shadow-lg hover:shadow-orange-500/30 transition-all whitespace-nowrap"
            onClick={() => useUiStore.getState().togglePanel("chat")}
          >
            Falar com Consultor
          </Button>
        </div>
      </div>
    </section>
  );
}
