import { Column, CreateDateColumn, DeleteDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn, ManyToMany, JoinTable, OneToMany } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { Genre } from './genre.entity';
import { Studio } from './studio.entity';
import { ImageUri } from './image-uri.entity';
import { Cast } from './cast.entity';
import { Network } from './network.entity';
import { Season } from './season.entity';
import { Episode } from './episode.entity';

export enum MovieType {
  MOVIE = 'movie',
  SERIES = 'series',
}

@Entity('movies')
export class Movie {
  @ApiProperty({ description: 'شناسه یکتای فیلم' })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({ description: 'عنوان فیلم' })
  @Column({ type: 'varchar', length: 255, nullable: false })
  title: string;

  @ApiProperty({ description: 'سال انتشار' })
  @Column({ type: 'int', nullable: false })
  year: number;

  @ApiProperty({ description: 'شعار فیلم' })
  @Column({ type: 'text', nullable: true })
  tagline: string;

  @ApiProperty({ description: 'خلاصه داستان' })
  @Column({ type: 'text', nullable: true })
  synopsis: string;

  @ApiProperty({ description: 'مدت زمان فیلم (دقیقه)' })
  @Column({ type: 'int', nullable: false })
  runtime: number;

  @ApiProperty({ description: 'رده سنی' })
  @Column({ type: 'varchar', length: 10, nullable: true })
  ageRating: string;

  @ApiProperty({ description: 'آیا فیلم برای بزرگسالان است' })
  @Column({ type: 'boolean', default: false })
  adult: boolean;

  @ApiProperty({ description: 'نوع عنوان', enum: MovieType, example: MovieType.MOVIE })
  @Column({ type: 'enum', enum: MovieType, default: MovieType.MOVIE })
  type: MovieType;

  @ApiProperty({ description: 'آیا سریال به پایان رسیده است', required: false })
  @Column({ type: 'boolean', nullable: true })
  hasEnded?: boolean | null;

  @ApiProperty({ description: 'تاریخ آخرین پخش', required: false })
  @Column({ type: 'datetime', nullable: true })
  lastAired?: Date | null;

  @ApiProperty({ description: 'ژانرهای فیلم', type: [Genre] })
  @ManyToMany(() => Genre, genre => genre.movies)
  @JoinTable({
    name: 'movie_genres',
    joinColumn: {
      name: 'movie_id',
      referencedColumnName: 'id',
    },
    inverseJoinColumn: {
      name: 'genre_id',
      referencedColumnName: 'id',
    },
  })
  genres: Genre[];

  @ApiProperty({ description: 'استودیوهای فیلم', type: [Studio] })
  @ManyToMany(() => Studio, studio => studio.movies)
  @JoinTable({
    name: 'movie_studios',
    joinColumn: {
      name: 'movie_id',
      referencedColumnName: 'id',
    },
    inverseJoinColumn: {
      name: 'studio_id',
      referencedColumnName: 'id',
    },
  })
  studios: Studio[];

  @ApiProperty({ description: 'شبکه‌های پخش', type: [Network] })
  @ManyToMany(() => Network, network => network.movies)
  @JoinTable({
    name: 'movie_networks',
    joinColumn: {
      name: 'movie_id',
      referencedColumnName: 'id',
    },
    inverseJoinColumn: {
      name: 'network_id',
      referencedColumnName: 'id',
    },
  })
  networks: Network[];

  @ApiProperty({ description: 'تصاویر فیلم', type: [ImageUri] })
  @OneToMany(() => ImageUri, imageUri => imageUri.movie, { cascade: true })
  imageUris: ImageUri[];

  @ApiProperty({ description: 'بازیگران و عوامل فیلم', type: [Cast] })
  @OneToMany(() => Cast, cast => cast.movie, { cascade: true })
  casts: Cast[];

  @ApiProperty({ description: 'فصل‌های سریال', type: [Season] })
  @OneToMany(() => Season, season => season.series, { cascade: true })
  seasons: Season[];

  @ApiProperty({ description: 'قسمت‌های سریال', type: [Episode] })
  @OneToMany(() => Episode, episode => episode.series, { cascade: true })
  episodes: Episode[];

  @ApiProperty({ description: 'تاریخ ایجاد' })
  @CreateDateColumn()
  createdAt: Date;

  @ApiProperty({ description: 'تاریخ بروزرسانی' })
  @UpdateDateColumn()
  updatedAt: Date;

  @ApiProperty({ description: 'تاریخ حذف' })
  @DeleteDateColumn()
  deletedAt: Date;
} 