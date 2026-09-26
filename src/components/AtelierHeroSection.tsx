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
  const textY = useTransform(scrollYProgress, [0, 1], ["0%", "15%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.85], [1, 0]);

  return (
    <section
      ref={containerRef}
      className="relative w-full h-[100dvh] min-h-[640px] max-h-[100dvh] overflow-hidden bg-umber text-linen flex flex-col justify-between"
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
        <div className="absolute top-0 inset-x-0 h-36 bg-gradient-to-b from-umber/80 to-transparent pointer-events-none" />
      </motion.div>

      {/* Main Hero Spatial Canvas (Guaranteed 100dvh Fit) */}
      <motion.div
        style={{ y: textY, opacity }}
        className="relative z-20 w-full max-w-7xl mx-auto px-6 sm:px-8 md:px-12 pt-28 sm:pt-32 md:pt-34 pb-4 sm:pb-6 flex-1 flex flex-col justify-between"
      >
        {/* Asymmetrical Haute-Couture Split: Monumental Type + Sculpted Glass Island */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-end my-auto py-2">
          
          {/* Left Column: Monumental Editorial Display */}
          <div className="lg:col-span-7 xl:col-span-8 space-y-3 sm:space-y-4">
            
            {/* Architectural Eyebrow Badge */}
            <motion.div
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="inline-flex items-center gap-2.5 px-3.5 py-1 rounded-full bg-linen/10 border border-linen/20 backdrop-blur-md shadow-sm"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-laurel animate-ping" />
              <span className="text-[9.5px] font-mono uppercase tracking-[0.26em] text-linen/90 font-medium">
                European Mill Selection // Continuous Cut Atelier
              </span>
            </motion.div>

            {/* Main Headline with Optical Kerning */}
            <motion.h1
              initial={{ opacity: 0, y: 22 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="font-serif text-[clamp(2.8rem,5.6vw,5.5rem)] font-light leading-[0.93] tracking-[-0.035em] text-linen drop-shadow-[0_4px_24px_rgba(0,0,0,0.85)]"
            >
              The Architecture <br />
              <span className="italic font-normal text-linen/95 drop-shadow-[0_4px_30px_rgba(0,0,0,0.95)]">
                of Drape.
              </span>
            </motion.h1>

            {/* Editorial Sub-headline */}
            <motion.h2
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
              className="font-serif text-[clamp(1.15rem,1.9vw,1.75rem)] font-light text-linen/85 leading-snug tracking-tight max-w-xl drop-shadow-[0_2px_12px_rgba(0,0,0,0.8)]"
            >
              Woven for the Discerning Hand. Single-bolt continuous natural textiles curated from Europe’s heritage family looms.
            </motion.h2>
          </div>

          {/* Right Column: Double-Bezel Frosted Glass Sanctuary */}
          <motion.div
            initial={{ opacity: 0, y: 24, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 1.1, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-5 xl:col-span-4"
          >
            {/* Outer Hardware Shell */}
            <div className="p-1 rounded-[1.75rem] bg-linen/10 border border-linen/20 backdrop-blur-xl shadow-[0_20px_50px_rgba(0,0,0,0.45)]">
              {/* Inner Tactile Core */}
              <div className="p-5 sm:p-6 rounded-[calc(1.75rem-0.25rem)] bg-umber/75 border border-linen/10 space-y-4">
                
                <div className="space-y-2">
                  <div className="flex items-center justify-between pb-1.5 border-b border-linen/15">
                    <span className="font-mono text-[8.5px] uppercase tracking-[0.24em] text-loam">
                      Atelier Protocol
                    </span>
                    <span className="font-mono text-[8.5px] uppercase tracking-[0.2em] text-linen/50">
                      Standard 0.5m &ndash; 25m+
                    </span>
                  </div>
                  <p className="font-sans text-xs leading-relaxed text-linen/80 font-light">
                    Every order is hand-inspected under balanced daylight lamps, relaxed for 24 hours on hardwood cutting tables, and sliced along the true grainline to preserve pattern stability.
                  </p>
                </div>

                {/* Kinetic Luxury Island Actions */}
                <div className="flex flex-col gap-2.5 pt-1">
                  <MagneticButton as="div" strength={0.2} cursorText="EXPLORE" className="w-full">
                    <Link
                      href="/fabrics"
                      className="w-full group relative inline-flex items-center justify-between pl-6 pr-2 py-2 rounded-full bg-linen text-umber text-[11px] font-mono uppercase tracking-[0.18em] font-medium hover:bg-loam hover:text-linen transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] shadow-[0_6px_20px_rgba(0,0,0,0.25)]"
                    >
                      <span>Explore The Archive</span>
                      <span className="w-8 h-8 rounded-full bg-umber/10 text-umber group-hover:bg-linen group-hover:text-loam flex items-center justify-center transition-all duration-300">
                        <ArrowDownRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:translate-y-0.5 transition-transform" />
                      </span>
                    </Link>
                  </MagneticButton>

                  <MagneticButton as="div" strength={0.2} cursorText="SWATCHES" className="w-full">
                    <Link
                      href="/swatches"
                      className="w-full group inline-flex items-center justify-center gap-2.5 px-5 py-2.5 rounded-full border border-linen/25 text-linen/90 hover:text-linen hover:border-linen/50 bg-linen/5 hover:bg-linen/10 backdrop-blur-sm text-[11px] font-mono uppercase tracking-[0.16em] transition-all duration-300"
                    >
                      <Scissors className="w-3.5 h-3.5 text-laurel group-hover:rotate-12 transition-transform duration-300" />
                      <span>Order Swatch Portfolio</span>
                    </Link>
                  </MagneticButton>
                </div>

                {/* Subtext Credibility Tag */}
                <div className="pt-1 text-center">
                  <span className="font-mono text-[8.5px] uppercase tracking-[0.16em] text-linen/50 flex items-center justify-center gap-1.5">
                    <Sparkles className="w-2.5 h-2.5 text-loam" />
                    Sampling fee 100% credited toward continuous yardage
                  </span>
                </div>

              </div>
            </div>
          </motion.div>

        </div>

        {/* Lower Architectural Horizon: 3-Pillar Proof Bar (100% Visible Above The Fold) */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.35, ease: [0.16, 1, 0.3, 1] }}
          className="w-full pt-4 sm:pt-5 pb-2 sm:pb-3 border-t border-linen/20 grid grid-cols-1 md:grid-cols-3 gap-5 md:gap-8 items-start relative shrink-0"
        >
          {/* Pillar 01 */}
          <div className="flex items-start gap-3.5">
            <span className="font-mono text-xs sm:text-sm text-laurel font-medium tracking-widest pt-0.5 shrink-0">01</span>
            <div className="space-y-0.5">
              <h4 className="font-mono text-[10.5px] sm:text-[11px] uppercase tracking-[0.22em] text-linen font-medium">
                Unbroken Bolt Integrity
              </h4>
              <p className="font-sans text-xs text-linen/70 font-light leading-relaxed">
                Guaranteed continuous runs cut from single dye lots. Zero fragmented roll remnants or spliced seams.
              </p>
            </div>
          </div>

          {/* Pillar 02 */}
          <div className="flex items-start gap-3.5 md:border-l md:border-linen/20 md:pl-7">
            <span className="font-mono text-xs sm:text-sm text-laurel font-medium tracking-widest pt-0.5 shrink-0">02</span>
            <div className="space-y-0.5">
              <h4 className="font-mono text-[10.5px] sm:text-[11px] uppercase tracking-[0.22em] text-linen font-medium">
                Direct European Provenance
              </h4>
              <p className="font-sans text-xs text-linen/70 font-light leading-relaxed">
                100% pure organic Normandy flax, Grade 6A Como silk, and Super 120s Biella virgin wool. Zero synthetics.
              </p>
            </div>
          </div>

          {/* Pillar 03 */}
          <div className="flex items-start gap-3.5 md:border-l md:border-linen/20 md:pl-7 lg:pr-12">
            <span className="font-mono text-xs sm:text-sm text-laurel font-medium tracking-widest pt-0.5 shrink-0">03</span>
            <div className="space-y-0.5">
              <h4 className="font-mono text-[10.5px] sm:text-[11px] uppercase tracking-[0.22em] text-linen font-medium">
                100% Swatch Credit Ledger
              </h4>
              <p className="font-sans text-xs text-linen/70 font-light leading-relaxed">
                Generous 10&times;10 cm specimens cut with pinking shears. Full sampling investment credited back on cuts over 2.0m.
              </p>
            </div>
          </div>
        </motion.div>

      </motion.div>
    </section>
  );
};
