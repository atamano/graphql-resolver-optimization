import { queryField, idArg } from '@nexus/schema';
import { User } from '../typedefs';
import { API_RESSOURCE } from '../../datasource/mainAPI';

export const GetUserQuery = queryField('user', {
  type: User,
  args: {
    id: idArg({ required: true }),
  },
  resolve(_, { id }) {
    return { id };
  },
});

export const GetUsersQuery = queryField('users', {
  type: User,
  list: true,
  resolve(_, {}, { dataSources }) {
    return dataSources.mainAPI.getMany(API_RESSOURCE.USER);
  },
});
