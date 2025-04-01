import type { Session } from '@rplan/database';
import { deleteCookie, getCookie, setCookie } from 'hono/cookie';
import { HTTPException } from 'hono/http-exception';
import { createInternalFactory } from '../libs/honoCreateApp.ts';
import { signAuthCookie, verify } from '../services/jsonwebtoken.service.ts';

import { ErrorSchema } from '../schemas/error.schema.ts';

import type { AuthVariables } from '../interfaces/auth.d.ts';

import { getSession } from '../services/session.service.ts';

const authFactory = createInternalFactory<{ Variables: AuthVariables }>();

export const authMiddleware = authFactory.createMiddleware(async (c, next) => {
  const authToken = getCookie(c, process.env.COOKIE_AUTH_NAME);
  if (authToken) {
    try {
      const [err, decoded] = verify(authToken, process.env.AUTH_SECRET_KEY);
      if (err) {
        deleteCookie(c, process.env.COOKIE_AUTH_NAME);
        throw new HTTPException(401, {
          message: 'Unauthorized, Auth token is invalid or expired',
        });
      }
      c.set('userId', decoded.id);
      return next();
    } catch (error) {
      const logger = c.get('logger');
      logger.error(error);
      deleteCookie(c, process.env.COOKIE_AUTH_NAME);
      throw new HTTPException(401, {
        message: 'Unauthorized, Auth token is invalid or expired',
        cause: error,
      });
    }
  }
  const refreshToken = getCookie(c, process.env.COOKIE_REFRESH_NAME);
  if (refreshToken) {
    let session: Session | null = null;
    try {
      session = await getSession(refreshToken);
      if (session === null) {
        deleteCookie(c, process.env.COOKIE_REFRESH_NAME);
        throw new HTTPException(401, {
          message: 'Unauthorized, Refresh token is invalid or expired',
        });
      }
    } catch (error) {
      deleteCookie(c, process.env.COOKIE_REFRESH_NAME);
      const logger = c.get('logger');
      logger.error(error);
      throw new HTTPException(401, { message: 'Unauthorized', cause: error });
    }
    try {
      const [err, decoded] = verify(session.token, process.env.REFRESH_SECRET_KEY);
      if (err) {
        deleteCookie(c, process.env.COOKIE_REFRESH_NAME);
        throw new HTTPException(401, {
          message: 'Unauthorized, Refresh token is invalid or expired',
        });
      }

      const newAuthTokenDate = new Date(
        new Date().getTime() + Number.parseInt(process.env.COOKIE_AUTH_EXPIRATION, 10) * 1000,
      );

      const newAuthToken = signAuthCookie(decoded.id, newAuthTokenDate);
      setCookie(c, process.env.COOKIE_AUTH_NAME, newAuthToken, {
        path: '/',
        secure: true,
        httpOnly: true,
        expires: newAuthTokenDate,
        sameSite: 'Strict',
      });
      c.set('userId', decoded.id);
      return next();
    } catch (error) {
      const logger = c.get('logger');
      logger.error(error);
      deleteCookie(c, process.env.COOKIE_REFRESH_NAME);
      return c.json(
        {
          error: 'Unauthorized',
          message: 'Refresh token is invalid or expired',
        },
        401,
      );
    }
  } else {
    throw new HTTPException(401, {
      message: 'Unauthorized, Refresh token is invalid or expired',
    });
  }
});

export const error401UnauthorizedResponse = {
  401: {
    description: 'Unauthorized Response',
    content: {
      'application/json': {
        schema: ErrorSchema,
      },
    },
  },
};
