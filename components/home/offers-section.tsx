"use client";

import Image from "next/image";
import type { Product } from "@/constants";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { formatCurrencyBRL } from "@/lib/utils";
import { useCart } from "@/store/cart-store";

interface OffersSectionProps {
  products: Product[];
}

export function OffersSection({ products }: OffersSectionProps) {
  const { addItem } = useCart();

  if (!products.length) return null;

  const [featured, ...rest] = products;

  return (
    <section className="glass-panel flex flex-col overflow-hidden rounded-2xl">
      <div className="relative flex-1 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-tr from-orange-500/25 via-transparent to-sky-500/15" />
        <div className="relative grid h-full gap-6 p-6 md:grid-cols-[minmax(0,1.3fr)_minmax(0,1fr)] md:p-7">
          <div className="flex flex-col justify-between gap-4">
            <div>
              <Badge variant="accent" className="mb-3 text-[11px]">
                Oferta exclusiva para hoje
              </Badge>
              <h1 className="text-xl font-semibold tracking-tight text-slate-50 md:text-2xl">
                {featured.name}
              </h1>
              <p className="mt-2 max-w-md text-xs text-slate-300 md:text-sm">
                Linha profissional com desempenho e durabilidade para obras que
                exigem alto rendimento.
              </p>
            </div>
            <div className="flex items-end justify-between gap-4">
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
                <p className="mt-1 text-[11px] text-slate-400">
                  Em até 10x sem juros • Estoque imediato
                </p>
              </div>
              <Button
                size="lg"
                className="rounded-full text-xs md:text-sm"
                onClick={() => addItem(featured)}
              >
                Adicionar ao carrinho
              </Button>
            </div>
          </div>
          <div className="relative h-40 w-full md:h-auto">
            <Image
              src={featured.imageUrl}
              alt={featured.name}
              fill
              className="rounded-2xl object-cover"
            />
          </div>
        </div>
      </div>
      {rest.length > 0 && (
        <div className="border-t border-slate-800/80 bg-slate-950/70 px-4 py-3 md:px-5">
          <div className="flex items-center justify-between gap-4 text-[11px] text-slate-300">
            <span className="font-medium uppercase tracking-[0.18em] text-slate-500">
              Outras ofertas
            </span>
            <div className="flex flex-wrap gap-1.5">
              {rest.map((product) => (
                <button
                  key={product.id}
                  className="inline-flex items-center gap-1 rounded-full border border-slate-800/80 bg-slate-900/70 px-2.5 py-1 text-[11px] text-slate-200 hover:bg-slate-800/80"
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

