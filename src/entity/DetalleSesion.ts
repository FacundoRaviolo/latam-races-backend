import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, BaseEntity, ManyToOne, OneToMany, TableInheritance } from 'typeorm';
import { Sesion } from './Sesion';
import { Piloto } from './Piloto';
import { EstadoCarrera } from './EstadoCarrera';
import { Penalizacion } from './Penalizacion';

@Entity()
@TableInheritance({ column: { type: 'varchar', name: 'type' } })
export class DetalleSesion extends BaseEntity {

  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true })
  posicion: number;

  @ManyToOne(() => Piloto, { eager: true })
  piloto: Piloto;

  @ManyToOne(() => EstadoCarrera, { eager: true })
  estado: EstadoCarrera;

  @OneToMany(() => Penalizacion, penalizacion => penalizacion.detalleSesion, { eager: true, cascade: true })
  penalizaciones: Penalizacion[];
  
  @ManyToOne(() => Sesion, sesion => sesion.detalles, { orphanedRowAction: 'delete', onDelete: 'CASCADE' })
  sesion: Sesion;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

}