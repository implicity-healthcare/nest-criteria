import { Body, Controller, Get, Post} from '@nestjs/common';
import { Criteria, IPaginatedResults, QueryCriteria } from '../../lib';
import { Person } from './model/person.entity';
import { PersonService } from './person.service';

@Controller()
export class PersonController {
  constructor(private readonly personService: PersonService) {}

  @Get()
  public async paginate(@Criteria() criteria?: QueryCriteria<Person>): Promise<IPaginatedResults<Person>> {
    return this.personService
        .paginate(criteria);
  }

  @Post()
  public async create(@Body() createPersonDTO: any): Promise<Person> {
    return await this.personService
        .create(createPersonDTO);
  }

  @Get('/all')
  public async all(@Criteria() criteria?: QueryCriteria<Person>): Promise<Person[]> {
    return this.personService
        .list(criteria);
  }

}
