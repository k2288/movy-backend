import { ApiProperty } from '@nestjs/swagger';

export class NetworkResponseDto {
  @ApiProperty({ description: 'شناسه یکتای شبکه', example: 1 })
  id: number;

  @ApiProperty({ description: 'نام شبکه', example: 'HBO' })
  name: string;

  @ApiProperty({ description: 'تصاویر شبکه', example: ['https://example.com/logo.png'] })
  imageUris: string[];

  @ApiProperty({ description: 'تاریخ ایجاد' })
  createdAt: Date;

  @ApiProperty({ description: 'تاریخ بروزرسانی' })
  updatedAt: Date;
} 