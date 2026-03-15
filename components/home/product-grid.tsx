"use client";

import Link from "next/link";
import type { Product } from "@/constants";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { formatCurrencyBRL } from "@/lib/utils";
import { useCart } from "@/store/cart-store";
import { ProductImagePlaceholder } from "@/components/home/product-image";
import { Minus, Plus, ShoppingCart, PackageX } from "lucide-react";

interface ProductGridProps {
  products: Product[];
}

export function ProductGrid({ products }: ProductGridProps) {
  const { addItem, items, increment, decrement } = useCart();

  if (products.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center gap-3 rounded-2xl border border-dashed border-slate-800/80 bg-slate-950/40 py-16 text-center">
        <PackageX size={32} className="text-slate-600" strokeWidth={1.5} />
        <div>
          <p className="text-sm font-medium text-slate-300">
            Nenhum produto encontrado
          </p>
          <p className="mt-0.5 text-xs text-slate-500">
            Tente outro departamento ou limpe o filtro.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {products.map((product) => {
        const cartItem = items.find((i) => i.product.id === product.id);
        const qty = cartItem?.quantity ?? 0;
        const isLow = product.stock === "low";
        const isOut = product.stock === "out";

        return (
          <article
            key={product.id}
            className={`group flex flex-col overflow-hidden rounded-2xl border bg-slate-950/80 shadow-soft transition-all hover:-translate-y-0.5 hover:shadow-md ${
              isOut
                ? "border-slate-800/50 opacity-60"
                : "border-slate-800/80 hover:border-slate-600/70"
            }`}
          >
            <Link href={`/products/${product.id}`} className="relative block h-40 w-full overflow-hidden bg-slate-900">
              <ProductImagePlaceholder
                categoryId={product.categoryId}
                imageUrl={product.imageUrl}
                alt={product.name}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 via-transparent to-transparent" />

              <div className="absolute left-2.5 top-2.5 flex flex-wrap gap-1.5">
                {product.discountTag && !isOut && (
                  <Badge variant="accent" className="text-[10px] shadow-md">
                    {product.discountTag}
                  </Badge>
                )}
                {isLow && !isOut && (
                  <Badge
                    variant="outline"
                    className="border-amber-500/50 bg-amber-500/10 text-[10px] text-amber-300"
                  >
                    Últimas unidades
                  </Badge>
                )}
                {isOut && (
                  <Badge
                    variant="outline"
                    className="border-red-500/50 bg-red-500/10 text-[10px] text-red-300"
                  >
                    Sem estoque
                  </Badge>
                )}
              </div>

              {qty > 0 && (
                <div className="absolute right-2.5 top-2.5 flex h-6 min-w-[24px] items-center justify-center rounded-full bg-orange-500 px-1.5 text-[10px] font-semibold text-slate-950 shadow-md">
                  {qty}
                </div>
              )}
            </Link>

            <Link href={`/products/${product.id}`} className="flex flex-1 flex-col gap-1.5 px-3.5 py-3">
              <p className="text-[10px] font-medium uppercase tracking-[0.18em] text-slate-500">
                {product.brand}
              </p>
              <h3 className="line-clamp-2 text-sm font-medium leading-snug text-slate-100 group-hover:text-orange-300 transition-colors">
                {product.name}
              </h3>
              <div className="mt-auto pt-2">
                <div className="flex items-baseline gap-1.5">
                  <span className="text-base font-semibold text-slate-50">
                    {formatCurrencyBRL(product.price)}
                  </span>
                  <span className="text-[10px] text-slate-500">
                    / {product.unit}
                  </span>
                  {product.originalPrice && (
                    <span className="text-[11px] text-slate-500 line-through">
                      {formatCurrencyBRL(product.originalPrice)}
                    </span>
                  )}
                </div>
                <p className="mt-0.5 text-[10px] text-slate-500">
                  Até 6x sem juros
                </p>
              </div>
            </Link>

            <div className="px-3.5 pb-3.5">
              {qty === 0 ? (
                <Button
                  className="w-full rounded-full text-xs"
                  onClick={() => addItem(product)}
                  disabled={isOut}
                >
                  <ShoppingCart size={13} className="mr-1.5" />
                  {isOut ? "Indisponível" : "Adicionar"}
                </Button>
              ) : (
                <div className="flex items-center justify-between gap-2">
                  <div className="inline-flex flex-1 items-center justify-between rounded-full border border-slate-800/80 bg-slate-900/80 px-2 py-1.5">
                    <button
                      onClick={() => decrement(product.id)}
                      className="flex h-6 w-6 items-center justify-center rounded-full text-slate-300 hover:bg-slate-700"
                      aria-label="Diminuir"
                    >
                      <Minus size={12} />
                    </button>
                    <span className="min-w-[20px] text-center text-xs font-semibold text-slate-100">
                      {qty}
                    </span>
                    <button
                      onClick={() => increment(product.id)}
                      className="flex h-6 w-6 items-center justify-center rounded-full text-slate-300 hover:bg-slate-700"
                      aria-label="Aumentar"
                    >
                      <Plus size={12} />
                    </button>
                  </div>
                  <span className="text-xs font-semibold text-orange-300">
                    {formatCurrencyBRL(product.price * qty)}
                  </span>
                </div>
              )}
            </div>
          </article>
        );
      })}
    </div>
  );
}
