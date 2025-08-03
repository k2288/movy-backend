import { Entity, PrimaryGeneratedColumn, Column, ManyToMany, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { Movie } from '../../movie/entities/movie.entity';
import { Series } from '../../series/entities/series.entity';
import { ApiProperty } from '@nestjs/swagger';

@Entity('genres')
export class Genre {
  @ApiProperty({ description: 'شناسه یکتای ژانر' })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({ description: 'نام ژانر' })
  @Column({ type: 'varchar', length: 100, unique: true })
  name: string;

  @ApiProperty({ description: 'توضیحات ژانر' })
  @Column({ type: 'text', nullable: true })
  description: string;

  @ApiProperty({ description: 'تاریخ ایجاد' })
  @CreateDateColumn()
  createdAt: Date;

  @ApiProperty({ description: 'تاریخ بروزرسانی' })
  @UpdateDateColumn()
  updatedAt: Date;

  @ManyToMany(() => Movie, movie => movie.genres)
  movies: Movie[];

  @ManyToMany(() => Series, series => series.genres)
  series: Series[];
} 