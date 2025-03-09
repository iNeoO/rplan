import { OpenAPIHono } from '@hono/zod-openapi';
import type { Env } from 'hono';
import type { PinoLogger } from 'hono-pino';
import { createFactory } from 'hono/factory';
import { HTTPException } from 'hono/http-exception';

import pinoLogger from '../middlewares/pino.middleware.ts';

export type AppBindings = {
  Variables: {
    logger: PinoLogger;
  };
};

export type AppOpenAPI = OpenAPIHono<AppBindings>;

export function createInternalApp<T extends Env>() {
  const app = new OpenAPIHono<AppBindings & T>({ strict: false });
  app.use(pinoLogger());
  app.onError((error, c) => {
    if (error instanceof HTTPException) {
      return error.getResponse();
    }
    const logger = c.get('logger');
    logger.error(error);
    return c.json({ message: 'Internal server error' }, 500);
  });
  return app;
}

export function createInternalFactory<T extends Env>() {
  return createFactory<T & AppBindings>();
}
