'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';

interface FaqItem {
  question: string;
  answer: string;
}

export default function Faq() {
  const faqs: FaqItem[] = [
    {
      question: 'Quais são os horários de funcionamento do CaféStoll?',
      answer: 'Funcionamos de segunda a sábado das 08:00 às 20:00, e aos domingos e feriados das 09:00 às 18:00.',
    },
    {
      question: 'Vocês oferecem opções veganas ou sem glúten?',
      answer: 'Sim! Nosso cardápio conta com leites vegetais (aveia e coco) para todas as bebidas quentes e geladas. Também servimos pães de queijo tradicionais e toasts no pão de fermentação natural, além de bolos sazonais veganos e livres de glúten.',
    },
    {
      question: 'Vocês vendem grãos de café para moer em casa?',
      answer: 'Com certeza! Vendemos nossos blends autorais e microlotes rotativos em embalagens de 250g. Se desejar, moemos os grãos na hora, configurando a espessura ideal para o seu método de preparo (Filtro, Prensa Francesa, Moka, etc).',
    },
    {
      question: 'É possível fazer reservas para reuniões ou eventos?',
      answer: 'Não trabalhamos com reservas de mesas individuais para garantir a circulação natural do espaço. No entanto, para eventos fechados, workshops ou locação do espaço fora do horário comercial, entre em contato pelo nosso formulário.',
    },
  ];

  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const toggleIndex = (index: number) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <section id="faq" className="py-24 bg-background transition-colors duration-300">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Title */}
        <div className="text-center mb-16 space-y-3">
          <span className="text-secondary font-semibold uppercase tracking-wider text-sm">FAQ</span>
          <h2 className="text-3xl sm:text-4xl font-bold font-serif text-foreground">
            Perguntas Frequentes
          </h2>
          <p className="text-muted-foreground font-light">
            Tem alguma dúvida sobre nosso atendimento, produtos ou café? Nós respondemos.
          </p>
        </div>

        {/* Accordions */}
        <div className="space-y-4">
          {faqs.map((faq, index) => {
            const isOpen = activeIndex === index;
            return (
              <div
                key={index}
                className="bg-card border border-border/40 hover:border-secondary/20 rounded-xl overflow-hidden shadow-sm transition-colors duration-300"
              >
                {/* Accordion Trigger Header */}
                <button
                  onClick={() => toggleIndex(index)}
                  className="w-full px-6 py-5 flex items-center justify-between text-left focus:outline-none"
                >
                  <span className="font-bold text-foreground text-sm sm:text-base pr-4">
                    {faq.question}
                  </span>
                  <motion.div
                    animate={{ rotate: isOpen ? 180 : 0 }}
                    transition={{ duration: 0.2 }}
                    className="text-secondary flex-shrink-0"
                  >
                    <ChevronDown className="h-5 w-5" />
                  </motion.div>
                </button>

                {/* Collapsible Panel */}
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25, ease: 'easeInOut' }}
                    >
                      <div className="px-6 pb-5 pt-1 text-muted-foreground text-sm sm:text-base leading-relaxed border-t border-border/30">
                        {faq.answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
