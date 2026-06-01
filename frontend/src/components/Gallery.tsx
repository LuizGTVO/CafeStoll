'use client';

import React from 'react';
import { motion } from 'framer-motion';

export default function Gallery() {
  const images = [
    {
      src: 'https://images.unsplash.com/photo-1507133750040-4a8f57021571?q=80&w=600&auto=format&fit=crop',
      title: 'Moka Clássica',
      size: 'col-span-1 row-span-1',
    },
    {
      src: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?q=80&w=800&auto=format&fit=crop',
      title: 'Moagem do Grão',
      size: 'col-span-1 sm:col-span-2 row-span-1',
    },
    {
      src: 'https://images.unsplash.com/photo-1541167760496-1628856ab772?q=80&w=600&auto=format&fit=crop',
      title: 'Barista Stoll',
      size: 'col-span-1 row-span-2',
    },
    {
      src: 'https://images.unsplash.com/photo-1554118811-1e0d58224f24?q=80&w=800&auto=format&fit=crop',
      title: 'Nosso Salão Cozy',
      size: 'col-span-1 sm:col-span-2 row-span-1',
    },
    {
      src: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?q=80&w=600&auto=format&fit=crop',
      title: 'Confeitaria Artesanal',
      size: 'col-span-1 row-span-1',
    },
  ];

  return (
    <section className="py-24 bg-background transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Title */}
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
          <span className="text-secondary font-semibold uppercase tracking-wider text-sm">Galeria</span>
          <h2 className="text-3xl sm:text-4xl font-bold font-serif text-foreground">
            Instantes no CaféStoll
          </h2>
          <p className="text-muted-foreground font-light text-sm sm:text-base">
            Um olhar sobre o nosso dia a dia, desde a seleção da torra à mesa de nossos clientes.
          </p>
        </div>

        {/* Masonry Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 auto-rows-[240px]">
          {images.map((img, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.6, delay: idx * 0.1 }}
              className={`${img.size} relative overflow-hidden rounded-2xl group shadow-sm`}
            >
              {/* Image */}
              <img
                src={img.src}
                alt={img.title}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              {/* Overlay on hover */}
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6 z-10">
                <div className="transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                  <h3 className="text-white font-serif font-bold text-lg">{img.title}</h3>
                  <p className="text-zinc-200 text-xs font-semibold tracking-widest uppercase mt-1">CaféStoll Experience</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
