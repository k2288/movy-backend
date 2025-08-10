import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsEnum, IsUrl } from 'class-validator';
import { i18nValidationMessage } from 'nestjs-i18n';
import { ImageType } from '../entities/image-uri.entity';

export class CreateImageUriDto {
  @ApiProperty({ description: 'نوع تصویر', enum: ImageType, example: ImageType.PRIMARY })
  @IsEnum(ImageType, { message: i18nValidationMessage('validation.enum.invalid') })
  @IsNotEmpty({ message: i18nValidationMessage('validation.string.notEmpty') })
  type: ImageType;

  @ApiProperty({ description: 'آدرس تصویر', example: 'https://example.com/image.jpg' })
  @IsUrl({}, { message: i18nValidationMessage('validation.url.invalid') })
  @IsString({ message: i18nValidationMessage('validation.string.notEmpty') })
  @IsNotEmpty({ message: i18nValidationMessage('validation.string.notEmpty') })
  url: string;
} 