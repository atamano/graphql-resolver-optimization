import { ExpressContext } from 'apollo-server-express/dist/ApolloServer';
import { Context } from './types/nexus/override';

export function getContext({ req }: ExpressContext): Omit<Context, 'dataSources'> {
  return {};
}
