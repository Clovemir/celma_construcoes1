"use client";

import { useState, useEffect, useCallback } from "react";
import {
  Plus,
  Pencil,
  Trash2,
  Loader2,
  PackageX,
  Search,
  RefreshCw,
  AlertTriangle,
} from "lucide-react";
import { CATEGORIES } from "@/constants";
import { formatCurrencyBRL } from "@/lib/utils";
import { cn } from "@/lib/utils";
import { ProductForm, type ProductFormData } from "./product-form";
import { ProductImagePlaceholder } from "@/components/home/product-image";

type Product = {
  id: number;
  name: string;
  brand: string;
  price: string;
  original_price: string | null;
  discount_tag: string | null;
  highlight: boolean;
  category_id: number;
  unit: string;
  stock: "available" | "low" | "out";
  image_url: string | null;
};

const STOCK_LABEL: Record<string, { label: string; cls: string }> = {
  available: {
    label: "Disponível",
    cls: "text-emerald-400 bg-emerald-500/10 border-emerald-500/30",
  },
  low: {
    label: "Últimas unidades",
    cls: "text-amber-400 bg-amber-500/10 border-amber-500/30",
  },
  out: {
    label: "Sem estoque",
    cls: "text-red-400 bg-red-500/10 border-red-500/30",
  },
};

export function ProductsTable() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");
  const [filterCategory, setFilterCategory] = useState<number | null>(null);
  const [formOpen, setFormOpen] = useState(false);
  const [editTarget, setEditTarget] = useState<
    (Partial<ProductFormData> & { id?: number }) | undefined
  >(undefined);
  const [deleteId, setDeleteId] = useState<number | null>(null);
  const [deleting, setDeleting] = useState(false);

  const fetchProducts = useCallback(async () => {
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/products");
      if (!res.ok) throw new Error("Erro ao carregar produtos");
      setProducts(await res.json());
    } catch (e: any) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  function openNew() {
    setEditTarget(undefined);
    setFormOpen(true);
  }

  function openEdit(p: Product) {
    setEditTarget({
      id: p.id,
      name: p.name,
      brand: p.brand,
      price: p.price,
      original_price: p.original_price ?? "",
      discount_tag: p.discount_tag ?? "",
      highlight: p.highlight,
      category_id: String(p.category_id),
      unit: p.unit,
      stock: p.stock,
      image_url: p.image_url ?? "",
    });
    setFormOpen(true);
  }

  async function confirmDelete() {
    if (!deleteId) return;
    setDeleting(true);
    try {
      await fetch(`/api/products/${deleteId}`, { method: "DELETE" });
      setDeleteId(null);
      fetchProducts();
    } finally {
      setDeleting(false);
    }
  }

  const filtered = products.filter((p) => {
    const q = search.toLowerCase();
    const matchSearch =
      !q || p.name.toLowerCase().includes(q) || p.brand.toLowerCase().includes(q);
    const matchCat = filterCategory === null || p.category_id === filterCategory;
    return matchSearch && matchCat;
  });

  const stats = {
    total: products.length,
    available: products.filter((p) => p.stock === "available").length,
    low: products.filter((p) => p.stock === "low").length,
    out: products.filter((p) => p.stock === "out").length,
  };

  return (
    <>
      <div className="space-y-6">
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
          {[
            { label: "Total de produtos", value: stats.total, color: "text-slate-100" },
            { label: "Disponíveis", value: stats.available, color: "text-emerald-400" },
            { label: "Últimas unidades", value: stats.low, color: "text-amber-400" },
            { label: "Sem estoque", value: stats.out, color: "text-red-400" },
          ].map((s) => (
            <div
              key={s.label}
              className="rounded-2xl border border-slate-800/80 bg-slate-900/60 px-4 py-3.5"
            >
              <p className="text-[10px] font-medium uppercase tracking-[0.18em] text-slate-500">
                {s.label}
              </p>
              <p className={cn("mt-1 text-2xl font-bold", s.color)}>{s.value}</p>
            </div>
          ))}
        </div>

        <div className="rounded-2xl border border-slate-800/80 bg-slate-900/60">
          <div className="flex flex-col gap-3 border-b border-slate-800/80 px-5 py-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex flex-1 flex-col gap-3 sm:flex-row sm:items-center">
              <div className="relative flex-1 max-w-xs">
                <Search className="pointer-events-none absolute left-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-slate-500" />
                <input
                  type="text"
                  placeholder="Buscar produto ou marca…"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="w-full rounded-xl border border-slate-800/80 bg-slate-800/50 pl-9 pr-3.5 py-2 text-xs text-slate-100 placeholder-slate-600 outline-none transition-colors focus:border-orange-500/50 focus:ring-1 focus:ring-orange-500/20"
                />
              </div>
              <select
                value={filterCategory ?? ""}
                onChange={(e) =>
                  setFilterCategory(e.target.value ? Number(e.target.value) : null)
                }
                className="rounded-xl border border-slate-800/80 bg-slate-800/50 px-3.5 py-2 text-xs text-slate-300 outline-none focus:border-orange-500/50 [&>option]:bg-slate-900"
              >
                <option value="">Todas as categorias</option>
                {CATEGORIES.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={fetchProducts}
                className="flex h-9 w-9 items-center justify-center rounded-xl border border-slate-800/80 bg-slate-800/50 text-slate-400 transition-colors hover:bg-slate-700 hover:text-slate-100"
                title="Atualizar"
              >
                <RefreshCw size={13} />
              </button>
              <button
                onClick={openNew}
                className="flex items-center gap-2 rounded-xl bg-orange-500 px-4 py-2 text-xs font-semibold text-slate-950 transition-all hover:bg-orange-400"
              >
                <Plus size={13} />
                Novo produto
              </button>
            </div>
          </div>

          {loading ? (
            <div className="flex items-center justify-center gap-2 py-16 text-xs text-slate-500">
              <Loader2 size={16} className="animate-spin" />
              Carregando produtos…
            </div>
          ) : error ? (
            <div className="flex flex-col items-center gap-2 py-16 text-center">
              <AlertTriangle size={24} className="text-red-400" strokeWidth={1.5} />
              <p className="text-sm text-red-300">{error}</p>
            </div>
          ) : filtered.length === 0 ? (
            <div className="flex flex-col items-center gap-3 py-16 text-center">
              <PackageX size={28} className="text-slate-600" strokeWidth={1.5} />
              <div>
                <p className="text-sm font-medium text-slate-300">
                  Nenhum produto encontrado
                </p>
                <p className="mt-0.5 text-xs text-slate-500">
                  Tente ajustar os filtros ou cadastre um novo produto.
                </p>
              </div>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full min-w-[720px] text-xs">
                <thead>
                  <tr className="border-b border-slate-800/60">
                    {["Produto", "Categoria", "Preço", "Unidade", "Estoque", "Ações"].map(
                      (h) => (
                        <th
                          key={h}
                          className="px-5 py-3 text-left text-[10px] font-semibold uppercase tracking-[0.18em] text-slate-500"
                        >
                          {h}
                        </th>
                      )
                    )}
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/40">
                  {filtered.map((p) => {
                    const cat = CATEGORIES.find((c) => c.id === p.category_id);
                    const stock = STOCK_LABEL[p.stock] ?? STOCK_LABEL.available;
                    return (
                      <tr
                        key={p.id}
                        className="group transition-colors hover:bg-slate-800/30"
                      >
                        <td className="px-5 py-3.5">
                          <div className="flex items-center gap-3">
                            <div className="h-10 w-10 shrink-0 overflow-hidden rounded-xl border border-slate-800/60 bg-slate-800">
                              <ProductImagePlaceholder categoryId={p.category_id} imageUrl={p.image_url ?? undefined} alt={p.name} />
                            </div>
                            <div>
                              <p className="font-medium text-slate-100 line-clamp-1">
                                {p.name}
                              </p>
                              <p className="text-[10px] text-slate-500 mt-0.5 uppercase tracking-wide">
                                {p.brand}
                                {p.highlight && (
                                  <span className="ml-1.5 rounded-full bg-orange-500/15 px-1.5 py-0.5 text-[9px] text-orange-400">
                                    destaque
                                  </span>
                                )}
                              </p>
                            </div>
                          </div>
                        </td>
                        <td className="px-5 py-3.5">
                          <span className="text-slate-300">{cat?.name ?? "—"}</span>
                        </td>
                        <td className="px-5 py-3.5">
                          <div>
                            <span className="font-semibold text-slate-100">
                              {formatCurrencyBRL(parseFloat(p.price))}
                            </span>
                            {p.original_price && (
                              <span className="ml-1.5 text-[10px] text-slate-500 line-through">
                                {formatCurrencyBRL(parseFloat(p.original_price))}
                              </span>
                            )}
                          </div>
                          {p.discount_tag && (
                            <span className="mt-0.5 block text-[10px] text-orange-400">
                              {p.discount_tag}
                            </span>
                          )}
                        </td>
                        <td className="px-5 py-3.5 text-slate-400">{p.unit}</td>
                        <td className="px-5 py-3.5">
                          <span
                            className={cn(
                              "rounded-full border px-2.5 py-1 text-[10px] font-medium",
                              stock.cls
                            )}
                          >
                            {stock.label}
                          </span>
                        </td>
                        <td className="px-5 py-3.5">
                          <div className="flex items-center gap-1.5">
                            <button
                              onClick={() => openEdit(p)}
                              className="flex h-7 w-7 items-center justify-center rounded-lg border border-slate-800/80 bg-slate-800/50 text-slate-400 transition-colors hover:border-orange-500/40 hover:bg-orange-500/10 hover:text-orange-400"
                              title="Editar"
                            >
                              <Pencil size={12} />
                            </button>
                            <button
                              onClick={() => setDeleteId(p.id)}
                              className="flex h-7 w-7 items-center justify-center rounded-lg border border-slate-800/80 bg-slate-800/50 text-slate-400 transition-colors hover:border-red-500/40 hover:bg-red-500/10 hover:text-red-400"
                              title="Excluir"
                            >
                              <Trash2 size={12} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
              <div className="border-t border-slate-800/60 px-5 py-3 text-[10px] text-slate-600">
                {filtered.length} produto{filtered.length !== 1 ? "s" : ""} exibido
                {filtered.length !== products.length
                  ? ` de ${products.length} total`
                  : ""}
              </div>
            </div>
          )}
        </div>
      </div>

      <ProductForm
        open={formOpen}
        initialData={editTarget}
        onClose={() => setFormOpen(false)}
        onSaved={fetchProducts}
      />

      {deleteId !== null && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div
            className="absolute inset-0 bg-slate-950/80 backdrop-blur-sm"
            onClick={() => setDeleteId(null)}
          />
          <div className="relative w-full max-w-sm overflow-hidden rounded-2xl border border-slate-800/80 bg-slate-900 p-6 shadow-[0_24px_80px_rgba(0,0,0,0.5)]">
            <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-2xl bg-red-500/10">
              <Trash2 size={18} className="text-red-400" />
            </div>
            <h3 className="text-sm font-semibold text-slate-100">Excluir produto?</h3>
            <p className="mt-1 text-xs text-slate-500">
              Esta ação não pode ser desfeita. O produto será removido permanentemente do
              catálogo.
            </p>
            <div className="mt-5 flex gap-3">
              <button
                onClick={() => setDeleteId(null)}
                className="flex-1 rounded-xl border border-slate-800/80 bg-slate-800/50 py-2.5 text-xs font-medium text-slate-300 transition-colors hover:bg-slate-700"
              >
                Cancelar
              </button>
              <button
                onClick={confirmDelete}
                disabled={deleting}
                className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-red-500 py-2.5 text-xs font-semibold text-white transition-all hover:bg-red-400 disabled:opacity-60"
              >
                {deleting && <Loader2 size={12} className="animate-spin" />}
                Excluir
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
