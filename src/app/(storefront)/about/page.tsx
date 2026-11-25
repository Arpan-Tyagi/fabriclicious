"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

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
          Pure Natural Fabrics <br className="hidden md:block" />
          for <span className="text-loam italic">Every Maker.</span>
        </h1>
        <p className="about-header-text font-sans text-lg md:text-xl text-umber/80 max-w-3xl mx-auto leading-relaxed font-light">
          Most clothes today are made from cheap plastic polyester that feels sweaty and wears out in a few months. Fabriclicious was built on one simple belief: great clothes start with pure, natural, honest fabrics.
        </p>
      </header>

      {/* The Three Tenets */}
      <section className="max-w-5xl mx-auto mb-32">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-24 items-center">
          <div className="reveal-section space-y-6">
            <span className="font-mono text-xs uppercase tracking-[0.2em] text-loam">Pillar 01</span>
            <h2 className="font-serif text-3xl md:text-4xl leading-tight">100% Pure Natural Fibers</h2>
            <p className="font-sans text-umber/80 leading-relaxed text-sm md:text-base">
              We say no to plastic polyester, scratchy nylon, and fake softening chemicals. We only source pure natural fibers that people have loved for thousands of years: breathable French Normandy linen, soft virgin wool, long-staple cotton, and real mulberry silk.
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
            <span className="font-mono text-xs uppercase tracking-[0.2em] text-loam">Pillar 02</span>
            <h2 className="font-serif text-3xl md:text-4xl leading-tight">Direct from Real Weavers</h2>
            <p className="font-sans text-umber/80 leading-relaxed text-sm md:text-base">
              We source directly from heritage textile mills in France, Italy, Belgium, and India. By cutting out brokers and middlemen, we offer luxury fabrics with low minimums, clear prices, and fast delivery straight to your cutting table.
            </p>
          </div>
        </div>
      </section>

      <section className="max-w-5xl mx-auto mb-32">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-24 items-center">
          <div className="reveal-section space-y-6">
            <span className="font-mono text-xs uppercase tracking-[0.2em] text-loam">Pillar 03</span>
            <h2 className="font-serif text-3xl md:text-4xl leading-tight">Continuous Cuts with Zero Stress</h2>
            <p className="font-sans text-umber/80 leading-relaxed text-sm md:text-base">
              We let all our fabric bolts rest flat on wooden tables for 24 hours so the fibers relax before cutting. When your project needs 2.5 or 3.4 meters, you receive one single continuous cut from the same dye roll, cut straight along the weave.
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
