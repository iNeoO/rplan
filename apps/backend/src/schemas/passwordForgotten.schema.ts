import { z } from '@hono/zod-openapi';
import { UserSchema } from './user.schema.ts';

export const PasswordForgottenSchema = z.object({
  token: z.string(),
  createdAt: z.coerce.date(),
  isUsed: z.boolean(),
  userId: z.string(),
});

export const ResetPasswordDtoSchema = UserSchema.pick({
  password: true,
}).merge(PasswordForgottenSchema.pick({ token: true }));

export const ResetPasswordSchema = z.object({
  message: z.string(),
});
