import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Like, In } from 'typeorm';
import { Movie } from './entities/movie.entity';
import { MovieDto, MovieDetailDto, MovieCreditsDto, MovieQueryDto } from './dto/movie.dto';
import { PaginationDto, PaginatedResponseDto } from '../common/dto/pagination.dto';

@Injectable()
export class MovieService {
  constructor(
    @InjectRepository(Movie)
    private movieRepository: Repository<Movie>,
  ) {}

  async findAll(query: MovieQueryDto, pagination: PaginationDto): Promise<PaginatedResponseDto<MovieDto>> {
    const { page = 1, limit = 20 } = pagination;
    const skip = (page - 1) * limit;

    const queryBuilder = this.movieRepository
      .createQueryBuilder('movie')
      .leftJoinAndSelect('movie.genres', 'genre')
      .leftJoinAndSelect('movie.cast', 'cast')
      .leftJoinAndSelect('cast.person', 'person');

    // Apply search filter
    if (query.search) {
      queryBuilder.andWhere('movie.title LIKE :search', { search: `%${query.search}%` });
    }

    // Apply genre filter
    if (query.genre) {
      queryBuilder.andWhere('genre.id = :genreId', { genreId: query.genre });
    }

    // Apply year filter
    if (query.year) {
      queryBuilder.andWhere('YEAR(movie.releaseDate) = :year', { year: query.year });
    }

    // Apply sorting
    const sortBy = query.sortBy || 'popularity';
    const sortOrder = query.sortOrder || 'desc';
    
    switch (sortBy) {
      case 'voteAverage':
        queryBuilder.orderBy('movie.voteAverage', sortOrder.toUpperCase() as 'ASC' | 'DESC');
        break;
      case 'releaseDate':
        queryBuilder.orderBy('movie.releaseDate', sortOrder.toUpperCase() as 'ASC' | 'DESC');
        break;
      default:
        queryBuilder.orderBy('movie.voteCount', sortOrder.toUpperCase() as 'ASC' | 'DESC');
    }

    const [movies, total] = await queryBuilder
      .skip(skip)
      .take(limit)
      .getManyAndCount();

    const totalPages = Math.ceil(total / limit);

    const movieDtos = movies.map(movie => this.mapToMovieDto(movie));

    return {
      page,
      totalResults: total,
      totalPages,
      results: movieDtos,
    };
  }

  async findOne(id: number): Promise<MovieDetailDto> {
    const movie = await this.movieRepository.findOne({
      where: { id },
      relations: ['genres', 'cast', 'cast.person'],
    });

    if (!movie) {
      throw new Error('فیلم یافت نشد');
    }

    return this.mapToMovieDetailDto(movie);
  }

  async findCredits(id: number): Promise<MovieCreditsDto> {
    const movie = await this.movieRepository.findOne({
      where: { id },
      relations: ['cast', 'cast.person'],
    });

    if (!movie) {
      throw new Error('فیلم یافت نشد');
    }

    const cast = movie.cast.map(cast => ({
      id: cast.person.id,
      name: cast.person.name,
      character: cast.character,
      profilePath: cast.person.profilePath,
    }));

    return {
      id: movie.id,
      cast,
    };
  }

  private mapToMovieDto(movie: Movie): MovieDto {
    return {
      id: movie.id,
      title: movie.title,
      description: movie.description,
      releaseDate: movie.releaseDate,
      voteAverage: movie.voteAverage,
      posterPath: movie.posterPath,
      backdropPath: movie.backdropPath,
      genres: movie.genres?.map(genre => ({
        id: genre.id,
        name: genre.name,
      })) || [],
    };
  }

  private mapToMovieDetailDto(movie: Movie): MovieDetailDto {
    return {
      ...this.mapToMovieDto(movie),
      runtime: movie.runtime,
      status: movie.status,
      originalLanguage: movie.originalLanguage,
      budget: movie.budget,
      revenue: movie.revenue,
      voteCount: movie.voteCount,
      createdAt: movie.createdAt,
      updatedAt: movie.updatedAt,
    };
  }
} 