import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import React from "react";
import { CursorType } from "../../../contexts/MouseCursorContext/MouseCursorContext";
import "./Cursor.scss";

interface CursorProps {
    type: CursorType;
}

const cursorConfig: Record<CursorType, { src: string; loop?: boolean; speed?: number }> = {
    default: {
        src: "https://lottie.host/e14d5998-b575-4884-84b4-5da4473ee3ab/3doQoZxFDR.lottie",
        loop: true,
        speed: 2,
    },
    loading: {
        src: "https://lottie.host/1cf88e99-4f90-4a8a-a59d-d8b0efeb5755/JwLekCYaFR.lottie",
        loop: true,
        speed: 1.25,
    },
    text: {
        src: "https://lottie.host/text.lottie",
        loop: true,
        speed: 1,
    },
    button: {
        src: "https://lottie.host/button.lottie",
        loop: true,
        speed: 1,
    },
    link: {
        src: "https://lottie.host/link.lottie",
        loop: true,
        speed: 1,
    },
    disabled: {
        src: "https://lottie.host/disabled.lottie",
        loop: false,
        speed: 1,
    },
    drag: {
        src: "https://lottie.host/drag.lottie",
        loop: true,
        speed: 1,
    },
};

const Cursor: React.FC<CursorProps> = ({ type }) => {
    const config = cursorConfig[type] || cursorConfig.default;

    return (
        <div
            className={`Cursor Cursor--${type}`}
            style={{ position: "relative" }}
            data-testid="Cursor"
        >
            <DotLottieReact src={config.src} loop={config.loop ?? true} autoplay speed={config.speed ?? 1} />
        </div>
    );
};

export default Cursor;
