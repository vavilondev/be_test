import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { TodoDateEntity } from './todoDateGroup.entity';

@Entity({ name: 'todo_entity' })
export class TodoEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  description: string;

  @Column()
  is_completed: boolean;
  
  @ManyToOne(() => TodoDateEntity, todoDate => todoDate.todos)
  date: TodoDateEntity;
}