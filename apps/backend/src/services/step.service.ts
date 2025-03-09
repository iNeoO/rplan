import db from '@rplan/database';

import type { PostStepDto } from '../schemas/step.schema.ts';

export const createStep = async (userId: db.User['id'], planId: db.Plan['id'], stepDto: PostStepDto) => {
  const newStep = {
    data: {
      planId,
      ...stepDto,
      coord: undefined,
      ...(stepDto.coord ? { coord: { create: { ...stepDto.coord } } } : {}),
    },
  };

  return db.prisma.step.create(newStep);
};
