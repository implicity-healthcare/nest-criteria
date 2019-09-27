import { In, LessThan, Not } from 'typeorm';

export const nestedOperatorInput = {
    filter: {
        first_name: 'Albert',
        age: {
            $not: {
                $not: {
                    $lt: 42
                }
            }
        },
        hobbies: {
            $in: ['science', 'physics', 'poker']
        },
    },
};

export const nestedOperatorOutput = {
    filter: {
        first_name: 'Albert',
        age: Not(Not(LessThan(42))),
        hobbies: In(['science', 'physics', 'poker'])
    },
};
