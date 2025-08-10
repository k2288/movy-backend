import { ApiProperty } from '@nestjs/swagger';

export class StudioResponseDto {
  @ApiProperty({ description: 'شناسه یکتای استودیو', example: 1 })
  id: number;

  @ApiProperty({ description: 'نام استودیو', example: 'وارنر برادرز' })
  name: string;

  @ApiProperty({ description: 'تاریخ ایجاد' })
  createdAt: Date;

  @ApiProperty({ description: 'تاریخ بروزرسانی' })
  updatedAt: Date;
} 