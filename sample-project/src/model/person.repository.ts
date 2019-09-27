import { Person } from './person.entity';
import { Connection, EntityRepository, Repository } from 'typeorm';
import { Datasource, IPaginateBehavior, IPaginatedResults, IQueryCriteria, PaginationHelper } from '../../../lib';

@EntityRepository(Person)
export class PersonRepository extends Repository<Person> implements Datasource<Person>, IPaginateBehavior<Person> {
    paginate(criteria: IQueryCriteria<Person>): Promise<IPaginatedResults<Person>> {
        return PaginationHelper.paginate(this, criteria);
    }
}

export const PersonRepositoryProvider = {
    provide: 'PersonRepository',
    useFactory: (connection: Connection) => connection.getCustomRepository(PersonRepository),
    inject: ['DbConnection'],
};
