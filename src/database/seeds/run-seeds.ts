import { DataSource } from 'typeorm';
import { GenreSeeder } from './genre.seeder';
import { PersonSeeder } from './person.seeder';
import { MovieSeeder } from './movie.seeder';
import { SeriesSeeder } from './series.seeder';

export class DatabaseSeeder {
  constructor(private dataSource: DataSource) {}

  async run(): Promise<void> {
    console.log('🌱 Starting database seeding...');

    try {
      // Run seeders in order
      const genreSeeder = new GenreSeeder(this.dataSource);
      await genreSeeder.run();
      console.log('✅ Genres seeded successfully');

      const personSeeder = new PersonSeeder(this.dataSource);
      await personSeeder.run();
      console.log('✅ People seeded successfully');

      const movieSeeder = new MovieSeeder(this.dataSource);
      await movieSeeder.run();
      console.log('✅ Movies seeded successfully');

      const seriesSeeder = new SeriesSeeder(this.dataSource);
      await seriesSeeder.run();
      console.log('✅ Series seeded successfully');

      console.log('🎉 All seeders completed successfully!');
    } catch (error) {
      console.error('❌ Error during seeding:', error);
      throw error;
    }
  }
} 