import { createRoute } from '@hono/zod-openapi';
import { HTTPException } from 'hono/http-exception';
import { createInternalApp } from '../libs/honoCreateApp.ts';
import {
  authMiddleware,
  error401UnauthorizedResponse,
} from '../middlewares/auth.middleware.ts';
import type { AuthVariables } from '../interfaces/auth.d.ts';

import { ErrorSchema } from '../schemas/error.schema.ts';

import {
  InvitationTokenSchema,
  AcceptInvitationResponse,
} from '../schemas/invitation.schema.ts';
import {
  getInvitation,
  acceptInvitation,
} from '../services/invitation.service.ts';
import { addPermissionForPlan } from '../services/userWithPermissions.service.ts';
import { handleAsyncQueuedData } from '../utils/handleAsyncQueuedData.ts';

const app = createInternalApp<{ Variables: AuthVariables }>();

app.use(authMiddleware);

const acceptInvitationRoute = createRoute({
  method: 'post',
  path: '/{token}',
  tags: ['invitation'],
  request: {
    params: InvitationTokenSchema,
  },
  responses: {
    200: {
      description: 'Response after accepting link invitation',
      content: {
        'application/json': {
          schema: AcceptInvitationResponse,
        },
      },
    },
    400: {
      description: 'Response after creating a plan',
      content: {
        'application/json': {
          schema: ErrorSchema,
        },
      },
    },
    ...error401UnauthorizedResponse,
  },
});

app.openapi(acceptInvitationRoute, async c => {
  const userId = c.get('userId');
  const { token } = c.req.valid('param');

  const invitation = await getInvitation(token);

  if (!invitation) {
    throw new HTTPException(400, { message: 'Invalid invitation' });
  }

  const logger = c.get('logger');

  const addPermissionPromise = addPermissionForPlan(
    userId,
    invitation.planId,
    invitation.hasWritePermission,
  );
  const acceptInvitationPromise = acceptInvitation(token);

  handleAsyncQueuedData([addPermissionPromise, acceptInvitationPromise], logger);

  return c.json(
    {
      message: 'Invitation accepted',
    },
    200,
  );
});

export default app;
