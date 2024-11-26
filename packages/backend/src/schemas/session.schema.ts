import { SessionSchema } from 'prisma/zod/index.ts';
import type { z as Z } from '@hono/zod-openapi';

export const SessionCreationSchema = SessionSchema.pick({
  userId: true,
  token: true,
});

export type SessionCreationDto = Z.infer<typeof SessionCreationSchema>;
