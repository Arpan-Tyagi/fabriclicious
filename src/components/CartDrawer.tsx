"use client";

import { useCartStore } from "@/store/cartStore";
import { motion, AnimatePresence } from "motion/react";
import { X, Trash2 } from "lucide-react";
import { useState } from "react";
import Link from "next/link";

export function CartDrawer({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const { items, removeItem, getSubtotal, getSwatchCount } = useCartStore();
  const [promoCode, setPromoCode] = useState("");

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-[#1C1A18]/50 backdrop-blur-md z-[100]"
          />
          
          <motion.div 
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed top-0 right-0 h-[100dvh] w-full max-w-md bg-limestone text-umber z-[101] shadow-2xl flex flex-col border-l border-hemp"
          >
            <div className="p-6 md:p-10 flex items-center justify-between border-b border-hemp">
              <h2 className="font-serif text-3xl">Atelier Cart</h2>
              <button onClick={onClose} className="p-2 hover:bg-limestone rounded-full transition-colors">
                <X strokeWidth={1.5} />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-6 md:p-10 space-y-8">
              {items.length === 0 ? (
                <div className="text-center text-umber/50 font-mono text-sm mt-10">
                  <p className="mb-2">Your Atelier Bag is Empty.</p>
                  <p className="text-[10px] uppercase tracking-widest text-umber/40">No fabrics have been measured yet. Explore our curated European mills to begin your bespoke creation.</p>
                  <button onClick={onClose} className="mt-6 px-6 py-2 border border-umber text-umber text-xs uppercase tracking-widest hover:bg-umber hover:text-linen transition-colors">
                    Browse Continuous Fabrics
                  </button>
                </div>
              ) : (
                items.map(item => (
                  <div key={item.id} className="flex gap-6">
                    <div className="w-24 h-32 bg-limestone overflow-hidden shrink-0">
                      <img src={item.image} alt={item.title} className="w-full h-full object-cover" />
                    </div>
                    <div className="flex-1 flex flex-col justify-between py-1">
                      <div>
                        <h3 className="font-serif text-lg mb-1">{item.title}</h3>
                        <p className="font-mono text-xs uppercase tracking-widest text-umber/60 mb-2">
                          {item.colorName}
                        </p>
                        <p className="font-sans text-sm font-medium">
                          {item.isSwatch ? "Swatch Sample (10×10 cm)" : `Cut to Order: ${item.lengthMeters} Continuous Meters // Hand-sliced from Bolt #BOLT-${item.variantId || 'FLX-082'}`}
                        </p>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="font-mono text-sm">${item.price.toFixed(2)}</span>
                        <button 
                          onClick={() => removeItem(item.id)}
                          className="text-umber/40 hover:text-loam transition-colors"
                        >
                          <Trash2 size={16} strokeWidth={1.5} />
                        </button>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>

            {items.length > 0 && (
              <div className="p-6 md:p-10 bg-limestone/30 border-t border-hemp space-y-6">
                <div className="flex items-center gap-4">
                  <input 
                    type="text" 
                    placeholder="Promo Code" 
                    value={promoCode}
                    onChange={e => setPromoCode(e.target.value)}
                    className="flex-1 bg-transparent border-b border-hemp focus:border-umber outline-none py-2 text-sm uppercase tracking-widest font-mono"
                  />
                  <button className="text-xs uppercase font-bold tracking-widest text-loam hover:text-umber transition-colors">
                    Apply
                  </button>
                </div>
                
                <div className="space-y-2 font-mono text-sm">
                  <div className="flex justify-between text-umber/70">
                    <span>Shipping</span>
                    <span>Complimentary</span>
                  </div>
                  <div className="flex justify-between text-umber/70">
                    <span>Swatch Limit</span>
                    <span>{getSwatchCount()} / 5</span>
                  </div>
                  <div className="flex justify-between text-lg pt-4 border-t border-hemp font-medium">
                    <span>Subtotal</span>
                    <span>${getSubtotal().toFixed(2)}</span>
                  </div>
                </div>

                <div className="space-y-1 py-4 text-center">
                  <p className="font-mono text-[9px] uppercase tracking-widest text-umber/50 flex items-center justify-center gap-2">
                    <span className="w-1 h-1 bg-loam rounded-full"></span> Hand-Inspected for Weave Flaws &amp; Dye Uniformity
                  </p>
                  <p className="font-mono text-[9px] uppercase tracking-widest text-umber/50 flex items-center justify-center gap-2">
                    <span className="w-1 h-1 bg-loam rounded-full"></span> Rolled on Recycled Hardwood Tubes (No Harsh Creases)
                  </p>
                  <p className="font-mono text-[9px] uppercase tracking-widest text-umber/50 flex items-center justify-center gap-2">
                    <span className="w-1 h-1 bg-loam rounded-full"></span> Biodegradable Waterproof Protective Sleeves
                  </p>
                </div>

                <Link href="/checkout" onClick={onClose} className="luxury-button w-full block text-center">
                  Proceed to Checkout
                </Link>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
