import { Injectable, NotFoundException } from '@nestjs/common';
import { TodoRepository } from '../../repositories/todo.repository';
import { TodoEntity } from '../../enities/todo.entity';
import { TodoistService } from '../../providers/todoist/todoist.service';
import { CreateTodoistInputDTO, UpdateTodoistInputDTO } from './dto/todoist.input.dto';
import { SortDirection } from './dto/todo.dto';
import { SuccessDto } from 'src/common/dto/success.dto';

@Injectable()
export class TodosService {
  constructor(
    private readonly todoRepository: TodoRepository,
    private readonly todoistService: TodoistService,
  ) { }

  public async seed() {
    await this.todoRepository.delete({});

    const todo1 = this.todoRepository.create({
      title: "Title 1",
      description: "Description 1",
      is_completed: false,
      date: new Date(),
      is_external: false,
      external_id: null
    });

    const todo2 = this.todoRepository.create({
      title: "Title 2",
      description: "Description 2",
      is_completed: false,
      date: new Date(),
      is_external: false,
      external_id: null
    });

    await this.todoRepository.save([todo1, todo2]);
  }

  async createTodo(input: CreateTodoistInputDTO): Promise<SuccessDto> {
    try {
      return await this.todoistService.createTodoist(input)
    } catch (e) {
      throw new NotFoundException('Todo not found');
    }
  }

  async getAllTodos(
    page: number,
    limit: number,
    sort?: string,
    sortOrder: SortDirection = SortDirection.ASC,
    filter?: string,
  ): Promise<TodoEntity[]> {
    const skip = (page - 1) * limit;

    const queryBuilder = this.todoRepository
      .createQueryBuilder('todo')
      .orderBy(sort ? { [sort]: sortOrder } : null)
      .skip(skip)
      .take(limit);

    if (filter) {
      queryBuilder.andWhere('todo.title LIKE :filter', { filter: `%${filter}%` });
    }

    const todos = await queryBuilder.getMany();
    return todos;
  }

  async groupTodosByExternal(): Promise<{ is_external: boolean; todos: TodoEntity[] }[]> {
    const todos = await this.todoRepository.find();
    const groupedTodos = todos.reduce((groups, todo) => {
      const isExternal = todo.is_external;
      if (!groups[String(isExternal)]) {
        groups[String(isExternal)] = [];
      }
      groups[String(isExternal)].push(todo);
      return groups;
    }, {});
    return Object.keys(groupedTodos).map((isExternal) => ({
      is_external: isExternal === 'true',
      todos: groupedTodos[isExternal],
    }));
  }

  async updateTodo(id: number, input: UpdateTodoistInputDTO): Promise<SuccessDto> {
    try {
      await this.todoistService.updateTodoist(id, input)
      return {success: true}
   } catch (e) {
     throw new NotFoundException('Todo not found');
   }
  }
}