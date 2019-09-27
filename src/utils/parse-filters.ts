import { Between, Equal, In, IsNull, LessThan, LessThanOrEqual, Like, MoreThan, MoreThanOrEqual, Not } from 'typeorm';

const operatorMapper = {
    '$in': In,
    '$lt': LessThan,
    '$lte': LessThanOrEqual,
    '$gt': MoreThan,
    '$gte': MoreThanOrEqual,
    '$like': Like,
    '$eq': Equal,
    '$null': IsNull,
    '$not': Not,
    '$bt': Between

};

export const parseFilters = (filter: any): any => {
    return Object
        .keys(filter)
        .reduce((query, key) => {
            if (isPlainObject(filter[key])) {
                if (operatorMapper[key])
                    query = operatorMapper[key](parseFilters(filter[key]));
                else
                    query[key] = parseFilters(filter[key]);
            }
            else if (operatorMapper[key]) {
                if (key === '$bt') {
                    query = operatorMapper[key].apply(null, filter[key]);
                }
                else {
                    query = operatorMapper[key](filter[key]);
                }
            }
            else {
                query[key] = filter[key];
            }

            return query;
        }, {})
};

function isPlainObject(val) {
    return val ? val.constructor === {}.constructor : false;
}
