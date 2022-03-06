import React from 'react';
import { useControllableState } from '@radix-ui/react-use-controllable-state';

type InputProps = React.InputHTMLAttributes<HTMLInputElement> & {
    defaultValue?: string;
    onChange?: (value: string) => void;
    value?: string;
};

const Input = React.forwardRef<HTMLInputElement, InputProps>(function Input(
    externalProps,
    externalRef
) {
    const {
        defaultValue: defaultProp,
        onChange,
        value: prop,
        ...props
    } = externalProps;
    const [value, setValue] = useControllableState<string>({
        prop,
        defaultProp,
        onChange,
    });

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setValue(event.target.value);
    };

    return (
        <input
            {...props}
            onChange={handleChange}
            value={value}
            ref={externalRef}
        />
    );
});

export { Input, InputProps };
