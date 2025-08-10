import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Movie } from '../entities/movie.entity';
import { Genre } from '../entities/genre.entity';
import { Studio } from '../entities/studio.entity';

@Injectable()
export class MovieSeeder {
  constructor(
    @InjectRepository(Movie)
    private readonly movieRepository: Repository<Movie>,
    @InjectRepository(Genre)
    private readonly genreRepository: Repository<Genre>,
    @InjectRepository(Studio)
    private readonly studioRepository: Repository<Studio>,
  ) {}

  async seed(): Promise<void> {
    // First, seed genres and studios if they don't exist
    const genres = await this.seedGenres();
    const studios = await this.seedStudios();

    const movies = [
      {
        title: 'بین ستاره‌ای',
        year: 2014,
        tagline: 'بشر روی زمین متولد شد. قرار نبود اینجا بمیرد.',
        synopsis: 'ماجراجویی گروهی از کاوشگران که از یک کرم‌چاله تازه کشف شده استفاده می‌کنند تا محدودیت‌های سفر فضایی انسان را پشت سر بگذارند و مسافت‌های عظیم در سفر بین ستاره‌ای را فتح کنند.',
        runtime: 169,
        ageRating: 'PG-13',
        adult: false,
        genreNames: ['علمی-تخیلی', 'ماجراجویی', 'درام'],
        studioNames: ['وارنر برادرز', 'پارامونت پیکچرز'],
      },
      {
        title: 'شاهزاده ایران',
        year: 2010,
        tagline: 'داستان یک شاهزاده که باید هویت خود را کشف کند.',
        synopsis: 'داستان شاهزاده‌ای که در کودکی ربوده شده و حالا باید هویت واقعی خود را کشف کند و سرزمین خود را از شر اهریمن نجات دهد.',
        runtime: 95,
        ageRating: 'G',
        adult: false,
        genreNames: ['انیمیشن', 'ماجراجویی', 'خانوادگی'],
        studioNames: ['والت دیزنی'],
      },
      {
        title: 'آواتار',
        year: 2009,
        tagline: 'دنیای جدیدی را کشف کنید.',
        synopsis: 'در آینده‌ای دور، سرباز سابق نیروی دریایی به سیاره پاندورا سفر می‌کند و درگیر ماجراجویی‌ای می‌شود که سرنوشت جهان را تغییر می‌دهد.',
        runtime: 162,
        ageRating: 'PG-13',
        adult: false,
        genreNames: ['علمی-تخیلی', 'ماجراجویی', 'فانتزی'],
        studioNames: ['فاکس قرن بیستم'],
      },
      {
        title: 'تایتانیک',
        year: 1997,
        tagline: 'هیچ‌چیز نمی‌تواند آنها را از هم جدا کند.',
        synopsis: 'داستان عاشقانه‌ای بین جک و رز که در کشتی تایتانیک اتفاق می‌افتد و با غرق شدن کشتی به پایان می‌رسد.',
        runtime: 194,
        ageRating: 'PG-13',
        adult: false,
        genreNames: ['عاشقانه', 'درام', 'تاریخی'],
        studioNames: ['پارامونت پیکچرز', 'فاکس قرن بیستم'],
      },
      {
        title: 'ارباب حلقه‌ها: یاران حلقه',
        year: 2001,
        tagline: 'یک حلقه برای حکمرانی بر همه.',
        synopsis: 'هوبیت جوانی به نام فرودو باید حلقه قدرتمندی را به کوه نابودی ببرد تا جهان را از شر اهریمن سائورون نجات دهد.',
        runtime: 178,
        ageRating: 'PG-13',
        adult: false,
        genreNames: ['فانتزی', 'ماجراجویی', 'درام'],
        studioNames: ['نیو لاین سینما'],
      },
      {
        title: 'پلنگ سیاه',
        year: 2018,
        tagline: 'پادشاه جدید وکانداست.',
        synopsis: 'پس از مرگ پدرش، تی‌چالا به وکانداست برمی‌گردد تا تاج و تخت خود را پس بگیرد و با تهدیدات جدید روبرو شود.',
        runtime: 134,
        ageRating: 'PG-13',
        adult: false,
        genreNames: ['اکشن', 'ماجراجویی', 'علمی-تخیلی'],
        studioNames: ['مارول استودیوز'],
      },
      {
        title: 'جوکر',
        year: 2019,
        tagline: 'پشت هر لبخند، داستانی وجود دارد.',
        synopsis: 'داستان آرتور فلک، کمدین ناموفقی که به تدریج به شخصیت شرور جوکر تبدیل می‌شود.',
        runtime: 122,
        ageRating: 'R',
        adult: true,
        genreNames: ['درام', 'جنایی', 'هیجان‌انگیز'],
        studioNames: ['وارنر برادرز'],
      },
      {
        title: 'پاراسایت',
        year: 2019,
        tagline: 'خانواده‌ای که همه چیز را دارند.',
        synopsis: 'خانواده کیم فقیر که به تدریج وارد زندگی خانواده پارک ثروتمند می‌شوند و رازهای تاریکی را کشف می‌کنند.',
        runtime: 132,
        ageRating: 'R',
        adult: true,
        genreNames: ['درام', 'هیجان‌انگیز', 'کمدی'],
        studioNames: ['سامیت انترتینمنت'],
      },
      {
        title: 'اسپایدرمن: به خانه راهی نیست',
        year: 2021,
        tagline: 'هیچ راهی برای بازگشت وجود ندارد.',
        synopsis: 'پیتر پارکر با کمک دکتر استرنج هویت خود را از جهان پاک می‌کند، اما این کار عواقب غیرمنتظره‌ای دارد.',
        runtime: 148,
        ageRating: 'PG-13',
        adult: false,
        genreNames: ['اکشن', 'ماجراجویی', 'علمی-تخیلی'],
        studioNames: ['سونی پیکچرز', 'مارول استودیوز'],
      },
      {
        title: 'داستان اسباب‌بازی 4',
        year: 2019,
        tagline: 'ماجراجویی جدیدی آغاز می‌شود.',
        synopsis: 'وودی و دوستانش در ماجراجویی جدیدی شرکت می‌کنند که سرنوشت آنها را برای همیشه تغییر می‌دهد.',
        runtime: 100,
        ageRating: 'G',
        adult: false,
        genreNames: ['انیمیشن', 'کمدی', 'خانوادگی'],
        studioNames: ['پیکسار', 'والت دیزنی'],
      },
      {
        title: 'فیلم لئون',
        year: 1994,
        tagline: 'اگر شما را دوست داشته باشد، هیچ‌چیز را از شما نمی‌گیرد.',
        synopsis: 'قاتل حرفه‌ای‌ای به نام لئون با دختر کوچکی دوست می‌شود و باید از او در برابر پلیس فاسد محافظت کند.',
        runtime: 110,
        ageRating: 'R',
        adult: true,
        genreNames: ['اکشن', 'درام', 'جنایی'],
        studioNames: ['گومون'],
      },
      {
        title: 'پالپ فیکشن',
        year: 1994,
        tagline: 'داستان‌هایی از زندگی واقعی.',
        synopsis: 'چندین داستان به هم پیوسته که در لس آنجلس اتفاق می‌افتد و شامل جنایت، عشق و انتقام می‌شود.',
        runtime: 154,
        ageRating: 'R',
        adult: true,
        genreNames: ['جنایی', 'درام', 'هیجان‌انگیز'],
        studioNames: ['میرامکس'],
      },
      {
        title: 'شوالیه تاریکی',
        year: 2008,
        tagline: 'چرا اینقدر جدی؟',
        synopsis: 'باتمن باید با جوکر، شرور جدید گاتهام سیتی روبرو شود که قصد دارد شهر را به آشوب بکشد.',
        runtime: 152,
        ageRating: 'PG-13',
        adult: false,
        genreNames: ['اکشن', 'درام', 'هیجان‌انگیز'],
        studioNames: ['وارنر برادرز'],
      },
      {
        title: 'اینسپشن',
        year: 2010,
        tagline: 'ایده شما چیست؟',
        synopsis: 'دزد حرفه‌ای‌ای که در سرقت اطلاعات از ذهن افراد تخصص دارد، مأموریت خطرناکی را می‌پذیرد.',
        runtime: 148,
        ageRating: 'PG-13',
        adult: false,
        genreNames: ['علمی-تخیلی', 'هیجان‌انگیز', 'اکشن'],
        studioNames: ['وارنر برادرز'],
      },
      {
        title: 'فورست گامپ',
        year: 1994,
        tagline: 'زندگی مانند جعبه شکلات است.',
        synopsis: 'داستان زندگی فورست گامپ، مردی با ضریب هوشی پایین که در رویدادهای مهم تاریخی آمریکا شرکت می‌کند.',
        runtime: 142,
        ageRating: 'PG-13',
        adult: false,
        genreNames: ['درام', 'کمدی', 'تاریخی'],
        studioNames: ['پارامونت پیکچرز'],
      },
    ];

    for (const movieData of movies) {
      const existingMovie = await this.movieRepository.findOne({
        where: { title: movieData.title },
      });

      if (!existingMovie) {
        const movie = this.movieRepository.create({
          title: movieData.title,
          year: movieData.year,
          tagline: movieData.tagline,
          synopsis: movieData.synopsis,
          runtime: movieData.runtime,
          ageRating: movieData.ageRating,
          adult: movieData.adult,
        });

        // Add genres to the movie
        if (movieData.genreNames) {
          const movieGenres = genres.filter(genre => 
            movieData.genreNames.includes(genre.name)
          );
          movie.genres = movieGenres;
        }

        // Add studios to the movie
        if (movieData.studioNames) {
          const movieStudios = studios.filter(studio => 
            movieData.studioNames.includes(studio.name)
          );
          movie.studios = movieStudios;
        }

        await this.movieRepository.save(movie);
      }
    }
  }

  private async seedGenres(): Promise<Genre[]> {
    const genreNames = [
      'اکشن', 'ماجراجویی', 'کمدی', 'درام', 'ترسناک', 'عاشقانه', 
      'علمی-تخیلی', 'فانتزی', 'تاریخی', 'جنایی', 'هیجان‌انگیز', 
      'جنگی', 'موزیکال', 'رازآلود', 'انیمیشن', 'مستند', 
      'خانوادگی', 'وسترن', 'ورزشی', 'بیوگرافی'
    ];

    const genres: Genre[] = [];
    
    for (const name of genreNames) {
      let genre = await this.genreRepository.findOne({ where: { name } });
      
      if (!genre) {
        genre = this.genreRepository.create({ name });
        genre = await this.genreRepository.save(genre);
      }
      
      genres.push(genre);
    }

    return genres;
  }

  private async seedStudios(): Promise<Studio[]> {
    const studioNames = [
      'وارنر برادرز', 'پارامونت پیکچرز', 'والت دیزنی', 'سونی پیکچرز',
      'یونیورسال استودیوز', 'فاکس قرن بیستم', 'لاینزگیت', 'مترو گلدوین مایر',
      'دیمنشن فیلمز', 'فوکوس فیچرز', 'آیافسی فیلمز', 'میرامکس',
      'نیو لاین سینما', 'دريم‌ورکس', 'پیکسار', 'مارول استودیوز',
      'لوکاسفیلم', 'بلومهاوس پروداکشنز', 'آرک لایت انترتینمنت', 'سامیت انترتینمنت'
    ];

    const studios: Studio[] = [];
    
    for (const name of studioNames) {
      let studio = await this.studioRepository.findOne({ where: { name } });
      
      if (!studio) {
        studio = this.studioRepository.create({ name });
        studio = await this.studioRepository.save(studio);
      }
      
      studios.push(studio);
    }

    return studios;
  }
} 