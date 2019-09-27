import { Equal, LessThanOrEqual } from 'typeorm';

export const simpleOperatorInput = {
    filter: {
        first_name: {
            $eq: 'Albert'
        },
        age: {
            $lte:42
        },
        hobbies: ['science', 'physics', 'poker']
    },
};

export const simpleOperatorOutput = {
    filter: {
        first_name: Equal('Albert'),
        age: LessThanOrEqual(42),
        hobbies: ['science', 'physics', 'poker']
    },
};
