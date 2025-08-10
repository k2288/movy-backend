import { Column, CreateDateColumn, DeleteDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn, ManyToOne, JoinColumn } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { Movie } from './movie.entity';

export enum ImageType {
  BACKDROP = 'backdrop',
  PRIMARY = 'primary',
  LOGO = 'logo',
}

@Entity('image_uris')
export class ImageUri {
  @ApiProperty({ description: 'شناسه یکتای تصویر' })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({ description: 'نوع تصویر', enum: ImageType, example: ImageType.PRIMARY })
  @Column({ 
    type: 'enum', 
    enum: ImageType, 
    nullable: false 
  })
  type: ImageType;

  @ApiProperty({ description: 'آدرس تصویر', example: 'https://example.com/image.jpg' })
  @Column({ type: 'varchar', length: 500, nullable: false })
  url: string;

  @ApiProperty({ description: 'شناسه فیلم' })
  @Column({ type: 'int', nullable: false })
  movieId: number;

  @ApiProperty({ description: 'فیلم مربوطه', type: () => Movie })
  @ManyToOne(() => Movie, movie => movie.imageUris, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'movie_id' })
  movie: Movie;

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