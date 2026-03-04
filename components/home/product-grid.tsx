"use client";

import Image from "next/image";
import type { Product } from "@/constants";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { formatCurrencyBRL } from "@/lib/utils";
import { useCart } from "@/store/cart-store";

interface ProductGridProps {
  products: Product[];
}

export function ProductGrid({ products }: ProductGridProps) {
  const { addItem } = useCart();

  return (
    <div className="grid gap-4 md:grid-cols-3 lg:grid-cols-4">
      {products.map((product) => (
        <article
          key={product.id}
          className="group flex flex-col overflow-hidden rounded-2xl border border-slate-800/80 bg-slate-950/80 shadow-soft transition-transform hover:-translate-y-0.5 hover:border-slate-500/70"
        >
          <div className="relative h-40 w-full overflow-hidden bg-slate-900 md:h-44">
            <Image
              src={product.imageUrl}
              alt={product.name}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-[1.04]"
            />
            {product.discountTag && (
              <Badge
                variant="accent"
                className="absolute left-3 top-3 text-[10px]"
              >
                {product.discountTag}
              </Badge>
            )}
          </div>
          <div className="flex flex-1 flex-col gap-2 px-3.5 py-3">
            <p className="text-[11px] uppercase tracking-[0.18em] text-slate-500">
              {product.brand}
            </p>
            <h3 className="line-clamp-2 text-sm font-medium text-slate-100">
              {product.name}
            </h3>
            <div className="mt-1 space-y-0.5">
              <div className="flex items-baseline gap-1.5">
                <span className="text-base font-semibold text-slate-50">
                  {formatCurrencyBRL(product.price)}
                </span>
                {product.originalPrice && (
                  <span className="text-[11px] text-slate-500 line-through">
                    {formatCurrencyBRL(product.originalPrice)}
                  </span>
                )}
              </div>
              <p className="text-[11px] text-slate-400">
                Até 6x sem juros • Entrega rápida
              </p>
            </div>
          </div>
          <div className="px-3.5 pb-3.5 pt-1.5">
            <Button
              className="w-full rounded-full text-xs"
              onClick={() => addItem(product)}
            >
              Adicionar ao carrinho
            </Button>
          </div>
        </article>
      ))}
    </div>
  );
}

