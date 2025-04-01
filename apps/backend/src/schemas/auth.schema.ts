import { z } from '@hono/zod-openapi';
import { UserSchema } from './user.schema.ts';

export const LoginSchema = UserSchema.pick({
  email: true,
  password: true,
});

export const StatusSchema = z.object({
  isAuthenticated: z.boolean(),
});
