import { Module } from '@nestjs/common';
import { TodoistModule } from '../../providers/todoist/todoits.module';
import { TodosResolver } from './todo.resolver';
import { TodosService } from './todo.service';

@Module({
    imports: [TodoistModule],
    exports: [],
    providers: [TodosService, TodosResolver]
})
export class TodoModule {}
