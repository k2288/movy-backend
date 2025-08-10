import { Column, CreateDateColumn, DeleteDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn, ManyToOne, JoinColumn } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { Season } from './season.entity';

export enum SeasonImageType {
  POSTER = 'poster',
  BANNER = 'banner',
  GALLERY = 'gallery',
}

@Entity('season_image_uris')
export class SeasonImageUri {
  @ApiProperty({ description: 'شناسه یکتای تصویر' })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({ description: 'نوع تصویر', enum: SeasonImageType, example: SeasonImageType.POSTER })
  @Column({ 
    type: 'enum', 
    enum: SeasonImageType, 
    nullable: false 
  })
  type: SeasonImageType;

  @ApiProperty({ description: 'آدرس تصویر', example: 'https://example.com/season.jpg' })
  @Column({ type: 'varchar', length: 500, nullable: false })
  url: string;

  @ApiProperty({ description: 'شناسه فصل' })
  @Column({ type: 'int', nullable: false, name: 'season_id' })
  seasonId: number;

  @ApiProperty({ description: 'فصل مربوطه', type: () => Season })
  @ManyToOne(() => Season, season => season.imageUris, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'season_id' })
  season: Season;

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