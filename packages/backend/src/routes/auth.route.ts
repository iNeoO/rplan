import { OpenAPIHono, createRoute } from '@hono/zod-openapi';
import { setCookie } from 'hono/cookie';

import {
  LoginSchema,
} from '../schemas/auth.schema.ts';
import {
  GetUserSchema,
} from '../schemas/user.schema.ts';

import { ErrorSchema } from '../schemas/error.schema.ts';

import { getUserIfPasswordMatch, updateUserLastLogin } from '../services/user.service.ts';
import { signAuthCookie } from '../services/jsonwebtoken.service.ts';

const app = new OpenAPIHono();

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
      description: 'Respond a message',
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
      description: 'email isn\'t confirmed',
    },
  },
});

app.openapi(
  loginRoute,
  async (c) => {
    const { email, password } = c.req.valid('json');

    const userChecked = await getUserIfPasswordMatch({ email, password });
    if (!userChecked) {
      return c.json({
        error: 'Wrong credentials',
      }, 400);
    }
    if (!userChecked.isEmailValid) {
      return c.json({
        error: 'You need to confirm email',
      }, 401);
    }

    const user = await updateUserLastLogin(userChecked.id);

    const date = new Date(
      new Date().getTime() + parseInt(process.env.COOKIE_EXPIRATION, 10) * 1000,
    );

    const token = signAuthCookie(user.id);

    setCookie(c, process.env.COOKIE_NAME, token, {
      path: '/',
      secure: true,
      httpOnly: true,
      expires: date,
      sameSite: 'Strict',
    });

    setCookie(c, process.env.COOKIE_BIS_NAME, 'rplan', {
      path: '/',
      secure: true,
      httpOnly: false,
      expires: date,
      sameSite: 'Strict',
    });

    return c.json({
      id: user.id,
      username: user.username,
      email: user.email,
      createdAt: user.createdAt,
      lastLoginOn: user.lastLoginOn,
    });
  },
);

export default app;
