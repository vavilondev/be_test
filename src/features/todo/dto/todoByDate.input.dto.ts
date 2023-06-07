import { Field, InputType } from "@nestjs/graphql";

@InputType()
export class TodoByDateInputDTO {
  @Field()
  date: Date
}