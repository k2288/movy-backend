import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Season } from '../entities/season.entity';
import { CreateSeasonDto } from '../dto/create-season.dto';
import { UpdateSeasonDto } from '../dto/update-season.dto';
import { SeasonResponseDto } from '../dto/season-response.dto';
import { MovieType } from '../entities/movie.entity';

@Injectable()
export class SeasonsService {
  constructor(
    @InjectRepository(Season)
    private readonly seasonRepository: Repository<Season>,
  ) {}

  async create(dto: CreateSeasonDto): Promise<SeasonResponseDto> {
    const season = this.seasonRepository.create(dto);
    const saved = await this.seasonRepository.save(season);
    return this.map(saved);
  }

  async findBySeriesId(seriesId: number): Promise<SeasonResponseDto[]> {
    const list = await this.seasonRepository.find({ where: { seriesId }, order: { index: 'ASC' } });
    return list.map(this.map);
  }

  async findOne(id: number): Promise<SeasonResponseDto> {
    const season = await this.seasonRepository.findOne({ where: { id } });
    if (!season) throw new NotFoundException(`فصل با شناسه ${id} یافت نشد`);
    return this.map(season);
  }

  async update(id: number, dto: UpdateSeasonDto): Promise<SeasonResponseDto> {
    const season = await this.seasonRepository.findOne({ where: { id } });
    if (!season) throw new NotFoundException(`فصل با شناسه ${id} یافت نشد`);
    Object.assign(season, dto);
    const saved = await this.seasonRepository.save(season);
    return this.map(saved);
  }

  async remove(id: number): Promise<void> {
    const season = await this.seasonRepository.findOne({ where: { id } });
    if (!season) throw new NotFoundException(`فصل با شناسه ${id} یافت نشد`);
    await this.seasonRepository.softDelete(id);
  }

  private map = (s: Season): SeasonResponseDto => ({
    id: s.id,
    name: s.name,
    index: s.index,
    seriesId: s.seriesId,
    imageUris: s.imageUris,
    createdAt: s.createdAt,
    updatedAt: s.updatedAt,
  });
} 