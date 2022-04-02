import React from 'react';
import { Button } from '../Button/Button';
import { Select, SelectValue } from './Select';

export default {
    title: 'Select',
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
        <form className="flex gap-3" onSubmit={handleSubmit}>
            <Select className="w-32" defaultValue="je" name="country">
                {options.map((item) => (
                    <Select.Option key={item.value} value={item.value}>
                        {item.text}
                    </Select.Option>
                ))}
            </Select>
            <Button type="submit" appearance="primary">
                Submit
            </Button>
        </form>
    );
};

export const Controlled = (args: any) => {
    const [country, setCountry] = React.useState<SelectValue>('je');

    return (
        <>
            <p>Country: {country ? `${country} (${options.find((i) => i.value === country)?.text})` : ''}</p>
            <Select className="w-32" onChange={setCountry} value={country}>
                {options.map((item) => (
                    <Select.Option key={item.value} value={item.value}>
                        {item.text}
                    </Select.Option>
                ))}
            </Select>
        </>
    );
};
