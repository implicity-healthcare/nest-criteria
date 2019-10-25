import { Datasource, IPaginatedResults, IQueryCriteria } from '../interfaces';
import { QueryCriteria, Target } from './QueryCriteria';

export class PaginationHelper {
    public static async paginate<T>(
        dataSource: Datasource<T>,
        query?: IQueryCriteria<T>,
        target?: Target): Promise<IPaginatedResults<T>> {

        query = query || new QueryCriteria();

        const [results, total] = await dataSource.findAndCount({
            ...query.pagination(target),
            ...query.search(target),
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

