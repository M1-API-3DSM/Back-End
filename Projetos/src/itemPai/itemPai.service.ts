import { Injectable, Inject } from '@nestjs/common';
import { Repository } from 'typeorm';
import { ItemPai } from './itemPai.entity';

@Injectable()
export class ItemPaiService {
  constructor(
    @Inject('ItemPai_REPOSITORY')
    private itemPaiRepository: Repository<ItemPai>,
  ) {}

  async findAll(): Promise<ItemPai[]> {
    return this.itemPaiRepository.find();
  }
}