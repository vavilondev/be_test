import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType('Success')
export class SuccessDto {
  @Field()
  public readonly success: boolean;

  constructor(success = true) {
    this.success = success;
  }
}