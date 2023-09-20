import { Module } from '@nestjs/common';
import { DatabaseModule } from '../database/database.module';
import { projetoProviders } from './projeto.providers';
import { ProjetoService } from './projeto.service';
import { CriarProjetoController } from 'src/criarProjeto/criarProjeto.controller';
import { ItemService } from 'src/item/item.service';
import { itemProviders } from 'src/item/item.providers';
import { ProjetoController } from './projeto.controller';

@Module({
  imports: [DatabaseModule],
  providers: [
    ...projetoProviders,
    ...itemProviders,
    ProjetoService,
    ItemService,
  ],
  controllers: [CriarProjetoController, ProjetoController],
})
export class ProjetoModule {}
