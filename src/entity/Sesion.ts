import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, BaseEntity, ManyToOne, OneToMany } from 'typeorm';
import { Evento } from './Evento';
import { TipoSesion } from './TipoSesion';
import { Clima } from './Clima';
import { DetalleSesion } from './DetalleSesion';

@Entity()
export class Sesion extends BaseEntity {

  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true })
  cantidadVueltas: number;

  @ManyToOne(() => TipoSesion, { eager: true })
  tipo: TipoSesion;

  @ManyToOne(() => Clima, { eager: true })
  clima: Clima;

  @OneToMany(() => DetalleSesion, detalleSesion => detalleSesion.sesion, { cascade: true })
  detalles: Promise<DetalleSesion[]>;

  @ManyToOne(() => Evento, evento => evento.sesiones, { orphanedRowAction: 'delete', onDelete: 'CASCADE' })
  evento: Evento;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

}