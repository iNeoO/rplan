import { OpenAPIHono, createRoute } from '@hono/zod-openapi';

import type { AuthVariables } from '../../interfaces/auth';

import { hasReadPlanPermissionsMiddleware, error403ForbiddenResponse, error404PlanNotFound } from '../../middlewares/planPermissions.middleware.ts';

import {
  getPlan,
  formatPlan,
} from '../../services/plan.service.ts';

import {
  GetPlanReturnSchema,
  GetPlanParamsSchema,
} from '../../schemas/plan.schema.ts';

const app = new OpenAPIHono<{ Variables: AuthVariables }>();

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

  return c.json(formatPlan(plan!));
});

export default app;
