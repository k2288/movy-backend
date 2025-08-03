import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Series } from './entities/series.entity';
import { Season } from './entities/season.entity';
import { Episode } from './entities/episode.entity';
import { SeriesDto, SeriesDetailDto, SeriesQueryDto, SeasonDto, EpisodeDto } from './dto/series.dto';
import { PaginationDto, PaginatedResponseDto } from '../common/dto/pagination.dto';

@Injectable()
export class SeriesService {
  constructor(
    @InjectRepository(Series)
    private seriesRepository: Repository<Series>,
    @InjectRepository(Season)
    private seasonRepository: Repository<Season>,
    @InjectRepository(Episode)
    private episodeRepository: Repository<Episode>,
  ) {}

  async findAll(query: SeriesQueryDto, pagination: PaginationDto): Promise<PaginatedResponseDto<SeriesDto>> {
    const { page = 1, limit = 20 } = pagination;
    const skip = (page - 1) * limit;

    const queryBuilder = this.seriesRepository
      .createQueryBuilder('series')
      .leftJoinAndSelect('series.genres', 'genre')
      .leftJoinAndSelect('series.cast', 'cast')
      .leftJoinAndSelect('cast.person', 'person');

    // Apply search filter
    if (query.search) {
      queryBuilder.andWhere('series.title LIKE :search', { search: `%${query.search}%` });
    }

    // Apply genre filter
    if (query.genre) {
      queryBuilder.andWhere('genre.id = :genreId', { genreId: query.genre });
    }

    // Apply year filter
    if (query.year) {
      queryBuilder.andWhere('YEAR(series.firstAirDate) = :year', { year: query.year });
    }

    // Apply sorting
    const sortBy = query.sortBy || 'popularity';
    const sortOrder = query.sortOrder || 'desc';
    
    switch (sortBy) {
      case 'voteAverage':
        queryBuilder.orderBy('series.voteAverage', sortOrder.toUpperCase() as 'ASC' | 'DESC');
        break;
      case 'firstAirDate':
        queryBuilder.orderBy('series.firstAirDate', sortOrder.toUpperCase() as 'ASC' | 'DESC');
        break;
      default:
        queryBuilder.orderBy('series.popularity', sortOrder.toUpperCase() as 'ASC' | 'DESC');
    }

    const [series, total] = await queryBuilder
      .skip(skip)
      .take(limit)
      .getManyAndCount();

    const totalPages = Math.ceil(total / limit);

    const seriesDtos = series.map(series => this.mapToSeriesDto(series));

    return {
      page,
      totalResults: total,
      totalPages,
      results: seriesDtos,
    };
  }

  async findOne(id: number): Promise<SeriesDetailDto> {
    const series = await this.seriesRepository.findOne({
      where: { id },
      relations: ['genres', 'cast', 'cast.person'],
    });

    if (!series) {
      throw new Error('سریال یافت نشد');
    }

    return this.mapToSeriesDetailDto(series);
  }

  async findSeasons(id: number): Promise<SeasonDto[]> {
    const seasons = await this.seasonRepository.find({
      where: { seriesId: id },
      relations: ['episodes'],
      order: { seasonNumber: 'ASC' },
    });

    return seasons.map(season => this.mapToSeasonDto(season));
  }

  async findSeason(id: number, seasonNumber: number): Promise<SeasonDto> {
    const season = await this.seasonRepository.findOne({
      where: { seriesId: id, seasonNumber },
      relations: ['episodes'],
    });

    if (!season) {
      throw new Error('فصل یافت نشد');
    }

    return this.mapToSeasonDto(season);
  }

  private mapToSeriesDto(series: Series): SeriesDto {
    return {
      id: series.id,
      title: series.title,
      description: series.description,
      firstAirDate: series.firstAirDate,
      voteAverage: series.voteAverage,
      posterPath: series.posterPath,
      backdropPath: series.backdropPath,
      numberOfSeasons: series.numberOfSeasons,
      numberOfEpisodes: series.numberOfEpisodes,
      genres: series.genres?.map(genre => ({
        id: genre.id,
        name: genre.name,
      })) || [],
    };
  }

  private mapToSeriesDetailDto(series: Series): SeriesDetailDto {
    return {
      ...this.mapToSeriesDto(series),
      lastAirDate: series.lastAirDate,
      status: series.status,
      originalLanguage: series.originalLanguage,
      voteCount: series.voteCount,
      popularity: series.popularity,
      createdAt: series.createdAt,
      updatedAt: series.updatedAt,
    };
  }

  private mapToSeasonDto(season: Season): SeasonDto {
    return {
      id: season.id,
      seasonNumber: season.seasonNumber,
      title: season.title,
      description: season.description,
      airDate: season.airDate,
      posterPath: season.posterPath,
      episodeCount: season.episodeCount,
      episodes: season.episodes?.map(episode => this.mapToEpisodeDto(episode)) || [],
    };
  }

  private mapToEpisodeDto(episode: Episode): EpisodeDto {
    return {
      id: episode.id,
      episodeNumber: episode.episodeNumber,
      title: episode.title,
      description: episode.description,
      airDate: episode.airDate,
      voteAverage: episode.voteAverage,
      stillPath: episode.stillPath,
      runtime: episode.runtime,
    };
  }
} 