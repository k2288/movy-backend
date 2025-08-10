import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsNumber, Min, Max, IsString } from 'class-validator';
import { Type } from 'class-transformer';
import { MovieType } from '../entities/movie.entity';

export class PaginationDto {
  @ApiProperty({ description: 'شماره صفحه', example: 1, required: false, default: 1 })
  @IsOptional()
  @Type(() => Number)
  @IsNumber({}, { message: 'شماره صفحه باید عدد باشد' })
  @Min(1, { message: 'شماره صفحه باید حداقل 1 باشد' })
  page?: number = 1;

  @ApiProperty({ description: 'تعداد آیتم در هر صفحه', example: 10, required: false, default: 10 })
  @IsOptional()
  @Type(() => Number)
  @IsNumber({}, { message: 'تعداد آیتم باید عدد باشد' })
  @Min(1, { message: 'تعداد آیتم باید حداقل 1 باشد' })
  @Max(100, { message: 'تعداد آیتم نمی‌تواند بیشتر از 100 باشد' })
  limit?: number = 10;

  @ApiProperty({ description: 'نوع صفحه', example: 'movie', required: false ,enum: MovieType })    
  @IsOptional()
  @IsString({ message: 'نوع صفحه باید یک رشته باشد' })
  type?: MovieType;
}

export class PaginatedResponseDto<T> {
  @ApiProperty({ description: 'شماره صفحه فعلی', example: 1 })
  page: number;

  @ApiProperty({ description: 'تعداد کل نتایج', example: 150 })
  totalResults: number;

  @ApiProperty({ description: 'تعداد کل صفحات', example: 15 })
  totalPages: number;

  @ApiProperty({ description: 'داده‌های صفحه فعلی', type: 'array' })
  data: T[];
} 