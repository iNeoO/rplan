import { z } from '@hono/zod-openapi';
import type { z as Z } from '@hono/zod-openapi';

export const createPaginationQuerySchema = <T extends string>(columns: [T, ...T[]]) => z.object({
  sort: z.enum(columns),
  order: z.enum(['asc', 'desc']),
  offset: z.number(),
  limit: z.number(),
});

export type PaginationQueryPayload<
  T extends string
> = Z.infer<ReturnType<typeof createPaginationQuerySchema<T>>>;

export const createPartialPaginationQuerySchema = <T extends string>(
  columns: [T, ...T[]],
) => createPaginationQuerySchema(columns).partial();
