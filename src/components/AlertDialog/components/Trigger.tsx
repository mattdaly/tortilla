import * as React from 'react';
import * as AlertDialogPrimitive from '@radix-ui/react-alert-dialog';

export type AlertDialogTriggerProps = React.ButtonHTMLAttributes<HTMLButtonElement>;

export const Trigger = React.forwardRef<HTMLButtonElement, AlertDialogTriggerProps>(function AlertDialogTrigger(props, ref) {
    return <AlertDialogPrimitive.Trigger {...props} asChild ref={ref} />;
});
