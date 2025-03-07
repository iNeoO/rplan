import db from '@rplan/database';

import { type PostPlanDto, planSelect, type plansSelect } from '../schemas/plan.schema.ts';

type MyPlanPayload = db.Prisma.PlanGetPayload<{ select: typeof planSelect }>;
type MyPlansPayload = db.Prisma.PlanGetPayload<{
  select: typeof plansSelect;
}>[];

export const createPlan = async (userId: db.User['id'], planDto: PostPlanDto) => {
  const newPlan = {
    data: {
      ...planDto,
      steps: {
        create: [
          ...planDto.steps.map((step) => ({
            ...step,
            coord: undefined,
            ...(step.coord ? { coord: { create: { ...step.coord } } } : {}),
          })),
        ],
      },
      users: {
        create: {
          userId,
          hasWritePermission: true,
          isCreator: true,
        },
      },
    },
    select: planSelect,
  };

  return db.prisma.plan.create(newPlan);
};

export const getPlans = async (userId: db.User['id']) =>
  db.prisma.plan.findMany({
    where: {
      users: {
        every: {
          userId,
        },
      },
    },
    select: {
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
    },
  });

export const getPlan = async (userId: db.User['id'], id: db.Plan['id']) =>
  db.prisma.plan.findUnique({
    where: {
      id,
      users: {
        every: {
          userId,
        },
      },
    },
    select: planSelect,
  });

export const formatPlan = (plan: MyPlanPayload) => ({
  ...plan,
  users: plan.users.map((user) => ({
    userId: user.userId,
    createdAt: user.createdAt,
    updatedAt: user.updatedAt,
    hasWritePermission: user.hasWritePermission,
    isCreator: user.isCreator,
    username: user.user.username,
  })),
});

export const formatPlans = (plans: MyPlansPayload) =>
  plans.map((plan) => ({
    id: plan.id,
    name: plan.name,
    description: plan.description,
    departureDate: plan.departureDate,
    createdAt: plan.createdAt,
    updatedAt: plan.updatedAt,
    usersCount: plan._count.users,
    stepsCount: plan._count.steps,
  }));
