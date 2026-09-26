"use client";

import { ReactNode, useState } from "react";
import Link from "next/link";
import { ShoppingBag, Search, Menu, X, ArrowRight } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { CartDrawer } from "@/components/CartDrawer";
import { useCartStore } from "@/store/cartStore";
import { CursorProvider } from "@/context/CursorContext";
import { CustomCursor } from "@/components/CustomCursor";
import { BrandLogo } from "@/components/BrandLogo";

export default function StorefrontLayout({ children }: { children: ReactNode }) {
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);
  const isCartOpen = useCartStore(state => state.isCartOpen);
  const closeCart = useCartStore(state => state.closeCart);
  const openCart = useCartStore(state => state.openCart);
  const itemsCount = useCartStore(state => state.items.length);

  return (
    <CursorProvider>
      <CustomCursor />
      <div className="flex flex-col min-h-screen bg-linen">
      {/* Luxury Glassmorphism Header */}
      <header className="fixed top-0 left-0 right-0 z-50 px-4 py-3 sm:px-6 md:px-12 md:py-5 flex items-center justify-between bg-limestone/90 backdrop-blur-md border-b border-hemp/50 text-umber shadow-sm transition-all">
        <Link 
          href="/" 
          onClick={() => setIsMobileNavOpen(false)}
          className="group block"
        >
          <BrandLogo variant="full" className="hidden md:flex" />
          <BrandLogo variant="rosette-only" className="md:hidden" />
        </Link>
        
        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center gap-7 font-mono text-xs uppercase tracking-[0.18em]">
          <Link href="/fabrics" className="hover:text-loam transition-colors">Archive</Link>
          <Link href="/journal" className="hover:text-loam transition-colors">Journal</Link>
          <Link href="/swatches" className="hover:text-loam transition-colors">Swatches</Link>
          <Link href="/about" className="hover:text-loam transition-colors">Our Legacy</Link>
          <Link href="/admin/products/new" className="hover:text-loam transition-colors">Atelier</Link>
          <Link href="/login" className="hover:text-loam transition-colors">Client Access</Link>
        </nav>

        {/* Action Controls */}
        <div className="flex items-center gap-3 sm:gap-6">
          <Link href="/fabrics" className="hover:text-loam transition-colors p-1" aria-label="Search Archive">
            <Search size={18} strokeWidth={1.5} />
          </Link>
          <button 
            onClick={() => openCart()} 
            className="hover:text-loam transition-colors relative p-1"
            aria-label="Open Shopping Bag"
          >
            <ShoppingBag size={18} strokeWidth={1.5} />
            <span className="absolute -top-1 -right-1.5 bg-loam text-umber text-[9px] font-mono w-4 h-4 rounded-full flex items-center justify-center font-bold">
              {itemsCount}
            </span>
          </button>

          {/* Mobile Navigation Toggle Button */}
          <button 
            onClick={() => setIsMobileNavOpen(prev => !prev)} 
            className="lg:hidden p-1.5 hover:text-loam transition-colors focus:outline-none"
            aria-label="Toggle Navigation Menu"
          >
            {isMobileNavOpen ? <X size={20} strokeWidth={1.5} /> : <Menu size={20} strokeWidth={1.5} />}
          </button>
        </div>
      </header>

      {/* Mobile Drawer Navigation */}
      <AnimatePresence>
        {isMobileNavOpen && (
          <>
            {/* Backdrop Scrim */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={() => setIsMobileNavOpen(false)}
              className="fixed inset-0 top-[53px] sm:top-[61px] bg-umber/50 backdrop-blur-md z-40 lg:hidden"
            />

            {/* Slide-Down Drawer Panel */}
            <motion.div
              initial={{ opacity: 0, y: -12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
              className="fixed top-[53px] sm:top-[61px] left-0 right-0 bg-linen border-b border-hemp shadow-2xl z-50 lg:hidden px-6 py-6 flex flex-col space-y-4 max-h-[calc(100vh-61px)] overflow-y-auto"
            >
              <div className="text-[10px] font-mono uppercase tracking-[0.2em] text-loam pb-2 border-b border-hemp/40">
                Atelier Navigation
              </div>
              
              <nav className="flex flex-col space-y-3 font-mono text-xs uppercase tracking-[0.18em]">
                <Link 
                  href="/fabrics" 
                  onClick={() => setIsMobileNavOpen(false)} 
                  className="py-2.5 border-b border-hemp/20 hover:text-loam transition-colors flex items-center justify-between"
                >
                  <span>The Archive</span>
                  <ArrowRight size={14} className="text-bark" />
                </Link>
                <Link 
                  href="/journal" 
                  onClick={() => setIsMobileNavOpen(false)} 
                  className="py-2.5 border-b border-hemp/20 hover:text-loam transition-colors flex items-center justify-between"
                >
                  <span>Editorial Journal</span>
                  <ArrowRight size={14} className="text-bark" />
                </Link>
                <Link 
                  href="/swatches" 
                  onClick={() => setIsMobileNavOpen(false)} 
                  className="py-2.5 border-b border-hemp/20 hover:text-loam transition-colors flex items-center justify-between"
                >
                  <span>Order Swatches</span>
                  <ArrowRight size={14} className="text-bark" />
                </Link>
                <Link 
                  href="/about" 
                  onClick={() => setIsMobileNavOpen(false)} 
                  className="py-2.5 border-b border-hemp/20 hover:text-loam transition-colors flex items-center justify-between"
                >
                  <span>Our Legacy</span>
                  <ArrowRight size={14} className="text-bark" />
                </Link>
                <Link 
                  href="/admin/products/new" 
                  onClick={() => setIsMobileNavOpen(false)} 
                  className="py-2.5 border-b border-hemp/20 hover:text-loam transition-colors flex items-center justify-between"
                >
                  <span>Atelier Admin</span>
                  <ArrowRight size={14} className="text-bark" />
                </Link>
                <Link 
                  href="/login" 
                  onClick={() => setIsMobileNavOpen(false)} 
                  className="py-3 mt-2 text-loam font-bold flex items-center justify-between hover:text-umber transition-colors"
                >
                  <span>Client Access</span>
                  <ArrowRight size={14} className="text-loam" />
                </Link>
              </nav>

              <div className="pt-4 border-t border-hemp/40 text-[11px] font-sans text-bark flex items-center justify-between">
                <span>Mithila Enterprises</span>
                <span className="font-mono text-[9px] uppercase tracking-widest text-loam">Est. 1984</span>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
      
      <main className="flex-1 flex flex-col">
        {children}
      </main>

      <CartDrawer isOpen={isCartOpen} onClose={() => closeCart()} />

      {/* Luxury Awwwards-Caliber Responsive Footer */}
      <footer className="bg-umber text-linen pt-24 pb-12 px-6 sm:px-10 lg:px-16 border-t border-hemp/20">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 mb-20">
            
            {/* Massive Typographic Anchor */}
            <div className="lg:col-span-5 flex flex-col justify-between space-y-6">
              <div>
                <h2 className="font-serif text-[clamp(2.5rem,5.5vw,5rem)] tracking-tight leading-[0.95] mb-6 text-linen max-w-full break-words">
                  Fabriclicious<span className="text-loam">.</span>
                </h2>
                <p className="font-sans text-sm md:text-base text-linen/60 max-w-md leading-relaxed mb-2">
                  The exclusive digital atelier of <strong className="text-linen font-medium">Mithila Enterprises</strong>.
                </p>
                <p className="font-sans text-xs md:text-sm text-linen/60 max-w-md leading-relaxed">
                  Four decades of uncompromising textile curation. Engineered for bespoke tailors, ateliers, and discerning creators worldwide.
                </p>
              </div>
            </div>

            {/* Navigation & Links Grid (3 Columns) */}
            <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-3 gap-8">
              <div className="space-y-4">
                <h3 className="font-mono text-xs uppercase tracking-[0.2em] text-loam mb-4">Explore</h3>
                <ul className="space-y-3 font-sans text-sm text-linen/70">
                  <li><Link href="/fabrics" className="hover:text-linen transition-colors">The Archive</Link></li>
                  <li><Link href="/journal" className="hover:text-linen transition-colors">Editorial Journal</Link></li>
                  <li><Link href="/swatches" className="hover:text-linen transition-colors">Order Swatches</Link></li>
                  <li><Link href="/about" className="hover:text-linen transition-colors">Our Heritage</Link></li>
                </ul>
              </div>

              <div className="space-y-4">
                <h3 className="font-mono text-xs uppercase tracking-[0.2em] text-loam mb-4">Legal</h3>
                <ul className="space-y-3 font-sans text-sm text-linen/70">
                  <li><Link href="/terms" className="hover:text-linen transition-colors">Terms of Service</Link></li>
                  <li><Link href="/privacy" className="hover:text-linen transition-colors">Privacy Policy</Link></li>
                  <li><Link href="/returns" className="hover:text-linen transition-colors">Return Policy</Link></li>
                  <li><Link href="/shipping" className="hover:text-linen transition-colors">Shipping & Freight</Link></li>
                </ul>
              </div>

              <div className="space-y-4">
                <h3 className="font-mono text-xs uppercase tracking-[0.2em] text-loam mb-4">Join The Atelier</h3>
                <p className="font-sans text-xs text-linen/60 leading-relaxed mb-4">
                  Exclusive access to rare surplus drops and heavy yardage allocations.
                </p>
                <form className="relative group">
                  <input 
                    type="email" 
                    placeholder="Email Address" 
                    className="w-full bg-transparent border-b border-linen/30 pb-3 text-sm text-linen placeholder-alabaster/30 focus:outline-none focus:border-loam transition-colors"
                  />
                  <button type="submit" className="absolute right-0 bottom-3 text-linen/50 group-hover:text-loam transition-colors">
                    <ArrowRight size={16} strokeWidth={1.5} />
                  </button>
                </form>
              </div>
            </div>

          </div>

          {/* Bottom Bar */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between pt-8 border-t border-linen/10 font-mono text-[10px] uppercase tracking-widest text-linen/40 gap-4">
            <p>&copy; {new Date().getFullYear()} Fabriclicious. A venture of Mithila Enterprises.</p>
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6">
              <div className="flex items-center gap-2 border-r border-linen/20 pr-6">
                <span className="text-linen">Meters</span>
                <span className="text-linen/20">/</span>
                <span className="hover:text-linen transition-colors cursor-pointer">Yards</span>
              </div>
              <div className="flex items-center gap-6">
                <a href="#" className="hover:text-linen transition-colors">Instagram</a>
                <a href="#" className="hover:text-linen transition-colors">LinkedIn</a>
                <a href="#" className="hover:text-linen transition-colors">Pinterest</a>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
    </CursorProvider>
  );
}
