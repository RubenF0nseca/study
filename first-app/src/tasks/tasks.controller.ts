import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
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

  @Patch(':id') // put is ===
  updateTask(@Param('id') id: string, @Body() body: any) {
    return this.taskService.update(id, body);
  }

  @Delete(':id')
  deleteTask(@Param('id') id: string) {
    return this.taskService.delete(id);
  }
}
