import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Usuario } from '../usuario/usuario.entity';

@Entity()
export class Cargo {
  @PrimaryGeneratedColumn()
  id_cargo: number;

  @Column()
  nome: string;

  @OneToMany(() => Usuario, (usuario) => usuario.cargo)
  usuarios: Usuario[];
}
