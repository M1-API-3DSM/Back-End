import { Injectable, Inject } from '@nestjs/common';
import { Repository } from 'typeorm';
import { ItemFilho } from './itemFilho.entity';

@Injectable()
export class ItemFilhoService {
  constructor(
    @Inject('ItemFilho_REPOSITORY')
    private itemFilhoRepository: Repository<ItemFilho>,
  ) {}

  async findAll(): Promise<ItemFilho[]> {
    return this.itemFilhoRepository.find();
  }
}