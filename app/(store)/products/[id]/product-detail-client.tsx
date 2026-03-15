"use client";

import Link from "next/link";
import { ArrowLeft, ShoppingCart, Minus, Plus, Truck, Clock, Package, Tag, Layers, CheckCircle2, AlertTriangle, XCircle } from "lucide-react";
import type { Product, Category } from "@/constants";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ProductImagePlaceholder } from "@/components/home/product-image";
import { formatCurrencyBRL } from "@/lib/utils";
import { useCart } from "@/store/cart-store";

const STOCK_INFO = {
  available: { icon: CheckCircle2, label: "Em estoque", color: "text-emerald-400", bg: "bg-emerald-500/10 border-emerald-500/30" },
  low: { icon: AlertTriangle, label: "Últimas unidades", color: "text-amber-400", bg: "bg-amber-500/10 border-amber-500/30" },
  out: { icon: XCircle, label: "Sem estoque", color: "text-red-400", bg: "bg-red-500/10 border-red-500/30" },
};

interface Props {
  product: Product & { imageUrl?: string };
  category?: Category;
  relatedProducts: (Product & { imageUrl?: string })[];
}

export function ProductDetailClient({ product, category, relatedProducts }: Props) {
  const { addItem, items, increment, decrement } = useCart();
  const cartItem = items.find((i) => i.product.id === product.id);
  const qty = cartItem?.quantity ?? 0;
  const stockInfo = STOCK_INFO[product.stock ?? "available"];
  const StockIcon = stockInfo.icon;
  const isOut = product.stock === "out";

  return (
    <div className="min-h-screen bg-slate-950 text-slate-50">
      <div className="container py-6 md:py-10">
        <Link
          href="/"
          className="mb-6 inline-flex items-center gap-1.5 text-xs text-slate-400 hover:text-slate-200 transition-colors"
        >
          <ArrowLeft size={14} />
          Voltar ao catálogo
        </Link>

        <div className="grid gap-8 lg:grid-cols-2">
          <div className="relative aspect-[4/3] w-full overflow-hidden rounded-2xl border border-slate-800/80 bg-slate-900">
            {product.imageUrl ? (
              <img
                src={product.imageUrl}
                alt={product.name}
                className="h-full w-full object-cover"
              />
            ) : (
              <ProductImagePlaceholder categoryId={product.categoryId} size="lg" />
            )}
            <div className="absolute left-3 top-3 flex flex-wrap gap-1.5">
              {product.discountTag && !isOut && (
                <Badge variant="accent">{product.discountTag}</Badge>
              )}
              {product.stock === "low" && (
                <Badge variant="outline" className="border-amber-500/50 bg-amber-500/10 text-amber-300">
                  Últimas unidades
                </Badge>
              )}
              {isOut && (
                <Badge variant="outline" className="border-red-500/50 bg-red-500/10 text-red-300">
                  Sem estoque
                </Badge>
              )}
            </div>
          </div>

          <div className="flex flex-col gap-5">
            {category && (
              <span className="text-[11px] font-medium uppercase tracking-[0.18em] text-orange-400">
                {category.name}
              </span>
            )}

            <div>
              <p className="text-xs font-medium uppercase tracking-[0.18em] text-slate-400">
                {product.brand}
              </p>
              <h1 className="mt-1 text-2xl font-bold leading-tight text-slate-50 md:text-3xl">
                {product.name}
              </h1>
            </div>

            <div className="flex items-center gap-2">
              <span className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-xs font-medium ${stockInfo.bg} ${stockInfo.color}`}>
                <StockIcon size={12} />
                {stockInfo.label}
              </span>
            </div>

            <div className="rounded-2xl border border-slate-800/80 bg-slate-900/60 p-4">
              <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                <span className="text-3xl font-bold text-slate-50">
                  {formatCurrencyBRL(product.price)}
                </span>
                <span className="text-sm text-slate-500">/ {product.unit}</span>
                {product.originalPrice && (
                  <span className="text-sm text-slate-500 line-through">
                    {formatCurrencyBRL(product.originalPrice)}
                  </span>
                )}
              </div>
              {product.originalPrice && (
                <p className="mt-1 text-xs text-emerald-400">
                  Economia de {formatCurrencyBRL(product.originalPrice - product.price)}
                </p>
              )}
              <p className="mt-1 text-[11px] text-slate-500">Em até 10x sem juros no cartão</p>
            </div>

            <div className="grid grid-cols-2 gap-3 text-xs text-slate-300">
              {[
                { icon: Truck, label: "Entrega rápida", sub: "Região metropolitana SP" },
                { icon: Clock, label: "Estoque imediato", sub: "Pronto para envio" },
                { icon: Package, label: "Unidade", sub: product.unit },
                { icon: Tag, label: "Marca", sub: product.brand },
              ].map(({ icon: Icon, label, sub }) => (
                <div key={label} className="flex items-start gap-2.5 rounded-xl border border-slate-800/60 bg-slate-900/40 p-3">
                  <Icon size={14} className="mt-0.5 shrink-0 text-orange-400" />
                  <div>
                    <p className="font-medium text-slate-200">{label}</p>
                    <p className="text-[11px] text-slate-500">{sub}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="pt-1">
              {qty === 0 ? (
                <Button
                  size="lg"
                  className="w-full rounded-full"
                  onClick={() => addItem(product)}
                  disabled={isOut}
                >
                  <ShoppingCart size={16} className="mr-2" />
                  {isOut ? "Produto indisponível" : "Adicionar ao carrinho"}
                </Button>
              ) : (
                <div className="flex items-center gap-4">
                  <div className="inline-flex flex-1 items-center justify-between rounded-full border border-slate-800/80 bg-slate-900/80 px-3 py-2">
                    <button
                      onClick={() => decrement(product.id)}
                      className="flex h-7 w-7 items-center justify-center rounded-full text-slate-300 hover:bg-slate-700"
                    >
                      <Minus size={14} />
                    </button>
                    <span className="text-sm font-semibold text-slate-100">{qty}</span>
                    <button
                      onClick={() => increment(product.id)}
                      className="flex h-7 w-7 items-center justify-center rounded-full text-slate-300 hover:bg-slate-700"
                    >
                      <Plus size={14} />
                    </button>
                  </div>
                  <span className="text-base font-bold text-orange-300">
                    {formatCurrencyBRL(product.price * qty)}
                  </span>
                </div>
              )}
            </div>
          </div>
        </div>

        {relatedProducts.length > 0 && (
          <div className="mt-12">
            <h2 className="mb-4 text-lg font-semibold text-slate-100">
              Produtos relacionados
            </h2>
            <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-4">
              {relatedProducts.map((p) => {
                const ri = items.find((i) => i.product.id === p.id);
                const rqty = ri?.quantity ?? 0;
                return (
                  <Link
                    key={p.id}
                    href={`/products/${p.id}`}
                    className="group flex flex-col overflow-hidden rounded-2xl border border-slate-800/80 bg-slate-950/80 transition-all hover:-translate-y-0.5 hover:border-slate-600/70"
                  >
                    <div className="relative h-32 w-full overflow-hidden bg-slate-900">
                      {p.imageUrl ? (
                        <img src={p.imageUrl} alt={p.name} className="h-full w-full object-cover" />
                      ) : (
                        <ProductImagePlaceholder categoryId={p.categoryId} />
                      )}
                      {rqty > 0 && (
                        <div className="absolute right-2 top-2 flex h-5 min-w-[20px] items-center justify-center rounded-full bg-orange-500 px-1 text-[10px] font-semibold text-slate-950">
                          {rqty}
                        </div>
                      )}
                    </div>
                    <div className="flex flex-1 flex-col gap-1 p-3">
                      <p className="text-[10px] uppercase tracking-wide text-slate-500">{p.brand}</p>
                      <p className="line-clamp-2 text-xs font-medium text-slate-100">{p.name}</p>
                      <p className="mt-auto pt-1.5 text-sm font-semibold text-slate-50">
                        {formatCurrencyBRL(p.price)}
                        <span className="ml-1 text-[10px] font-normal text-slate-500">/ {p.unit}</span>
                      </p>
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
