import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
  JoinColumn,
} from 'typeorm';
import { Usuario } from '../usuario/usuario.entity';
import { Item } from '../item/item.entity';

@Entity()
export class Projeto {
  @PrimaryGeneratedColumn()
  id_projeto: number;

  @Column()
  nome_projeto: string;

  @Column({ nullable: true })
  material_total: number;

  @Column({ nullable: true })
  hora_homem_total: number;

  @ManyToOne(() => Usuario, (usuario) => usuario.projetos, { nullable: true })
  @JoinColumn({ name: 'usuario_id' })
  usuario: Usuario;

  @OneToMany(() => Item, (item) => item.projeto)
  itens: Item[];
}
