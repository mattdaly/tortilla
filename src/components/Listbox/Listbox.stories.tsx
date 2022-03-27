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
        text: 'France',
        value: 'fr',
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
        text: 'Norway',
        value: 'no',
    },
    {
        text: 'Sweden',
        value: 'swe',
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
        <form className="flex flex-col gap-3" onSubmit={handleSubmit}>
            <Listbox className="w-32" defaultValue="je" name="country">
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
            <Listbox className="w-32" onChange={setCountry} value={country}>
                {options.map((item) => (
                    <Listbox.Option key={item.value} value={item.value}>
                        {item.text}
                    </Listbox.Option>
                ))}
            </Listbox>
        </>
    );
};
