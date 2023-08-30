import { Body, Controller, HttpCode, Post } from '@nestjs/common';
import { CreateTaskDTO } from './dto/createTask.dto';
import { TasksService } from './tasks.service';
import { Task } from './schemas/task.schema';

@Controller('tasks')
export class TasksController {
  constructor(private readonly taskService: TasksService) {}

  @Post()
  @HttpCode(201)
  createTask(@Body() createTaskDto: CreateTaskDTO): Promise<Task> {
    return this.taskService.createTask(createTaskDto);
  }
}
