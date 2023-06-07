import { Field, InputType } from "@nestjs/graphql";

@InputType()
export class CreateTodoInputDTO {
  @Field()
  title: string;

  @Field()
  description: string;

  @Field({nullable: true})
  is_completed: boolean;

  @Field({nullable:true})
  date: Date
}

@InputType()
export class UpdateTodoInputDTO {
  @Field({ nullable: true })
  title?: string;

  @Field({ nullable: true })
  description?: string;

  @Field({ nullable: true })
  is_completed?: boolean;
}