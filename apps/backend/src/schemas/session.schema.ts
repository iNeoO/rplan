import { z } from '@hono/zod-openapi';
import type { z as Z } from '@hono/zod-openapi';
import zod from '@rplan/database/zod';

export const SessionSchema = z.object(zod.SessionSchema.shape);

export const SessionCreationSchema = SessionSchema.pick({
  userId: true,
  token: true,
});

export type SessionCreationDto = Z.infer<typeof SessionCreationSchema>;
