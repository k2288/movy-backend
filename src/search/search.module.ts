import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SearchController } from './search.controller';
import { SearchService } from './search.service';
import { Movie } from '../movie/entities/movie.entity';
import { Series } from '../series/entities/series.entity';
import { Person } from '../person/entities/person.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Movie, Series, Person]),
  ],
  controllers: [SearchController],
  providers: [SearchService],
  exports: [SearchService],
})
export class SearchModule {} 