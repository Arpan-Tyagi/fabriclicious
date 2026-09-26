"use client";

import React, { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring, useReducedMotion, AnimatePresence } from "motion/react";
import { useCursor, CursorMode } from "@/context/CursorContext";

export function CustomCursor() {
  const { cursorState } = useCursor();
  const shouldReduceMotion = useReducedMotion();
  const [isVisible, setIsVisible] = useState(false);
  const [isTouchOnly, setIsTouchOnly] = useState(false);
  const [hasMoved, setHasMoved] = useState(false);

  // Hardware Dot Motion Values (Instant hardware tracking)
  const rawX = useMotionValue(-100);
  const rawY = useMotionValue(-100);

  // Follower Ring Target Motion Values
  const followerTargetX = useMotionValue(-100);
  const followerTargetY = useMotionValue(-100);

  // Spring Physics for Follower Ring
  const springConfig = { stiffness: 350, damping: 28, mass: 0.35 };
  const springX = useSpring(followerTargetX, springConfig);
  const springY = useSpring(followerTargetY, springConfig);

  useEffect(() => {
    if (typeof window === "undefined") return;

    // Detect true touch-only devices (where hover is not supported at all)
    const touchOnlyQuery = window.matchMedia("(hover: none) and (pointer: coarse)");
    setIsTouchOnly(touchOnlyQuery.matches);

    const handleMediaChange = (e: MediaQueryListEvent) => {
      setIsTouchOnly(e.matches);
    };

    touchOnlyQuery.addEventListener("change", handleMediaChange);

    const handleMouseMove = (e: MouseEvent) => {
      // If mousemove fires, fine-pointer mouse is active
      setIsTouchOnly(false);
      setIsVisible(true);
      setHasMoved(true);

      const x = e.clientX;
      const y = e.clientY;

      rawX.set(x);
      rawY.set(y);

      if (cursorState.mode === "magnetic" && cursorState.targetRect) {
        const rect = cursorState.targetRect;
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        const pullStrength = 0.65;
        const snappedX = x + (centerX - x) * pullStrength;
        const snappedY = y + (centerY - y) * pullStrength;
        followerTargetX.set(snappedX);
        followerTargetY.set(snappedY);
      } else {
        followerTargetX.set(x);
        followerTargetY.set(y);
      }
    };

    const handleMouseLeave = () => setIsVisible(false);
    const handleMouseEnter = () => setIsVisible(true);

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    window.addEventListener("mouseleave", handleMouseLeave);
    window.addEventListener("mouseenter", handleMouseEnter);

    return () => {
      touchOnlyQuery.removeEventListener("change", handleMediaChange);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseleave", handleMouseLeave);
      window.removeEventListener("mouseenter", handleMouseEnter);
    };
  }, [cursorState, rawX, rawY, followerTargetX, followerTargetY]);

  // Accessibility handling & Touch-only killswitch
  if (isTouchOnly || shouldReduceMotion) {
    return null;
  }

  const getFollowerStyles = (mode: CursorMode) => {
    switch (mode) {
      case "hover":
        return "w-12 h-12 bg-loam/10 border border-loam shadow-[0_0_15px_rgba(140,115,85,0.2)]";
      case "inspect":
        return "w-[72px] h-[72px] bg-umber/15 border border-loam/90 shadow-[0_0_20px_rgba(140,115,85,0.25)]";
      case "drag":
        return "w-16 h-9 rounded-full bg-umber/80 border border-loam/80 backdrop-blur-sm shadow-lg";
      case "stepper":
        return "w-9 h-9 bg-loam/20 border border-loam shadow-sm";
      case "magnetic":
        return "w-14 h-14 bg-loam/15 border-2 border-loam shadow-[0_0_25px_rgba(140,115,85,0.3)]";
      case "default":
      default:
        return "w-[28px] h-[28px] bg-transparent border border-loam/60";
    }
  };

  return (
    <>
      {/* Hide native OS cursor ONLY when custom cursor is actively visible & moving */}
      {isVisible && hasMoved && (
        <style>{`
          @media (pointer: fine) {
            *, *::before, *::after {
              cursor: none !important;
            }
          }
        `}</style>
      )}

      {isVisible && hasMoved && (
        <>
          {/* Layer 1: Hardware 6px Instant Dot */}
          <motion.div
            className="fixed top-0 left-0 z-[99999] pointer-events-none w-[6px] h-[6px] bg-umber rounded-full shadow-sm"
            style={{
              x: rawX,
              y: rawY,
              translateX: "-50%",
              translateY: "-50%",
            }}
          />

          {/* Layer 2: Spring-Damped Follower Ring */}
          <motion.div
            className={`fixed top-0 left-0 z-[99998] pointer-events-none rounded-full flex items-center justify-center transition-[width,height,background-color,border-color,box-shadow,border-radius] duration-200 ease-out ${getFollowerStyles(
              cursorState.mode
            )}`}
            style={{
              x: springX,
              y: springY,
              translateX: "-50%",
              translateY: "-50%",
            }}
          >
            {/* Optical loupe reticle for inspect mode */}
            {cursorState.mode === "inspect" && (
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <div className="absolute w-full h-[1px] bg-loam/40" />
                <div className="absolute h-full w-[1px] bg-loam/40" />
                <div className="w-6 h-6 rounded-full border border-loam/50" />
              </div>
            )}

            {/* Contextual Text Label Rendering */}
            <AnimatePresence>
              {cursorState.text && (
                <motion.span
                  key={cursorState.text}
                  initial={{ opacity: 0, scale: 0.7 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.7 }}
                  transition={{ duration: 0.15 }}
                  className={`font-mono text-[9px] uppercase tracking-widest font-semibold select-none pointer-events-none whitespace-nowrap z-10 ${
                    cursorState.mode === "drag" ? "text-linen" : "text-umber"
                  }`}
                >
                  {cursorState.text}
                </motion.span>
              )}
            </AnimatePresence>
          </motion.div>
        </>
      )}
    </>
  );
}

