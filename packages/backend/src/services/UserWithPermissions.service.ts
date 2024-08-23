import { Plan, User } from '@prisma/client';
import prisma from '../libs/prisma.ts';

export const hasUserWritePermissions = async (userId: User['id'], planId: Plan['id']) => {
  const permissions = await prisma.userWithPermissions.findUnique({
    where: {
      userId_planId: {
        userId,
        planId,
      },
    },
    select: {
      hasWritePermission: true,
    },
  });

  return permissions?.hasWritePermission || false;
};
