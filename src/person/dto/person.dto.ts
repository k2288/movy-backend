import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsOptional, IsNumber } from 'class-validator';
import { Type } from 'class-transformer';

export class PersonDto {
  @ApiProperty({ description: 'شناسه شخص' })
  id: number;

  @ApiProperty({ description: 'نام' })
  name: string;

  @ApiProperty({ description: 'مسیر تصویر پروفایل' })
  profilePath: string;

  @ApiProperty({ description: 'مشهوریت' })
  popularity: number;
}

export class PersonDetailDto extends PersonDto {
  @ApiProperty({ description: 'نام مستعار' })
  alsoKnownAs: string;

  @ApiProperty({ description: 'تاریخ تولد' })
  birthday: Date;

  @ApiProperty({ description: 'محل تولد' })
  placeOfBirth: string;

  @ApiProperty({ description: 'بیوگرافی' })
  biography: string;

  @ApiProperty({ description: 'جنسیت' })
  gender: number;

  @ApiProperty({ description: 'وضعیت' })
  status: string;

  @ApiProperty({ description: 'تاریخ ایجاد' })
  createdAt: Date;

  @ApiProperty({ description: 'تاریخ بروزرسانی' })
  updatedAt: Date;
}

export class PersonQueryDto {
  @ApiProperty({ description: 'جستجو در نام', required: false })
  @IsOptional()
  @IsString()
  search?: string;

  @ApiProperty({ description: 'مرتب‌سازی', required: false, enum: ['popularity', 'name'] })
  @IsOptional()
  @IsString()
  sortBy?: string = 'popularity';

  @ApiProperty({ description: 'ترتیب', required: false, enum: ['asc', 'desc'] })
  @IsOptional()
  @IsString()
  sortOrder?: string = 'desc';
} 