import { Column, ChildEntity, ManyToOne } from 'typeorm';
import { DetalleSesion } from './DetalleSesion';
import { Neumatico } from './Neumatico';

@ChildEntity()
export class DetalleSesionClasificacion extends DetalleSesion {

  @Column({ nullable: true })
  mejorVuelta: number;

  @ManyToOne(() => Neumatico, { eager: true })
  neumatico: Neumatico;

}