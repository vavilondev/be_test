import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { options } from '../../data-source';

export const DatabaseModule = TypeOrmModule.forRootAsync({
  useFactory: (): TypeOrmModuleOptions => {
    return {
      ...options,
    };
  },
});
