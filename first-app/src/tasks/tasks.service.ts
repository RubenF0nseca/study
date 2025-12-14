import { Injectable } from '@nestjs/common';

@Injectable()
export class TasksService {
  findAll() {
    return [{ id: 1, task: 'Comprar Pão' }];
  }

  findOneTask(id: string) {
    return 'Tarefa Ruben Teste...' + id;
  }
  create(body: any) {
    console.log('success');
    return body;
  }
}
