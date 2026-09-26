"use client";

import { motion } from "motion/react";
import React from "react";

interface BrandLogoProps {
  className?: string;
  imgClassName?: string;
  variant?: "full" | "horizontal" | "rosette-only" | "stacked";
  theme?: "light" | "dark";
}

export function BrandLogo({
  className = "",
  imgClassName = "",
  variant = "horizontal",
  theme = "light",
}: BrandLogoProps) {
  // Mobile / compact standalone rosette emblem with spring rotational unwind
  if (variant === "rosette-only") {
    return (
      <div className={`inline-flex items-center ${className}`}>
        <motion.div
          className="relative shrink-0 flex items-center justify-center cursor-pointer"
          whileHover={{ rotate: 15 }}
          transition={{ type: "spring", stiffness: 120, damping: 14 }}
        >
          <img
            src="/images/logo-rosette.svg"
            alt="Fabriclicious Rosette Emblem"
            className={imgClassName || "w-8 h-8 sm:w-9 sm:h-9 object-contain"}
          />
        </motion.div>
      </div>
    );
  }

  // Centered stacked lockup (ideal for modal/splash screens)
  if (variant === "stacked") {
    return (
      <div className={`inline-flex items-center justify-center ${className}`}>
        <motion.div
          className="relative shrink-0 flex items-center justify-center cursor-pointer"
          whileHover={{ scale: 1.02 }}
          transition={{ type: "spring", stiffness: 120, damping: 14 }}
        >
          <img
            src="/images/logo_logo.svg"
            alt="Fabriclicious Atelier"
            className={imgClassName || "w-24 h-24 sm:w-32 sm:h-32 object-contain"}
          />
        </motion.div>
      </div>
    );
  }

  // Full / Horizontal lockup (ideal for headers and footers)
  const logoFile = "/images/logo_logo horizontal.svg";

  return (
    <div className={`inline-flex items-center ${className}`}>
      <motion.div
        className="relative shrink-0 flex items-center justify-center cursor-pointer"
        whileHover={{ scale: 1.02 }}
        transition={{ type: "spring", stiffness: 120, damping: 14 }}
      >
        <img
          src={logoFile}
          alt="Fabriclicious - High-End Fabric Atelier"
          className={imgClassName || "h-12 sm:h-14 md:h-16 w-auto max-w-[280px] sm:max-w-[360px] object-contain drop-shadow-sm mix-blend-multiply opacity-90"}
        />
      </motion.div>
    </div>
  );
}

