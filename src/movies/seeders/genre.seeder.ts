import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Genre } from '../entities/genre.entity';

@Injectable()
export class GenreSeeder {
  constructor(
    @InjectRepository(Genre)
    private readonly genreRepository: Repository<Genre>,
  ) {}

  async seed(): Promise<void> {
    const genres = [
      { name: 'اکشن' },
      { name: 'ماجراجویی' },
      { name: 'کمدی' },
      { name: 'درام' },
      { name: 'ترسناک' },
      { name: 'عاشقانه' },
      { name: 'علمی-تخیلی' },
      { name: 'فانتزی' },
      { name: 'تاریخی' },
      { name: 'جنایی' },
      { name: 'هیجان‌انگیز' },
      { name: 'جنگی' },
      { name: 'موزیکال' },
      { name: 'رازآلود' },
      { name: 'انیمیشن' },
      { name: 'مستند' },
      { name: 'خانوادگی' },
      { name: 'وسترن' },
      { name: 'ورزشی' },
      { name: 'بیوگرافی' },
    ];

    for (const genreData of genres) {
      const existingGenre = await this.genreRepository.findOne({
        where: { name: genreData.name },
      });

      if (!existingGenre) {
        const genre = this.genreRepository.create(genreData);
        await this.genreRepository.save(genre);
      }
    }
  }
} 