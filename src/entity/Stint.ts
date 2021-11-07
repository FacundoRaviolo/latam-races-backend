import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, BaseEntity, ManyToOne } from 'typeorm';
import { DetalleSesionCarrera } from './DetalleSesionCarrera';
import { Neumatico } from './Neumatico';

@Entity()
export class Stint extends BaseEntity {

  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true })
  cantidadVueltas: number;

  @ManyToOne(() => Neumatico, { eager: true })
  neumatico: Neumatico;

  @ManyToOne(() => DetalleSesionCarrera, detalleSesion => detalleSesion.stints, { orphanedRowAction: 'delete', onDelete: 'CASCADE' })
  detalleSesion: DetalleSesionCarrera;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

}