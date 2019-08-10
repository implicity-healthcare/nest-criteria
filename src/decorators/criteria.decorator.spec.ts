import { ROUTE_ARGS_METADATA } from '@nestjs/common/constants';
import { Criteria } from './criteria.decorator';
import { BadRequestException } from '@nestjs/common';

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
            it('should return a criteria object', async () => {
                const target = 'criteria';
                const targetValue = JSON.stringify({ test: 'test' });
                const resultValue = { test: 'test' };
                const req = {
                    query: {
                        [target]: targetValue,
                    },
                };

                const result = factoryFunction(target, req);
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

                await expect(() => factoryFunction(target, req))
                  .toThrow(BadRequestException);
            });
        });
    });
    describe('when the query not contains a known property to identify a criteria', () => {
        describe('like "unknownRandomProperty"', () => {
            it('should return a empty object', async () => {
                const target = 'unknownRandomProperty';
                const targetValue = {};
                const req = {
                    query: {},
                };

                await expect(factoryFunction(target, req)).toStrictEqual(targetValue);
            });
        });
    });
});
