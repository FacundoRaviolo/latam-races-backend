import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, BaseEntity, ManyToOne } from 'typeorm';
import { TipoPenalizacion } from './TipoPenalizacion';
import { DetalleSesion } from './DetalleSesion';

@Entity()
export class Penalizacion extends BaseEntity {

  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true })
  motivo: string;

  @Column({ nullable: true })
  tiempo: number;

  @Column({ nullable: true })
  posiciones: number;

  @Column({ type: 'enum', enum: TipoPenalizacion, default: TipoPenalizacion.JUEGO })
  tipo: TipoPenalizacion;

  @ManyToOne(() => DetalleSesion, detalleSesion => detalleSesion.penalizaciones, { orphanedRowAction: 'delete', onDelete: 'CASCADE' })
  detalleSesion: DetalleSesion;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

}