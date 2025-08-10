import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsNumber, IsOptional, IsArray, IsDateString, Min, ValidateNested } from 'class-validator';
import { i18nValidationMessage } from 'nestjs-i18n';
import { Type } from 'class-transformer';
import { CreateEpisodeImageUriDto } from './create-episode-image-uri.dto';

export class CreateEpisodeDto {
  @ApiProperty({ description: 'نام قسمت', example: 'Pilot' })
  @IsString({ message: i18nValidationMessage('validation.string.notEmpty') })
  @IsNotEmpty({ message: i18nValidationMessage('validation.string.notEmpty') })
  name: string;

  @ApiProperty({ description: 'خلاصه داستان قسمت', example: 'قسمت اول سریال که شخصیت‌های اصلی معرفی می‌شوند', required: false })
  @IsOptional()
  @IsString({ message: i18nValidationMessage('validation.string.notEmpty') })
  synopsis?: string;

  @ApiProperty({ description: 'شماره قسمت در فصل', example: 1 })
  @IsNumber({}, { message: i18nValidationMessage('validation.number.invalid') })
  @Min(1, { message: i18nValidationMessage('validation.number.min') })
  index: number;

  @ApiProperty({ description: 'تاریخ پخش', example: '2023-01-15', required: false })
  @IsOptional()
  @IsDateString({}, { message: i18nValidationMessage('validation.date.invalid') })
  airDate?: string;

  @ApiProperty({ description: 'شماره فصل', example: 1 })
  @IsNumber({}, { message: i18nValidationMessage('validation.number.invalid') })
  @Min(1, { message: i18nValidationMessage('validation.number.min') })
  seasonIndex: number;

  @ApiProperty({ description: 'شناسه سریال', example: 10 })
  @IsNumber({}, { message: i18nValidationMessage('validation.number.invalid') })
  seriesId: number;

  @ApiProperty({ description: 'شناسه فصل', example: 5 })
  @IsNumber({}, { message: i18nValidationMessage('validation.number.invalid') })
  seasonId: number;

  @ApiProperty({ description: 'تصاویر قسمت', type: [CreateEpisodeImageUriDto], required: false })
  @IsOptional()
  @IsArray({ message: i18nValidationMessage('validation.array.invalid') })
  @ValidateNested({ each: true })
  @Type(() => CreateEpisodeImageUriDto)
  imageUris?: CreateEpisodeImageUriDto[];

  @ApiProperty({ description: 'کارگردان‌های قسمت', example: ['Christopher Nolan', 'James Cameron'], required: false, type: [String] })
  @IsOptional()
  @IsArray({ message: i18nValidationMessage('validation.array.invalid') })
  directors?: string[];
} 