import { Injectable, Inject } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Projeto } from './projeto.entity';

@Injectable()
export class ProjetoService {
  constructor(
    @Inject('Projeto_REPOSITORY')
    private projetoRepository: Repository<Projeto>,
  ) {}

  async findAll(): Promise<Projeto[]> {
    return this.projetoRepository.find();
  }
}