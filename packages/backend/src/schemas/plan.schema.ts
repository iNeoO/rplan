import { Prisma } from '@prisma/client';
import { PlanSchema } from 'prisma/zod/index.ts';
import { z } from '@hono/zod-openapi';
import type { z as Z } from '@hono/zod-openapi';
import {
  PostStepDtoSchema,
  GetStepSchema,
  GetStepReturnSchema,
  stepSelect,
} from './step.schema.ts';
import {
  GetUserWithPermission,
  GetUserWithPermissionReturn,
  userSelect,
} from './userWithPermission.schema.ts';

export const PostPlanDtoSchema = PlanSchema.pick({
  name: true,
  description: true,
  departureDate: true,
}).merge(
  z.object({
    departureDate: z.string().datetime(),
    steps: z.array(PostStepDtoSchema),
  }),
);

export type PostPlanDto = Z.infer<typeof PostPlanDtoSchema>;

const DefaultPlan = PlanSchema.pick({
  id: true,
  name: true,
  description: true,
  departureDate: true,
  createdAt: true,
  updatedAt: true,
});

export const GetPlanSchema = DefaultPlan.merge(
  z.object({
    steps: GetStepSchema.array(),
    users: GetUserWithPermission.array(),
  }),
);

export const GetPlanReturnSchema = DefaultPlan.merge(
  z.object({
    departureDate: z.string().datetime(),
    createdAt: z.string().datetime(),
    updatedAt: z.string().datetime(),
    steps: GetStepReturnSchema.array(),
    users: GetUserWithPermissionReturn.array(),
  }),
);

export const GetPlansSchema = DefaultPlan.merge(
  z.object({
    stepsCount: z.number(),
    usersCount: z.number(),
  }),
).array();

export const GetPlansReturnSchema = DefaultPlan.merge(
  z.object({
    departureDate: z.string().datetime(),
    createdAt: z.string().datetime(),
    updatedAt: z.string().datetime(),
    stepsCount: z.number(),
    usersCount: z.number(),
  }),
).array();

export const GetPlanParamsSchema = PlanSchema.pick({
  id: true,
});

export const planSelect = {
  id: true,
  name: true,
  description: true,
  departureDate: true,
  createdAt: true,
  updatedAt: true,
  steps: { select: stepSelect },
  users: { select: userSelect },
} satisfies Prisma.PlanSelect;

export const plansSelect = {
  id: true,
  name: true,
  description: true,
  departureDate: true,
  createdAt: true,
  updatedAt: true,
  _count: {
    select: {
      users: true,
      steps: true,
    },
  },
} satisfies Prisma.PlanSelect;
