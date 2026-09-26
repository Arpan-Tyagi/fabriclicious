"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface CategoryEditorialProps {
  data: {
    title: string;
    description: string;
    usage: string;
    whenToBuy: string;
    feel: string;
    buyingGuide: string;
  };
}

export function CategoryEditorial({ data }: CategoryEditorialProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (!containerRef.current) return;

    const tl = gsap.timeline();

    tl.fromTo(
      ".ed-title-line",
      { y: 150, opacity: 0, rotateZ: 5 },
      { y: 0, opacity: 1, rotateZ: 0, duration: 1.6, ease: "power4.out", stagger: 0.1 }
    )
    .fromTo(
      ".ed-desc",
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 1.2, ease: "power3.out" },
      "-=1.2"
    )
    .fromTo(
      ".ed-detail",
      { opacity: 0, x: -20 },
      { opacity: 1, x: 0, duration: 0.8, stagger: 0.1, ease: "power2.out" },
      "-=0.8"
    );

    // Parallax effect on scroll
    ScrollTrigger.create({
      trigger: containerRef.current,
      start: "top 80%",
      end: "bottom top",
      animation: gsap.to(".ed-content", { y: 120, opacity: 0.3, ease: "none" }),
      scrub: 1,
    });
  }, { scope: containerRef });

  return (
    <div ref={containerRef} className="relative pt-32 pb-24 md:pt-48 md:pb-32 px-6 md:px-10 min-h-[80vh] flex flex-col justify-center overflow-hidden border-b border-hemp bg-limestone">
      <div className="ed-content max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-24">
        
        {/* Left: Giant Title & Desc */}
        <div className="lg:col-span-7">
          <div className="overflow-hidden pb-4 mb-6">
            <h1 className="ed-title-line font-serif text-[clamp(4rem,12vw,12rem)] leading-[0.85] tracking-tighter text-umber">
              {data.title}
            </h1>
          </div>
          <p className="ed-desc font-sans text-xl md:text-3xl text-umber/70 leading-relaxed max-w-3xl font-light">
            {data.description}
          </p>
        </div>

        {/* Right: Details */}
        <div className="lg:col-span-5 flex flex-col justify-end space-y-10">
          {[
            { label: "Usage", value: data.usage },
            { label: "When to buy", value: data.whenToBuy },
            { label: "Hand-feel", value: data.feel },
            { label: "Buying guide", value: data.buyingGuide },
          ].map((item, idx) => (
            <div key={idx} className="ed-detail border-l border-umber/20 pl-6">
              <h3 className="font-mono text-xs uppercase tracking-[0.2em] text-umber/50 mb-3">
                {item.label}
              </h3>
              <p className="font-serif text-xl md:text-2xl text-umber leading-snug">
                {item.value}
              </p>
            </div>
          ))}
        </div>
        
      </div>
    </div>
  );
}
