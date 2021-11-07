import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, BaseEntity, ManyToOne } from 'typeorm';
import { Categoria } from './Categoria';

@Entity()
export class Neumatico extends BaseEntity {

  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nombre: string;

  @Column({ nullable: true })
  abreviatura: string;

  @Column({ nullable: true })
  imagen: string;

  @Column({ nullable: true })
  color: string;

  @ManyToOne(() => Categoria, { eager: true })
  categoria: Categoria;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

}