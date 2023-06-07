import { Field, InputType } from "@nestjs/graphql";

@InputType()
export class CreateTodoistInputDTO {
  @Field()
  title: string;

  @Field()
  description: string;
}