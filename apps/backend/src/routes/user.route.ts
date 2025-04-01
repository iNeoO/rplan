import { createRoute } from '@hono/zod-openapi';
import { Prisma, type User } from '@rplan/database';
import { HTTPException } from 'hono/http-exception';

import { createInternalApp } from '../libs/honoCreateApp.ts';

import { authMiddleware, error401UnauthorizedResponse } from '../middlewares/auth.middleware.ts';

import { acceptInvitation, getInvitation } from '../services/invitation.service.ts';
import { signEmailValidation, verify } from '../services/jsonwebtoken.service.ts';
import MailService from '../services/mail.service.ts';
import {
  createPasswordForgotten,
  getPasswordForgotten,
  updateIsUsedPasswordForgotten,
} from '../services/passwordForgotten.service.ts';
import { createUser, getUser, updateUserPassword, updateUserValidEmail } from '../services/user.service.ts';
import { addPermissionForPlan } from '../services/userWithPermissions.service.ts';

import type { AuthVariables } from '../interfaces/auth.d.ts';

import { ErrorSchema } from '../schemas/error.schema.ts';
import { ResetPasswordDtoSchema, ResetPasswordSchema } from '../schemas/passwordForgotten.schema.ts';
import {
  GetUserSchema,
  PostUserDtoSchema,
  PostUserSchema,
  RequestResetPasswordDtoSchema,
  RequestResetPasswordSchema,
  ValidEmailDtoSchema,
  ValidEmailSchema,
} from '../schemas/user.schema.ts';

const app = createInternalApp<{ Variables: AuthVariables }>().basePath('/user');

const postUserRoute = createRoute({
  method: 'post',
  path: '/',
  tags: ['user'],
  request: {
    body: {
      content: {
        'application/json': {
          schema: PostUserDtoSchema,
        },
      },
    },
  },
  responses: {
    200: {
      description: 'Response after creating an user',
      content: {
        'application/json': {
          schema: PostUserSchema,
        },
      },
    },
    400: {
      description: 'Invalid format',
      content: {
        'application/json': {
          schema: ErrorSchema,
        },
      },
    },
    500: {
      description: 'Server error',
      content: {
        'application/json': {
          schema: ErrorSchema,
        },
      },
    },
  },
});

app.openapi(postUserRoute, async (c) => {
  const { username, password, email, token } = c.req.valid('json');
  let newUser: User;
  try {
    newUser = await createUser({ username, password, email });
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === 'P2002') {
        throw new HTTPException(400, { message: 'Email already exists' });
      }
    }
    const logger = c.get('logger');
    logger.error(error);
    throw new HTTPException(500, { message: 'Server error', cause: error });
  }
  if (token) {
    const invitation = await getInvitation(token);
    if (invitation) {
      addPermissionForPlan(newUser.id, invitation.planId, invitation.hasWritePermission);
      acceptInvitation(token);
    }
  }
  const emailToken = signEmailValidation(newUser.id);
  const mailer = new MailService();
  mailer.sendMail({
    to: newUser.email,
    subject: 'Registration on rplan',
    text: 'a text',
    html: `<b>${emailToken}</b>`,
  });
  return c.json(
    {
      id: newUser.id,
      email: newUser.email,
      username: newUser.username,
      createdAt: newUser.createdAt,
    },
    200,
  );
});

const validEmail = createRoute({
  method: 'post',
  path: '/valid-email',
  tags: ['user'],
  request: {
    body: {
      content: {
        'application/json': {
          schema: ValidEmailDtoSchema,
        },
      },
    },
  },
  responses: {
    200: {
      description: 'Response after validating an email for an user',
      content: {
        'application/json': {
          schema: ValidEmailSchema,
        },
      },
    },
    400: {
      description: 'Invalid token or email already verified',
      content: {
        'application/json': {
          schema: ErrorSchema,
        },
      },
    },
  },
});

app.openapi(validEmail, async (c) => {
  const { token } = c.req.valid('json');
  const [err, decoded] = verify(token, process.env.EMAIL_VALIDATION_SECRET_KEY);
  if (err) {
    throw new HTTPException(400, { message: 'Invalid token' });
  }
  const user = await getUser({ id: decoded.id });
  if (!user) {
    throw new HTTPException(400, { message: 'Invalid token' });
  }
  if (user.isEmailValid) {
    throw new HTTPException(400, { message: 'Email is already verified' });
  }
  await updateUserValidEmail(decoded.id, true);
  return c.json(
    {
      message: 'Email is now valid',
    },
    200,
  );
});

const requestResetPassword = createRoute({
  method: 'post',
  path: '/forgotten-password',
  tags: ['user'],
  request: {
    body: {
      content: {
        'application/json': {
          schema: RequestResetPasswordDtoSchema,
        },
      },
    },
  },
  responses: {
    200: {
      description: 'Response always email sent',
      content: {
        'application/json': {
          schema: RequestResetPasswordSchema,
        },
      },
    },
  },
});

app.openapi(requestResetPassword, async (c) => {
  const { email } = c.req.valid('json');
  const user = await getUser({ email });
  if (user) {
    const passwordForgotten = await createPasswordForgotten(user.id);
    const mailer = new MailService();
    mailer.sendMail({
      to: user.email,
      subject: 'Password forgotten on rplan',
      html: `<b>${passwordForgotten.token}</b>`,
    });
  }
  return c.json(
    {
      message: 'Email sent !',
    },
    200,
  );
});

const resetPassword = createRoute({
  method: 'post',
  path: '/reset-password',
  tags: ['user'],
  request: {
    body: {
      content: {
        'application/json': {
          schema: ResetPasswordDtoSchema,
        },
      },
    },
  },
  responses: {
    200: {
      description: 'Message with password reset success',
      content: {
        'application/json': {
          schema: ResetPasswordSchema,
        },
      },
    },
    400: {
      description: 'Invalid token | token expired | token already used',
      content: {
        'application/json': {
          schema: ErrorSchema,
        },
      },
    },
  },
});

app.openapi(resetPassword, async (c) => {
  const { token, password } = c.req.valid('json');
  const passwordForgotten = await getPasswordForgotten(token);
  if (!passwordForgotten) {
    throw new HTTPException(400, { message: 'Invalid token' });
  }
  if (passwordForgotten.isUsed) {
    throw new HTTPException(400, {
      message: 'Token for reset password has already been used',
    });
  }
  const [err, decoded] = verify(token, process.env.PASSWORD_FORGOTTEN_SECRET_KEY);
  if (
    err?.name === 'TokenExpiredError' ||
    passwordForgotten.createdAt.getTime() +
      Number.parseInt(process.env.TOKEN_PASSWORD_FORGOTTEN_EXPIRATION, 10) * 1000 >=
      new Date().getTime()
  ) {
    throw new HTTPException(400, {
      message: 'Token for reset password has expired',
    });
  }
  if (err || decoded.id !== passwordForgotten.userId) {
    throw new HTTPException(400, { message: 'Invalid token' });
  }
  await updateUserPassword(passwordForgotten.userId, password);
  updateIsUsedPasswordForgotten(token, true);
  return c.json(
    {
      message: 'Password updated',
    },
    200,
  );
});

app.use(authMiddleware);

const getUserRoute = createRoute({
  method: 'get',
  path: '/',
  tags: ['user'],
  responses: {
    200: {
      description: 'Response after getting his user',
      content: {
        'application/json': {
          schema: GetUserSchema,
        },
      },
    },
    ...error401UnauthorizedResponse,
    404: {
      description: 'User not found',
      content: {
        'application/json': {
          schema: ErrorSchema,
        },
      },
    },
  },
});

app.openapi(getUserRoute, async (c) => {
  const id = c.get('userId');
  const user = await getUser({ id });
  if (user) {
    return c.json(
      {
        id: user.id,
        email: user.email,
        username: user.username,
        createdAt: user.createdAt,
        lastLoginOn: user.lastLoginOn,
      },
      200,
    );
  }
  throw new HTTPException(404, { message: 'User not found' });
});

export default app;
