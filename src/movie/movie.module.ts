import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MovieController } from './movie.controller';
import { MovieService } from './movie.service';
import { Movie } from './entities/movie.entity';
import { Genre } from '../genre/entities/genre.entity';
import { Cast } from '../cast/entities/cast.entity';
import { Person } from '../person/entities/person.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Movie, Genre, Cast, Person]),
  ],
  controllers: [MovieController],
  providers: [MovieService],
  exports: [MovieService],
})
export class MovieModule {} 