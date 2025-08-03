import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsOptional, IsEnum } from 'class-validator';

export enum SearchType {
  MOVIE = 'movie',
  SERIES = 'series',
  PERSON = 'person'
}

export class SearchQueryDto {
  @ApiProperty({ description: 'کلمه کلیدی جستجو', required: true })
  @IsString()
  q: string;

  @ApiProperty({ description: 'نوع جستجو', required: false, enum: SearchType })
  @IsOptional()
  @IsEnum(SearchType)
  type?: SearchType;
}

export class SearchResultDto {
  @ApiProperty({ description: 'نوع نتیجه' })
  type: SearchType;

  @ApiProperty({ description: 'نتایج' })
  results: any[];
} 