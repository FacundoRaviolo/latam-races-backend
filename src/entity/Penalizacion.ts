import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, BaseEntity, ManyToOne } from 'typeorm';
import { TipoPenalizacion } from './TipoPenalizacion';
import { DetalleSesion } from './DetalleSesion';
import { MotivoPenalizacion } from './MotivoPenalizacion';

@Entity()
export class Penalizacion extends BaseEntity {

  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => MotivoPenalizacion, { nullable: true, eager: true })
  motivo: MotivoPenalizacion;

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