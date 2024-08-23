import { Prisma } from '@prisma/client';
import { UserWithPermissionsSchema } from 'prisma/zod/index.ts';
import { z } from '@hono/zod-openapi';
import { GetUserSchema } from './user.schema.ts';

export const GetUserWithPermission = UserWithPermissionsSchema.pick({
  hasWritePermission: true,
  isCreator: true,
  createdAt: true,
  updatedAt: true,
}).merge(GetUserSchema.pick({
  username: true,
}));

export const GetUserWithPermissionReturn = GetUserWithPermission.merge(
  z.object({
    createdAt: z.string().datetime(),
    updatedAt: z.string().datetime(),
  }),
);

export const userSelect = {
  hasWritePermission: true,
  isCreator: true,
  userId: true,
  createdAt: true,
  updatedAt: true,
  user: {
    select: {
      username: true,
    },
  },
} satisfies Prisma.UserWithPermissionsSelect;
