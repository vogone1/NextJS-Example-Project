"use client";
import { Alignment, Fit, Layout, useRive, useViewModelInstanceBoolean } from "@rive-app/react-webgl2";
import { useEffect, useRef } from "react";
import { CursorType } from "../../../contexts/MouseCursorContext/MouseCursorContext";
import "./Cursor.scss";

interface CursorProps {
    type: CursorType;
}

export default function Cursor({ type }: CursorProps) {
    const { RiveComponent, rive } = useRive({
        src: "/chaos_order_cursor2.riv",
        stateMachines: "State Machine 1",
        autoplay: true,
        autoBind: true,
        layout: new Layout({
            fit: Fit.Contain,
            alignment: Alignment.Center,
            layoutScaleFactor: 5,
        }),
    });

    const rvm = rive?.viewModelInstance;
    //console.log("Rive instance: ", rvm?.properties);
    const { setValue: setHovering } = useViewModelInstanceBoolean("hoveringVM", rvm);
    const { setValue: setLoading } = useViewModelInstanceBoolean("loadingVM", rvm);
    const loadingTimeoutRef = useRef<number | null>(null);

    // Hover "link" detection via event delegation
    useEffect(() => {
        if (!rvm || !setHovering) return;
        let currentAnchor: Element | null = null;

        const onPointerOver = (e: PointerEvent) => {
            const target = e.target as Element | null;
            const anchor = target?.closest?.("a[href]");
            if (anchor && anchor !== currentAnchor) {
                currentAnchor = anchor;
                setHovering(true);
            }
        };

        const onPointerOut = (e: PointerEvent) => {
            const target = e.target as Element | null;
            const anchor = target?.closest?.("a[href]");
            // Only act when leaving the currently tracked anchor
            if (anchor && anchor === currentAnchor) {
                const related = e.relatedTarget as Node | null;
                if (related && currentAnchor.contains(related)) return; // still inside same anchor
                currentAnchor = null;
                setHovering(false);
            }
        };

        // Reset when window blurs
        const onBlur = () => {
            currentAnchor = null;
            setHovering(false);
        };

        document.addEventListener("pointerover", onPointerOver, true);
        document.addEventListener("pointerout", onPointerOut, true);
        window.addEventListener("blur", onBlur);
        return () => {
            document.removeEventListener("pointerover", onPointerOver, true);
            document.removeEventListener("pointerout", onPointerOut, true);
            window.removeEventListener("blur", onBlur);
            setHovering(false);
        };
    }, [rvm, setHovering]);

    // Mock loading: click any <a href> => loading true for 3s
    useEffect(() => {
        if (!rvm || !setLoading) return;
        const onClick = (e: MouseEvent) => {
            const target = e.target as Element | null;
            const anchor = target?.closest?.("a[href]");
            if (!anchor) return;
            setLoading(true);
            if (loadingTimeoutRef.current) clearTimeout(loadingTimeoutRef.current);
            loadingTimeoutRef.current = window.setTimeout(() => {
                setLoading(false);
                loadingTimeoutRef.current = null;
            }, 6000);
        };
        document.addEventListener("click", onClick, { capture: true });
        return () => {
            document.removeEventListener("click", onClick, { capture: true } as any);
            if (loadingTimeoutRef.current) {
                clearTimeout(loadingTimeoutRef.current);
                loadingTimeoutRef.current = null;
            }
        };
    }, [rvm, setLoading]);

    return (
        <div
            className={`Cursor Cursor--${type}`}
            style={{ position: "relative" }}
            data-testid="Cursor"
        >
            <RiveComponent style={{ width: "100%", height: "100%", display: "block" }} />

        </div>
    );
}
