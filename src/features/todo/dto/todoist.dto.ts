import { Field, ObjectType } from "@nestjs/graphql";

@ObjectType()
class _dueDateDTO {
    @Field()
    date: string

    @Field()
    string: string

    @Field()
    lang: string

    @Field()
    is_recurring: boolean

}

@ObjectType()
export class TodoistDTO {
    @Field()
    id: string;
    @Field()
    assigner_id: string
    @Field()
    assignee_id: string
    @Field()
    project_id: string
    @Field()
    section_id: string
    @Field()
    parent_id: string
    @Field()
    order: number
    @Field()
    content: string
    @Field({nullable: true})
    description: string
    @Field()
    is_completed: boolean
    @Field()
    labels: string[]
    @Field()
    priority: number
    @Field()
    comment_count: number
    @Field()
    creator_id: string
    @Field()
    created_at: string
    @Field()
    due: _dueDateDTO
    @Field()
    url: string

}