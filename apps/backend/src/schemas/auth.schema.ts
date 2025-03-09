import { z } from '@hono/zod-openapi';
import zod from '@rplan/database/generated/zod/index.ts';
import { UserSchema } from './user.schema.ts';

export const LoginSchema = UserSchema.pick({
  email: true,
  password: true,
});

export const StatusSchema = z.object({
  isAuthenticated: z.boolean(),
});
