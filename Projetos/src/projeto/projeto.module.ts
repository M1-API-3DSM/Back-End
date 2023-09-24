import { Module } from '@nestjs/common';
import { DatabaseModule } from '../database/database.module';
import { projetoProviders } from './projeto.providers';
import { ProjetoService } from './projeto.service';
import { CriarProjetoController } from 'src/criarProjeto/criarProjeto.controller';
import { ItemService } from 'src/item/item.service';
import { itemProviders } from 'src/item/item.providers';
import { ProjetoController } from './projeto.controller';
import { UsuarioService } from 'src/usuario/usuario.service';
import { usuarioProviders } from 'src/usuario/usuario.providers';

@Module({
  imports: [DatabaseModule],
  providers: [
    ...projetoProviders,
    ...itemProviders,
    ...usuarioProviders,
    ProjetoService,
    ItemService,
    UsuarioService
  ],
  controllers: [CriarProjetoController, ProjetoController],
})
export class ProjetoModule {}
