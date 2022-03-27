import { AlertDialog } from '../AlertDialog/AlertDialog';
import { Button, ButtonProps } from './Button';

export default {
    title: 'Button',
    component: Button,
};

export const Default = (args: ButtonProps) => {
    return (
        <div className="flex space-x-4">
            <Button {...args}>Button</Button>
            <Button appearance="primary" {...args}>
                Button
            </Button>
        </div>
    );
};

export const AlertDialogButton = (args: ButtonProps) => {
    return (
        <div className="flex space-x-4">
            <Button
                {...args}
                alertDialog={(props) => (
                    <AlertDialog {...props}>
                        <AlertDialog.Content className="w-1/2">
                            <AlertDialog.Title>Poop</AlertDialog.Title>
                            <AlertDialog.Description>piss</AlertDialog.Description>

                            <AlertDialog.Footer>
                                <AlertDialog.Cancel>Cancel</AlertDialog.Cancel>
                                <AlertDialog.Action>Ok</AlertDialog.Action>
                            </AlertDialog.Footer>
                        </AlertDialog.Content>
                    </AlertDialog>
                )}
            >
                Button
            </Button>
        </div>
    );
};
