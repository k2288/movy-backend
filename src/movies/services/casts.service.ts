import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Cast } from '../entities/cast.entity';
import { CreateCastDto } from '../dto/create-cast.dto';
import { UpdateCastDto } from '../dto/update-cast.dto';
import { CastResponseDto } from '../dto/cast-response.dto';
import { PersonResponseDto } from '../dto/person-response.dto';

@Injectable()
export class CastsService {
  constructor(
    @InjectRepository(Cast)
    private readonly castRepository: Repository<Cast>,
  ) {}

  async create(createCastDto: CreateCastDto): Promise<CastResponseDto> {
    const cast = this.castRepository.create(createCastDto);
    const savedCast = await this.castRepository.save(cast);
    return this.mapToResponseDto(savedCast);
  }

  async createMany(createCastDtos: CreateCastDto[]): Promise<CastResponseDto[]> {
    const casts = createCastDtos.map(dto => 
      this.castRepository.create(dto)
    );
    const savedCasts = await this.castRepository.save(casts);
    return savedCasts.map(cast => this.mapToResponseDto(cast));
  }

  async findAll(): Promise<CastResponseDto[]> {
    const casts = await this.castRepository.find({
      relations: ['person'],
      order: { createdAt: 'DESC' },
    });
    return casts.map(cast => this.mapToResponseDto(cast));
  }

  async findByMovieId(movieId: number): Promise<CastResponseDto[]> {
    const casts = await this.castRepository.find({
      where: { movieId },
      relations: ['person'],
      order: { createdAt: 'DESC' },
    });
    return casts.map(cast => this.mapToResponseDto(cast));
  }

  async findOne(id: number): Promise<CastResponseDto> {
    const cast = await this.castRepository.findOne({ 
      where: { id },
      relations: ['person'],
    });
    
    if (!cast) {
      throw new NotFoundException(`بازیگر با شناسه ${id} یافت نشد`);
    }

    return this.mapToResponseDto(cast);
  }

  async update(id: number, updateCastDto: UpdateCastDto): Promise<CastResponseDto> {
    const cast = await this.castRepository.findOne({ 
      where: { id },
      relations: ['person'],
    });
    
    if (!cast) {
      throw new NotFoundException(`بازیگر با شناسه ${id} یافت نشد`);
    }

    Object.assign(cast, updateCastDto);
    const updatedCast = await this.castRepository.save(cast);
    return this.mapToResponseDto(updatedCast);
  }

  async remove(id: number): Promise<void> {
    const cast = await this.castRepository.findOne({ where: { id } });
    
    if (!cast) {
      throw new NotFoundException(`بازیگر با شناسه ${id} یافت نشد`);
    }

    await this.castRepository.softDelete(id);
  }

  async removeByMovieId(movieId: number): Promise<void> {
    await this.castRepository.softDelete({ movieId });
  }

  private mapToResponseDto(cast: Cast): CastResponseDto {
    return {
      id: cast.id,
      role: cast.role,
      name: cast.person.name,
      imageUris:cast.person.imageUris ? cast.person.imageUris.reduce((p, c, i) => {
        return [...p, { [c.type] : c.url }]
      },[]) : [],
    };
  }
} 