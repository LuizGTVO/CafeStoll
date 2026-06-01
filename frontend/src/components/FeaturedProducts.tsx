'use client';

import React, { useEffect, useState } from 'react';
import { getProducts, Product } from '@/lib/api';
import { useCart } from '@/context/CartContext';
import { motion } from 'framer-motion';
import { Plus, Sparkles, AlertCircle } from 'lucide-react';

interface FeaturedProductsProps {
  onViewProduct?: (product: Product) => void;
}

export default function FeaturedProducts({ onViewProduct }: FeaturedProductsProps) {
  const { addToCart } = useCart();
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadFeatured() {
      try {
        const data = await getProducts(undefined, true);
        setProducts(data);
      } catch (err) {
        console.error('Failed to load featured products', err);
      } finally {
        setLoading(false);
      }
    }
    loadFeatured();
  }, []);

  return (
    <section id="destaques" className="py-24 bg-background transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
          <span className="text-secondary font-semibold uppercase tracking-wider text-sm">Mais Pedidos</span>
          <h2 className="text-3xl sm:text-4xl font-bold font-serif text-foreground">
            Destaques da Nossa Bancada
          </h2>
          <p className="text-muted-foreground font-light">
            Alguns de nossos clássicos e criações sazonais favoritos dos nossos clientes regulares.
          </p>
        </div>

        {/* Loading state */}
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3].map((n) => (
              <div key={n} className="bg-card border border-border/50 rounded-2xl h-96 animate-pulse" />
            ))}
          </div>
        ) : products.length === 0 ? (
          <div className="flex flex-col items-center justify-center p-12 text-center text-muted-foreground bg-card border border-border/50 rounded-2xl max-w-md mx-auto space-y-2">
            <AlertCircle className="h-10 w-10 text-secondary" />
            <p className="font-semibold">Nenhum destaque disponível</p>
            <p className="text-sm">Por favor, verifique se a API do backend está rodando.</p>
          </div>
        ) : (
          /* Products Grid */
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {products.slice(0, 3).map((product, idx) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 35 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.6, delay: idx * 0.1 }}
                className="group relative bg-card border border-border/40 hover:border-secondary/40 rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col h-full animate-fade-in-up"
              >
                {/* Image & Badge */}
                <div 
                  onClick={() => onViewProduct?.(product)}
                  className="relative h-64 overflow-hidden bg-muted cursor-pointer"
                >
                  <img
                    src={product.imageUrl}
                    alt={product.name}
                    onError={(e) => {
                      e.currentTarget.src = 'https://images.unsplash.com/photo-1509042239860-f550ce710b93?q=80&w=600&auto=format&fit=crop';
                    }}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-black/45 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <span className="bg-background/90 text-foreground px-4 py-2 rounded-full text-xs font-semibold shadow-md transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                      Ver Detalhes
                    </span>
                  </div>
                  <div className="absolute top-4 left-4 bg-secondary text-secondary-foreground text-[10px] font-bold uppercase tracking-wider px-3 py-1 rounded-full flex items-center gap-1 shadow-md">
                    <Sparkles className="h-3 w-3" />
                    Destaque
                  </div>
                </div>

                {/* Body Details */}
                <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                  <div className="space-y-2">
                    <div className="flex justify-between items-start gap-4">
                      <h3 
                        onClick={() => onViewProduct?.(product)}
                        className="font-serif font-bold text-lg text-foreground group-hover:text-secondary transition-colors cursor-pointer"
                      >
                        {product.name}
                      </h3>
                      <span className="text-secondary font-bold text-base whitespace-nowrap">
                        R$ {product.price.toFixed(2)}
                      </span>
                    </div>
                    <p className="text-muted-foreground text-sm line-clamp-3">
                      {product.description}
                    </p>
                  </div>

                  {/* CTA Buttons */}
                  <div className="flex flex-col gap-2">
                    <button
                      onClick={() => addToCart(product)}
                      className="w-full py-2.5 bg-secondary text-secondary-foreground hover:bg-secondary/90 active:scale-95 text-sm font-semibold rounded-lg shadow-sm hover:shadow-md transition-all flex items-center justify-center gap-2"
                    >
                      <Plus className="h-4 w-4" />
                      Adicionar ao Carrinho
                    </button>
                    {onViewProduct && (
                      <button
                        onClick={() => onViewProduct(product)}
                        className="w-full py-2 bg-transparent hover:bg-muted text-foreground/80 hover:text-foreground text-xs font-semibold rounded-lg transition-all"
                      >
                        Ver Detalhes
                      </button>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
