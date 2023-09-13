import { Module } from '@nestjs/common';
import { DatabaseModule } from '../database/database.module';
import { projetoProviders } from './projeto.providers';
import { ProjetoService } from './projeto.service';

@Module({
  imports: [DatabaseModule],
  providers: [
    ...projetoProviders,
    ProjetoService,
  ],
})
export class ProjetoModule {}