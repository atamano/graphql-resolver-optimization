/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { ApolloServer } from 'apollo-server-express';
import { ExpressContext } from 'apollo-server-express/dist/ApolloServer';
import { Context } from '../../types';
import { GraphQLSchema } from 'graphql';

export const createApolloServer = (
  schema: () => GraphQLSchema,
  dataSources: () => Context['dataSources'],
  context: (context: ExpressContext) => Omit<Context, 'dataSources'>
): ApolloServer => {
  return new ApolloServer({
    schema: schema(),
    tracing: false,
    cacheControl: false,
    engine: false,
    playground: true,
    debug: true,
    dataSources,
    context,
    plugins: [],
  });
};
