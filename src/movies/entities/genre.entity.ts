import { Column, CreateDateColumn, DeleteDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn, ManyToMany } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { Movie } from './movie.entity';

@Entity('genres')
export class Genre {
  @ApiProperty({ description: 'شناسه یکتای ژانر' })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({ description: 'نام ژانر' })
  @Column({ type: 'varchar', length: 100, nullable: false, unique: true })
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

  @ManyToMany(() => Movie, movie => movie.genres)
  movies: Movie[];
} 