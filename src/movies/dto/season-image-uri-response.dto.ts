import { ApiProperty } from '@nestjs/swagger';
import { SeasonImageType } from '../entities/season-image-uri.entity';

export class SeasonImageUriResponseDto {
  @ApiProperty({ description: 'شناسه یکتای تصویر', example: 1 })
  id: number;

  @ApiProperty({ description: 'نوع تصویر', enum: SeasonImageType, example: SeasonImageType.POSTER })
  type: SeasonImageType;

  @ApiProperty({ description: 'آدرس تصویر', example: 'https://example.com/season.jpg' })
  url: string;

  @ApiProperty({ description: 'شناسه فصل', example: 1 })
  seasonId: number;

  @ApiProperty({ description: 'تاریخ ایجاد' })
  createdAt: Date;

  @ApiProperty({ description: 'تاریخ بروزرسانی' })
  updatedAt: Date;
} 