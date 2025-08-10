import { ApiProperty } from '@nestjs/swagger';
import { PersonImageType } from '../entities/person-image-uri.entity';

export class PersonImageUriResponseDto {
  @ApiProperty({ description: 'شناسه یکتای تصویر', example: 1 })
  id: number;

  @ApiProperty({ description: 'نوع تصویر', enum: PersonImageType, example: PersonImageType.PROFILE })
  type: PersonImageType;

  @ApiProperty({ description: 'آدرس تصویر', example: 'https://example.com/person.jpg' })
  url: string;

  @ApiProperty({ description: 'شناسه شخص', example: 1 })
  personId: number;

  @ApiProperty({ description: 'تاریخ ایجاد' })
  createdAt: Date;

  @ApiProperty({ description: 'تاریخ بروزرسانی' })
  updatedAt: Date;
} 