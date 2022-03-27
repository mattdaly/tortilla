import * as React from 'react';
import * as AlertDialogPrimitive from '@radix-ui/react-alert-dialog';
import { Button, ButtonProps } from '../../Button/Button';

export type AlertDialogContentProps = React.HTMLAttributes<HTMLDivElement>;
export const Content = React.forwardRef<HTMLDivElement, AlertDialogContentProps>(function Content(props, ref) {
    let className = ['flex flex-col', props.className].join(' ').trim();
    return (
        <AlertDialogPrimitive.Portal>
            <AlertDialogPrimitive.Overlay className="bg-black opacity-25 fixed inset-0" />
            <AlertDialogPrimitive.Content {...props} className={className} ref={ref} />
        </AlertDialogPrimitive.Portal>
    );
});

export const Title = AlertDialogPrimitive.Title;
export const Description = AlertDialogPrimitive.Description;

export const Footer = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(function AlertDialogFooter(
    props,
    ref
) {
    return <div {...props} className="flex gap-2" ref={ref} />;
});

export const Cancel = React.forwardRef<HTMLButtonElement, ButtonProps>(function AlertDialogAction(props, ref) {
    return (
        <AlertDialogPrimitive.Cancel asChild ref={ref}>
            <Button {...props} appearance="secondary" />
        </AlertDialogPrimitive.Cancel>
    );
});
export const Action = React.forwardRef<HTMLButtonElement, ButtonProps>(function AlertDialogAction(props, ref) {
    return (
        <AlertDialogPrimitive.Action asChild ref={ref}>
            <Button {...props} appearance="primary" />
        </AlertDialogPrimitive.Action>
    );
});
