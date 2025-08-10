import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsNumber, IsOptional } from 'class-validator';
import { i18nValidationMessage } from 'nestjs-i18n';

export class CreateCastDto {
  @ApiProperty({ description: 'نقش در فیلم', example: 'کارگردان' })
  @IsString({ message: i18nValidationMessage('validation.string.notEmpty') })
  @IsNotEmpty({ message: i18nValidationMessage('validation.string.notEmpty') })
  role: string;

  @ApiProperty({ description: 'نام نقشی که بازیگر ایفا می‌کند', example: 'Brand', required: false })
  @IsOptional()
  @IsString({ message: i18nValidationMessage('validation.string.notEmpty') })
  as?: string;

  @ApiProperty({ description: 'شناسه شخص', example: 1 })
  @IsNumber({}, { message: i18nValidationMessage('validation.number.invalid') })
  personId: number;

  @ApiProperty({ description: 'شناسه فیلم', example: 1 })
  @IsNumber({}, { message: i18nValidationMessage('validation.number.invalid') })
  movieId: number;
} 