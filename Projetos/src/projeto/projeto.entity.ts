import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany } from 'typeorm';
import { Usuario } from '../usuario/usuario.entity';
import { Item } from '../item/item.entity';

@Entity()
export class Projeto {
  @PrimaryGeneratedColumn()
  id_projeto: number;

  @Column()
  nome_projeto: string;

  @Column()
  material_total: number;

  @Column()
  hora_homem_total: number;

  @ManyToOne(() => Usuario, (usuario) => usuario.projetos)
  usuario: Usuario;

  @OneToMany(() => Item, (item) => item.projeto)
  itens: Item[];
}
