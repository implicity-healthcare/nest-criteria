import { parseFilters } from './parse-filters';
import { nestedOperatorInput, nestedOperatorOutput } from './specs/nested-operator';
import { nestedPropertiesInput, nestedPropertiesOutput } from './specs/nested-properties';
import {
    nestedPropertiesAndOperatorInput,
    nestedPropertiesAndOperatorOutput
} from './specs/nested-properties-nested-operator';
import { simpleOperatorInput, simpleOperatorOutput } from './specs/simple-operator';
import { simplePropertiesInput, simplePropertiesOutput } from './specs/simple-properties';
import { betweenCaseInput, betweenCaseOutput } from './specs/the-between-case';


describe('.parseFilters()', () => {
    describe('On nested operator scenario', () => {
        it('should work as expected', () => {
            const result = parseFilters(nestedOperatorInput);
            expect(result).toEqual(nestedOperatorOutput);
        })
    });
    describe('On nested properties scenario', () => {
        it('should work as expected', () => {
            const result = parseFilters(nestedPropertiesInput);
            expect(result).toEqual(nestedPropertiesOutput);
        })
    });
    describe('On nested properties and operator scenario', () => {
        it('should work as expected', () => {
            const result = parseFilters(nestedPropertiesAndOperatorInput);
            expect(result).toEqual(nestedPropertiesAndOperatorOutput);
        })
    });
    describe('On simple operator scenario', () => {
        it('should work as expected', () => {
            const result = parseFilters(simpleOperatorInput);
            expect(result).toEqual(simpleOperatorOutput);
        })
    });
    describe('On simple properties scenario', () => {
        it('should work as expected', () => {
            const result = parseFilters(simplePropertiesInput);
            expect(result).toEqual(simplePropertiesOutput);
        })
    });
    describe('The between case scenario', () => {
        it('should work as expected', () => {
            const result = parseFilters(betweenCaseInput);
            expect(result).toEqual(betweenCaseOutput);
        })
    });
});
