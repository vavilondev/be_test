import { Resolver, Query, Mutation, Args, Int, Field, ObjectType } from '@nestjs/graphql';
import { SortDirection, TodoDTO } from './dto/todo.dto';
import { TodoEntity } from '../../enities/todo.entity';
import { TodosService } from './todo.service';
import { CreateTodoistInputDTO, UpdateTodoistInputDTO } from './dto/todoist.input.dto';
import { SuccessDto } from '../../common/dto/success.dto';

@ObjectType()
class GroupedTodosByExternal {
  @Field()
  is_external: boolean;

  @Field(() => [TodoDTO])
  todos: TodoDTO[];
}
@Resolver(() => TodoDTO)
export class TodosResolver {
  constructor(
    private todosService: TodosService,
    ) {}

  @Query(() => [TodoDTO])
  async todos(
    @Args('page') page: number,
    @Args('limit') limit: number,
    @Args('sortBy') sortBy: string,
    @Args('sortOrder', { type: () => SortDirection }) sortOrder: SortDirection,
    @Args('filter') filter?: string,
  ): Promise<TodoDTO[]> {
    const todos = await this.todosService.getAllTodos(page, limit, sortBy, sortOrder, filter);
    return todos;
  }

  @Mutation(() => SuccessDto)
  async createTodo(@Args('input') input: CreateTodoistInputDTO): Promise<SuccessDto> {
    return this.todosService.createTodo(input);
  }

  @Mutation(() => SuccessDto)
  async updateTodo(@Args('id', { type: () => Int }) id: number, @Args('input') input: UpdateTodoistInputDTO): Promise<SuccessDto> {
    return this.todosService.updateTodo(id, input);
  }

  @Query(() => [GroupedTodosByExternal])
  async groupedTodosByExternal(): Promise<GroupedTodosByExternal[]> {
    return this.todosService.groupTodosByExternal();
  }
}