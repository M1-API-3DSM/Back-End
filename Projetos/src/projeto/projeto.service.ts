import { Injectable, Inject } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Projeto } from './projeto.entity';

@Injectable()
export class ProjetoService {
  constructor(
    @Inject('Projeto_REPOSITORY')
    private projetoRepository: Repository<any>,
  ) {}

  async findAll(): Promise<Projeto[]> {
    return this.projetoRepository.find();
  }

  async create(projetoData: Partial<Projeto>): Promise<Projeto> {
    const projeto = this.projetoRepository.create(projetoData);
    return this.projetoRepository.save(projeto);
  }

  async findOne(id: number): Promise<Projeto | undefined> {
    return this.projetoRepository.findOne({ where: { id_projeto: id } });
  }
  
  async update(id: number, projetoData: Partial<Projeto>): Promise<Projeto | undefined> {
    await this.projetoRepository.update(id, projetoData);
    return this.findOne(id);
  }

  async remove(id: number): Promise<void> {
    await this.projetoRepository.delete(id);
  }

  async criarProjeto(jsonData: any): Promise<Projeto | undefined> {
    if (!Array.isArray(jsonData) || jsonData.length === 0) {
      throw new Error('O JSON deve ser um array não vazio.');
    }

    // Extrai o nome do projeto da primeira linha do JSON
    const nomeProjeto = Object.keys(jsonData[0])[0];

    if (!nomeProjeto) {
      throw new Error('Nome do projeto não encontrado no JSON.');
    }

    const projeto = await this.projetoRepository.create({ nome_projeto: nomeProjeto });
    await this.projetoRepository.save(projeto);

    return projeto;
  }    
}
