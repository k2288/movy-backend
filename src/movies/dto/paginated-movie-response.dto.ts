import { ApiProperty } from '@nestjs/swagger';
import { MovieResponseDto } from './movie-response.dto';

export class PaginatedMovieResponseDto {
  @ApiProperty({ description: 'شماره صفحه فعلی', example: 1 })
  page: number;

  @ApiProperty({ description: 'تعداد کل نتایج', example: 150 })
  totalResults: number;

  @ApiProperty({ description: 'تعداد کل صفحات', example: 15 })
  totalPages: number;

  @ApiProperty({ description: 'داده‌های صفحه فعلی', type: [MovieResponseDto] })
  data: MovieResponseDto[];
} 