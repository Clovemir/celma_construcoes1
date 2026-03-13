"use client";

import { Star } from "lucide-react";

export function TestimonialsSection() {
  const testimonials = [
    {
      name: "João Silva",
      role: "Engenheiro Residente",
      content:
        "Excelente variedade de produtos e entrega super rápida. Recomendo para qualquer obra corporativa.",
      rating: 5,
    },
    {
      name: "Maria Santos",
      role: "Proprietária - Construtora",
      content:
        "Atendimento personalizado e consultoria técnica impecável. Parceria perfeita para nossas obras.",
      rating: 5,
    },
    {
      name: "Carlos Mendes",
      role: "Mestre de Obra",
      content:
        "Qualidade dos materiais é premium e os preços são competitivos. Voltarei a comprar com certeza.",
      rating: 5,
    },
  ];

  return (
    <section className="container">
      <div className="mb-8">
        <h2 className="text-lg font-semibold tracking-tight md:text-xl">
          O que nossos clientes dizem
        </h2>
        <p className="text-xs text-slate-400 md:text-sm">
          Confira os depoimentos de profissionais e construtoras que confiam na
          Celma Construções.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        {testimonials.map((testimonial) => (
          <div
            key={testimonial.name}
            className="glass-panel rounded-2xl p-6 flex flex-col justify-between hover:border-slate-600/50 transition-colors"
          >
            <div>
              <div className="flex gap-1 mb-4">
                {Array.from({ length: testimonial.rating }).map((_, i) => (
                  <Star
                    key={i}
                    className="h-4 w-4 fill-orange-400 text-orange-400"
                  />
                ))}
              </div>
              <p className="text-sm text-slate-100 mb-4">
                "{testimonial.content}"
              </p>
            </div>
            <div>
              <p className="text-sm font-semibold text-slate-50">
                {testimonial.name}
              </p>
              <p className="text-xs text-slate-400">{testimonial.role}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
