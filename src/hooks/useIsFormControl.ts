import * as React from 'react';

// taken from radix
export const useIsFormControl = (ref: React.RefObject<HTMLElement>, reset: () => void) => {
    const [isFormControl, setIsFormControl] = React.useState(false);

    React.useEffect(() => {
        let formRef: HTMLFormElement | null;

        if (ref.current) {
            formRef = ref.current.closest('form');

            setIsFormControl(!!formRef);

            if (reset && formRef) {
                formRef.addEventListener('reset', reset);
            }
            ref.current.closest('form')?.addEventListener('reset', reset);
        }

        return () => {
            if (formRef) {
                formRef.removeEventListener('reset', reset);
            }
        };
    }, [ref]);

    return isFormControl;
};
