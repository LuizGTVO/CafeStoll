'use client';

import React, { useState } from 'react';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import About from '@/components/About';
import FeaturedProducts from '@/components/FeaturedProducts';
import Menu from '@/components/Menu';
import Gallery from '@/components/Gallery';
import Testimonials from '@/components/Testimonials';
import Faq from '@/components/Faq';
import Newsletter from '@/components/Newsletter';
import Contact from '@/components/Contact';
import Footer from '@/components/Footer';
import CartSidebar from '@/components/CartSidebar';
import ProductDetailModal from '@/components/ProductDetailModal';
import { Product } from '@/lib/api';

export default function Home() {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  return (
    <div className="relative flex flex-col min-h-screen bg-background text-foreground transition-colors duration-300">
      {/* Navigation */}
      <Navbar onCartOpen={() => setIsCartOpen(true)} />

      {/* Main Sections */}
      <main className="flex-grow">
        <Hero />
        <About />
        <FeaturedProducts onViewProduct={setSelectedProduct} />
        <Menu onViewProduct={setSelectedProduct} />
        <Gallery />
        <Testimonials />
        <Faq />
        <Newsletter />
        <Contact />
      </main>

      {/* Footer */}
      <Footer />

      {/* Drawer Shopping Cart Panel */}
      <CartSidebar isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />

      {/* Mercado Livre Product Details Modal */}
      <ProductDetailModal product={selectedProduct} onClose={() => setSelectedProduct(null)} />
    </div>
  );
}
