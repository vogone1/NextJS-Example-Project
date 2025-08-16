// hooks/useCursorEvents.ts
import { useMouseCursor } from '../contexts/MouseCursorContext/MouseCursorContext';

export const useCursorEvents = () => {
    const { setCursorType } = useMouseCursor();

    const onTextHover = () => setCursorType('text');
    const onButtonHover = () => setCursorType('button');
    const onLinkHover = () => setCursorType('link');
    const onDefault = () => setCursorType('default');
    const onLoading = () => setCursorType('loading');

    return {
        onTextHover,
        onButtonHover,
        onLinkHover,
        onDefault,
        onLoading,
        // Return the setter for custom cases
        setCursorType
    };
};