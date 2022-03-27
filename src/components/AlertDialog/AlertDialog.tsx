import * as React from 'react';
import * as AlertDialogPrimitive from '@radix-ui/react-alert-dialog';
import { Content, Title, Description, Footer, Cancel, Action } from './components/Content';
import { Trigger } from './components/Trigger';
import './AlertDialog.css';

export type AlertDialogProps = React.PropsWithChildren<{
    defaultOpen?: boolean;
    id?: string;
    trigger?: JSX.Element;
}>;

export const AlertDialog = (externalProps: AlertDialogProps) => {
    const { children, trigger, ...props } = externalProps;
    return (
        <AlertDialogPrimitive.Root {...props}>
            {trigger && <Trigger>{trigger}</Trigger>}
            {children}
        </AlertDialogPrimitive.Root>
    );
};
AlertDialog.Trigger = Trigger;
AlertDialog.Content = Content;
AlertDialog.Title = Title;
AlertDialog.Description = Description;
AlertDialog.Footer = Footer;
AlertDialog.Cancel = Cancel;
AlertDialog.Action = Action;
