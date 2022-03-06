import * as AlertDialogPrimitive from '@radix-ui/react-alert-dialog';
import { AlertDialog } from './AlertDialog';
import { Button } from '../Button/Button';

export default {
    title: 'AlertDialog',
    component: Button,
};

export const Default = () => {
    return (
        <AlertDialogPrimitive.Root>
            <AlertDialogPrimitive.Trigger>
                <Button>test</Button>
            </AlertDialogPrimitive.Trigger>
            <AlertDialogPrimitive.Content>
                <AlertDialogPrimitive.Title>Poop</AlertDialogPrimitive.Title>
                <AlertDialogPrimitive.Description>
                    piss
                </AlertDialogPrimitive.Description>

                <AlertDialogPrimitive.Cancel>
                    Cancel
                </AlertDialogPrimitive.Cancel>
                <AlertDialogPrimitive.Action>Ok</AlertDialogPrimitive.Action>
            </AlertDialogPrimitive.Content>
        </AlertDialogPrimitive.Root>
    );
};

export const Default2 = () => {
    return (
        <AlertDialog>
            <AlertDialog.Trigger>
                <Button>test</Button>
            </AlertDialog.Trigger>
            <AlertDialog.Content className="w-1/2">
                <AlertDialog.Title>Poop</AlertDialog.Title>
                <AlertDialog.Description>piss</AlertDialog.Description>

                <AlertDialog.Cancel>Cancel</AlertDialog.Cancel>
                <AlertDialog.Action>Ok</AlertDialog.Action>
            </AlertDialog.Content>
        </AlertDialog>
    );
};
