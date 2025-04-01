import { type Plan, type User, prisma } from '@rplan/database';

import type { PostStepDto } from '../schemas/step.schema.ts';

export const createStep = async (userId: User['id'], planId: Plan['id'], stepDto: PostStepDto) => {
  const newStep = {
    data: {
      planId,
      ...stepDto,
      coord: undefined,
      ...(stepDto.coord ? { coord: { create: { ...stepDto.coord } } } : {}),
    },
  };

  return prisma.step.create(newStep);
};
