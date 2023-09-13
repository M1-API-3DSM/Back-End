// item-filho.entity.ts
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { ItemPai } from '../itemPai/itemPai.entity';
import { Projeto } from 'src/projeto/projeto.entity';

@Entity()
export class ItemFilho {
  @PrimaryGeneratedColumn()
  ID_Item_Filho: number;

  @Column({ type: 'varchar', length: 255 })
  Item: string;

  @ManyToOne(() => ItemPai, itemPai => itemPai.itemFilhos)
  itemPai: ItemPai;

  @ManyToOne(() => Projeto, projeto => projeto.itemPais)
  projeto: Projeto;
}
