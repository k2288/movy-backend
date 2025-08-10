import { ApiProperty, PartialType } from '@nestjs/swagger';
import { CreateCastDto } from './create-cast.dto';

export class UpdateCastDto extends PartialType(CreateCastDto) {
  @ApiProperty({ description: 'شناسه یکتای بازیگر', example: 1 })
  id?: number;
} 