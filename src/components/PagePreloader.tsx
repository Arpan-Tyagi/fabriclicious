"use client";

import { motion, AnimatePresence } from "motion/react";
import { useEffect, useState } from "react";

export function PagePreloader() {
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Only show once per session to eliminate navigation lag
    if (typeof window !== "undefined") {
      const hasSeen = sessionStorage.getItem("fabriclicious_preloader_seen");
      if (!hasSeen) {
        sessionStorage.setItem("fabriclicious_preloader_seen", "true");
        // Quick subtle fade without blocking user interaction
        const timer = setTimeout(() => setLoading(false), 200);
        return () => clearTimeout(timer);
      }
    }
  }, []);

  if (!loading) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.25, ease: "easeOut" }}
        className="fixed inset-0 z-[100] flex items-center justify-center bg-linen pointer-events-none"
      >
        <motion.div 
          className="w-24 h-24 sm:w-28 sm:h-28"
          initial={{ scale: 0.95, opacity: 0.8 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 1.02, opacity: 0 }}
          transition={{ duration: 0.2, ease: "easeOut" }}
        >
          <img 
            src="/images/logo_logo.svg" 
            alt="Fabriclicious" 
            className="w-full h-full object-contain"
          />
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
