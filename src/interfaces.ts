export interface IPaginatedResults<T> {
    results: T[];
    index: number;
    total: number;
    limit: number;

    previous?: boolean;
    next?: boolean;
}

export interface IPaginateOptions {
    index: number;
    limit: number;
}

export declare type FilterConditions<T> = {
    [P in keyof T]?: FilterConditions<T[P]>
};

export interface IQueryCriteria<T> extends IPaginateOptions {
    filter?: FilterConditions<T>;
    sort?: { [P in keyof T]?:  1 | -1 };
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
