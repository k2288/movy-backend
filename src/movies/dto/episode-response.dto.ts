import { ApiProperty } from '@nestjs/swagger';
import { EpisodeImageUriResponseDto } from './episode-image-uri-response.dto';

export class EpisodeResponseDto {
  @ApiProperty({ description: 'شناسه یکتای قسمت', example: 1 })
  id: number;

  @ApiProperty({ description: 'نام قسمت', example: 'Pilot' })
  name: string;

  @ApiProperty({ description: 'خلاصه داستان قسمت', example: 'قسمت اول سریال که شخصیت‌های اصلی معرفی می‌شوند' })
  synopsis: string;

  @ApiProperty({ description: 'شماره قسمت در فصل', example: 1 })
  index: number;

  @ApiProperty({ description: 'تاریخ پخش', example: '2023-01-15', required: false })
  airDate?: Date;

  @ApiProperty({ description: 'شماره فصل', example: 1 })
  seasonIndex: number;

  @ApiProperty({ description: 'شناسه سریال', example: 10 })
  seriesId: number;

  @ApiProperty({ description: 'شناسه فصل', example: 5 })
  seasonId: number;

  @ApiProperty({ description: 'تصاویر قسمت', type: [EpisodeImageUriResponseDto] })
  imageUris: EpisodeImageUriResponseDto[];

  @ApiProperty({ description: 'کارگردان‌های قسمت', example: ['Christopher Nolan', 'James Cameron'] })
  directors: string[];

  @ApiProperty({ description: 'تاریخ ایجاد' })
  createdAt: Date;

  @ApiProperty({ description: 'تاریخ بروزرسانی' })
  updatedAt: Date;
} 