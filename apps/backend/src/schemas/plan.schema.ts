import { z } from '@hono/zod-openapi';
import type { z as Z } from '@hono/zod-openapi';
import type db from '@rplan/database';
import zod from '@rplan/database/generated/zod/index.ts';
import { GetStepReturnSchema, GetStepSchema, PostStepDtoSchema, stepSelect } from './step.schema.ts';
import { GetUserWithPermission, GetUserWithPermissionReturn, userSelect } from './userWithPermission.schema.ts';

export const PlanSchema = z.object(zod.PlanSchema.shape);

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

// Tricks because GetPlanParamsSchema as request.params not working
// https://github.com/chrishoermann/zod-prisma-types/issues/276
// export const GetPlanParamsSchema = PlanSchema.pick({
//   id: true,
// });
export const GetPlanParamsSchema = z.object({
  id: z.string(),
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
} satisfies db.Prisma.PlanSelect;

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
} satisfies db.Prisma.PlanSelect;
