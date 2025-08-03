import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PersonController } from './person.controller';
import { PersonService } from './person.service';
import { Person } from './entities/person.entity';
import { Cast } from '../cast/entities/cast.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Person, Cast]),
  ],
  controllers: [PersonController],
  providers: [PersonService],
  exports: [PersonService],
})
export class PersonModule {} 