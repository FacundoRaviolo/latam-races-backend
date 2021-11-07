import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, BaseEntity, ManyToOne } from 'typeorm';
import { Piloto } from './Piloto';
import { Escuderia } from './Escuderia';
import { Temporada } from './Temporada';

@Entity()
export class Contrato extends BaseEntity {

  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Piloto, { eager: true })
  piloto: Piloto;

  @ManyToOne(() => Escuderia, { eager: true })
  escuderia: Escuderia;

  @Column({ nullable: true })
  numero: number;

  @Column({ nullable: true })
  foto: string;

  @Column({ type: 'date' })
  fechaInicio: Date;

  @Column({ nullable: true, type: 'date' })
  fechaFin: Date;

  @Column({ default: true })
  activo: Boolean;

  @ManyToOne(() => Temporada, { eager: true })
  temporada: Temporada;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

}