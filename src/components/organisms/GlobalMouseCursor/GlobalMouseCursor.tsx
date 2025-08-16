"use client";
import React, { useEffect, useState } from 'react';
import { useMouseCursor } from '../../../contexts/MouseCursorContext/MouseCursorContext';
import './GlobalMouseCursor.scss';
import CursorFactory from '../../molecules/CursorFactory/CursorFactory';

const GlobalMouseCursor: React.FC = () => {
  const { cursorType, isMouseInWindow, showCustomCursor } = useMouseCursor();
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });


  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    if (showCustomCursor) {
      document.addEventListener("mousemove", handleMouseMove);
    } else {
      console.log('NOT adding mousemove listener');
    }

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
    };
  }, [showCustomCursor]);

  // Don't render if not showing custom cursor OR if mouse is outside window
  if (!showCustomCursor || !isMouseInWindow) return null;

  return (
    <div
      className="global-mouse-cursor"
      style={{
        left: mousePosition.x - 16,
        top: mousePosition.y - 16,
      }}
    >
      <CursorFactory type={cursorType} />
    </div>
  );
};

export default GlobalMouseCursor;