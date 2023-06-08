import { Injectable } from '@nestjs/common';
import axios from 'axios';
import { SuccessDto } from 'src/common/dto/success.dto';
import { CreateTodoistInputDTO, UpdateTodoistInputDTO } from '../../features/todo/dto/todoist.input.dto';

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

  // todo: create type for Promise<any>
  async createTodoist(input: CreateTodoistInputDTO): Promise<SuccessDto> {
    await axios.post('https://api.todoist.com/rest/v2/tasks', {
      content: input.title,
      description: input.description,
    }, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${process.env.TODOIST_TOKEN}`,
      },
    });

    return {success: true};
  }

  async updateTodoist(id: number, input: UpdateTodoistInputDTO): Promise<SuccessDto> {
    // could be checked on what is True
    await axios.put(`https://api.todoist.com/rest/v2/tasks/${id}`, {
      ...(input.title && {content: input.title}),
      ...(input.title && {description: input.description}),
    }, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${process.env.TODOIST_TOKEN}`,
      },
    });

    return {success: true};
  }
}
