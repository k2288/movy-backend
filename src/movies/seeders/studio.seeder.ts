import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Studio } from '../entities/studio.entity';

@Injectable()
export class StudioSeeder {
  constructor(
    @InjectRepository(Studio)
    private readonly studioRepository: Repository<Studio>,
  ) {}

  async seed(): Promise<void> {
    const studios = [
      { name: 'وارنر برادرز' },
      { name: 'پارامونت پیکچرز' },
      { name: 'والت دیزنی' },
      { name: 'سونی پیکچرز' },
      { name: 'یونیورسال استودیوز' },
      { name: 'فاکس قرن بیستم' },
      { name: 'لاینزگیت' },
      { name: 'مترو گلدوین مایر' },
      { name: 'دیمنشن فیلمز' },
      { name: 'فوکوس فیچرز' },
      { name: 'آیافسی فیلمز' },
      { name: 'میرامکس' },
      { name: 'نیو لاین سینما' },
      { name: 'دريم‌ورکس' },
      { name: 'پیکسار' },
      { name: 'مارول استودیوز' },
      { name: 'لوکاسفیلم' },
      { name: 'بلومهاوس پروداکشنز' },
      { name: 'آرک لایت انترتینمنت' },
      { name: 'سامیت انترتینمنت' },
    ];

    for (const studioData of studios) {
      const existingStudio = await this.studioRepository.findOne({
        where: { name: studioData.name },
      });

      if (!existingStudio) {
        const studio = this.studioRepository.create(studioData);
        await this.studioRepository.save(studio);
      }
    }
  }
} 