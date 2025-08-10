import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsNumber, IsOptional, IsBoolean, Min, Max, IsArray, ValidateNested, IsEnum, IsDateString } from 'class-validator';
import { i18nValidationMessage } from 'nestjs-i18n';
import { Type } from 'class-transformer';
import { CreateImageUriDto } from './create-image-uri.dto';
import { CreateCastDto } from './create-cast.dto';
import { MovieType } from '../entities/movie.entity';

export class CreateMovieDto {
  @ApiProperty({ description: 'عنوان فیلم', example: 'بین ستاره‌ای' })
  @IsString({ message: i18nValidationMessage('validation.string.notEmpty') })
  @IsNotEmpty({ message: i18nValidationMessage('validation.string.notEmpty') })
  title: string;

  @ApiProperty({ description: 'سال انتشار', example: 2014 })
  @IsNumber({}, { message: i18nValidationMessage('validation.number.invalid') })
  @Min(1900, { message: i18nValidationMessage('validation.number.min') })
  @Max(new Date().getFullYear(), { message: i18nValidationMessage('validation.number.max') })
  year: number;

  @ApiProperty({ description: 'شعار فیلم', example: 'بشر روی زمین متولد شد. قرار نبود اینجا بمیرد.', required: false })
  @IsOptional()
  @IsString({ message: i18nValidationMessage('validation.string.notEmpty') })
  tagline?: string;

  @ApiProperty({ description: 'خلاصه داستان', example: 'ماجراجویی گروهی از کاوشگران که از یک کرم‌چاله تازه کشف شده استفاده می‌کنند تا محدودیت‌های سفر فضایی انسان را پشت سر بگذارند و مسافت‌های عظیم در سفر بین ستاره‌ای را فتح کنند.', required: false })
  @IsOptional()
  @IsString({ message: i18nValidationMessage('validation.string.notEmpty') })
  synopsis?: string;

  @ApiProperty({ description: 'مدت زمان فیلم (دقیقه)', example: 169 })
  @IsNumber({}, { message: i18nValidationMessage('validation.number.invalid') })
  @Min(1, { message: i18nValidationMessage('validation.number.min') })
  @Max(1000, { message: i18nValidationMessage('validation.number.max') })
  runtime: number;

  @ApiProperty({ description: 'رده سنی', example: 'PG-13', required: false })
  @IsOptional()
  @IsString({ message: i18nValidationMessage('validation.string.notEmpty') })
  ageRating?: string;

  @ApiProperty({ description: 'آیا فیلم برای بزرگسالان است', example: false, required: false })
  @IsOptional()
  @IsBoolean({ message: i18nValidationMessage('validation.boolean.invalid') })
  adult?: boolean;

  @ApiProperty({ description: 'نوع عنوان', enum: MovieType, example: MovieType.MOVIE, required: false })
  @IsOptional()
  @IsEnum(MovieType, { message: i18nValidationMessage('validation.enum.invalid') })
  type?: MovieType;

  @ApiProperty({ description: 'آیا سریال به پایان رسیده است', required: false })
  @IsOptional()
  @IsBoolean({ message: i18nValidationMessage('validation.boolean.invalid') })
  hasEnded?: boolean;

  @ApiProperty({ description: 'تاریخ آخرین پخش', required: false })
  @IsOptional()
  @IsDateString({}, { message: i18nValidationMessage('validation.date.invalid') })
  lastAired?: string;

  @ApiProperty({ description: 'ژانرهای فیلم', example: [1, 2, 3], required: false, type: [Number] })
  @IsOptional()
  @IsArray({ message: i18nValidationMessage('validation.array.invalid') })
  @Type(() => Number)
  genreIds?: number[];

  @ApiProperty({ description: 'استودیوهای فیلم', example: [1, 2], required: false, type: [Number] })
  @IsOptional()
  @IsArray({ message: i18nValidationMessage('validation.array.invalid') })
  @Type(() => Number)
  studioIds?: number[];

  @ApiProperty({ description: 'شبکه‌های پخش', example: [1, 2], required: false, type: [Number] })
  @IsOptional()
  @IsArray({ message: i18nValidationMessage('validation.array.invalid') })
  @Type(() => Number)
  networkIds?: number[];

  @ApiProperty({ description: 'تصاویر فیلم', type: [CreateImageUriDto], required: false })
  @IsOptional()
  @IsArray({ message: i18nValidationMessage('validation.array.invalid') })
  @ValidateNested({ each: true })
  @Type(() => CreateImageUriDto)
  imageUris?: CreateImageUriDto[];

  @ApiProperty({ description: 'بازیگران و عوامل فیلم', type: [CreateCastDto], required: false })
  @IsOptional()
  @IsArray({ message: i18nValidationMessage('validation.array.invalid') })
  @ValidateNested({ each: true })
  @Type(() => CreateCastDto)
  casts?: CreateCastDto[];
} 