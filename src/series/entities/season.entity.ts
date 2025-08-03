import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, OneToMany, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { Series } from './series.entity';
import { Episode } from './episode.entity';
import { ApiProperty } from '@nestjs/swagger';

@Entity('seasons')
export class Season {
  @ApiProperty({ description: 'شناسه یکتای فصل' })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({ description: 'شماره فصل' })
  @Column({ type: 'int' })
  seasonNumber: number;

  @ApiProperty({ description: 'عنوان فصل' })
  @Column({ type: 'varchar', length: 255 })
  title: string;

  @ApiProperty({ description: 'توضیحات فصل' })
  @Column({ type: 'text', nullable: true })
  description: string;

  @ApiProperty({ description: 'تاریخ انتشار' })
  @Column({ type: 'date', nullable: true })
  airDate: Date;

  @ApiProperty({ description: 'مسیر پوستر' })
  @Column({ type: 'varchar', length: 500, nullable: true })
  posterPath: string;

  @ApiProperty({ description: 'تعداد قسمت‌ها' })
  @Column({ type: 'int', default: 0 })
  episodeCount: number;

  @ApiProperty({ description: 'تاریخ ایجاد' })
  @CreateDateColumn()
  createdAt: Date;

  @ApiProperty({ description: 'تاریخ بروزرسانی' })
  @UpdateDateColumn()
  updatedAt: Date;

  @ManyToOne(() => Series, series => series.seasons)
  @JoinColumn({ name: 'seriesId' })
  series: Series;

  @Column()
  seriesId: number;

  @OneToMany(() => Episode, episode => episode.season)
  episodes: Episode[];
} 