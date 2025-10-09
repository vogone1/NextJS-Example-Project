"use client";
import { cn } from "@/libs/utils";
import type { ReactNode } from "react";

interface ToggleSwitchProps {
    checked: boolean;
    onChange: (checked: boolean) => void;
    className?: string;
    ariaLabel?: string;
    title?: string;
    offIcon?: ReactNode;
    onIcon?: ReactNode;
    /** Optional icons rendered inside the track, aligned left/right (outside the thumb). */
    trackLeftIcon?: ReactNode;
    trackRightIcon?: ReactNode;
}

export default function ToggleSwitch({
    checked,
    onChange,
    className,
    ariaLabel,
    title,
    offIcon,
    onIcon,
    trackLeftIcon,
    trackRightIcon,
}: ToggleSwitchProps) {
    return (
        <label
            className={cn("flex cursor-pointer select-none items-center", className)}
            aria-label={ariaLabel}
            title={title}
        >
            <div className="relative h-8 w-14">
                <input
                    type="checkbox"
                    checked={checked}
                    onChange={(e) => onChange(e.target.checked)}
                    className="sr-only"
                />
                {/* Track */}
                <div
                    className={cn(
                        "block h-8 w-14 rounded-full transition-colors",
                        "bg-[color:var(--toggle-track-bg,var(--border))]"
                    )}
                />
                {/* Track-side icons (outside the thumb) */}
                {(trackLeftIcon || trackRightIcon) && (
                    <div className="pointer-events-none absolute inset-0 flex items-center justify-between px-2">
                        <span className="flex h-4 w-4 items-center justify-center">
                            {trackLeftIcon}
                        </span>
                        <span className="flex h-4 w-4 items-center justify-center">
                            {trackRightIcon}
                        </span>
                    </div>
                )}
                {/* Thumb */}
                <div
                    className={cn(
                        "absolute left-1 top-1 flex h-6 w-6 items-center justify-center rounded-full transition bg-black",
                        checked && "translate-x-full"
                    )}
                >
                    {checked ? onIcon : offIcon}
                </div>
            </div>
        </label>
    );
}
