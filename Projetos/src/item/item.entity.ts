import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany, JoinColumn } from 'typeorm';
import { Projeto } from '../projeto/projeto.entity';
import { Tarefas } from 'src/tarefas/tarefas.entity';
import { AvancoTarefas } from 'src/avancoTarefas/avancoTarefas.entity';

@Entity({ name: 'item' }) // Defina o nome da tabela em maiúsculas
export class Item {
  @PrimaryGeneratedColumn()
  id_item: number;

  @Column()
  item:string;
  
  @Column()
  nome_item:string;

  @Column({ nullable: true })
  material: number;

  @Column({ nullable: true })
  hora_homem: number;

  @ManyToOne(() => Projeto, (projeto) => projeto.itens)
  @JoinColumn({ name: 'projeto_Id' })
  projeto: Projeto;

  @ManyToOne(() => Item, (item) => item, { nullable: true })
  @JoinColumn({ name: 'itemPai_id' }) // Chave estrangeira para o item pai
  itemPai: Item;

  @OneToMany(() => Tarefas, (tarefa) => tarefa.item)
  tarefas: Tarefas[];

  @OneToMany(() => AvancoTarefas, (avancoTarefa) => avancoTarefa.item)
  avancoTarefas: AvancoTarefas[];
}

