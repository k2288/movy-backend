import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsInt, Min, Max } from 'class-validator';
import { Type } from 'class-transformer';

export class PaginationDto {
  @ApiProperty({ description: 'شماره صفحه', required: false, default: 1 })
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  page?: number = 1;

  @ApiProperty({ description: 'تعداد آیتم در هر صفحه', required: false, default: 20 })
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  @Max(100)
  limit?: number = 20;
}

export class PaginatedResponseDto<T> {
  @ApiProperty({ description: 'شماره صفحه' })
  page: number;

  @ApiProperty({ description: 'تعداد کل نتایج' })
  totalResults: number;

  @ApiProperty({ description: 'تعداد کل صفحات' })
  totalPages: number;

  @ApiProperty({ description: 'نتایج' })
  results: T[];
} 