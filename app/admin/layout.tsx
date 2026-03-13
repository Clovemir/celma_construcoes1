import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Painel Administrativo | Celma Construções",
  description: "Gerenciamento de estoque e produtos",
};

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-50">
      {children}
    </div>
  );
}
