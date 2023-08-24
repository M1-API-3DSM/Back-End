import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TasksModule } from './Tasks/tasks.module';

@Module({
  imports: [TasksModule, MongooseModule.forRoot('mongodb://localhost:27017/')],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
