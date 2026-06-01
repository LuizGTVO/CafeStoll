'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Star, Quote } from 'lucide-react';

export default function Testimonials() {
  const reviews = [
    {
      name: 'Mariana Costa',
      role: 'Cliente Assídua',
      content: 'O melhor espresso duplo da cidade! O croissant de amêndoas é levíssimo, crocante por fora e muito bem recheado. Virou minha rotina de sábado de manhã.',
      stars: 5,
    },
    {
      name: 'Roberto Ramos',
      role: 'Crítico Gastronômico',
      content: 'O blend autoral do CaféStoll surpreende pelo equilíbrio, acidez cítrica brilhante e finalização doce com notas persistentes de cacau. Um padrão de barista internacional.',
      stars: 5,
    },
    {
      name: 'Julia Mendes',
      role: 'Trabalho Remoto',
      content: 'Ambiente aconchegante, wi-fi rápido, tomadas acessíveis e, claro, opções de chás e cafés que mantêm minha produtividade alta. A toast de avocado é incrível!',
      stars: 5,
    },
  ];

  return (
    <section className="py-24 bg-card transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Title */}
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
          <span className="text-secondary font-semibold uppercase tracking-wider text-sm">Depoimentos</span>
          <h2 className="text-3xl sm:text-4xl font-bold font-serif text-foreground">
            O que dizem os amantes de café
          </h2>
          <p className="text-muted-foreground font-light text-sm sm:text-base">
            Buscamos extrair o melhor de cada grão e criar momentos especiais para quem nos visita.
          </p>
        </div>

        {/* Reviews Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {reviews.map((rev, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.6, delay: idx * 0.15 }}
              className="bg-background border border-border/40 hover:border-secondary/20 p-8 rounded-2xl shadow-sm relative flex flex-col justify-between group"
            >
              {/* Quote Mark Decoration */}
              <Quote className="absolute top-6 right-6 h-10 w-10 text-secondary/10 group-hover:text-secondary/15 transition-colors" />

              {/* Stars */}
              <div className="flex gap-1 mb-6">
                {[...Array(rev.stars)].map((_, i) => (
                  <Star key={i} className="h-4 w-4 fill-secondary text-secondary" />
                ))}
              </div>

              {/* Message */}
              <p className="text-muted-foreground text-sm leading-relaxed mb-6 italic">
                "{rev.content}"
              </p>

              {/* Reviewer Details */}
              <div className="border-t border-border/50 pt-4 flex items-center gap-3">
                <div className="h-10 w-10 bg-secondary/10 text-secondary font-bold font-serif rounded-full flex items-center justify-center text-sm">
                  {rev.name.charAt(0)}
                </div>
                <div>
                  <h4 className="font-bold text-foreground text-sm">{rev.name}</h4>
                  <p className="text-muted-foreground text-xs">{rev.role}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
