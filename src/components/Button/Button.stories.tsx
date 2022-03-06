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
