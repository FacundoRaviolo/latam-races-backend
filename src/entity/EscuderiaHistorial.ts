import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, BaseEntity, ManyToOne } from 'typeorm';
import { Escuderia } from './Escuderia';

@Entity()
export class EscuderiaHistorial extends BaseEntity {

  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nombre: string;

  @Column({ nullable: true })
  nombreCompleto: string;

  @Column({ nullable: true })
  colorPrimario: string;

  @Column({ type: 'date' })
  fechaInicio: Date;

  @Column({ nullable: true, type: 'date' })
  fechaFin: Date;

  @Column({ default: true })
  activo: Boolean

  @ManyToOne(() => Escuderia, escuderia => escuderia.historial, { orphanedRowAction: 'delete' })
  escuderia: Escuderia;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

}