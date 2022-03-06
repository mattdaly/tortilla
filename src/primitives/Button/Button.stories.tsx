import { Button, ButtonProps } from './Button';

export default {
    title: 'Button',
    component: Button,
};

export const Primitive = (args: ButtonProps) => {
    return <Button {...args}>Button</Button>;
};
