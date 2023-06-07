import { Module } from '@nestjs/common';;
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
  controllers: [],
  providers: [],
})
export class AppModule {}