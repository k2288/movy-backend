import { Entity, PrimaryGeneratedColumn, Column, ManyToMany, JoinTable, OneToMany, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { Genre } from '../../genre/entities/genre.entity';
import { Cast } from '../../cast/entities/cast.entity';
import { Season } from './season.entity';
import { ApiProperty } from '@nestjs/swagger';

@Entity('series')
export class Series {
  @ApiProperty({ description: 'شناسه یکتای سریال' })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({ description: 'عنوان سریال' })
  @Column({ type: 'varchar', length: 255 })
  title: string;

  @ApiProperty({ description: 'توضیحات سریال' })
  @Column({ type: 'text' })
  description: string;

  @ApiProperty({ description: 'تاریخ انتشار اولین قسمت' })
  @Column({ type: 'date' })
  firstAirDate: Date;

  @ApiProperty({ description: 'تاریخ انتشار آخرین قسمت' })
  @Column({ type: 'date', nullable: true })
  lastAirDate: Date;

  @ApiProperty({ description: 'امتیاز متوسط' })
  @Column({ type: 'decimal', precision: 3, scale: 1, default: 0 })
  voteAverage: number;

  @ApiProperty({ description: 'مسیر پوستر' })
  @Column({ type: 'varchar', length: 500, nullable: true })
  posterPath: string;

  @ApiProperty({ description: 'مسیر تصویر پس‌زمینه' })
  @Column({ type: 'varchar', length: 500, nullable: true })
  backdropPath: string;

  @ApiProperty({ description: 'تعداد فصل‌ها' })
  @Column({ type: 'int', default: 0 })
  numberOfSeasons: number;

  @ApiProperty({ description: 'تعداد قسمت‌ها' })
  @Column({ type: 'int', default: 0 })
  numberOfEpisodes: number;

  @ApiProperty({ description: 'وضعیت' })
  @Column({ type: 'varchar', length: 50, default: 'Returning Series' })
  status: string;

  @ApiProperty({ description: 'زبان اصلی' })
  @Column({ type: 'varchar', length: 10, default: 'fa' })
  originalLanguage: string;

  @ApiProperty({ description: 'تعداد رای‌ها' })
  @Column({ type: 'int', default: 0 })
  voteCount: number;

  @ApiProperty({ description: 'مشهوریت' })
  @Column({ type: 'decimal', precision: 10, scale: 2, default: 0 })
  popularity: number;

  @ApiProperty({ description: 'تاریخ ایجاد' })
  @CreateDateColumn()
  createdAt: Date;

  @ApiProperty({ description: 'تاریخ بروزرسانی' })
  @UpdateDateColumn()
  updatedAt: Date;

  @ManyToMany(() => Genre, genre => genre.series)
  @JoinTable({
    name: 'series_genres',
    joinColumn: { name: 'seriesId', referencedColumnName: 'id' },
    inverseJoinColumn: { name: 'genreId', referencedColumnName: 'id' }
  })
  genres: Genre[];

  @OneToMany(() => Cast, cast => cast.series)
  cast: Cast[];

  @OneToMany(() => Season, season => season.series)
  seasons: Season[];
} 