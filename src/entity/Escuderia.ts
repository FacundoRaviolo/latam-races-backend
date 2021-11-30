import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, BaseEntity, ManyToOne, OneToMany } from 'typeorm';
import { Pais } from './Pais';
import { Categoria } from './Categoria';
import { EscuderiaHistorial } from './EscuderiaHistorial';

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

  @OneToMany(() => EscuderiaHistorial, historial => historial.escuderia, { cascade: true })
  historial: Promise<EscuderiaHistorial[]>;

  @ManyToOne(() => Pais, { nullable: true, eager: true })
  nacionalidad: Pais;

  @ManyToOne(() => Categoria, { nullable: true, eager: true })
  categoria: Categoria;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

}