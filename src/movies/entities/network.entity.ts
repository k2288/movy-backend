import { Column, CreateDateColumn, DeleteDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn, ManyToMany, OneToMany } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { Movie } from './movie.entity';
import { NetworkImageUri } from './network-image-uri.entity';

@Entity('networks')
export class Network {
  @ApiProperty({ description: 'شناسه یکتای شبکه' })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({ description: 'نام شبکه', example: 'HBO' })
  @Column({ type: 'varchar', length: 255, nullable: false, unique: true })
  name: string;

  @ApiProperty({ description: 'تصاویر شبکه', type: [NetworkImageUri] })
  @OneToMany(() => NetworkImageUri, imageUri => imageUri.network, { cascade: true })
  imageUris: NetworkImageUri[];

  @ApiProperty({ description: 'تاریخ ایجاد' })
  @CreateDateColumn()
  createdAt: Date;

  @ApiProperty({ description: 'تاریخ بروزرسانی' })
  @UpdateDateColumn()
  updatedAt: Date;

  @ApiProperty({ description: 'تاریخ حذف' })
  @DeleteDateColumn()
  deletedAt: Date;

  @ManyToMany(() => Movie, movie => movie.networks)
  movies: Movie[];
} 