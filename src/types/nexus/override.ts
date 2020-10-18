import { MainAPI, ResponsesMapper, API_RESSOURCE } from '../../datasource/mainAPI';
import { UserResponse, CarResponse } from '../../datasource/types';

type PartialWithMandatoryFields<S, K extends keyof S> = S | Pick<S, K>;

/**
 * Override nexus parent resolvers
 */

export type User = PartialWithMandatoryFields<UserResponse, 'id'>;
export type Car = PartialWithMandatoryFields<CarResponse, 'id'>;

/**
 * Apollo Context
 */
export interface Context {
  dataSources: {
    mainAPI: MainAPI;
  };
}
