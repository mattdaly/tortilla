import React from 'react';
import { useControllableState } from '@radix-ui/react-use-controllable-state';
import { useIsFormControl } from '../../hooks/useIsFormControl';
import { useMergedRef } from '../../hooks/useMergedRef';

type InputProps = Omit<React.InputHTMLAttributes<HTMLInputElement>, 'defaultValue' | 'onChange' | 'value'> & {
    defaultValue?: string;
    onChange?: (value: string) => void;
    value?: string;
};

const Input = React.forwardRef<HTMLInputElement, InputProps>(function Input(externalProps, externalRef) {
    let { defaultValue: defaultProp, onChange, value: prop, ...props } = externalProps;
    let ref = useMergedRef<HTMLInputElement>(externalRef);
    let [value = '', setValue] = useControllableState<string>({
        prop,
        defaultProp,
        onChange,
    });
    useIsFormControl(ref, () => setValue(''));

    let handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setValue(event.target.value);
    };

    return <input {...props} onChange={handleChange} value={value} ref={ref} />;
});

export { Input, InputProps };
