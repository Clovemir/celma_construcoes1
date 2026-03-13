"use client";

import Image from "next/image";
import type { Product } from "@/constants";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { formatCurrencyBRL } from "@/lib/utils";
import { useCart } from "@/store/cart-store";
import { ShoppingCart, Heart } from "lucide-react";
import { useState } from "react";

interface ProductGridProps {
  products: Product[];
}

export function ProductGrid({ products }: ProductGridProps) {
  const { addItem } = useCart();
  const [favorites, setFavorites] = useState<Set<number>>(new Set());

  const toggleFavorite = (productId: number) => {
    const newFavorites = new Set(favorites);
    if (newFavorites.has(productId)) {
      newFavorites.delete(productId);
    } else {
      newFavorites.add(productId);
    }
    setFavorites(newFavorites);
  };

  return (
    <div className="grid gap-4 md:grid-cols-3 lg:grid-cols-4">
      {products.map((product) => (
        <article
          key={product.id}
          className="group relative flex flex-col overflow-hidden rounded-2xl border border-slate-800/80 bg-slate-950/80 shadow-soft transition-all hover:-translate-y-1 hover:border-slate-500/70 hover:shadow-lg hover:shadow-slate-900/50"
        >
          <div className="relative h-40 w-full overflow-hidden bg-slate-900 md:aspect-[4/3] md:h-auto">
            <Image
              src={product.imageUrl}
              alt={product.name}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-[1.08]"
              loading="lazy"
              priority={false}
            />
            
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            
            {product.discountTag && (
              <Badge
                variant="accent"
                className="absolute left-3 top-3 text-[10px]"
              >
                {product.discountTag}
              </Badge>
            )}
            
            <button
              onClick={() => toggleFavorite(product.id)}
              className="absolute right-3 top-3 p-2 rounded-full bg-slate-900/80 backdrop-blur border border-slate-700 text-slate-300 hover:text-red-400 hover:bg-slate-800 transition-all opacity-0 group-hover:opacity-100"
              aria-label="Adicionar aos favoritos"
            >
              <Heart
                size={16}
                className={favorites.has(product.id) ? "fill-current" : ""}
              />
            </button>
          </div>
          
          <div className="flex flex-1 flex-col gap-2 px-3.5 py-3">
            <p className="text-[11px] uppercase tracking-[0.18em] text-slate-500">
              {product.brand}
            </p>
            <h3 className="line-clamp-2 text-sm font-medium text-slate-100 group-hover:text-orange-300 transition-colors">
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
              className="w-full rounded-full text-xs inline-flex items-center justify-center gap-1.5 hover:shadow-lg hover:shadow-orange-500/20 transition-all"
              onClick={() => addItem(product)}
            >
              <ShoppingCart size={14} />
              Adicionar
            </Button>
          </div>
        </article>
      ))}
    </div>
  );
}

