import { makeSchema, fieldAuthorizePlugin } from '@nexus/schema';
import * as path from 'path';
import * as queries from '../../graphql/queries';
import * as typedefs from '../../graphql/typedefs';
import { GraphQLSchema } from 'graphql';

export const getNexusSchema = (): GraphQLSchema =>
  makeSchema({
    types: [typedefs, queries],
    shouldGenerateArtifacts: process.env.NODE_ENV === 'development',
    outputs: {
      schema: path.join(
        __dirname.replace(/\/dist$/, '/src'),
        '../../types/generated/nexusSchema.graphql'
      ),
      typegen: path.join(
        __dirname.replace(/\/dist$/, '/src'),
        '../../types/generated/nexusTypes.ts'
      ),
    },
    plugins: [],
    typegenAutoConfig: {
      sources: [
        {
          source: path.join(__dirname.replace(/\/dist$/, '/src'), '../../types/nexus/override.ts'),
          alias: 't',
        },
      ],
      contextType: 't.Context',
    },
    prettierConfig: path.join(__dirname, '../../../.prettierrc'),
    shouldExitAfterGenerateArtifacts: process.argv.includes('--generate-only'),
  });
