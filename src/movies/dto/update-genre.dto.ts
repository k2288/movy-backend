import { ApiProperty, PartialType } from '@nestjs/swagger';
import { CreateGenreDto } from './create-genre.dto';

export class UpdateGenreDto extends PartialType(CreateGenreDto) {
  @ApiProperty({ description: 'شناسه یکتای ژانر', example: 1 })
  id?: number;
} 