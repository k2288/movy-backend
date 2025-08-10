import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';
import { i18nValidationMessage } from 'nestjs-i18n';

export class CreateGenreDto {
  @ApiProperty({ description: 'نام ژانر', example: 'اکشن' })
  @IsString({ message: i18nValidationMessage('validation.string.notEmpty') })
  @IsNotEmpty({ message: i18nValidationMessage('validation.string.notEmpty') })
  name: string;
} 