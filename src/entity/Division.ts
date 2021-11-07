import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, BaseEntity, ManyToOne } from 'typeorm';
import { Plataforma } from './Plataforma';
import { Categoria } from './Categoria';

@Entity()
export class Division extends BaseEntity {

  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nombre: string;

  @Column({ nullable: true })
  descripcion: string;

  @Column({ nullable: true })
  logo: string;

  @ManyToOne(() => Categoria, { eager: true })
  categoria: Categoria;

  @ManyToOne(() => Plataforma, { eager: true })
  plataforma: Plataforma;

  @Column()
  @CreateDateColumn()
  createdAt: Date;

  @Column()
  @UpdateDateColumn()
  updatedAt: Date;

}