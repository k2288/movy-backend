import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, In } from 'typeorm';
import { Genre } from '../entities/genre.entity';
import { CreateGenreDto } from '../dto/create-genre.dto';
import { UpdateGenreDto } from '../dto/update-genre.dto';
import { GenreResponseDto } from '../dto/genre-response.dto';

@Injectable()
export class GenresService {
  constructor(
    @InjectRepository(Genre)
    private readonly genreRepository: Repository<Genre>,
  ) {}

  async create(createGenreDto: CreateGenreDto): Promise<GenreResponseDto> {
    const genre = this.genreRepository.create(createGenreDto);
    const savedGenre = await this.genreRepository.save(genre);
    return this.mapToResponseDto(savedGenre);
  }

  async findAll(): Promise<GenreResponseDto[]> {
    const genres = await this.genreRepository.find({
      order: { name: 'ASC' },
    });
    return genres.map(genre => this.mapToResponseDto(genre));
  }

  async findOne(id: number): Promise<GenreResponseDto> {
    const genre = await this.genreRepository.findOne({ where: { id } });
    
    if (!genre) {
      throw new NotFoundException(`ژانر با شناسه ${id} یافت نشد`);
    }

    return this.mapToResponseDto(genre);
  }

  async findByIds(ids: number[]): Promise<Genre[]> {
    if (!ids || ids.length === 0) {
      return [];
    }
    
    const genres = await this.genreRepository.find({
      where: { id: In(ids) },
    });
    
    if (genres.length !== ids.length) {
      const foundIds = genres.map(genre => genre.id);
      const missingIds = ids.filter(id => !foundIds.includes(id));
      throw new NotFoundException(`ژانرهای با شناسه‌های ${missingIds.join(', ')} یافت نشدند`);
    }
    
    return genres;
  }

  async update(id: number, updateGenreDto: UpdateGenreDto): Promise<GenreResponseDto> {
    const genre = await this.genreRepository.findOne({ where: { id } });
    
    if (!genre) {
      throw new NotFoundException(`ژانر با شناسه ${id} یافت نشد`);
    }

    Object.assign(genre, updateGenreDto);
    const updatedGenre = await this.genreRepository.save(genre);
    return this.mapToResponseDto(updatedGenre);
  }

  async remove(id: number): Promise<void> {
    const genre = await this.genreRepository.findOne({ where: { id } });
    
    if (!genre) {
      throw new NotFoundException(`ژانر با شناسه ${id} یافت نشد`);
    }

    await this.genreRepository.softDelete(id);
  }

  private mapToResponseDto(genre: Genre): GenreResponseDto {
    return {
      id: genre.id,
      name: genre.name,
      createdAt: genre.createdAt,
      updatedAt: genre.updatedAt,
    };
  }
} 