import { Column, CreateDateColumn, DeleteDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn, ManyToOne, JoinColumn } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

@Entity('casts')
export class Cast {
  @ApiProperty({ description: 'شناسه یکتای بازیگر' })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({ description: 'نقش در فیلم', example: 'کارگردان' })
  @Column({ type: 'varchar', length: 255, nullable: false })
  role: string;

  @ApiProperty({ description: 'نام نقشی که بازیگر ایفا می‌کند', example: 'Brand', required: false })
  @Column({ type: 'varchar', length: 255, nullable: true, name: 'as' })
  as?: string;

  @ApiProperty({ description: 'شناسه شخص' })
  @Column({ type: 'int', nullable: false })
  personId: number;

  @ApiProperty({ description: 'شناسه فیلم' })
  @Column({ type: 'int', nullable: false })
  movieId: number;

  @ApiProperty({ description: 'شخص مربوطه', type: () => 'Person' })
  @ManyToOne('Person', 'casts', { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'personId' })
  person: any;

  @ApiProperty({ description: 'فیلم مربوطه', type: () => 'Movie' })
  @ManyToOne('Movie', 'casts', { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'movieId' })
  movie: any;

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