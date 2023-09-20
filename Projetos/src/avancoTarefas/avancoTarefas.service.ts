import { Injectable, Inject } from '@nestjs/common';
import { Repository } from 'typeorm';
import { AvancoTarefas } from './avancoTarefas.entity';

@Injectable()
export class AvancoTarefasService {
  constructor(
    @Inject('AvancoTarefas_REPOSITORY')
    private avancoTarefasRepository: Repository<AvancoTarefas>,
  ) {}

  async findAll(): Promise<AvancoTarefas[]> {
    return this.avancoTarefasRepository.find();
  }
}
