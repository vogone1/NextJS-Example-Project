"use client";
import { Alignment, Fit, Layout, useRive } from "@rive-app/react-canvas";
import { CursorType } from "../../../contexts/MouseCursorContext/MouseCursorContext";
import "./Cursor.scss";

interface CursorProps {
    type: CursorType;
}

export default function Cursor({ type }: CursorProps) {
    const { RiveComponent } = useRive({
        src: "/chaos_order_cursor.riv",
        stateMachines: "State Machine 1",
        autoplay: true,
        layout: new Layout({
            fit: Fit.Contain,
            alignment: Alignment.Center,
            minX: 10,
            minY: 10,
        }),
    });

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
