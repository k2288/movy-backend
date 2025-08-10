import { Column, CreateDateColumn, DeleteDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn, ManyToOne, JoinColumn } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { Network } from './network.entity';

export enum NetworkImageType {
  LOGO = 'logo',
  BANNER = 'banner',
  GALLERY = 'gallery',
}

@Entity('network_image_uris')
export class NetworkImageUri {
  @ApiProperty({ description: 'شناسه یکتای تصویر' })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({ description: 'نوع تصویر', enum: NetworkImageType, example: NetworkImageType.LOGO })
  @Column({ 
    type: 'enum', 
    enum: NetworkImageType, 
    nullable: false 
  })
  type: NetworkImageType;

  @ApiProperty({ description: 'آدرس تصویر', example: 'https://example.com/network.jpg' })
  @Column({ type: 'varchar', length: 500, nullable: false })
  url: string;

  @ApiProperty({ description: 'شناسه شبکه' })
  @Column({ type: 'int', nullable: false, name: 'network_id' })
  networkId: number;

  @ApiProperty({ description: 'شبکه مربوطه', type: () => Network })
  @ManyToOne(() => Network, network => network.imageUris, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'network_id' })
  network: Network;

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