import { DataSource } from 'typeorm';
import { Movie } from '../../movie/entities/movie.entity';
import { Genre } from '../../genre/entities/genre.entity';
import { Cast } from '../../cast/entities/cast.entity';
import { Person } from '../../person/entities/person.entity';

export class MovieSeeder {
  constructor(private dataSource: DataSource) {}

  async run(): Promise<void> {
    const movieRepository = this.dataSource.getRepository(Movie);
    const genreRepository = this.dataSource.getRepository(Genre);
    const castRepository = this.dataSource.getRepository(Cast);
    const personRepository = this.dataSource.getRepository(Person);

    const movies = [
      {
        title: 'شب‌های تهران',
        description: 'داستان زندگی چند جوان در تهران که با مشکلات مختلفی روبرو می‌شوند.',
        releaseDate: new Date('2023-06-15'),
        voteAverage: 8.2,
        posterPath: '/images/movies/tehran-nights.jpg',
        backdropPath: '/images/movies/tehran-nights-backdrop.jpg',
        runtime: 120,
        status: 'Released',
        originalLanguage: 'fa',
        budget: 5000000000,
        revenue: 15000000000,
        voteCount: 1250,
        genres: ['درام', 'عاشقانه'],
        cast: [
          { personName: 'علی رضایی', character: 'امیر' },
          { personName: 'فاطمه محمدی', character: 'سارا' },
          { personName: 'حسین احمدی', character: 'پدر امیر' }
        ]
      },
      {
        title: 'ماجراجویی در کویر',
        description: 'سفر هیجان‌انگیز یک گروه به دل کویر ایران.',
        releaseDate: new Date('2023-08-20'),
        voteAverage: 7.8,
        posterPath: '/images/movies/desert-adventure.jpg',
        backdropPath: '/images/movies/desert-adventure-backdrop.jpg',
        runtime: 95,
        status: 'Released',
        originalLanguage: 'fa',
        budget: 3000000000,
        revenue: 8000000000,
        voteCount: 890,
        genres: ['ماجراجویی', 'اکشن'],
        cast: [
          { personName: 'رضا نوری', character: 'احمد' },
          { personName: 'مریم کریمی', character: 'لیلا' },
          { personName: 'امیر حسینی', character: 'راهنما' }
        ]
      },
      {
        title: 'کمدی خانوادگی',
        description: 'داستان طنز یک خانواده که با مشکلات روزمره دست و پنجه نرم می‌کنند.',
        releaseDate: new Date('2023-04-10'),
        voteAverage: 7.5,
        posterPath: '/images/movies/family-comedy.jpg',
        backdropPath: '/images/movies/family-comedy-backdrop.jpg',
        runtime: 105,
        status: 'Released',
        originalLanguage: 'fa',
        budget: 2000000000,
        revenue: 6000000000,
        voteCount: 720,
        genres: ['کمدی', 'خانوادگی'],
        cast: [
          { personName: 'سارا احمدی', character: 'مادر' },
          { personName: 'محمد رضایی', character: 'پدر' },
          { personName: 'الهام رضوی', character: 'دختر' }
        ]
      },
      {
        title: 'راز قدیمی',
        description: 'یک معمای تاریخی که در موزه‌های ایران رخ می‌دهد.',
        releaseDate: new Date('2023-10-05'),
        voteAverage: 8.5,
        posterPath: '/images/movies/ancient-mystery.jpg',
        backdropPath: '/images/movies/ancient-mystery-backdrop.jpg',
        runtime: 130,
        status: 'Released',
        originalLanguage: 'fa',
        budget: 4000000000,
        revenue: 12000000000,
        voteCount: 1560,
        genres: ['رازآلود', 'تریلر'],
        cast: [
          { personName: 'نازنین فرهادی', character: 'دکتر احمدی' },
          { personName: 'علی رضایی', character: 'کارآگاه' },
          { personName: 'حسین احمدی', character: 'استاد دانشگاه' }
        ]
      },
      {
        title: 'عشق در اصفهان',
        description: 'داستان عاشقانه دو جوان در شهر زیبای اصفهان.',
        releaseDate: new Date('2023-02-14'),
        voteAverage: 8.0,
        posterPath: '/images/movies/isfahan-love.jpg',
        backdropPath: '/images/movies/isfahan-love-backdrop.jpg',
        runtime: 110,
        status: 'Released',
        originalLanguage: 'fa',
        budget: 2500000000,
        revenue: 9000000000,
        voteCount: 980,
        genres: ['عاشقانه', 'درام'],
        cast: [
          { personName: 'فاطمه محمدی', character: 'فاطمه' },
          { personName: 'رضا نوری', character: 'علی' },
          { personName: 'مریم کریمی', character: 'مادر فاطمه' }
        ]
      }
    ];

    for (const movieData of movies) {
      const existingMovie = await movieRepository.findOne({ where: { title: movieData.title } });
      if (!existingMovie) {
        // Create movie
        const movie = movieRepository.create({
          title: movieData.title,
          description: movieData.description,
          releaseDate: movieData.releaseDate,
          voteAverage: movieData.voteAverage,
          posterPath: movieData.posterPath,
          backdropPath: movieData.backdropPath,
          runtime: movieData.runtime,
          status: movieData.status,
          originalLanguage: movieData.originalLanguage,
          budget: movieData.budget,
          revenue: movieData.revenue,
          voteCount: movieData.voteCount,
        });

        const savedMovie = await movieRepository.save(movie);

        // Add genres
        for (const genreName of movieData.genres) {
          const genre = await genreRepository.findOne({ where: { name: genreName } });
          if (genre) {
            savedMovie.genres = savedMovie.genres || [];
            savedMovie.genres.push(genre);
          }
        }

        // Add cast
        for (const castData of movieData.cast) {
          const person = await personRepository.findOne({ where: { name: castData.personName } });
          if (person) {
            const cast = castRepository.create({
              movieId: savedMovie.id,
              personId: person.id,
              character: castData.character,
              order: movieData.cast.indexOf(castData),
              type: 'cast'
            });
            await castRepository.save(cast);
          }
        }

        await movieRepository.save(savedMovie);
      }
    }
  }
} 