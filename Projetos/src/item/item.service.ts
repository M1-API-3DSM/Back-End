import { Injectable, Inject, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Item } from './item.entity';

@Injectable()
export class ItemService {
  constructor(
    @Inject('Item_REPOSITORY')
    private itemRepository: Repository<Item>,
  ) { }

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


  async findItensByProjeto(id: number): Promise<Item[]> {
    return this.itemRepository.find({ where: { projeto: { id_projeto: id } } });
  }

}
