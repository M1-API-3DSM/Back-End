import { Controller, Get } from '@nestjs/common';
import { TasksService } from './tasks.service';

@Controller()
export class TasksController {
  constructor(private readonly taskService: TasksService) {}

  @Get()
  getHello(): string {
    return this.taskService.getHello();
  }
}
