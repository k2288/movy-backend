import { ApiProperty } from '@nestjs/swagger';
import { GenreResponseDto } from './genre-response.dto';
import { StudioResponseDto } from './studio-response.dto';
import { ImageUriResponseDto } from './image-uri-response.dto';
import { CastResponseDto } from './cast-response.dto';
import { MovieType } from '../entities/movie.entity';
import { NetworkResponseDto } from './network-response.dto';

export class MovieResponseDto {
  @ApiProperty({ description: 'شناسه یکتای فیلم', example: 1 })
  id: number;

  @ApiProperty({ description: 'عنوان فیلم', example: 'بین ستاره‌ای' })
  title: string;

  @ApiProperty({ description: 'سال انتشار', example: 2014 })
  year: number;

  @ApiProperty({ description: 'شعار فیلم', example: 'بشر روی زمین متولد شد. قرار نبود اینجا بمیرد.' })
  tagline: string;

  @ApiProperty({ description: 'خلاصه داستان', example: 'ماجراجویی گروهی از کاوشگران که از یک کرم‌چاله تازه کشف شده استفاده می‌کنند تا محدودیت‌های سفر فضایی انسان را پشت سر بگذارند و مسافت‌های عظیم در سفر بین ستاره‌ای را فتح کنند.' })
  synopsis: string;

  @ApiProperty({ description: 'مدت زمان فیلم (دقیقه)', example: 169 })
  runtime: number;

  @ApiProperty({ description: 'رده سنی', example: 'PG-13' })
  ageRating: string;

  @ApiProperty({ description: 'آیا فیلم برای بزرگسالان است', example: false })
  adult: boolean;

  @ApiProperty({ description: 'نوع عنوان', enum: MovieType })
  type: MovieType;

  @ApiProperty({ description: 'آیا سریال به پایان رسیده است', required: false })
  hasEnded?: boolean;

  @ApiProperty({ description: 'تاریخ آخرین پخش', required: false })
  lastAired?: Date;

  @ApiProperty({ description: 'ژانرهای فیلم', type: [GenreResponseDto] })
  genres: GenreResponseDto[];

  @ApiProperty({ description: 'استودیوهای فیلم', type: [StudioResponseDto] })
  studios: StudioResponseDto[];

  @ApiProperty({ description: 'شبکه‌های پخش', type: [NetworkResponseDto] })
  networks: NetworkResponseDto[];

  @ApiProperty({ description: 'تصاویر فیلم', type: [ImageUriResponseDto] })
  imageUris: ImageUriResponseDto[];

  @ApiProperty({ description: 'بازیگران و عوامل فیلم', type: [CastResponseDto] })
  casts: CastResponseDto[];

} 