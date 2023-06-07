import { Injectable } from '@nestjs/common';
import { TodosService } from '../features/todo/todo.service';

@Injectable()
export class SeedService {
  constructor(private readonly todosService: TodosService) {}

  public async seed() {
    console.log('Seed started.');
    await this.todosService.seed();
    console.log('Seed completed.');
  }
}