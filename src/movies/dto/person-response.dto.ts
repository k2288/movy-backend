import { ApiProperty } from '@nestjs/swagger';
import { PersonImageUriResponseDto } from './person-image-uri-response.dto';

export class PersonResponseDto {
  @ApiProperty({ description: 'شناسه یکتای شخص', example: 1 })
  id: number;

  @ApiProperty({ description: 'نام شخص', example: 'Anne Hathaway' })
  name: string;

  @ApiProperty({ description: 'تصاویر شخص', type: [PersonImageUriResponseDto] })
  imageUris: PersonImageUriResponseDto[];

  @ApiProperty({ description: 'تاریخ ایجاد' })
  createdAt: Date;

  @ApiProperty({ description: 'تاریخ بروزرسانی' })
  updatedAt: Date;
} 