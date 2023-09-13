import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProjetoModule } from './projeto/projeto.module';
import { DatabaseModule } from './database/database.module';
import { ItemPaiModule } from './itemPai/itemPai.module';
import { ItemFilhoModule } from './itemFilho/itemFilho.module';

@Module({
  imports: [ProjetoModule, DatabaseModule, ItemPaiModule, ItemFilhoModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
