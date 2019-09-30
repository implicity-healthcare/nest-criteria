import { Between, IsNull, Not } from 'typeorm';

export interface IPaginatedResults<T> {
    results: T[];
    index: number;
    total: number;
    limit: number;

    previous?: boolean;
    next?: boolean;
}

type RequireOnlyOne<T, Keys extends keyof T = keyof T> =
    Pick<T, Exclude<keyof T, Keys>>
    & {
    [K in Keys]-?:
    Required<Pick<T, K>>
    & Partial<Record<Exclude<Keys, K>, undefined>>
}[Keys]

export declare type FindOperator = {
    $in: Array<any>
    $lt: Number
    $lte: Number
    $gt: Number
    $gte: Number
    $like: String
    $eq: any
    $null: Boolean
    $not: any
    $bt: [Number, Number]
};

export interface IPaginateOptions {
    index: number;
    limit: number;
}

export declare type FilterConditions<T> = {
    [P in keyof T]?: FilterConditions<T[P]> | RequireOnlyOne<FindOperator>
};

export interface IQueryCriteria<T> extends IPaginateOptions {
    filter?: FilterConditions<T>;
    sort?: { [P in keyof T]?: 1 | -1 };
    include?: string[];

    pagination(target?: string): any;

    search(target?: string): any;
}

export interface IPaginateBehavior<T> {
    paginate(criteria?: IQueryCriteria<T>): Promise<IPaginatedResults<T>>;
}

export interface Datasource<T> {
    findAndCount(options?: any): Promise<[T[], number]>;
}
