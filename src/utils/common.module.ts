import { Global, Module } from "@nestjs/common";
import { TodoDateRepository } from "../repositories/todoDate.repository";
import { TodoRepository } from "../repositories/todo.repository";

const repositories = [
  TodoRepository,
  TodoDateRepository
];

@Global()
@Module({
  imports: [],
  providers: [
    ...repositories,
  ],
  exports: [ ...repositories],
})
export class CommonModule {}
