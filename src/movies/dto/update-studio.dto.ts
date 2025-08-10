import { ApiProperty, PartialType } from '@nestjs/swagger';
import { CreateStudioDto } from './create-studio.dto';

export class UpdateStudioDto extends PartialType(CreateStudioDto) {
  @ApiProperty({ description: 'شناسه یکتای استودیو', example: 1 })
  id?: number;
} 