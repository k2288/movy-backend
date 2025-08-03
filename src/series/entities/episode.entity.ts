import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { Season } from './season.entity';
import { ApiProperty } from '@nestjs/swagger';

@Entity('episodes')
export class Episode {
  @ApiProperty({ description: 'شناسه یکتای قسمت' })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({ description: 'شماره قسمت' })
  @Column({ type: 'int' })
  episodeNumber: number;

  @ApiProperty({ description: 'عنوان قسمت' })
  @Column({ type: 'varchar', length: 255 })
  title: string;

  @ApiProperty({ description: 'توضیحات قسمت' })
  @Column({ type: 'text', nullable: true })
  description: string;

  @ApiProperty({ description: 'تاریخ انتشار' })
  @Column({ type: 'date', nullable: true })
  airDate: Date;

  @ApiProperty({ description: 'امتیاز متوسط' })
  @Column({ type: 'decimal', precision: 3, scale: 1, default: 0 })
  voteAverage: number;

  @ApiProperty({ description: 'تعداد رای‌ها' })
  @Column({ type: 'int', default: 0 })
  voteCount: number;

  @ApiProperty({ description: 'مسیر تصویر' })
  @Column({ type: 'varchar', length: 500, nullable: true })
  stillPath: string;

  @ApiProperty({ description: 'مدت زمان (دقیقه)' })
  @Column({ type: 'int', nullable: true })
  runtime: number;

  @ApiProperty({ description: 'تاریخ ایجاد' })
  @CreateDateColumn()
  createdAt: Date;

  @ApiProperty({ description: 'تاریخ بروزرسانی' })
  @UpdateDateColumn()
  updatedAt: Date;

  @ManyToOne(() => Season, season => season.episodes)
  @JoinColumn({ name: 'seasonId' })
  season: Season;

  @Column()
  seasonId: number;
} 