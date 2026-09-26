"use client";

import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import Link from "next/link";
import { ArrowDownRight, Scissors } from "lucide-react";
import { MagneticButton } from "@/components/MagneticButton";

export const AtelierHeroSection: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  // Parallax subtle shift during smooth scroll
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const videoScale = useTransform(scrollYProgress, [0, 1], [1, 1.08]);
  const textY = useTransform(scrollYProgress, [0, 1], ["0%", "25%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  return (
    <section
      ref={containerRef}
      className="relative w-full h-[100dvh] min-h-[700px] overflow-hidden bg-umber text-linen"
    >
      {/* Background Video Layer with Responsive Sources (No Overlay / No Scrim) */}
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
      </motion.div>

      {/* Global Announcement Utility Bar */}
      <div className="absolute top-0 left-0 w-full z-50 bg-loam text-linen py-2 px-4 overflow-hidden border-b border-hemp">
        <div className="flex whitespace-nowrap animate-marquee-slow font-mono text-[10px] uppercase tracking-widest items-center gap-12">
          <span>What is the minimum fabric cut at Fabriclicious?</span>
          <span className="text-hemp">//</span>
          <span>Bespoke continuous cuts from 0.5 meters. Swatch sampling fees are 100% credited against your continuous yardage order.</span>
          <span className="text-hemp">//</span>
          <span>Direct mill provenance: French Normandy linens, Como silk satins, and Yorkshire worsted wools.</span>
          <span className="text-hemp">//</span>
          <span>What is the minimum fabric cut at Fabriclicious?</span>
          <span className="text-hemp">//</span>
          <span>Bespoke continuous cuts from 0.5 meters. Swatch sampling fees are 100% credited against your continuous yardage order.</span>
        </div>
      </div>

      {/* Hero Content Grid */}
      <motion.div
        style={{ y: textY, opacity }}
        className="relative z-10 w-full h-full max-w-7xl mx-auto px-6 md:px-12 flex flex-col justify-end pb-16 md:pb-24"
      >
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end">
          {/* Typographic Anchor */}
          <div className="lg:col-span-7 xl:col-span-8 space-y-4">
            <span className="text-[11px] font-mono uppercase tracking-[0.3em] text-mint block drop-shadow-[0_2px_4px_rgba(0,0,0,0.9)]">
              EUROPEAN MILL SELECTION // CONTINUOUS CUT ATELIER
            </span>
            <h1 className="font-serif text-[clamp(3.5rem,8vw,8rem)] font-light leading-[0.92] tracking-[-0.03em] text-linen drop-shadow-[0_4px_16px_rgba(0,0,0,0.9)]">
              The Architecture <br />
              <span className="italic font-normal font-serif text-linen/95">of Drape.</span>
            </h1>
            <h2 className="mt-4 font-serif text-[clamp(1.5rem,3vw,3rem)] font-light text-linen/90 drop-shadow-[0_2px_8px_rgba(0,0,0,0.9)]">
              Woven for the Discerning Hand.
            </h2>
          </div>

          {/* Narrative Summary & Action Button */}
          <div className="lg:col-span-5 xl:col-span-4 space-y-6 lg:pl-6 border-l border-linen/30 bg-umber/75 p-6 rounded-2xl shadow-2xl backdrop-blur-none">
            <p className="font-sans text-xs md:text-sm leading-relaxed text-linen/95 font-light">
              Fabriclicious supplies continuous unbroken lengths of master-milled natural textiles to bespoke tailors, couturiers, and independent designers. Sourced directly from family-owned European looms, every order is hand-measured along the grainline, cut to your exact fractional decimeter, and backed by a full swatch credit program.
            </p>

            <div className="flex flex-col gap-4 pt-2">
              <MagneticButton as="div" strength={0.25} cursorText="EXPLORE" className="inline-block w-full">
                <Link
                  href="/fabrics"
                  className="w-full inline-flex justify-center items-center gap-3 px-6 py-3.5 bg-linen text-umber text-xs font-medium uppercase tracking-[0.2em] hover:bg-loam hover:text-linen transition-colors duration-300 group shadow-md"
                >
                  <span>Explore the Range of Fabrics</span>
                  <ArrowDownRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:translate-y-0.5 transition-transform" />
                </Link>
              </MagneticButton>

              <MagneticButton as="div" strength={0.25} cursorText="SWATCHES" className="inline-block w-full">
                <Link
                  href="/swatches"
                  className="w-full inline-flex justify-center items-center gap-2 px-5 py-3.5 border border-linen/50 text-linen bg-umber/60 text-xs font-medium uppercase tracking-[0.2em] hover:bg-linen hover:text-umber transition-colors shadow-md"
                >
                  <Scissors className="w-3.5 h-3.5 text-mint" />
                  <span>Order a Swatch Portfolio</span>
                </Link>
              </MagneticButton>
            </div>
            
            <div className="flex flex-col gap-3 pt-6 border-t border-linen/20">
              <div className="flex gap-3 text-[9px] uppercase font-mono tracking-[0.1em] text-linen/80">
                <span className="text-mint shrink-0">01.</span> 
                <span>
                  <strong className="text-linen">UNBROKEN BOLT INTEGRITY</strong> &mdash; Continuous runs cut from single dye lots. Zero fragmented roll remnants.
                </span>
              </div>
              <div className="flex gap-3 text-[9px] uppercase font-mono tracking-[0.1em] text-linen/80">
                <span className="text-mint shrink-0">02.</span>
                <span>
                  <strong className="text-linen">DIRECT EUROPEAN PROVENANCE</strong> &mdash; 100% pure organic flax, Grade 6A mulberry silk, and Super 120s virgin wool.
                </span>
              </div>
              <div className="flex gap-3 text-[9px] uppercase font-mono tracking-[0.1em] text-linen/80">
                <span className="text-mint shrink-0">03.</span>
                <span>
                  <strong className="text-linen">VERIFIABLE SAMPLING CREDIT</strong> &mdash; 10&times;10 cm specimen swatches. Sampling fees are fully refunded on yardage orders over 2.0 meters.
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-6 right-6 md:right-12 hidden md:flex items-center gap-3 font-mono text-[10px] tracking-widest text-linen/70 drop-shadow-[0_1px_3px_rgba(0,0,0,0.9)]">
          <span>SCROLL TO DISCOVER</span>
          <div className="w-8 h-[1px] bg-linen/40" />
        </div>
      </motion.div>
    </section>
  );
};
