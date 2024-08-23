import { OpenAPIHono, createRoute } from '@hono/zod-openapi';
import { authMiddleware } from '../middlewares/auth.middleware.ts';
import type { AuthVariables } from '../interfaces/auth.d.ts';

import {
  createPlan,
  getPlans,
  getPlan,
  formatPlans,
  formatPlan,
} from '../services/plan.service.ts';

import {
  PostPlanDtoSchema,
  GetPlanReturnSchema,
  GetPlansReturnSchema,
  GetPlanParamsSchema,
} from '../schemas/plan.schema.ts';

import {
  PostInvitationDtoSchema,
} from '../schemas/permissionInvitation.schema.ts';

import { ErrorSchema } from '../schemas/error.schema.ts';

const app = new OpenAPIHono<{ Variables: AuthVariables }>();

app.use(authMiddleware);

const postPlanRoute = createRoute({
  method: 'post',
  path: '/',
  tags: ['plan'],
  request: {
    body: {
      content: {
        'application/json': {
          schema: PostPlanDtoSchema,
        },
      },
    },
  },
  responses: {
    200: {
      description: 'Respond after creating a plan',
      content: {
        'application/json': {
          schema: GetPlanReturnSchema,
        },
      },
    },
  },
});

app.openapi(postPlanRoute, async (c) => {
  const body = c.req.valid('json');
  const userId = c.get('userId');
  const plan = await createPlan(userId, body);

  return c.json(formatPlan(plan));
});

const getPlansRoute = createRoute({
  method: 'get',
  path: '/',
  tags: ['plan'],
  responses: {
    200: {
      description: 'Respond after getting plans',
      content: {
        'application/json': {
          schema: GetPlansReturnSchema,
        },
      },
    },
  },
});

app.openapi(getPlansRoute, async (c) => {
  const userId = c.get('userId');
  const plans = await getPlans(userId);

  return c.json(formatPlans(plans));
});

const getPlanRoute = createRoute({
  method: 'get',
  path: '/{id}',
  tags: ['plan'],
  request: {
    params: GetPlanParamsSchema,
  },
  responses: {
    200: {
      description: 'Respond after getting plan',
      content: {
        'application/json': {
          schema: GetPlanReturnSchema,
        },
      },
    },
    404: {
      description: 'Plan not found',
      content: {
        'application/json': {
          schema: ErrorSchema,
        },
      },
    },
  },
});

app.openapi(getPlanRoute, async (c) => {
  const userId = c.get('userId');
  const { id } = c.req.valid('param');
  const plan = await getPlan(userId, id);

  if (!plan) {
    return c.json({
      error: 'Plan not found',
    }, 404);
  }

  return c.json(formatPlan(plan));
});

const inviteUser = createRoute({
  method: 'get',
  path: '/{id}/invite',
  tags: ['plan'],
  request: {
    params: GetPlanParamsSchema,
    body: {
      content: {
        'application/json': {
          schema: PostInvitationDtoSchema,
        },
      },
    },
  },
  responses: {
    200: {
      description: 'Respond after inviting someone to join a plan',
      content: {
        'application/json': {
          schema: {},
        },
      },
    },
    404: {
      description: 'Plan not found',
      content: {
        'application/json': {
          schema: ErrorSchema,
        },
      },
    },
    403: {
      description: 'Plan no enough permissions or invitation already sent',
      content: {
        'application/json': {
          schema: ErrorSchema,
        },
      },
    },
  },
});

export default app;
