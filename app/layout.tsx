import type { Metadata } from "next";
import "./globals.css";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { CartProvider } from "@/store/cart-store";
import { SupportWidget } from "@/components/support/support-widget";
import { CartDrawer } from "@/components/cart/cart-drawer";

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
      <body className="min-h-screen bg-slate-950 text-slate-50">
        <CartProvider>
          <div className="flex min-h-screen flex-col">
            <Header />
            <main className="flex-1">
              {children}
            </main>
            <Footer />
          </div>
          <CartDrawer />
          <SupportWidget />
        </CartProvider>
      </body>
    </html>
  );
}
