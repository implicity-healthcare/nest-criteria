import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

@Entity()
export class Person {
    @PrimaryGeneratedColumn()
    id: number;

    @CreateDateColumn()
    created_date: Date;

    @UpdateDateColumn()
    updated_date: Date;

    @Column({ type: 'varchar', length: 255, unique: true })
    name: string;

    @Column({ type: 'int'})
    age: number;

    @Column({ type: 'json'})
    hobbies: string[];
}
