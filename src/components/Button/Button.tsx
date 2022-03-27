import React from 'react';
import { AlertDialogProps } from '../AlertDialog/AlertDialog';
import './Button.css';

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
    appearance?: 'primary' | 'secondary';
    alertDialog?: (props: Partial<AlertDialogProps>) => JSX.Element;
};

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(function Button(externalProps, externalRef) {
    let { appearance = 'secondary', alertDialog, ...props } = externalProps;
    let button = <button {...props} data-appearance={appearance} ref={externalRef} />;

    if (typeof alertDialog === 'function') {
        button = alertDialog({ trigger: button });
    }

    return button;
});

export { Button, ButtonProps };
