import { objectType } from '@nexus/schema';
import { API_RESSOURCE } from '../../datasource/mainAPI';
import { UserResponse } from '../../datasource/types';
import { Context, User as ParentUser } from '../../types/nexus/override';
import { Car } from './car.typedef';
import { createFieldResolver } from '../utils';

async function resolverCallBack(
  parent: ParentUser,
  _args: unknown,
  { dataSources }: Context
): Promise<UserResponse> {
  return dataSources.mainAPI.getOne(API_RESSOURCE.USER, parent.id);
}

export const User = objectType({
  name: 'User',
  definition(t) {
    t.id('id');
    t.string('firstName', {
      resolve: createFieldResolver('firstName', resolverCallBack),
    });
    t.string('lastName', {
      resolve: createFieldResolver('firstName', resolverCallBack),
    });
    t.list.field('cars', {
      type: Car,
      resolve: async (user, {}, { dataSources }) => {
        if ('cars' in user) {
          return user.cars;
        }

        return dataSources.mainAPI.getUserCars(user.id);
      },
    });
  },
});
