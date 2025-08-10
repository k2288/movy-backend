import { ApiProperty } from '@nestjs/swagger';
import { SeasonImageUriResponseDto } from './season-image-uri-response.dto';

export class SeasonResponseDto {
  @ApiProperty({ description: 'شناسه یکتای فصل', example: 1 })
  id: number;

  @ApiProperty({ description: 'نام فصل', example: 'Season 1' })
  name: string;

  @ApiProperty({ description: 'شماره فصل', example: 1 })
  index: number;

  @ApiProperty({ description: 'شناسه سریال', example: 10 })
  seriesId: number;

  @ApiProperty({ description: 'تصاویر فصل', type: [SeasonImageUriResponseDto] })
  imageUris: SeasonImageUriResponseDto[];

  @ApiProperty({ description: 'تاریخ ایجاد' })
  createdAt: Date;

  @ApiProperty({ description: 'تاریخ بروزرسانی' })
  updatedAt: Date;
} 