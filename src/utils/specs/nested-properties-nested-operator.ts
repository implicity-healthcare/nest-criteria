import { In, Not } from 'typeorm';

export const nestedPropertiesAndOperatorInput = {
    filter: {
        name: {
            first_name: {
                $not: {
                    $in: ['Edward', 'Alphonse', 'Bernard']
                }
            },
            last_name: 'Fowler'
        },
        age: 42,
        hobbies: {
            $in: ['Computer', 'Architecture', 'Pattern']
        },
    },
};

export const nestedPropertiesAndOperatorOutput = {
    filter: {
        name: {
            first_name: Not(In(['Edward', 'Alphonse', 'Bernard'])),
            last_name: 'Fowler'
        },
        age: 42,
        hobbies: In(['Computer', 'Architecture', 'Pattern'])
    },
};
