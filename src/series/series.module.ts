import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SeriesController } from './series.controller';
import { SeriesService } from './series.service';
import { Series } from './entities/series.entity';
import { Season } from './entities/season.entity';
import { Episode } from './entities/episode.entity';
import { Genre } from '../genre/entities/genre.entity';
import { Cast } from '../cast/entities/cast.entity';
import { Person } from '../person/entities/person.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Series, Season, Episode, Genre, Cast, Person]),
  ],
  controllers: [SeriesController],
  providers: [SeriesService],
  exports: [SeriesService],
})
export class SeriesModule {} 