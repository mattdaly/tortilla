import * as AlertDialogPrimitive from '@radix-ui/react-alert-dialog';
import { AlertDialog } from './AlertDialog';
import { Button } from '../Button/Button';

export default {
    title: 'AlertDialog',
    component: AlertDialog,
};

export const Default = () => {
    return (
        <AlertDialog defaultOpen>
            <AlertDialog.Trigger>
                <Button>test</Button>
            </AlertDialog.Trigger>
            <AlertDialog.Content className="w-1/2">
                <AlertDialog.Title>Poop</AlertDialog.Title>
                <AlertDialog.Description>piss</AlertDialog.Description>

                <AlertDialog.Footer>
                    <AlertDialog.Cancel>Cancel</AlertDialog.Cancel>
                    <AlertDialog.Action>Ok</AlertDialog.Action>
                </AlertDialog.Footer>
            </AlertDialog.Content>
        </AlertDialog>
    );
};
