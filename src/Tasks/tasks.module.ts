import { Module } from '@nestjs/common';
import { Task, TaskSchema } from './schemas/task.schema';
import { TasksController } from './tasks.controller';
import { TasksService } from './tasks.service';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Task.name, schema: TaskSchema }]),
  ],
  controllers: [TasksController],
  providers: [TasksService],
})
export class TasksModule {}
