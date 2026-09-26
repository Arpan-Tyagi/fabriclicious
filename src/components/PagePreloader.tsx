"use client";

import { motion } from "motion/react";
import { useEffect, useState } from "react";

export function PagePreloader() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Hide the preloader once hydration finishes
    const timer = setTimeout(() => setLoading(false), 800);
    return () => clearTimeout(timer);
  }, []);

  if (!loading) return null;

  const petals = Array.from({ length: 10 }).map((_, i) => (
    <motion.path
      key={i}
      d="M 12 12 Q 18 2 12 2 Q 6 2 12 12"
      fill="none"
      stroke="currentColor"
      strokeWidth={0.5}
      style={{ transform: `rotate(${i * 36}deg)`, transformOrigin: "12px 12px" }}
      initial={{ strokeDasharray: 30, strokeDashoffset: 30 }}
      animate={{ strokeDashoffset: 0 }}
      transition={{ duration: 0.8, ease: "circOut", delay: i * 0.05 }}
    />
  ));

  return (
    <motion.div
      initial={{ opacity: 1 }}
      animate={{ opacity: 0 }}
      transition={{ delay: 0.6, duration: 0.4 }}
      className="fixed inset-0 z-[100] flex items-center justify-center bg-linen pointer-events-none"
    >
      <div className="w-16 h-16 text-loam">
        <svg viewBox="0 0 24 24" fill="none" width="100%" height="100%">
          {petals}
          <motion.circle
            cx="12"
            cy="12"
            r="3.5"
            fill="none"
            stroke="currentColor"
            strokeWidth={0.5}
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.4 }}
          />
        </svg>
      </div>
    </motion.div>
  );
}
