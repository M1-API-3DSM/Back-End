import { Module } from '@nestjs/common';
import { DatabaseModule } from '../database/database.module';
import { projetoProviders } from './projeto.providers';
import { ProjetoService } from './projeto.service';
import { CriarProjetoController } from 'src/criarProjeto/criarProjeto.controller';

@Module({
  imports: [DatabaseModule],
  providers: [
    ...projetoProviders,
    ProjetoService,
  ],
  controllers: [CriarProjetoController]
})
export class ProjetoModule {}