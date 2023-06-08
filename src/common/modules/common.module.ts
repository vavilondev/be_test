import { Global, Module } from "@nestjs/common";
import { TodoRepository } from "../../repositories/todo.repository";

const repositories = [
  TodoRepository
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
