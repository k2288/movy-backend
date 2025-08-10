import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsEnum } from 'class-validator';
import { i18nValidationMessage } from 'nestjs-i18n';
import { PersonImageType } from '../entities/person-image-uri.entity';

export class CreatePersonImageUriDto {
  @ApiProperty({ description: 'نوع تصویر', enum: PersonImageType, example: PersonImageType.PROFILE })
  @IsEnum(PersonImageType, { message: i18nValidationMessage('validation.enum.invalid') })
  type: PersonImageType;

  @ApiProperty({ description: 'آدرس تصویر', example: 'https://example.com/person.jpg' })
  @IsString({ message: i18nValidationMessage('validation.string.notEmpty') })
  @IsNotEmpty({ message: i18nValidationMessage('validation.string.notEmpty') })
  url: string;
} 