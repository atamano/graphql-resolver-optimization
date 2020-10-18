import { Context } from '../types/nexus/override';

/**
 * Returns required element if it exists in parent.
 * Fetch it in callback if it does not exist.
 */
export function createFieldResolver<P, A, S extends P, K extends keyof S>(
  item: K,
  callBack: (parent: P, args: A, context: Context) => Promise<S>
): (parent: P, _args: A, c: Context) => Promise<S[K]> {
  return async (parent: P, args: A, context: Context): Promise<S[K]> => {
    if (item in parent) {
      return (parent as S)[item];
    }
    const result: S = await callBack(parent, args, context);

    return result[item];
  };
}
