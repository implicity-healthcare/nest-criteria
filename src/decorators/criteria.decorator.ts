import { BadRequestException, createParamDecorator } from '@nestjs/common';
import { plainToClass } from 'class-transformer';
import { QueryCriteria } from '..';
import { validate } from 'class-validator';

export const Criteria = createParamDecorator( async (target: string, req) => {
    const key = target || 'criteria';
    try {
        if (req.query[key]) {
            const json = JSON.parse(req.query[key]);
            const instance =  plainToClass(QueryCriteria, json);

            const errors = await validate(instance);
            if (errors && errors.length)
                throw new Error(errors.toString());
        }
        return plainToClass(QueryCriteria, {});
    } catch (e) {
        throw new BadRequestException(`invalid criteria: ${ e.message }`);
    }
});
