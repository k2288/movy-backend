import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsEnum } from 'class-validator';
import { i18nValidationMessage } from 'nestjs-i18n';
import { EpisodeImageType } from '../entities/episode-image-uri.entity';

export class CreateEpisodeImageUriDto {
  @ApiProperty({ description: 'نوع تصویر', enum: EpisodeImageType, example: EpisodeImageType.STILL })
  @IsEnum(EpisodeImageType, { message: i18nValidationMessage('validation.enum.invalid') })
  type: EpisodeImageType;

  @ApiProperty({ description: 'آدرس تصویر', example: 'https://example.com/episode.jpg' })
  @IsString({ message: i18nValidationMessage('validation.string.notEmpty') })
  @IsNotEmpty({ message: i18nValidationMessage('validation.string.notEmpty') })
  url: string;
} 