import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Item } from '../item/item.entity';

@Entity()
export class Tarefas {
  @PrimaryGeneratedColumn()
  id_tarefas: number;

  @Column()
  nome_tarefa: string;

  @Column()
  peso_tarefa: number;

  @ManyToOne(() => Item, (item) => item.tarefas)
  item: Item;
}
