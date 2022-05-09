import { Table, TableProps, TableScroller } from './Table';
import { faker } from '@faker-js/faker';
import { Button } from '../Button/Button';
import { Input } from '../Input/Input';
import React from 'react';

export default {
    title: 'Table',
    component: Table,
};

const createFakeData = (creator: (i: number) => object, length: number) => {
    const range = (len: number) => {
        const arr: number[] = [];
        for (let i = 0; i < len; i++) {
            arr.push(i);
        }
        return arr;
    };
    const makeDataLevel = (depth = 0) => {
        return range(length).map((_, i) => {
            return {
                ...creator(i),
            };
        });
    };
    return makeDataLevel();
};

const data = createFakeData((i: number) => {
    return {
        id: faker.datatype.number(),
        firstName: i % 3 === 0 ? `${faker.name.firstName()}-${faker.name.firstName()}` : faker.name.firstName(),
        lastName: faker.name.lastName(),
        address: {
            line1: faker.address.streetName(),
            city: faker.address.cityName(),
        },
        lastName2: faker.name.lastName(),
        lastName3: faker.name.lastName(),
        lastName4: faker.name.lastName(),
        lastName5: faker.name.lastName(),
        lastName6: faker.name.lastName(),
    };
}, 1000);

export const Default = (args: TableProps) => {
    return (
        <div style={{ height: '400px', width: '1200px' }}>
            <Table {...args} data={data}>
                <Table.Column accessor="id" title="Id" sticky />
                <Table.Column accessor="firstName" title="Firstname" />
                <Table.Column accessor="lastName" title="Lastname" className="w-96" />
                <Table.Column accessor="lastName2" title="Lastname2" />
                <Table.Column accessor="lastName3" title="Lastname3" />
                <Table.Column accessor="lastName4" title="Lastname4" />
                <Table.Column accessor="lastName5" title="Lastname5" />
                <Table.Column accessor="lastName6" title="Lastname6" />
                <Table.Column accessor="address" renderer={(address) => address.city} title="City" />
                <Table.Column accessor="address" renderer={(address) => address.city} title="City" />
                <Table.Column accessor="address" renderer={(address) => address.city} title="City" />
                <Table.Column accessor="address" renderer={(address) => address.city} title="City" />
            </Table>
        </div>
    );
};

export const Fixed = (args: TableProps) => {
    let [visible, setVisible] = React.useState(true);
    return (
        <div className="w-full h-full relative flex flex-col p-4">
            <div className={`flex-shrink-0 flex-grow-0` + (visible ? '' : ' hidden')}>
                <h1 className="text-xl">Products</h1>
                <div className="w-full mb-4 flex justify-between">
                    <Button appearance="primary">New product</Button>
                    <Input icon="SearchIcon" />
                </div>
            </div>
            <div className="flex-grow overflow-hidden">
                <Button className="absolute top-0 right-0 z-10" onClick={() => setVisible(!visible)}>
                    toggle
                </Button>
                <Table {...args} data={data}>
                    <Table.Column accessor="id" title="Id" sticky />
                    <Table.Column accessor="firstName" title="Firstname" />
                    <Table.Column accessor="lastName" title="Lastname" className="w-96" />
                    <Table.Column accessor="lastName2" title="Lastname2" />
                    <Table.Column accessor="lastName3" title="Lastname3" />
                    <Table.Column accessor="lastName4" title="Lastname4" />
                    <Table.Column accessor="lastName5" title="Lastname5" />
                    <Table.Column accessor="lastName6" title="Lastname6" />
                    <Table.Column accessor="address" renderer={(address) => address.city} title="City" />
                    <Table.Column accessor="address" renderer={(address) => address.city} title="City" />
                    <Table.Column accessor="address" renderer={(address) => address.city} title="City" />
                    <Table.Column accessor="address" renderer={(address) => address.city} title="City" />
                </Table>
            </div>
        </div>
    );
};

export const Multiple = (args: TableProps) => {
    return (
        <div className="w-full h-full relative flex flex-col p-4">
            <div className="flex-shrink-0 flex-grow-0">
                <h1 className="text-xl font-bold">Products</h1>
                <div className="w-full mb-4 flex justify-between">
                    <Button appearance="primary">New product</Button>
                    <Input icon="SearchIcon" />
                </div>
            </div>
            <div className="flex-grow overflow-hidden">
                <h2 className="text-lg">In stock</h2>
                <div style={{ height: '300px' }}>
                    <Table {...args} data={data}>
                        <Table.Column accessor="id" title="Id" sticky />
                        <Table.Column accessor="firstName" title="Firstname" />
                        <Table.Column accessor="lastName" title="Lastname" className="w-96" />
                        <Table.Column accessor="lastName2" title="Lastname2" />
                        <Table.Column accessor="lastName3" title="Lastname3" />
                        <Table.Column accessor="lastName4" title="Lastname4" />
                        <Table.Column accessor="lastName5" title="Lastname5" />
                        <Table.Column accessor="lastName6" title="Lastname6" />
                        <Table.Column accessor="address" renderer={(address) => address.city} title="City" />
                        <Table.Column accessor="address" renderer={(address) => address.city} title="City" />
                        <Table.Column accessor="address" renderer={(address) => address.city} title="City" />
                        <Table.Column accessor="address" renderer={(address) => address.city} title="City" />
                    </Table>
                </div>
                <h2 className="text-lg">Out of stock</h2>
                <div style={{ height: '300px' }}>
                    <Table {...args} data={data}>
                        <Table.Column accessor="id" title="Id" sticky />
                        <Table.Column accessor="firstName" title="Firstname" />
                        <Table.Column accessor="lastName" title="Lastname" className="w-96" />
                        <Table.Column accessor="lastName2" title="Lastname2" />
                        <Table.Column accessor="lastName3" title="Lastname3" />
                        <Table.Column accessor="lastName4" title="Lastname4" />
                        <Table.Column accessor="lastName5" title="Lastname5" />
                        <Table.Column accessor="lastName6" title="Lastname6" />
                        <Table.Column accessor="address" renderer={(address) => address.city} title="City" />
                        <Table.Column accessor="address" renderer={(address) => address.city} title="City" />
                        <Table.Column accessor="address" renderer={(address) => address.city} title="City" />
                        <Table.Column accessor="address" renderer={(address) => address.city} title="City" />
                    </Table>
                </div>
            </div>
        </div>
    );
};
