import { ApiProperty, PartialType } from '@nestjs/swagger';
import { CreateImageUriDto } from './create-image-uri.dto';

export class UpdateImageUriDto extends PartialType(CreateImageUriDto) {
  @ApiProperty({ description: 'شناسه یکتای تصویر', example: 1 })
  id?: number;
} 