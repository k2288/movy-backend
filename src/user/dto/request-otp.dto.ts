import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsMobilePhone } from 'class-validator';
import { i18nValidationMessage } from 'nestjs-i18n';

export class RequestOtpDto {
    @ApiProperty()
    @IsString({ message: i18nValidationMessage('validation.string.notEmpty') })
    @IsNotEmpty({ message: i18nValidationMessage('validation.string.notEmpty') })
    @IsMobilePhone("fa-IR", {}, { message: i18nValidationMessage('validation.mobile.invalid') })
    mobile: string;
} 