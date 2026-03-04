export function Footer() {
  return (
    <footer className="mt-10 border-t border-slate-800/80 bg-slate-950/95">
      <div className="container py-8 text-xs text-slate-400 md:py-10">
        <div className="grid gap-8 md:grid-cols-4">
          <div className="space-y-3">
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
          </div>

          <div>
            <h3 className="mb-3 text-[11px] font-semibold uppercase tracking-[0.2em] text-slate-500">
              Institucional
            </h3>
            <ul className="space-y-1.5 text-[11px]">
              <li>Quem somos</li>
              <li>Política de privacidade</li>
              <li>Trocas e devoluções</li>
              <li>Política de entrega</li>
            </ul>
          </div>

          <div>
            <h3 className="mb-3 text-[11px] font-semibold uppercase tracking-[0.2em] text-slate-500">
              Atendimento
            </h3>
            <ul className="space-y-1.5 text-[11px]">
              <li>WhatsApp comercial</li>
              <li>Atendimento a construtoras</li>
              <li>Suporte a obras corporativas</li>
              <li>Fale com um especialista</li>
            </ul>
          </div>

          <div>
            <h3 className="mb-3 text-[11px] font-semibold uppercase tracking-[0.2em] text-slate-500">
              Pagamento e segurança
            </h3>
            <div className="mb-3 flex flex-wrap gap-1.5 text-[10px] text-slate-300">
              <span className="rounded-full border border-slate-700/80 px-2 py-0.5">
                Cartão de crédito
              </span>
              <span className="rounded-full border border-slate-700/80 px-2 py-0.5">
                Boleto
              </span>
              <span className="rounded-full border border-slate-700/80 px-2 py-0.5">
                Pix
              </span>
              <span className="rounded-full border border-slate-700/80 px-2 py-0.5">
                Link de pagamento
              </span>
            </div>
            <p className="text-[10px] text-slate-500">
              Ambiente seguro com criptografia e certificação SSL.
            </p>
          </div>
        </div>

        <div className="mt-8 flex flex-col items-start justify-between gap-4 border-t border-slate-800/80 pt-4 text-[10px] text-slate-500 md:flex-row md:items-center">
          <p>
            © {new Date().getFullYear()} Celma Construções. Todos os direitos
            reservados.
          </p>
          <p>
            Interface concebida para evolução contínua e integração com
            plataformas de pagamento e ERP. {/* TODO: Integrar com API/Database */}
          </p>
        </div>
      </div>
    </footer>
  );
}

