import { createRoute } from '@hono/zod-openapi';
import { createInternalApp } from '../libs/honoCreateApp.ts';
import {
  authMiddleware,
  error401UnauthorizedResponse,
} from '../middlewares/auth.middleware.ts';
import type { AuthVariables } from '../interfaces/auth.d.ts';

import withReadPermissions from './plan/withReadPermissions.route.ts';
import withWritePermissions from './plan/withWritePermissions.route.ts';

import {
  createPlan,
  getPlans,
  formatPlans,
  formatPlan,
} from '../services/plan.service.ts';

import {
  PostPlanDtoSchema,
  GetPlanReturnSchema,
  GetPlansReturnSchema,
} from '../schemas/plan.schema.ts';

import { ErrorSchema } from '../schemas/error.schema.ts';

const app = createInternalApp<{ Variables: AuthVariables }>();

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
      description: 'Response after creating a plan',
      content: {
        'application/json': {
          schema: GetPlanReturnSchema,
        },
      },
    },
    ...error401UnauthorizedResponse,
  },
});

app.openapi(postPlanRoute, async c => {
  const body = c.req.valid('json');
  const userId = c.get('userId');
  const plan = await createPlan(userId, body);

  return c.json(formatPlan(plan), 200);
});

const getPlansRoute = createRoute({
  method: 'get',
  path: '/',
  tags: ['plan'],
  responses: {
    200: {
      description: 'Response after getting plans',
      content: {
        'application/json': {
          schema: GetPlansReturnSchema,
        },
      },
    },
    ...error401UnauthorizedResponse,
    403: {
      description: 'Invalid format',
      content: {
        'application/json': {
          schema: ErrorSchema,
        },
      },
    },
  },
});

app.openapi(getPlansRoute, async c => {
  const userId = c.get('userId');
  const plans = await getPlans(userId);
  return c.json(formatPlans(plans), 200);
});

app.route('/', withReadPermissions);
app.route('/', withWritePermissions);

export default app;
