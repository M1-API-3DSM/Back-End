import { Injectable, Inject } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Tarefas } from './tarefas.entity';

@Injectable()
export class TarefasService {
  constructor(
    @Inject('Tarefas_REPOSITORY')
    private tarefasRepository: Repository<Tarefas>,
  ) {}

  async findAll(): Promise<Tarefas[]> {
    return this.tarefasRepository.find();
  }
}