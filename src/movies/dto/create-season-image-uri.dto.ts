import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsEnum } from 'class-validator';
import { i18nValidationMessage } from 'nestjs-i18n';
import { SeasonImageType } from '../entities/season-image-uri.entity';

export class CreateSeasonImageUriDto {
  @ApiProperty({ description: 'نوع تصویر', enum: SeasonImageType, example: SeasonImageType.POSTER })
  @IsEnum(SeasonImageType, { message: i18nValidationMessage('validation.enum.invalid') })
  type: SeasonImageType;

  @ApiProperty({ description: 'آدرس تصویر', example: 'https://example.com/season.jpg' })
  @IsString({ message: i18nValidationMessage('validation.string.notEmpty') })
  @IsNotEmpty({ message: i18nValidationMessage('validation.string.notEmpty') })
  url: string;
} 