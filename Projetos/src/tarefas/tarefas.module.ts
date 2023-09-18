import { Module } from '@nestjs/common';
import { DatabaseModule } from '../database/database.module';
import { tarefasProviders } from './tarefas.providers';
import { TarefasService } from './tarefas.service';

@Module({
  imports: [DatabaseModule],
  providers: [
    ...tarefasProviders,
    TarefasService,
  ],
})
export class TarefasModule {}