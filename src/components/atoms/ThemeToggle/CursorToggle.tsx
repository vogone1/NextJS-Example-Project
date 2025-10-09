"use client";
import ToggleSwitch from "@/src/components/animata/button/ToggleSwitch";
import { useMouseCursor } from "@/src/contexts/MouseCursorContext/MouseCursorContext";
import { MousePointer, Sparkles } from "lucide-react";

export default function CursorToggle() {
    const { showCustomCursor, setShowCustomCursor } = useMouseCursor();

    // Show the "activatable" icon on the side opposite the thumb; thumb stays empty
    const activatableIcon = showCustomCursor ? (
        <MousePointer size={14} aria-hidden color="black" />
    ) : (
        <Sparkles size={14} aria-hidden color="black" />
    );

    return (
        <ToggleSwitch
            checked={showCustomCursor}
            onChange={(v) => setShowCustomCursor(v)}
            ariaLabel={showCustomCursor ? "Disable custom cursor" : "Enable custom cursor"}
            title="Toggle custom cursor"
            offIcon={null}
            onIcon={null}
            // Match your chosen left/right logic:
            trackLeftIcon={showCustomCursor ? activatableIcon : null}
            trackRightIcon={!showCustomCursor ? activatableIcon : null}
        />
    );
}
