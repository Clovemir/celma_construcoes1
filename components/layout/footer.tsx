"use client";

import { Mail, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";

export function Footer() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setEmail("");
      setTimeout(() => setSubscribed(false), 3000);
    }
  };

  return (
    <footer className="mt-10 border-t border-slate-800/80 bg-slate-950/95">
      <div className="container py-8 md:py-10">
        <div className="grid gap-8 md:grid-cols-5 text-xs text-slate-400 mb-8">
          <div className="space-y-4 md:col-span-2">
            <div className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-2xl bg-gradient-to-br from-orange-500 to-amber-400 text-slate-950">
                <span className="text-sm font-black tracking-tight">C</span>
              </div>
              <div className="leading-tight">
                <div className="text-sm font-semibold tracking-tight text-slate-100">
                  Celma Construções
                </div>
                <div className="text-[10px] uppercase tracking-[0.18em]">
                  Materiais para obra
                </div>
              </div>
            </div>
            <p className="max-w-xs text-[11px] text-slate-400">
              E-commerce moderno focado em agilidade, curadoria de produtos e
              atendimento especializado para obras de qualquer porte.
            </p>
            <div className="flex gap-3">
              <div className="flex items-center gap-2 text-[11px]">
                <Phone className="h-3.5 w-3.5 text-orange-400" />
                <span>(11) 99999-9999</span>
              </div>
            </div>
          </div>

          <div>
            <h3 className="mb-3 text-[11px] font-semibold uppercase tracking-[0.2em] text-slate-300">
              Institucional
            </h3>
            <ul className="space-y-2 text-[11px] text-slate-400">
              <li className="hover:text-orange-400 transition-colors cursor-pointer">Quem somos</li>
              <li className="hover:text-orange-400 transition-colors cursor-pointer">Política de privacidade</li>
              <li className="hover:text-orange-400 transition-colors cursor-pointer">Trocas e devoluções</li>
              <li className="hover:text-orange-400 transition-colors cursor-pointer">Política de entrega</li>
              <li className="hover:text-orange-400 transition-colors cursor-pointer">Trabalhe conosco</li>
            </ul>
          </div>

          <div>
            <h3 className="mb-3 text-[11px] font-semibold uppercase tracking-[0.2em] text-slate-300">
              Atendimento
            </h3>
            <ul className="space-y-2 text-[11px] text-slate-400">
              <li className="hover:text-orange-400 transition-colors cursor-pointer">WhatsApp comercial</li>
              <li className="hover:text-orange-400 transition-colors cursor-pointer">Construtoras</li>
              <li className="hover:text-orange-400 transition-colors cursor-pointer">Suporte corporativo</li>
              <li className="hover:text-orange-400 transition-colors cursor-pointer">Consultoria técnica</li>
              <li className="hover:text-orange-400 transition-colors cursor-pointer">FAQ</li>
            </ul>
          </div>

          <div>
            <h3 className="mb-3 text-[11px] font-semibold uppercase tracking-[0.2em] text-slate-300">
              Formas de Pagamento
            </h3>
            <div className="space-y-2 text-[10px]">
              <div className="flex flex-wrap gap-1.5">
                {["Cartão", "Boleto", "Pix", "Crediário"].map((method) => (
                  <span
                    key={method}
                    className="rounded-full border border-slate-700/50 bg-slate-900/30 px-2 py-1 text-slate-300 hover:border-orange-500/50 hover:bg-slate-900/50 transition-all cursor-pointer"
                  >
                    {method}
                  </span>
                ))}
              </div>
              <p className="text-[10px] text-slate-500 mt-2">
                ✓ SSL 256-bit • PCI DSS Compliant
              </p>
            </div>
          </div>
        </div>

        <div className="border-t border-slate-800/50 pt-6 mb-6">
          <div className="max-w-sm">
            <h3 className="text-xs font-semibold text-slate-200 mb-2 flex items-center gap-2">
              <Mail className="h-3.5 w-3.5 text-orange-400" />
              Newsletter
            </h3>
            <p className="text-[10px] text-slate-400 mb-3">
              Receba novidades, dicas técnicas e ofertas exclusivas para sua obra.
            </p>
            <form onSubmit={handleSubscribe} className="flex gap-2">
              <input
                type="email"
                placeholder="seu@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="flex-1 rounded-full border border-slate-700 bg-slate-900/50 px-3 py-2 text-[11px] placeholder-slate-500 focus:border-orange-500 focus:outline-none transition-colors"
              />
              <Button
                type="submit"
                size="sm"
                className="rounded-full text-xs px-4 hover:shadow-md hover:shadow-orange-500/20"
              >
                {subscribed ? "✓" : "Inscrever"}
              </Button>
            </form>
          </div>
        </div>

        <div className="flex flex-col items-start justify-between gap-4 border-t border-slate-800/50 pt-6 text-[10px] text-slate-500 md:flex-row md:items-center">
          <p>
            © {new Date().getFullYear()} Celma Construções. Todos os direitos
            reservados.
          </p>
          <p>
            Desenvolvido com foco em experiência do usuário e otimização contínua.
          </p>
        </div>
      </div>
    </footer>
  );
}

