"use client";

import Image from "next/image";
import type { Product } from "@/constants";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { formatCurrencyBRL } from "@/lib/utils";
import { useCart } from "@/store/cart-store";
import { TrendingUp } from "lucide-react";

interface OffersSectionProps {
  products: Product[];
}

export function OffersSection({ products }: OffersSectionProps) {
  const { addItem } = useCart();

  if (!products.length) return null;

  const [featured, ...rest] = products;

  return (
    <section className="glass-panel flex flex-col overflow-hidden rounded-2xl group">
      <div className="relative flex-1 overflow-hidden md:flex md:items-center">
        <div className="absolute inset-0 bg-gradient-to-tr from-orange-500/25 via-transparent to-sky-500/15" />
        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 bg-gradient-to-br from-orange-500/5 via-transparent to-transparent" />

        <div className="z-10 flex flex-col justify-between gap-4 p-6 md:p-7 md:flex-1">
          <div>
            <Badge variant="accent" className="mb-3 text-[11px] inline-flex items-center gap-1">
              <TrendingUp className="h-3 w-3" />
              Oferta exclusiva para hoje
            </Badge>
            <h1 className="text-xl font-semibold tracking-tight text-slate-50 md:text-2xl group-hover:text-orange-300 transition-colors">
              {featured.name}
            </h1>
            <p className="mt-2 max-w-md text-xs text-slate-300 md:text-sm">
              Linha profissional com desempenho e durabilidade para obras que
              exigem alto rendimento.
            </p>
          </div>

          <div className="flex items-end justify-between gap-4 flex-wrap">
            <div>
              <div className="flex items-baseline gap-2">
                <span className="text-2xl font-semibold text-slate-50 md:text-3xl">
                  {formatCurrencyBRL(featured.price)}
                </span>
                {featured.originalPrice && (
                  <span className="text-xs text-slate-400 line-through">
                    {formatCurrencyBRL(featured.originalPrice)}
                  </span>
                )}
              </div>
              <div className="mt-1 text-[11px] text-slate-400 space-y-1">
                <p>Em até 10x sem juros • Estoque imediato</p>
                {featured.originalPrice && (
                  <p className="text-emerald-400">
                    Economize {formatCurrencyBRL(featured.originalPrice - featured.price)}
                  </p>
                )}
              </div>
            </div>
            <Button
              size="lg"
              className="rounded-full text-xs md:text-sm hover:shadow-lg hover:shadow-orange-500/20 transition-all"
              onClick={() => addItem(featured)}
            >
              Adicionar ao carrinho
            </Button>
          </div>
        </div>

        <div className="relative h-40 w-full md:h-auto md:flex-1 md:aspect-video overflow-hidden">
          <Image
            src={featured.imageUrl}
            alt={featured.name}
            fill
            className="rounded-2xl object-cover object-center group-hover:scale-105 transition-transform duration-700"
            priority={true}
          />
        </div>
      </div>

      {rest.length > 0 && (
        <div className="border-t border-slate-800/80 bg-slate-950/70 px-4 py-3 md:px-5 hover:bg-slate-950 transition-colors">
          <div className="flex items-center justify-between gap-4 text-[11px] text-slate-300">
            <span className="font-medium uppercase tracking-[0.18em] text-slate-500">
              Outras ofertas
            </span>
            <div className="flex flex-wrap gap-1.5">
              {rest.map((product) => (
                <button
                  key={product.id}
                  className="inline-flex items-center gap-1 rounded-full border border-slate-800/80 bg-slate-900/70 px-2.5 py-1 text-[11px] text-slate-200 hover:bg-slate-800/80 hover:border-orange-500/50 hover:shadow-md hover:shadow-orange-500/20 transition-all"
                  onClick={() => addItem(product)}
                >
                  <span className="line-clamp-1 max-w-[120px]">
                    {product.name}
                  </span>
                  <span className="font-semibold text-orange-300">
                    {formatCurrencyBRL(product.price)}
                  </span>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

