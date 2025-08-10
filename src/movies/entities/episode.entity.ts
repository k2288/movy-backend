import { Column, CreateDateColumn, DeleteDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn, ManyToOne, JoinColumn, OneToMany } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { Season } from './season.entity';
import { Movie } from './movie.entity';
import { EpisodeImageUri } from './episode-image-uri.entity';

@Entity('episodes')
export class Episode {
  @ApiProperty({ description: 'شناسه یکتای قسمت' })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({ description: 'نام قسمت', example: 'Pilot' })
  @Column({ type: 'varchar', length: 255, nullable: false })
  name: string;

  @ApiProperty({ description: 'خلاصه داستان قسمت', example: 'قسمت اول سریال که شخصیت‌های اصلی معرفی می‌شوند' })
  @Column({ type: 'text', nullable: true })
  synopsis: string;

  @ApiProperty({ description: 'شماره قسمت در فصل', example: 1 })
  @Column({ type: 'int', nullable: false })
  index: number;

  @ApiProperty({ description: 'تاریخ پخش', example: '2023-01-15' })
  @Column({ type: 'date', nullable: true })
  airDate?: Date;

  @ApiProperty({ description: 'شماره فصل', example: 1 })
  @Column({ type: 'int', nullable: false })
  seasonIndex: number;

  @ApiProperty({ description: 'شناسه سریال' })
  @Column({ type: 'int', nullable: false, name: 'series_id' })
  seriesId: number;

  @ApiProperty({ description: 'شناسه فصل' })
  @Column({ type: 'int', nullable: false, name: 'season_id' })
  seasonId: number;

  @ApiProperty({ description: 'کارگردان‌های قسمت', type: [String] })
  @Column({ type: 'json', nullable: true })
  directors: string[];

  @ApiProperty({ description: 'سریال مربوطه', type: () => 'Movie' })
  @ManyToOne('Movie', { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'series_id' })
  series: Movie;

  @ApiProperty({ description: 'فصل مربوطه', type: () => 'Season' })
  @ManyToOne('Season', { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'season_id' })
  season: Season;

  @ApiProperty({ description: 'تصاویر قسمت', type: [EpisodeImageUri] })
  @OneToMany(() => EpisodeImageUri, imageUri => imageUri.episode, { cascade: true })
  imageUris: EpisodeImageUri[];

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