import { ApiProperty, PartialType } from '@nestjs/swagger';
import { CreateEpisodeDto } from './create-episode.dto';

export class UpdateEpisodeDto extends PartialType(CreateEpisodeDto) {
  @ApiProperty({ description: 'شناسه یکتای قسمت', example: 1 })
  id?: number;
} 