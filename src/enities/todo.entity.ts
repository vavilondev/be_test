import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';

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
  
  @Column()
  date: Date;

  @Column()
  is_external: boolean

  @Column({nullable: true, type: 'varchar' })
  external_id: string
}

