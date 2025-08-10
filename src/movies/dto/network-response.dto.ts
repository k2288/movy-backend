import { ApiProperty } from '@nestjs/swagger';
import { NetworkImageUriResponseDto } from './network-image-uri-response.dto';

export class NetworkResponseDto {
  @ApiProperty({ description: 'شناسه یکتای شبکه', example: 1 })
  id: number;

  @ApiProperty({ description: 'نام شبکه', example: 'HBO' })
  name: string;

  @ApiProperty({ description: 'تصاویر شبکه', type: [NetworkImageUriResponseDto] })
  imageUris: { [key: string]: string } [];

} 