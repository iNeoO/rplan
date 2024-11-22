import { UserSchema } from 'prisma/zod/index.ts';
import { z } from '@hono/zod-openapi';

export const LoginSchema = UserSchema.pick({
  email: true,
  password: true,
});

export const StatusSchema = z.object({
  isAuthenticated: z.boolean(),
});
