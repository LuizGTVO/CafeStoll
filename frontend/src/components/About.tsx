'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Award, Leaf, ShieldCheck, HelpCircle } from 'lucide-react';

export default function About() {
  const features = [
    {
      icon: <Leaf className="h-6 w-6 text-secondary" />,
      title: 'Grãos 100% Arábica',
      description: 'Selecionamos manualmente apenas micro-lotes de café arábica especial de altitude.',
    },
    {
      icon: <Award className="h-6 w-6 text-secondary" />,
      title: 'Torrefação Própria',
      description: 'Controlamos todo o perfil de torra semanalmente para garantir notas sensoriais puras.',
    },
    {
      icon: <ShieldCheck className="h-6 w-6 text-secondary" />,
      title: 'Comércio Justo',
      description: 'Negociamos diretamente (Direct Trade) com os produtores do Sul de Minas e Cerrado.',
    },
  ];

  return (
    <section id="sobre" className="py-24 bg-card transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Visual Composition */}
          <motion.div
            initial={{ opacity: 0, x: -45 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.8 }}
            className="grid grid-cols-2 gap-4 relative"
          >
            {/* Background blob decoration */}
            <div className="absolute -top-10 -left-10 w-48 h-48 bg-secondary/10 rounded-full blur-3xl" />
            
            <div className="space-y-4">
              <img
                src="https://images.unsplash.com/photo-1442512595331-e89e73853f31?q=80&w=600&auto=format&fit=crop"
                alt="Moendo grãos de café"
                className="w-full h-64 object-cover rounded-2xl shadow-md hover:scale-[1.02] transition-transform duration-300"
              />
              <img
                src="https://images.unsplash.com/photo-1507133750040-4a8f57021571?q=80&w=600&auto=format&fit=crop"
                alt="Cafeteira Italiana clássica"
                className="w-full h-48 object-cover rounded-2xl shadow-md hover:scale-[1.02] transition-transform duration-300"
              />
            </div>
            
            <div className="space-y-4 pt-10">
              <img
                src="https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?q=80&w=600&auto=format&fit=crop"
                alt="Nossa Cafeteria interna"
                className="w-full h-44 object-cover rounded-2xl shadow-md hover:scale-[1.02] transition-transform duration-300"
              />
              <img
                src="https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?q=80&w=600&auto=format&fit=crop"
                alt="Latte Art Stoll"
                className="w-full h-64 object-cover rounded-2xl shadow-md hover:scale-[1.02] transition-transform duration-300"
              />
            </div>
          </motion.div>

          {/* Texts */}
          <motion.div
            initial={{ opacity: 0, x: 45 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.8 }}
            className="space-y-8"
          >
            <div className="space-y-4">
              <span className="text-secondary font-semibold uppercase tracking-wider text-sm">Nossa História</span>
              <h2 className="text-3xl sm:text-4xl font-bold font-serif text-foreground">
                Cultivando conexões e inspirando paladares
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                Fundada em 2021 pela família Stoll, nascemos do desejo de criar um santuário urbano 
                para os apaixonados por café. Nossa missão é honrar o trabalho dos pequenos agricultores brasileiros, 
                trazendo à sua xícara a máxima expressão do grão.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                Cada bebida servida em nossa bancada é tratada como uma obra de arte: da temperatura exata da extração 
                à densidade perfeita do leite vaporizado.
              </p>
            </div>

            {/* Core Features list */}
            <div className="space-y-6 pt-4 border-t border-border">
              {features.map((f, i) => (
                <div key={i} className="flex gap-4 items-start">
                  <div className="p-3 bg-secondary/10 rounded-xl">
                    {f.icon}
                  </div>
                  <div>
                    <h3 className="font-bold text-foreground">{f.title}</h3>
                    <p className="text-muted-foreground text-sm">{f.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
