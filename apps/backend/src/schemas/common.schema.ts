import { z } from '@hono/zod-openapi';
import type { z as Z } from '@hono/zod-openapi';

export const createPaginationQuerySchema = <T extends string>(columns: readonly [T, ...T[]]) =>
  z.object({
    sort: z.enum(columns),
    order: z.enum(['asc', 'desc']),
    offset: z.number(),
    limit: z.number(),
  });

export type PaginationQueryPayload<T extends string> = Z.infer<ReturnType<typeof createPaginationQuerySchema<T>>>;

export const createPartialPaginationQuerySchema = <T extends string>(columns: readonly [T, ...T[]]) =>
  createPaginationQuerySchema(columns).partial();

type stringToNestedObjectReturn = {
  [key: string]: stringToNestedObjectReturn | 'asc' | 'desc';
};

// Transformer les clés de colonnes en objet pour le sort de prsima
export const stringToNestedObject = (string: string, order: 'asc' | 'desc'): stringToNestedObjectReturn => {
  const [key, ...rest] = string.split('.');
  if (rest.length) {
    return {
      [key]: stringToNestedObject(rest.join('.'), order),
    };
  }
  return { [key]: order };
};
