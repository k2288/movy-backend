import { Column, CreateDateColumn, DeleteDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn, OneToMany } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { Cast } from './cast.entity';
import { PersonImageUri } from './person-image-uri.entity';

@Entity('persons')
export class Person {
  @ApiProperty({ description: 'شناسه یکتای شخص' })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({ description: 'نام شخص', example: 'Anne Hathaway' })
  @Column({ type: 'varchar', length: 255, nullable: false })
  name: string;

  @ApiProperty({ description: 'تصاویر شخص', type: [PersonImageUri] })
  @OneToMany(() => PersonImageUri, imageUri => imageUri.person, { cascade: true })
  imageUris: PersonImageUri[];

  @ApiProperty({ description: 'بازی‌ها و نقش‌های شخص', type: [Cast] })
  @OneToMany('Cast', 'person')
  casts: Cast[];

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