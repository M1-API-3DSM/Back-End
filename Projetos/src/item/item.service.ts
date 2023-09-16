import { Injectable, Inject, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Item } from './item.entity';
import { Projeto } from 'src/projeto/projeto.entity';

@Injectable()
export class ItemService {
  constructor(
    @Inject('Item_REPOSITORY')
    private itemRepository: Repository<Item>,
  ) {}

  async findAll(): Promise<Item[]> {
    return this.itemRepository.find();
  }

  async findOne(id: number): Promise<Item> {
    const item = await this.itemRepository.findOne({ where: { id_item: id } });

    if (!item) {
      throw new NotFoundException(`Item com ID ${id} não encontrado`);
    }

    return item;
  }

  async create(itemData: Partial<Item>): Promise<Item> {
    const newItem = this.itemRepository.create(itemData);
    return this.itemRepository.save(newItem);
  }

  async update(id: number, itemData: Partial<Item>): Promise<Item> {
    await this.findOne(id); // Verifica se o item existe

    await this.itemRepository.update(id, itemData);

    return this.findOne(id);
  }

  async remove(id: number): Promise<void> {
    const item = await this.findOne(id); // Verifica se o item existe
    await this.itemRepository.remove(item);
  }

  // async criarItemsJson(jsonData: any[], projeto:Projeto): Promise<void> {
  //   try {
  //     for (const row of jsonData) {
  //       for (const key in row) {
  //         if (Object.hasOwnProperty.call(row, key)) {
  //           const value = row[key];
  //           if (typeof value === 'string') { // Verifique se o valor é uma string
  //             const match = value.match(/(\d+)\s(.+)/);
  //             if (match) {
  //               const numero = match[1];
  //               const nome = match[2];

  //             const newItem = {
  //               item: numero,
  //               nome_item: nome,
  //               projeto:,
  //               itemPai_id:1,
  //               ultimo_filho:true
  //             };

  //             await this.itemRepository.save(newItem);
  //           }
  //           }
  //         }
  //       }
  //     }
  //   } catch (error) {
  //     throw new Error('Erro ao criar os itens a partir do JSON: ' + error.message);
  //   }
  // }
}
