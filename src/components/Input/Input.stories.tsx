import React from 'react';
import { Button } from '../Button/Button';
import { Input } from './Input';

export default {
    title: 'Input',
    component: Input,
    args: {
        disabled: false,
        invalid: false,
        readOnly: false,
    },
    argTypes: {
        disabled: {
            control: { type: 'boolean' },
        },
        invalid: {
            control: { type: 'boolean' },
        },
        readOnly: {
            control: { type: 'boolean' },
        },
    },
};

export const Uncontrolled = (args: any) => {
    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        alert('Submitted with value: ' + new FormData(event.currentTarget).get('name'));
    };

    return (
        <form className="space-x-2" onSubmit={handleSubmit}>
            <Input {...args} name="name" placeholder="Name..." />
            <Button type="submit" appearance="primary">
                Submit
            </Button>
            <Button type="reset">Reset</Button>
        </form>
    );
};

export const Controlled = (args: any) => {
    const [name, setName] = React.useState('');
    return (
        <>
            <p>Name: {name}</p>
            <Input {...args} onChange={setName} placeholder="Name..." value={name} />
        </>
    );
};

export const Icon = (args: any) => {
    return <Input {...args} icon="BeakerIcon" placeholder="Name..." />;
};
