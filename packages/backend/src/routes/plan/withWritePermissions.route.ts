import { OpenAPIHono, createRoute } from '@hono/zod-openapi';

import type { AuthVariables } from '../../interfaces/auth';

import {
  createPartialPaginationQuerySchema,
} from '../../schemas/common.schema.ts';
import {
  PostInvitationByEmailDtoSchema,
  InvitationdByEmailSchema,
  PostInvitationByLinktoSchema,
  InvitationdByLinkSchema,
  InvitationsReturnSchema,
} from '../../schemas/invitation.schema.ts';
import {
  GetPlanParamsSchema,
} from '../../schemas/plan.schema.ts';

import { hasWritePlanPermissionsMiddleware } from '../../middlewares/planPermissions.middleware.ts';

import {
  createInvitationByEmail,
  createInvitationByLink,
  invitations,
} from '../../services/invitation.service.ts';
import {
  signInvitationValidation,
} from '../../services/jsonwebtoken.service.ts';
import {
  getUser,
} from '../../services/user.service.ts';
import MailService from '../../services/mail.service.ts';

import { ErrorSchema } from '../../schemas/error.schema.ts';

const app = new OpenAPIHono<{ Variables: AuthVariables }>();

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
      description: 'Respond after inviting someone to join a plan',
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
    403: {
      description: 'Plan no enough permissions',
      content: {
        'application/json': {
          schema: ErrorSchema,
        },
      },
    },
    404: {
      description: 'Plan does not exist',
      content: {
        'application/json': {
          schema: ErrorSchema,
        },
      },
    },
  },
});

app.openapi(inviteUserByEmail, async (c) => {
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

  return c.json({
    message: 'Invitation sent',
    expiresAt: invitation.expiresAt,
  });
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
      description: 'Respond after inviting someone to join a plan',
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
    403: {
      description: 'Plan no enough permissions',
      content: {
        'application/json': {
          schema: ErrorSchema,
        },
      },
    },
    404: {
      description: 'Plan does not exist',
      content: {
        'application/json': {
          schema: ErrorSchema,
        },
      },
    },
  },
});

app.openapi(createLinkInvite, async (c) => {
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

  return c.json({
    id: invitation.id,
    token: invitation.token,
    hasWritePermission: invitation.hasWritePermission,
    createdAt: invitation.createdAt,
    expiresAt: invitation.expiresAt,
  });
});

const getInvitations = createRoute({
  method: 'get',
  path: '/{id}/invitations',
  tags: ['plan'],
  request: {
    params: GetPlanParamsSchema,
    query: createPartialPaginationQuerySchema([
      'invitedBy',
      'email',
      'status',
      'hasWritePermission',
      'createdAt',
      'expiresAt',
      'acceptedAt',
      'invitationType',
    ]),
  },
  responses: {
    200: {
      description: 'Respond after inviting someone to join a plan',
      content: {
        'application/json': {
          schema: InvitationsReturnSchema,
        },
      },
    },
    403: {
      description: 'Plan no enough permissions',
      content: {
        'application/json': {
          schema: ErrorSchema,
        },
      },
    },
    404: {
      description: 'Plan does not exist',
      content: {
        'application/json': {
          schema: ErrorSchema,
        },
      },
    },
  },
});

app.openapi(getInvitations, async (c) => {
  const { id } = c.req.valid('param');
  const query = c.req.valid('query');
  const queryWithDefault = {
    sort: query.sort || 'createdAt',
    order: query.order || 'asc',
    offset: query.offset || 0,
    limit: query.limit || 10,
  };

  const invitationsWithPagination = await invitations(id, queryWithDefault);

  return c.json(invitationsWithPagination);
});

export default app;
