import { createRoute } from '@hono/zod-openapi';
import { createInternalApp } from '../../libs/honoCreateApp.ts';

import type { AuthVariables } from '../../interfaces/auth.d.ts';

import {
  error403ForbiddenResponse,
  error404PlanNotFound,
  hasReadPlanPermissionsMiddleware,
} from '../../middlewares/planPermissions.middleware.ts';

import { formatPlan, getPlan } from '../../services/plan.service.ts';

import { HTTPException } from 'hono/http-exception';
import { GetPlanParamsSchema, GetPlanReturnSchema } from '../../schemas/plan.schema.ts';

const app = createInternalApp<{ Variables: AuthVariables }>().basePath('/');

app.use(hasReadPlanPermissionsMiddleware);

const getPlanRoute = createRoute({
  method: 'get',
  path: '/{id}',
  tags: ['plan'],
  request: {
    params: GetPlanParamsSchema,
  },
  responses: {
    200: {
      description: 'Response after getting plan',
      content: {
        'application/json': {
          schema: GetPlanReturnSchema,
        },
      },
    },
    ...error403ForbiddenResponse,
    ...error404PlanNotFound,
  },
});

app.openapi(getPlanRoute, async (c) => {
  const userId = c.get('userId');
  const { id } = c.req.valid('param');
  const plan = await getPlan(userId, id);
  if (plan) {
    return c.json(formatPlan(plan), 200);
  }
  throw new HTTPException(404, { message: 'Plan not found' });
});

export default app;
