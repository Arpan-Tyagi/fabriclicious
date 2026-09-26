"use client";

import { motion } from "motion/react";
import { useEffect, useState } from "react";

export function PagePreloader() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Hide the preloader once hydration finishes
    const timer = setTimeout(() => setLoading(false), 1000);
    return () => clearTimeout(timer);
  }, []);

  if (!loading) return null;

  return (
    <motion.div
      initial={{ opacity: 1 }}
      animate={{ opacity: 0 }}
      transition={{ delay: 0.6, duration: 0.4 }}
      className="fixed inset-0 z-[100] flex items-center justify-center bg-linen pointer-events-none"
    >
      <motion.div 
        className="w-28 h-28 sm:w-36 sm:h-36"
        initial={{ scale: 0.85, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <img 
          src="/images/logo_logo.svg" 
          alt="Fabriclicious Atelier" 
          className="w-full h-full object-contain"
        />
      </motion.div>
    </motion.div>
  );
}
