import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ImageUri } from '../entities/image-uri.entity';
import { CreateImageUriDto } from '../dto/create-image-uri.dto';
import { UpdateImageUriDto } from '../dto/update-image-uri.dto';
import { ImageUriResponseDto } from '../dto/image-uri-response.dto';

@Injectable()
export class ImageUrisService {
  constructor(
    @InjectRepository(ImageUri)
    private readonly imageUriRepository: Repository<ImageUri>,
  ) {}

  async create(createImageUriDto: CreateImageUriDto, movieId: number): Promise<ImageUriResponseDto> {
    const imageUri = this.imageUriRepository.create({
      ...createImageUriDto,
      movieId,
    });
    const savedImageUri = await this.imageUriRepository.save(imageUri);
    return this.mapToResponseDto(savedImageUri);
  }

  async createMany(createImageUriDtos: CreateImageUriDto[], movieId: number): Promise<ImageUriResponseDto[]> {
    const imageUris = createImageUriDtos.map(dto => 
      this.imageUriRepository.create({
        ...dto,
        movieId,
      })
    );
    const savedImageUris = await this.imageUriRepository.save(imageUris);
    return savedImageUris.map(imageUri => this.mapToResponseDto(imageUri));
  }

  async findAll(): Promise<ImageUriResponseDto[]> {
    const imageUris = await this.imageUriRepository.find({
      order: { createdAt: 'DESC' },
    });
    return imageUris.map(imageUri => this.mapToResponseDto(imageUri));
  }

  async findByMovieId(movieId: number): Promise<ImageUriResponseDto[]> {
    const imageUris = await this.imageUriRepository.find({
      where: { movieId },
      order: { createdAt: 'DESC' },
    });
    return imageUris.map(imageUri => this.mapToResponseDto(imageUri));
  }

  async findOne(id: number): Promise<ImageUriResponseDto> {
    const imageUri = await this.imageUriRepository.findOne({ where: { id } });
    
    if (!imageUri) {
      throw new NotFoundException(`تصویر با شناسه ${id} یافت نشد`);
    }

    return this.mapToResponseDto(imageUri);
  }

  async update(id: number, updateImageUriDto: UpdateImageUriDto): Promise<ImageUriResponseDto> {
    const imageUri = await this.imageUriRepository.findOne({ where: { id } });
    
    if (!imageUri) {
      throw new NotFoundException(`تصویر با شناسه ${id} یافت نشد`);
    }

    Object.assign(imageUri, updateImageUriDto);
    const updatedImageUri = await this.imageUriRepository.save(imageUri);
    return this.mapToResponseDto(updatedImageUri);
  }

  async remove(id: number): Promise<void> {
    const imageUri = await this.imageUriRepository.findOne({ where: { id } });
    
    if (!imageUri) {
      throw new NotFoundException(`تصویر با شناسه ${id} یافت نشد`);
    }

    await this.imageUriRepository.softDelete(id);
  }

  async removeByMovieId(movieId: number): Promise<void> {
    await this.imageUriRepository.softDelete({ movieId });
  }

  private mapToResponseDto(imageUri: ImageUri): ImageUriResponseDto {
    return {
      id: imageUri.id,
      type: imageUri.type,
      url: imageUri.url,
      movieId: imageUri.movieId,
      createdAt: imageUri.createdAt,
      updatedAt: imageUri.updatedAt,
    };
  }
} 