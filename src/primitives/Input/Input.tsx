import React from 'react';
import { useControllableState } from '@radix-ui/react-use-controllable-state';

type InputProps = Omit<React.InputHTMLAttributes<HTMLInputElement>, 'defaultValue' | 'onChange' | 'value'> & {
    defaultValue?: string;
    onChange?: (value: string) => void;
    value?: string;
};

const Input = React.forwardRef<HTMLInputElement, InputProps>(function Input(externalProps, externalRef) {
    let { defaultValue: defaultProp, onChange, value: prop, ...props } = externalProps;
    let [value = '', setValue] = useControllableState<string>({
        prop,
        defaultProp,
        onChange,
    });
    let handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setValue(event.target.value);
    };

    return <input {...props} onChange={handleChange} value={value} ref={externalRef} />;
});

export { Input, InputProps };
