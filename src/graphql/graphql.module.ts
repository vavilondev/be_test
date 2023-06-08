import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { GraphQLModule } from '@nestjs/graphql';
import { CommonModule } from '../common/modules/common.module';

export const GraphqlModule = GraphQLModule.forRootAsync<ApolloDriverConfig>({
  imports: [CommonModule],
  driver: ApolloDriver,
  useFactory: () => {
    return {
      autoSchemaFile: true,
      sortSchema: true
    };
  },
});
