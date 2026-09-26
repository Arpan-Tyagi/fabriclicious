"use client";

import React, { createContext, useContext, useState, useCallback, useMemo, ReactNode } from "react";

export type CursorMode = "default" | "hover" | "inspect" | "drag" | "stepper" | "magnetic";

export interface CursorTargetOptions {
  mode?: CursorMode;
  text?: string | null;
  targetRect?: DOMRect | null;
}

export interface CursorState {
  mode: CursorMode;
  text: string | null;
  targetRect: DOMRect | null;
}

interface CursorContextType {
  cursorState: CursorState;
  setCursorMode: (mode: CursorMode, text?: string | null, targetRect?: DOMRect | null) => void;
  setCursor: (options: CursorTargetOptions) => void;
  resetCursor: () => void;
}

const CursorContext = createContext<CursorContextType | undefined>(undefined);

export function CursorProvider({ children }: { children: ReactNode }) {
  const [cursorState, setCursorState] = useState<CursorState>({
    mode: "default",
    text: null,
    targetRect: null,
  });

  const setCursorMode = useCallback(
    (mode: CursorMode, text: string | null = null, targetRect: DOMRect | null = null) => {
      setCursorState({ mode, text, targetRect });
    },
    []
  );

  const setCursor = useCallback((options: CursorTargetOptions) => {
    setCursorState({
      mode: options.mode ?? "default",
      text: options.text !== undefined ? options.text : null,
      targetRect: options.targetRect !== undefined ? options.targetRect : null,
    });
  }, []);

  const resetCursor = useCallback(() => {
    setCursorState({ mode: "default", text: null, targetRect: null });
  }, []);

  const value = useMemo(
    () => ({ cursorState, setCursorMode, setCursor, resetCursor }),
    [cursorState, setCursorMode, setCursor, resetCursor]
  );

  return (
    <CursorContext.Provider value={value}>
      {children}
    </CursorContext.Provider>
  );
}

export function useCursor() {
  const context = useContext(CursorContext);
  if (!context) {
    throw new Error("useCursor must be used within a CursorProvider");
  }
  return context;
}
