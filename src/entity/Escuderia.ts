import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, BaseEntity, ManyToOne, OneToMany } from 'typeorm';
import { Pais } from './Pais';
import { Categoria } from './Categoria';
import { HistorialEscuderia } from './HistorialEscuderia';

@Entity()
export class Escuderia extends BaseEntity {

  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nombre: string;

  @Column()
  abreviatura: string;

  @Column({ nullable: true })
  escudo: string;

  @OneToMany(() => HistorialEscuderia, historial => historial.escuderia, { eager: true, cascade: true })
  historial: HistorialEscuderia[];

  @ManyToOne(() => Pais, { nullable: true, eager: true })
  nacionalidad: Pais;

  @ManyToOne(() => Categoria, { nullable: true, eager: true })
  categoria: Categoria;

  @Column()
  @CreateDateColumn()
  createdAt: Date;

  @Column()
  @UpdateDateColumn()
  updatedAt: Date;

}