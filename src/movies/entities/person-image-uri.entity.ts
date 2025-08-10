import { Column, CreateDateColumn, DeleteDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn, ManyToOne, JoinColumn } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { Person } from './person.entity';

export enum PersonImageType {
  PROFILE = 'profile',
  PORTRAIT = 'portrait',
  GALLERY = 'gallery',
}

@Entity('person_image_uris')
export class PersonImageUri {
  @ApiProperty({ description: 'شناسه یکتای تصویر' })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({ description: 'نوع تصویر', enum: PersonImageType, example: PersonImageType.PROFILE })
  @Column({ 
    type: 'enum', 
    enum: PersonImageType, 
    nullable: false 
  })
  type: PersonImageType;

  @ApiProperty({ description: 'آدرس تصویر', example: 'https://example.com/person.jpg' })
  @Column({ type: 'varchar', length: 500, nullable: false })
  url: string;

  @ApiProperty({ description: 'شناسه شخص' })
  @Column({ type: 'int', nullable: false, name: 'person_id' })
  personId: number;

  @ApiProperty({ description: 'شخص مربوطه', type: () => Person })
  @ManyToOne(() => Person, person => person.imageUris, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'person_id' })
  person: Person;

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