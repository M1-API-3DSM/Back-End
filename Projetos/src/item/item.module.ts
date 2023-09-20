import { Module } from '@nestjs/common';
import { DatabaseModule } from '../database/database.module';
import { itemProviders } from './item.providers';
import { ItemService } from './item.service';
import { CriarProjetoController } from 'src/criarProjeto/criarProjeto.controller';
import { ProjetoService } from 'src/projeto/projeto.service';
import { projetoProviders } from 'src/projeto/projeto.providers';
import { ItemController } from './item.controller';

@Module({
  imports: [DatabaseModule],
  providers: [
    ...itemProviders,...projetoProviders,
    ItemService,ProjetoService
  ],
  controllers:[CriarProjetoController,ItemController]
})
export class ItemModule {}