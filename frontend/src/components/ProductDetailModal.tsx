'use client';

import React, { useState, useEffect } from 'react';
import { Product } from '@/lib/api';
import { useCart } from '@/context/CartContext';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Star, Clock, ShoppingBag, Check, AlertTriangle, ChevronLeft, ChevronRight } from 'lucide-react';

interface ProductDetailModalProps {
  product: Product | null;
  onClose: () => void;
}

interface ProductMetadata {
  ingredients: string[];
  allergens: string[];
  prepTime: string;
  rating: number;
  reviewsCount: number;
}

// Custom metadata mapping helper
const getProductMetadata = (product: Product): ProductMetadata => {
  const name = product.name.toLowerCase();
  
  if (name.includes('espresso stoll')) {
    return {
      ingredients: ['Grãos 100% Arábica Selecionados', 'Água Mineral Filtrada', 'Notas naturais de Cacau e Avelã'],
      allergens: ['Não contém glúten', 'Livre de lactose', 'Livre de açúcares adicionados'],
      prepTime: '2-3 min',
      rating: 4.9,
      reviewsCount: 184
    };
  }
  if (name.includes('cappuccino')) {
    return {
      ingredients: ['Espresso Duplo Concentrado', 'Leite Integral Vaporizado', 'Polvilho de Cacau 100%', 'Canela em pó (opcional)'],
      allergens: ['Contém lactose', 'Não contém glúten', 'Pode conter traços de soja'],
      prepTime: '3-4 min',
      rating: 4.8,
      reviewsCount: 142
    };
  }
  if (name.includes('latte')) {
    return {
      ingredients: ['Espresso Curto Premium', 'Leite Integral Vaporizado Cremoso', 'Microespuma texturizada'],
      allergens: ['Contém lactose', 'Não contém glúten'],
      prepTime: '3-4 min',
      rating: 4.7,
      reviewsCount: 96
    };
  }
  if (name.includes('cold brew')) {
    return {
      ingredients: ['Café Especial extraído a frio por 18 horas', 'Fatias de Limão Siciliano', 'Água tônica artesanal', 'Gelo triturado'],
      allergens: ['Não contém glúten', 'Livre de lactose'],
      prepTime: '2 min',
      rating: 4.9,
      reviewsCount: 78
    };
  }
  if (name.includes('pão de queijo')) {
    return {
      ingredients: ['Polvilho Doce/Azedo de alta qualidade', 'Queijo da Serra da Canastra Curado legítimo', 'Ovos caipiras frescos', 'Leite integral e óleo'],
      allergens: ['Contém lactose', 'Contém ovos', 'Não contém glúten'],
      prepTime: '10-12 min (assado na hora)',
      rating: 5.0,
      reviewsCount: 250
    };
  }
  if (name.includes('croissant')) {
    return {
      ingredients: ['Farinha de trigo premium importada', 'Manteiga extra francesa extra-fina', 'Creme frangipane de amêndoas', 'Amêndoas laminadas e açúcar impalpável'],
      allergens: ['Contém glúten', 'Contém derivados de trigo', 'Contém amêndoas e castanhas', 'Contém lactose'],
      prepTime: '5-8 min (aquecimento ideal)',
      rating: 4.9,
      reviewsCount: 112
    };
  }
  if (name.includes('torta de nozes') || name.includes('torta')) {
    return {
      ingredients: ['Massa folhada fina e amanteigada', 'Doce de leite artesanal de Viçosa', 'Nozes pecan chilenas selecionadas', 'Cobertura de Ganache meio amargo'],
      allergens: ['Contém glúten', 'Contém lactose', 'Contém ovos', 'Contém nozes e castanhas'],
      prepTime: '3 min',
      rating: 4.8,
      reviewsCount: 84
    };
  }
  if (name.includes('toast')) {
    return {
      ingredients: ['Pão de fermentação natural (Levain) grelhado', 'Avocado temperado com limão e azeite extra virgem', 'Ovo poché com gema mole', 'Sementes de girassol e abóbora tostadas', 'Toque de páprica defumada'],
      allergens: ['Contém glúten', 'Contém ovos', 'Pode conter traços de lactose'],
      prepTime: '8-10 min',
      rating: 4.7,
      reviewsCount: 130
    };
  }

  // Fallback for dynamic products
  const isBakery = name.includes('pão') || name.includes('bolo') || name.includes('torta') || name.includes('croissant') || name.includes('toast') || name.includes('salgado') || name.includes('doce') || name.includes('cookie') || name.includes('empanada');
  
  if (isBakery) {
    return {
      ingredients: ['Farinha de trigo enriquecida', 'Manteiga premium selecionada', 'Ingredientes frescos de confeitaria local', 'Segredo especial do chef'],
      allergens: ['Contém glúten', 'Contém lactose', 'Pode conter ovos e traços de castanhas'],
      prepTime: '5-7 min',
      rating: 4.8,
      reviewsCount: Math.floor(Math.random() * 30) + 12
    };
  } else {
    return {
      ingredients: ['Grãos de café especial torrados artesanalmente', 'Água mineral pura filtrada', 'Opção de leite ou acompanhamentos sob demanda'],
      allergens: ['Pode conter lactose (se adicionado leite)', 'Não contém glúten'],
      prepTime: '3-5 min',
      rating: 4.9,
      reviewsCount: Math.floor(Math.random() * 40) + 15
    };
  }
};

// Image gallery resolver helper
const getProductImages = (product: Product): string[] => {
  const images = [product.imageUrl];
  const name = product.name.toLowerCase();

  // Pick suitable close-ups based on category
  const isCoffee = product.categoryId.includes('cat-1') || 
                   product.categoryId.includes('cat-2') ||
                   name.includes('café') || 
                   name.includes('coffee') || 
                   name.includes('espresso') || 
                   name.includes('latte') || 
                   name.includes('macchiato') || 
                   name.includes('cappuccino') ||
                   name.includes('brew');

  if (isCoffee) {
    images.push(
      "https://images.unsplash.com/photo-1541167760496-1628856ab772?q=80&w=600&auto=format&fit=crop", // latte art
      "https://images.unsplash.com/photo-1447933601403-0c6688de566e?q=80&w=600&auto=format&fit=crop", // coffee beans
      "https://images.unsplash.com/photo-1509042239860-f550ce710b93?q=80&w=600&auto=format&fit=crop"  // clean warm cup
    );
  } else {
    images.push(
      "https://images.unsplash.com/photo-1509440159596-0249088772ff?q=80&w=600&auto=format&fit=crop", // bakery preparation
      "https://images.unsplash.com/photo-1555507036-ab1f4038808a?q=80&w=600&auto=format&fit=crop", // croissant detail
      "https://images.unsplash.com/photo-1587314168485-3236d6710814?q=80&w=600&auto=format&fit=crop"  // sweet slice
    );
  }
  return images;
};

export default function ProductDetailModal({ product, onClose }: ProductDetailModalProps) {
  const { addToCart } = useCart();
  const [activeImageIdx, setActiveImageIdx] = useState(0);
  const [addedMessage, setAddedMessage] = useState(false);
  const [selectedSize, setSelectedSize] = useState<'standard' | 'large'>('standard');

  // Lock body scroll when modal is open
  useEffect(() => {
    if (product) {
      document.body.style.overflow = 'hidden';
      setActiveImageIdx(0);
      setAddedMessage(false);
      setSelectedSize('standard');
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [product]);

  if (!product) return null;

  const metadata = getProductMetadata(product);
  const images = getProductImages(product);
  const priceMultiplier = selectedSize === 'large' ? 1.3 : 1.0;
  const currentPrice = product.price * priceMultiplier;

  const handleAddToCart = () => {
    // Construct cart item override with size preference if needed
    const customItem = {
      ...product,
      name: selectedSize === 'large' ? `${product.name} (Grande)` : product.name,
      price: currentPrice
    };
    addToCart(customItem);
    setAddedMessage(true);
    setTimeout(() => {
      setAddedMessage(false);
    }, 2000);
  };

  const nextImage = () => {
    setActiveImageIdx((prev) => (prev + 1) % images.length);
  };

  const prevImage = () => {
    setActiveImageIdx((prev) => (prev - 1 + images.length) % images.length);
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
        {/* Glassmorphic Backdrop overlay */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-background/80 backdrop-blur-md"
        />

        {/* Modal Container */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 30 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 30 }}
          transition={{ type: 'spring', damping: 25, stiffness: 250 }}
          className="relative w-full max-w-5xl bg-card border border-border/60 rounded-3xl shadow-2xl overflow-hidden flex flex-col md:flex-row z-10 my-auto text-foreground"
        >
          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 sm:top-6 sm:right-6 p-2 bg-background/80 border border-border/50 rounded-full text-foreground/80 hover:text-secondary hover:border-secondary transition-all active:scale-90 z-20"
            aria-label="Close details"
          >
            <X className="h-5 w-5" />
          </button>

          {/* Left Side: Photo Carousel & Thumbnails */}
          <div className="w-full md:w-1/2 p-6 flex flex-col justify-between border-b md:border-b-0 md:border-r border-border/40 bg-muted/20">
            
            {/* Main Image View */}
            <div className="relative aspect-square sm:aspect-[4/3] md:aspect-square w-full rounded-2xl overflow-hidden bg-background border border-border/30 flex items-center justify-center">
              <img
                src={images[activeImageIdx]}
                alt={product.name}
                className="w-full h-full object-cover transition-all duration-300"
                onError={(e) => {
                  e.currentTarget.src = 'https://images.unsplash.com/photo-1509042239860-f550ce710b93?q=80&w=600&auto=format&fit=crop';
                }}
              />

              {/* Prev / Next Arrows */}
              <button
                onClick={prevImage}
                className="absolute left-3 p-1.5 rounded-full bg-background/80 border border-border/40 text-foreground/80 hover:text-secondary transition-all active:scale-95"
              >
                <ChevronLeft className="h-4 w-4" />
              </button>
              <button
                onClick={nextImage}
                className="absolute right-3 p-1.5 rounded-full bg-background/80 border border-border/40 text-foreground/80 hover:text-secondary transition-all active:scale-95"
              >
                <ChevronRight className="h-4 w-4" />
              </button>

              {/* Dots indicator */}
              <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5">
                {images.map((_, i) => (
                  <span
                    key={i}
                    className={`h-1.5 rounded-full transition-all duration-300 ${
                      i === activeImageIdx ? 'w-4 bg-secondary' : 'w-1.5 bg-foreground/30'
                    }`}
                  />
                ))}
              </div>
            </div>

            {/* Thumbnail Horizontal Carousel List */}
            <div className="flex gap-3 overflow-x-auto py-4 scrollbar-none snap-x">
              {images.map((img, i) => (
                <button
                  key={i}
                  onClick={() => setActiveImageIdx(i)}
                  className={`relative h-16 w-16 sm:h-20 sm:w-20 rounded-xl overflow-hidden bg-background border flex-shrink-0 snap-start transition-all duration-200 ${
                    i === activeImageIdx
                      ? 'border-2 border-secondary scale-102 shadow-md'
                      : 'border-border/60 opacity-60 hover:opacity-100'
                  }`}
                >
                  <img
                    src={img}
                    alt={`${product.name} thumbnail ${i + 1}`}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.currentTarget.src = 'https://images.unsplash.com/photo-1509042239860-f550ce710b93?q=80&w=600&auto=format&fit=crop';
                    }}
                  />
                </button>
              ))}
            </div>

            {/* Preparation time badge */}
            <div className="flex items-center gap-2 p-3.5 bg-accent/40 rounded-xl border border-secondary/20">
              <Clock className="h-4 w-4 text-secondary flex-shrink-0" />
              <span className="text-xs sm:text-sm text-foreground/90 font-medium">
                Tempo estimado: <strong className="text-secondary">{metadata.prepTime}</strong>
              </span>
            </div>
          </div>

          {/* Right Side: Product Details, Ingredients, CTA Actions */}
          <div className="w-full md:w-1/2 p-6 sm:p-8 flex flex-col justify-between space-y-6 overflow-y-auto max-h-[70vh] md:max-h-none">
            <div className="space-y-5">
              
              {/* Product State/Breadcrumbs & Rating */}
              <div className="flex flex-wrap items-center justify-between gap-2 border-b border-border/30 pb-3">
                <span className="text-[11px] font-bold tracking-wider uppercase text-secondary bg-secondary/10 px-2.5 py-1 rounded-full">
                  Original CaféStoll
                </span>
                
                {/* Rating & reviews */}
                <div className="flex items-center gap-1.5 text-sm">
                  <div className="flex text-amber-500">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`h-4 w-4 fill-current ${
                          i < Math.floor(metadata.rating) ? '' : 'opacity-30'
                        }`}
                      />
                    ))}
                  </div>
                  <span className="font-semibold text-foreground">{metadata.rating.toFixed(1)}</span>
                  <span className="text-muted-foreground text-xs">({metadata.reviewsCount} opiniões)</span>
                </div>
              </div>

              {/* Title & Price */}
              <div className="space-y-2">
                <h1 className="text-2xl sm:text-3xl font-serif font-bold text-foreground leading-tight">
                  {product.name}
                </h1>
                <div className="flex items-baseline gap-2">
                  <span className="text-3xl font-bold text-secondary">
                    R$ {currentPrice.toFixed(2)}
                  </span>
                  {selectedSize === 'large' && (
                    <span className="text-xs text-muted-foreground line-through">
                      R$ {product.price.toFixed(2)}
                    </span>
                  )}
                </div>
              </div>

              {/* Description */}
              <p className="text-muted-foreground text-sm font-light leading-relaxed">
                {product.description}
              </p>

              {/* Option Selector (Mercado Livre Style) */}
              <div className="space-y-2 border-t border-border/30 pt-4">
                <span className="text-xs font-semibold uppercase text-muted-foreground tracking-wider">
                  Tamanho / Porção
                </span>
                <div className="flex gap-3">
                  <button
                    onClick={() => setSelectedSize('standard')}
                    className={`flex-1 py-2 px-4 rounded-xl border text-sm font-semibold transition-all ${
                      selectedSize === 'standard'
                        ? 'border-secondary bg-secondary/5 text-secondary'
                        : 'border-border/60 hover:bg-muted text-foreground/80'
                    }`}
                  >
                    Standard
                  </button>
                  <button
                    onClick={() => setSelectedSize('large')}
                    className={`flex-1 py-2 px-4 rounded-xl border text-sm font-semibold transition-all ${
                      selectedSize === 'large'
                        ? 'border-secondary bg-secondary/5 text-secondary'
                        : 'border-border/60 hover:bg-muted text-foreground/80'
                    }`}
                  >
                    Grande (+30%)
                  </button>
                </div>
              </div>

              {/* Ingredients Checklist */}
              <div className="space-y-2.5 border-t border-border/30 pt-4">
                <h3 className="text-xs font-semibold uppercase text-muted-foreground tracking-wider">
                  Ingredientes Incluídos
                </h3>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {metadata.ingredients.map((ing, i) => (
                    <li key={i} className="flex items-center gap-2 text-sm text-foreground/90 font-light">
                      <span className="p-0.5 bg-emerald-500/10 border border-emerald-500/30 rounded-full text-emerald-500">
                        <Check className="h-3 w-3" />
                      </span>
                      <span>{ing}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Allergens warning */}
              <div className="space-y-2 border-t border-border/30 pt-4">
                <h3 className="text-xs font-semibold uppercase text-muted-foreground tracking-wider">
                  Alergênicos & Notas
                </h3>
                <div className="flex flex-wrap gap-2">
                  {metadata.allergens.map((all, i) => (
                    <span
                      key={i}
                      className="inline-flex items-center gap-1 text-[11px] font-medium text-amber-600 dark:text-amber-500 bg-amber-500/10 px-2.5 py-1 rounded-md border border-amber-500/20"
                    >
                      <AlertTriangle className="h-3 w-3" />
                      {all}
                    </span>
                  ))}
                </div>
              </div>

            </div>

            {/* CTA action buttons */}
            <div className="border-t border-border/30 pt-6 mt-4 space-y-3">
              <button
                onClick={handleAddToCart}
                disabled={addedMessage}
                className={`w-full py-3.5 rounded-xl text-base font-bold shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 active:scale-98 ${
                  addedMessage
                    ? 'bg-emerald-500 text-white cursor-default'
                    : 'bg-secondary text-secondary-foreground hover:bg-secondary/90'
                }`}
              >
                {addedMessage ? (
                  <>
                    <Check className="h-5 w-5" />
                    Adicionado com sucesso!
                  </>
                ) : (
                  <>
                    <ShoppingBag className="h-5 w-5" />
                    Adicionar ao Carrinho
                  </>
                )}
              </button>
            </div>

          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
