import React from 'react';
import { Button } from '../Button/Button';
import { Listbox, ListboxValue } from './Listbox';

export default {
    title: 'Listbox',
};

const options = [
    {
        text: 'Australia',
        value: 'au',
    },
    {
        text: 'Denmark',
        value: 'dk',
    },
    {
        text: 'Guernsey',
        value: 'gsy',
    },
    {
        text: 'Jersey',
        value: 'je',
    },
    {
        text: 'New Zealand',
        value: 'nz',
    },
    {
        text: 'Switzerland',
        value: 'ch',
    },
];

export const Uncontrolled = (args: any) => {
    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        alert('Submitted with value: ' + new FormData(event.currentTarget).get('country'));
    };

    return (
        <form className="space-x-2" onSubmit={handleSubmit}>
            <Listbox defaultValue="je" name="country">
                {options.map((item) => (
                    <Listbox.Option key={item.value} value={item.value}>
                        {item.text}
                    </Listbox.Option>
                ))}
            </Listbox>
            <Button type="submit" appearance="primary">
                Submit
            </Button>
        </form>
    );
};

export const Controlled = (args: any) => {
    const [country, setCountry] = React.useState<ListboxValue>('je');

    return (
        <>
            <p>Country: {country ? `${country} (${options.find((i) => i.value === country)?.text})` : ''}</p>
            <Listbox onChange={setCountry} value={country}>
                {options.map((item) => (
                    <Listbox.Option key={item.value} value={item.value}>
                        {item.text}
                    </Listbox.Option>
                ))}
            </Listbox>
        </>
    );
};
