import { ExpressContext } from 'apollo-server-express/dist/ApolloServer';
import * as ExpressCompression from 'compression';
import * as Cors from 'cors';
import * as Express from 'express';
import { GetCarResponses, GetUserResponses } from '../../../data/apiResponses';

export const createExpressApp = (): Express.Express => {
  const app = Express();

  app.use(ExpressCompression());
  app.use(Cors());

  // Fixtures
  app.get('/users', (req, res: ExpressContext['res']) => {
    if (req.query.ids) {
      return res.json(
        GetUserResponses.filter((user) =>
          ((req.query.ids as string[]) || []).includes(user.id.toString())
        )
      );
    }
    return res.json(GetUserResponses);
  });

  app.get('/users/:id/cars', (req, res: ExpressContext['res']) => {
    const user = GetUserResponses.find((user) => user.id.toString() === req.params.id);
    if (!user) {
      return res.json([]);
    }
    const ids = user.cars.map((car) => car.id);

    return res.json(GetCarResponses.filter((car) => ids.includes(car.id)));
  });

  app.get('/cars', (req, res: ExpressContext['res']) => {
    if (req.query.ids) {
      return res.json(
        GetCarResponses.filter((car) =>
          ((req.query.ids as string[]) || []).includes(car.id.toString())
        )
      );
    }
    return res.json(GetCarResponses);
  });

  return app;
};
