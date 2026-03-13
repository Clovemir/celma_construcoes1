"use client";

import type { Product } from "@/constants";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { formatCurrencyBRL } from "@/lib/utils";
import { useCart } from "@/store/cart-store";
import { ProductImagePlaceholder } from "@/components/home/product-image";
import { ShoppingCart, Truck, Clock } from "lucide-react";

interface OffersSectionProps {
  products: Product[];
}

export function OffersSection({ products }: OffersSectionProps) {
  const { addItem, items, increment, decrement } = useCart();

  if (!products.length) return null;

  const [featured, ...rest] = products;
  const cartItem = items.find((i) => i.product.id === featured.id);
  const qty = cartItem?.quantity ?? 0;

  return (
    <section className="glass-panel flex flex-col overflow-hidden rounded-2xl">
      <div className="relative flex-1 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-tr from-orange-500/20 via-transparent to-sky-500/10" />

        <div className="relative grid h-full gap-4 p-5 lg:grid-cols-[minmax(0,1.3fr)_minmax(0,1fr)] lg:p-7">
          <div className="flex flex-col justify-between gap-4">
            <div>
              <div className="mb-3 flex flex-wrap gap-1.5">
                <Badge variant="accent" className="text-[11px]">
                  Oferta exclusiva para hoje
                </Badge>
                {featured.discountTag && (
                  <Badge
                    variant="outline"
                    className="border-orange-500/40 bg-orange-500/10 text-[11px] text-orange-300"
                  >
                    {featured.discountTag}
                  </Badge>
                )}
              </div>
              <h1 className="text-xl font-semibold tracking-tight text-slate-50 md:text-2xl">
                {featured.name}
              </h1>
              <p className="mt-2 max-w-sm text-xs text-slate-300 md:text-sm">
                Linha profissional com desempenho e durabilidade para obras que
                exigem alto rendimento.
              </p>
              <div className="mt-3 flex flex-wrap gap-3 text-[11px] text-slate-400">
                <span className="flex items-center gap-1">
                  <Truck size={11} />
                  Entrega rápida
                </span>
                <span className="flex items-center gap-1">
                  <Clock size={11} />
                  Estoque imediato
                </span>
              </div>
            </div>

            <div className="flex flex-col gap-3">
              <div>
                <div className="flex flex-wrap items-baseline gap-x-2 gap-y-0.5">
                  <span className="text-2xl font-semibold text-slate-50 md:text-3xl">
                    {formatCurrencyBRL(featured.price)}
                  </span>
                  <span className="whitespace-nowrap text-xs text-slate-500">
                    / {featured.unit}
                  </span>
                  {featured.originalPrice && (
                    <span className="whitespace-nowrap text-xs text-slate-400 line-through">
                      {formatCurrencyBRL(featured.originalPrice)}
                    </span>
                  )}
                </div>
                <p className="mt-0.5 text-[11px] text-slate-400">
                  Em até 10x sem juros
                </p>
              </div>

              {qty === 0 ? (
                <Button
                  size="lg"
                  className="w-fit rounded-full text-xs md:text-sm"
                  onClick={() => addItem(featured)}
                >
                  <ShoppingCart size={15} className="mr-2" />
                  Adicionar ao carrinho
                </Button>
              ) : (
                <div className="flex w-fit items-center gap-3">
                  <div className="inline-flex items-center rounded-full border border-slate-700/80 bg-slate-900/80 px-3 py-2">
                    <button
                      onClick={() => decrement(featured.id)}
                      className="flex h-6 w-6 items-center justify-center rounded-full text-slate-300 hover:bg-slate-700 text-sm font-bold"
                    >
                      −
                    </button>
                    <span className="w-8 text-center text-sm font-semibold text-slate-50">
                      {qty}
                    </span>
                    <button
                      onClick={() => increment(featured.id)}
                      className="flex h-6 w-6 items-center justify-center rounded-full text-slate-300 hover:bg-slate-700 text-sm font-bold"
                    >
                      +
                    </button>
                  </div>
                  <span className="text-sm font-semibold text-orange-300">
                    {formatCurrencyBRL(featured.price * qty)}
                  </span>
                </div>
              )}
            </div>
          </div>

          <div className="relative h-44 w-full overflow-hidden rounded-2xl md:h-auto">
            <ProductImagePlaceholder categoryId={featured.categoryId} size="lg" />
          </div>
        </div>
      </div>

      {rest.length > 0 && (
        <div className="border-t border-slate-800/80 bg-slate-950/70 px-4 py-3 md:px-5">
          <div className="flex flex-wrap items-center justify-between gap-3 text-[11px]">
            <span className="font-medium uppercase tracking-[0.18em] text-slate-500">
              Outras ofertas
            </span>
            <div className="flex flex-wrap gap-1.5">
              {rest.map((product) => (
                <button
                  key={product.id}
                  className="inline-flex items-center gap-1.5 rounded-full border border-slate-800/80 bg-slate-900/70 px-2.5 py-1 text-[11px] text-slate-200 hover:border-orange-500/30 hover:bg-slate-800/80 hover:text-orange-300 transition-colors"
                  onClick={() => addItem(product)}
                >
                  <span className="line-clamp-1 max-w-[130px]">
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
