import { ApiProperty } from '@nestjs/swagger';
import { EpisodeImageType } from '../entities/episode-image-uri.entity';

export class EpisodeImageUriResponseDto {
  @ApiProperty({ description: 'شناسه یکتای تصویر', example: 1 })
  id: number;

  @ApiProperty({ description: 'نوع تصویر', enum: EpisodeImageType, example: EpisodeImageType.STILL })
  type: EpisodeImageType;

  @ApiProperty({ description: 'آدرس تصویر', example: 'https://example.com/episode.jpg' })
  url: string;

  @ApiProperty({ description: 'شناسه قسمت', example: 1 })
  episodeId: number;

  @ApiProperty({ description: 'تاریخ ایجاد' })
  createdAt: Date;

  @ApiProperty({ description: 'تاریخ بروزرسانی' })
  updatedAt: Date;
} 