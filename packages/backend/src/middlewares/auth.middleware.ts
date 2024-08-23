import { createFactory } from 'hono/factory';
import { getCookie } from 'hono/cookie';
import { verify } from '../services/jsonwebtoken.service.ts';

import {
  ErrorSchema,
} from '../schemas/error.schema.ts';

import type { AuthVariables } from '../interfaces/auth';

const authFactory = createFactory<{ Variables: AuthVariables }>();

export const authMiddleware = authFactory.createMiddleware(async (c, next) => {
  const token = getCookie(c, process.env.COOKIE_NAME);
  if (token) {
    try {
      const [err, decoded] = verify(token, process.env.AUTH_SECRET_KEY);
      if (err) {
        return c.json({
          error: 'Unauthorized',
        }, 401);
      }
      c.set('userId', decoded.id);
    } catch (error) {
      console.error(error);
      return c.json({
        error: 'Unauthorized',
      }, 401);
    }
  } else {
    return c.json({
      error: 'Unauthorized',
    }, 401);
  }
  return next();
});

export const error401UnauthorizedResponse = {
  content: {
    'application/json': {
      schema: ErrorSchema,
    },
  },
  description: 'Unauthorized Response',
};
