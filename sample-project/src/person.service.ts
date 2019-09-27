import { Person } from './model/person.entity';
import { IPaginatedResults, IQueryCriteria } from '../../lib';
import { PersonRepository } from './model/person.repository';
import { Injectable } from '@nestjs/common';

@Injectable()
export class PersonService {

  constructor(
      private readonly personRepository: PersonRepository,
  ) {
  }

  public async paginate(criteria: IQueryCriteria<Person>): Promise<IPaginatedResults<Person>> {
    return await this.personRepository
        .paginate(criteria);
  }

  public async list(criteria): Promise<Person[]> {
    return await this.personRepository
        .find(criteria.search());
  }

  public async create(dto: any): Promise<Person> {
    const person = { ...new Person(), ...dto };

    return await this.personRepository
        .save(person);
  }
}
