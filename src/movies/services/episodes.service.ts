import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Episode } from '../entities/episode.entity';
import { CreateEpisodeDto } from '../dto/create-episode.dto';
import { UpdateEpisodeDto } from '../dto/update-episode.dto';
import { EpisodeResponseDto } from '../dto/episode-response.dto';

@Injectable()
export class EpisodesService {
  constructor(
    @InjectRepository(Episode)
    private readonly episodeRepository: Repository<Episode>,
  ) {}

  async create(dto: CreateEpisodeDto): Promise<EpisodeResponseDto> {
    const episode = this.episodeRepository.create({
      ...dto,
      airDate: dto.airDate ? new Date(dto.airDate) : null,
    });
    const saved = await this.episodeRepository.save(episode);
    return this.map(saved);
  }

  async findBySeriesId(seriesId: number): Promise<EpisodeResponseDto[]> {
    const list = await this.episodeRepository.find({ 
      where: { seriesId }, 
      order: { seasonIndex: 'ASC', index: 'ASC' } 
    });
    return list.map(this.map);
  }

  async findBySeasonId(seasonId: number): Promise<EpisodeResponseDto[]> {
    const list = await this.episodeRepository.find({ 
      where: { seasonId }, 
      order: { index: 'ASC' } 
    });
    return list.map(this.map);
  }

  async findOne(id: number): Promise<EpisodeResponseDto> {
    const episode = await this.episodeRepository.findOne({ where: { id } });
    if (!episode) throw new NotFoundException(`قسمت با شناسه ${id} یافت نشد`);
    return this.map(episode);
  }

  async update(id: number, dto: UpdateEpisodeDto): Promise<EpisodeResponseDto> {
    const episode = await this.episodeRepository.findOne({ where: { id } });
    if (!episode) throw new NotFoundException(`قسمت با شناسه ${id} یافت نشد`);
    
    const updateData: any = { ...dto };
    if (dto.airDate) {
      updateData.airDate = new Date(dto.airDate);
    }
    
    Object.assign(episode, updateData);
    const saved = await this.episodeRepository.save(episode);
    return this.map(saved);
  }

  async remove(id: number): Promise<void> {
    const episode = await this.episodeRepository.findOne({ where: { id } });
    if (!episode) throw new NotFoundException(`قسمت با شناسه ${id} یافت نشد`);
    await this.episodeRepository.softDelete(id);
  }

  private map = (e: Episode): EpisodeResponseDto => ({
    id: e.id,
    name: e.name,
    synopsis: e.synopsis,
    index: e.index,
    airDate: e.airDate,
    seasonIndex: e.seasonIndex,
    seriesId: e.seriesId,
    seasonId: e.seasonId,
    imageUris: e.imageUris || [],
    directors: e.directors || [],
    createdAt: e.createdAt,
    updatedAt: e.updatedAt,
  });
} 