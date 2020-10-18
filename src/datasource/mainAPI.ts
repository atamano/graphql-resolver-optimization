import { RESTDataSource } from 'apollo-datasource-rest';
import * as DataLoader from 'dataloader';
import { GraphQLError } from 'graphql';
import { chunk, flatten } from 'lodash';
import { UserResponse, CarResponse } from './types';
import { stringify } from 'qs';

type Node = { id: string };

const MAX_ITEMS_PER_PAGE = 100;

export enum API_RESSOURCE {
  USER = 'users',
  CAR = 'cars',
}

export type ResponsesMapper = {
  [API_RESSOURCE.USER]: UserResponse;
  [API_RESSOURCE.CAR]: CarResponse;
};

function checkDataloaderDefined<T>(item: T | undefined): T {
  if (typeof item === 'undefined') {
    throw new GraphQLError('Api did not return all fetched elements');
  }
  return item;
}

export class MainAPI extends RESTDataSource {
  loaders: Record<string, DataLoader<string, any>>;

  constructor() {
    super();
    this.baseURL = `http://localhost:${process.env.API_PORT}`;
    this.loaders = {};
  }

  private getLoader<K extends API_RESSOURCE, T>(key: K): DataLoader<string, ResponsesMapper[K]> {
    if (!(key in this.loaders)) {
      this.loaders[key] = new DataLoader<string, Node>(
        async (ids: ReadonlyArray<string>): Promise<Node[]> => {
          const results = flatten(
            await Promise.all(
              chunk(ids, MAX_ITEMS_PER_PAGE).map((ids) =>
                this.get(`${key}?${stringify({ ids }, { arrayFormat: 'brackets' })}`)
              )
            )
          );
          return ids.map((id: string) =>
            checkDataloaderDefined(
              results.find((item: ResponsesMapper[K]) => item.id.toString() === id.toString())
            )
          );
        }
      );
    }

    return this.loaders[key];
  }

  // fallback
  public async getUserCars(id: string): Promise<ResponsesMapper[API_RESSOURCE.CAR][]> {
    const results = await this.get(`/${API_RESSOURCE.USER}/${id}/${API_RESSOURCE.CAR}`);

    results.forEach((item: ResponsesMapper[API_RESSOURCE.CAR]) =>
      this.getLoader(API_RESSOURCE.CAR).prime(item.id, item)
    );

    return results;
  }

  // dataloader calls
  public async getMany<K extends API_RESSOURCE>(key: K): Promise<ResponsesMapper[K][]> {
    const results = await this.get(key);

    results.forEach((item: ResponsesMapper[K]) => this.getLoader(key).prime(item.id, item));

    return results;
  }

  public async getOne<K extends API_RESSOURCE>(key: K, id: string): Promise<ResponsesMapper[K]> {
    return this.getLoader(key).load(id);
  }
}
