import * as React from 'react';
import { usePreviousValue } from '../hooks/usePrevious';

// taken from radix - https://github.com/radix-ui/primitives/blob/main/packages/react/select/src/Select.tsx#L1183-L1224
export const BubbleSelect = (props: React.SelectHTMLAttributes<HTMLSelectElement>) => {
    const { value, ...selectProps } = props;
    const ref = React.useRef<HTMLSelectElement>(null);
    const prevValue = usePreviousValue(value);

    // Bubble value change to parents (e.g form change event)
    React.useEffect(() => {
        const select = ref.current!;
        const descriptor = Object.getOwnPropertyDescriptor(window.HTMLSelectElement.prototype, 'value') as PropertyDescriptor;
        const setValue = descriptor.set;

        if (prevValue !== value && setValue) {
            // this seems inefficient, investigate further
            if (Array.isArray(value)) {
                value.forEach((v) => {
                    let option: HTMLOptionElement | null = select.querySelector(`option[value=${v}]`);

                    if (option) {
                        option.selected = true;
                    }
                });
            } else {
                setValue.call(select, value);
            }

            const event = new Event('change', { bubbles: true });
            select.dispatchEvent(event);
        }
    }, [prevValue, value]);

    /**
     * We purposefully do not use `type="hidden"` here otherwise forms that
     * wrap it will not be able to access its value via the FormData API.
     *
     * We purposefully do not add the `value` attribute here to allow the value
     * to be set programatically and bubble to any parent form `onChange` event.
     * Adding the `value` will cause React to consider the programatic
     * dispatch a duplicate and it will get swallowed.
     */
    return <select {...selectProps} defaultValue={value} ref={ref} style={{ display: 'none' }} />;
};
