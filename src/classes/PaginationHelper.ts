import { Datasource, IPaginatedResults, IQueryCriteria } from '../interfaces';

export class PaginationHelper {
    public static async paginate<T>(
        dataSource: Datasource<T>,
        query: IQueryCriteria<T>): Promise<IPaginatedResults<T>> {

        const [results, total] = await dataSource.findAndCount({
            ...query.pagination(),
            ...query.search(),
        });

        return {
            results,
            total,
            index: query.index,
            limit: query.limit,
            previous: (query.index > 0),
            next: ((query.limit * query.index + results.length) < total)
        };
    }
}

