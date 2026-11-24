"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { CursorTarget } from "@/components/CursorTarget";

export function MacroWeaveLoupe({ imageSrc }: { imageSrc: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLImageElement | null>(null);
  const [isHovered, setIsHovered] = useState(false);
  const mousePos = useRef({ x: 0, y: 0 });
  const rafId = useRef<number | null>(null);
  const canvasSize = useRef({ w: 0, h: 0 });

  // Preload the high-res weave image into an offscreen buffer
  useEffect(() => {
    const img = new Image();
    img.crossOrigin = "anonymous";
    img.src = imageSrc;
    img.onload = () => {
      imageRef.current = img;
    };
    return () => {
      img.onload = null;
    };
  }, [imageSrc]);

  // Observe container resize and cache dimensions — avoids getBoundingClientRect in the hot loop
  useEffect(() => {
    const container = containerRef.current;
    const limestone = canvasRef.current;
    if (!container || !limestone) return;

    const syncSize = () => {
      const rect = container.getBoundingClientRect();
      const dpr = window.devicePixelRatio || 1;
      canvasSize.current = { w: rect.width, h: rect.height };
      limestone.width = rect.width * dpr;
      limestone.height = rect.height * dpr;
      limestone.style.width = `${rect.width}px`;
      limestone.style.height = `${rect.height}px`;
    };

    const observer = new ResizeObserver(syncSize);
    observer.observe(container);
    syncSize(); // initial

    return () => observer.disconnect();
  }, []);

  // Pure single-frame render function — called ONLY on actual pointer movement
  const renderFrame = useCallback(() => {
    const limestone = canvasRef.current;
    const img = imageRef.current;
    const { w, h } = canvasSize.current;
    if (!limestone || !img || !w || !h) return;

    const ctx = limestone.getContext("2d", { willReadFrequently: false });
    if (!ctx) return;

    const dpr = window.devicePixelRatio || 1;
    const ZOOM = 4;
    const LOUPE_RADIUS = 160;

    const mx = mousePos.current.x * dpr;
    const my = mousePos.current.y * dpr;
    const lr = LOUPE_RADIUS * dpr;

    ctx.clearRect(0, 0, limestone.width, limestone.height);
    ctx.imageSmoothingEnabled = true;
    ctx.imageSmoothingQuality = "high";

    // Circular clip for the loupe lens
    ctx.save();
    ctx.beginPath();
    ctx.arc(mx, my, lr, 0, Math.PI * 2);
    ctx.clip();

    // Source coordinates from the full-res image
    const sx = (mousePos.current.x / w) * img.width;
    const sy = (mousePos.current.y / h) * img.height;
    const sWidth = (LOUPE_RADIUS * 2) / ZOOM;
    const sHeight = (LOUPE_RADIUS * 2) / ZOOM;
    const srcX = sx - sWidth / 2;
    const srcY = sy - sHeight / 2;

    ctx.drawImage(
      img,
      srcX, srcY, sWidth, sHeight,
      mx - lr, my - lr, lr * 2, lr * 2
    );

    // Optical pick-glass crosshair reticle lines
    ctx.strokeStyle = "rgba(230, 226, 216, 0.45)"; // Reticle lines (Pumice Linen)
    ctx.lineWidth = 1 * dpr;

    ctx.beginPath();
    ctx.moveTo(mx - lr, my);
    ctx.lineTo(mx + lr, my);
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(mx, my - lr);
    ctx.lineTo(mx, my + lr);
    ctx.stroke();

    // Inner concentric ring
    ctx.beginPath();
    ctx.arc(mx, my, lr * 0.4, 0, Math.PI * 2);
    ctx.stroke();

    // Soft outer ring (#1C1A18/10)
    ctx.lineWidth = 1 * dpr;
    ctx.strokeStyle = "rgba(28, 26, 24, 0.1)"; // Umber 10%
    ctx.beginPath();
    ctx.arc(mx, my, lr + 1.5 * dpr, 0, Math.PI * 2);
    ctx.stroke();

    // Outer loupe ring (Spun Hemp)
    ctx.lineWidth = 1 * dpr;
    ctx.strokeStyle = "#CBC4B5"; // Hemp
    ctx.beginPath();
    ctx.arc(mx, my, lr, 0, Math.PI * 2);
    ctx.stroke();

    ctx.restore();
    rafId.current = null;
  }, []);

  // Event-driven mouse move handler: requests a frame ONLY when mouse coordinate updates
  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    mousePos.current = { 
      x: e.nativeEvent.offsetX, 
      y: e.nativeEvent.offsetY 
    };

    if (rafId.current === null) {
      rafId.current = requestAnimationFrame(renderFrame);
    }
  }, [renderFrame]);

  // Clean up any pending RAF on unmount or unhover
  useEffect(() => {
    return () => {
      if (rafId.current !== null) {
        cancelAnimationFrame(rafId.current);
        rafId.current = null;
      }
    };
  }, []);

  const handleMouseEnter = useCallback((e: React.MouseEvent) => {
    setIsHovered(true);
    handleMouseMove(e);
  }, [handleMouseMove]);

  const handleMouseLeave = useCallback(() => {
    setIsHovered(false);
    if (rafId.current !== null) {
      cancelAnimationFrame(rafId.current);
      rafId.current = null;
    }
    const limestone = canvasRef.current;
    if (limestone) {
      const ctx = limestone.getContext("2d");
      if (ctx) ctx.clearRect(0, 0, limestone.width, limestone.height);
    }
  }, []);

  return (
    <CursorTarget mode="inspect" text="INSPECT" className="w-full h-full">
      <div
        ref={containerRef}
        className="relative w-full h-full overflow-hidden cursor-crosshair group bg-limestone bg-cover bg-center rounded-2xl border border-hemp shadow-[0_4px_20px_rgba(28,26,24,0.08)]"
        style={{ backgroundImage: `url(${imageSrc})` }}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onMouseMove={handleMouseMove}
      >
        <canvas
          ref={canvasRef}
          className={`absolute inset-0 pointer-events-none transition-opacity duration-300 ${isHovered ? 'opacity-100' : 'opacity-0'}`}
        />
        <div className="absolute bottom-8 left-8 font-mono text-[10px] uppercase tracking-[0.2em] text-umber bg-limestone/90 backdrop-blur-md px-4 py-2 rounded-full border border-hemp opacity-100 group-hover:opacity-0 transition-opacity">
          Hover to inspect macro weave
        </div>
      </div>
    </CursorTarget>
  );
}
