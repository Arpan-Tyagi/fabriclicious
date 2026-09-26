"use client";

import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import Link from "next/link";
import { ArrowDownRight, Scissors, Sparkles } from "lucide-react";
import { MagneticButton } from "@/components/MagneticButton";

export const AtelierHeroSection: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  // Parallax subtle shift during smooth scroll
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const videoScale = useTransform(scrollYProgress, [0, 1], [1, 1.08]);
  const textY = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.85], [1, 0]);

  return (
    <section
      ref={containerRef}
      className="relative w-full min-h-[100dvh] overflow-hidden bg-umber text-linen flex flex-col justify-between"
    >
      {/* Background Video Layer with Atmospheric Vignette Overlays */}
      <motion.div style={{ scale: videoScale }} className="absolute inset-0 w-full h-full">
        <video
          autoPlay
          muted
          loop
          playsInline
          poster="/images/hero-poster.jpg"
          preload="metadata"
          className="w-full h-full object-cover"
        >
          <source
            src="/videos/herobng.webm"
            type="video/webm"
          />
        </video>
        {/* Multilayered Cinematic Film Scrims for Flawless Readability */}
        <div className="absolute inset-0 bg-gradient-to-t from-umber via-umber/40 to-transparent pointer-events-none" />
        <div className="absolute inset-0 bg-gradient-to-r from-umber/70 via-umber/20 to-umber/50 pointer-events-none" />
        <div className="absolute top-0 inset-x-0 h-44 bg-gradient-to-b from-umber/80 to-transparent pointer-events-none" />
      </motion.div>

      {/* Main Hero Spatial Canvas */}
      <motion.div
        style={{ y: textY, opacity }}
        className="relative z-20 w-full max-w-7xl mx-auto px-6 sm:px-8 md:px-12 pt-36 sm:pt-40 md:pt-44 flex-1 flex flex-col justify-between"
      >
        {/* Asymmetrical Haute-Couture Split: Monumental Type + Sculpted Glass Island */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-end mb-12 lg:mb-16">
          
          {/* Left Column: Monumental Editorial Display */}
          <div className="lg:col-span-7 xl:col-span-8 space-y-6">
            
            {/* Architectural Eyebrow Badge */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="inline-flex items-center gap-3 px-4 py-1.5 rounded-full bg-linen/10 border border-linen/20 backdrop-blur-md shadow-sm"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-laurel animate-ping" />
              <span className="text-[10px] font-mono uppercase tracking-[0.28em] text-linen/90 font-medium">
                European Mill Selection // Continuous Cut Atelier
              </span>
            </motion.div>

            {/* Main Headline with Optical Kerning */}
            <motion.h1
              initial={{ opacity: 0, y: 28 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="font-serif text-[clamp(3.4rem,7.8vw,7.6rem)] font-light leading-[0.92] tracking-[-0.035em] text-linen drop-shadow-[0_4px_24px_rgba(0,0,0,0.8)]"
            >
              The Architecture <br />
              <span className="italic font-normal text-linen/95 drop-shadow-[0_4px_30px_rgba(0,0,0,0.9)]">
                of Drape.
              </span>
            </motion.h1>

            {/* Editorial Sub-headline */}
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
              className="font-serif text-[clamp(1.35rem,2.4vw,2.2rem)] font-light text-linen/85 leading-snug tracking-tight max-w-2xl drop-shadow-[0_2px_12px_rgba(0,0,0,0.8)]"
            >
              Woven for the Discerning Hand. Single-bolt continuous natural textiles curated from Europe’s heritage family looms.
            </motion.h2>
          </div>

          {/* Right Column: Double-Bezel Frosted Glass Sanctuary */}
          <motion.div
            initial={{ opacity: 0, y: 32, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 1.1, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-5 xl:col-span-4"
          >
            {/* Outer Hardware Shell */}
            <div className="p-1 rounded-[2rem] bg-linen/10 border border-linen/20 backdrop-blur-xl shadow-[0_24px_64px_rgba(0,0,0,0.5)]">
              {/* Inner Tactile Core */}
              <div className="p-7 sm:p-8 rounded-[calc(2rem-0.25rem)] bg-umber/70 border border-linen/10 space-y-6">
                
                <div className="space-y-3">
                  <div className="flex items-center justify-between pb-2 border-b border-linen/15">
                    <span className="font-mono text-[9px] uppercase tracking-[0.24em] text-loam">
                      Atelier Protocol
                    </span>
                    <span className="font-mono text-[9px] uppercase tracking-[0.2em] text-linen/50">
                      Standard 0.5m &ndash; 25m+
                    </span>
                  </div>
                  <p className="font-sans text-xs sm:text-[13px] leading-relaxed text-linen/80 font-light">
                    Every order is hand-inspected under balanced daylight lamps, relaxed for 24 hours on hardwood cutting tables, and sliced along the true grainline to preserve pattern stability.
                  </p>
                </div>

                {/* Kinetic Luxury Island Actions */}
                <div className="flex flex-col gap-3.5 pt-2">
                  <MagneticButton as="div" strength={0.2} cursorText="EXPLORE" className="w-full">
                    <Link
                      href="/fabrics"
                      className="w-full group relative inline-flex items-center justify-between pl-7 pr-2.5 py-2.5 rounded-full bg-linen text-umber text-xs font-mono uppercase tracking-[0.2em] font-medium hover:bg-loam hover:text-linen transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] shadow-[0_8px_24px_rgba(0,0,0,0.25)]"
                    >
                      <span>Explore The Archive</span>
                      <span className="w-9 h-9 rounded-full bg-umber/10 text-umber group-hover:bg-linen group-hover:text-loam flex items-center justify-center transition-all duration-300">
                        <ArrowDownRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:translate-y-0.5 transition-transform" />
                      </span>
                    </Link>
                  </MagneticButton>

                  <MagneticButton as="div" strength={0.2} cursorText="SWATCHES" className="w-full">
                    <Link
                      href="/swatches"
                      className="w-full group inline-flex items-center justify-center gap-3 px-6 py-3.5 rounded-full border border-linen/25 text-linen/90 hover:text-linen hover:border-linen/50 bg-linen/5 hover:bg-linen/10 backdrop-blur-sm text-xs font-mono uppercase tracking-[0.18em] transition-all duration-300"
                    >
                      <Scissors className="w-3.5 h-3.5 text-laurel group-hover:rotate-12 transition-transform duration-300" />
                      <span>Order Swatch Portfolio</span>
                    </Link>
                  </MagneticButton>
                </div>

                {/* Subtext Credibility Tag */}
                <div className="pt-2 text-center">
                  <span className="font-mono text-[9px] uppercase tracking-[0.18em] text-linen/45 flex items-center justify-center gap-2">
                    <Sparkles className="w-3 h-3 text-loam" />
                    Sampling fee 100% credited toward continuous yardage
                  </span>
                </div>

              </div>
            </div>
          </motion.div>

        </div>

        {/* Lower Architectural Horizon: 3-Pillar Proof Bar */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="w-full pt-8 pb-8 border-t border-linen/20 grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 items-start relative"
        >
          {/* Pillar 01 */}
          <div className="flex items-start gap-4">
            <span className="font-mono text-sm text-laurel font-medium tracking-widest pt-0.5">01</span>
            <div className="space-y-1">
              <h4 className="font-mono text-[11px] uppercase tracking-[0.24em] text-linen font-medium">
                Unbroken Bolt Integrity
              </h4>
              <p className="font-sans text-xs text-linen/65 font-light leading-relaxed">
                Guaranteed continuous runs cut from single dye lots. Zero fragmented roll remnants or spliced seams.
              </p>
            </div>
          </div>

          {/* Pillar 02 */}
          <div className="flex items-start gap-4 md:border-l md:border-linen/20 md:pl-8">
            <span className="font-mono text-sm text-laurel font-medium tracking-widest pt-0.5">02</span>
            <div className="space-y-1">
              <h4 className="font-mono text-[11px] uppercase tracking-[0.24em] text-linen font-medium">
                Direct European Provenance
              </h4>
              <p className="font-sans text-xs text-linen/65 font-light leading-relaxed">
                100% pure organic Normandy flax, Grade 6A Como silk, and Super 120s Biella virgin wool. Zero synthetics.
              </p>
            </div>
          </div>

          {/* Pillar 03 */}
          <div className="flex items-start gap-4 md:border-l md:border-linen/20 md:pl-8">
            <span className="font-mono text-sm text-laurel font-medium tracking-widest pt-0.5">03</span>
            <div className="space-y-1">
              <h4 className="font-mono text-[11px] uppercase tracking-[0.24em] text-linen font-medium">
                100% Swatch Credit Ledger
              </h4>
              <p className="font-sans text-xs text-linen/65 font-light leading-relaxed">
                Generous 10&times;10 cm specimens cut with pinking shears. Full sampling investment credited back on cuts over 2.0m.
              </p>
            </div>
          </div>
        </motion.div>

      </motion.div>
    </section>
  );
};
