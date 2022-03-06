import { Input, InputProps } from './Input';

export default {
    title: 'Input',
    component: Input,
};

export const Default = (args: InputProps) => {
    return <Input {...args} placeholder="Input..." />;
};
