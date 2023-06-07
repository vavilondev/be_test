import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { TodoDTO } from './dto/todo.dto';
import { TodoEntity } from '../../enities/todo.entity';

import { UpdateTodoInputDTO} from './dto/todo.input.dto';
import { TodosService } from './todo.service';
import { TodoByDateInputDTO } from './dto/todoByDate.input.dto';
import { TodoistService } from 'src/providers/todoist/todoist.service';
import { TodoMapper } from './mappers/todo.mapper';
import { CreateTodoistInputDTO } from './dto/todoist.input.dto';

@Resolver(() => TodoDTO)
export class TodosResolver {
  constructor(
    private todosService: TodosService,
    private readonly todoistService: TodoistService,
    private readonly todoMapper: TodoMapper,
    ) {}

  @Query(() => [TodoDTO])
  async todos(): Promise<TodoDTO[]> {
    const todoistData = await this.todoistService.getTodos(process.env.TODOIST_TOKEN);
    const todos = await this.todosService.getAllTodos();
    return [
      ...todos.map(todo => ({
      id: todo.id,
      title: todo.title,
      description: todo.description,
      is_completed: todo.is_completed,
      date: new Date(todo.date.date)
      })),

      ...this.todoMapper.toDtos(todoistData)
    ];
  }

  @Query(() => TodoDTO)
  async todo(@Args('id', { type: () => Int }) id: number): Promise<TodoEntity> {
    return this.todosService.getTodoById(id);
  }

  @Query(() => [TodoDTO])
  async todosByDate(@Args('input') input: TodoByDateInputDTO): Promise<TodoDTO[]> {
    const { date: todoDate } = input;
    const todos = await this.todosService.getAllTodosByDate(todoDate);
    return todos.map(todo => ({
      id: todo.id,
      title: todo.title,
      description: todo.description,
      is_completed: todo.is_completed,
      date: new Date(input.date)
    }));
  }

  @Mutation(() => TodoDTO)
  async createTodo(@Args('input') input: CreateTodoistInputDTO): Promise<TodoEntity> {
    return this.todosService.createTodo(input);
  }

  @Mutation(() => TodoDTO)
  async updateTodo(@Args('id', { type: () => Int }) id: number, @Args('input') input: UpdateTodoInputDTO): Promise<TodoEntity> {
    return this.todosService.updateTodo(id, input);
  }

  @Mutation(() => Boolean)
  async deleteTask(@Args('id', { type: () => Int }) id: number): Promise<boolean> {
    await this.todosService.deleteTodo(id);
    return true;
  }
}