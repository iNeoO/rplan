import { Plan, User, UserWithPermissions } from '@prisma/client';
import prisma from '../libs/prisma.ts';

export const userPermission = async (userId: User['id'], planId: Plan['id']) => prisma.userWithPermissions.findUnique({
  where: {
    userId_planId: {
      userId,
      planId,
    },
  },
});

export const hasUserWritePermission = async (userId: User['id'], planId: Plan['id']) => {
  const permission = await prisma.userWithPermissions.findUnique({
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

  return permission?.hasWritePermission || false;
};

export const addPermissionForPlan = async (userId: User['id'], planId: Plan['id'], hasWritePermission: UserWithPermissions['hasWritePermission']) => {
  const newPermission = {
    data: {
      userId,
      planId,
      hasWritePermission,
      isCreator: false,
    },
  };

  return prisma.userWithPermissions.create(newPermission);
};
