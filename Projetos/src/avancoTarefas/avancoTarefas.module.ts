import { Module } from '@nestjs/common';
import { DatabaseModule } from '../database/database.module';
import { AvancoTarefasService } from './avancoTarefas.service';
import { avancoTarefasProviders } from './avancoTarefas.providers';

@Module({
  imports: [DatabaseModule],
  providers: [
    ...avancoTarefasProviders,
    AvancoTarefasService,
  ],
})
export class AvancoTarefasModule {}