"use client";

import { useState, useEffect, useRef } from "react";
import {
  X,
  Loader2,
  Package,
  Tag,
  DollarSign,
  Layers,
  ToggleLeft,
  ImagePlus,
  Trash2,
} from "lucide-react";
import { CATEGORIES } from "@/constants";
import { cn } from "@/lib/utils";

export type ProductFormData = {
  name: string;
  brand: string;
  price: string;
  original_price: string;
  discount_tag: string;
  highlight: boolean;
  category_id: string;
  unit: string;
  stock: "available" | "low" | "out";
  image_url: string;
};

const EMPTY_FORM: ProductFormData = {
  name: "",
  brand: "",
  price: "",
  original_price: "",
  discount_tag: "",
  highlight: false,
  category_id: "1",
  unit: "",
  stock: "available",
  image_url: "",
};

const STOCK_OPTIONS = [
  { value: "available", label: "Disponível", color: "text-emerald-400 bg-emerald-500/10 border-emerald-500/30" },
  { value: "low", label: "Últimas unidades", color: "text-amber-400 bg-amber-500/10 border-amber-500/30" },
  { value: "out", label: "Sem estoque", color: "text-red-400 bg-red-500/10 border-red-500/30" },
];

interface ProductFormProps {
  open: boolean;
  initialData?: Partial<ProductFormData> & { id?: number };
  onClose: () => void;
  onSaved: () => void;
}

export function ProductForm({ open, initialData, onClose, onSaved }: ProductFormProps) {
  const [form, setForm] = useState<ProductFormData>(EMPTY_FORM);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [uploading, setUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const isEditing = Boolean(initialData?.id);

  useEffect(() => {
    if (open) {
      if (initialData) {
        setForm({
          name: initialData.name ?? "",
          brand: initialData.brand ?? "",
          price: initialData.price ?? "",
          original_price: initialData.original_price ?? "",
          discount_tag: initialData.discount_tag ?? "",
          highlight: initialData.highlight ?? false,
          category_id: initialData.category_id ?? "1",
          unit: initialData.unit ?? "",
          stock: initialData.stock ?? "available",
          image_url: initialData.image_url ?? "",
        });
      } else {
        setForm(EMPTY_FORM);
      }
      setError("");
    }
  }, [open, initialData]);

  function set(field: keyof ProductFormData, value: string | boolean) {
    setForm((prev) => ({ ...prev, [field]: value }));
  }

  async function handleImageUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    setError("");
    try {
      const fd = new FormData();
      fd.append("file", file);
      const res = await fetch("/api/upload", { method: "POST", body: fd });
      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error ?? "Erro no upload");
      }
      const { url } = await res.json();
      set("image_url", url);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setUploading(false);
      if (fileInputRef.current) fileInputRef.current.value = "";
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const url = isEditing
        ? `/api/products/${initialData!.id}`
        : "/api/products";
      const method = isEditing ? "PUT" : "POST";
      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Erro desconhecido");
      }
      onSaved();
      onClose();
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div
        className="absolute inset-0 bg-slate-950/80 backdrop-blur-sm"
        onClick={onClose}
      />
      <div className="relative w-full max-w-2xl overflow-hidden rounded-2xl border border-slate-800/80 bg-slate-900 shadow-[0_24px_80px_rgba(0,0,0,0.5)]">
        <div className="flex items-center justify-between border-b border-slate-800/80 px-6 py-4">
          <div className="flex items-center gap-2.5">
            <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-orange-500/15 text-orange-400">
              <Package size={15} />
            </div>
            <div>
              <h2 className="text-sm font-semibold text-slate-100">
                {isEditing ? "Editar produto" : "Novo produto"}
              </h2>
              <p className="text-[11px] text-slate-500">
                {isEditing
                  ? "Atualize as informações do produto"
                  : "Preencha os dados do novo produto"}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="flex h-8 w-8 items-center justify-center rounded-xl border border-slate-800/80 text-slate-500 transition-colors hover:bg-slate-800 hover:text-slate-100"
          >
            <X size={14} />
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="max-h-[70vh] overflow-y-auto px-6 py-5">
            <div className="space-y-5">

              <div>
                <label className="mb-1.5 flex items-center gap-1.5 text-[11px] font-medium uppercase tracking-[0.12em] text-slate-500">
                  <ImagePlus size={13} />
                  Imagem do produto
                </label>
                <div className="flex items-center gap-3">
                  <div className="relative h-20 w-28 shrink-0 overflow-hidden rounded-xl border border-slate-800/80 bg-slate-800/50">
                    {form.image_url ? (
                      <img
                        src={form.image_url}
                        alt="Preview"
                        className="h-full w-full object-cover"
                      />
                    ) : (
                      <div className="flex h-full w-full items-center justify-center text-slate-600">
                        <ImagePlus size={20} />
                      </div>
                    )}
                  </div>
                  <div className="flex flex-col gap-2">
                    <button
                      type="button"
                      onClick={() => fileInputRef.current?.click()}
                      disabled={uploading}
                      className="flex items-center gap-2 rounded-xl border border-slate-700/80 bg-slate-800/50 px-3.5 py-2 text-xs font-medium text-slate-300 transition-colors hover:bg-slate-700 hover:text-slate-100 disabled:opacity-60"
                    >
                      {uploading ? (
                        <Loader2 size={12} className="animate-spin" />
                      ) : (
                        <ImagePlus size={12} />
                      )}
                      {uploading ? "Enviando..." : "Escolher imagem"}
                    </button>
                    {form.image_url && (
                      <button
                        type="button"
                        onClick={() => set("image_url", "")}
                        className="flex items-center gap-1.5 text-[11px] text-slate-500 hover:text-red-400 transition-colors"
                      >
                        <Trash2 size={11} />
                        Remover imagem
                      </button>
                    )}
                    <p className="text-[10px] text-slate-600">
                      JPG, PNG ou WebP. Será redimensionada para 400×300px.
                    </p>
                  </div>
                </div>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/jpeg,image/jpg,image/png,image/webp"
                  className="hidden"
                  onChange={handleImageUpload}
                />
              </div>

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <FormField label="Nome do produto *" icon={<Package size={13} />} className="sm:col-span-2">
                  <input
                    type="text"
                    required
                    value={form.name}
                    onChange={(e) => set("name", e.target.value)}
                    placeholder="Ex: Cimento CP II 50kg"
                    className={inputClass}
                  />
                </FormField>

                <FormField label="Marca *" icon={<Tag size={13} />}>
                  <input
                    type="text"
                    required
                    value={form.brand}
                    onChange={(e) => set("brand", e.target.value)}
                    placeholder="Ex: Votoran"
                    className={inputClass}
                  />
                </FormField>

                <FormField label="Unidade *" icon={<Layers size={13} />}>
                  <input
                    type="text"
                    required
                    value={form.unit}
                    onChange={(e) => set("unit", e.target.value)}
                    placeholder="Ex: sc 50kg, un, m²"
                    className={inputClass}
                  />
                </FormField>

                <FormField label="Preço (R$) *" icon={<DollarSign size={13} />}>
                  <input
                    type="number"
                    required
                    step="0.01"
                    min="0"
                    value={form.price}
                    onChange={(e) => set("price", e.target.value)}
                    placeholder="0,00"
                    className={inputClass}
                  />
                </FormField>

                <FormField label="Preço original (R$)" icon={<DollarSign size={13} />}>
                  <input
                    type="number"
                    step="0.01"
                    min="0"
                    value={form.original_price}
                    onChange={(e) => set("original_price", e.target.value)}
                    placeholder="Deixe vazio se não há desconto"
                    className={inputClass}
                  />
                </FormField>

                <FormField label="Tag de desconto" icon={<Tag size={13} />}>
                  <input
                    type="text"
                    value={form.discount_tag}
                    onChange={(e) => set("discount_tag", e.target.value)}
                    placeholder="Ex: -18% hoje"
                    className={inputClass}
                  />
                </FormField>

                <FormField label="Categoria *" icon={<Layers size={13} />}>
                  <select
                    required
                    value={form.category_id}
                    onChange={(e) => set("category_id", e.target.value)}
                    className={inputClass}
                  >
                    {CATEGORIES.map((cat) => (
                      <option key={cat.id} value={cat.id}>
                        {cat.name}
                      </option>
                    ))}
                  </select>
                </FormField>

                <FormField label="Estoque" icon={<Package size={13} />}>
                  <div className="flex gap-2">
                    {STOCK_OPTIONS.map((opt) => (
                      <button
                        key={opt.value}
                        type="button"
                        onClick={() => set("stock", opt.value)}
                        className={cn(
                          "flex-1 rounded-xl border px-2 py-2 text-[11px] font-medium transition-all",
                          form.stock === opt.value
                            ? opt.color
                            : "border-slate-800/80 bg-slate-800/50 text-slate-500 hover:text-slate-300"
                        )}
                      >
                        {opt.label}
                      </button>
                    ))}
                  </div>
                </FormField>
              </div>

              <div className="flex items-center gap-3 rounded-xl border border-slate-800/60 bg-slate-800/30 px-4 py-3">
                <ToggleLeft size={15} className="text-slate-400" />
                <div className="flex-1">
                  <p className="text-xs font-medium text-slate-200">Destaque na home</p>
                  <p className="text-[11px] text-slate-500">
                    Exibe o produto na seção de ofertas em destaque
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => set("highlight", !form.highlight)}
                  className={cn(
                    "relative h-6 w-11 rounded-full transition-colors",
                    form.highlight ? "bg-orange-500" : "bg-slate-700"
                  )}
                >
                  <span
                    className={cn(
                      "absolute top-0.5 h-5 w-5 rounded-full bg-white shadow transition-all",
                      form.highlight ? "left-[22px]" : "left-0.5"
                    )}
                  />
                </button>
              </div>
            </div>
          </div>

          {error && (
            <div className="mx-6 mb-0 rounded-xl border border-red-500/30 bg-red-500/10 px-4 py-3 text-xs text-red-300">
              {error}
            </div>
          )}

          <div className="flex items-center justify-end gap-3 border-t border-slate-800/80 px-6 py-4">
            <button
              type="button"
              onClick={onClose}
              className="rounded-xl border border-slate-800/80 bg-slate-800/50 px-5 py-2.5 text-xs font-medium text-slate-300 transition-colors hover:bg-slate-700 hover:text-slate-100"
            >
              Cancelar
            </button>
            <button
              type="submit"
              disabled={loading || uploading}
              className="flex items-center gap-2 rounded-xl bg-orange-500 px-5 py-2.5 text-xs font-semibold text-slate-950 transition-all hover:bg-orange-400 disabled:opacity-60"
            >
              {loading && <Loader2 size={13} className="animate-spin" />}
              {isEditing ? "Salvar alterações" : "Cadastrar produto"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

const inputClass =
  "w-full rounded-xl border border-slate-800/80 bg-slate-800/50 px-3.5 py-2.5 text-xs text-slate-100 placeholder-slate-600 outline-none transition-colors focus:border-orange-500/50 focus:bg-slate-800/80 focus:ring-1 focus:ring-orange-500/20 [&>option]:bg-slate-900";

function FormField({
  label,
  icon,
  children,
  className,
}: {
  label: string;
  icon: React.ReactNode;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={className}>
      <label className="mb-1.5 flex items-center gap-1.5 text-[11px] font-medium uppercase tracking-[0.12em] text-slate-500">
        {icon}
        {label}
      </label>
      {children}
    </div>
  );
}
