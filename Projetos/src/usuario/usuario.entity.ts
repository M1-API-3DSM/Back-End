import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
} from 'typeorm';
import { Cargo } from '../cargo/cargo.entity';
import { Projeto } from '../projeto/projeto.entity';

@Entity()
export class Usuario {
  @PrimaryGeneratedColumn()
  id_usuario: number;

  @Column()
  login: string;

  @Column()
  senha: string;

  @Column()
  nome: string;

  @ManyToOne(() => Cargo, (cargo) => cargo.usuarios)
  cargo: Cargo;

  @OneToMany(() => Projeto, (projeto) => projeto.usuario)
  projetos: Projeto[];
}
