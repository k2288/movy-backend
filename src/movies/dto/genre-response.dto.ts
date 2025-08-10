import { ApiProperty } from '@nestjs/swagger';

export class GenreResponseDto {
  @ApiProperty({ description: 'شناسه یکتای ژانر', example: 1 })
  id: number;

  @ApiProperty({ description: 'نام ژانر', example: 'اکشن' })
  name: string;

  @ApiProperty({ description: 'تاریخ ایجاد' })
  createdAt: Date;

  @ApiProperty({ description: 'تاریخ بروزرسانی' })
  updatedAt: Date;
} 