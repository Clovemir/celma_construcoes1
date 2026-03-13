import { AdminHeader } from "@/components/admin/admin-header";
import { Package, TrendingUp, AlertTriangle, ShoppingBag } from "lucide-react";
import Link from "next/link";
import { getPool } from "@/lib/db";

async function getStats() {
  try {
    const pool = getPool();
    const [total, low, out, highlighted] = await Promise.all([
      pool.query("SELECT COUNT(*) FROM products"),
      pool.query("SELECT COUNT(*) FROM products WHERE stock = 'low'"),
      pool.query("SELECT COUNT(*) FROM products WHERE stock = 'out'"),
      pool.query("SELECT COUNT(*) FROM products WHERE highlight = true"),
    ]);
    return {
      total: parseInt(total.rows[0].count),
      low: parseInt(low.rows[0].count),
      out: parseInt(out.rows[0].count),
      highlighted: parseInt(highlighted.rows[0].count),
    };
  } catch {
    return { total: 0, low: 0, out: 0, highlighted: 0 };
  }
}

export default async function AdminDashboard() {
  const stats = await getStats();

  const cards = [
    {
      label: "Total de produtos",
      value: stats.total,
      icon: Package,
      iconColor: "text-orange-400",
      iconBg: "bg-orange-500/10",
      border: "border-slate-800/80",
    },
    {
      label: "Em destaque",
      value: stats.highlighted,
      icon: TrendingUp,
      iconColor: "text-blue-400",
      iconBg: "bg-blue-500/10",
      border: "border-slate-800/80",
    },
    {
      label: "Últimas unidades",
      value: stats.low,
      icon: AlertTriangle,
      iconColor: "text-amber-400",
      iconBg: "bg-amber-500/10",
      border: "border-amber-500/20",
    },
    {
      label: "Sem estoque",
      value: stats.out,
      icon: ShoppingBag,
      iconColor: "text-red-400",
      iconBg: "bg-red-500/10",
      border: "border-red-500/20",
    },
  ];

  return (
    <>
      <AdminHeader />
      <main className="container py-8">
        <div className="mb-8">
          <h1 className="text-xl font-bold text-slate-100">Dashboard</h1>
          <p className="mt-1 text-sm text-slate-500">
            Visão geral do estoque e catálogo de produtos
          </p>
        </div>

        <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
          {cards.map((card) => (
            <div
              key={card.label}
              className={`rounded-2xl border bg-slate-900/60 px-5 py-5 ${card.border}`}
            >
              <div
                className={`mb-3 inline-flex h-9 w-9 items-center justify-center rounded-xl ${card.iconBg}`}
              >
                <card.icon size={16} className={card.iconColor} />
              </div>
              <p className="text-[10px] font-medium uppercase tracking-[0.18em] text-slate-500">
                {card.label}
              </p>
              <p className="mt-1 text-3xl font-bold text-slate-100">{card.value}</p>
            </div>
          ))}
        </div>

        <div className="mt-8 grid gap-4 sm:grid-cols-2">
          <Link
            href="/admin/products"
            className="group flex items-center gap-4 rounded-2xl border border-slate-800/80 bg-slate-900/60 px-5 py-5 transition-all hover:border-orange-500/30 hover:bg-slate-900"
          >
            <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-orange-500/10 text-orange-400 transition-colors group-hover:bg-orange-500/20">
              <Package size={18} />
            </div>
            <div>
              <p className="text-sm font-semibold text-slate-100">
                Gerenciar produtos
              </p>
              <p className="text-xs text-slate-500 mt-0.5">
                Cadastre, edite ou remova produtos do catálogo
              </p>
            </div>
            <span className="ml-auto text-slate-600 transition-colors group-hover:text-orange-400">
              →
            </span>
          </Link>

          <Link
            href="/"
            className="group flex items-center gap-4 rounded-2xl border border-slate-800/80 bg-slate-900/60 px-5 py-5 transition-all hover:border-slate-600/50 hover:bg-slate-900"
          >
            <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-slate-800 text-slate-400 transition-colors group-hover:bg-slate-700 group-hover:text-slate-200">
              <ShoppingBag size={18} />
            </div>
            <div>
              <p className="text-sm font-semibold text-slate-100">Ver loja</p>
              <p className="text-xs text-slate-500 mt-0.5">
                Acesse a vitrine do cliente para visualizar o catálogo
              </p>
            </div>
            <span className="ml-auto text-slate-600 transition-colors group-hover:text-slate-300">
              →
            </span>
          </Link>
        </div>

        {(stats.low > 0 || stats.out > 0) && (
          <div className="mt-6 rounded-2xl border border-amber-500/20 bg-amber-500/5 px-5 py-4">
            <div className="flex items-start gap-3">
              <AlertTriangle size={15} className="mt-0.5 shrink-0 text-amber-400" />
              <div>
                <p className="text-sm font-medium text-amber-200">
                  Atenção ao estoque
                </p>
                <p className="mt-0.5 text-xs text-amber-300/70">
                  {stats.out > 0 && (
                    <>
                      <strong>{stats.out}</strong> produto
                      {stats.out > 1 ? "s" : ""} sem estoque.{" "}
                    </>
                  )}
                  {stats.low > 0 && (
                    <>
                      <strong>{stats.low}</strong> produto
                      {stats.low > 1 ? "s" : ""} com últimas unidades.
                    </>
                  )}
                </p>
              </div>
            </div>
          </div>
        )}
      </main>
    </>
  );
}
