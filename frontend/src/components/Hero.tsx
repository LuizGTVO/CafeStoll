'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Sparkles } from 'lucide-react';

export default function Hero() {
  return (
    <section
      id="inicio"
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-zinc-950 pt-20"
    >
      {/* Background Image overlay */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1498804103079-a6351b050096?q=80&w=1920&auto=format&fit=crop"
          alt="CaféStoll Ambiente"
          className="w-full h-full object-cover object-center opacity-55 scale-105 transform transition duration-[10s] hover:scale-100"
        />
        {/* Dark warm gradient blend */}
        <div className="absolute inset-0 bg-gradient-to-t from-background/95 via-black/45 to-black/60" />
      </div>

      {/* Floating Particles/Beans simulation */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-[20%] left-[10%] w-3 h-3 bg-secondary/20 rounded-full blur-sm animate-pulse" />
        <div className="absolute bottom-[30%] right-[15%] w-4 h-4 bg-secondary/30 rounded-full blur-md animate-pulse" style={{ animationDelay: '2s' }} />
      </div>

      {/* Hero Content */}
      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-secondary/10 border border-secondary/35 text-secondary text-sm font-semibold mb-2"
        >
          <Sparkles className="h-4 w-4" />
          <span>Cafeteria Premium & Grãos Selecionados</span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: 'easeOut' }}
          className="text-4xl sm:text-6xl md:text-7xl font-bold font-serif text-white tracking-tight leading-none"
        >
          Onde a arte encontra <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-secondary to-coffee-300">
            o espresso perfeito
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4, ease: 'easeOut' }}
          className="max-w-2xl mx-auto text-lg sm:text-xl text-zinc-300 font-light"
        >
          No CaféStoll, transformamos grãos nobres em experiências sensoriais memoráveis. 
          Combine com nossos folhados artesanais assados diariamente.
        </motion.p>

        {/* Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6, ease: 'easeOut' }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4"
        >
          <a
            href="#cardapio"
            className="w-full sm:w-auto px-8 py-4 bg-secondary text-secondary-foreground font-semibold rounded-lg shadow-lg hover:bg-secondary/95 hover:scale-105 active:scale-95 transition-all flex items-center justify-center gap-2 group"
          >
            Explorar Cardápio
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </a>
          <a
            href="#sobre"
            className="w-full sm:w-auto px-8 py-4 bg-white/10 hover:bg-white/15 text-white font-semibold rounded-lg backdrop-blur-sm border border-white/20 hover:scale-105 active:scale-95 transition-all flex items-center justify-center"
          >
            Conhecer Nossa História
          </a>
        </motion.div>
      </div>

      {/* Decorative Wave/Transition */}
      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-background to-transparent pointer-events-none" />
    </section>
  );
}
