import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsOptional, IsNumber, IsDate, IsArray } from 'class-validator';
import { Type } from 'class-transformer';

export class GenreDto {
  @ApiProperty({ description: 'شناسه ژانر' })
  id: number;

  @ApiProperty({ description: 'نام ژانر' })
  name: string;
}

export class CastDto {
  @ApiProperty({ description: 'شناسه بازیگر' })
  id: number;

  @ApiProperty({ description: 'نام بازیگر' })
  name: string;

  @ApiProperty({ description: 'نام شخصیت' })
  character: string;

  @ApiProperty({ description: 'مسیر تصویر پروفایل' })
  profilePath: string;
}

export class MovieDto {
  @ApiProperty({ description: 'شناسه فیلم' })
  id: number;

  @ApiProperty({ description: 'عنوان فیلم' })
  title: string;

  @ApiProperty({ description: 'توضیحات فیلم' })
  description: string;

  @ApiProperty({ description: 'تاریخ انتشار' })
  releaseDate: Date;

  @ApiProperty({ description: 'امتیاز متوسط' })
  voteAverage: number;

  @ApiProperty({ description: 'مسیر پوستر' })
  posterPath: string;

  @ApiProperty({ description: 'مسیر تصویر پس‌زمینه' })
  backdropPath: string;

  @ApiProperty({ description: 'ژانرها' })
  genres: GenreDto[];
}

export class MovieDetailDto extends MovieDto {
  @ApiProperty({ description: 'مدت زمان فیلم (دقیقه)' })
  runtime: number;

  @ApiProperty({ description: 'وضعیت' })
  status: string;

  @ApiProperty({ description: 'زبان اصلی' })
  originalLanguage: string;

  @ApiProperty({ description: 'بودجه' })
  budget: number;

  @ApiProperty({ description: 'درآمد' })
  revenue: number;

  @ApiProperty({ description: 'تعداد رای‌ها' })
  voteCount: number;

  @ApiProperty({ description: 'تاریخ ایجاد' })
  createdAt: Date;

  @ApiProperty({ description: 'تاریخ بروزرسانی' })
  updatedAt: Date;
}

export class MovieCreditsDto {
  @ApiProperty({ description: 'شناسه فیلم' })
  id: number;

  @ApiProperty({ description: 'بازیگران' })
  cast: CastDto[];
}

export class MovieQueryDto {
  @ApiProperty({ description: 'جستجو در عنوان', required: false })
  @IsOptional()
  @IsString()
  search?: string;

  @ApiProperty({ description: 'ژانر', required: false })
  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  genre?: number;

  @ApiProperty({ description: 'سال انتشار', required: false })
  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  year?: number;

  @ApiProperty({ description: 'مرتب‌سازی', required: false, enum: ['popularity', 'voteAverage', 'releaseDate'] })
  @IsOptional()
  @IsString()
  sortBy?: string = 'popularity';

  @ApiProperty({ description: 'ترتیب', required: false, enum: ['asc', 'desc'] })
  @IsOptional()
  @IsString()
  sortOrder?: string = 'desc';
} 