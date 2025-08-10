import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsOptional, IsArray } from 'class-validator';
import { i18nValidationMessage } from 'nestjs-i18n';

export class CreateNetworkDto {
  @ApiProperty({ description: 'نام شبکه', example: 'HBO' })
  @IsString({ message: i18nValidationMessage('validation.string.notEmpty') })
  @IsNotEmpty({ message: i18nValidationMessage('validation.string.notEmpty') })
  name: string;

  @ApiProperty({ description: 'تصاویر شبکه', example: ['https://example.com/logo.png'], required: false, type: [String] })
  @IsOptional()
  @IsArray({ message: i18nValidationMessage('validation.array.invalid') })
  imageUris?: string[];
} 