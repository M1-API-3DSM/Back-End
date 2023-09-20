import { Controller, Get, Post, Put, Delete, Param, Body, ParseIntPipe } from '@nestjs/common';
import { ProjetoService } from './projeto.service';
import { Projeto } from './projeto.entity';

@Controller('projetos')
export class ProjetoController {
  constructor(private readonly projetoService: ProjetoService) {}

  @Get()
  async findAll(): Promise<Projeto[]> {
    return this.projetoService.findAll();
  }

  @Post()
  async create(@Body() projetoData: Partial<Projeto>): Promise<Projeto> {
    return this.projetoService.create(projetoData);
  }

  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number): Promise<Projeto | undefined> {
    return this.projetoService.findOne(id);
  }

  @Put(':id')
  async update(@Param('id', ParseIntPipe) id: number, @Body() projetoData: Partial<Projeto>): Promise<Projeto | undefined> {
    return this.projetoService.update(id, projetoData);
  }

  @Delete(':id')
  async remove(@Param('id', ParseIntPipe) id: number): Promise<void> {
    return this.projetoService.remove(id);
  }

  @Post('criarProjeto')
  async criarProjeto(@Body() jsonData: any): Promise<Projeto | undefined> {
    return this.projetoService.criarProjeto(jsonData);
  }
}
