import { Module } from '@nestjs/common';
import { registerEnumType } from '@nestjs/graphql';
import { WebhookController } from './controllers/todoits/webhook.controller';
import { SortDirection } from './features/todo/dto/todo.dto';
import { TodoModule } from './features/todo/todo.module';
import { GraphqlModule } from './graphql/graphql.module';
import { DatabaseModule } from './providers/database/database.module';
import { SeedModule } from './seed/seed.module';


@Module({
  imports: [
    DatabaseModule,
    GraphqlModule,
    TodoModule,
    SeedModule
  ],
  controllers: [WebhookController],
  providers: [],
})
export class AppModule {
  constructor(){
    registerEnumType(SortDirection, {
      name: 'SortDirection',
    });
  }
}