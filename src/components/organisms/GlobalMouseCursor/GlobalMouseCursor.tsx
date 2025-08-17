"use client";
import React, { useEffect, useState } from "react";
import { useMouseCursor } from "../../../contexts/MouseCursorContext/MouseCursorContext";
import CursorFactory from "../../molecules/CursorFactory/CursorFactory";
import "./GlobalMouseCursor.scss";

const GlobalMouseCursor: React.FC = () => {
  const { cursorType, isMouseInWindow, showCustomCursor } = useMouseCursor();
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    if (showCustomCursor) {
      document.addEventListener("mousemove", handleMouseMove);
    }

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
    };
  }, [showCustomCursor]);

  if (!showCustomCursor || !isMouseInWindow) return null;

  return (
    <div
      className="global-mouse-cursor"
      style={{
        left: mousePosition.x,
        top: mousePosition.y,
      }}
    >
      <CursorFactory type={cursorType} />
    </div>
  );
};

export default GlobalMouseCursor;
