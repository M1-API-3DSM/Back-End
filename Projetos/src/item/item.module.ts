import { Module } from '@nestjs/common';
import { DatabaseModule } from '../database/database.module';
import { itemProviders } from './item.providers';
import { ItemService } from './item.service';
import { CriarProjetoController } from 'src/criarProjeto/criarProjeto.controller';
import { ProjetoService } from 'src/projeto/projeto.service';
import { projetoProviders } from 'src/projeto/projeto.providers';
import { ItemController } from './item.controller';
import { UsuarioService } from 'src/usuario/usuario.service';
import { usuarioProviders } from 'src/usuario/usuario.providers';

@Module({
  imports: [DatabaseModule],
  providers: [
    ...itemProviders,
    ...projetoProviders,
    ...usuarioProviders,
    ItemService,
    ProjetoService,
    UsuarioService,
  ],
  controllers: [CriarProjetoController, ItemController],
})
export class ItemModule {}
