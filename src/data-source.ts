import { DataSource, DataSourceOptions } from 'typeorm';
import { TodoEntity } from './enities/todo.entity';

const {
  POSTGRES_DATABASE,
  POSTGRES_HOST,
  POSTGRES_PASSWORD,
  POSTGRES_PORT,
  POSTGRES_USER,
} = process.env;


export const entities = [
    TodoEntity,
];

export const options: DataSourceOptions = {
  type: 'postgres',
  host: POSTGRES_HOST || 'localhost',
  port: POSTGRES_PORT ? +POSTGRES_PORT : 5432,
  database: POSTGRES_DATABASE || 'postgres',
  username: POSTGRES_USER || 'postgres',
  password: POSTGRES_PASSWORD || 'root',
  entities,
  synchronize: true
};

const dataSource = new DataSource(options);

export default dataSource;
