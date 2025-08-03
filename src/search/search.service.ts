import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Movie } from '../movie/entities/movie.entity';
import { Series } from '../series/entities/series.entity';
import { Person } from '../person/entities/person.entity';
import { SearchQueryDto, SearchResultDto, SearchType } from './dto/search.dto';
import { MovieDto } from '../movie/dto/movie.dto';
import { SeriesDto } from '../series/dto/series.dto';
import { PersonDto } from '../person/dto/person.dto';

@Injectable()
export class SearchService {
  constructor(
    @InjectRepository(Movie)
    private movieRepository: Repository<Movie>,
    @InjectRepository(Series)
    private seriesRepository: Repository<Series>,
    @InjectRepository(Person)
    private personRepository: Repository<Person>,
  ) {}

  async search(query: SearchQueryDto): Promise<SearchResultDto[]> {
    const { q, type } = query;
    const results: SearchResultDto[] = [];

    if (!type || type === SearchType.MOVIE) {
      const movies = await this.searchMovies(q);
      if (movies.length > 0) {
        results.push({
          type: SearchType.MOVIE,
          results: movies,
        });
      }
    }

    if (!type || type === SearchType.SERIES) {
      const series = await this.searchSeries(q);
      if (series.length > 0) {
        results.push({
          type: SearchType.SERIES,
          results: series,
        });
      }
    }

    if (!type || type === SearchType.PERSON) {
      const people = await this.searchPeople(q);
      if (people.length > 0) {
        results.push({
          type: SearchType.PERSON,
          results: people,
        });
      }
    }

    return results;
  }

  private async searchMovies(query: string): Promise<MovieDto[]> {
    const movies = await this.movieRepository
      .createQueryBuilder('movie')
      .leftJoinAndSelect('movie.genres', 'genre')
      .where('movie.title LIKE :query', { query: `%${query}%` })
      .orWhere('movie.description LIKE :query', { query: `%${query}%` })
      .orderBy('movie.voteCount', 'DESC')
      .take(10)
      .getMany();

    return movies.map(movie => ({
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
    }));
  }

  private async searchSeries(query: string): Promise<SeriesDto[]> {
    const series = await this.seriesRepository
      .createQueryBuilder('series')
      .leftJoinAndSelect('series.genres', 'genre')
      .where('series.title LIKE :query', { query: `%${query}%` })
      .orWhere('series.description LIKE :query', { query: `%${query}%` })
      .orderBy('series.popularity', 'DESC')
      .take(10)
      .getMany();

    return series.map(series => ({
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
    }));
  }

  private async searchPeople(query: string): Promise<PersonDto[]> {
    const people = await this.personRepository
      .createQueryBuilder('person')
      .where('person.name LIKE :query', { query: `%${query}%` })
      .orWhere('person.alsoKnownAs LIKE :query', { query: `%${query}%` })
      .orderBy('person.popularity', 'DESC')
      .take(10)
      .getMany();

    return people.map(person => ({
      id: person.id,
      name: person.name,
      profilePath: person.profilePath,
      popularity: person.popularity,
    }));
  }
} 