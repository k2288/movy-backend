import { ApiProperty } from '@nestjs/swagger';
import { ImageType } from '../entities/image-uri.entity';

export class ImageUriResponseDto {
  @ApiProperty({ description: 'شناسه یکتای تصویر', example: 1 })
  id: number;

  @ApiProperty({ description: 'نوع تصویر', enum: ImageType, example: ImageType.PRIMARY })
  type: ImageType;

  @ApiProperty({ description: 'آدرس تصویر', example: 'https://example.com/image.jpg' })
  url: string;

  @ApiProperty({ description: 'شناسه فیلم', example: 1 })
  movieId: number;

  @ApiProperty({ description: 'تاریخ ایجاد' })
  createdAt: Date;

  @ApiProperty({ description: 'تاریخ بروزرسانی' })
  updatedAt: Date;
} 