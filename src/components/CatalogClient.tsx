"use client";

import { useEffect, useState, useRef } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "motion/react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { CursorTarget } from "@/components/CursorTarget";

gsap.registerPlugin(ScrollTrigger);

export function CatalogClient({ initialProducts }: { initialProducts: any[] }) {
  const [gsmRange, setGsmRange] = useState<[number, number]>([50, 400]);
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const min = params.has("minGsm") ? parseInt(params.get("minGsm")!) : 50;
    const max = params.has("maxGsm") ? parseInt(params.get("maxGsm")!) : 400;
    if (min !== 50 || max !== 400) {
      setGsmRange([min, max]);
    }
  }, []);

  const filteredProducts = initialProducts.filter(
    p => p.gsm >= gsmRange[0] && p.gsm <= gsmRange[1]
  );

  // Initial scroll-triggered entry animation (runs once)
  useGSAP(() => {
    if (!gridRef.current) return;
    
    const cards = gridRef.current.querySelectorAll(".product-card");
    
    gsap.fromTo(
      cards,
      { y: 60, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        stagger: 0.08,
        duration: 1.0,
        ease: "power3.out",
        scrollTrigger: {
          trigger: gridRef.current,
          start: "top 85%",
        }
      }
    );
  }, { scope: gridRef });

  return (
    <div className="flex flex-col lg:flex-row gap-12 lg:gap-24">
      {/* Sidebar Filters */}
      <aside className="w-full lg:w-64 shrink-0 space-y-12">
        <div>
          <h3 className="font-mono text-xs uppercase tracking-widest text-umber mb-6 pb-4 border-b border-hemp">
            Weight (GSM) Filter
          </h3>
          <CursorTarget mode="stepper" text="FILTER" className="flex flex-col gap-4">
            <input 
              type="range" 
              min="50" 
              max="600" 
              step="10"
              value={gsmRange[1]}
              onChange={(e) => {
                const newMax = parseInt(e.target.value);
                setGsmRange([gsmRange[0], newMax]);
                const url = new URL(window.location.href);
                url.searchParams.set("minGsm", gsmRange[0].toString());
                url.searchParams.set("maxGsm", newMax.toString());
                window.history.replaceState(null, "", url.toString());
              }}
              className="w-full accent-umber cursor-pointer"
            />
            <div className="flex justify-between font-mono text-[10px] text-umber/60">
              <span>{gsmRange[0]} GSM</span>
              <span className="font-bold text-umber">{gsmRange[1]} GSM</span>
            </div>
          </CursorTarget>
        </div>
      </aside>

      {/* Product Grid with AnimatePresence */}
      <div ref={gridRef} className="flex-1 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-x-8 gap-y-16">
        <AnimatePresence mode="popLayout">
          {filteredProducts.map((product) => (
            <motion.div
              key={product.id}
              layout
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.96 }}
              transition={{ duration: 0.35, ease: [0.32, 0.72, 0, 1] }}
            >
              <CursorTarget mode="hover" text="VIEW">
                <Link href={`/fabrics/${product.slug}`} className="product-card group block transition-transform duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] hover:-translate-y-1">
                  <div className="aspect-[3/4] bg-limestone relative overflow-hidden mb-6 rounded-2xl border border-hemp transition-all duration-700 ease-[cubic-bezier(0.32,0.72,0,1)] group-hover:scale-[1.02] group-hover:shadow-[0_4px_24px_rgba(28,26,24,0.06)] group-hover:border-loam">
                    <motion.img 
                      src={product.image} 
                      alt={product.title}
                      className="w-full h-full object-cover transition-transform duration-1000 ease-[cubic-bezier(0.32,0.72,0,1)] group-hover:scale-110"
                    />
                  </div>
                  
                  <div className="flex justify-between items-start">
                    <div>
                      <h2 className="font-serif text-2xl mb-1 group-hover:text-loam transition-colors text-umber">
                        {product.title}
                      </h2>
                      <div className="font-mono text-[10px] uppercase tracking-widest text-bark">
                        {product.gsm} GSM • {product.weave}
                      </div>
                    </div>
                    <div className="font-mono text-sm tracking-tight text-loam">
                      ₹{product.price.toFixed(2)}/m
                    </div>
                  </div>
                </Link>
              </CursorTarget>
            </motion.div>
          ))}
        </AnimatePresence>
        
        {filteredProducts.length === 0 && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="col-span-full py-24 text-center font-serif text-2xl text-umber/40"
          >
            No textiles found matching this GSM filter.
          </motion.div>
        )}
      </div>
    </div>
  );
}
