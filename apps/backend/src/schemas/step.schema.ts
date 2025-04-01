import { z } from '@hono/zod-openapi';
import type { z as Z } from '@hono/zod-openapi';
import type { Prisma } from '@rplan/database';
import zod from '@rplan/database/zod';
import { GetCoordReturnSchema, GetCoordSchema, PostCoordDtoSchema, coordSelect } from './coord.schema.ts';

export const StepSchema = z.object(zod.StepSchema.shape);

export const PostStepDtoSchema = StepSchema.pick({
  name: true,
  description: true,
  startDate: true,
  endDate: true,
  createdAt: true,
  updatedAt: true,
}).merge(
  z.object({
    coord: PostCoordDtoSchema.nullable(),
    startDate: z.string().datetime(),
    endDate: z.string().datetime(),
    createdAt: z.string().datetime(),
    updatedAt: z.string().datetime(),
  }),
);

export type PostStepDto = Z.infer<typeof PostStepDtoSchema>;

export const GetStepSchema = StepSchema.pick({
  id: true,
  name: true,
  description: true,
  startDate: true,
  endDate: true,
  createdAt: true,
  updatedAt: true,
}).merge(
  z.object({
    coord: GetCoordSchema.nullable(),
  }),
);

export const GetStepReturnSchema = StepSchema.pick({
  id: true,
  name: true,
  description: true,
  startDate: true,
  endDate: true,
  createdAt: true,
  updatedAt: true,
}).merge(
  z.object({
    coord: GetCoordReturnSchema.nullable(),
    startDate: z.string().datetime(),
    endDate: z.string().datetime(),
    createdAt: z.string().datetime(),
    updatedAt: z.string().datetime(),
  }),
);

export const stepSelect = {
  id: true,
  description: true,
  name: true,
  startDate: true,
  endDate: true,
  createdAt: true,
  updatedAt: true,
  coord: { select: coordSelect },
} satisfies Prisma.StepSelect;
