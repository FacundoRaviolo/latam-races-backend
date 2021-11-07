import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, BaseEntity, ManyToOne } from 'typeorm';
import { Pais } from './Pais';

@Entity()
export class Circuito extends BaseEntity {

  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nombre: string;

  @Column({ nullable: true })
  nombreCompleto: string;

  @Column({ nullable: true })
  ciudad: string;

  @ManyToOne(() => Pais, { eager: true })
  pais: Pais;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

}