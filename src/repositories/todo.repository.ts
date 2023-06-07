import { Injectable } from '@nestjs/common';
import { TodoEntity } from '../enities/todo.entity';
import { DataSource, Repository } from 'typeorm';

@Injectable()
export class TodoRepository extends Repository<TodoEntity> {
  constructor(dataSource: DataSource) {
    super(TodoEntity, dataSource.createEntityManager());
  }
}
