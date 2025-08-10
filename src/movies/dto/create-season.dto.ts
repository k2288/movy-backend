import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsNumber, IsOptional, IsArray, ValidateNested } from 'class-validator';
import { i18nValidationMessage } from 'nestjs-i18n';
import { Type } from 'class-transformer';
import { CreateSeasonImageUriDto } from './create-season-image-uri.dto';

export class CreateSeasonDto {
  @ApiProperty({ description: 'نام فصل', example: 'Season 1' })
  @IsString({ message: i18nValidationMessage('validation.string.notEmpty') })
  @IsNotEmpty({ message: i18nValidationMessage('validation.string.notEmpty') })
  name: string;

  @ApiProperty({ description: 'شماره فصل', example: 1 })
  @IsNumber({}, { message: i18nValidationMessage('validation.number.invalid') })
  index: number;

  @ApiProperty({ description: 'شناسه سریال', example: 10 })
  @IsNumber({}, { message: i18nValidationMessage('validation.number.invalid') })
  seriesId: number;

  @ApiProperty({ description: 'تصاویر فصل', type: [CreateSeasonImageUriDto], required: false })
  @IsOptional()
  @IsArray({ message: i18nValidationMessage('validation.array.invalid') })
  @ValidateNested({ each: true })
  @Type(() => CreateSeasonImageUriDto)
  imageUris?: CreateSeasonImageUriDto[];
} 