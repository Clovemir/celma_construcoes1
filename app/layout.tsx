import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Celma Construções | Materiais para Obra",
  description:
    "E-commerce de materiais de construção. Portfólio completo com entrega rápida na região metropolitana de São Paulo.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR">
      <body className="min-h-screen bg-slate-950 text-slate-50">{children}</body>
    </html>
  );
}
