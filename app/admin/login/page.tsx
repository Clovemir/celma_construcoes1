"use client";

import { useState, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Lock, Loader2, Eye, EyeOff } from "lucide-react";

function LoginForm() {
  const router = useRouter();
  const params = useSearchParams();
  const from = params.get("from") ?? "/admin/products";

  const [password, setPassword] = useState("");
  const [showPw, setShowPw] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });
      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error ?? "Senha incorreta");
      }
      router.push(from);
      router.refresh();
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center p-4">
      <div className="w-full max-w-sm">
        <div className="mb-8 text-center">
          <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-orange-500 to-amber-400 shadow-lg">
            <span className="text-2xl font-black text-slate-950">C</span>
          </div>
          <h1 className="text-xl font-bold text-slate-100">Celma Construções</h1>
          <p className="mt-1 text-sm text-slate-400">Painel administrativo</p>
        </div>

        <div className="rounded-2xl border border-slate-800/80 bg-slate-900 p-6 shadow-[0_24px_80px_rgba(0,0,0,0.4)]">
          <div className="mb-5 flex items-center gap-2.5">
            <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-orange-500/15 text-orange-400">
              <Lock size={14} />
            </div>
            <div>
              <p className="text-sm font-semibold text-slate-100">Acesso restrito</p>
              <p className="text-[11px] text-slate-500">Digite a senha de administrador</p>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="mb-1.5 block text-[11px] font-medium uppercase tracking-[0.12em] text-slate-500">
                Senha
              </label>
              <div className="relative">
                <input
                  type={showPw ? "text" : "password"}
                  required
                  autoFocus
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full rounded-xl border border-slate-800/80 bg-slate-800/50 px-3.5 py-2.5 pr-10 text-sm text-slate-100 placeholder-slate-600 outline-none transition-colors focus:border-orange-500/50 focus:ring-1 focus:ring-orange-500/20"
                />
                <button
                  type="button"
                  onClick={() => setShowPw((v) => !v)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300"
                  tabIndex={-1}
                >
                  {showPw ? <EyeOff size={15} /> : <Eye size={15} />}
                </button>
              </div>
            </div>

            {error && (
              <div className="rounded-xl border border-red-500/30 bg-red-500/10 px-4 py-2.5 text-xs text-red-300">
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="flex w-full items-center justify-center gap-2 rounded-xl bg-orange-500 py-2.5 text-sm font-semibold text-slate-950 transition-all hover:bg-orange-400 disabled:opacity-60"
            >
              {loading && <Loader2 size={14} className="animate-spin" />}
              Entrar
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default function LoginPage() {
  return (
    <Suspense>
      <LoginForm />
    </Suspense>
  );
}
