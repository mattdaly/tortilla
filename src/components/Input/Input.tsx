import React from 'react';
import * as icons from '@heroicons/react/solid';
import { Input as InputPrimitive, InputProps as InputPrimitiveProps } from '../../primitives/Input/Input';
import './Input.css';
import { Icon, IconName } from '../Icon/Icon';

type InputProps = InputPrimitiveProps & {
    icon?: IconName;
    invalid?: boolean;
};

const Input = React.forwardRef<HTMLInputElement, InputProps>(function Input(externalProps, externalRef) {
    let { icon, invalid, ...props } = externalProps;
    let element = <InputPrimitive {...props} aria-invalid={invalid ? 'true' : undefined} ref={externalRef} />;

    if (icon) {
        return (
            <div className="tortilla-Field">
                {element} {<Icon name={icon} />}
            </div>
        );
    }

    return element;
});

export { Input, InputProps };
