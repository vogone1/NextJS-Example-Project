"use client";
import { useEffect, useRef } from "react";
import { useMouseCursor } from "../../../contexts/MouseCursorContext/MouseCursorContext";
import Cursor from "../../atoms/Cursor/Cursor";
import ClickPulseLayer from "./../ClickPulseLayer/ClickPulseLayer";
import "./GlobalMouseCursor.scss";

export default function GlobalMouseCursor() {
  // All hooks at the top
  const { cursorType, isMouseInWindow, showCustomCursor } = useMouseCursor();
  const cursorRef = useRef<HTMLDivElement>(null);
  const rafIdRef = useRef<number | null>(null);
  // Match .global-mouse-cursor width/height = 100px
  const offsetRef = useRef({ x: 50, y: 50 });
  const posRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    if (!showCustomCursor) return;

    const update = () => {
      rafIdRef.current = null;
      const el = cursorRef.current;
      if (!el) return;
      const { x, y } = posRef.current;
      const { x: ox, y: oy } = offsetRef.current;
      el.style.transform = `translate(${x - ox}px, ${y - oy}px)`;
    };

    const handleMouseMove = (e: MouseEvent) => {
      posRef.current = { x: e.clientX, y: e.clientY };
      if (rafIdRef.current == null) {
        rafIdRef.current = window.requestAnimationFrame(update);
      }
    };

    document.addEventListener("mousemove", handleMouseMove);
    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      if (rafIdRef.current != null) {
        cancelAnimationFrame(rafIdRef.current);
        rafIdRef.current = null;
      }
    };
  }, [showCustomCursor]);

  if (!showCustomCursor || !isMouseInWindow) return null;

  return (
    <>
      {/* Cursor follows mouse, centered */}
      <div
        className="global-mouse-cursor"
        ref={cursorRef}
        data-testid="GlobalMouseCursor"
        style={{ willChange: "transform" }}
      >
        <Cursor type={cursorType} />
      </div>
      {/* Stateless layer that spawns and cleans pulses via CSS animation */}
      <ClickPulseLayer />
    </>
  );
}
