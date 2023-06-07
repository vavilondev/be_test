import { Injectable } from '@nestjs/common';
import axios from 'axios';
import { TodoistDTO } from '../../features/todo/dto/todoist.dto';
import { TodoDTO } from '../../features/todo/dto/todo.dto';
import { CreateTodoistInputDTO } from '../../features/todo/dto/todoist.input.dto';

@Injectable()
export class TodoistService {
  private baseUrl = 'https://api.todoist.com/rest/v2';

  async getTodos(token: string): Promise<any> {
    const url = `${this.baseUrl}/tasks`;
    const headers = {
      Authorization: `Bearer ${token}`,
    };

    try {
      const response = await axios.get(url, { headers });
      return response.data;
    } catch (error) {
      throw new Error(`${error}, 'Failed to retrieve tasks from the API`);
    }
  }

  async createTodoist(input: CreateTodoistInputDTO): Promise<Pick<TodoistDTO, 'id' | 'description' | 'content'| 'created_at'>> {
    const response = await axios.post('https://api.todoist.com/rest/v2/tasks', {
      content: input.title,
      description: input.description,
    }, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${process.env.TODOIST_TOKEN}`,
      },
    });
    console.log(response)
    const createdTask = response.data;

    const todo = {
      id: createdTask.id,
      content: createdTask.content,
      description: createdTask.description,
      created_at: createdTask.created_at
    };

    return todo;
  }
}
