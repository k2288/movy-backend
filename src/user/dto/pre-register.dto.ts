import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, Length, Matches, IsMobilePhone, IsDateString } from 'class-validator';
import { i18nValidationMessage } from 'nestjs-i18n';

export class PreRegisterDto {
    @ApiProperty()
    @IsString({ message: i18nValidationMessage('validation.string.notEmpty') })
    @IsNotEmpty({ message: i18nValidationMessage('validation.string.notEmpty') })
    @Length(3, 100, { message: i18nValidationMessage('validation.string.length') })
    firstName: string;

    @ApiProperty()
    @IsString({ message: i18nValidationMessage('validation.string.notEmpty') })
    @IsNotEmpty({ message: i18nValidationMessage('validation.string.notEmpty') })
    @Length(3, 100, { message: i18nValidationMessage('validation.string.length') })
    lastName: string;

    @ApiProperty()
    @IsString({ message: i18nValidationMessage('validation.string.notEmpty') })
    @IsNotEmpty({ message: i18nValidationMessage('validation.string.notEmpty') })
    @Length(8, 100, { message: i18nValidationMessage('validation.string.length') })
    @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
        message: i18nValidationMessage('validation.password.weak'),
    })
    password: string;

    @ApiProperty()
    @IsString({ message: i18nValidationMessage('validation.string.notEmpty') })
    @IsNotEmpty({ message: i18nValidationMessage('validation.string.notEmpty') })
    @IsMobilePhone("fa-IR", {}, { message: i18nValidationMessage('validation.mobile.invalid') })
    mobile: string;

    @ApiProperty()
    @IsString({ message: i18nValidationMessage('validation.string.notEmpty') })
    @IsNotEmpty({ message: i18nValidationMessage('validation.string.notEmpty') })
    @Length(10, 10, { message: i18nValidationMessage('validation.nationalCode.invalid') })
    nationalCode: string;

    @ApiProperty()
    @IsString({ message: i18nValidationMessage('validation.string.notEmpty') })
    @IsNotEmpty({ message: i18nValidationMessage('validation.string.notEmpty') })
    @Matches(/^\d{4}\/\d{2}\/\d{2}$/, { message: i18nValidationMessage('validation.date.format') })
    birthDate: string;
} 