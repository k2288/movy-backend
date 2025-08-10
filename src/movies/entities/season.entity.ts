import { Column, CreateDateColumn, DeleteDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn, ManyToOne, JoinColumn, OneToMany } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { Movie } from './movie.entity';
import { Episode } from './episode.entity';
import { SeasonImageUri } from './season-image-uri.entity';

@Entity('seasons')
export class Season {
  @ApiProperty({ description: 'شناسه یکتای فصل' })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({ description: 'نام فصل', example: 'Season 1' })
  @Column({ type: 'varchar', length: 255, nullable: false })
  name: string;

  @ApiProperty({ description: 'شماره فصل', example: 1 })
  @Column({ type: 'int', nullable: false })
  index: number;

  @ApiProperty({ description: 'شناسه سریال' })
  @Column({ type: 'int', nullable: false, name: 'series_id' })
  seriesId: number;

  @ApiProperty({ description: 'سریال مربوطه', type: () => 'Movie' })
  @ManyToOne('Movie', 'seasons', { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'series_id' })
  series: Movie;

  @ApiProperty({ description: 'تصاویر فصل', type: [SeasonImageUri] })
  @OneToMany(() => SeasonImageUri, imageUri => imageUri.season, { cascade: true })
  imageUris: SeasonImageUri[];

  @ApiProperty({ description: 'قسمت‌های فصل', type: [Episode] })
  @OneToMany(() => Episode, episode => episode.season, { cascade: true })
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