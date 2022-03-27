import * as React from 'react';
import { debounce } from '../utilities/debounce';

const getVisibility = (element: HTMLElement | null): boolean =>
    Boolean(element && (element.offsetWidth || element.offsetHeight || element.getClientRects().length));

export const useBoundingClientRectListener = (
    ref: React.RefObject<HTMLElement>,
    dependencies: Array<any> | undefined = undefined
): DOMRectReadOnly | undefined => {
    const [dimensions, setDimensions] = React.useState<DOMRectReadOnly | undefined>(undefined);
    const isRefElementVisible = getVisibility(ref.current);
    const [visibility, setVisibility] = React.useState(isRefElementVisible);

    const resize = () => {
        if (visibility) {
            setDimensions(ref.current?.getBoundingClientRect());
        }
    };

    React.useEffect(() => {
        const timeout = setTimeout(resize, 0);
        const debouncedResize = debounce(resize, 250);

        window.addEventListener('resize', debouncedResize);

        return () => {
            clearTimeout(timeout);
            window.removeEventListener('resize', debouncedResize);
        };
    }, [ref.current, visibility]);

    React.useEffect(() => {
        const newRefElementVisibility = getVisibility(ref.current);

        if (visibility !== newRefElementVisibility) {
            // When visibility of an element changes, then the new visibility of the element can only be checked after the
            // component has rendered. That's why the visibility check is inside the useEffect. This useEffect will cause
            // the consumer to rerender and that will cause the above hook to recalculate the dimensions
            setVisibility(newRefElementVisibility);
        }
    });

    React.useEffect(() => {
        if (dependencies) {
            setDimensions(ref.current?.getBoundingClientRect());
        }
    }, dependencies);

    return dimensions;
};
