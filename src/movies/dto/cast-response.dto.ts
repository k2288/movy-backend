import { ApiProperty } from '@nestjs/swagger';
import { PersonResponseDto } from './person-response.dto';

export class CastResponseDto {
  @ApiProperty({ description: 'شناسه یکتای بازیگر', example: 1 })
  id: number;

  @ApiProperty({ description: 'نقش در فیلم', example: 'کارگردان' })
  role: string;

  @ApiProperty({ description: 'نام نقشی که بازیگر ایفا می‌کند', example: 'Brand', required: false })
  as?: string;

  @ApiProperty({ description: 'شناسه شخص', example: 1 })
  personId: number;

  @ApiProperty({ description: 'شناسه فیلم', example: 1 })
  movieId: number;

  @ApiProperty({ description: 'شخص مربوطه', type: PersonResponseDto, required: false })
  person?: PersonResponseDto;

  @ApiProperty({ description: 'تاریخ ایجاد' })
  createdAt: Date;

  @ApiProperty({ description: 'تاریخ بروزرسانی' })
  updatedAt: Date;
} 