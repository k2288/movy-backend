import { DataSource } from 'typeorm';
import { DatabaseSeeder } from './seeds/run-seeds';
import { Movie } from '../movie/entities/movie.entity';
import { Series } from '../series/entities/series.entity';
import { Season } from '../series/entities/season.entity';
import { Episode } from '../series/entities/episode.entity';
import { Genre } from '../genre/entities/genre.entity';
import { Cast } from '../cast/entities/cast.entity';
import { Person } from '../person/entities/person.entity';

async function seed() {
  const dataSource = new DataSource({
    type: 'mysql',
    host: process.env.DB_HOST || 'localhost',
    port: parseInt(process.env.DB_PORT || '3306'),
    username: process.env.DB_USERNAME || 'root',
    password: process.env.DB_PASSWORD || '',
    database: process.env.DB_DATABASE || 'movy_db',
    entities: [Movie, Series, Season, Episode, Genre, Cast, Person],
    synchronize: true,
    logging: false,
  });

  try {
    await dataSource.initialize();
    console.log('📦 Database connected successfully');

    const seeder = new DatabaseSeeder(dataSource);
    await seeder.run();

    await dataSource.destroy();
    console.log('🔌 Database connection closed');
  } catch (error) {
    console.error('❌ Seeding failed:', error);
    process.exit(1);
  }
}

seed(); 