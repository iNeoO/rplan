import db from '@rplan/database';
import { stringToNestedObject } from '../schemas/common.schema.ts';
import type { PermissionsWithPaginationPayload } from '../schemas/userWithPermission.schema.ts';

export const userPermission = async (userId: db.User['id'], planId: db.Plan['id']) =>
  db.prisma.userWithPermissions.findUnique({
    where: {
      userId_planId: {
        userId,
        planId,
      },
    },
  });

export const hasUserWritePermission = async (userId: db.User['id'], planId: db.Plan['id']) => {
  const permission = await db.prisma.userWithPermissions.findUnique({
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

export const addPermissionForPlan = async (
  userId: db.User['id'],
  planId: db.Plan['id'],
  hasWritePermission: db.UserWithPermissions['hasWritePermission'],
) => {
  const newPermission = {
    data: {
      userId,
      planId,
      hasWritePermission,
      isCreator: false,
    },
  };

  return db.prisma.userWithPermissions.create(newPermission);
};

export const permissions = async (planId: db.Plan['id'], params: PermissionsWithPaginationPayload) => {
  const total = await db.prisma.userWithPermissions.count({
    where: {
      planId,
    },
  });

  const { sort, order, offset, limit } = params;

  const sortParsed = stringToNestedObject(sort, order);

  const results = await db.prisma.userWithPermissions.findMany({
    where: {
      planId,
    },
    select: {
      hasWritePermission: true,
      createdAt: true,
      updatedAt: true,
      isCreator: true,
      user: {
        select: {
          id: true,
          username: true,
        },
      },
    },
    orderBy: sortParsed,
    skip: offset,
    take: limit,
  });

  return {
    total,
    limit,
    offset,
    permissions: results,
  };
};
