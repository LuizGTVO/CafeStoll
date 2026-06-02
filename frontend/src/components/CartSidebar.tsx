'use client';

import React, { useState } from 'react';
import { useCart } from '@/context/CartContext';
import { createOrder } from '@/lib/api';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ShoppingBag, Plus, Minus, Trash2, CheckCircle, Loader2 } from 'lucide-react';

interface CartSidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function CartSidebar({ isOpen, onClose }: CartSidebarProps) {
  const { cart, removeFromCart, updateQuantity, cartTotal, clearCart } = useCart();
  const [customerName, setCustomerName] = useState('');
  const [customerEmail, setCustomerEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [orderSuccess, setOrderSuccess] = useState(false);
  const [orderId, setOrderId] = useState('');

  const handleCheckout = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!customerName || !customerEmail || cart.length === 0) return;

    setIsSubmitting(true);
    try {
      const orderItems = cart.map((item) => ({
        productId: item.product.id,
        quantity: item.quantity,
        price: item.product.price,
      }));

      const res = await createOrder({
        customerName,
        customerEmail,
        items: orderItems,
        total: cartTotal,
      });

      setOrderId(res.order.id);
      setOrderSuccess(true);
      clearCart();
      setCustomerName('');
      setCustomerEmail('');
    } catch (error) {
      console.error('Error submitting checkout order:', error);
      alert('Erro ao finalizar pedido. Por favor, tente novamente.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.5 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm"
          />

          {/* Sidebar Panel */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed right-0 top-0 bottom-0 z-50 w-full max-w-md bg-white dark:bg-[#241915] p-6 shadow-2xl flex flex-col border-l border-border h-full overflow-hidden"
          >
            {/* Header */}
            <div className="flex items-center justify-between pb-5 border-b border-border">
              <div className="flex items-center gap-2">
                <ShoppingBag className="text-secondary h-6 w-6" />
                <h2 className="text-xl font-bold font-serif text-foreground">Seu Carrinho</h2>
              </div>
              <button
                onClick={onClose}
                className="p-2 hover:bg-muted rounded-full transition-colors text-muted-foreground hover:text-foreground"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Content Area */}
            <div className="flex-1 overflow-y-auto py-4 space-y-4 pr-1">
              {orderSuccess ? (
                /* Success Screen */
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="flex flex-col items-center justify-center text-center py-10 px-4 space-y-4"
                >
                  <CheckCircle className="h-16 w-16 text-emerald-500 animate-bounce" />
                  <h3 className="text-2xl font-serif font-bold text-foreground">Pedido Confirmado!</h3>
                  <p className="text-muted-foreground text-sm">
                    Obrigado por comprar no CaféStoll. Seu pedido já foi enviado para a nossa cozinha e está sendo preparado com muito carinho.
                  </p>
                  <div className="bg-muted p-3 rounded-lg text-xs font-mono w-full text-center text-foreground">
                    CÓDIGO: {orderId}
                  </div>
                  <button
                    onClick={() => {
                      setOrderSuccess(false);
                      onClose();
                    }}
                    className="w-full py-3 bg-primary text-primary-foreground font-semibold rounded-lg hover:bg-primary/95 transition-all shadow-md"
                  >
                    Voltar ao Cardápio
                  </button>
                </motion.div>
              ) : cart.length === 0 ? (
                /* Empty Cart */
                <div className="flex flex-col items-center justify-center h-64 text-center text-muted-foreground space-y-3">
                  <ShoppingBag className="h-12 w-12 stroke-1 opacity-50" />
                  <p className="font-medium">Seu carrinho está vazio.</p>
                  <p className="text-sm">Que tal adicionar alguns cafés especiais ou croissants?</p>
                </div>
              ) : (
                /* Cart Items List */
                <div className="space-y-4">
                  {cart.map((item) => (
                    <motion.div
                      layout
                      key={item.product.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="flex gap-4 p-3 bg-muted/30 rounded-lg border border-border/50 items-center"
                    >
                      <img
                        src={item.product.imageUrl}
                        alt={item.product.name}
                        onError={(e) => {
                          e.currentTarget.src = 'https://images.unsplash.com/photo-1509042239860-f550ce710b93?q=80&w=600&auto=format&fit=crop';
                        }}
                        className="h-16 w-16 object-cover rounded-md"
                      />
                      <div className="flex-1 min-w-0">
                        <h4 className="font-semibold text-foreground truncate text-sm">
                          {item.product.name}
                        </h4>
                        <p className="text-secondary font-semibold text-sm">
                          R$ {item.product.price.toFixed(2)}
                        </p>
                        
                        {/* Quantity Controls */}
                        <div className="flex items-center gap-2 mt-2">
                          <button
                            onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                            className="p-1 hover:bg-muted border border-border/80 rounded transition-colors text-muted-foreground"
                          >
                            <Minus className="h-3 w-3" />
                          </button>
                          <span className="text-xs font-semibold px-2 text-foreground">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                            className="p-1 hover:bg-muted border border-border/80 rounded transition-colors text-muted-foreground"
                          >
                            <Plus className="h-3 w-3" />
                          </button>
                        </div>
                      </div>
                      <button
                        onClick={() => removeFromCart(item.product.id)}
                        className="p-2 hover:bg-destructive/10 text-muted-foreground hover:text-destructive rounded transition-colors"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </motion.div>
                  ))}
                </div>
              )}
            </div>

            {/* Footer with checkout form */}
            {!orderSuccess && cart.length > 0 && (
              <div className="border-t border-border pt-4 mt-auto space-y-4">
                <div className="flex justify-between items-center text-foreground">
                  <span className="font-medium text-muted-foreground">Total:</span>
                  <span className="text-xl font-bold font-serif text-secondary">
                    R$ {cartTotal.toFixed(2)}
                  </span>
                </div>

                <form onSubmit={handleCheckout} className="space-y-3">
                  <div>
                    <label className="text-xs font-semibold text-muted-foreground block mb-1">
                      Nome Completo
                    </label>
                    <input
                      type="text"
                      required
                      value={customerName}
                      onChange={(e) => setCustomerName(e.target.value)}
                      placeholder="Ex: João Silva"
                      className="w-full px-3 py-2 text-sm bg-background border border-border rounded-lg focus:outline-none focus:ring-1 focus:ring-primary text-foreground"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-semibold text-muted-foreground block mb-1">
                      E-mail
                    </label>
                    <input
                      type="email"
                      required
                      value={customerEmail}
                      onChange={(e) => setCustomerEmail(e.target.value)}
                      placeholder="Ex: joao@email.com"
                      className="w-full px-3 py-2 text-sm bg-background border border-border rounded-lg focus:outline-none focus:ring-1 focus:ring-primary text-foreground"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-3 mt-2 bg-secondary text-secondary-foreground font-semibold rounded-lg hover:bg-secondary/95 active:scale-95 transition-all shadow-md flex items-center justify-center gap-2"
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="h-4 w-4 animate-spin" />
                        Processando...
                      </>
                    ) : (
                      'Finalizar Pedido'
                    )}
                  </button>
                </form>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
