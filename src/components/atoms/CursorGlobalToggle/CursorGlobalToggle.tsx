'use client';

import { useMouseCursor } from '@/src/contexts/MouseCursorContext/MouseCursorContext';
import { useEffect } from 'react';

//TODO: consider moving this logic somewhere else
export default function CursorGlobalToggle() {
    const { showCustomCursor } = useMouseCursor();

    useEffect(() => {
        const root = document.documentElement;
        if (showCustomCursor) root.classList.add('cursor-custom-active');
        else root.classList.remove('cursor-custom-active');
        return () => root.classList.remove('cursor-custom-active');
    }, [showCustomCursor]);

    return null;
}