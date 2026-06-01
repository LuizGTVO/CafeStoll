'use client';

import React, { useEffect, useState } from 'react';
import { getCategories, getProducts, Category, Product } from '@/lib/api';
import { useCart } from '@/context/CartContext';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Coffee, Sparkles } from 'lucide-react';

interface MenuProps {
  onViewProduct?: (product: Product) => void;
}

export default function Menu({ onViewProduct }: MenuProps) {
  const { addToCart } = useCart();
  const [categories, setCategories] = useState<Category[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [loadingCats, setLoadingCats] = useState(true);
  const [loadingProds, setLoadingProds] = useState(true);

  // Load Categories on mount
  useEffect(() => {
    async function loadCategories() {
      try {
        const data = await getCategories();
        setCategories(data);
      } catch (err) {
        console.error('Failed to load categories', err);
      } finally {
        setLoadingCats(false);
      }
    }
    loadCategories();
  }, []);

  // Load Products when activeCategory changes
  useEffect(() => {
    async function loadProducts() {
      setLoadingProds(true);
      try {
        const catFilter = activeCategory === 'all' ? undefined : activeCategory;
        const data = await getProducts(catFilter);
        setProducts(data);
      } catch (err) {
        console.error('Failed to load products', err);
      } finally {
        setLoadingProds(false);
      }
    }
    loadProducts();
  }, [activeCategory]);

  return (
    <section id="cardapio" className="py-24 bg-card transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Title Header */}
        <div className="text-center max-w-2xl mx-auto mb-12 space-y-3">
          <span className="text-secondary font-semibold uppercase tracking-wider text-sm">Nosso Menu</span>
          <h2 className="text-3xl sm:text-4xl font-bold font-serif text-foreground">
            Explore o Cardápio Completo
          </h2>
          <p className="text-muted-foreground font-light text-sm sm:text-base">
            Grãos selecionados torrados artesanalmente, acompanhados de delícias doces e salgadas preparadas na nossa cozinha.
          </p>
        </div>

        {/* Categories Tabs Selector */}
        {!loadingCats && (
          <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 mb-12 max-w-4xl mx-auto">
            <button
              onClick={() => setActiveCategory('all')}
              className={`px-5 py-2.5 rounded-full text-sm font-semibold transition-all ${
                activeCategory === 'all'
                  ? 'bg-secondary text-secondary-foreground shadow-md'
                  : 'bg-background hover:bg-muted border border-border/50 text-foreground/80'
              }`}
            >
              Todos os Itens
            </button>
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.slug)}
                className={`px-5 py-2.5 rounded-full text-sm font-semibold transition-all ${
                  activeCategory === cat.slug
                    ? 'bg-secondary text-secondary-foreground shadow-md'
                    : 'bg-background hover:bg-muted border border-border/50 text-foreground/80'
                }`}
              >
                {cat.name}
              </button>
            ))}
          </div>
        )}

        {/* Products Grid with Layout Animations */}
        <div className="min-h-96">
          {loadingProds ? (
            /* Skeletons */
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
              {[1, 2, 4, 5].map((n) => (
                <div key={n} className="bg-background border border-border/50 rounded-xl h-32 animate-pulse" />
              ))}
            </div>
          ) : products.length === 0 ? (
            /* Empty state */
            <div className="text-center py-20 text-muted-foreground space-y-2">
              <Coffee className="h-10 w-10 mx-auto stroke-1 opacity-60" />
              <p className="font-semibold">Nenhum item nesta categoria.</p>
            </div>
          ) : (
            /* Items List */
            <motion.div
              layout
              className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto animate-fade-in"
            >
              <AnimatePresence mode="popLayout">
                {products.map((item) => (
                  <motion.div
                    layout
                    key={item.id}
                    initial={{ opacity: 0, scale: 0.98 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.98 }}
                    transition={{ duration: 0.3 }}
                    className="flex gap-4 p-4 bg-background border border-border/50 hover:border-secondary/30 rounded-2xl shadow-sm hover:shadow-md transition-all group"
                  >
                    {/* Thumbnail */}
                    <div 
                      onClick={() => onViewProduct?.(item)}
                      className="relative h-24 w-24 sm:h-28 sm:w-28 flex-shrink-0 overflow-hidden rounded-xl bg-muted cursor-pointer"
                    >
                      <img
                        src={item.imageUrl}
                        alt={item.name}
                        onError={(e) => {
                          e.currentTarget.src = 'https://images.unsplash.com/photo-1509042239860-f550ce710b93?q=80&w=600&auto=format&fit=crop';
                        }}
                        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                    </div>

                    {/* Details Info */}
                    <div className="flex-1 flex flex-col justify-between min-w-0">
                      <div>
                        <div className="flex justify-between items-start gap-4">
                          <h3 
                            onClick={() => onViewProduct?.(item)}
                            className="font-serif font-bold text-base sm:text-lg text-foreground group-hover:text-secondary transition-colors truncate cursor-pointer"
                          >
                            {item.name}
                          </h3>
                          <span className="text-secondary font-bold text-sm sm:text-base whitespace-nowrap">
                            R$ {item.price.toFixed(2)}
                          </span>
                        </div>
                        <p className="text-muted-foreground text-xs sm:text-sm line-clamp-2 mt-1">
                          {item.description}
                        </p>
                      </div>

                      {/* Cart trigger button and View more */}
                      <div className="flex justify-between items-center mt-2 gap-2">
                        {onViewProduct && (
                          <button
                            onClick={() => onViewProduct(item)}
                            className="text-secondary hover:text-secondary/80 text-xs font-semibold transition-all hover:underline"
                          >
                            Ver mais
                          </button>
                        )}
                        <button
                          onClick={() => addToCart(item)}
                          className="px-3 py-1.5 bg-secondary/10 hover:bg-secondary text-secondary hover:text-secondary-foreground text-xs font-semibold rounded-lg transition-all flex items-center gap-1 active:scale-95"
                        >
                          <Plus className="h-3.5 w-3.5" />
                          Adicionar
                        </button>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </motion.div>
          )}
        </div>

      </div>
    </section>
  );
}
