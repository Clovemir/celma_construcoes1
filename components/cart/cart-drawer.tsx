"use client";

import { useMemo } from "react";
import { X, Trash2, Minus, Plus } from "lucide-react";
import { Sheet } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { formatCurrencyBRL } from "@/lib/utils";
import { useCart } from "@/store/cart-store";

export function CartDrawer() {
  const {
    isOpen,
    close,
    items,
    removeItem,
    increment,
    decrement,
    clear,
  } = useCart();

  const { total, count } = useMemo(() => {
    const totalValue = items.reduce(
      (acc, item) => acc + item.product.price * item.quantity,
      0
    );
    const totalCount = items.reduce((acc, item) => acc + item.quantity, 0);
    return { total: totalValue, count: totalCount };
  }, [items]);

  return (
    <Sheet
      open={isOpen}
      onOpenChange={(open) => (open ? undefined : close())}
      side="right"
      title="Carrinho"
      description={
        count > 0
          ? `${count} item(s) selecionado(s) para sua obra.`
          : "Seu carrinho ainda está vazio."
      }
    >
      <div className="flex items-center justify-between pb-3 text-xs text-slate-400">
        <p>
          Revise os itens antes de enviar para aprovação ou finalizar o pedido.
        </p>
        {items.length > 0 && (
          <button
            onClick={clear}
            className="inline-flex items-center gap-1 text-[11px] text-slate-400 hover:text-slate-200"
          >
            <Trash2 size={12} />
            Limpar
          </button>
        )}
      </div>

      <div className="space-y-3">
        {items.length === 0 && (
          <div className="mt-6 rounded-2xl border border-dashed border-slate-800/80 bg-slate-950/60 px-4 py-6 text-center text-xs text-slate-400">
            Nenhum produto adicionado ainda. Explore o catálogo para montar sua
            lista de materiais.
          </div>
        )}

        {items.map((item) => (
          <div
            key={item.product.id}
            className="flex gap-3 rounded-2xl border border-slate-800/80 bg-slate-950/80 p-3"
          >
            <div className="flex-1 space-y-1">
              <div className="flex items-start justify-between gap-2">
                <div>
                  <p className="text-xs font-medium text-slate-100">
                    {item.product.name}
                  </p>
                  <p className="text-[11px] text-slate-500">
                    {item.product.brand}
                  </p>
                </div>
                <button
                  onClick={() => removeItem(item.product.id)}
                  className="text-slate-500 hover:text-slate-200"
                  aria-label="Remover item"
                >
                  <X size={14} />
                </button>
              </div>
              <div className="flex items-center justify-between gap-3 pt-2">
                <div className="inline-flex items-center gap-1 rounded-full border border-slate-800/80 bg-slate-900/80 px-2 py-1">
                  <button
                    onClick={() => decrement(item.product.id)}
                    className="inline-flex h-6 w-6 items-center justify-center rounded-full text-slate-300 hover:bg-slate-800"
                    aria-label="Diminuir quantidade"
                  >
                    <Minus size={12} />
                  </button>
                  <span className="w-6 text-center text-xs text-slate-100">
                    {item.quantity}
                  </span>
                  <button
                    onClick={() => increment(item.product.id)}
                    className="inline-flex h-6 w-6 items-center justify-center rounded-full text-slate-300 hover:bg-slate-800"
                    aria-label="Aumentar quantidade"
                  >
                    <Plus size={12} />
                  </button>
                </div>
                <div className="text-right">
                  <p className="text-xs font-semibold text-slate-50">
                    {formatCurrencyBRL(
                      item.product.price * item.quantity
                    )}
                  </p>
                  <p className="text-[10px] text-slate-500">
                    {formatCurrencyBRL(item.product.price)} unid.
                  </p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-5 space-y-3 border-t border-slate-800/80 pt-4">
        <div className="flex items-center justify-between text-xs">
          <span className="text-slate-400">Subtotal estimado</span>
          <span className="font-semibold text-slate-50">
            {formatCurrencyBRL(total)}
          </span>
        </div>
        <p className="text-[10px] text-slate-500">
          Valores sujeitos a atualização conforme condições comerciais e
          disponibilidade em estoque. {/* TODO: Integrar com API/Database */}
        </p>
        <div className="flex flex-col gap-2 pt-1">
          <Button className="w-full rounded-full text-xs">
            Finalizar compra
          </Button>
          <Button
            variant="outline"
            className="w-full rounded-full text-xs"
            onClick={close}
          >
            Continuar comprando
          </Button>
        </div>
      </div>
    </Sheet>
  );
}

