require('dotenv').config();

import { getContext } from './context';
import { MainAPI } from './datasource/mainAPI';
import { createApolloServer, createExpressApp } from './services';
import { getNexusSchema } from './services/nexus';
import { Context } from './types';

function getDataSource(): Context['dataSources'] {
  return {
    mainAPI: new MainAPI(),
  };
}

const app = createExpressApp();

const server = createApolloServer(getNexusSchema, getDataSource, getContext);

server.applyMiddleware({ app });

app.listen({ port: process.env.API_PORT }, () =>
  console.log(`🚀 Server ready at http://localhost:${process.env.API_PORT}/graphql`)
);
