import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Movie, MovieType } from '../entities/movie.entity';
import { CreateMovieDto } from '../dto/create-movie.dto';
import { UpdateMovieDto } from '../dto/update-movie.dto';
import { PaginationDto } from '../dto/pagination.dto';
import { MovieResponseDto } from '../dto/movie-response.dto';
import { PaginatedMovieResponseDto } from '../dto/paginated-movie-response.dto';
import { MovieSeeder } from '../seeders/movie.seeder';
import { GenreSeeder } from '../seeders/genre.seeder';
import { GenresService } from './genres.service';
import { StudiosService } from './studios.service';
import { ImageUrisService } from './image-uris.service';
import { CastsService } from './casts.service';
import { NetworksService } from './networks.service';

@Injectable()
export class MoviesService {
  constructor(
    @InjectRepository(Movie)
    private readonly movieRepository: Repository<Movie>,
    private readonly movieSeeder: MovieSeeder,
    private readonly genreSeeder: GenreSeeder,
    private readonly genresService: GenresService,
    private readonly studiosService: StudiosService,
    private readonly imageUrisService: ImageUrisService,
    private readonly castsService: CastsService,
    private readonly networksService: NetworksService,
  ) {}

  async create(createMovieDto: CreateMovieDto): Promise<MovieResponseDto> {
    const movie = this.movieRepository.create(createMovieDto);

    if (createMovieDto.genreIds && createMovieDto.genreIds.length > 0) {
      const genres = await this.genresService.findByIds(createMovieDto.genreIds);
      movie.genres = genres;
    }

    if (createMovieDto.studioIds && createMovieDto.studioIds.length > 0) {
      const studios = await this.studiosService.findByIds(createMovieDto.studioIds);
      movie.studios = studios;
    }

    if (createMovieDto.networkIds && createMovieDto.networkIds.length > 0) {
      const networks = await this.networksService.findByIds(createMovieDto.networkIds);
      movie.networks = networks;
    }

    // Series-only fields
    if ((createMovieDto.type ?? MovieType.MOVIE) === MovieType.SERIES) {
      if (typeof createMovieDto.hasEnded !== 'undefined') movie.hasEnded = createMovieDto.hasEnded;
      if (createMovieDto.lastAired) movie.lastAired = new Date(createMovieDto.lastAired);
    }

    const savedMovie = await this.movieRepository.save(movie);

    if (createMovieDto.imageUris && createMovieDto.imageUris.length > 0) {
      await this.imageUrisService.createMany(createMovieDto.imageUris, savedMovie.id);
    }

    if (createMovieDto.casts && createMovieDto.casts.length > 0) {
      const castsWithMovieId = createMovieDto.casts.map(c => ({ ...c, movieId: savedMovie.id }));
      await this.castsService.createMany(castsWithMovieId);
    }

    return this.mapToResponseDto(savedMovie);
  }

  async findAll(paginationDto: PaginationDto): Promise<PaginatedMovieResponseDto> {
    const { page = 1, limit = 10, type } = paginationDto;
    const skip = (page - 1) * limit;

    const [movies, totalResults] = await this.movieRepository.findAndCount({
      where: { type: type as MovieType },
      skip,
      take: limit,
      order: { createdAt: 'DESC' },
      relations: ['genres', 'studios', 'networks', 'networks.imageUris', 'imageUris', 'casts', 'casts.person', 'casts.person.imageUris'],
    });

    const totalPages = Math.ceil(totalResults / limit);

    return {
      page,
      totalResults,
      totalPages,
      data: movies.map(movie => this.mapToResponseDto(movie)),
    };
  }

  async findOne(id: number): Promise<MovieResponseDto> {
    const movie = await this.movieRepository.findOne({
      where: { id },
      relations: ['genres', 'studios', 'networks', 'networks.imageUris', 'imageUris', 'casts', 'casts.person', 'casts.person.imageUris'],
    });

    if (!movie) {
      throw new NotFoundException(`فیلم با شناسه ${id} یافت نشد`);
    }

    return this.mapToResponseDto(movie);
  }

  async update(id: number, updateMovieDto: UpdateMovieDto): Promise<MovieResponseDto> {
    const movie = await this.movieRepository.findOne({
      where: { id },
      relations: ['genres', 'studios', 'networks', 'networks.imageUris', 'imageUris', 'casts', 'casts.person', 'casts.person.imageUris'],
    });

    if (!movie) {
      throw new NotFoundException(`فیلم با شناسه ${id} یافت نشد`);
    }

    Object.assign(movie, updateMovieDto);

    if (updateMovieDto.genreIds) {
      if (updateMovieDto.genreIds.length > 0) {
        const genres = await this.genresService.findByIds(updateMovieDto.genreIds);
        movie.genres = genres;
      } else {
        movie.genres = [];
      }
    }

    if (updateMovieDto.studioIds) {
      if (updateMovieDto.studioIds.length > 0) {
        const studios = await this.studiosService.findByIds(updateMovieDto.studioIds);
        movie.studios = studios;
      } else {
        movie.studios = [];
      }
    }

    if (updateMovieDto.networkIds) {
      if (updateMovieDto.networkIds.length > 0) {
        const networks = await this.networksService.findByIds(updateMovieDto.networkIds);
        movie.networks = networks;
      } else {
        movie.networks = [];
      }
    }

    // Series-only fields
    if ((updateMovieDto.type ?? movie.type) === MovieType.SERIES) {
      if (typeof updateMovieDto.hasEnded !== 'undefined') movie.hasEnded = updateMovieDto.hasEnded;
      if (typeof updateMovieDto.lastAired !== 'undefined') movie.lastAired = updateMovieDto.lastAired ? new Date(updateMovieDto.lastAired) : null;
    } else {
      movie.hasEnded = null;
      movie.lastAired = null;
    }

    const updatedMovie = await this.movieRepository.save(movie);

    if (updateMovieDto.imageUris) {
      await this.imageUrisService.removeByMovieId(updatedMovie.id);
      if (updateMovieDto.imageUris.length > 0) {
        await this.imageUrisService.createMany(updateMovieDto.imageUris, updatedMovie.id);
      }
    }

    if (updateMovieDto.casts) {
      await this.castsService.removeByMovieId(updatedMovie.id);
      if (updateMovieDto.casts.length > 0) {
        const castsWithMovieId = updateMovieDto.casts.map(c => ({ ...c, movieId: updatedMovie.id }));
        await this.castsService.createMany(castsWithMovieId);
      }
    }

    return this.mapToResponseDto(updatedMovie);
  }

  async remove(id: number): Promise<void> {
    const movie = await this.movieRepository.findOne({ where: { id } });

    if (!movie) {
      throw new NotFoundException(`فیلم با شناسه ${id} یافت نشد`);
    }

    await this.imageUrisService.removeByMovieId(id);
    await this.castsService.removeByMovieId(id);
    await this.movieRepository.softDelete(id);
  }

  async seed(): Promise<void> {
    await this.genreSeeder.seed();
    await this.movieSeeder.seed();
  }

  private mapToResponseDto(movie: Movie): MovieResponseDto {
    return {
      id: movie.id,
      title: movie.title,
      year: movie.year,
      tagline: movie.tagline,
      synopsis: movie.synopsis,
      runtime: movie.runtime,
      ageRating: movie.ageRating,
      adult: movie.adult,
      type: movie.type,
      hasEnded: movie.hasEnded ?? undefined,
      lastAired: movie.lastAired ?? undefined,
      genres: movie.genres ? movie.genres.map(genre => ({
        id: genre.id,
        name: genre.name,
        createdAt: genre.createdAt,
        updatedAt: genre.updatedAt,
      })) : [],
      studios: movie.studios ? movie.studios.map(studio => ({
        id: studio.id,
        name: studio.name,
        createdAt: studio.createdAt,
        updatedAt: studio.updatedAt,
      })) : [],
      networks: movie.networks ? movie.networks.map(network => ({
        id: network.id,
        name: network.name,
        imageUris: network.imageUris ? network.imageUris.reduce((p, c, i) => {
          return [...p, { [c.type] : c.url }]
        },[]) : [],
      })) : [],
      imageUris: movie.imageUris ? movie.imageUris.reduce((p, c, i) => {
        return [...p, { [c.type] : c.url }]
      },[]) : [],
      casts: movie.casts ? movie.casts.map(cast => ({
        id: cast.person.id,
        name: cast.person.name,
        role: cast.as,
        imageUris:cast.person.imageUris ? cast.person.imageUris.reduce((p, c, i) => {
          return [...p, { [c.type] : c.url }]
        },[]) : [],
      })) : [],

    };
  }
} 