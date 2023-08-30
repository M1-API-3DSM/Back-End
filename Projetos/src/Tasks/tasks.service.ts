import { Model } from 'mongoose';
import { Task } from './schemas/task.schema';
import { Injectable } from '@nestjs/common';
import { CreateTaskDTO } from './dto/createTask.dto';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class TasksService {
  constructor(@InjectModel(Task.name) private taskModel: Model<Task>) {}

  async createTask(createTaskDto: CreateTaskDTO): Promise<Task> {
    const createdCat = new this.taskModel(createTaskDto);
    return createdCat.save();
  }
}
