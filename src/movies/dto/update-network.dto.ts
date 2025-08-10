import { ApiProperty, PartialType } from '@nestjs/swagger';
import { CreateNetworkDto } from './create-network.dto';

export class UpdateNetworkDto extends PartialType(CreateNetworkDto) {
  @ApiProperty({ description: 'شناسه یکتای شبکه', example: 1 })
  id?: number;
} 