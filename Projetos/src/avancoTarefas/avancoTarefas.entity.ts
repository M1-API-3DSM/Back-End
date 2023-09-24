import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Item } from '../item/item.entity';

@Entity()
export class AvancoTarefas {
  @PrimaryGeneratedColumn()
  id_avanco: number;

  @Column()
  data: Date;

  @Column()
  avanco: number;

  @ManyToOne(() => Item, (item) => item.avancoTarefas)
  item: Item;
}
