import { ApiProperty } from '@nestjs/swagger';
import { PersonResponseDto } from './person-response.dto';

export class CastResponseDto {
  @ApiProperty({ description: 'شناسه یکتای بازیگر', example: 1 })
  id: number;

  @ApiProperty({ description: 'نقش در فیلم', example: 'کارگردان' })
  role: string;

  @ApiProperty({ description: 'نام بازیگر', example: 'Anne Hathaway' })
  name: string;

  @ApiProperty({ description: 'تصاویر بازیگر', example: [{ 'backdrop': 'https://example.com/image.jpg' }] })
  imageUris: { [key: string]: string };

} 