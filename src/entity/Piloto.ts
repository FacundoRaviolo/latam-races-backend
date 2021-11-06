import { Entity, PrimaryGeneratedColumn, Column, Unique, CreateDateColumn, UpdateDateColumn, BaseEntity, ManyToOne } from 'typeorm';
import { Pais } from './Pais';

@Entity()
@Unique(['email'])
export class Piloto extends BaseEntity {

  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  usuario: string;

  @Column({ nullable: true })
  nombre: string;

  @Column({ nullable: true })
  apellido: string;

  @Column({ nullable: true })
  abreviatura: string;

  @Column({ nullable: true })
  email: string;

  @Column({ nullable: true })
  idSteam: string;

  @Column({ nullable: true })
  idDiscord: string;

  @Column({ nullable: true, type: 'date' })
  fechaNacimiento: Date;

  @Column({ nullable: true, type: 'date' })
  fechaRegistro: string;

  @Column({ nullable: true })
  ciudad: string;

  @Column({ nullable: true })
  provincia: string;

  @ManyToOne(() => Pais, { eager: true })
  nacionalidad: Pais;

  @Column()
  @CreateDateColumn()
  createdAt: Date;

  @Column()
  @UpdateDateColumn()
  updatedAt: Date;

}
