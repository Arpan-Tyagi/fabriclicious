"use client";

import { useEffect, ReactNode } from "react";

export function SmoothScrollProvider({ children }: { children: ReactNode }) {
  useEffect(() => {
    if (typeof window === "undefined") return;

    // Do not initialize Lenis on touch-only mobile devices to save main-thread frame budget
    const isTouchOnly = window.matchMedia("(hover: none) and (pointer: coarse)").matches;
    if (isTouchOnly) return;

    let lenisInstance: any = null;
    let rafId: number;

    // Dynamically import Lenis to decouple it from the critical first-load bundle
    import("lenis").then(({ default: Lenis }) => {
      lenisInstance = new Lenis({
        duration: 1.1,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        wheelMultiplier: 0.85,
      });

      function raf(time: number) {
        lenisInstance?.raf(time);
        rafId = requestAnimationFrame(raf);
      }

      rafId = requestAnimationFrame(raf);
    });

    return () => {
      if (rafId) cancelAnimationFrame(rafId);
      lenisInstance?.destroy();
    };
  }, []);

  return <>{children}</>;
}
