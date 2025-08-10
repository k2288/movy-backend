import { ApiProperty } from '@nestjs/swagger';
import { NetworkImageType } from '../entities/network-image-uri.entity';

export class NetworkImageUriResponseDto {
  @ApiProperty({ description: 'شناسه یکتای تصویر', example: 1 })
  id: number;

  @ApiProperty({ description: 'نوع تصویر', enum: NetworkImageType, example: NetworkImageType.LOGO })
  type: NetworkImageType;

  @ApiProperty({ description: 'آدرس تصویر', example: 'https://example.com/network.jpg' })
  url: string;

  @ApiProperty({ description: 'شناسه شبکه', example: 1 })
  networkId: number;

  @ApiProperty({ description: 'تاریخ ایجاد' })
  createdAt: Date;

  @ApiProperty({ description: 'تاریخ بروزرسانی' })
  updatedAt: Date;
} 