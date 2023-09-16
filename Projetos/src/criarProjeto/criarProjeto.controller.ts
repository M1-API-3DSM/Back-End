import { Controller, Post, Body } from '@nestjs/common';
import { ProjetoService } from '../projeto/projeto.service';
import { Projeto } from '../projeto/projeto.entity';

@Controller('projetos/criar')
export class CriarProjetoController {
  constructor(private readonly projetoService: ProjetoService) {}

  @Post()
  async create(@Body() jsonData: any): Promise<Projeto | undefined> {
    try {
      const projeto = await this.projetoService.criarProjetoComJSON(jsonData);
      return projeto;
    } catch (error) {
      
      throw new Error('Erro ao criar o projeto a partir do JSON: ' + error.message);
    }
  }
}

