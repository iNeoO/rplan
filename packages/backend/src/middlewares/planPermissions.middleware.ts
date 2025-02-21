import { createFactory } from 'hono/factory';
import { HTTPException } from 'hono/http-exception';
import type { AuthVariables } from '../interfaces/auth';

import { ErrorSchema } from '../schemas/error.schema.ts';

import { userPermission } from '../services/userWithPermissions.service.ts';

const planPermissionsFactory = createFactory<{ Variables: AuthVariables }>();

export const hasReadPlanPermissionsMiddleware =
  planPermissionsFactory.createMiddleware(async (c, next) => {
    const userId = c.get('userId');
    const planId = c.req.param('id');

    const permission = await userPermission(userId, planId);

    if (permission) {
      next();
    } else {
      throw new HTTPException(404, { message: 'Plan not found' });
    }
  });

export const hasWritePlanPermissionsMiddleware =
  planPermissionsFactory.createMiddleware(async (c, next) => {
    const userId = c.get('userId');
    const planId = c.req.param('id');

    const permission = await userPermission(userId, planId);

    if (permission) {
      if (permission.hasWritePermission) {
        next();
      } else {
        throw new HTTPException(403, { message: 'Forbidden' });
        c.json(
          {
            error: 'Forbidden',
          },
          403,
        );
      }
    } else {
      throw new HTTPException(404, { message: 'Plan not found' });
    }
  });

export const error403ForbiddenResponse = {
  403: {
    content: {
      'application/json': {
        schema: ErrorSchema,
      },
    },
    description: 'Forbidden',
  },
};

export const error404PlanNotFound = {
  404: {
    content: {
      'application/json': {
        schema: ErrorSchema,
      },
    },
    description: 'Plan not found',
  },
};
