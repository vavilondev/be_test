import { Controller, Post, Body } from '@nestjs/common';
import { TodoEntity } from '../../enities/todo.entity';
import { TodoRepository } from '../../repositories/todo.repository';
import {findObjectDifference} from '../../utils/diff'

@Controller('webhook')
export class WebhookController {
    constructor(
        private todosRepository: TodoRepository,
    ) {}
  @Post('todoist')
  async handleTodoistWebhook(@Body() webhookData: any) {
    const {event_name, event_data, event_data_extra} = webhookData;
    console.log(webhookData)
    switch (event_name) {
        //todo: enum
        case 'item:added':
            this.saveTask(event_data)
            break;
        case 'item:updated':
            const diff = findObjectDifference(event_data_extra.old_item ,event_data)
            this.updateTask({...diff, external_id: event_data.id})
            break;
    
        default:
            break;
    }
  }

  // TODO: webhook dto
  private async saveTask(data: any) {
    const todo = new TodoEntity()
    todo.date = data.added_at
    todo.description = data.description
    todo.external_id = data.id
    todo.is_completed = false
    todo.is_external = true
    todo.title = data.content
    await this.todosRepository.save([todo])
    return { success: true };
  }

  // toEntity or field mapper could be added if needed
  private async updateTask (data: any) {
    const todo = await this.todosRepository.findOne({where: {external_id: data.external_id}})
    await this.todosRepository.save({id:todo.id, ...data})
    return { success: true };
  }
}