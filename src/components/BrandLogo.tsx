"use client";

import { motion } from "motion/react";
import React from "react";

interface BrandLogoProps {
  className?: string;
  variant?: "full" | "rosette-only";
}

export function BrandLogo({ className = "", variant = "full" }: BrandLogoProps) {
  // 10-petal rosette
  const petals = Array.from({ length: 10 }).map((_, i) => {
    const angle = i * 36;
    return (
      <path
        key={i}
        d="M 12 12 Q 18 2 12 2 Q 6 2 12 12"
        fill="currentColor"
        opacity="0.15"
        transform={`rotate(${angle} 12 12)`}
      />
    );
  });
  
  const petalOutlines = Array.from({ length: 10 }).map((_, i) => {
    const angle = i * 36;
    return (
      <path
        key={`outline-${i}`}
        d="M 12 12 Q 18 2 12 2 Q 6 2 12 12"
        fill="none"
        stroke="currentColor"
        strokeWidth="0.4"
        transform={`rotate(${angle} 12 12)`}
      />
    );
  });

  return (
    <div className={`flex items-center gap-3 ${className}`}>
      <motion.div
        className="relative text-umber shrink-0 flex items-center justify-center cursor-pointer"
        whileHover={{ rotate: 15 }}
        transition={{ type: "spring", stiffness: 120, damping: 14 }}
      >
        <svg
          viewBox="0 0 24 24"
          className="w-8 h-8 sm:w-10 sm:h-10 text-loam"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {petals}
          {petalOutlines}
          <circle cx="12" cy="12" r="3.5" stroke="currentColor" strokeWidth="0.5" fill="currentColor" opacity="0.1" />
          <circle cx="12" cy="12" r="3.5" stroke="currentColor" strokeWidth="0.5" fill="none" />
          <circle cx="12" cy="12" r="1.5" fill="currentColor" />
        </svg>
      </motion.div>

      {variant === "full" && (
        <div className="flex flex-col">
          <span className="font-serif italic text-xl sm:text-2xl leading-none tracking-tight text-umber">
            Fabriclicious
          </span>
          <span className="font-sans text-[8px] sm:text-[9px] font-medium uppercase tracking-[0.35em] text-umber/70 mt-1.5 ml-0.5">
            High-End Fabric Atelier
          </span>
        </div>
      )}
    </div>
  );
}
