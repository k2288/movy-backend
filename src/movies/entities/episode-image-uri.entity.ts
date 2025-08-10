import { Column, CreateDateColumn, DeleteDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn, ManyToOne, JoinColumn } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { Episode } from './episode.entity';

export enum EpisodeImageType {
  STILL = 'still',
  SCREENSHOT = 'screenshot',
  GALLERY = 'gallery',
}

@Entity('episode_image_uris')
export class EpisodeImageUri {
  @ApiProperty({ description: 'شناسه یکتای تصویر' })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({ description: 'نوع تصویر', enum: EpisodeImageType, example: EpisodeImageType.STILL })
  @Column({ 
    type: 'enum', 
    enum: EpisodeImageType, 
    nullable: false 
  })
  type: EpisodeImageType;

  @ApiProperty({ description: 'آدرس تصویر', example: 'https://example.com/episode.jpg' })
  @Column({ type: 'varchar', length: 500, nullable: false })
  url: string;

  @ApiProperty({ description: 'شناسه قسمت' })
  @Column({ type: 'int', nullable: false, name: 'episode_id' })
  episodeId: number;

  @ApiProperty({ description: 'قسمت مربوطه', type: () => Episode })
  @ManyToOne(() => Episode, episode => episode.imageUris, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'episode_id' })
  episode: Episode;

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