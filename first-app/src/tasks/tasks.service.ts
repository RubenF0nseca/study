import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Task } from './entities/task.entity';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';

@Injectable()
export class TasksService {
  private tasks: Task[] = [
    {
      id: 1,
      name: 'task 1 name',
      description: 'task 1 description',
      completed: false,
    },
  ];

  findAll(): Task[] {
    return this.tasks;
  }

  findOneTask(id: string): Task {
    const task = this.tasks.find((task) => task.id === Number(id));
    if (task) return task;

    throw new HttpException('Task not found', HttpStatus.NOT_FOUND);
    //throw new NotFoundException('Not found');
  }

  create(createTaskDto: CreateTaskDto): Task {
    const newId = this.tasks.length + 1;

    const newTask: Task = {
      id: newId,
      ...createTaskDto,
      completed: false,
    };

    this.tasks.push(newTask);
    return newTask;
  }

  update(id: string, updateTaskDto: UpdateTaskDto): Task {
    const taskIndex = this.tasks.findIndex((task) => task.id === Number(id));

    if (taskIndex < 0) {
      throw new HttpException('Task not found', HttpStatus.NOT_FOUND);
    }

    const taskItem = this.tasks[taskIndex];

    const updatedTask: Task = {
      ...taskItem,
      ...updateTaskDto,
    };

    this.tasks[taskIndex] = updatedTask;

    return updatedTask;
  }

  delete(id: string): { message: string } {
    const taskIndex = this.tasks.findIndex((task) => task.id === Number(id));

    if (taskIndex < 0) {
      throw new HttpException('Task not found', HttpStatus.NOT_FOUND);
    }

    this.tasks.splice(taskIndex, 1);

    return { message: 'task deleted' };
  }
}
