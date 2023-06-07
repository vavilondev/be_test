import { Injectable, NotFoundException } from '@nestjs/common';
import { TodoRepository } from '../../repositories/todo.repository';
import { TodoEntity } from '../../enities/todo.entity';
import { UpdateTodoInputDTO } from './dto/todo.input.dto';
import { TodoDateRepository } from '../../repositories/todoDate.repository';
import { TodoistService } from 'src/providers/todoist/todoist.service';
import { CreateTodoistInputDTO } from './dto/todoist.input.dto';

@Injectable()
export class TodosService {
  constructor(
    private readonly todoRepository: TodoRepository,
    private readonly todoDateRepository: TodoDateRepository,
    private readonly todoistService: TodoistService,
  ) { }

  public async seed() {
    await this.todoRepository.delete({});
    await this.todoDateRepository.delete({});

    const todoDate = this.todoDateRepository.create({
      date: new Date(),
    });
    await this.todoDateRepository.save([todoDate])
    const todo1 = this.todoRepository.create({
      title: "Title 1",
      description: "Description 1",
      is_completed: false,
      date: todoDate
    });

    const todo2 = this.todoRepository.create({
      title: "Title 2",
      description: "Description 2",
      is_completed: false,
      date: todoDate
    });

    await this.todoRepository.save([todo1, todo2]);
  }

  async createTodo(input: CreateTodoistInputDTO): Promise<TodoEntity> {
    const todoist = await this.todoistService.createTodoist(input)
    const todoDate = this.todoDateRepository.create({
        date: new Date(todoist.created_at),
      });
      await this.todoDateRepository.save([todoDate])
    const todo = {
      title: todoist.content,
      description: todoist.description,
      date: todoDate,
      is_completed: false
    }
    return this.todoRepository.save(todo);
  }

  async getAllTodos(): Promise<TodoEntity[]> {
    const todos = await this.todoRepository
      .createQueryBuilder('todo_entity')
      .leftJoinAndSelect('todo_entity.date', 'date')
      .getMany();
    return todos
  }

  async getAllTodosByDate(date: Date): Promise<TodoEntity[]> {
    const todoDate = await this.todoDateRepository.findOne({ where: { date } });
    if (!todoDate) {
      throw new NotFoundException('TodoDate not found');
    }
    return this.todoRepository.find({ where: { date: { id: todoDate.id } } });
  }

  async getTodoById(id: number): Promise<TodoEntity> {
    const todo = await this.todoRepository.findOne({ where: { id } });
    if (!todo) {
      throw new NotFoundException('Todo not found');
    }
    return todo;
  }

  async updateTodo(id: number, input: UpdateTodoInputDTO): Promise<TodoEntity> {
    try {
      const todo = await this.todoRepository.findOne({ where: { id } });
      if(!!todo) {
        return this.todoRepository.save({ ...todo, ...input });
      } else {
        // this.todoistService.
      }
    } catch (e) {
      throw new NotFoundException('Todo not found');
    }


  }

  async deleteTodo(id: number): Promise<void> {
    const result = await this.todoRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException('Todo not found');
    }
  }
}