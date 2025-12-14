import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { TasksService } from './tasks.service';

@Controller('tasks')
export class TasksController {
  constructor(private readonly taskService: TasksService) {}

  @Get()
  findAllTasks() {
    return this.taskService.findAll();
  }

  @Get(':id')
  findTask(@Param('id') id: string) {
    return this.taskService.findOneTask(id);
  }

  @Post()
  createTask(@Body() body: any) {
    console.log(body);

    return this.taskService.create(body);
  }
}
