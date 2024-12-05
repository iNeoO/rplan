import { createRoute } from '@hono/zod-openapi';
import { setCookie } from 'hono/cookie';
import { createInternalApp } from '../libs/honoCreateApp.ts';

import { LoginSchema, StatusSchema } from '../schemas/auth.schema.ts';
import { GetUserSchema } from '../schemas/user.schema.ts';

import { ErrorSchema } from '../schemas/error.schema.ts';

import {
  getUserIfPasswordMatch,
  updateUserLastLogin,
} from '../services/user.service.ts';
import { createSession } from '../services/session.service.ts';
import {
  signAuthCookie,
  signRefreshCookie,
} from '../services/jsonwebtoken.service.ts';

import {
  authMiddleware,
  error401UnauthorizedResponse,
} from '../middlewares/auth.middleware.ts';

const app = createInternalApp();

export const loginRoute = createRoute({
  method: 'post',
  path: '/login',
  tags: ['auth'],
  request: {
    body: {
      content: {
        'application/json': {
          schema: LoginSchema,
        },
      },
    },
  },
  responses: {
    200: {
      description: 'User data after login',
      content: {
        'application/json': {
          schema: GetUserSchema,
        },
      },
    },
    400: {
      content: {
        'application/json': {
          schema: ErrorSchema,
        },
      },
      description: 'Bad credentials',
    },
    401: {
      content: {
        'application/json': {
          schema: ErrorSchema,
        },
      },
      description: "email isn't confirmed",
    },
    500: {
      content: {
        'application/json': {
          schema: ErrorSchema,
        },
      },
      description: 'server error',
    },
  },
});

app.openapi(loginRoute, async c => {
  const { email, password } = c.req.valid('json');

  const userChecked = await getUserIfPasswordMatch({ email, password });
  if (!userChecked) {
    return c.json(
      {
        error: 'Wrong credentials',
      },
      400,
    );
  }
  if (userChecked.isEmailValid) {
    return c.json(
      {
        error: 'You need to confirm email',
      },
      401,
    );
  }

  const user = await updateUserLastLogin(userChecked.id);

  const authTokenDate = new Date(
    new Date().getTime() +
      parseInt(process.env.COOKIE_AUTH_EXPIRATION, 10) * 1000,
  );

  const refreshTokenDate = new Date(
    new Date().getTime() +
      parseInt(process.env.COOKIE_REFRESH_EXPIRATION, 10) * 1000,
  );

  const refreshToken = signRefreshCookie(user.id, refreshTokenDate);
  const authToken = signAuthCookie(user.id, authTokenDate);

  setCookie(c, process.env.COOKIE_AUTH_NAME, authToken, {
    path: '/',
    secure: true,
    httpOnly: true,
    expires: authTokenDate,
    sameSite: 'Strict',
  });

  setCookie(c, process.env.COOKIE_REFRESH_NAME, refreshToken, {
    path: '/',
    secure: true,
    httpOnly: true,
    expires: refreshTokenDate,
    sameSite: 'Strict',
  });

  try {
    await createSession({ userId: user.id, token: refreshToken });
  } catch (error) {
    const logger = c.get('logger');
    logger.error('Error creating session:', error);
    return c.json(
      {
        error: 'Internal server error',
      },
      500,
    );
  }

  return c.json(
    {
      id: user.id,
      username: user.username,
      email: user.email,
      createdAt: user.createdAt,
      lastLoginOn: user.lastLoginOn,
    },
    200,
  );
});

app.use(authMiddleware);

export const statusRoute = createRoute({
  method: 'get',
  path: '/status',
  tags: ['auth'],
  responses: {
    200: {
      description: 'User is logged',
      content: {
        'application/json': {
          schema: StatusSchema,
        },
      },
    },
    ...error401UnauthorizedResponse,
  },
});

app.openapi(statusRoute, c => c.json({ isAuthenticated: true }, 200));

export default app;
