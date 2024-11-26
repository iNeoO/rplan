import { OpenAPIHono } from '@hono/zod-openapi';
import { createFactory } from 'hono/factory';
import type { Env } from 'hono';
import type { PinoLogger } from 'hono-pino';

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
  return app;
}

export function createInternalFactory<T extends Env>() {
  return createFactory<T & AppBindings>();
}
