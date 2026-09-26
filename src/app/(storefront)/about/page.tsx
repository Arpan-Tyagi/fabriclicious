"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";

gsap.registerPlugin(ScrollTrigger);

export default function AboutPage() {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (!containerRef.current) return;

    // Header Animation
    gsap.fromTo(".about-header-text",
      { y: 50, opacity: 0 },
      { y: 0, opacity: 1, duration: 1.2, stagger: 0.15, ease: "power3.out", delay: 0.1 }
    );

    // Section Reveals
    const sections = gsap.utils.toArray<HTMLElement>(".reveal-section");
    sections.forEach(section => {
      gsap.fromTo(section,
        { y: 50, opacity: 0 },
        { 
          y: 0, 
          opacity: 1, 
          duration: 1, 
          ease: "power2.out",
          scrollTrigger: {
            trigger: section,
            start: "top 80%",
            toggleActions: "play none none reverse"
          }
        }
      );
    });

  }, { scope: containerRef });

  return (
    <div ref={containerRef} className="bg-linen text-umber min-h-screen pt-32 pb-24 px-6 md:px-10 selection:bg-loam selection:text-linen">
      
      {/* Header */}
      <header className="max-w-4xl mx-auto text-center mb-32">
        <h1 className="about-header-text font-serif text-5xl md:text-7xl lg:text-[6rem] leading-[0.9] tracking-tighter mb-8">
          Reviving the Reverence <br className="hidden md:block" />
          for the <span className="text-loam italic">Loom.</span>
        </h1>
        <p className="about-header-text font-sans text-lg md:text-xl text-umber/80 max-w-3xl mx-auto leading-relaxed font-light">
          In an era of synthetic blends that degrade in a single season, Fabriclicious was established on a simple conviction: Great design begins with honest cloth.
        </p>
      </header>

      {/* The Three Tenets */}
      <section className="max-w-5xl mx-auto mb-32">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-24 items-center">
          <div className="reveal-section space-y-6">
            <span className="font-mono text-xs uppercase tracking-[0.2em] text-loam">Foundation 01</span>
            <h2 className="font-serif text-3xl md:text-4xl leading-tight">Natural Fiber Purity</h2>
            <p className="font-sans text-umber/80 leading-relaxed text-sm md:text-base">
              We reject synthetic polyester dilution, acrylic coatings, and chemical softeners. Our collection is built on natural fibers that have clothed humanity for millennia: French Normandy flax, alpine virgin wool, organic long-staple cotton, and Como mulberry silk.
            </p>
          </div>
          <div className="reveal-section aspect-[4/5] bg-limestone overflow-hidden rounded-[2rem]">
            <img src="/vintage_loom.jpg" alt="Natural Fibers" className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-1000" />
          </div>
        </div>
      </section>

      <section className="max-w-5xl mx-auto mb-32">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-24 items-center">
          <div className="reveal-section aspect-[4/5] bg-limestone overflow-hidden rounded-[2rem] order-2 md:order-1">
            <img src="/tailoring_shears.jpg" alt="Direct Mill Partnerships" className="w-full h-full object-cover hover:scale-105 transition-all duration-[2s]" />
          </div>
          <div className="reveal-section space-y-6 order-1 md:order-2">
            <span className="font-mono text-xs uppercase tracking-[0.2em] text-loam">Foundation 02</span>
            <h2 className="font-serif text-3xl md:text-4xl leading-tight">Direct European Mill Partnerships</h2>
            <p className="font-sans text-umber/80 leading-relaxed text-sm md:text-base">
              We bypass intermediary brokers to collaborate directly with generational family-owned weaving mills in Biella, Como, Lyon, and Flanders. We verify water filtration protocols, yarn twist specifications, and low-impact dyeing standards firsthand.
            </p>
          </div>
        </div>
      </section>

      <section className="max-w-5xl mx-auto mb-32">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-24 items-center">
          <div className="reveal-section space-y-6">
            <span className="font-mono text-xs uppercase tracking-[0.2em] text-loam">Foundation 03</span>
            <h2 className="font-serif text-3xl md:text-4xl leading-tight">The Cutter's Respect</h2>
            <p className="font-sans text-umber/80 leading-relaxed text-sm md:text-base">
              Cloth must never be pulled or hurried. Every bolt rests on our wooden tables for 24 hours to relax tension before cutting. When your pattern calls for 2.8 meters, you receive exactly 2.8 meters—hand-sliced along the true grainline.
            </p>
          </div>
          <div className="reveal-section aspect-[4/5] bg-limestone overflow-hidden rounded-[2rem]">
            <img src="/paper_pattern.jpg" alt="Cutter's Table" className="w-full h-full object-cover hover:scale-105 transition-all duration-[2s]" />
          </div>
        </div>
      </section>

    </div>
  );
}
