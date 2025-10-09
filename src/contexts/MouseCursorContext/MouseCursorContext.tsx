"use client";
import { createContext, type ReactNode, useContext, useEffect, useState } from 'react';

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
  initialShowCustomCursor?: boolean; // from server cookie
}

export function MouseCursorProvider({ children, initialShowCustomCursor = true }: MouseCursorProviderProps) {
  const [cursorType, setCursorType] = useState<CursorType>('loading');
  const [isMouseInWindow, setIsMouseInWindow] = useState(false);
  const [showCustomCursor, setShowCustomCursor] = useState<boolean>(initialShowCustomCursor);

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
}

export const useMouseCursor = () => {
  const context = useContext(MouseCursorContext);
  if (context === undefined) {
    throw new Error('useMouseCursor must be used within a MouseCursorProvider');
  }
  return context;
};