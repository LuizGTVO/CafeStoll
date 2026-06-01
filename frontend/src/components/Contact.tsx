'use client';

import React, { useState } from 'react';
import { MapPin, Phone, Mail, Clock, Send, CheckCircle2 } from 'lucide-react';
import { motion } from 'framer-motion';

export default function Contact() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [msg, setMsg] = useState('');
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !msg) return;
    setSent(true);
    setName('');
    setEmail('');
    setMsg('');
  };

  const contactInfo = [
    {
      icon: <MapPin className="h-5 w-5 text-secondary" />,
      title: 'Endereço',
      content: 'Rua das Flores, 123 - Savassi, Belo Horizonte - MG',
    },
    {
      icon: <Phone className="h-5 w-5 text-secondary" />,
      title: 'Telefone',
      content: '(31) 3456-7890 / (31) 98765-4321',
    },
    {
      icon: <Mail className="h-5 w-5 text-secondary" />,
      title: 'E-mail',
      content: 'contato@cafestoll.com.br',
    },
    {
      icon: <Clock className="h-5 w-5 text-secondary" />,
      title: 'Horário de Atendimento',
      content: 'Seg - Sab: 08h às 20h | Dom: 09h às 18h',
    },
  ];

  return (
    <section id="contato" className="py-24 bg-card transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Title */}
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
          <span className="text-secondary font-semibold uppercase tracking-wider text-sm">Contato</span>
          <h2 className="text-3xl sm:text-4xl font-bold font-serif text-foreground">
            Fale Conosco
          </h2>
          <p className="text-muted-foreground font-light text-sm sm:text-base">
            Dúvidas, sugestões, eventos ou feedbacks? Mande uma mensagem, adoraríamos conversar com você.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Info Panel */}
          <motion.div
            initial={{ opacity: 0, x: -35 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-5 space-y-8"
          >
            <div className="space-y-4">
              <h3 className="text-2xl font-serif font-bold text-foreground">Visite nosso espaço</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                Venha saborear um café coado na hora em nosso deck de madeira cercado de plantas, ou traga seu notebook para uma tarde produtiva.
              </p>
            </div>

            <div className="space-y-6">
              {contactInfo.map((info, i) => (
                <div key={i} className="flex gap-4 items-start">
                  <div className="p-3 bg-background border border-border/50 rounded-xl">
                    {info.icon}
                  </div>
                  <div>
                    <h4 className="font-bold text-foreground text-sm">{info.title}</h4>
                    <p className="text-muted-foreground text-sm mt-0.5">{info.content}</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Form Panel */}
          <motion.div
            initial={{ opacity: 0, x: 35 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-7 bg-background border border-border/40 p-8 rounded-3xl shadow-sm"
          >
            {sent ? (
              <motion.div
                initial={{ scale: 0.95, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="flex flex-col items-center justify-center text-center py-12 space-y-4"
              >
                <CheckCircle2 className="h-14 w-14 text-emerald-500 animate-pulse" />
                <h4 className="text-xl font-bold font-serif text-foreground">Mensagem Enviada!</h4>
                <p className="text-muted-foreground text-sm max-w-sm">
                  Agradecemos seu contato. Responderemos no endereço de e-mail fornecido em até 24 horas úteis.
                </p>
                <button
                  onClick={() => setSent(false)}
                  className="px-6 py-2 border border-border hover:bg-muted text-foreground font-semibold rounded-lg text-sm transition-colors"
                >
                  Enviar Nova Mensagem
                </button>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label className="text-xs font-semibold text-muted-foreground block mb-2">
                      Seu Nome
                    </label>
                    <input
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Ex: Pedro de Souza"
                      className="w-full px-4 py-3 bg-card border border-border rounded-xl focus:outline-none focus:ring-1 focus:ring-secondary text-foreground text-sm"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-semibold text-muted-foreground block mb-2">
                      Seu E-mail
                    </label>
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Ex: pedro@email.com"
                      className="w-full px-4 py-3 bg-card border border-border rounded-xl focus:outline-none focus:ring-1 focus:ring-secondary text-foreground text-sm"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-xs font-semibold text-muted-foreground block mb-2">
                    Mensagem
                  </label>
                  <textarea
                    required
                    rows={5}
                    value={msg}
                    onChange={(e) => setMsg(e.target.value)}
                    placeholder="Escreva sua mensagem aqui..."
                    className="w-full px-4 py-3 bg-card border border-border rounded-xl focus:outline-none focus:ring-1 focus:ring-secondary text-foreground text-sm resize-none"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3 bg-secondary text-secondary-foreground font-semibold rounded-xl hover:bg-secondary/95 active:scale-95 transition-all text-sm flex items-center justify-center gap-2 shadow-sm"
                >
                  <Send className="h-4 w-4" />
                  Enviar Mensagem
                </button>
              </form>
            )}
          </motion.div>
        </div>

      </div>
    </section>
  );
}
