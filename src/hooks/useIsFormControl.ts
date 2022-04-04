import * as React from 'react';

// taken from radix
export const useIsFormControl = (ref: React.RefObject<HTMLElement>) => {
    const [isFormControl, setIsFormControl] = React.useState(false);

    React.useEffect(() => {
        if (ref.current) {
            setIsFormControl(Boolean(ref.current.closest('form')));
        }
    }, [ref]);

    return isFormControl;
};
