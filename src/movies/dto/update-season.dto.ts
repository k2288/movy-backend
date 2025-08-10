import { ApiProperty, PartialType } from '@nestjs/swagger';
import { CreateSeasonDto } from './create-season.dto';

export class UpdateSeasonDto extends PartialType(CreateSeasonDto) {
  @ApiProperty({ description: 'شناسه یکتای فصل', example: 1 })
  id?: number;
} 