import * as React from 'react';
import * as AlertDialogPrimitive from '@radix-ui/react-alert-dialog';
import {
    Content,
    Title,
    Description,
    Cancel,
    Action,
} from './components/Content';

export type AlertDialogProps = React.PropsWithChildren<{}>;

export const AlertDialog = (props: AlertDialogProps) => {
    return <AlertDialogPrimitive.Root {...props} />;
};
AlertDialog.Trigger = AlertDialogPrimitive.Trigger;
AlertDialog.Content = Content;
AlertDialog.Title = Title;
AlertDialog.Description = Description;
AlertDialog.Cancel = Cancel;
AlertDialog.Action = Action;
