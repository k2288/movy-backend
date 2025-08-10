import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsOptional, IsArray, ValidateNested } from 'class-validator';
import { i18nValidationMessage } from 'nestjs-i18n';
import { Type } from 'class-transformer';
import { CreatePersonImageUriDto } from './create-person-image-uri.dto';

export class CreatePersonDto {
  @ApiProperty({ description: 'نام شخص', example: 'Anne Hathaway' })
  @IsString({ message: i18nValidationMessage('validation.string.notEmpty') })
  @IsNotEmpty({ message: i18nValidationMessage('validation.string.notEmpty') })
  name: string;

  @ApiProperty({ description: 'تصاویر شخص', type: [CreatePersonImageUriDto], required: false })
  @IsOptional()
  @IsArray({ message: i18nValidationMessage('validation.array.invalid') })
  @ValidateNested({ each: true })
  @Type(() => CreatePersonImageUriDto)
  imageUris?: CreatePersonImageUriDto[];
} 