// mongoose.config.ts
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ProjetoItem, ProjetoItemSchema } from 'src/projetoMongo/projetoItem.schema';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost:27017/'),
    MongooseModule.forFeature([{ name: ProjetoItem.name, schema: ProjetoItemSchema }]),
  ],
})
export class MongoModule {}
