import { Field, ID, ObjectType } from "@nestjs/graphql";

@ObjectType()
export class TodoDTO {
    constructor(partial: Partial<TodoDTO>) {
        Object.assign(this, partial);
    }
    @Field(type => ID)
    id: number;
    @Field()
    title: string
    @Field()
    description: string
    @Field()
    is_completed: boolean
    @Field()
    date: Date
    @Field()
    is_external: boolean
    @Field({nullable: true})
    external_id: string
}

export enum SortDirection {
    ASC = 'ASC',
    DESC = 'DESC',
}

