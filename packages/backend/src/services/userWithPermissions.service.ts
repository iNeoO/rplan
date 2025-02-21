import { Plan, User, UserWithPermissions } from '@prisma/client';
import prisma from '../libs/prisma.ts';
import { type PermissionsWithPaginationPayload } from '../schemas/userWithPermission.schema.ts';
import { stringToNestedObject } from '../schemas/common.schema.ts';

export const userPermission = async (userId: User['id'], planId: Plan['id']) =>
  prisma.userWithPermissions.findUnique({
    where: {
      userId_planId: {
        userId,
        planId,
      },
    },
  });

export const hasUserWritePermission = async (
  userId: User['id'],
  planId: Plan['id'],
) => {
  const permission = await prisma.userWithPermissions.findUnique({
    where: {
      userId_planId: {
        userId,
        planId
      }
    },
    select: {
      hasWritePermission: true
    }
  })

  return permission?.hasWritePermission || false
}

export const addPermissionForPlan = async (
  userId: User['id'],
  planId: Plan['id'],
  hasWritePermission: UserWithPermissions['hasWritePermission'],
) => {
  const newPermission = {
    data: {
      userId,
      planId,
      hasWritePermission,
      isCreator: false
    }
  }

  return prisma.userWithPermissions.create(newPermission)
}

export const permissions = async (
  planId: Plan['id'],
  params: PermissionsWithPaginationPayload,
) => {
  const total = await prisma.userWithPermissions.count({
    where: {
      planId
    }
  })

  const { sort, order, offset, limit } = params;

  const sortParsed = stringToNestedObject(sort, order)

  const results = await prisma.userWithPermissions.findMany({
    where: {
      planId
    },
    select: {
      hasWritePermission: true,
      createdAt: true,
      updatedAt: true,
      isCreator: true,
      user: {
        select: {
          id: true,
          username: true
        }
      }
    },
    orderBy: sortParsed,
    skip: offset,
    take: limit
  })

  return {
    total,
    limit,
    offset,
    permissions: results
  }
}
