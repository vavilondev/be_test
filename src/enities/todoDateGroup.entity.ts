import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { TodoEntity } from './todo.entity';

@Entity()
export class TodoDateEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'date', default: () => 'CURRENT_TIMESTAMP' })
  date: Date;

  @OneToMany(() => TodoEntity, todo => todo.date)
  todos: TodoEntity[];
}