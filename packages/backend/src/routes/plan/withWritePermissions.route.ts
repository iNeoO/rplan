import { createRoute } from '@hono/zod-openapi';
import { createInternalApp } from '../../libs/honoCreateApp.ts';

import type { AuthVariables } from '../../interfaces/auth';

import { createPartialPaginationQuerySchema } from '../../schemas/common.schema.ts';
import {
  PostInvitationByEmailDtoSchema,
  InvitationdByEmailSchema,
  PostInvitationByLinktoSchema,
  InvitationdByLinkSchema,
  InvitationsReturnSchema,
  invitationsColumns,
} from '../../schemas/invitation.schema.ts';
import {
  PermissionsReturnSchema,
  permissionsColumns,
} from '../../schemas/userWithPermission.schema.ts';
import { GetPlanParamsSchema } from '../../schemas/plan.schema.ts';

import {
  hasWritePlanPermissionsMiddleware,
  error403ForbiddenResponse,
  error404PlanNotFound,
} from '../../middlewares/planPermissions.middleware.ts';

import {
  createInvitationByEmail,
  createInvitationByLink,
  invitations,
} from '../../services/invitation.service.ts';
import { permissions } from '../../services/userWithPermissions.service.ts';
import { signInvitationValidation } from '../../services/jsonwebtoken.service.ts';
import { getUser } from '../../services/user.service.ts';
import MailService from '../../services/mail.service.ts';

import { ErrorSchema } from '../../schemas/error.schema.ts';

const app = createInternalApp<{ Variables: AuthVariables }>();

app.use(hasWritePlanPermissionsMiddleware);

const inviteUserByEmail = createRoute({
  method: 'post',
  path: '/{id}/invite-by-email',
  tags: ['plan'],
  request: {
    params: GetPlanParamsSchema,
    body: {
      content: {
        'application/json': {
          schema: PostInvitationByEmailDtoSchema,
        },
      },
    },
  },
  responses: {
    200: {
      description: 'Response after inviting someone to join a plan',
      content: {
        'application/json': {
          schema: InvitationdByEmailSchema,
        },
      },
    },
    400: {
      description: 'Invalid request',
      content: {
        'application/json': {
          schema: ErrorSchema,
        },
      },
    },
    ...error403ForbiddenResponse,
    ...error404PlanNotFound,
  },
});

app.openapi(inviteUserByEmail, async c => {
  const userId = c.get('userId');
  const { id } = c.req.valid('param');
  const { message, email, hasWritePermission } = c.req.valid('json');

  const user = await getUser({ id: userId });

  const token = signInvitationValidation(email);

  const newInvitation = {
    token,
    email,
    invitedById: user!.id,
    hasWritePermission,
    message,
    planId: id,
  };

  const invitation = await createInvitationByEmail(newInvitation);

  const mailer = new MailService();
  mailer.sendMail({
    to: email,
    subject: 'Invitation on rplan',
    text: 'a text',
    html: `<b>${token}</b>`,
  });

  return c.json(
    {
      message: 'Invitation sent',
      expiresAt: invitation.expiresAt,
    },
    200,
  );
});

const createLinkInvite = createRoute({
  method: 'post',
  path: '/{id}/invite-by-link',
  tags: ['plan'],
  request: {
    params: GetPlanParamsSchema,
    body: {
      content: {
        'application/json': {
          schema: PostInvitationByLinktoSchema,
        },
      },
    },
  },
  responses: {
    200: {
      description: 'Response after inviting someone to join a plan',
      content: {
        'application/json': {
          schema: InvitationdByLinkSchema,
        },
      },
    },
    400: {
      description: 'Invalid request',
      content: {
        'application/json': {
          schema: ErrorSchema,
        },
      },
    },
    ...error403ForbiddenResponse,
    ...error404PlanNotFound,
  },
});

app.openapi(createLinkInvite, async c => {
  const userId = c.get('userId');
  const { id } = c.req.valid('param');
  const { hasWritePermission } = c.req.valid('json');

  const user = await getUser({ id: userId });

  const token = signInvitationValidation(id);

  const newInvitation = {
    token,
    invitedById: user!.id,
    hasWritePermission,
    planId: id,
  };

  const invitation = await createInvitationByLink(newInvitation);

  return c.json(
    {
      id: invitation.id,
      token: invitation.token,
      hasWritePermission: invitation.hasWritePermission,
      createdAt: invitation.createdAt,
      expiresAt: invitation.expiresAt,
    },
    200,
  );
});

const getInvitations = createRoute({
  method: 'get',
  path: '/{id}/invitations',
  tags: ['plan'],
  request: {
    params: GetPlanParamsSchema,
    query: createPartialPaginationQuerySchema(invitationsColumns),
  },
  responses: {
    200: {
      description: 'List of invitations',
      content: {
        'application/json': {
          schema: InvitationsReturnSchema,
        },
      },
    },
    ...error403ForbiddenResponse,
    ...error404PlanNotFound,
  },
});

app.openapi(getInvitations, async c => {
  const { id } = c.req.valid('param');
  const query = c.req.valid('query');
  const queryWithDefault = {
    sort: query.sort || 'createdAt',
    order: query.order || 'asc',
    offset: query.offset || 0,
    limit: query.limit || 10,
  };

  const invitationsWithPagination = await invitations(id, queryWithDefault);

  return c.json(invitationsWithPagination, 200);
});

const getPermissions = createRoute({
  method: 'get',
  path: '/{id}/permissions',
  tags: ['plan'],
  request: {
    params: GetPlanParamsSchema,
    query: createPartialPaginationQuerySchema(permissionsColumns),
  },
  responses: {
    200: {
      description: 'List of permissions',
      content: {
        'application/json': {
          schema: PermissionsReturnSchema,
        },
      },
    },
    ...error403ForbiddenResponse,
    ...error404PlanNotFound,
  },
});

app.openapi(getPermissions, async c => {
  const { id } = c.req.valid('param');
  const query = c.req.valid('query');
  const queryWithDefault = {
    sort: query.sort || 'createdAt',
    order: query.order || 'asc',
    offset: query.offset || 0,
    limit: query.limit || 10,
  };

  const permissionsWithPagination = await permissions(id, queryWithDefault);

  return c.json(permissionsWithPagination, 200);
});

export default app;
