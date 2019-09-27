import { Between, Equal, LessThanOrEqual } from 'typeorm';

export const betweenCaseInput = {
    filter: {
        first_name: {
            $eq: 'Albert'
        },
        age: {
            $bt:[42, 102]
        },
        hobbies: ['science', 'physics', 'poker']
    },
};

export const betweenCaseOutput = {
    filter: {
        first_name: Equal('Albert'),
        age: Between(42, 102),
        hobbies: ['science', 'physics', 'poker']
    },
};
