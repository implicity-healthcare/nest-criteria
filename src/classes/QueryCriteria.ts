import { FilterConditions, IQueryCriteria } from '../interfaces';

export enum Target {
    TypeORM = 'typeorm'
}

/**
 * Todo Annotate instance to ensure property are properly set via URL paramerters.
 */
export class QueryCriteria<T> implements IQueryCriteria<T> {
    constructor(
        public filter: FilterConditions<T>,
        public sort: { [P in keyof T]?: 1 | -1 },
        public include: string[],
        public index: number,
        public limit: number,
    ) {
        const minLimit: number = 10;
        const maxLimit: number = 1000;

        this.index = this.index || 1;
        this.limit = this.limit || minLimit;

        this.index = (this.index > 0)
            ? this.index - 1
            : (this.index < 0)
                ? 0
                : this.index;

        this.limit = (this.limit < minLimit)
            ? minLimit
            : (this.limit > maxLimit)
                ? maxLimit
                : this.limit;
    }

    /**
     * Gives the ability to switch depending on the targeted ORM
     * @param target the identifier token of the targeted ORM
     */
    pagination(target?: Target): any {
        return {
            skip: this.index * this.limit,
            take: this.limit,
        };
    }

    /**
     * Gives the ability to switch depending on the targeted ORM
     * @param target the identifier token of the targeted ORM
     */
    search(target?: Target): any {
        return {
            relations: this.include,
            order: this.sort,
            where: this.filter
        }
    }
}
