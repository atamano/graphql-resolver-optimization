import { objectType } from '@nexus/schema';
import { API_RESSOURCE } from '../../datasource/mainAPI';
import { Car as ParentCar, Context } from '../../types/nexus/override';
import { CarResponse } from '../../datasource/types';
import { createFieldResolver } from '../utils';

async function resolverCallBack(
  parent: ParentCar,
  _args: unknown,
  { dataSources }: Context
): Promise<CarResponse> {
  return dataSources.mainAPI.getOne(API_RESSOURCE.CAR, parent.id);
}

export const Car = objectType({
  name: 'Car',
  definition(t) {
    t.id('id');
    t.string('model', {
      resolve: createFieldResolver('model', resolverCallBack),
    });
    t.string('registration_plate', {
      resolve: createFieldResolver('model', resolverCallBack),
    });
  },
});
