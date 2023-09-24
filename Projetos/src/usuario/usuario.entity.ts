import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
  JoinColumn,
} from 'typeorm';
import { Cargo } from '../cargo/cargo.entity';
import { Projeto } from '../projeto/projeto.entity';
import { Item } from 'src/item/item.entity';

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

  @Column( {nullable: true})
  nome_equipe: string;

  @OneToMany(() => Item, (item) => item.usuario)
  usuario: Usuario[];


  @ManyToOne(() => Cargo, (cargo) => cargo.usuarios)
  @JoinColumn({ name: 'cargo_id' })
  cargo: Cargo;

  @OneToMany(() => Projeto, (projeto) => projeto.usuario)
  projetos: Projeto[];
}
