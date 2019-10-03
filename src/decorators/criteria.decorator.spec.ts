import { ROUTE_ARGS_METADATA } from '@nestjs/common/constants';
import { Criteria } from './criteria.decorator';
import { BadRequestException } from '@nestjs/common';
import { QueryCriteria } from '..';

describe('@Criteria', () => {
    let metadata;
    let decorator;
    let factoryFunction: Function;
    beforeEach(async () => {
        class Test {
            public test(@Criteria() criteria) {
            }
        }

        metadata = Reflect.getMetadata(ROUTE_ARGS_METADATA, Test, 'test');
        const key = Object.keys(metadata)[0];
        decorator = metadata[key];
        factoryFunction = decorator.factory;
    });
    describe('when the query contains a known property to identify a criteria', () => {
        describe('like "criteria"', () => {
            it('should return a QueryCriteria object', async () => {
                const target = 'criteria';
                const targetValue = JSON.stringify({ filter: { test: 'test' } });
                const resultValue = new QueryCriteria(
                    { test: 'test' },
                    undefined,
                    undefined,
                    0,
                    10,
                );
                const req = {
                    query: {
                        [target]: targetValue,
                    },
                };

                const result = await factoryFunction(target, req);
                await expect(result)
                    .toStrictEqual(resultValue);
            });
        });
        describe('but the value of the query can not be parse', () => {
            it('should throw a BadRequestException', async () => {
                const target = 'criteria';
                const targetValue = '12{}AB';
                const req = {
                    query: {
                        [target]: targetValue,
                    },
                };

                await expect(factoryFunction(target, req))
                    .rejects
                    .toThrow(BadRequestException);
            });
        });
    });
    describe('when the query not contains a criteria', () => {
        it('should return undefined', async () => {
            const target = 'unknownRandomProperty';
            const req = {
                query: {},
            };

            await expect(await factoryFunction(target, req)).toStrictEqual(undefined);
        });
    });
});
