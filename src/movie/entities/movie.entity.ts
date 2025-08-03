import { Entity, PrimaryGeneratedColumn, Column, ManyToMany, JoinTable, OneToMany, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { Genre } from '../../genre/entities/genre.entity';
import { Cast } from '../../cast/entities/cast.entity';
import { ApiProperty } from '@nestjs/swagger';

@Entity('movies')
export class Movie {
  @ApiProperty({ description: 'شناسه یکتای فیلم' })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({ description: 'عنوان فیلم' })
  @Column({ type: 'varchar', length: 255 })
  title: string;

  @ApiProperty({ description: 'توضیحات فیلم' })
  @Column({ type: 'text' })
  description: string;

  @ApiProperty({ description: 'تاریخ انتشار' })
  @Column({ type: 'date' })
  releaseDate: Date;

  @ApiProperty({ description: 'امتیاز متوسط' })
  @Column({ type: 'decimal', precision: 3, scale: 1, default: 0 })
  voteAverage: number;

  @ApiProperty({ description: 'مسیر پوستر' })
  @Column({ type: 'varchar', length: 500, nullable: true })
  posterPath: string;

  @ApiProperty({ description: 'مسیر تصویر پس‌زمینه' })
  @Column({ type: 'varchar', length: 500, nullable: true })
  backdropPath: string;

  @ApiProperty({ description: 'مدت زمان فیلم (دقیقه)' })
  @Column({ type: 'int', nullable: true })
  runtime: number;

  @ApiProperty({ description: 'وضعیت' })
  @Column({ type: 'varchar', length: 50, default: 'Released' })
  status: string;

  @ApiProperty({ description: 'زبان اصلی' })
  @Column({ type: 'varchar', length: 10, default: 'fa' })
  originalLanguage: string;

  @ApiProperty({ description: 'بودجه' })
  @Column({ type: 'bigint', nullable: true })
  budget: number;

  @ApiProperty({ description: 'درآمد' })
  @Column({ type: 'bigint', nullable: true })
  revenue: number;

  @ApiProperty({ description: 'تعداد رای‌ها' })
  @Column({ type: 'int', default: 0 })
  voteCount: number;

  @ApiProperty({ description: 'تاریخ ایجاد' })
  @CreateDateColumn()
  createdAt: Date;

  @ApiProperty({ description: 'تاریخ بروزرسانی' })
  @UpdateDateColumn()
  updatedAt: Date;

  @ManyToMany(() => Genre, genre => genre.movies)
  @JoinTable({
    name: 'movie_genres',
    joinColumn: { name: 'movieId', referencedColumnName: 'id' },
    inverseJoinColumn: { name: 'genreId', referencedColumnName: 'id' }
  })
  genres: Genre[];

  @OneToMany(() => Cast, cast => cast.movie)
  cast: Cast[];
} 