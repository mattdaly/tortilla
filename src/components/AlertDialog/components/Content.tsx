import * as React from 'react';
import * as AlertDialogPrimitive from '@radix-ui/react-alert-dialog';
import { className } from '../../../utilities/className';
import { defaultProps } from '../../../utilities/defaultProps';
import { Button, ButtonProps } from '../../Button/Button';

export type AlertDialogContentProps = React.HTMLAttributes<HTMLDivElement>;
export const Content = React.forwardRef<
    HTMLDivElement,
    AlertDialogContentProps
>(function Content(props, ref) {
    const className = [
        'bg-white rounded p-4 fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2',
        props.className ?? '',
    ].join(' ');

    return (
        <AlertDialogPrimitive.Portal>
            <AlertDialogPrimitive.Overlay className="bg-black opacity-25 fixed inset-0" />
            <AlertDialogPrimitive.Content
                {...props}
                className={className}
                ref={ref}
            />
        </AlertDialogPrimitive.Portal>
    );
});

export const Title = className(AlertDialogPrimitive.Title, 'text-lg text-bold');
export const Description = AlertDialogPrimitive.Description;
export const Cancel = React.forwardRef<HTMLButtonElement, ButtonProps>(
    function AlertDialogAction(props, ref) {
        return (
            <AlertDialogPrimitive.Cancel ref={ref}>
                <Button {...props} appearance="secondary" />
            </AlertDialogPrimitive.Cancel>
        );
    }
);
export const Action = React.forwardRef<HTMLButtonElement, ButtonProps>(
    function AlertDialogAction(props, ref) {
        return (
            <AlertDialogPrimitive.Action ref={ref}>
                <Button {...props} appearance="primary" />
            </AlertDialogPrimitive.Action>
        );
    }
);
