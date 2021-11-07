import { Column, ChildEntity, ManyToOne, OneToMany } from 'typeorm';
import { DetalleSesion } from './DetalleSesion';
import { Neumatico } from './Neumatico';
import { Stint } from './Stint';

@ChildEntity()
export class DetalleSesionCarrera extends DetalleSesion {

  @Column({ nullable: true })
  tiempoTotal: number;

  @Column({ nullable: true })
  vueltaRapida: number;

  @Column({ nullable: true })
  vueltasDetras: number;

  @Column({ nullable: true })
  puntos: number;

  @OneToMany(() => Stint, stint => stint.detalleSesion, { eager: true, cascade: true })
  stints: Stint[];

}