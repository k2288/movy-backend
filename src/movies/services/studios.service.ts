import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, In } from 'typeorm';
import { Studio } from '../entities/studio.entity';
import { CreateStudioDto } from '../dto/create-studio.dto';
import { UpdateStudioDto } from '../dto/update-studio.dto';
import { StudioResponseDto } from '../dto/studio-response.dto';

@Injectable()
export class StudiosService {
  constructor(
    @InjectRepository(Studio)
    private readonly studioRepository: Repository<Studio>,
  ) {}

  async create(createStudioDto: CreateStudioDto): Promise<StudioResponseDto> {
    const studio = this.studioRepository.create(createStudioDto);
    const savedStudio = await this.studioRepository.save(studio);
    return this.mapToResponseDto(savedStudio);
  }

  async findAll(): Promise<StudioResponseDto[]> {
    const studios = await this.studioRepository.find({
      order: { name: 'ASC' },
    });
    return studios.map(studio => this.mapToResponseDto(studio));
  }

  async findOne(id: number): Promise<StudioResponseDto> {
    const studio = await this.studioRepository.findOne({ where: { id } });
    
    if (!studio) {
      throw new NotFoundException(`استودیو با شناسه ${id} یافت نشد`);
    }

    return this.mapToResponseDto(studio);
  }

  async findByIds(ids: number[]): Promise<Studio[]> {
    if (!ids || ids.length === 0) {
      return [];
    }
    
    const studios = await this.studioRepository.find({
      where: { id: In(ids) },
    });
    
    if (studios.length !== ids.length) {
      const foundIds = studios.map(studio => studio.id);
      const missingIds = ids.filter(id => !foundIds.includes(id));
      throw new NotFoundException(`استودیوهای با شناسه‌های ${missingIds.join(', ')} یافت نشدند`);
    }
    
    return studios;
  }

  async update(id: number, updateStudioDto: UpdateStudioDto): Promise<StudioResponseDto> {
    const studio = await this.studioRepository.findOne({ where: { id } });
    
    if (!studio) {
      throw new NotFoundException(`استودیو با شناسه ${id} یافت نشد`);
    }

    Object.assign(studio, updateStudioDto);
    const updatedStudio = await this.studioRepository.save(studio);
    return this.mapToResponseDto(updatedStudio);
  }

  async remove(id: number): Promise<void> {
    const studio = await this.studioRepository.findOne({ where: { id } });
    
    if (!studio) {
      throw new NotFoundException(`استودیو با شناسه ${id} یافت نشد`);
    }

    await this.studioRepository.softDelete(id);
  }

  private mapToResponseDto(studio: Studio): StudioResponseDto {
    return {
      id: studio.id,
      name: studio.name,
      createdAt: studio.createdAt,
      updatedAt: studio.updatedAt,
    };
  }
} 