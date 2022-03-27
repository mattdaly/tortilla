import * as React from 'react';

export const useMergedRef = <T extends HTMLElement>(ref: React.Ref<HTMLElement>): React.RefObject<T> => {
    const internalRef = React.useRef<T>(null);

    React.useEffect(() => {
        if (ref) {
            if (typeof ref === 'function') {
                ref(internalRef.current);
            } else {
                (ref as React.MutableRefObject<HTMLElement | null>).current = internalRef.current;
            }
        }
    }, [ref]);

    return internalRef;
};
