"use client";
import { Point } from 'motion';
import type { Dispatch, SetStateAction } from "react";
import { createContext, type ReactNode, useContext, useEffect, useRef, useState } from 'react';

export type CursorType = 'default' | 'loading' | 'text' | 'button' | 'link' | 'disabled' | 'drag';

export interface MouseCursorContextType {
  cursorType: CursorType;
  setCursorType: Dispatch<SetStateAction<CursorType>>; // added
  isMouseInWindow: boolean;
  showCustomCursor: boolean;
  setShowCustomCursor: Dispatch<SetStateAction<boolean>>; // added
  getLastMousePos?: () => { x: number; y: number } | undefined;
}

export const MouseCursorContext = createContext<MouseCursorContextType>({
  cursorType: "default", // added/ensure default
  setCursorType: () => { }, // added no-op
  isMouseInWindow: true,
  showCustomCursor: false, // or your current default
  setShowCustomCursor: () => { }, // added no-op
});

interface MouseCursorProviderProps {
  children: ReactNode;
  initialShowCustomCursor?: boolean; // from server cookie
}

export function MouseCursorProvider({ children }: MouseCursorProviderProps) {
  const [cursorType, setCursorType] = useState<CursorType>('loading');
  const [isMouseInWindow, setIsMouseInWindow] = useState(false);
  const [showCustomCursor, setShowCustomCursor] = useState<boolean>(false); // ensure this exists

  // New: store last known pointer position without causing re-renders
  const lastMousePosRef = useRef<Point | undefined>(undefined);

  // Persist to cookie
  useEffect(() => {
    try {
      const secure = typeof window !== 'undefined' && window.location.protocol === 'https:';
      document.cookie = [
        `showCustomCursor=${showCustomCursor ? '1' : '0'}`,
        'Path=/',
        'SameSite=Lax',
        'Max-Age=31536000', // 1 year
        secure ? 'Secure' : undefined,
      ]
        .filter(Boolean)
        .join('; ');
    } catch { }
  }, [showCustomCursor]);

  useEffect(() => {
    // Hide system cursor when showing ANY custom cursor
    if (showCustomCursor) {
      document.body.classList.add('custom-cursor');
    } else {
      document.body.classList.remove('custom-cursor');
    }

    return () => {
      document.body.classList.remove('custom-cursor');
    };
  }, [showCustomCursor]);

  // Mouse detection
  useEffect(() => {
    const handleMouseEnter = () => setIsMouseInWindow(true);
    const handleMouseLeave = () => setIsMouseInWindow(false);
    const handleWindowMouseOut = (e: MouseEvent) => {
      if (!e.relatedTarget) {
        setIsMouseInWindow(false);
      }
    };

    document.documentElement.addEventListener('mouseenter', handleMouseEnter);
    document.documentElement.addEventListener('mouseleave', handleMouseLeave);

    window.addEventListener('mouseout', handleWindowMouseOut);

    window.addEventListener('mouseover', handleMouseEnter);

    return () => {
      document.documentElement.removeEventListener('mouseenter', handleMouseEnter);
      document.documentElement.removeEventListener('mouseleave', handleMouseLeave);
      window.removeEventListener('mouseout', handleWindowMouseOut);
      window.removeEventListener('mouseover', handleMouseEnter);
    };
  }, []);

  useEffect(() => {
    const update = (e: PointerEvent | MouseEvent) => {
      lastMousePosRef.current = { x: e.clientX, y: e.clientY };
    };
    // Update on move and on down (so a click that toggles the cursor has coordinates)
    window.addEventListener("pointermove", update, { passive: true });
    window.addEventListener("pointerdown", update, { passive: true });
    return () => {
      window.removeEventListener("pointermove", update);
      window.removeEventListener("pointerdown", update);
    };
  }, []);

  const value = {
    cursorType,
    setCursorType,
    isMouseInWindow,
    showCustomCursor,
    setShowCustomCursor, // added
    // New: expose a getter to avoid re-renders on every move
    getLastMousePos: () => lastMousePosRef.current,
  };

  return (
    <MouseCursorContext.Provider value={value}>
      {children}
    </MouseCursorContext.Provider>
  );
}

export const useMouseCursor = () => {
  const context = useContext(MouseCursorContext);
  if (context === undefined) {
    throw new Error('useMouseCursor must be used within a MouseCursorProvider');
  }
  return context;
};