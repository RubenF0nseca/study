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
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { Task } from './entities/task.entity';

@Controller('tasks')
export class TasksController {
  constructor(private readonly taskService: TasksService) {}

  @Get()
  findAllTasks(): Task[] {
    return this.taskService.findAll();
  }

  @Get(':id')
  findTask(@Param('id') id: string): Task {
    return this.taskService.findOneTask(id);
  }

  @Post()
  createTask(@Body() createTaskDto: CreateTaskDto): Task {
    return this.taskService.create(createTaskDto);
  }

  @Patch(':id')
  updateTask(
    @Param('id') id: string,
    @Body() updateTaskDto: UpdateTaskDto,
  ): Task {
    return this.taskService.update(id, updateTaskDto);
  }

  @Delete(':id')
  deleteTask(@Param('id') id: string): { message: string } {
    return this.taskService.delete(id);
  }
}
