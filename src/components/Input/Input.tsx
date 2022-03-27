import React from 'react';
import { Input as InputPrimitive, InputProps as InputPrimitiveProps } from '../../primitives/Input/Input';
import './Input.css';

type InputProps = InputPrimitiveProps & {
    invalid?: boolean;
};

const Input = React.forwardRef<HTMLInputElement, InputProps>(function Input(externalProps, externalRef) {
    let { invalid, ...props } = externalProps;
    return <InputPrimitive {...props} aria-invalid={invalid ? 'true' : undefined} ref={externalRef} />;
});

export { Input, InputProps };
