'use client';

import React, { useState } from 'react';
import { Mail, CheckCircle } from 'lucide-react';
import { motion } from 'framer-motion';

export default function Newsletter() {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setSubscribed(true);
    setEmail('');
  };

  return (
    <section className="py-20 bg-background relative overflow-hidden transition-colors duration-300">
      {/* Decorative Blur */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[250px] bg-secondary/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="bg-card border border-border/50 p-8 sm:p-12 rounded-3xl text-center space-y-6 shadow-sm">
          <div className="inline-flex p-3 bg-secondary/10 rounded-2xl text-secondary">
            <Mail className="h-6 w-6" />
          </div>

          <div className="space-y-2">
            <h2 className="text-2xl sm:text-3xl font-serif font-bold text-foreground">
              Clube CaféStoll
            </h2>
            <p className="text-muted-foreground text-sm sm:text-base max-w-md mx-auto">
              Assine nossa newsletter e receba convites para degustações exclusivas, lançamentos de microlotes e cupons especiais.
            </p>
          </div>

          {subscribed ? (
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="flex items-center justify-center gap-2 text-emerald-500 font-semibold text-sm pt-2"
            >
              <CheckCircle className="h-5 w-5" />
              Inscrição realizada com sucesso! Verifique sua caixa de entrada.
            </motion.div>
          ) : (
            <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row items-center gap-3 max-w-md mx-auto pt-2">
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Seu melhor e-mail"
                className="w-full px-4 py-3 bg-background border border-border rounded-xl focus:outline-none focus:ring-1 focus:ring-secondary text-foreground text-sm"
              />
              <button
                type="submit"
                className="w-full sm:w-auto px-6 py-3 bg-secondary text-secondary-foreground font-semibold rounded-xl hover:bg-secondary/95 active:scale-95 transition-all text-sm whitespace-nowrap"
              >
                Participar
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
