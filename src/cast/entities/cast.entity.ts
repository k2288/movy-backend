import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { Movie } from '../../movie/entities/movie.entity';
import { Series } from '../../series/entities/series.entity';
import { Person } from '../../person/entities/person.entity';
import { ApiProperty } from '@nestjs/swagger';

@Entity('casts')
export class Cast {
  @ApiProperty({ description: 'شناسه یکتای بازیگر' })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({ description: 'نام شخصیت' })
  @Column({ type: 'varchar', length: 255 })
  character: string;

  @ApiProperty({ description: 'ترتیب نمایش' })
  @Column({ type: 'int', default: 0 })
  order: number;

  @ApiProperty({ description: 'نوع نقش' })
  @Column({ type: 'varchar', length: 50, default: 'cast' })
  type: string;

  @ApiProperty({ description: 'تاریخ ایجاد' })
  @CreateDateColumn()
  createdAt: Date;

  @ApiProperty({ description: 'تاریخ بروزرسانی' })
  @UpdateDateColumn()
  updatedAt: Date;

  @ManyToOne(() => Movie, movie => movie.cast, { nullable: true })
  @JoinColumn({ name: 'movieId' })
  movie: Movie;

  @Column({ nullable: true })
  movieId: number;

  @ManyToOne(() => Series, series => series.cast, { nullable: true })
  @JoinColumn({ name: 'seriesId' })
  series: Series;

  @Column({ nullable: true })
  seriesId: number;

  @ManyToOne(() => Person, person => person.casts)
  @JoinColumn({ name: 'personId' })
  person: Person;

  @Column()
  personId: number;
} 