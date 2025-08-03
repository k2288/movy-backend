import { DataSource } from 'typeorm';
import { Genre } from '../../genre/entities/genre.entity';

export class GenreSeeder {
  constructor(private dataSource: DataSource) {}

  async run(): Promise<void> {
    const genreRepository = this.dataSource.getRepository(Genre);

    const genres = [
      { name: 'اکشن', description: 'فیلم‌های پر از صحنه‌های اکشن و هیجان‌انگیز' },
      { name: 'ماجراجویی', description: 'فیلم‌های ماجراجویی و سفر' },
      { name: 'انیمیشن', description: 'فیلم‌های انیمیشن و کارتون' },
      { name: 'کمدی', description: 'فیلم‌های طنز و خنده‌دار' },
      { name: 'جنایی', description: 'فیلم‌های جنایی و پلیسی' },
      { name: 'مستند', description: 'فیلم‌های مستند و واقعی' },
      { name: 'درام', description: 'فیلم‌های درام و احساسی' },
      { name: 'خانوادگی', description: 'فیلم‌های مناسب خانواده' },
      { name: 'فانتزی', description: 'فیلم‌های فانتزی و تخیلی' },
      { name: 'تاریخی', description: 'فیلم‌های تاریخی و قدیمی' },
      { name: 'ترسناک', description: 'فیلم‌های ترسناک و وحشت' },
      { name: 'موسیقی', description: 'فیلم‌های موسیقی و آواز' },
      { name: 'رازآلود', description: 'فیلم‌های رازآلود و معمایی' },
      { name: 'عاشقانه', description: 'فیلم‌های عاشقانه و رمانتیک' },
      { name: 'علمی تخیلی', description: 'فیلم‌های علمی تخیلی' },
      { name: 'تریلر', description: 'فیلم‌های تریلر و هیجان‌انگیز' },
      { name: 'جنگی', description: 'فیلم‌های جنگی و نظامی' },
      { name: 'وسترن', description: 'فیلم‌های وسترن و کابویی' },
    ];

    for (const genreData of genres) {
      const existingGenre = await genreRepository.findOne({ where: { name: genreData.name } });
      if (!existingGenre) {
        const genre = genreRepository.create(genreData);
        await genreRepository.save(genre);
      }
    }
  }
} 