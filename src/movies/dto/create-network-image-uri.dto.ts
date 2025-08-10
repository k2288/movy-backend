import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsEnum } from 'class-validator';
import { i18nValidationMessage } from 'nestjs-i18n';
import { NetworkImageType } from '../entities/network-image-uri.entity';

export class CreateNetworkImageUriDto {
  @ApiProperty({ description: 'نوع تصویر', enum: NetworkImageType, example: NetworkImageType.LOGO })
  @IsEnum(NetworkImageType, { message: i18nValidationMessage('validation.enum.invalid') })
  type: NetworkImageType;

  @ApiProperty({ description: 'آدرس تصویر', example: 'https://example.com/network.jpg' })
  @IsString({ message: i18nValidationMessage('validation.string.notEmpty') })
  @IsNotEmpty({ message: i18nValidationMessage('validation.string.notEmpty') })
  url: string;
} 