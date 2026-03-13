import { Phone, Mail, MapPin, Shield } from "lucide-react";

export function Footer() {
  return (
    <footer className="mt-10 border-t border-slate-800/80 bg-slate-950/95">
      <div className="container py-8 text-xs text-slate-400 md:py-12">
        <div className="grid gap-8 md:grid-cols-4">
          <div className="space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="flex h-8 w-8 items-center justify-center rounded-2xl bg-gradient-to-br from-orange-500 to-amber-400 text-slate-950">
                <span className="text-sm font-black tracking-tight">C</span>
              </div>
              <div className="leading-tight">
                <div className="text-sm font-bold tracking-tight text-slate-100">
                  Celma Construções
                </div>
                <div className="text-[10px] uppercase tracking-[0.18em]">
                  Materiais para obra
                </div>
              </div>
            </div>
            <p className="max-w-xs text-[11px] text-slate-400 leading-relaxed">
              E-commerce especializado em materiais de construção. Portfólio
              completo com atendimento técnico e entrega na região metropolitana.
            </p>
            <div className="space-y-1.5 text-[11px]">
              <div className="flex items-center gap-2 text-slate-500">
                <Phone size={11} />
                <span>Atendimento via WhatsApp</span>
              </div>
              <div className="flex items-center gap-2 text-slate-500">
                <Mail size={11} />
                <span>contato@celmaconstrucoes.com.br</span>
              </div>
              <div className="flex items-center gap-2 text-slate-500">
                <MapPin size={11} />
                <span>São Paulo e região metropolitana</span>
              </div>
            </div>
          </div>

          <div>
            <h3 className="mb-3 text-[11px] font-semibold uppercase tracking-[0.2em] text-slate-500">
              Institucional
            </h3>
            <ul className="space-y-2 text-[11px] text-slate-400">
              {[
                "Quem somos",
                "Política de privacidade",
                "Trocas e devoluções",
                "Política de entrega",
                "Termos de uso",
              ].map((item) => (
                <li
                  key={item}
                  className="cursor-pointer transition-colors hover:text-slate-200"
                >
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="mb-3 text-[11px] font-semibold uppercase tracking-[0.2em] text-slate-500">
              Atendimento
            </h3>
            <ul className="space-y-2 text-[11px] text-slate-400">
              {[
                "WhatsApp comercial",
                "Atendimento a construtoras",
                "Suporte a obras corporativas",
                "Fale com um especialista",
                "Central de pedidos",
              ].map((item) => (
                <li
                  key={item}
                  className="cursor-pointer transition-colors hover:text-slate-200"
                >
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <div className="space-y-4">
            <div>
              <h3 className="mb-3 text-[11px] font-semibold uppercase tracking-[0.2em] text-slate-500">
                Formas de pagamento
              </h3>
              <div className="flex flex-wrap gap-1.5">
                {["Cartão de crédito", "Boleto", "Pix", "Link de pagamento"].map(
                  (method) => (
                    <span
                      key={method}
                      className="rounded-full border border-slate-700/80 bg-slate-900/60 px-2 py-0.5 text-[10px] text-slate-300"
                    >
                      {method}
                    </span>
                  )
                )}
              </div>
            </div>
            <div className="flex items-start gap-2 rounded-xl border border-slate-800/80 bg-slate-900/40 px-3 py-2.5">
              <Shield size={13} className="mt-0.5 shrink-0 text-emerald-500" />
              <p className="text-[10px] text-slate-400 leading-relaxed">
                Ambiente seguro com criptografia SSL. Seus dados estão protegidos
                em todas as transações.
              </p>
            </div>
          </div>
        </div>

        <div className="mt-8 flex flex-col items-start justify-between gap-3 border-t border-slate-800/80 pt-5 text-[10px] text-slate-600 md:flex-row md:items-center">
          <p>
            © {new Date().getFullYear()} Celma Construções. Todos os direitos
            reservados.
          </p>
          <p className="text-slate-700">
            {/* TODO: Integrar com API/Database, ERP e plataforma de pagamento */}
            Plataforma em desenvolvimento contínuo.
          </p>
        </div>
      </div>
    </footer>
  );
}
