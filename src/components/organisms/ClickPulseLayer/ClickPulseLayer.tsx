"use client";
import { useEffect, useRef } from "react";
import "./ClickPulseLayer.scss";

export default function ClickPulseLayer() {
    const layerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const container = layerRef.current;
        if (!container) return;

        const handlePointerDown = (e: PointerEvent) => {
            // Only react to primary button to avoid context/menu clicks
            if (e.button !== 0) return;

            const el = document.createElement("span");
            el.className = "click-pulse";
            el.style.left = `${e.clientX}px`;
            el.style.top = `${e.clientY}px`;
            // Allow multiple pulses concurrently
            el.addEventListener(
                "animationend",
                () => {
                    el.remove();
                },
                { once: true }
            );
            container.appendChild(el);
        };

        document.addEventListener("pointerdown", handlePointerDown, { passive: true });
        return () => {
            document.removeEventListener("pointerdown", handlePointerDown as any);
        };
    }, []);

    return <div className="click-pulse-layer" ref={layerRef} aria-hidden="true" />;
}
