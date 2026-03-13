"use client";

import { useState } from "react";
import { useUiStore } from "@/store/ui-store";
import { MessageCircle, X, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export function SupportWidget() {
  const panel = useUiStore((s) => s.panel);
  const togglePanel = useUiStore((s) => s.togglePanel);
  const [message, setMessage] = useState("");

  const open = panel === "support";

  return (
    <>
      <button
        className="fixed bottom-5 right-5 z-40 inline-flex h-11 w-11 items-center justify-center rounded-full bg-gradient-to-br from-orange-500 to-amber-400 text-slate-950 shadow-soft hover:brightness-110 md:bottom-7 md:right-7"
        onClick={() => togglePanel("support")}
        aria-label="Abrir suporte"
      >
        <MessageCircle size={20} />
      </button>
      {open && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed bottom-20 right-4 z-40 w-72 rounded-2xl border border-slate-800/90 bg-slate-950/98 shadow-soft md:bottom-24 md:right-7 md:w-80"
        >
          <div className="flex items-center justify-between border-b border-slate-800/90 px-4 py-3">
            <div>
              <p className="text-xs font-semibold text-slate-50">
                Chat com colaboradores
              </p>
              <p className="text-[10px] text-slate-400">
                Time online em horário comercial.
              </p>
            </div>
            <button
              onClick={() => togglePanel(null)}
              className="text-slate-500 hover:text-slate-200"
            >
              <X size={14} />
            </button>
          </div>
          <div className="flex max-h-64 flex-col justify-between gap-3 px-4 py-3 text-[11px] text-slate-200">
            <div className="space-y-2">
              <div className="max-w-[85%] rounded-2xl rounded-bl-sm bg-slate-900/90 px-3 py-2">
                <p className="font-medium">Bem-vindo à Celma Construções 👋</p>
                <p className="mt-1 text-slate-300">
                  Envie sua lista de materiais ou dúvidas sobre produtos. Nossa
                  equipe retorna com uma sugestão completa.
                </p>
              </div>
              <div className="max-w-[80%] rounded-2xl rounded-br-sm border border-dashed border-slate-700/80 bg-slate-950/80 px-3 py-2 text-slate-400">
                Simulação de chat para prototipagem. Integração com plataforma
                de atendimento pode ser adicionada futuramente.
                {/* TODO: Integrar com API/Database */}
              </div>
            </div>
            <form
              className="flex items-center gap-2 pt-1"
              onSubmit={(e) => {
                e.preventDefault();
                setMessage("");
              }}
            >
              <Input
                placeholder="Digite uma mensagem..."
                className="h-8 text-[11px]"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
              />
              <Button
                type="submit"
                size="icon"
                variant="subtle"
                className="h-8 w-8 rounded-full"
              >
                <Send size={14} />
              </Button>
            </form>
          </div>
        </div>
      )}
    </>
  );
}

