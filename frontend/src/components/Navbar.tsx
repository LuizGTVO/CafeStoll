'use client';

import React, { useState, useEffect } from 'react';
import { useCart } from '@/context/CartContext';
import { useTheme } from '@/context/ThemeContext';
import { ShoppingBag, Sun, Moon, Menu, X, Coffee, Shield } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';

interface NavbarProps {
  onCartOpen: () => void;
}

export default function Navbar({ onCartOpen }: NavbarProps) {
  const { cartCount } = useCart();
  const { theme, toggleTheme } = useTheme();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const logoTextClass = isScrolled ? 'text-foreground' : 'text-white';
  const navLinkTextClass = isScrolled ? 'text-foreground/80 hover:text-secondary' : 'text-white/90 hover:text-secondary';

  const navLinks = [
    { name: 'Início', href: '#inicio' },
    { name: 'Sobre', href: '#sobre' },
    { name: 'Destaques', href: '#destaques' },
    { name: 'Cardápio', href: '#cardapio' },
    { name: 'FAQ', href: '#faq' },
    { name: 'Contato', href: '#contato' },
  ];

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
          isScrolled
            ? 'bg-background/80 backdrop-blur-md border-b border-border/50 py-3 shadow-sm'
            : 'bg-transparent py-5'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <a href="#inicio" className="flex items-center gap-2 group">
              <Coffee className="text-secondary h-6 w-6 transition-transform group-hover:rotate-12 duration-300" />
              <span className={`text-xl sm:text-2xl font-bold font-serif tracking-wide transition-colors ${logoTextClass}`}>
                Café<span className="text-secondary">Stoll</span>
              </span>
            </a>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center gap-8">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  className={`text-sm font-medium hover:-translate-y-0.5 transition-all ${navLinkTextClass}`}
                >
                  {link.name}
                </a>
              ))}
            </nav>

            {/* Actions */}
            <div className="flex items-center gap-4">
              {/* Theme Toggle */}
              <button
                onClick={toggleTheme}
                aria-label="Toggle Theme"
                className={`p-2 hover:bg-muted/50 rounded-full transition-all ${navLinkTextClass}`}
              >
                {theme === 'dark' ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
              </button>

              {/* Cart Toggle */}
              <button
                onClick={onCartOpen}
                className={`p-2 hover:bg-muted/50 rounded-full transition-all relative ${navLinkTextClass}`}
              >
                <ShoppingBag className="h-5 w-5" />
                <AnimatePresence>
                  {cartCount > 0 && (
                    <motion.span
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      exit={{ scale: 0 }}
                      className="absolute -top-1 -right-1 bg-secondary text-secondary-foreground text-[10px] font-bold rounded-full h-5 w-5 flex items-center justify-center shadow"
                    >
                      {cartCount}
                    </motion.span>
                  )}
                </AnimatePresence>
              </button>

              {/* Admin Dashboard */}
              <Link
                href="/admin"
                aria-label="Painel Administrativo"
                className={`p-2 hover:bg-muted/50 rounded-full transition-all flex items-center justify-center ${navLinkTextClass}`}
              >
                <Shield className="h-5 w-5" />
              </Link>

              {/* Mobile Menu Toggle */}
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className={`md:hidden p-2 hover:bg-muted/50 rounded-full transition-all ${navLinkTextClass}`}
              >
                {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Menu Backdrop & Drawer */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.4 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMobileMenuOpen(false)}
              className="fixed inset-0 z-30 bg-black md:hidden"
            />
            {/* Mobile Drawer */}
            <motion.div
              initial={{ y: -100, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -100, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed top-[60px] left-0 right-0 z-30 bg-card border-b border-border shadow-lg p-6 md:hidden flex flex-col gap-4"
            >
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="text-base font-semibold text-foreground hover:text-secondary py-2 border-b border-border/40"
                >
                  {link.name}
                </a>
              ))}
              <Link
                href="/admin"
                onClick={() => setIsMobileMenuOpen(false)}
                className="text-base font-semibold text-secondary hover:text-secondary/80 py-2 flex items-center gap-2 border-t border-border/40 mt-1 pt-3"
              >
                <Shield className="h-4.5 w-4.5" />
                Painel Administrativo
              </Link>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
