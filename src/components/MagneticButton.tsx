"use client";

import { useRef, useCallback, useEffect, type ReactNode } from "react";
import { motion, useSpring, useMotionValue } from "motion/react";
import { useCursor } from "@/context/CursorContext";

/**
 * MagneticButton — Applies a subtle magnetic pull toward the cursor,
 * and synchronizes with the luxury CustomCursor for magnetic target snapping.
 */
export function MagneticButton({
  children,
  className = "",
  strength = 0.3,
  as = "button",
  cursorText = null,
  ...props
}: {
  children: ReactNode;
  className?: string;
  strength?: number;
  as?: "button" | "a" | "div";
  cursorText?: string | null;
  [key: string]: any;
}) {
  const ref = useRef<HTMLElement>(null);
  const { setCursor, resetCursor } = useCursor();

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const springX = useSpring(x, { stiffness: 150, damping: 15, mass: 0.1 });
  const springY = useSpring(y, { stiffness: 150, damping: 15, mass: 0.1 });

  const handleMouseMove = useCallback(
    (e: React.MouseEvent) => {
      if (!ref.current) return;
      const rect = ref.current.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      const distX = e.clientX - centerX;
      const distY = e.clientY - centerY;

      x.set(distX * strength);
      y.set(distY * strength);

      setCursor({ mode: "magnetic", text: cursorText, targetRect: rect });
    },
    [strength, x, y, setCursor, cursorText],
  );

  const handleMouseLeave = useCallback(() => {
    x.set(0);
    y.set(0);
    resetCursor();
  }, [x, y, resetCursor]);

  useEffect(() => {
    const handleGlobalMouseMove = (e: MouseEvent) => {
      if (!ref.current) return;
      const rect = ref.current.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;

      const distanceToCenterX = Math.abs(e.clientX - centerX);
      const distanceToCenterY = Math.abs(e.clientY - centerY);

      const isWithin40px =
        distanceToCenterX < rect.width / 2 + 40 &&
        distanceToCenterY < rect.height / 2 + 40;

      if (isWithin40px) {
        const distX = e.clientX - centerX;
        const distY = e.clientY - centerY;
        x.set(distX * strength);
        y.set(distY * strength);
        setCursor({ mode: "magnetic", text: cursorText, targetRect: rect });
      } else {
        if (x.get() !== 0) {
          x.set(0);
          y.set(0);
          resetCursor();
        }
      }
    };

    window.addEventListener("mousemove", handleGlobalMouseMove, {
      passive: true,
    });
    return () => window.removeEventListener("mousemove", handleGlobalMouseMove);
  }, [x, y, strength, setCursor, cursorText, resetCursor]);

  const MotionComponent = motion[as] as any;

  return (
    <MotionComponent
      ref={ref}
      className={className}
      style={{ x: springX, y: springY }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      {...props}
    >
      {children}
    </MotionComponent>
  );
}
