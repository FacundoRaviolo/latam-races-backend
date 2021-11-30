import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, BaseEntity, ManyToOne, OneToMany } from 'typeorm';
import { Temporada } from './Temporada';
import { EstadoEvento } from './EstadoEvento';
import { Circuito } from './Circuito';
import { Piloto } from './Piloto';
import { Sesion } from './Sesion';

@Entity()
export class Evento extends BaseEntity {

  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  numero: number;

  @Column()
  nombre: string;

  @Column({ type: 'date', nullable: true })
  fecha: Date;

  @ManyToOne(() => Circuito, { eager: true })
  circuito: Circuito;

  @ManyToOne(() => EstadoEvento, { eager: true })
  estado: EstadoEvento;

  @ManyToOne(() => Piloto, { eager: true })
  pilotoDelDia: Piloto;

  @OneToMany(() => Sesion, sesion => sesion.evento, { cascade: true })
  sesiones: Promise<Sesion[]>;

  @ManyToOne(() => Temporada, temporada => temporada.eventos, { orphanedRowAction: 'delete', onDelete: 'CASCADE' })
  temporada: Temporada;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

}