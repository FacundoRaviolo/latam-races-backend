import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, BaseEntity, ManyToOne, ManyToMany, JoinTable, OneToMany } from 'typeorm';
import { Division } from './Division';
import { Piloto } from './Piloto';
import { Escuderia } from './Escuderia';
import { Evento } from './Evento';

@Entity()
export class Temporada extends BaseEntity {

  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nombre: string;

  @Column({ nullable: true, type: 'date' })
  fechaInicio: Date;

  @Column({ nullable: true, type: 'date' })
  fechaFin: Date;

  @ManyToOne(() => Division, { eager: true })
  division: Division;

  @ManyToMany(() => Piloto, { eager: true })
  @JoinTable({ name: 'temporada_pilotos' })
  pilotos: Piloto[];

  @ManyToMany(() => Escuderia, { eager: true })
  @JoinTable({ name: 'temporada_escuderias' })
  escuderias: Escuderia[];

  @OneToMany(() => Evento, evento => evento.temporada, { eager: true })
  eventos: Evento[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

}