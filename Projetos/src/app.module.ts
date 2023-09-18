import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProjetoModule } from './projeto/projeto.module';
import { DatabaseModule } from './database/database.module';
import { UsuarioModule } from './usuario/usuario.module';
import { TarefasModule } from './tarefas/tarefas.module';
import { ItemModule } from './item/item.module';
import { CargoModule } from './cargo/cargo.module';
import { AvancoTarefasModule } from './avancoTarefas/avancoTarefas.module';
import { MongoModule } from './database/mongodb.module';


@Module({
  imports: [ProjetoModule, DatabaseModule,UsuarioModule,TarefasModule,ItemModule,CargoModule,AvancoTarefasModule,MongoModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
