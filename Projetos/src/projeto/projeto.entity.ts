// projeto.entity.ts
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { ItemPai } from '../itemPai/itemPai.entity';

@Entity()
export class Projeto {
  @PrimaryGeneratedColumn()
  ID_Projeto: number;

  @Column({ type: 'varchar', length: 255 })
  nome: string;

  @OneToMany(() => ItemPai, itemPai => itemPai.projeto)
  itemPais: ItemPai[];
}
