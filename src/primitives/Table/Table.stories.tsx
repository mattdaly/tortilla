import { Table, TableProps } from './Table';
import { faker } from '@faker-js/faker';

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

export const Primitive = (args: TableProps) => {
    return (
        <Table
            {...args}
            data={createFakeData(() => {
                return {
                    firstName: faker.name.firstName(),
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
            }, 10)}
        />
    );
};

const data = createFakeData((i: number) => {
    return {
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

export const Test = (args: TableProps) => {
    return (
        <Table {...args} data={data}>
            <Table.Column accessor="firstName" title="Firstname" width="max-content" />
            <Table.Column accessor="lastName" title="Lastname" width="max-content" />
            <Table.Column accessor="address" renderer={(address) => address.city} title="City" />
        </Table>
    );
};
