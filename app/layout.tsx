import type { Metadata } from "next";
import "./globals.css";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { CartProvider } from "@/store/cart-store";
import { SupportWidget } from "@/components/support/support-widget";
import { CartDrawer } from "@/components/cart/cart-drawer";
import { ClientLayout } from "./client-layout";

export const metadata: Metadata = {
  title: "Celma Construções | E-commerce",
  description:
    "E-commerce moderno de materiais de construção da Celma Construções.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR">
      <body className="min-h-screen bg-white dark:bg-slate-950 text-slate-950 dark:text-slate-50 transition-colors">
        <CartProvider>
          <div className="flex min-h-screen flex-col">
            <Header />
            <main className="flex-1 bg-gradient-to-b from-slate-950 via-slate-950 to-slate-950/95">
              {children}
            </main>
            <Footer />
          </div>
          <ClientLayout />
        </CartProvider>
      </body>
    </html>
  );
}

