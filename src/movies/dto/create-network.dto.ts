import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsOptional, IsArray, ValidateNested } from 'class-validator';
import { i18nValidationMessage } from 'nestjs-i18n';
import { Type } from 'class-transformer';
import { CreateNetworkImageUriDto } from './create-network-image-uri.dto';

export class CreateNetworkDto {
  @ApiProperty({ description: 'نام شبکه', example: 'HBO' })
  @IsString({ message: i18nValidationMessage('validation.string.notEmpty') })
  @IsNotEmpty({ message: i18nValidationMessage('validation.string.notEmpty') })
  name: string;

  @ApiProperty({ description: 'تصاویر شبکه', type: [CreateNetworkImageUriDto], required: false })
  @IsOptional()
  @IsArray({ message: i18nValidationMessage('validation.array.invalid') })
  @ValidateNested({ each: true })
  @Type(() => CreateNetworkImageUriDto)
  imageUris?: CreateNetworkImageUriDto[];
} 