import { Column, CreateDateColumn, DeleteDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn, ManyToMany } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { Movie } from './movie.entity';

@Entity('studios')
export class Studio {
  @ApiProperty({ description: 'شناسه یکتای استودیو' })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({ description: 'نام استودیو' })
  @Column({ type: 'varchar', length: 255, nullable: false, unique: true })
  name: string;

  @ApiProperty({ description: 'تاریخ ایجاد' })
  @CreateDateColumn()
  createdAt: Date;

  @ApiProperty({ description: 'تاریخ بروزرسانی' })
  @UpdateDateColumn()
  updatedAt: Date;

  @ApiProperty({ description: 'تاریخ حذف' })
  @DeleteDateColumn()
  deletedAt: Date;

  @ManyToMany(() => Movie, movie => movie.studios)
  movies: Movie[];
} 