import { UserSchema } from 'prisma/zod/index.ts';

export const LoginSchema = UserSchema.pick({
  email: true,
  password: true,
});
