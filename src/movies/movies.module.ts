import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MoviesService } from './services/movies.service';
import { MoviesController } from './controllers/movies.controller';
import { GenresService } from './services/genres.service';
import { GenresController } from './controllers/genres.controller';
import { StudiosService } from './services/studios.service';
import { StudiosController } from './controllers/studios.controller';
import { ImageUrisService } from './services/image-uris.service';
import { ImageUrisController } from './controllers/image-uris.controller';
import { PersonsService } from './services/persons.service';
import { PersonsController } from './controllers/persons.controller';
import { CastsService } from './services/casts.service';
import { CastsController } from './controllers/casts.controller';
import { NetworksService } from './services/networks.service';
import { NetworksController } from './controllers/networks.controller';
import { SeasonsService } from './services/seasons.service';
import { SeasonsController } from './controllers/seasons.controller';
import { EpisodesService } from './services/episodes.service';
import { EpisodesController } from './controllers/episodes.controller';
import { Movie } from './entities/movie.entity';
import { Genre } from './entities/genre.entity';
import { Studio } from './entities/studio.entity';
import { ImageUri } from './entities/image-uri.entity';
import { Person } from './entities/person.entity';
import { PersonImageUri } from './entities/person-image-uri.entity';
import { Cast } from './entities/cast.entity';
import { Network } from './entities/network.entity';
import { NetworkImageUri } from './entities/network-image-uri.entity';
import { Season } from './entities/season.entity';
import { SeasonImageUri } from './entities/season-image-uri.entity';
import { Episode } from './entities/episode.entity';
import { EpisodeImageUri } from './entities/episode-image-uri.entity';
import { MovieSeeder } from './seeders/movie.seeder';
import { GenreSeeder } from './seeders/genre.seeder';
import { StudioSeeder } from './seeders/studio.seeder';

@Module({
  imports: [TypeOrmModule.forFeature([Movie, Genre, Studio, ImageUri, Person, PersonImageUri, Cast, Network, NetworkImageUri, Season, SeasonImageUri, Episode, EpisodeImageUri])],
  controllers: [MoviesController, GenresController, StudiosController, ImageUrisController, PersonsController, CastsController, NetworksController, SeasonsController, EpisodesController],
  providers: [MoviesService, GenresService, StudiosService, ImageUrisService, PersonsService, CastsService, NetworksService, SeasonsService, EpisodesService, MovieSeeder, GenreSeeder, StudioSeeder],
  exports: [MoviesService, GenresService, StudiosService, ImageUrisService, PersonsService, CastsService, NetworksService, SeasonsService, EpisodesService],
})
export class MoviesModule {} 