import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsOptional, IsNumber, IsInt, Min } from 'class-validator';
import { Type } from 'class-transformer';
import { GenreDto } from '../../movie/dto/movie.dto';

export class EpisodeDto {
  @ApiProperty({ description: 'شناسه قسمت' })
  id: number;

  @ApiProperty({ description: 'شماره قسمت' })
  episodeNumber: number;

  @ApiProperty({ description: 'عنوان قسمت' })
  title: string;

  @ApiProperty({ description: 'توضیحات قسمت' })
  description: string;

  @ApiProperty({ description: 'تاریخ انتشار' })
  airDate: Date;

  @ApiProperty({ description: 'امتیاز متوسط' })
  voteAverage: number;

  @ApiProperty({ description: 'مسیر تصویر' })
  stillPath: string;

  @ApiProperty({ description: 'مدت زمان (دقیقه)' })
  runtime: number;
}

export class SeasonDto {
  @ApiProperty({ description: 'شناسه فصل' })
  id: number;

  @ApiProperty({ description: 'شماره فصل' })
  seasonNumber: number;

  @ApiProperty({ description: 'عنوان فصل' })
  title: string;

  @ApiProperty({ description: 'توضیحات فصل' })
  description: string;

  @ApiProperty({ description: 'تاریخ انتشار' })
  airDate: Date;

  @ApiProperty({ description: 'مسیر پوستر' })
  posterPath: string;

  @ApiProperty({ description: 'تعداد قسمت‌ها' })
  episodeCount: number;

  @ApiProperty({ description: 'قسمت‌ها' })
  episodes: EpisodeDto[];
}

export class SeriesDto {
  @ApiProperty({ description: 'شناسه سریال' })
  id: number;

  @ApiProperty({ description: 'عنوان سریال' })
  title: string;

  @ApiProperty({ description: 'توضیحات سریال' })
  description: string;

  @ApiProperty({ description: 'تاریخ انتشار اولین قسمت' })
  firstAirDate: Date;

  @ApiProperty({ description: 'امتیاز متوسط' })
  voteAverage: number;

  @ApiProperty({ description: 'مسیر پوستر' })
  posterPath: string;

  @ApiProperty({ description: 'مسیر تصویر پس‌زمینه' })
  backdropPath: string;

  @ApiProperty({ description: 'تعداد فصل‌ها' })
  numberOfSeasons: number;

  @ApiProperty({ description: 'تعداد قسمت‌ها' })
  numberOfEpisodes: number;

  @ApiProperty({ description: 'ژانرها' })
  genres: GenreDto[];
}

export class SeriesDetailDto extends SeriesDto {
  @ApiProperty({ description: 'تاریخ انتشار آخرین قسمت' })
  lastAirDate: Date;

  @ApiProperty({ description: 'وضعیت' })
  status: string;

  @ApiProperty({ description: 'زبان اصلی' })
  originalLanguage: string;

  @ApiProperty({ description: 'تعداد رای‌ها' })
  voteCount: number;

  @ApiProperty({ description: 'مشهوریت' })
  popularity: number;

  @ApiProperty({ description: 'تاریخ ایجاد' })
  createdAt: Date;

  @ApiProperty({ description: 'تاریخ بروزرسانی' })
  updatedAt: Date;
}

export class SeriesQueryDto {
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

  @ApiProperty({ description: 'مرتب‌سازی', required: false, enum: ['popularity', 'voteAverage', 'firstAirDate'] })
  @IsOptional()
  @IsString()
  sortBy?: string = 'popularity';

  @ApiProperty({ description: 'ترتیب', required: false, enum: ['asc', 'desc'] })
  @IsOptional()
  @IsString()
  sortOrder?: string = 'desc';
} 