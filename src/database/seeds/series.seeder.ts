import { DataSource } from 'typeorm';
import { Series } from '../../series/entities/series.entity';
import { Season } from '../../series/entities/season.entity';
import { Episode } from '../../series/entities/episode.entity';
import { Genre } from '../../genre/entities/genre.entity';
import { Cast } from '../../cast/entities/cast.entity';
import { Person } from '../../person/entities/person.entity';

export class SeriesSeeder {
  constructor(private dataSource: DataSource) {}

  async run(): Promise<void> {
    const seriesRepository = this.dataSource.getRepository(Series);
    const seasonRepository = this.dataSource.getRepository(Season);
    const episodeRepository = this.dataSource.getRepository(Episode);
    const genreRepository = this.dataSource.getRepository(Genre);
    const castRepository = this.dataSource.getRepository(Cast);
    const personRepository = this.dataSource.getRepository(Person);

    const seriesData = [
      {
        title: 'خانواده بزرگ',
        description: 'داستان زندگی یک خانواده بزرگ در تهران که با مشکلات مختلفی روبرو می‌شوند.',
        firstAirDate: new Date('2022-09-15'),
        lastAirDate: new Date('2023-06-20'),
        voteAverage: 8.5,
        posterPath: '/images/series/big-family.jpg',
        backdropPath: '/images/series/big-family-backdrop.jpg',
        numberOfSeasons: 2,
        numberOfEpisodes: 24,
        status: 'Returning Series',
        originalLanguage: 'fa',
        voteCount: 2100,
        popularity: 9.2,
        genres: ['درام', 'خانوادگی'],
        cast: [
          { personName: 'علی رضایی', character: 'پدر خانواده' },
          { personName: 'فاطمه محمدی', character: 'مادر خانواده' },
          { personName: 'سارا احمدی', character: 'دختر بزرگ' }
        ],
        seasons: [
          {
            seasonNumber: 1,
            title: 'فصل اول',
            description: 'شروع داستان خانواده',
            airDate: new Date('2022-09-15'),
            posterPath: '/images/seasons/season1.jpg',
            episodeCount: 12,
            episodes: [
              { episodeNumber: 1, title: 'شروع جدید', description: 'اولین قسمت از فصل اول', airDate: new Date('2022-09-15'), voteAverage: 8.0, stillPath: '/images/episodes/ep1.jpg', runtime: 45 },
              { episodeNumber: 2, title: 'مشکل اول', description: 'دومین قسمت از فصل اول', airDate: new Date('2022-09-22'), voteAverage: 7.8, stillPath: '/images/episodes/ep2.jpg', runtime: 42 },
              { episodeNumber: 3, title: 'راه حل', description: 'سومین قسمت از فصل اول', airDate: new Date('2022-09-29'), voteAverage: 8.2, stillPath: '/images/episodes/ep3.jpg', runtime: 48 }
            ]
          },
          {
            seasonNumber: 2,
            title: 'فصل دوم',
            description: 'ادامه داستان خانواده',
            airDate: new Date('2023-03-15'),
            posterPath: '/images/seasons/season2.jpg',
            episodeCount: 12,
            episodes: [
              { episodeNumber: 1, title: 'بازگشت', description: 'اولین قسمت از فصل دوم', airDate: new Date('2023-03-15'), voteAverage: 8.5, stillPath: '/images/episodes/ep13.jpg', runtime: 46 },
              { episodeNumber: 2, title: 'تغییرات', description: 'دومین قسمت از فصل دوم', airDate: new Date('2023-03-22'), voteAverage: 8.1, stillPath: '/images/episodes/ep14.jpg', runtime: 44 },
              { episodeNumber: 3, title: 'نتیجه', description: 'سومین قسمت از فصل دوم', airDate: new Date('2023-03-29'), voteAverage: 8.3, stillPath: '/images/episodes/ep15.jpg', runtime: 47 }
            ]
          }
        ]
      },
      {
        title: 'پلیس تهران',
        description: 'داستان کارآگاهان پلیس تهران که با جرایم مختلف مبارزه می‌کنند.',
        firstAirDate: new Date('2023-01-10'),
        lastAirDate: new Date('2023-12-15'),
        voteAverage: 8.8,
        posterPath: '/images/series/tehran-police.jpg',
        backdropPath: '/images/series/tehran-police-backdrop.jpg',
        numberOfSeasons: 1,
        numberOfEpisodes: 16,
        status: 'Ended',
        originalLanguage: 'fa',
        voteCount: 1850,
        popularity: 8.9,
        genres: ['جنایی', 'تریلر'],
        cast: [
          { personName: 'حسین احمدی', character: 'کارآگاه اصلی' },
          { personName: 'مریم کریمی', character: 'کارآگاه زن' },
          { personName: 'رضا نوری', character: 'رئیس پلیس' }
        ],
        seasons: [
          {
            seasonNumber: 1,
            title: 'فصل اول',
            description: 'شروع ماجراجویی‌های پلیس تهران',
            airDate: new Date('2023-01-10'),
            posterPath: '/images/seasons/police-season1.jpg',
            episodeCount: 16,
            episodes: [
              { episodeNumber: 1, title: 'پرونده اول', description: 'اولین پرونده کارآگاهان', airDate: new Date('2023-01-10'), voteAverage: 8.5, stillPath: '/images/episodes/police-ep1.jpg', runtime: 50 },
              { episodeNumber: 2, title: 'سرنخ‌ها', description: 'جستجوی سرنخ‌ها', airDate: new Date('2023-01-17'), voteAverage: 8.2, stillPath: '/images/episodes/police-ep2.jpg', runtime: 48 },
              { episodeNumber: 3, title: 'دستگیری', description: 'دستگیری مجرم', airDate: new Date('2023-01-24'), voteAverage: 8.7, stillPath: '/images/episodes/police-ep3.jpg', runtime: 52 }
            ]
          }
        ]
      }
    ];

    for (const seriesInfo of seriesData) {
      const existingSeries = await seriesRepository.findOne({ where: { title: seriesInfo.title } });
      if (!existingSeries) {
        // Create series
        const series = seriesRepository.create({
          title: seriesInfo.title,
          description: seriesInfo.description,
          firstAirDate: seriesInfo.firstAirDate,
          lastAirDate: seriesInfo.lastAirDate,
          voteAverage: seriesInfo.voteAverage,
          posterPath: seriesInfo.posterPath,
          backdropPath: seriesInfo.backdropPath,
          numberOfSeasons: seriesInfo.numberOfSeasons,
          numberOfEpisodes: seriesInfo.numberOfEpisodes,
          status: seriesInfo.status,
          originalLanguage: seriesInfo.originalLanguage,
          voteCount: seriesInfo.voteCount,
          popularity: seriesInfo.popularity,
        });

        const savedSeries = await seriesRepository.save(series);

        // Add genres
        for (const genreName of seriesInfo.genres) {
          const genre = await genreRepository.findOne({ where: { name: genreName } });
          if (genre) {
            savedSeries.genres = savedSeries.genres || [];
            savedSeries.genres.push(genre);
          }
        }

        // Add cast
        for (const castData of seriesInfo.cast) {
          const person = await personRepository.findOne({ where: { name: castData.personName } });
          if (person) {
            const cast = castRepository.create({
              seriesId: savedSeries.id,
              personId: person.id,
              character: castData.character,
              order: seriesInfo.cast.indexOf(castData),
              type: 'cast'
            });
            await castRepository.save(cast);
          }
        }

        // Create seasons and episodes
        for (const seasonData of seriesInfo.seasons) {
          const season = seasonRepository.create({
            seriesId: savedSeries.id,
            seasonNumber: seasonData.seasonNumber,
            title: seasonData.title,
            description: seasonData.description,
            airDate: seasonData.airDate,
            posterPath: seasonData.posterPath,
            episodeCount: seasonData.episodeCount,
          });

          const savedSeason = await seasonRepository.save(season);

          // Create episodes
          for (const episodeData of seasonData.episodes) {
            const episode = episodeRepository.create({
              seasonId: savedSeason.id,
              episodeNumber: episodeData.episodeNumber,
              title: episodeData.title,
              description: episodeData.description,
              airDate: episodeData.airDate,
              voteAverage: episodeData.voteAverage,
              stillPath: episodeData.stillPath,
              runtime: episodeData.runtime,
            });

            await episodeRepository.save(episode);
          }
        }

        await seriesRepository.save(savedSeries);
      }
    }
  }
} 