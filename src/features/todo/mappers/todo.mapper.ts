import { Injectable } from '@nestjs/common';
import { BaseMapper } from 'src/utils/base.mapper';
import { TodoDTO } from '../dto/todo.dto';
import { TodoistDTO } from '../dto/todoist.dto';

@Injectable()
export class TodoMapper extends BaseMapper<TodoistDTO, TodoDTO> {
    constructor() {
        super();
      }
    
  public toDto(todoist: TodoistDTO): TodoDTO {
    return new TodoDTO({
      id: +todoist.id,
      title: todoist.content,
      description: todoist.description || "",
      is_completed: todoist.is_completed,
      date: new Date(todoist.created_at)
    });
  }
}
