"use client";
import React, { createContext, ReactNode, useContext, useEffect, useState } from 'react';

export type CursorType = 'default' | 'loading' | 'text' | 'button' | 'link' | 'disabled' | 'drag';

interface MouseCursorContextType {
  cursorType: CursorType;
  setCursorType: (type: CursorType) => void;
  isMouseInWindow: boolean;
  showCustomCursor: boolean;
  setShowCustomCursor: (show: boolean) => void;
}

const MouseCursorContext = createContext<MouseCursorContextType | undefined>(undefined);

interface MouseCursorProviderProps {
  children: ReactNode;
}

export const MouseCursorProvider: React.FC<MouseCursorProviderProps> = ({ children }) => {
  const [cursorType, setCursorType] = useState<CursorType>('loading');
  const [isMouseInWindow, setIsMouseInWindow] = useState(true);
  const [showCustomCursor, setShowCustomCursor] = useState(true);

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

  // Mouse detection (keep existing code)
  useEffect(() => {
    const handleMouseEnter = () => setIsMouseInWindow(true);
    const handleMouseLeave = () => setIsMouseInWindow(false);

    document.documentElement.addEventListener('mouseenter', handleMouseEnter);
    document.documentElement.addEventListener('mouseleave', handleMouseLeave);

    window.addEventListener('mouseout', (e) => {
      if (!e.relatedTarget) {
        setIsMouseInWindow(false);
      }
    });

    window.addEventListener('mouseover', handleMouseEnter);

    return () => {
      document.documentElement.removeEventListener('mouseenter', handleMouseEnter);
      document.documentElement.removeEventListener('mouseleave', handleMouseLeave);
      window.removeEventListener('mouseout', handleMouseLeave);
      window.removeEventListener('mouseover', handleMouseEnter);
    };
  }, []);

  return (
    <MouseCursorContext.Provider value={{
      cursorType,
      setCursorType,
      isMouseInWindow,
      showCustomCursor,
      setShowCustomCursor
    }}>
      {children}
    </MouseCursorContext.Provider>
  );
};

export const useMouseCursor = () => {
  const context = useContext(MouseCursorContext);
  if (context === undefined) {
    throw new Error('useMouseCursor must be used within a MouseCursorProvider');
  }
  return context;
};