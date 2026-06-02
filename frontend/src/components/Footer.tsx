'use client';

import React from 'react';
import { Coffee } from 'lucide-react';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-zinc-950 text-zinc-400 py-16 border-t border-zinc-900 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12 pb-12 border-b border-zinc-900">
          
          {/* Brand Info */}
          <div className="md:col-span-5 space-y-4">
            <a href="#inicio" className="flex items-center gap-2 text-white font-serif font-bold text-2xl tracking-wide">
              <Coffee className="text-secondary h-6 w-6" />
              <span>Café<span className="text-secondary">Stoll</span></span>
            </a>
            <p className="text-zinc-400 text-sm leading-relaxed max-w-sm">
              Mais do que uma cafeteria, somos apaixonados por extrair experiências inesquecíveis em torno de cafés nobres e doçura artesanal.
            </p>
            <div className="flex gap-4 pt-2">
              <a href="#" className="p-2 hover:bg-zinc-900 hover:text-white rounded-full transition-all" aria-label="Instagram">
                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                </svg>
              </a>
              <a href="#" className="p-2 hover:bg-zinc-900 hover:text-white rounded-full transition-all" aria-label="Facebook">
                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
                </svg>
              </a>
              <a href="#" className="p-2 hover:bg-zinc-900 hover:text-white rounded-full transition-all" aria-label="Youtube">
                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M22.54 6.42a2.78 2.78 0 0 0-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46a2.78 2.78 0 0 0-1.95 1.96A29 29 0 0 0 1 12a29 29 0 0 0 .46 5.58 2.78 2.78 0 0 0 1.95 1.96C5.12 20 12 20 12 20s6.88 0 8.59-.46a2.78 2.78 0 0 0 1.95-1.96A29 29 0 0 0 23 12a29 29 0 0 0-.46-5.58z"></path>
                  <polygon points="9.75 15.02 15.5 12 9.75 8.98 9.75 15.02"></polygon>
                </svg>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="md:col-span-3 space-y-4">
            <h4 className="text-white font-serif font-bold text-base">Links Úteis</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="#inicio" className="hover:text-white transition-colors">Início</a>
              </li>
              <li>
                <a href="#sobre" className="hover:text-white transition-colors">Sobre Nós</a>
              </li>
              <li>
                <a href="#destaques" className="hover:text-white transition-colors">Produtos em Destaque</a>
              </li>
              <li>
                <a href="#cardapio" className="hover:text-white transition-colors">Cardápio do Dia</a>
              </li>
            </ul>
          </div>

          {/* Sched & Address */}
          <div className="md:col-span-4 space-y-4">
            <h4 className="text-white font-serif font-bold text-base">Unidade Centro</h4>
            <p className="text-zinc-400 text-sm">
              Avenida da Praia, 456 - Centro, Caraguatatuba - SP
            </p>
            <div className="space-y-1 text-sm">
              <p><span className="text-zinc-500">Seg a Sáb:</span> 08:00 às 20:00</p>
              <p><span className="text-zinc-500">Dom e Feriados:</span> 09:00 às 18:00</p>
            </div>
          </div>

        </div>

        {/* Copy */}
        <div className="pt-8 flex flex-col sm:flex-row justify-between items-center text-xs text-zinc-500 gap-4">
          <p>&copy; {currentYear} CaféStoll. Todos os direitos reservados.</p>
          <div className="flex gap-6">
            <a href="#" className="hover:underline">Políticas de Privacidade</a>
            <a href="#" className="hover:underline">Termos de Uso</a>
          </div>
        </div>

      </div>
    </footer>
  );
}
