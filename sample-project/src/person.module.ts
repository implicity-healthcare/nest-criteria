import { Module } from '@nestjs/common';
import { PersonController } from './person.controller';
import { PersonService } from './person.service';
import { DatabaseModule } from './database/database.module';
import { PersonRepositoryProvider } from './model/person.repository';

@Module({
  imports: [
      DatabaseModule,
  ],
  controllers: [
      PersonController,
  ],
  providers: [
      PersonRepositoryProvider,
      PersonService,
  ],
})
export class PersonModule {}
