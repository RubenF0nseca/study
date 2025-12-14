import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Task } from './entities/task.entity';

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

  findAll() {
    return this.tasks;
  }

  findOneTask(id: string) {
    const task = this.tasks.find((task) => task.id === Number(id));
    if (task) return task;

    throw new HttpException('Task not found', HttpStatus.NOT_FOUND);
    //throw new NotFoundException('Not found');
  }

  create(body: any) {
    const newId = this.tasks.length + 1;

    const newTask = {
      id: newId,
      ...body,
    };

    this.tasks.push(newTask);
    return newTask;
  }

  update(id: string, body: any) {
    const taskIndex = this.tasks.findIndex((task) => task.id === Number(id));

    if (taskIndex < 0) {
      throw new HttpException('Task not found', HttpStatus.NOT_FOUND);
    }

    const taskItem = this.tasks[taskIndex];

    this.tasks[taskIndex] = {
      ...taskItem,
      ...body,
    };

    return this.tasks[taskIndex];
  }
}
