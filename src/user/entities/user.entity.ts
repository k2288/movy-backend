import { Column, CreateDateColumn, DeleteDateColumn, Entity, PrimaryGeneratedColumn, Unique, UpdateDateColumn } from "typeorm";

@Entity('users')
@Unique("unique_national_code", ['nationalCode', 'deletedAt'])
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ length: 100,nullable:true })
    password: string;

    @Column({ length: 100 })
    firstName: string;

    @Column({ length: 100 })
    lastName: string;

    @Column({ length: 11 })
    mobile: string;

    @Column({ length: 10 })
    nationalCode: string;

    @Column()
    birthDate: string;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;

    @DeleteDateColumn()
    deletedAt: Date;
}
