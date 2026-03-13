"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import type { Product } from "@/constants";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { formatCurrencyBRL } from "@/lib/utils";
import { useCart } from "@/store/cart-store";
import { ProductImagePlaceholder } from "@/components/home/product-image";
import { ShoppingCart, Truck, Clock, ChevronLeft, ChevronRight, Minus, Plus } from "lucide-react";

const INTERVAL = 3000;

const CATEGORY_DESCRIPTIONS: Record<number, string> = {
  1: "Linha profissional com desempenho e durabilidade para obras que exigem alto rendimento.",
  2: "Acabamento de alto padrão para resultados impecáveis em qualquer tipo de superfície.",
  3: "Componentes hidráulicos de qualidade superior para instalações duráveis e confiáveis.",
  4: "Materiais elétricos certificados para instalações seguras e de alta eficiência.",
  5: "Ferramentas profissionais para máxima produtividade e precisão nos seus projetos.",
  6: "Revestimentos premium que unem estética e resistência para qualquer ambiente.",
  7: "Cores e texturas com alta cobertura e durabilidade para transformar qualquer espaço.",
};

interface OffersSectionProps {
  products: Product[];
}

export function OffersSection({ products }: OffersSectionProps) {
  const { addItem, items, increment, decrement } = useCart();
  const [activeIndex, setActiveIndex] = useState(0);
  const [animating, setAnimating] = useState(false);
  const [direction, setDirection] = useState<"left" | "right">("left");
  const [progress, setProgress] = useState(0);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const progressRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const pausedRef = useRef(false);

  if (!products.length) return null;

  const total = products.length;
  const featured = products[activeIndex];
  const rest = products.filter((_, i) => i !== activeIndex);

  const cartItem = items.find((i) => i.product.id === featured.id);
  const qty = cartItem?.quantity ?? 0;

  const goTo = useCallback(
    (index: number, dir: "left" | "right" = "left") => {
      if (animating || index === activeIndex) return;
      setDirection(dir);
      setAnimating(true);
      setProgress(0);
      setTimeout(() => {
        setActiveIndex(index);
        setAnimating(false);
      }, 350);
    },
    [animating, activeIndex]
  );

  const goNext = useCallback(() => {
    goTo((activeIndex + 1) % total, "left");
  }, [activeIndex, total, goTo]);

  const goPrev = useCallback(() => {
    goTo((activeIndex - 1 + total) % total, "right");
  }, [activeIndex, total, goTo]);

  const startTimer = useCallback(() => {
    if (total <= 1) return;
    if (timerRef.current) clearInterval(timerRef.current);
    if (progressRef.current) clearInterval(progressRef.current);

    setProgress(0);
    const step = 100 / (INTERVAL / 50);

    progressRef.current = setInterval(() => {
      if (!pausedRef.current) {
        setProgress((p) => Math.min(p + step, 100));
      }
    }, 50);

    timerRef.current = setInterval(() => {
      if (!pausedRef.current) {
        goNext();
      }
    }, INTERVAL);
  }, [total, goNext]);

  useEffect(() => {
    startTimer();
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
      if (progressRef.current) clearInterval(progressRef.current);
    };
  }, [startTimer, activeIndex]);

  const handlePause = () => { pausedRef.current = true; };
  const handleResume = () => { pausedRef.current = false; };

  const description =
    CATEGORY_DESCRIPTIONS[featured.categoryId] ??
    "Produto de alta qualidade para sua obra com desempenho e durabilidade garantidos.";

  return (
    <section
      className="glass-panel flex flex-col overflow-hidden rounded-2xl"
      onMouseEnter={handlePause}
      onMouseLeave={handleResume}
    >
      <div className="relative flex-1 overflow-hidden min-h-[280px]">
        <div className="absolute inset-0 bg-gradient-to-tr from-orange-500/20 via-transparent to-sky-500/10 transition-opacity duration-500" />

        {total > 1 && (
          <>
            <button
              onClick={() => { goPrev(); startTimer(); }}
              className="absolute left-3 top-1/2 z-20 -translate-y-1/2 flex h-8 w-8 items-center justify-center rounded-full border border-slate-700/60 bg-slate-900/80 text-slate-300 opacity-0 transition-all hover:bg-slate-800 hover:text-white group-hover:opacity-100 focus:opacity-100 backdrop-blur-sm"
              style={{ opacity: undefined }}
              aria-label="Anterior"
            >
              <ChevronLeft size={15} />
            </button>
            <button
              onClick={() => { goNext(); startTimer(); }}
              className="absolute right-3 top-1/2 z-20 -translate-y-1/2 flex h-8 w-8 items-center justify-center rounded-full border border-slate-700/60 bg-slate-900/80 text-slate-300 opacity-0 transition-all hover:bg-slate-800 hover:text-white focus:opacity-100 backdrop-blur-sm"
              aria-label="Próximo"
            >
              <ChevronRight size={15} />
            </button>
          </>
        )}

        <div
          className="relative h-full transition-all duration-350"
          style={{
            opacity: animating ? 0 : 1,
            transform: animating
              ? `translateX(${direction === "left" ? "-24px" : "24px"})`
              : "translateX(0)",
            transition: "opacity 350ms ease, transform 350ms ease",
          }}
        >
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
                  {description}
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
                        className="flex h-6 w-6 items-center justify-center rounded-full text-slate-300 hover:bg-slate-700"
                      >
                        <Minus size={12} />
                      </button>
                      <span className="w-8 text-center text-sm font-semibold text-slate-50">
                        {qty}
                      </span>
                      <button
                        onClick={() => increment(featured.id)}
                        className="flex h-6 w-6 items-center justify-center rounded-full text-slate-300 hover:bg-slate-700"
                      >
                        <Plus size={12} />
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

        {total > 1 && (
          <div className="absolute bottom-4 left-5 flex items-center gap-2 z-10">
            {products.map((_, i) => (
              <button
                key={i}
                onClick={() => { goTo(i, i > activeIndex ? "left" : "right"); startTimer(); }}
                className="relative overflow-hidden rounded-full transition-all duration-300"
                style={{
                  width: i === activeIndex ? "28px" : "6px",
                  height: "6px",
                  backgroundColor:
                    i === activeIndex
                      ? "rgba(249,115,22,0.3)"
                      : "rgba(100,116,139,0.5)",
                }}
                aria-label={`Ir para slide ${i + 1}`}
              >
                {i === activeIndex && (
                  <span
                    className="absolute inset-y-0 left-0 rounded-full bg-orange-500"
                    style={{ width: `${progress}%`, transition: "width 50ms linear" }}
                  />
                )}
              </button>
            ))}
          </div>
        )}
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
                  onClick={() => {
                    const idx = products.findIndex((p) => p.id === product.id);
                    if (idx !== -1) { goTo(idx, idx > activeIndex ? "left" : "right"); startTimer(); }
                    else addItem(product);
                  }}
                >
                  <span className="line-clamp-1 max-w-[130px]">{product.name}</span>
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
