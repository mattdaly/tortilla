import * as React from 'react';
import { usePreviousValue } from '../hooks/usePrevious';

// taken from radix - https://github.com/radix-ui/primitives/blob/main/packages/react/slider/src/Slider.tsx#L568-L596
export const BubbleInput = (props: React.InputHTMLAttributes<HTMLInputElement>) => {
    const { value, ...inputProps } = props;
    const ref = React.useRef<HTMLInputElement>(null);
    const prevValue = usePreviousValue(value);

    // Bubble value change to parents (e.g form change event)
    React.useEffect(() => {
        const input = ref.current!;
        const descriptor = Object.getOwnPropertyDescriptor(window.HTMLInputElement.prototype, 'value') as PropertyDescriptor;
        const setValue = descriptor.set;

        if (prevValue !== value && setValue) {
            const event = new Event('input', { bubbles: true });
            setValue.call(input, value);
            input.dispatchEvent(event);
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
    return <input {...inputProps} defaultValue={value} ref={ref} style={{ display: 'none' }} />;
};
