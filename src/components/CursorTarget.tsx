"use client";

import React, { useRef, useCallback, ReactNode, ElementType } from "react";
import { useCursor, CursorMode } from "@/context/CursorContext";

export interface CursorTargetProps extends React.HTMLAttributes<HTMLElement> {
  children: ReactNode;
  mode?: CursorMode;
  text?: string | null;
  className?: string;
  as?: ElementType;
}

export function CursorTarget({
  children,
  mode = "hover",
  text = null,
  className = "",
  as: Component = "div",
  onMouseEnter,
  onMouseLeave,
  onMouseMove,
  ...props
}: CursorTargetProps) {
  const { setCursor, resetCursor } = useCursor();
  const targetRef = useRef<HTMLElement | null>(null);

  const handleMouseEnter = useCallback(
    (e: React.MouseEvent<HTMLElement>) => {
      const rect = targetRef.current ? targetRef.current.getBoundingClientRect() : null;
      setCursor({ mode, text, targetRect: rect });
      if (onMouseEnter) onMouseEnter(e);
    },
    [mode, text, setCursor, onMouseEnter]
  );

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLElement>) => {
      if (mode === "magnetic" || mode === "stepper" || mode === "inspect") {
        const rect = targetRef.current ? targetRef.current.getBoundingClientRect() : null;
        setCursor({ mode, text, targetRect: rect });
      }
      if (onMouseMove) onMouseMove(e);
    },
    [mode, text, setCursor, onMouseMove]
  );

  const handleMouseLeave = useCallback(
    (e: React.MouseEvent<HTMLElement>) => {
      resetCursor();
      if (onMouseLeave) onMouseLeave(e);
    },
    [resetCursor, onMouseLeave]
  );

  return (
    <Component
      ref={targetRef}
      className={className}
      onMouseEnter={handleMouseEnter}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      {...props}
    >
      {children}
    </Component>
  );
}
