import { Module } from '@nestjs/common';
import { SeedService } from './seed.service';
import { TodosService } from '../features/todo/todo.service';
import { TodoistModule } from '../providers/todoist/todoits.module';

@Module({
  imports: [TodoistModule],
  providers: [SeedService, TodosService],
})
export class SeedModule {}