import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
  ParseIntPipe,
} from '@nestjs/common';
import { UsuarioService } from './usuario.service';
import { Usuario } from './usuario.entity';

@Controller('usuarios')
export class ProjetoController {
  constructor(private readonly usuarioService: UsuarioService) {}

  @Get()
  async findAll(): Promise<Usuario[]> {
    return this.usuarioService.findAll();
  }

  @Post()
  async create(@Body() projetoData: Partial<Usuario>): Promise<Usuario> {
    return this.usuarioService.create(projetoData);
  }

  @Get(':id')
  async findOne(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<Usuario | undefined> {
    return this.usuarioService.findOne(id);
  }

  @Put(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() usuarioData: Partial<Usuario>,
  ): Promise<Usuario | undefined> {
    return this.usuarioService.update(id, usuarioData);
  }

  @Delete(':id')
  async remove(@Param('id', ParseIntPipe) id: number): Promise<void> {
    return this.usuarioService.remove(id);
  }

  @Post('criar_usuarios')
  async create_with_xslsx(@Body() parsedData: any): Promise<Usuario | undefined> {
    console.log(parsedData)
    return this.usuarioService.create_many(parsedData);
  }
}
