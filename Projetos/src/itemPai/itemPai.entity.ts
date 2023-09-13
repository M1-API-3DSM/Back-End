// item-pai.entity.ts
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany } from 'typeorm';
import { Projeto } from '../projeto/projeto.entity';
import { ItemFilho } from '../itemFilho/itemFilho.entity';

@Entity()
export class ItemPai {
  @PrimaryGeneratedColumn()
  ID_Item_Pai: number;

  @Column({ type: 'varchar', length: 255 })
  item: string;

  @Column({ type: 'varchar', length: 255 })
  nome: string;

  @ManyToOne(() => Projeto, projeto => projeto.itemPais)
  projeto: Projeto;

  @OneToMany(() => ItemFilho, itemFilho => itemFilho.itemPai)
  itemFilhos: ItemFilho[];
}

