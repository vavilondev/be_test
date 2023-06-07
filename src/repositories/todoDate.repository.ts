import { Injectable } from '@nestjs/common';
import { TodoDateEntity } from '../enities/todoDateGroup.entity';
import { DataSource, Repository } from 'typeorm';

@Injectable()
export class TodoDateRepository extends Repository<TodoDateEntity> {
  constructor(dataSource: DataSource) {
    super(TodoDateEntity, dataSource.createEntityManager());
  }
}
