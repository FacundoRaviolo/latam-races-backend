import {Entity, PrimaryGeneratedColumn, Column, Unique, CreateDateColumn, UpdateDateColumn, BaseEntity} from 'typeorm';
import * as bcrypt from 'bcryptjs';

@Entity()
@Unique(['username', 'email'])
export class User extends BaseEntity {

  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  username: string;

  @Column()
  email: string;

  @Column()
  role: string;

  @Column()
  password: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  hashPassword(): void {
    const salt = bcrypt.genSaltSync(10);
    this.password = bcrypt.hashSync(this.password, salt);
  }

  checkPassword(password: string): boolean {
    return bcrypt.compareSync(password, this.password);
  }
}
