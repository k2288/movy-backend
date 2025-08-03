import { Entity, PrimaryGeneratedColumn, Column, OneToMany, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { Cast } from '../../cast/entities/cast.entity';
import { ApiProperty } from '@nestjs/swagger';

@Entity('people')
export class Person {
  @ApiProperty({ description: 'شناسه یکتای شخص' })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({ description: 'نام' })
  @Column({ type: 'varchar', length: 255 })
  name: string;

  @ApiProperty({ description: 'نام مستعار' })
  @Column({ type: 'varchar', length: 255, nullable: true })
  alsoKnownAs: string;

  @ApiProperty({ description: 'تاریخ تولد' })
  @Column({ type: 'date', nullable: true })
  birthday: Date;

  @ApiProperty({ description: 'محل تولد' })
  @Column({ type: 'varchar', length: 255, nullable: true })
  placeOfBirth: string;

  @ApiProperty({ description: 'مسیر تصویر پروفایل' })
  @Column({ type: 'varchar', length: 500, nullable: true })
  profilePath: string;

  @ApiProperty({ description: 'بیوگرافی' })
  @Column({ type: 'text', nullable: true })
  biography: string;

  @ApiProperty({ description: 'جنسیت' })
  @Column({ type: 'int', nullable: true })
  gender: number;

  @ApiProperty({ description: 'مشهوریت' })
  @Column({ type: 'decimal', precision: 10, scale: 2, default: 0 })
  popularity: number;

  @ApiProperty({ description: 'وضعیت' })
  @Column({ type: 'varchar', length: 50, default: 'Active' })
  status: string;

  @ApiProperty({ description: 'تاریخ ایجاد' })
  @CreateDateColumn()
  createdAt: Date;

  @ApiProperty({ description: 'تاریخ بروزرسانی' })
  @UpdateDateColumn()
  updatedAt: Date;

  @OneToMany(() => Cast, cast => cast.person)
  casts: Cast[];
} 